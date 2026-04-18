# Roadmap: Visualisator

## Overview

Build a focused visual-only web app by extracting audio-reactive visual scenes from Midi-Studio, wiring them to microphone input, then polishing the mobile presentation and shipping it to Vercel.

## Phases

- [ ] **Phase 1: Visual Core Extraction** - Build the standalone mic-reactive visualizer shell and port the reusable scenes
- [ ] **Phase 2: Ship & Deploy** - Polish the mobile UX, verify production build, and publish to GitHub and Vercel

## Phase Details

### Phase 1: Visual Core Extraction
**Goal**: Replace the studio app with a standalone visualizer interface driven by live microphone analysis
**Depends on**: Nothing (first phase)
**Requirements**: [EXP-01, EXP-02, AUD-01, AUD-02, AUD-03]
**Success Criteria** (what must be TRUE):
  1. User sees only a fullscreen visualizer experience
  2. User can grant microphone access and visuals respond to sound
  3. User can switch between multiple visualizer scenes
**Plans**: 2 plans

Plans:
- [ ] 01-01: Scaffold the standalone frontend and visual state/audio analysis layer
- [ ] 01-02: Port and wire the selected visualizer scenes from Midi-Studio

### Phase 2: Ship & Deploy
**Goal**: Make the experience production-ready on mobile and publish it
**Depends on**: Phase 1
**Requirements**: [EXP-03, DLV-01, DLV-02, DLV-03]
**Success Criteria** (what must be TRUE):
  1. The app builds cleanly for production
  2. The UI is usable on mobile screens
  3. The code is published to the target repository and deployed on Vercel
**Plans**: 2 plans

Plans:
- [ ] 02-01: Polish the visual-only controls and mobile presentation
- [ ] 02-02: Connect the repo, push the code, and deploy the production build

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Visual Core Extraction | 0/2 | In progress | - |
| 2. Ship & Deploy | 0/2 | Not started | - |
