# Visualisator

## What This Is

Visualisator is a standalone mobile-first web app that extracts the strongest visualizer ideas from Midi-Studio and removes the rest of the studio surface. It listens to live microphone input in the browser and drives a fullscreen visual canvas with audio-reactive scenes that can be switched on the fly.

## Core Value

Open the site on a phone, allow microphone access, and immediately get responsive fullscreen visuals without any music-production UI getting in the way.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] User can open a fullscreen visual-only experience with no studio controls or MIDI workflow UI
- [ ] User can grant microphone access and see the visualizers react to live audio
- [ ] User can switch between multiple visualizer scenes on mobile
- [ ] User can use the project as a standalone Vercel-deployable frontend

### Out of Scope

- Telegram integration — not needed for a standalone visualizer deployment
- MIDI sequencing and instrument controls — user wants only the visual block
- Backend services — deployment should stay static and lightweight

## Context

The source inspiration is `Pitrat-wav/Midi-Studio`, but this project should not remain a studio app. The new app will be built in a clean repository and reuse only the visual engine pieces that work well with microphone-driven audio analysis in the browser.

## Constraints

- **Platform**: Mobile-first web experience — must feel good on phone screens
- **Input**: Microphone only — visuals need to react to browser audio capture
- **Deployment**: Vercel static frontend — keep runtime simple
- **Scope**: Visual-only extraction — remove unrelated product surfaces

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Rebuild as a clean standalone app | Faster and safer than stripping the full studio monolith in place | ✓ Good |
| Reuse only visualizer components that do not depend on webcam, pose tracking, Telegram, or backend features | Keeps deployment lean and reduces permissions complexity | ✓ Good |

---
*Last updated: 2026-04-18 after project bootstrap*
