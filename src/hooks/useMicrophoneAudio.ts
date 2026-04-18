import { useEffect, useRef, useState } from 'react'
import { AudioVisualBridge } from '../lib/AudioVisualBridge'
import { useVisualStore } from '../store/visualStore'

type AudioStatus = 'idle' | 'starting' | 'live' | 'error'

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value))

const average = (values: Uint8Array, start: number, end: number) => {
  let total = 0
  let count = 0

  for (let index = start; index < end; index += 1) {
    total += values[index]
    count += 1
  }

  return count > 0 ? total / count / 255 : 0
}

export function useMicrophoneAudio() {
  const [status, setStatus] = useState<AudioStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [level, setLevel] = useState(0)
  const [sensitivity, setSensitivity] = useState(1.35)

  const sensitivityRef = useRef(sensitivity)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const frameRef = useRef<number | null>(null)
  const levelRef = useRef(0)

  useEffect(() => {
    sensitivityRef.current = sensitivity
  }, [sensitivity])

  const stop = async () => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }

    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null

    if (audioContextRef.current) {
      await audioContextRef.current.close()
      audioContextRef.current = null
    }

    analyserRef.current = null
    levelRef.current = 0
    setLevel(0)
    setStatus('idle')

    const store = useVisualStore.getState()
    store.resetVisuals()
    AudioVisualBridge.setAudioData({
      time: performance.now() / 1000,
      intensity: 0,
      low: 0,
      mid: 0,
      high: 0
    })
  }

  const start = async () => {
    if (status === 'starting' || status === 'live') {
      return
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('error')
      setError('Браузер не поддерживает доступ к микрофону.')
      return
    }

    setStatus('starting')
    setError(null)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })

      const audioContext = new window.AudioContext()
      await audioContext.resume()

      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 512
      analyser.smoothingTimeConstant = 0.82

      const source = audioContext.createMediaStreamSource(stream)
      source.connect(analyser)

      const frequencyData = new Uint8Array(analyser.frequencyBinCount)
      const timeData = new Uint8Array(analyser.fftSize)

      streamRef.current = stream
      audioContextRef.current = audioContext
      analyserRef.current = analyser
      setStatus('live')

      const update = () => {
        const liveAnalyser = analyserRef.current
        if (!liveAnalyser) {
          return
        }

        liveAnalyser.getByteFrequencyData(frequencyData)
        liveAnalyser.getByteTimeDomainData(timeData)

        let sumSquares = 0
        for (let index = 0; index < timeData.length; index += 1) {
          const normalized = (timeData[index] - 128) / 128
          sumSquares += normalized * normalized
        }

        const rms = Math.sqrt(sumSquares / timeData.length)
        const boosted = clamp(rms * sensitivityRef.current * 3.4)
        const smoothedLevel = levelRef.current * 0.8 + boosted * 0.2
        levelRef.current = smoothedLevel

        const low = average(frequencyData, 0, Math.floor(frequencyData.length * 0.12))
        const mid = average(
          frequencyData,
          Math.floor(frequencyData.length * 0.12),
          Math.floor(frequencyData.length * 0.45)
        )
        const high = average(
          frequencyData,
          Math.floor(frequencyData.length * 0.45),
          frequencyData.length
        )

        let weightedTotal = 0
        let energyTotal = 0

        for (let index = 0; index < frequencyData.length; index += 1) {
          weightedTotal += index * frequencyData[index]
          energyTotal += frequencyData[index]
        }

        const centroid = energyTotal > 0
          ? weightedTotal / energyTotal / frequencyData.length
          : 0.5

        const modifierX = clamp((centroid - 0.5) * 2.4, -1, 1)
        const modifierY = clamp((low - high) * 1.8, -1, 1)

        const store = useVisualStore.getState()
        store.setFFTData(Float32Array.from(frequencyData))
        store.setAudioIntensity(smoothedLevel)
        store.setVisualModifier(modifierX, modifierY)
        store.setVisualParams({
          speed: 0.9 + smoothedLevel * 2.4,
          detail: clamp(0.35 + high * 0.7, 0.35, 1),
          palette: centroid,
          invert: high > 0.92 && smoothedLevel > 0.55
        })

        AudioVisualBridge.setAudioData({
          time: performance.now() / 1000,
          intensity: smoothedLevel,
          low,
          mid,
          high
        })

        setLevel(smoothedLevel)
        frameRef.current = requestAnimationFrame(update)
      }

      update()
    } catch (micError) {
      console.error(micError)
      await stop()
      setStatus('error')
      setError('Не удалось получить доступ к микрофону. Разрешите его в браузере и попробуйте снова.')
    }
  }

  useEffect(() => {
    return () => {
      void stop()
    }
  }, [])

  return {
    error,
    level,
    sensitivity,
    setSensitivity,
    start,
    status,
    stop
  }
}
