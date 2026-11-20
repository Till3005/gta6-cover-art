// Named cover-style presets: each one is a full look — grade intensity, scene tint palette, caption
// colors and outline, deco/frame style — applied over whatever photos and layout the user already has.
// The tint palettes here are the single source of truth the renderer reads.

export const TINTS = {
  sunset: {
    backdrop: [
      [0, '#160026'],
      [0.45, '#42074e'],
      [0.75, '#a31b63'],
      [1, '#ff6a3d'],
    ],
    burn: [
      [0, 'rgba(40, 200, 255, 0.28)'],
      [0.45, 'rgba(255, 120, 60, 0.10)'],
      [0.78, 'rgba(255, 60, 150, 0.38)'],
      [1, 'rgba(190, 30, 140, 0.46)'],
    ],
    glow: 'rgba(255, 170, 90, 0.5)',
    edge: { hi: [255, 96, 214], lo: [64, 216, 255] },
    palmRim: 'rgba(255, 95, 165, 0.55)',
    skyline: 'rgba(28, 2, 46, 0.95)',
    sun: { rim: 'rgba(255, 110, 170, 0.9)', core: '#fff0c8' },
  },
  vice: {
    backdrop: [
      [0, '#12002e'],
      [0.4, '#3a0a6e'],
      [0.72, '#c21f8e'],
      [1, '#ff4f9e'],
    ],
    burn: [
      [0, 'rgba(64, 120, 255, 0.30)'],
      [0.5, 'rgba(255, 80, 200, 0.16)'],
      [0.8, 'rgba(255, 50, 160, 0.44)'],
      [1, 'rgba(150, 20, 160, 0.5)'],
    ],
    glow: 'rgba(120, 220, 255, 0.45)',
    edge: { hi: [255, 70, 200], lo: [80, 230, 255] },
    palmRim: 'rgba(110, 230, 255, 0.6)',
    skyline: 'rgba(22, 2, 52, 0.95)',
    sun: { rim: 'rgba(255, 80, 190, 0.95)', core: '#ffe4f4' },
  },
  noir: {
    backdrop: [
      [0, '#0d0d16'],
      [0.45, '#1c2438'],
      [0.75, '#3c4a63'],
      [1, '#c2885e'],
    ],
    burn: [
      [0, 'rgba(60, 140, 190, 0.24)'],
      [0.5, 'rgba(200, 170, 120, 0.06)'],
      [0.8, 'rgba(190, 120, 80, 0.22)'],
      [1, 'rgba(40, 40, 70, 0.5)'],
    ],
    glow: 'rgba(210, 190, 160, 0.35)',
    edge: { hi: [235, 230, 215], lo: [90, 160, 190] },
    palmRim: 'rgba(220, 210, 190, 0.4)',
    skyline: 'rgba(10, 12, 22, 0.96)',
    sun: { rim: 'rgba(230, 190, 140, 0.8)', core: '#fff4dd' },
  },
  aqua: {
    backdrop: [
      [0, '#04263e'],
      [0.42, '#0a5c74'],
      [0.72, '#17a3a0'],
      [1, '#ffb36b'],
    ],
    burn: [
      [0, 'rgba(30, 220, 235, 0.30)'],
      [0.5, 'rgba(60, 240, 200, 0.10)'],
      [0.8, 'rgba(255, 150, 90, 0.30)'],
      [1, 'rgba(230, 90, 60, 0.42)'],
    ],
    glow: 'rgba(255, 180, 110, 0.45)',
    edge: { hi: [120, 255, 230], lo: [255, 150, 100] },
    palmRim: 'rgba(120, 255, 230, 0.5)',
    skyline: 'rgba(4, 30, 44, 0.95)',
    sun: { rim: 'rgba(255, 170, 110, 0.9)', core: '#fff6d8' },
  },
  night: {
    backdrop: [
      [0, '#050016'],
      [0.42, '#160a4a'],
      [0.72, '#3c1a8e'],
      [1, '#8e4fff'],
    ],
    burn: [
      [0, 'rgba(80, 100, 255, 0.32)'],
      [0.5, 'rgba(140, 80, 255, 0.14)'],
      [0.8, 'rgba(255, 70, 190, 0.34)'],
      [1, 'rgba(60, 20, 130, 0.52)'],
    ],
    glow: 'rgba(140, 120, 255, 0.5)',
    edge: { hi: [255, 90, 230], lo: [110, 140, 255] },
    palmRim: 'rgba(150, 120, 255, 0.6)',
    skyline: 'rgba(8, 2, 30, 0.96)',
    sun: { rim: 'rgba(190, 110, 255, 0.9)', core: '#ffe9ff' },
  },
  gold: {
    backdrop: [
      [0, '#1c0e04'],
      [0.45, '#5e2a08'],
      [0.75, '#c2721e'],
      [1, '#ffd36b'],
    ],
    burn: [
      [0, 'rgba(120, 190, 220, 0.18)'],
      [0.5, 'rgba(255, 200, 100, 0.14)'],
      [0.8, 'rgba(255, 160, 60, 0.34)'],
      [1, 'rgba(160, 70, 20, 0.44)'],
    ],
    glow: 'rgba(255, 210, 120, 0.5)',
    edge: { hi: [255, 220, 140], lo: [255, 160, 90] },
    palmRim: 'rgba(255, 210, 130, 0.55)',
    skyline: 'rgba(30, 14, 4, 0.95)',
    sun: { rim: 'rgba(255, 200, 120, 0.95)', core: '#fffbe6' },
  },
};

export const PRESETS = {
  'sunset-strip': {
    label: 'Sunset Strip',
    tint: 'sunset',
    grade: 0.72, grainAmt: 0.5, vignetteAmt: 0.55, deco: 1,
    titleColor: '#ffd9f2', glow: '#ff2fa0', outline: true, outlineColor: '#26013e',
    titleScale: 1, kicker: true, frame: 'deco',
  },
  'neon-vice': {
    label: 'Neon Vice',
    tint: 'vice',
    grade: 0.85, grainAmt: 0.4, vignetteAmt: 0.5, deco: 1,
    titleColor: '#ffe9f6', glow: '#38e6ff', outline: true, outlineColor: '#1c024a',
    titleScale: 1, kicker: true, frame: 'deco',
  },
  'boardwalk-noir': {
    label: 'Boardwalk Noir',
    tint: 'noir',
    grade: 0.5, grainAmt: 0.75, vignetteAmt: 0.7, deco: 0.55,
    titleColor: '#f2e9d8', glow: '#c2885e', outline: true, outlineColor: '#0a0c14',
    titleScale: 0.92, kicker: true, frame: 'thin',
  },
  'aqua-heat': {
    label: 'Aqua Heat',
    tint: 'aqua',
    grade: 0.7, grainAmt: 0.35, vignetteAmt: 0.4, deco: 0.9,
    titleColor: '#fff3d6', glow: '#ff7a4c', outline: true, outlineColor: '#042a3e',
    titleScale: 1, kicker: true, frame: 'deco',
  },
  'night-drive': {
    label: 'Night Drive',
    tint: 'night',
    grade: 0.9, grainAmt: 0.55, vignetteAmt: 0.6, deco: 1,
    titleColor: '#f2e2ff', glow: '#8e4fff', outline: true, outlineColor: '#0a0130',
    titleScale: 1, kicker: true, frame: 'deco',
  },
  'gold-coast': {
    label: 'Gold Coast',
    tint: 'gold',
    grade: 0.6, grainAmt: 0.45, vignetteAmt: 0.45, deco: 0.75,
    titleColor: '#fff6e0', glow: '#e88a1e', outline: true, outlineColor: '#2a1204',
    titleScale: 0.95, kicker: true, frame: 'thin',
  },
};

/** Applies a named preset's style onto `state`, leaving layout, caption text and photos alone. */
export function applyPreset(state, name) {
  const preset = PRESETS[name] ?? PRESETS['sunset-strip'];
  state.preset = name;
  for (const key of ['tint', 'grade', 'grainAmt', 'vignetteAmt', 'deco', 'titleColor', 'glow', 'outline', 'outlineColor', 'titleScale', 'kicker', 'frame']) {
    state[key] = preset[key];
  }
  for (let i = 0; i < state.panels.length; i++) {
    state.panels[i].seed = (i + 1) * 977 + Math.floor(name.length * 131);
  }
  return state;
}
