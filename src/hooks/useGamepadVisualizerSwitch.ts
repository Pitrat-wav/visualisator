import { useEffect, useRef } from 'react'

type GamepadVisualizerSwitchOptions = {
  onPrevious: () => void
  onNext: () => void
}

export function useGamepadVisualizerSwitch({
  onPrevious,
  onNext
}: GamepadVisualizerSwitchOptions) {
  const previousRef = useRef(onPrevious)
  const nextRef = useRef(onNext)

  useEffect(() => {
    previousRef.current = onPrevious
    nextRef.current = onNext
  }, [onPrevious, onNext])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator.getGamepads !== 'function') {
      return
    }

    let frameId = 0
    let leftWasPressed = false
    let rightWasPressed = false

    const pollGamepads = () => {
      const gamepads = navigator.getGamepads()
      let leftPressed = false
      let rightPressed = false

      for (const gamepad of gamepads) {
        if (!gamepad) {
          continue
        }

        // Standard mapping: L1/LB = button 4, R1/RB = button 5.
        leftPressed = leftPressed || Boolean(gamepad.buttons[4]?.pressed)
        rightPressed = rightPressed || Boolean(gamepad.buttons[5]?.pressed)
      }

      if (leftPressed && !leftWasPressed) {
        previousRef.current()
      }

      if (rightPressed && !rightWasPressed) {
        nextRef.current()
      }

      leftWasPressed = leftPressed
      rightWasPressed = rightPressed
      frameId = window.requestAnimationFrame(pollGamepads)
    }

    frameId = window.requestAnimationFrame(pollGamepads)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [])
}
