// Cover style presets: each one is a complete palette + finish recipe for the poster. The `tint`
// object is the single style source — cover.js, grade.js, deco.js and caption.js all read
// state.presetTint — so applying a preset retints the backdrop, photo grade, neon edges, sun,
// scenery, caption and finish in one move. applyPreset copies a preset into the live state.

export const PRESETS = {
  sunset: {
    label: 'Sunset Strip',
    swatch: ['#ff5fa2', '#ff6a3d'],
    grade: 0.72,
    grainAmt: 0.55,
    vignetteAmt: 0.55,
    frame: true,
    titleScale: 1,
    tint: {
      backdrop: [[0, '#160026'], [0.45, '#42074e'], [0.75, '#a31b63'], [1, '#ff6a3d']],
      scrim: ['rgba(24, 0, 44, 0)', 'rgba(24, 0, 44, 0.66)', 'rgba(16, 0, 32, 0.97)'],
      burn: [[0, 'rgba(40, 200, 255, 0.28)'], [0.45, 'rgba(255, 120, 60, 0.10)'], [0.78, 'rgba(255, 60, 150, 0.38)'], [1, 'rgba(190, 30, 140, 0.46)']],
      warm: 'rgba(255, 170, 90, 0.5)',
      edgeHi: [255, 96, 214],
      edgeLo: [64, 216, 255],
      sun: { rim: 'rgba(255, 110, 170, 0.9)', core: '#fff0c8', fade: 'rgba(255, 90, 160, 0)' },
      palmInk: 'rgba(16, 0, 30, 0.96)',
      palmRim: ['rgba(255, 95, 165, 0.55)', 'rgba(110, 230, 255, 0.4)'],
      skylineInk: 'rgba(28, 2, 46, 0.95)',
      windows: ['rgba(255, 120, 210, 0.8)', 'rgba(90, 230, 255, 0.8)'],
      captionFill: ['#ffffff', '#ffd9f2', '#ff64b8', '#ff2fa0'],
      captionGlow: 'rgba(20, 0, 40, 0.85)',
      captionOutline: '#26013e',
      kickerFill: '#ffe9f6',
      deco: ['#ffcf8a', '#ff5fae', '#7be2ff', '#ffc86b'],
    },
  },
  vice: {
    label: 'Neon Vice',
    swatch: ['#35e6ff', '#ff2fa0'],
    grade: 0.8,
    grainAmt: 0.45,
    vignetteAmt: 0.62,
    frame: true,
    titleScale: 1,
    tint: {
      backdrop: [[0, '#06001f'], [0.4, '#101c5a'], [0.72, '#3a1e9e'], [1, '#ff3d9e']],
      scrim: ['rgba(6, 0, 40, 0)', 'rgba(6, 0, 46, 0.68)', 'rgba(2, 0, 36, 0.97)'],
      burn: [[0, 'rgba(60, 255, 240, 0.30)'], [0.45, 'rgba(80, 120, 255, 0.12)'], [0.78, 'rgba(255, 60, 190, 0.34)'], [1, 'rgba(120, 40, 255, 0.42)']],
      warm: 'rgba(120, 180, 255, 0.4)',
      edgeHi: [90, 255, 240],
      edgeLo: [255, 80, 200],
      sun: { rim: 'rgba(110, 240, 255, 0.9)', core: '#f2fff8', fade: 'rgba(90, 220, 255, 0)' },
      palmInk: 'rgba(4, 2, 26, 0.96)',
      palmRim: ['rgba(110, 240, 255, 0.6)', 'rgba(255, 90, 210, 0.45)'],
      skylineInk: 'rgba(8, 4, 34, 0.95)',
      windows: ['rgba(120, 255, 240, 0.8)', 'rgba(255, 110, 230, 0.8)'],
      captionFill: ['#ffffff', '#e8fbff', '#7ae0ff', '#2f9dff'],
      captionGlow: 'rgba(0, 10, 40, 0.85)',
      captionOutline: '#031028',
      kickerFill: '#dff6ff',
      deco: ['#8affea', '#5fb8ff', '#ff5fd2', '#8affea'],
    },
  },
  noir: {
    label: 'Boardwalk Noir',
    swatch: ['#c98a2e', '#1c1712'],
    grade: 0.55,
    grainAmt: 0.7,
    vignetteAmt: 0.7,
    frame: true,
    titleScale: 1,
    tint: {
      backdrop: [[0, '#0d0b0a'], [0.45, '#1c1712'], [0.75, '#4a3418'], [1, '#c98a2e']],
      scrim: ['rgba(20, 14, 8, 0)', 'rgba(20, 14, 8, 0.66)', 'rgba(10, 6, 4, 0.97)'],
      burn: [[0, 'rgba(255, 230, 180, 0.16)'], [0.45, 'rgba(210, 160, 90, 0.12)'], [0.78, 'rgba(255, 150, 60, 0.22)'], [1, 'rgba(120, 70, 20, 0.40)']],
      warm: 'rgba(255, 200, 120, 0.45)',
      edgeHi: [255, 214, 140],
      edgeLo: [255, 244, 220],
      sun: { rim: 'rgba(255, 190, 110, 0.85)', core: '#fff4d6', fade: 'rgba(255, 200, 120, 0)' },
      palmInk: 'rgba(12, 8, 4, 0.96)',
      palmRim: ['rgba(255, 200, 120, 0.5)', 'rgba(255, 236, 200, 0.35)'],
      skylineInk: 'rgba(16, 10, 6, 0.95)',
      windows: ['rgba(255, 196, 110, 0.75)', 'rgba(255, 240, 200, 0.7)'],
      captionFill: ['#ffffff', '#fff3d9', '#ffd27a', '#e09a2f'],
      captionGlow: 'rgba(15, 8, 2, 0.85)',
      captionOutline: '#1c1106',
      kickerFill: '#ffefcf',
      deco: ['#e8c98a', '#ffae5f', '#c98a2e', '#ffe9b8'],
    },
  },
  aqua: {
    label: 'Aqua Heat',
    swatch: ['#0fb8a6', '#ff7a4f'],
    grade: 0.75,
    grainAmt: 0.5,
    vignetteAmt: 0.55,
    frame: true,
    titleScale: 1,
    tint: {
      backdrop: [[0, '#01131a'], [0.42, '#04494e'], [0.72, '#0a8f8f'], [1, '#ff7a4f']],
      scrim: ['rgba(1, 22, 26, 0)', 'rgba(1, 24, 28, 0.66)', 'rgba(0, 14, 18, 0.97)'],
      burn: [[0, 'rgba(0, 255, 220, 0.24)'], [0.45, 'rgba(60, 220, 200, 0.10)'], [0.78, 'rgba(255, 140, 80, 0.30)'], [1, 'rgba(255, 90, 60, 0.42)']],
      warm: 'rgba(255, 190, 120, 0.5)',
      edgeHi: [70, 255, 220],
      edgeLo: [255, 150, 90],
      sun: { rim: 'rgba(255, 150, 90, 0.9)', core: '#fffbe0', fade: 'rgba(255, 140, 90, 0)' },
      palmInk: 'rgba(2, 20, 24, 0.96)',
      palmRim: ['rgba(90, 255, 220, 0.55)', 'rgba(255, 160, 110, 0.45)'],
      skylineInk: 'rgba(3, 26, 30, 0.95)',
      windows: ['rgba(120, 255, 230, 0.8)', 'rgba(255, 170, 120, 0.8)'],
      captionFill: ['#ffffff', '#e2fff8', '#5ff0d8', '#0fb8a6'],
      captionGlow: 'rgba(0, 24, 24, 0.85)',
      captionOutline: '#022a26',
      kickerFill: '#dffff6',
      deco: ['#5ff0d8', '#3ec8ff', '#ff8a5f', '#ffd05f'],
    },
  },
  night: {
    label: 'Night Drive',
    swatch: ['#7a5cff', '#e0322e'],
    grade: 0.7,
    grainAmt: 0.6,
    vignetteAmt: 0.72,
    frame: true,
    titleScale: 1,
    tint: {
      backdrop: [[0, '#02010f'], [0.4, '#0e1038'], [0.72, '#451468'], [1, '#e0322e']],
      scrim: ['rgba(6, 2, 18, 0)', 'rgba(6, 2, 20, 0.68)', 'rgba(2, 0, 12, 0.97)'],
      burn: [[0, 'rgba(120, 140, 255, 0.22)'], [0.45, 'rgba(80, 90, 220, 0.12)'], [0.78, 'rgba(255, 70, 60, 0.30)'], [1, 'rgba(200, 30, 30, 0.44)']],
      warm: 'rgba(255, 120, 90, 0.4)',
      edgeHi: [255, 90, 80],
      edgeLo: [110, 140, 255],
      sun: { rim: 'rgba(255, 90, 70, 0.9)', core: '#ffe9d0', fade: 'rgba(255, 100, 80, 0)' },
      palmInk: 'rgba(4, 2, 16, 0.96)',
      palmRim: ['rgba(255, 110, 90, 0.5)', 'rgba(140, 170, 255, 0.4)'],
      skylineInk: 'rgba(6, 4, 22, 0.95)',
      windows: ['rgba(255, 120, 100, 0.8)', 'rgba(140, 180, 255, 0.8)'],
      captionFill: ['#ffffff', '#ffe4de', '#ff8f7a', '#e02a2a'],
      captionGlow: 'rgba(10, 0, 20, 0.88)',
      captionOutline: '#160214',
      kickerFill: '#ffe9e4',
      deco: ['#ff9a7a', '#ff5f5f', '#7a8aff', '#ffc86b'],
    },
  },
  gold: {
    label: 'Gold Coast',
    swatch: ['#ffd27a', '#ff8a2f'],
    grade: 0.65,
    grainAmt: 0.45,
    vignetteAmt: 0.5,
    frame: true,
    titleScale: 1,
    tint: {
      backdrop: [[0, '#1c0a2e'], [0.42, '#6b1d54'], [0.72, '#c96a2e'], [1, '#ffd98a']],
      scrim: ['rgba(30, 8, 10, 0)', 'rgba(30, 8, 10, 0.66)', 'rgba(16, 4, 6, 0.97)'],
      burn: [[0, 'rgba(255, 220, 140, 0.26)'], [0.45, 'rgba(255, 180, 90, 0.16)'], [0.78, 'rgba(255, 140, 60, 0.30)'], [1, 'rgba(220, 90, 40, 0.40)']],
      warm: 'rgba(255, 210, 130, 0.55)',
      edgeHi: [255, 220, 120],
      edgeLo: [255, 180, 110],
      sun: { rim: 'rgba(255, 210, 110, 0.95)', core: '#fff8e0', fade: 'rgba(255, 210, 110, 0)' },
      palmInk: 'rgba(30, 10, 20, 0.96)',
      palmRim: ['rgba(255, 220, 130, 0.6)', 'rgba(255, 240, 190, 0.4)'],
      skylineInk: 'rgba(34, 12, 22, 0.95)',
      windows: ['rgba(255, 220, 140, 0.8)', 'rgba(255, 245, 210, 0.75)'],
      captionFill: ['#ffffff', '#fff6df', '#ffd27a', '#ff9d2f'],
      captionGlow: 'rgba(30, 8, 10, 0.85)',
      captionOutline: '#2a0e18',
      kickerFill: '#fff2d6',
      deco: ['#ffd98a', '#ffb05f', '#ff8a5f', '#ffe9b8'],
    },
  },
};

const DEFAULT_PRESET = 'sunset';

/** Shallow-enough copy so a state can nudge tint colors without mutating the shared preset. */
function cloneTint(tint) {
  const out = {};
  for (const [key, value] of Object.entries(tint)) {
    if (Array.isArray(value)) out[key] = value.map((v) => (Array.isArray(v) ? [...v] : v && typeof v === 'object' ? { ...v } : v));
    else if (value && typeof value === 'object') out[key] = { ...value };
    else out[key] = value;
  }
  return out;
}

/**
 * Applies a named preset to `state`: the tint palette plus grade/grain/vignette/frame/titleScale.
 * Unknown names fall back to the default preset so ?preset= can never break a render.
 */
export function applyPreset(state, name) {
  const key = PRESETS[name] ? name : DEFAULT_PRESET;
  const preset = PRESETS[key];
  state.preset = key;
  state.presetTint = cloneTint(preset.tint);
  state.grade = preset.grade;
  state.grainAmt = preset.grainAmt;
  state.vignetteAmt = preset.vignetteAmt;
  state.frame = preset.frame;
  state.titleScale = preset.titleScale;
  state.titleColor = state.presetTint.captionFill[1];
  return state;
}
