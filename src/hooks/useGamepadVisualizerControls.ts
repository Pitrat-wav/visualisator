import { useEffect, useRef } from 'react'
import { useVisualStore } from '../store/visualStore'

type GamepadVisualizerControlsOptions = {
  activeIndex: number
  onCycleQuickSlot: (direction: number) => void
  onToggleShop: () => void
}

const GLITCH_WORLD_INDEX = 13
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export function useGamepadVisualizerControls({
  activeIndex,
  onCycleQuickSlot,
  onToggleShop
}: GamepadVisualizerControlsOptions) {
  const activeIndexRef = useRef(activeIndex)
  const cycleQuickSlotRef = useRef(onCycleQuickSlot)
  const toggleShopRef = useRef(onToggleShop)

  useEffect(() => {
    activeIndexRef.current = activeIndex
    cycleQuickSlotRef.current = onCycleQuickSlot
    toggleShopRef.current = onToggleShop
  }, [activeIndex, onCycleQuickSlot, onToggleShop])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator.getGamepads !== 'function') {
      return
    }

    let frameId = 0
    const lastButtons: boolean[] = []
    const lastButtonTimes: number[] = []

    const vibrate = (gamepad: Gamepad, duration: number, intensity: number) => {
      if (!gamepad.vibrationActuator) {
        return
      }

      ;(gamepad.vibrationActuator as GamepadHapticActuator).playEffect('dual-rumble', {
        startDelay: 0,
        duration,
        weakMagnitude: intensity,
        strongMagnitude: intensity
      }).catch(() => {})
    }

    const handleButtonPress = (buttonIndex: number, gamepad: Gamepad) => {
      const visual = useVisualStore.getState()

      switch (buttonIndex) {
        case 0:
          if (activeIndexRef.current === GLITCH_WORLD_INDEX) {
            visual.setVisualParams({ palette: (visual.visualPalette + 1) % 5 })
          }
          vibrate(gamepad, 30, 0.3)
          break
        case 1:
          if (activeIndexRef.current === GLITCH_WORLD_INDEX) {
            visual.setVisualParams({ invert: !visual.visualInvert })
          }
          vibrate(gamepad, 30, 0.3)
          break
        case 2:
          visual.resetVisuals()
          vibrate(gamepad, 60, 0.7)
          break
        case 3:
          visual.setAudioIntensity(1.5)
          vibrate(gamepad, 100, 1)
          break
        case 4:
          cycleQuickSlotRef.current(-1)
          vibrate(gamepad, 40, 0.4)
          break
        case 5:
          cycleQuickSlotRef.current(1)
          vibrate(gamepad, 40, 0.4)
          break
        case 9:
        case 17:
          toggleShopRef.current()
          vibrate(gamepad, 60, 0.5)
          break
        case 12:
          visual.setVisualParams({ detail: Math.min(1, visual.visualDetail + 0.1) })
          vibrate(gamepad, 20, 0.4)
          break
        case 13:
          visual.setVisualParams({ detail: Math.max(0, visual.visualDetail - 0.1) })
          vibrate(gamepad, 20, 0.4)
          break
        case 14:
          visual.setVisualParams({ speed: Math.max(0.1, visual.visualSpeed - 0.1) })
          vibrate(gamepad, 15, 0.3)
          break
        case 15:
          visual.setVisualParams({ speed: Math.min(2, visual.visualSpeed + 0.1) })
          vibrate(gamepad, 15, 0.3)
          break
      }
    }

    const update = () => {
      const gamepads = navigator.getGamepads()
      const gamepad = gamepads.find(Boolean)

      if (gamepad) {
        const now = Date.now()

        gamepad.buttons.forEach((button, index) => {
          const pressed = button.pressed
          const wasPressed = lastButtons[index]
          const lastTime = lastButtonTimes[index] ?? 0

          if (pressed && !wasPressed && now - lastTime > 150) {
            lastButtonTimes[index] = now
            handleButtonPress(index, gamepad)
          }

          lastButtons[index] = pressed
        })

        const visual = useVisualStore.getState()

        const r2 = gamepad.buttons[7]?.value ?? 0
        if (r2 > 0.05) {
          visual.setAudioIntensity(visual.globalAudioIntensity + r2 * 0.15)
        }

        const l2 = gamepad.buttons[6]?.value ?? 0
        if (l2 > 0.05) {
          visual.setAudioIntensity(Math.max(0, visual.globalAudioIntensity - l2 * 0.15))
        }

        const leftX = gamepad.axes[0] ?? 0
        const leftY = gamepad.axes[1] ?? 0
        if (Math.abs(leftX) > 0.05 || Math.abs(leftY) > 0.05) {
          visual.setGamepadModifier(leftX, leftY)
        } else {
          visual.setGamepadModifier(0, 0)
        }

        const rightY = gamepad.axes[3] ?? 0
        if (activeIndexRef.current === GLITCH_WORLD_INDEX && Math.abs(rightY) > 0.05) {
          visual.setVisualParams({ detail: clamp((rightY + 1) / 2, 0, 1) })
        }
      } else {
        useVisualStore.getState().setGamepadModifier(0, 0)
      }

      frameId = window.requestAnimationFrame(update)
    }

    frameId = window.requestAnimationFrame(update)

    return () => {
      window.cancelAnimationFrame(frameId)
      useVisualStore.getState().setGamepadModifier(0, 0)
    }
  }, [])
}
