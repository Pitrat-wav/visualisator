import { useEffect, useMemo, useState } from 'react'
import {
  VISUALIZERS,
  getVisualizerMeta
} from './visualizerRegistry'
import './VisualizerShop.css'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSelect: (index: number) => void
}

type Category = 'ALL' | '2D' | '3D' | 'AUDIO' | 'FX'

export function VisualizerShop({ isOpen, onClose, onSelect }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category>('ALL')

  const categories = useMemo(() => {
    const all = VISUALIZERS.map((visualizer, index) => ({
      ...visualizer,
      index,
      meta: getVisualizerMeta(visualizer)
    }))

    return {
      ALL: all,
      '2D': all.filter((visualizer) => visualizer.dimension === '2D'),
      '3D': all.filter((visualizer) => visualizer.dimension === '3D'),
      AUDIO: all.filter((visualizer) =>
        /(audio|spectrum|pulse|wave|bars|frequency)/i.test(visualizer.meta.tags)
      ),
      FX: all.filter((visualizer) =>
        /(glitch|distort|vortex|warp|cyber|retro)/i.test(visualizer.meta.tags)
      )
    }
  }, [])

  const filteredVisualizers = useMemo(() => {
    let list = categories[activeCategory]
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      list = list.filter(
        (visualizer) =>
          visualizer.label.toLowerCase().includes(query) ||
          visualizer.caption.toLowerCase().includes(query) ||
          visualizer.meta.tags.toLowerCase().includes(query)
      )
    }
    return list
  }, [activeCategory, categories, searchQuery])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === '0') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="visualizer-shop-overlay" onClick={onClose}>
      <div className="visualizer-shop-container" onClick={(event) => event.stopPropagation()}>
        <header className="shop-header">
          <div className="header-top">
            <h1>
              VISUALIZER <span className="highlight">GALLERY</span>
            </h1>
            <button className="close-btn" onClick={onClose} type="button">
              ✕
            </button>
          </div>

          <div className="search-bar-container">
            <input
              autoFocus
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Find your vibe..."
              type="text"
              value={searchQuery}
            />
            <span className="search-icon">🔍</span>
          </div>

          <nav className="shop-tabs">
            {(['ALL', '2D', '3D', 'AUDIO', 'FX'] as const).map((category) => (
              <button
                className={activeCategory === category ? 'active' : ''}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
                <span className="count">{categories[category].length}</span>
              </button>
            ))}
          </nav>
        </header>

        <div className="shop-grid">
          {filteredVisualizers.map((visualizer) => (
            <div
              className="visualizer-card"
              draggable
              key={visualizer.id}
              onClick={() => onSelect(visualizer.index)}
              onDragStart={(event) => {
                event.dataTransfer.setData('visualizerIndex', String(visualizer.index))
                event.dataTransfer.effectAllowed = 'copy'
              }}
            >
              <div className="card-icon">{visualizer.meta.icon}</div>
              <div className="card-info">
                <h3>{visualizer.label}</h3>
                <p>{visualizer.meta.tags}</p>
              </div>
              <div className="card-id">#{visualizer.index + 1}</div>
              <div className="card-glow" />
            </div>
          ))}

          {filteredVisualizers.length === 0 && (
            <div className="no-results">
              <p>No visualizers match your search</p>
            </div>
          )}
        </div>

        <footer className="shop-footer">
          <p>
            Press <kbd>0</kbd> or <kbd>ESC</kbd> to close • drag cards onto the hotbar to replace quick slots
          </p>
        </footer>
      </div>
    </div>
  )
}
