# Requirements: Visualisator

**Defined:** 2026-04-18
**Core Value:** Open the site on a phone, allow microphone access, and immediately get responsive fullscreen visuals without any music-production UI getting in the way.

## v1 Requirements

### Experience

- [ ] **EXP-01**: User lands on a visualizer-only screen without studio, MIDI, or backend-oriented UI
- [ ] **EXP-02**: User can switch between multiple visualizer scenes from the same screen
- [ ] **EXP-03**: Layout remains usable on mobile screens

### Audio Reactivity

- [ ] **AUD-01**: User can enable microphone access in the browser
- [ ] **AUD-02**: Microphone loudness updates visual motion and intensity in real time
- [ ] **AUD-03**: Frequency spectrum data is available to visualizers that need FFT-driven animation

### Delivery

- [ ] **DLV-01**: App builds successfully as a standalone frontend project
- [ ] **DLV-02**: App can be deployed to Vercel without backend dependencies
- [ ] **DLV-03**: Source can be pushed to the new `Pitrat-wav/visualisator` repository

## v2 Requirements

### Enhancements

- **ENH-01**: Add recording/export flows for generated visuals
- **ENH-02**: Add automated scene cycling or preset packs

## Out of Scope

| Feature | Reason |
|---------|--------|
| MIDI editor and instruments | Removed by request |
| Webcam-driven scenes | Not required for microphone-only brief |
| Telegram mini app behavior | Separate concern from this deployment |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| EXP-01 | Phase 1 | Pending |
| EXP-02 | Phase 1 | Pending |
| EXP-03 | Phase 2 | Pending |
| AUD-01 | Phase 1 | Pending |
| AUD-02 | Phase 1 | Pending |
| AUD-03 | Phase 1 | Pending |
| DLV-01 | Phase 2 | Pending |
| DLV-02 | Phase 2 | Pending |
| DLV-03 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 9 total
- Mapped to phases: 9
- Unmapped: 0

---
*Requirements defined: 2026-04-18*
*Last updated: 2026-04-18 after project bootstrap*
