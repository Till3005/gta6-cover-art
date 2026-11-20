![make.fun bounty: gta6-cover-art-01](https://make.fun/badge/gta6-cover-art-01.svg)
![cover art: Sunset District](https://make.fun/badge/gta6-cover-art-01-cover.svg)
![entered via referral nkpmb14b](https://make.fun/badge/gta6-cover-art-01-referral.svg?ref=nkpmb14b)

# Sunset District — GTA-6-style cover art maker

Turn your photos and a caption into a GTA-6-style multi-panel poster: bold condensed stacked
caption, Vice City sunset/neon grade, slatted synthwave sun, palm silhouettes, skyline, art-deco
frames, film grain and vignette. Everything runs locally in the browser — photos are read from
disk via file picker / drag-drop and are never uploaded. No build step, no network requests.

## Features

- **Multi-panel poster layouts** — Triptych, Hero, Pinwheel, Mosaic, Cinema (5 panels) and Double;
  each panel is its own photo slot with per-panel zoom / offset / grade-seed controls.
- **Named style presets** — Sunset Strip, Neon Vice, Boardwalk Noir, Aqua Heat, Night Drive and
  Gold Coast. Each preset is a complete look: scene tint palette (backdrop, panel burn, neon edge
  colors, sun, palm rim light, skyline), grade/grain/vignette amounts, caption fill + glow +
  outline color, deco intensity and frame style. One click restyles the whole poster; layout,
  caption text and photos stay put.
- **Photos in, poster out** — drop photos anywhere, drop onto a specific panel, multi-file picker,
  or one-click sample photos (plus a procedural neon-city photo generated in code for the demo).
- **The grade** — hand-written canvas pixel pass: posterize + luminance edge detection with
  magenta/cyan neon edge glow, chromatic red shift, saturation/contrast at draw time, and the
  preset's sky gradient burned in per panel.
- **The caption** — stacked GTA-logo-style: small letter-spaced kicker lines above a huge condensed
  title (vendored OFL Anton font) sized to span the poster, gradient fill, deep outline, hard
  shadow, slight lean. Controls for size, fill color, outline, kicker.
- **The scenery** — slatted sun disc, skyline with lit windows, palm silhouettes with neon rim
  light, art-deco poster frame with diamond studs (or a thin frame, per preset) — all drawn as
  original canvas paths, no Rockstar assets.
- **Finish** — film grain, vignette, per-panel deco borders with corner diamonds.
- **Export PNG** at 1080×1080, 1080×1350 and 1920×1080; live preview re-renders in the chosen ratio.

## Run it

Node 22, standard library only:

```
node serve.ts            # serves app/ on http://localhost:8080
```

Open http://localhost:8080 (any static file server pointed at `app/` works too, e.g.
`python3 -m http.server` inside `app/`). Drop photos, pick a layout and a style preset, arrange
panels, type the caption, export a PNG.

`?demo` auto-loads sample photos + a caption. Extra params for fixed scenes:
`?demo&view=cover` (poster only), `&size=1920x1080`, `&layout=trio|hero|pinwheel|mosaic|cine|duo`,
`&preset=neon-vice`, `&caption=NEON%20COAST`, `&kicker=OCEAN%20DRIVE`, `&scale=72` (caption size %).
Sample photos in `app/samples/` were made for make.fun with an image model and are free to use.

## Package an entry

```
MAKEFUN_OUTPUT_DIR=out node main.ts     # copies app/ + screenshots/, writes out/dossier.json
```

Entered via make.fun referral nkpmb14b — [make.fun/?ref=nkpmb14b](https://make.fun/?ref=nkpmb14b).

## License

MIT (see LICENSE). Vendored font: Anton, under the SIL Open Font License (app/fonts/OFL.txt).
