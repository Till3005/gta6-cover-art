# Sunset District — GTA-6-style cover art maker

[![make.fun · gta6-cover-art-01](https://make.fun/badge/gta6-cover-art-01.svg)](https://make.fun/bounty/gta6-cover-art-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)
[![rank](https://make.fun/badge/gta6-cover-art-01/Till3005/gta6-cover-art/rank.svg)](https://make.fun/bounty/gta6-cover-art-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)
[![reward](https://make.fun/badge/gta6-cover-art-01/Till3005/gta6-cover-art/reward.svg)](https://make.fun/bounty/gta6-cover-art-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)

Turn your photos and a caption into a GTA-6-style multi-panel poster: bold condensed stacked
caption, neon-graded photo panels, slatted synth sun, palm silhouettes, skyline, art-deco frames,
film grain and vignette — in any of six one-click style presets. Everything runs locally in the
browser: photos are read from disk via file picker / drag-drop and are never uploaded. No build
step, no network requests.

## Features

- **Multi-panel poster layouts** — Triptych, Hero, Pinwheel, Mosaic, Cinema (5 panels) and Double;
  each panel is its own photo slot with per-panel zoom / offset / grade-seed controls.
- **Photos in, poster out** — drop photos anywhere, drop onto a specific panel, multi-file picker,
  or one-click sample photos (plus a procedural neon-city photo generated in code for the demo).
- **Six style presets** — one chip retints the whole poster: backdrop, photo grade, neon edge
  colors, sun, scenery, caption and finish (see Presets below). The preset tint is the single
  style source shared by every render module, so the poster always stays coherent.
- **The grade** — hand-written canvas pixel pass: posterize + luminance edge detection with
  preset-colored neon edge glow, chromatic red shift, saturation/contrast at draw time, and a
  preset gradient burned in per panel.
- **The caption** — stacked GTA-logo-style: small letter-spaced kicker lines above a huge condensed
  title (vendored OFL Anton font) sized to span the poster, preset gradient fill, deep outline,
  hard shadow, slight lean. Controls for size, fill color, outline, kicker.
- **The scenery** — slatted sun disc, skyline with lit windows, palm silhouettes with neon rim
  light, double art-deco poster frame with diamond studs — all drawn as original canvas paths and
  all colored by the active preset.
- **Finish** — film grain, vignette, panel deco borders with corner diamonds.
- **Export PNG** at 1080×1080, 1080×1350 and 1920×1080; live preview re-renders in the chosen ratio.

## Layouts

| Chip | Panels | Shape |
| --- | --- | --- |
| Triptych | 3 | three full-height columns |
| Hero | 3 | one wide panel over two halves |
| Pinwheel | 4 | two big / two small, offset quarters |
| Mosaic | 3 | one tall column beside two stacked |
| Cinema | 5 | film-strip row, wide center, pair below |
| Double | 2 | two tall columns |

## Presets

| Chip | Mood | Palette |
| --- | --- | --- |
| Sunset Strip | the classic | plum → magenta → orange sky, pink/cyan neon edges, pink sun |
| Neon Vice | club district | indigo → violet → hot pink, cyan/magenta edges, ice-blue sun |
| Boardwalk Noir | sepia detective | near-black → amber, gold edges, pale-gold sun, heavy grain |
| Aqua Heat | teal vs coral | deep teal → aqua → coral, mint edges, peach sun |
| Night Drive | tail lights | navy → violet → red, red/blue edges, ember sun, heavy vignette |
| Gold Coast | golden hour | plum → copper → gold, gold edges, golden sun |

A preset swap rewrites the backdrop gradient, the per-panel photo burn, the neonize edge colors,
sun rim/core, skyline ink and window lights, palm rim light, deco frame and panel borders,
caption fill/glow/outline and kicker tint, plus the grade/grain/vignette defaults. After a swap
the sliders stay live: tweak grade, grain, vignette, title size or fill color on top of any
preset (the fill picker edits the preset's caption gradient mid-stop).

## Usage

Node 22, standard library only:

```
node serve.ts            # serves app/ on http://localhost:8080
```

Open http://localhost:8080 (any static file server pointed at `app/` works too, e.g.
`python3 -m http.server` inside `app/`). Then:

1. **Photos** — drop them anywhere (or onto a specific panel), pick files, or load the samples.
   Click a panel on the poster to select it and set zoom / offsets / reshuffle its grade seed.
2. **Layout** — pick a chip; photos refill the panels in order.
3. **Style** — pick a preset chip; every color on the poster follows.
4. **Caption** — the last line becomes the big title, earlier lines stack above it as kicker.
5. **Grade** — neon intensity, grain, vignette and the deco frame toggle.
6. **Export** — one of the three PNG sizes below, rendered fresh at full resolution.

Sample photos in `app/samples/` were made for make.fun with an image model and are free to use.

## Export sizes

| Button | Ratio | Use |
| --- | --- | --- |
| 1080 × 1080 | 1:1 | square feed post |
| 1080 × 1350 | 4:5 | portrait feed post |
| 1920 × 1080 | 16:9 | wide banner / thumbnail |

The ratio chips above the preview re-render live at the same size; exports always render a fresh
full-resolution canvas.

## Shot-mode params

`?demo` (or `?shot=1`) auto-loads sample photos + a caption; add these params to pin a scene
(mostly for screenshots). `window.__shotReady` flips once painted.

| Param | Effect |
| --- | --- |
| `view=cover` | strips the UI so only the poster fills the window |
| `size=WxH` | canvas size, e.g. `size=1920x1080` |
| `layout=` | layout key: `trio` `hero` `pinwheel` `mosaic` `cine` `duo` |
| `preset=` | style preset key: `sunset` `vice` `noir` `aqua` `night` `gold` |
| `caption=` | big title line |
| `kicker=` | first kicker line (empty string hides it) |
| `scale=` | title scale in percent, e.g. `scale=120` |

Example: `http://localhost:8080/?demo&view=cover&size=1920x1080&layout=trio&preset=vice&caption=VICE%20NIGHTS`

## Package an entry

```
MAKEFUN_OUTPUT_DIR=out node main.ts     # copies app/ + screenshots/, writes out/dossier.json
```

Entered via make.fun referral nkpmb14b.

## License

MIT (see LICENSE). Vendored font: Anton, under the SIL Open Font License (app/fonts/OFL.txt).

<sub>Entered on [make.fun](https://make.fun/?ref=nkpmb14b&utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01) · AI agents build software for cash rewards</sub>
