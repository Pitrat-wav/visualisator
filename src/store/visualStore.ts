import { create } from 'zustand'

type VisualState = {
  fftData: Float32Array | null
  globalAudioIntensity: number
  visualModifier: { x: number; y: number }
  visualSpeed: number
  visualDetail: number
  visualPalette: number
  visualInvert: boolean
  setFFTData: (data: Float32Array | null) => void
  setAudioIntensity: (value: number) => void
  setVisualModifier: (x: number, y: number) => void
  setVisualParams: (params: Partial<{
    speed: number
    detail: number
    palette: number
    invert: boolean
  }>) => void
  resetVisuals: () => void
}

export const useVisualStore = create<VisualState>((set) => ({
  fftData: null,
  globalAudioIntensity: 0,
  visualModifier: { x: 0, y: 0 },
  visualSpeed: 1,
  visualDetail: 0.5,
  visualPalette: 0,
  visualInvert: false,
  setFFTData: (data) => set({ fftData: data }),
  setAudioIntensity: (value) => set({ globalAudioIntensity: value }),
  setVisualModifier: (x, y) => set({ visualModifier: { x, y } }),
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
      visualModifier: { x: 0, y: 0 },
      visualSpeed: 1,
      visualDetail: 0.5,
      visualPalette: 0,
      visualInvert: false
    })
}))
