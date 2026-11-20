// Named cover-style presets. Each preset is one palette + style object: its `tint` carries every color
// the renderer washes over the scene (backdrop gradient, per-panel burn, the neon edge pair, sun, palm
// rim light, skyline ink and the caption fill/glow/outline) and the plain fields carry the finish
// (grade, grain, vignette, deco intensity, frame style deco|thin, kicker, title scale). applyPreset
// copies one onto the app state — the tint rides along as state.presetTint and is the single style
// source cover.js, grade.js, deco.js and caption.js read. Nothing else hardcodes scene colors.

/** `rgba(...)` string from an [r, g, b] triplet, the form the tint's edge colors are stored in. */
export function rgba([r, g, b], a = 1) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export const PRESETS = {
  'sunset-strip': {
    label: 'Sunset Strip',
    grade: 0.72, grainAmt: 0.5, vignetteAmt: 0.55, deco: 1, frame: 'deco',
    titleColor: '#ffd9f2', fillGlow: '#ff2fa0', outlineColor: '#26013e',
    outline: true, kicker: true, titleScale: 1,
    tint: {
      backdrop: [[0, '#160026'], [0.45, '#42074e'], [0.75, '#a31b63'], [1, '#ff6a3d']],
      burn: [
        [0, 'rgba(40, 200, 255, 0.28)'],
        [0.45, 'rgba(255, 120, 60, 0.10)'],
        [0.78, 'rgba(255, 60, 150, 0.38)'],
        [1, 'rgba(190, 30, 140, 0.46)'],
      ],
      burnGlow: 'rgba(255, 170, 90, 0.5)',
      edge: { hi: [255, 96, 214], lo: [64, 216, 255] },
      sun: {
        rim: 'rgba(255, 110, 170, 0.9)', core: '#fff0c8', fade: 'rgba(255, 90, 160, 0)',
        disc: [[0, '#ffe9a8'], [0.5, '#ffb36b'], [1, '#ff4f9e']],
      },
      palmRim: 'rgba(255, 95, 165, 0.55)',
      skyline: 'rgba(28, 2, 46, 0.95)',
      caption: { fill: '#ffd9f2', glow: '#ff2fa0', outline: '#26013e' },
    },
  },
  'neon-vice': {
    label: 'Neon Vice',
    grade: 0.85, grainAmt: 0.4, vignetteAmt: 0.5, deco: 1, frame: 'deco',
    titleColor: '#ffe9f6', fillGlow: '#38e6ff', outlineColor: '#1c024a',
    outline: true, kicker: true, titleScale: 1,
    tint: {
      backdrop: [[0, '#12002e'], [0.4, '#3a0a6e'], [0.72, '#c21f8e'], [1, '#ff4f9e']],
      burn: [
        [0, 'rgba(64, 120, 255, 0.30)'],
        [0.5, 'rgba(255, 80, 200, 0.16)'],
        [0.8, 'rgba(255, 50, 160, 0.44)'],
        [1, 'rgba(150, 20, 160, 0.5)'],
      ],
      burnGlow: 'rgba(120, 220, 255, 0.45)',
      edge: { hi: [255, 70, 200], lo: [80, 230, 255] },
      sun: {
        rim: 'rgba(255, 80, 190, 0.95)', core: '#ffe4f4', fade: 'rgba(255, 70, 190, 0)',
        disc: [[0, '#fff0f8'], [0.5, '#ff9ad4'], [1, '#ff2f8e']],
      },
      palmRim: 'rgba(110, 230, 255, 0.6)',
      skyline: 'rgba(22, 2, 52, 0.95)',
      caption: { fill: '#ffe9f6', glow: '#38e6ff', outline: '#1c024a' },
    },
  },
  'boardwalk-noir': {
    label: 'Boardwalk Noir',
    grade: 0.5, grainAmt: 0.75, vignetteAmt: 0.7, deco: 0.55, frame: 'thin',
    titleColor: '#f2e9d8', fillGlow: '#c2885e', outlineColor: '#0a0c14',
    outline: true, kicker: true, titleScale: 0.92,
    tint: {
      backdrop: [[0, '#0d0d16'], [0.45, '#1c2438'], [0.75, '#3c4a63'], [1, '#c2885e']],
      burn: [
        [0, 'rgba(60, 140, 190, 0.24)'],
        [0.5, 'rgba(200, 170, 120, 0.06)'],
        [0.8, 'rgba(190, 120, 80, 0.22)'],
        [1, 'rgba(40, 40, 70, 0.5)'],
      ],
      burnGlow: 'rgba(210, 190, 160, 0.35)',
      edge: { hi: [235, 230, 215], lo: [90, 160, 190] },
      sun: {
        rim: 'rgba(230, 190, 140, 0.8)', core: '#fff4dd', fade: 'rgba(210, 180, 140, 0)',
        disc: [[0, '#fff6e2'], [0.5, '#e5c393'], [1, '#8a5a3c']],
      },
      palmRim: 'rgba(220, 210, 190, 0.4)',
      skyline: 'rgba(10, 12, 22, 0.96)',
      caption: { fill: '#f2e9d8', glow: '#c2885e', outline: '#0a0c14' },
    },
  },
  'aqua-heat': {
    label: 'Aqua Heat',
    grade: 0.7, grainAmt: 0.35, vignetteAmt: 0.4, deco: 0.9, frame: 'deco',
    titleColor: '#fff3d6', fillGlow: '#ff7a4c', outlineColor: '#042a3e',
    outline: true, kicker: true, titleScale: 1,
    tint: {
      backdrop: [[0, '#04263e'], [0.42, '#0a5c74'], [0.72, '#17a3a0'], [1, '#ffb36b']],
      burn: [
        [0, 'rgba(30, 220, 235, 0.30)'],
        [0.5, 'rgba(60, 240, 200, 0.10)'],
        [0.8, 'rgba(255, 150, 90, 0.30)'],
        [1, 'rgba(230, 90, 60, 0.42)'],
      ],
      burnGlow: 'rgba(255, 180, 110, 0.45)',
      edge: { hi: [120, 255, 230], lo: [255, 150, 100] },
      sun: {
        rim: 'rgba(255, 170, 110, 0.9)', core: '#fff6d8', fade: 'rgba(255, 150, 90, 0)',
        disc: [[0, '#fff2c0'], [0.5, '#ffc274'], [1, '#ff6a3d']],
      },
      palmRim: 'rgba(120, 255, 230, 0.5)',
      skyline: 'rgba(4, 30, 44, 0.95)',
      caption: { fill: '#fff3d6', glow: '#ff7a4c', outline: '#042a3e' },
    },
  },
  'night-drive': {
    label: 'Night Drive',
    grade: 0.9, grainAmt: 0.55, vignetteAmt: 0.6, deco: 1, frame: 'deco',
    titleColor: '#f2e2ff', fillGlow: '#8e4fff', outlineColor: '#0a0130',
    outline: true, kicker: true, titleScale: 1,
    tint: {
      backdrop: [[0, '#050016'], [0.42, '#160a4a'], [0.72, '#3c1a8e'], [1, '#8e4fff']],
      burn: [
        [0, 'rgba(80, 100, 255, 0.32)'],
        [0.5, 'rgba(140, 80, 255, 0.14)'],
        [0.8, 'rgba(255, 70, 190, 0.34)'],
        [1, 'rgba(60, 20, 130, 0.52)'],
      ],
      burnGlow: 'rgba(140, 120, 255, 0.5)',
      edge: { hi: [255, 90, 230], lo: [110, 140, 255] },
      sun: {
        rim: 'rgba(190, 110, 255, 0.9)', core: '#ffe9ff', fade: 'rgba(150, 90, 255, 0)',
        disc: [[0, '#f6e8ff'], [0.5, '#c58aff'], [1, '#6a2fff']],
      },
      palmRim: 'rgba(150, 120, 255, 0.6)',
      skyline: 'rgba(8, 2, 30, 0.96)',
      caption: { fill: '#f2e2ff', glow: '#8e4fff', outline: '#0a0130' },
    },
  },
  'gold-coast': {
    label: 'Gold Coast',
    grade: 0.6, grainAmt: 0.45, vignetteAmt: 0.45, deco: 0.75, frame: 'thin',
    titleColor: '#fff6e0', fillGlow: '#e88a1e', outlineColor: '#2a1204',
    outline: true, kicker: true, titleScale: 0.95,
    tint: {
      backdrop: [[0, '#1c0e04'], [0.45, '#5e2a08'], [0.75, '#c2721e'], [1, '#ffd36b']],
      burn: [
        [0, 'rgba(120, 190, 220, 0.18)'],
        [0.5, 'rgba(255, 200, 100, 0.14)'],
        [0.8, 'rgba(255, 160, 60, 0.34)'],
        [1, 'rgba(160, 70, 20, 0.44)'],
      ],
      burnGlow: 'rgba(255, 210, 120, 0.5)',
      edge: { hi: [255, 220, 140], lo: [255, 160, 90] },
      sun: {
        rim: 'rgba(255, 200, 120, 0.95)', core: '#fffbe6', fade: 'rgba(255, 190, 100, 0)',
        disc: [[0, '#fff7dd'], [0.5, '#ffd98e'], [1, '#ff9d3c']],
      },
      palmRim: 'rgba(255, 210, 130, 0.55)',
      skyline: 'rgba(30, 14, 4, 0.95)',
      caption: { fill: '#fff6e0', glow: '#e88a1e', outline: '#2a1204' },
    },
  },
};

/** Style fields a preset copies onto the state, one-to-one. */
const STYLE_KEYS = [
  'grade', 'grainAmt', 'vignetteAmt', 'deco',
  'titleColor', 'fillGlow', 'outlineColor', 'outline', 'kicker', 'titleScale',
];

/** Applies the named preset onto `state`. Layout, caption text and photos are left alone; the
 * panel seeds are nudged per preset so its edge-pair flip lands differently on each panel. */
export function applyPreset(state, name) {
  const key = PRESETS[name] ? name : 'sunset-strip';
  const preset = PRESETS[key];
  state.preset = key;
  state.presetTint = preset.tint;
  for (const k of STYLE_KEYS) state[k] = preset[k];
  state.frame = state.frameStyle = preset.frame;
  const hash = [...preset.label].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7);
  for (let i = 0; i < state.panels.length; i++) {
    state.panels[i].seed = (i + 1) * 977 + (hash & 0x3ff);
  }
  return state;
}
