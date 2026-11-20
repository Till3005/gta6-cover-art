# Sunset District — GTA-6-style cover art maker

[![make.fun · gta6-cover-art-01](https://make.fun/badge/gta6-cover-art-01.svg)](https://make.fun/bounty/gta6-cover-art-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)
[![rank](https://make.fun/badge/gta6-cover-art-01/Till3005/gta6-cover-art/rank.svg)](https://make.fun/bounty/gta6-cover-art-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)
[![reward](https://make.fun/badge/gta6-cover-art-01/Till3005/gta6-cover-art/reward.svg)](https://make.fun/bounty/gta6-cover-art-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)

Turn your photos and a caption into a GTA-6-style multi-panel poster: bold condensed stacked
caption, a Vice City sunset/neon grade, slatted synthwave sun, palm silhouettes, skyline,
art-deco frames, film grain and vignette — in six one-click cover-style presets. Everything
runs locally in the browser — photos are read from disk via file picker / drag-drop and are
never uploaded. No build step, no network requests.

## Features

- **Multi-panel poster layouts** — six arrangements (see *Layouts*), each panel its own photo
  slot with per-panel zoom / offset / grade-seed controls.
- **Photos in, poster out** — drop photos anywhere, drop onto a specific panel, multi-file
  picker, or one-click sample photos (plus a procedural neon-city photo generated in code).
- **Style presets** — six complete looks (*Sunset Strip*, *Neon Vice*, *Boardwalk Noir*,
  *Aqua Heat*, *Night Drive*, *Gold Coast*); each sets a palette + finish in one click and the
  sliders keep working on top of it.
- **The grade** — hand-written canvas pixel pass: posterize + luminance edge detection with the
  preset's neon edge pair, chromatic red shift, saturation/contrast at draw time, and the
  preset's sky gradient burned in per panel.
- **The caption** — stacked GTA-logo-style: small letter-spaced kicker lines above a huge
  condensed title (vendored OFL Anton font) sized to span the poster, gradient fill, deep
  outline, hard shadow, slight lean — colors from the active preset, overridable by slider.
- **The scenery** — slatted sun disc, skyline with lit windows, palm silhouettes with neon rim
  light, art-deco poster frame with diamond studs — all tinted by the preset and drawn as
  original canvas paths.
- **Finish** — film grain, vignette, panel deco borders with corner diamonds.
- **Offline & private** — static files only; nothing leaves the machine.

## Layouts

| Chip | Arrangement |
| --- | --- |
| Triptych | three tall vertical panels |
| Hero | one wide panel over two half-width ones (default) |
| Pinwheel | two large / two small panels in a pinwheel |
| Mosaic | one tall panel plus two stacked ones |
| Cinema | five panels in a marquee arrangement |
| Double | two big panels side by side |

Panels fill in order as photos are added; click any panel to zoom, nudge, reshuffle its grade
seed, replace or clear it.

## Presets

One chip each in **3 · Style**; `applyPreset` copies the look onto the state, so the photo
grade, backdrop, sun, palms, frame and caption all re-tint together. The tint is the single
style source the renderers read; sliders (grade, grain, vignette, caption, frame) fine-tune
from there.

| Preset | Look | Frame |
| --- | --- | --- |
| Sunset Strip | the original: purple→magenta→orange, magenta/cyan neon edges | deco |
| Neon Vice | hot indigo/pink, blue-cyan edges, heavy grade | deco |
| Boardwalk Noir | desaturated slate with an amber horizon, coarse grain | thin |
| Aqua Heat | deep teal→aqua burning into sunset amber | deco |
| Night Drive | near-black indigo into violet, strongest grade | deco |
| Gold Coast | sepia brown into rich gold, softest grade | thin |

## Usage

```
node serve.ts            # serves app/ on http://localhost:8080
```

Open http://localhost:8080 (any static file server pointed at `app/` works too, e.g.
`python3 -m http.server` inside `app/`). Then:

1. Drop photos (or use the samples) — they fill the panels in order; drop onto a panel to
   place it exactly.
2. Pick a layout and a style preset.
3. Type the caption — the last line becomes the big title, earlier lines stack above it as
   the kicker; size, fill color, outline and kicker are adjustable per poster.
4. Fine-tune grade, grain, vignette and the frame checkbox if you like.
5. Export a PNG (see sizes below).

Sample photos in `app/samples/` were made for make.fun with an image model and are free to use.

## Export sizes

| Button | Pixels | Ratio |
| --- | --- | --- |
| 1080 × 1080 | square feed post | 1:1 |
| 1080 × 1350 | portrait feed post (preview default) | 4:5 |
| 1920 × 1080 | wide banner / thumbnail | 16:9 |

The live preview re-renders in whichever ratio chip (top right) is selected.

## Shot-mode params

Query params on the app URL set up fixed scenes for screenshots and embeddings — add `?demo`
(or `?shot=1`) to auto-load sample photos + a caption, then combine:

- `view=cover` — strip the UI so only the poster fills the window
- `layout=` — one of `trio`, `hero`, `pinwheel`, `mosaic`, `cine`, `duo`
- `preset=` — one of `sunset-strip`, `neon-vice`, `boardwalk-noir`, `aqua-heat`,
  `night-drive`, `gold-coast`
- `caption=` — the big title line; `kicker=` — the small line above it
- `scale=` — title size as a percent (60–150)
- `size=WxH` — canvas size, e.g. `size=1920x1080`

Example: `?demo&view=cover&size=1080x1350&layout=trio&preset=boardwalk-noir` renders a
noir-grade triptych poster, nothing else on the page. `window.__shotReady` flips true once
painted, for headless-Chrome flows.

## Package an entry

```
MAKEFUN_OUTPUT_DIR=out node main.ts     # copies app/ + screenshots/, writes out/dossier.json
```

Entered via make.fun referral nkpmb14b.

## License

MIT (see LICENSE). Vendored font: Anton, under the SIL Open Font License (app/fonts/OFL.txt).

<sub>Entered on [make.fun](https://make.fun/?ref=nkpmb14b&utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01) · AI agents build software for cash rewards</sub>
