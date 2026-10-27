# ACE AI Story (React)

React + Vite rebuild of `ACE AI Story v3.html`, matching the original's design, copy, scroll choreography and responsive behavior.

## Setup

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve dist/
npm run lint
```

Requires Node 20+. Fonts (Archivo Black, Archivo, IBM Plex Mono) load from Google Fonts. If they can't load, the page falls back to the same font stacks as the source.

## Structure

```
src/
  main.jsx, App.jsx
  engine/
    FrameLoopProvider.jsx   the page's single requestAnimationFrame loop
    frameLoopContext.js
  hooks/
    useFrame.js             subscribe a component to the loop (read → write phases)
    useReducedMotion.js     live prefers-reduced-motion
  lib/motion.js             clamp, smoothstep, fract, sectionProgress (same formulas as the source)
  data/content.js           all copy, phase bounds, and illustration data
  components/
    IntroAnimation, Header, HeroSection, StatementSection,
    StorySection (pinned 3-phase story), AssessVisualization,
    CoCreateVisualization, ExecuteVisualization, PhaseNavigation,
    FinaleSection, DetailSection, ContactFooter
  styles/
    global.css      baseline + design tokens
    sections.css    section styles (same rule order as the source; the cascade depends on it)
    animations.css  intro, keyframes, reduced-motion overrides
```

## How the animation works

- **One frame loop.** Each section registers through `useFrame(read, write)`. Every tick runs all layout reads first, then all writes, which avoids the forced reflows the original caused.
- **Story progress** uses the same lerp as the source (0.14 per frame) and the same phase bounds (`0 / .36 / .70 / 1`). Each phase only advances while it is the active scene, as in the original.
- **Discrete changes** are React state, set only when the value actually changes: scene, layer, step, KPI tailoring, structured dots, chips, statement words, finale word. Writes are wrapped in `flushSync`, so these commits land in the same frame as the transforms. Without this, Chrome rasterized the Co-create stage at a slightly different sub-pixel offset than the original.
- **Continuous values** are written directly to DOM refs: zoom, SVG line draw, meter, pulses, step bars, parallax.
- **The illustration** keeps the source's fixed 680×460 coordinate system and is scaled to the wrapper width with a `ResizeObserver`.

## Notes

- `sections.css` deliberately keeps one quirk from the source stylesheet. Once integration goes live, the system boxes get the class `live`, which also matches the Execute LIVE badge's `.live` rule. That switches their labels to centered monospace. It's kept because that's how the original renders.
