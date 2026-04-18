import React, { Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrthographicCamera, PerspectiveCamera, Stars } from '@react-three/drei'
import { useVisualStore } from '../../store/visualStore'
import type { VisualizerDefinition } from './visualizerRegistry'

function AudioReactiveLights() {
  const leftLight = React.useRef<THREE.PointLight>(null!)
  const rightLight = React.useRef<THREE.PointLight>(null!)

  useFrame(() => {
    const intensity = useVisualStore.getState().globalAudioIntensity
    leftLight.current.intensity = 1.2 + intensity * 5.4
    rightLight.current.intensity = 0.6 + intensity * 3.1
  })

  return (
    <>
      <pointLight ref={leftLight} position={[8, 8, 6]} color="#78f5ff" />
      <pointLight ref={rightLight} position={[-8, -6, 10]} color="#ff4db8" />
    </>
  )
}

function CameraDrift() {
  const { camera } = useThree()

  useFrame((state) => {
    const intensity = useVisualStore.getState().globalAudioIntensity
    const t = state.clock.getElapsedTime()

    camera.position.x = Math.sin(t * 0.18) * (0.22 + intensity * 0.3)
    camera.position.y = Math.cos(t * 0.14) * (0.16 + intensity * 0.18)
    camera.lookAt(0, 0, 0)
  })

  return null
}

export function VisualizerStage({
  visualizer
}: {
  visualizer: VisualizerDefinition
}) {
  const Scene = visualizer.component
  const is2D = visualizer.dimension === '2D'

  return (
    <div className="visualizer-stage">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#02030a']} />

          {is2D ? (
            <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={50} />
          ) : (
            <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={72} />
          )}

          <Scene key={visualizer.id} />

          {!is2D && (
            <>
              <ambientLight intensity={0.22} />
              <AudioReactiveLights />
              <Stars
                radius={90}
                depth={45}
                count={2600}
                factor={4}
                saturation={0}
                fade
                speed={1.15}
              />
              <CameraDrift />
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
