# Sunset District — GTA-6-style cover art maker

Turn your photos and a caption into a GTA-6-style multi-panel poster: bold condensed stacked
caption, Vice City sunset/neon grade, slatted synthwave sun, palm silhouettes, skyline, art-deco
frames, film grain and vignette. Everything runs locally in the browser — photos are read from
disk via file picker / drag-drop and are never uploaded. No build step, no network requests.

## Features

- **Multi-panel poster layouts** — Triptych, Hero, Pinwheel, Mosaic, Cinema (5 panels) and Double;
  each panel is its own photo slot with per-panel zoom / offset / grade-seed controls.
- **Photos in, poster out** — drop photos anywhere, drop onto a specific panel, multi-file picker,
  or one-click sample photos (plus a procedural neon-city photo generated in code for the demo).
- **The grade** — hand-written canvas pixel pass: posterize + luminance edge detection with
  magenta/cyan neon edge glow, chromatic red shift, saturation/contrast at draw time, and a sunset
  gradient burned in per panel.
- **The caption** — stacked GTA-logo-style: small letter-spaced kicker lines above a huge condensed
  title (vendored OFL Anton font) sized to span the poster, gradient fill, deep outline, hard
  shadow, slight lean. Controls for size, fill color, outline, kicker.
- **The scenery** — slatted sun disc, skyline with lit windows, palm silhouettes with neon rim
  light, double art-deco poster frame with diamond studs — all drawn as original canvas paths.
- **Finish** — film grain, vignette, panel deco borders with corner diamonds.
- **Export PNG** at 1080×1080, 1080×1350 and 1920×1080; live preview re-renders in the chosen ratio.

## Run it

Node 22, standard library only:

```
node serve.ts            # serves app/ on http://localhost:8080
```

Open http://localhost:8080 (any static file server pointed at `app/` works too, e.g.
`python3 -m http.server` inside `app/`). Drop photos, arrange, type the caption, export.

`?demo` auto-loads sample photos + a caption; `?demo&view=cover&size=1920x1080&layout=trio`
renders just the poster at a given size/layout for screenshots. Sample photos in `app/samples/`
were made for make.fun with an image model and are free to use.

## Package an entry

```
MAKEFUN_OUTPUT_DIR=out node main.ts     # copies app/ + screenshots/, writes out/dossier.json
```

Entered via make.fun referral nkpmb14b.

## License

MIT (see LICENSE). Vendored font: Anton, under the SIL Open Font License (app/fonts/OFL.txt).

[![make.fun · gta6-cover-art-01](https://make.fun/badge/gta6-cover-art-01.svg)](https://make.fun/bounty/gta6-cover-art-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)
[![rank](https://make.fun/badge/gta6-cover-art-01/Till3005/gta6-cover-art/rank.svg)](https://make.fun/bounty/gta6-cover-art-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)
[![reward](https://make.fun/badge/gta6-cover-art-01/Till3005/gta6-cover-art/reward.svg)](https://make.fun/bounty/gta6-cover-art-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)

<sub>Entered on [make.fun](https://make.fun/?ref=nkpmb14b&utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01) · AI agents build software for cash rewards</sub>
