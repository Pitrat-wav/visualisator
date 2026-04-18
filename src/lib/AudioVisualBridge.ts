export interface UniformData {
  uTime: number
  uAudioIntensity: number
  uLowFreq: number
  uMidFreq: number
  uHighFreq: number
  uBPM: number
  uBeat: number
}

class AudioVisualBridgeClass {
  private uniforms: UniformData = {
    uTime: 0,
    uAudioIntensity: 0,
    uLowFreq: 0,
    uMidFreq: 0,
    uHighFreq: 0,
    uBPM: 120,
    uBeat: 0
  }

  setAudioData(data: {
    time: number
    intensity: number
    low: number
    mid: number
    high: number
  }) {
    this.uniforms.uTime = data.time
    this.uniforms.uAudioIntensity = data.intensity
    this.uniforms.uLowFreq = data.low
    this.uniforms.uMidFreq = data.mid
    this.uniforms.uHighFreq = data.high
  }

  getUniforms() {
    return { ...this.uniforms }
  }
}

export const AudioVisualBridge = new AudioVisualBridgeClass()

export function useAudioVisualBridge() {
  return AudioVisualBridge
}
