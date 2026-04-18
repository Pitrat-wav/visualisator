import { lazy } from 'react'
import type React from 'react'

const lazyNamed = (
  loader: () => Promise<Record<string, React.ComponentType<any>>>,
  exportName: string
) =>
  lazy(async () => {
    const module = await loader()
    return {
      default: module[exportName]
    }
  })

const QuantumParticles = lazyNamed(
  () => import('../VisualEngine/visualizers/QuantumParticles'),
  'QuantumParticles'
)
const NeonWeave = lazyNamed(
  () => import('../VisualEngine/visualizers/NeonWeave'),
  'NeonWeave'
)
const PlasmaOrb = lazyNamed(
  () => import('../VisualEngine/visualizers/PlasmaOrb'),
  'PlasmaOrb'
)
const LiquidMercury = lazyNamed(
  () => import('../VisualEngine/visualizers/LiquidMercury'),
  'LiquidMercury'
)
const GravityWell = lazyNamed(
  () => import('../VisualEngine/visualizers/GravityWell'),
  'GravityWell'
)
const CyberTunnel = lazyNamed(
  () => import('../VisualEngine/visualizers/CyberTunnel'),
  'CyberTunnel'
)
const KaleidoSphere = lazyNamed(
  () => import('../VisualEngine/visualizers/KaleidoSphere'),
  'KaleidoSphere'
)
const AuraField = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch1'),
  'AuraField'
)
const CircuitCity = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch1'),
  'CircuitCity'
)
const VoxelWaves = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch1'),
  'VoxelWaves'
)
const DataRain = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch1'),
  'DataRain'
)
const NebulaCloud = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch1'),
  'NebulaCloud'
)
const Hypercube = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch2'),
  'Hypercube'
)
const GlitchWorld = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch2'),
  'GlitchWorld'
)
const SpiralGalaxy = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch2'),
  'SpiralGalaxy'
)
const SolarFlare = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch2'),
  'SolarFlare'
)
const Frequency360 = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch2'),
  'Frequency360'
)
const ElectricStorm = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch3'),
  'ElectricStorm'
)
const SpeedWarp = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch3'),
  'SpeedWarp'
)
const LaserGrid = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch3'),
  'LaserGrid'
)
const PulsarStar = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch3'),
  'PulsarStar'
)
const RetroOscilloscope = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch2D'),
  'RetroOscilloscope'
)
const VibrantSpectrum = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch2D'),
  'VibrantSpectrum'
)
const RadialPulse = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch2D'),
  'RadialPulse'
)
const LavaLamp2D = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch2D'),
  'LavaLamp2D'
)
const NeonWavelet = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch2D'),
  'NeonWavelet'
)
const GradientFlow = lazyNamed(
  () => import('../VisualEngine/visualizers/VisualBatch2D'),
  'GradientFlow'
)
const NeonHorizon = lazyNamed(
  () => import('../VisualEngine/visualizers/Batch2D_Mega'),
  'NeonHorizon'
)
const CyberRain = lazyNamed(
  () => import('../VisualEngine/visualizers/Batch2D_Mega'),
  'CyberRain'
)
const DigitalPulse = lazyNamed(
  () => import('../VisualEngine/visualizers/Batch2D_Mega'),
  'DigitalPulse'
)
const Vortex2D = lazyNamed(
  () => import('../VisualEngine/visualizers/Batch2D_Mega'),
  'Vortex2D'
)
const XPBlissWarp = lazyNamed(
  () => import('../VisualEngine/visualizers/RetroWindowsBatch'),
  'XPBlissWarp'
)
const IconStorm = lazyNamed(
  () => import('../VisualEngine/visualizers/RetroWindowsBatch'),
  'IconStorm'
)

export type VisualizerDefinition = {
  id: string
  label: string
  caption: string
  dimension: '2D' | '3D'
  component: React.ComponentType
}

type VisualizerMeta = {
  icon: string
  tags: string
}

export const VISUALIZERS: VisualizerDefinition[] = [
  {
    id: 'quantum-particles',
    label: 'Quantum Particles',
    caption: 'Сферический рой частиц, который дышит от спектра.',
    dimension: '3D',
    component: QuantumParticles
  },
  {
    id: 'neon-weave',
    label: 'Neon Weave',
    caption: 'Неоновая сетка, где низы и верха складываются в волну.',
    dimension: '3D',
    component: NeonWeave
  },
  {
    id: 'plasma-orb',
    label: 'Plasma Orb',
    caption: 'Плазменная сфера с пульсирующей оболочкой.',
    dimension: '3D',
    component: PlasmaOrb
  },
  {
    id: 'liquid-mercury',
    label: 'Liquid Mercury',
    caption: 'Хромированный шар, который скручивается на громких пиках.',
    dimension: '3D',
    component: LiquidMercury
  },
  {
    id: 'gravity-well',
    label: 'Gravity Well',
    caption: 'Частицы падают в ядро и взрываются обратно на громких ударах.',
    dimension: '3D',
    component: GravityWell
  },
  {
    id: 'cyber-tunnel',
    label: 'Cyber Tunnel',
    caption: 'Геометрический тоннель, ускоряющийся от микрофона.',
    dimension: '3D',
    component: CyberTunnel
  },
  {
    id: 'kaleido-sphere',
    label: 'Kaleido Sphere',
    caption: 'Калейдоскоп из icosahedron-форм с ярким эмиссивным свечением.',
    dimension: '3D',
    component: KaleidoSphere
  },
  {
    id: 'aura-field',
    label: 'Aura Field',
    caption: 'Мягкий атмосферный купол с подсветкой от текущего уровня.',
    dimension: '3D',
    component: AuraField
  },
  {
    id: 'circuit-city',
    label: 'Circuit City',
    caption: 'Неоновый город из столбцов, который растет от звука.',
    dimension: '3D',
    component: CircuitCity
  },
  {
    id: 'voxel-waves',
    label: 'Voxel Waves',
    caption: 'Квадратная поверхность с кубическими волнами.',
    dimension: '3D',
    component: VoxelWaves
  },
  {
    id: 'data-rain',
    label: 'Data Rain',
    caption: 'Matrix-поток, который ускоряется вместе с голосом и музыкой.',
    dimension: '3D',
    component: DataRain
  },
  {
    id: 'nebula-cloud',
    label: 'Nebula Cloud',
    caption: 'Туманность с мягкой вспышкой на пиках громкости.',
    dimension: '3D',
    component: NebulaCloud
  },
  {
    id: 'hypercube',
    label: 'Hypercube',
    caption: 'Двойной каркасный куб с быстрым вращением.',
    dimension: '3D',
    component: Hypercube
  },
  {
    id: 'glitch-world',
    label: 'Glitch World',
    caption: 'Глитч-панель с реакцией на детализацию и спектральный баланс.',
    dimension: '2D',
    component: GlitchWorld
  },
  {
    id: 'spiral-galaxy',
    label: 'Spiral Galaxy',
    caption: 'Галактика, которая раскручивается под микрофонный шум.',
    dimension: '3D',
    component: SpiralGalaxy
  },
  {
    id: 'solar-flare',
    label: 'Solar Flare',
    caption: 'Огненное ядро с сильными световыми выбросами.',
    dimension: '3D',
    component: SolarFlare
  },
  {
    id: 'frequency-360',
    label: 'Frequency 360',
    caption: 'Круговой анализатор частот в пространстве.',
    dimension: '3D',
    component: Frequency360
  },
  {
    id: 'electric-storm',
    label: 'Electric Storm',
    caption: 'Штормовые линии и вспышки в плотной пространственной сетке.',
    dimension: '3D',
    component: ElectricStorm
  },
  {
    id: 'speed-warp',
    label: 'Speed Warp',
    caption: 'Звездный прыжок в варп с заметным ускорением на пиках.',
    dimension: '3D',
    component: SpeedWarp
  },
  {
    id: 'laser-grid',
    label: 'Laser Grid',
    caption: 'Лазерный каркас для резкого, клубного вайба.',
    dimension: '3D',
    component: LaserGrid
  },
  {
    id: 'pulsar-star',
    label: 'Pulsar Star',
    caption: 'Центральная звезда с кольцами и регулярными импульсами.',
    dimension: '3D',
    component: PulsarStar
  },
  {
    id: 'retro-oscilloscope',
    label: 'Retro Oscilloscope',
    caption: 'Классическая зеленая осциллограмма по FFT-данным.',
    dimension: '2D',
    component: RetroOscilloscope
  },
  {
    id: 'vibrant-spectrum',
    label: 'Vibrant Spectrum',
    caption: 'Сочное столбиковое FFT-полотно в неоновом спектре.',
    dimension: '2D',
    component: VibrantSpectrum
  },
  {
    id: 'radial-pulse',
    label: 'Radial Pulse',
    caption: 'Пульсирующие круги для ярких акцентов и ритма.',
    dimension: '2D',
    component: RadialPulse
  },
  {
    id: 'lava-lamp-2d',
    label: 'Lava Lamp 2D',
    caption: 'Жидкий психоделический градиент с мягким течением.',
    dimension: '2D',
    component: LavaLamp2D
  },
  {
    id: 'neon-wavelet',
    label: 'Neon Wavelet',
    caption: 'Слои тонких волн с живой неоновой подсветкой.',
    dimension: '2D',
    component: NeonWavelet
  },
  {
    id: 'gradient-flow',
    label: 'Gradient Flow',
    caption: 'Градиентная ткань с синусоидальным течением.',
    dimension: '2D',
    component: GradientFlow
  },
  {
    id: 'neon-horizon',
    label: 'Neon Horizon',
    caption: 'Плотный горизонт с яркими синтвейв-линиями.',
    dimension: '2D',
    component: NeonHorizon
  },
  {
    id: 'cyber-rain',
    label: 'Cyber Rain',
    caption: 'Киберпанк-дождь для более агрессивного сигнала.',
    dimension: '2D',
    component: CyberRain
  },
  {
    id: 'digital-pulse',
    label: 'Digital Pulse',
    caption: 'Цифровые импульсы с четкой фронтальной подачей.',
    dimension: '2D',
    component: DigitalPulse
  },
  {
    id: 'vortex-2d',
    label: 'Vortex 2D',
    caption: 'Плоская воронка с сильным эффектом засасывания.',
    dimension: '2D',
    component: Vortex2D
  },
  {
    id: 'xp-bliss-warp',
    label: 'XP Bliss Warp',
    caption: 'Ностальгический ретро-ландшафт, который двигается от аудио.',
    dimension: '2D',
    component: XPBlissWarp
  },
  {
    id: 'icon-storm',
    label: 'Icon Storm',
    caption: 'Летающие ретро-иконки в 3D хаосе.',
    dimension: '3D',
    component: IconStorm
  }
]

const VISUALIZER_META: Record<string, VisualizerMeta> = {
  'quantum-particles': { icon: '✨', tags: 'particles, space, glow, audio' },
  'neon-weave': { icon: '🕸️', tags: 'grid, synthwave, lines, motion' },
  'plasma-orb': { icon: '🔮', tags: 'sphere, organic, glow, pulse' },
  'liquid-mercury': { icon: '💧', tags: 'fluid, metal, distort, reactive' },
  'gravity-well': { icon: '🕳️', tags: 'particles, physics, blackhole, audio' },
  'cyber-tunnel': { icon: '🚇', tags: 'tunnel, speed, neon, cyber' },
  'kaleido-sphere': { icon: '💠', tags: 'kaleidoscope, sphere, geometry' },
  'aura-field': { icon: '🌫️', tags: 'fog, soft, ambient, glow' },
  'circuit-city': { icon: '🌃', tags: 'grid, data, urban, bars' },
  'voxel-waves': { icon: '🧱', tags: 'voxels, terrain, wave, geometry' },
  'data-rain': { icon: '🔢', tags: 'matrix, code, data, fall' },
  'nebula-cloud': { icon: '☁️', tags: 'clouds, space, gas, dreamy' },
  'hypercube': { icon: '🧊', tags: '4d, cube, wireframe, geometry' },
  'glitch-world': { icon: '📟', tags: 'glitch, digital, palette, invert' },
  'spiral-galaxy': { icon: '🌌', tags: 'stars, spin, galaxy, particles' },
  'solar-flare': { icon: '☀️', tags: 'sun, fire, rays, bright' },
  'frequency-360': { icon: '📊', tags: 'bars, spectrum, round, audio' },
  'electric-storm': { icon: '⚡', tags: 'lightning, bolts, flash, energy' },
  'speed-warp': { icon: '🌠', tags: 'stars, fast, warp, space' },
  'laser-grid': { icon: '🕹️', tags: '80s, synthwave, neon, grid' },
  'pulsar-star': { icon: '🔔', tags: 'pulse, rings, center, space' },
  'retro-oscilloscope': { icon: '📉', tags: '2d, wave, retro, spectrum' },
  'vibrant-spectrum': { icon: '📶', tags: '2d, bars, spectrum, colorful' },
  'radial-pulse': { icon: '⭕', tags: '2d, rings, pulse, center' },
  'lava-lamp-2d': { icon: '🫧', tags: '2d, liquid, psychedelic, smooth' },
  'neon-wavelet': { icon: '〰️', tags: '2d, wave, neon, layered' },
  'gradient-flow': { icon: '🌈', tags: '2d, gradient, flow, soft' },
  'neon-horizon': { icon: '🌃', tags: '2d, horizon, synthwave, neon' },
  'cyber-rain': { icon: '🌧️', tags: '2d, cyber, rain, motion' },
  'digital-pulse': { icon: '💥', tags: '2d, digital, pulse, energy' },
  'vortex-2d': { icon: '🌀', tags: '2d, vortex, spiral, suction' },
  'xp-bliss-warp': { icon: '🏞️', tags: '2d, retro, xp, landscape' },
  'icon-storm': { icon: '💿', tags: 'retro, icons, chaos, 3d' }
}

export function getVisualizerMeta(visualizer: VisualizerDefinition): VisualizerMeta {
  return VISUALIZER_META[visualizer.id] ?? {
    icon: visualizer.dimension === '2D' ? '🫧' : '✨',
    tags: `${visualizer.dimension.toLowerCase()}, audio-reactive`
  }
}
