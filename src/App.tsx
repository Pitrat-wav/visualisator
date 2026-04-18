import { startTransition, useEffect, useMemo, useState } from 'react'
import { VisualizerStage } from './components/visualizer/VisualizerStage'
import {
  VISUALIZERS,
  getVisualizerMeta
} from './components/visualizer/visualizerRegistry'
import { VisualizerShop } from './components/visualizer/VisualizerShop'
import { useGamepadVisualizerControls } from './hooks/useGamepadVisualizerControls'
import { useMicrophoneAudio } from './hooks/useMicrophoneAudio'

function wrapIndex(index: number) {
  const length = VISUALIZERS.length
  return (index + length) % length
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isShopOpen, setIsShopOpen] = useState(false)
  const [quickSlots, setQuickSlots] = useState(() =>
    Array.from({ length: Math.min(9, VISUALIZERS.length) }, (_, index) => index)
  )
  const { error, level, sensitivity, setSensitivity, start, status, stop } =
    useMicrophoneAudio()

  const currentVisualizer = useMemo(
    () => VISUALIZERS[activeIndex],
    [activeIndex]
  )

  const setScene = (nextIndex: number) => {
    startTransition(() => {
      setActiveIndex(wrapIndex(nextIndex))
    })
  }

  const handleRandom = () => {
    const nextIndex = Math.floor(Math.random() * VISUALIZERS.length)
    setScene(nextIndex)
  }

  const cycleQuickSlot = (direction: number) => {
    const currentSlotIndex = quickSlots.indexOf(activeIndex)
    const nextSlotIndex =
      currentSlotIndex === -1
        ? direction > 0
          ? 0
          : quickSlots.length - 1
        : (currentSlotIndex + direction + quickSlots.length) % quickSlots.length

    setScene(quickSlots[nextSlotIndex])
  }

  const updateQuickSlot = (slotIndex: number, visualizerIndex: number) => {
    setQuickSlots((currentSlots) => {
      const nextSlots = [...currentSlots]
      nextSlots[slotIndex] = visualizerIndex
      return nextSlots
    })
  }

  useGamepadVisualizerControls({
    activeIndex,
    onCycleQuickSlot: cycleQuickSlot,
    onToggleShop: () => setIsShopOpen((value) => !value)
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') {
        return
      }

      if (event.code === 'Digit0') {
        event.preventDefault()
        setIsShopOpen((value) => !value)
        return
      }

      const digitMatch = event.code.match(/^Digit([1-9])$/)
      if (digitMatch) {
        const slotIndex = Number(digitMatch[1]) - 1
        const visualizerIndex = quickSlots[slotIndex]
        if (visualizerIndex !== undefined) {
          event.preventDefault()
          setScene(visualizerIndex)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [quickSlots])

  const microphoneButtonLabel =
    status === 'starting'
      ? 'Подключаю...'
      : status === 'live'
        ? 'Выключить микрофон'
        : 'Включить микрофон'

  const currentVisualizerMeta = getVisualizerMeta(currentVisualizer)

  return (
    <main className="app-shell">
      <div className="aurora aurora-left" />
      <div className="aurora aurora-right" />

      <VisualizerStage visualizer={currentVisualizer} />
      <VisualizerShop
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        onSelect={(index) => {
          setScene(index)
          setIsShopOpen(false)
        }}
      />

      <section className="hud hud-top">
        <div className="brand-chip">
          <span className={`status-dot status-${status}`} />
          <div>
            <p className="eyebrow">Visual-only extract</p>
            <h1>Visualisator</h1>
          </div>
        </div>

        <div className="scene-chip">
          <span>{currentVisualizer.dimension}</span>
          <strong>{currentVisualizer.label}</strong>
        </div>
      </section>

      <section className="hud hud-bottom">
        <div className="dock-panel">
          <div className="dock-row quick-slots-row">
            <button
              className={`quick-slot-button quick-slot-shop ${isShopOpen ? 'is-active' : ''}`}
              onClick={() => setIsShopOpen(true)}
              type="button"
            >
              <span className="quick-slot-icon">🛍️</span>
              <span className="quick-slot-label">Shop</span>
              <span className="quick-slot-index">0</span>
            </button>

            {quickSlots.map((visualizerIndex, slotIndex) => {
              const visualizer = VISUALIZERS[visualizerIndex]
              const meta = getVisualizerMeta(visualizer)
              const isActive = visualizerIndex === activeIndex

              return (
                <button
                  className={`quick-slot-button ${isActive ? 'is-active' : ''}`}
                  key={`${slotIndex}-${visualizer.id}`}
                  onClick={() => setScene(visualizerIndex)}
                  onDragLeave={(event) => {
                    event.currentTarget.classList.remove('drag-over')
                  }}
                  onDragOver={(event) => {
                    event.preventDefault()
                    event.currentTarget.classList.add('drag-over')
                  }}
                  onDrop={(event) => {
                    event.preventDefault()
                    event.currentTarget.classList.remove('drag-over')
                    const rawIndex = event.dataTransfer.getData('visualizerIndex')
                    if (rawIndex) {
                      updateQuickSlot(slotIndex, Number(rawIndex))
                    }
                  }}
                  type="button"
                >
                  <span className="quick-slot-icon">{meta.icon}</span>
                  <span className="quick-slot-label">{visualizer.label.split(' ')[0]}</span>
                  <span className="quick-slot-index">{slotIndex + 1}</span>
                </button>
              )
            })}
          </div>

          <div className="dock-row dock-row-primary">
            <div className="shop-chip">
              <span>Сейчас</span>
              <strong>
                {currentVisualizerMeta.icon} {currentVisualizer.label}
              </strong>
            </div>

            <button
              className={`mic-button ${status === 'live' ? 'is-live' : ''}`}
              disabled={status === 'starting'}
              onClick={status === 'live' ? stop : start}
              type="button"
            >
              {microphoneButtonLabel}
            </button>

            <div className="meter-card">
              <div className="meter-copy">
                <span className="meter-label">Уровень входа</span>
                <span className="meter-value">
                  {Math.round(level * 100)}%
                </span>
              </div>
              <div className="meter-track">
                <div
                  className="meter-fill"
                  style={{ transform: `scaleX(${Math.max(0.04, level)})` }}
                />
              </div>
            </div>
          </div>

          <div className="dock-row dock-row-secondary">
            <button onClick={() => setScene(activeIndex - 1)} type="button">
              Назад
            </button>
            <button onClick={handleRandom} type="button">
              Случайно
            </button>
            <button onClick={() => setScene(activeIndex + 1)} type="button">
              Вперед
            </button>
          </div>

          <label className="range-card">
            <span>Чувствительность</span>
            <input
              max="2.2"
              min="0.6"
              onChange={(event) => setSensitivity(Number(event.target.value))}
              step="0.05"
              type="range"
              value={sensitivity}
            />
            <strong>{sensitivity.toFixed(2)}x</strong>
          </label>

          <div className="scene-description">
            <p>{currentVisualizer.caption}</p>
          </div>

          <div className="scene-strip" role="tablist" aria-label="Выбор сцены">
            {VISUALIZERS.map((visualizer, index) => (
              <button
                aria-selected={index === activeIndex}
                className={index === activeIndex ? 'is-active' : ''}
                key={visualizer.id}
                onClick={() => setScene(index)}
                role="tab"
                type="button"
              >
                <span>{visualizer.dimension}</span>
                {visualizer.label}
              </button>
            ))}
          </div>

          <p className="support-copy">
            Gamepad visualizer mode restored: <strong>L1 / R1</strong> листают hotbar,
            <strong> D-Pad</strong> меняет speed/detail, <strong>L2 / R2</strong> снижают
            и бустят intensity, <strong>touchpad</strong> открывает магазин.
          </p>

          {error ? <p className="error-copy">{error}</p> : null}
        </div>
      </section>
    </main>
  )
}
