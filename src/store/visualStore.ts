import { create } from 'zustand'

type VisualState = {
  fftData: Float32Array | null
  globalAudioIntensity: number
  audioDrivenModifier: { x: number; y: number }
  gamepadModifier: { x: number; y: number }
  visualModifier: { x: number; y: number }
  visualSpeed: number
  visualDetail: number
  visualPalette: number
  visualInvert: boolean
  setFFTData: (data: Float32Array | null) => void
  setAudioIntensity: (value: number) => void
  setAudioDrivenModifier: (x: number, y: number) => void
  setGamepadModifier: (x: number, y: number) => void
  setVisualParams: (params: Partial<{
    speed: number
    detail: number
    palette: number
    invert: boolean
  }>) => void
  resetVisuals: () => void
}

const isModifierActive = (modifier: { x: number; y: number }) =>
  Math.abs(modifier.x) > 0.05 || Math.abs(modifier.y) > 0.05

export const useVisualStore = create<VisualState>((set) => ({
  fftData: null,
  globalAudioIntensity: 0,
  audioDrivenModifier: { x: 0, y: 0 },
  gamepadModifier: { x: 0, y: 0 },
  visualModifier: { x: 0, y: 0 },
  visualSpeed: 1,
  visualDetail: 0.5,
  visualPalette: 0,
  visualInvert: false,
  setFFTData: (data) => set({ fftData: data }),
  setAudioIntensity: (value) => set({ globalAudioIntensity: value }),
  setAudioDrivenModifier: (x, y) =>
    set((state) => {
      const nextAudioModifier = { x, y }

      return {
        audioDrivenModifier: nextAudioModifier,
        visualModifier: isModifierActive(state.gamepadModifier)
          ? state.gamepadModifier
          : nextAudioModifier
      }
    }),
  setGamepadModifier: (x, y) =>
    set((state) => {
      const nextGamepadModifier = { x, y }

      return {
        gamepadModifier: nextGamepadModifier,
        visualModifier: isModifierActive(nextGamepadModifier)
          ? nextGamepadModifier
          : state.audioDrivenModifier
      }
    }),
  setVisualParams: (params) =>
    set((state) => ({
      visualSpeed: params.speed ?? state.visualSpeed,
      visualDetail: params.detail ?? state.visualDetail,
      visualPalette: params.palette ?? state.visualPalette,
      visualInvert: params.invert ?? state.visualInvert
    })),
  resetVisuals: () =>
    set({
      fftData: null,
      globalAudioIntensity: 0,
      audioDrivenModifier: { x: 0, y: 0 },
      gamepadModifier: { x: 0, y: 0 },
      visualModifier: { x: 0, y: 0 },
      visualSpeed: 1,
      visualDetail: 0.5,
      visualPalette: 0,
      visualInvert: false
    })
}))
