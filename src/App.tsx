import { startTransition, useMemo, useState } from 'react'
import { VisualizerStage } from './components/visualizer/VisualizerStage'
import { VISUALIZERS } from './components/visualizer/visualizerRegistry'
import { useMicrophoneAudio } from './hooks/useMicrophoneAudio'

function wrapIndex(index: number) {
  const length = VISUALIZERS.length
  return (index + length) % length
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0)
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

  const microphoneButtonLabel =
    status === 'starting'
      ? 'Подключаю...'
      : status === 'live'
        ? 'Выключить микрофон'
        : 'Включить микрофон'

  return (
    <main className="app-shell">
      <div className="aurora aurora-left" />
      <div className="aurora aurora-right" />

      <VisualizerStage visualizer={currentVisualizer} />

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
          <div className="dock-row dock-row-primary">
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
                key={visualizer.id}
                aria-selected={index === activeIndex}
                className={index === activeIndex ? 'is-active' : ''}
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
            Лучше всего реагируют речь, хлопки и музыка рядом с микрофоном.
          </p>

          {error ? <p className="error-copy">{error}</p> : null}
        </div>
      </section>
    </main>
  )
}
