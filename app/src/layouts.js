// Panel layouts as normalized rects [x, y, w, h], each panel's own aspect giving the poster its rhythm.

export const LAYOUTS = {
  trio: {
    label: 'Triptych',
    panels: [
      [0.0, 0.0, 0.336, 1.0],
      [0.348, 0.0, 0.304, 1.0],
      [0.664, 0.0, 0.336, 1.0],
    ],
  },
  hero: {
    label: 'Hero',
    panels: [
      [0.0, 0.0, 1.0, 0.585],
      [0.0, 0.6, 0.49, 0.4],
      [0.51, 0.6, 0.49, 0.4],
    ],
  },
  pinwheel: {
    label: 'Pinwheel',
    panels: [
      [0.0, 0.0, 0.58, 0.49],
      [0.6, 0.0, 0.4, 0.49],
      [0.0, 0.51, 0.4, 0.49],
      [0.42, 0.51, 0.58, 0.49],
    ],
  },
  mosaic: {
    label: 'Mosaic',
    panels: [
      [0.0, 0.0, 0.6, 1.0],
      [0.62, 0.0, 0.38, 0.485],
      [0.62, 0.515, 0.38, 0.485],
    ],
  },
  cine: {
    label: 'Cinema',
    panels: [
      [0.0, 0.0, 0.3, 0.3],
      [0.32, 0.0, 0.68, 0.3],
      [0.0, 0.32, 1.0, 0.38],
      [0.0, 0.72, 0.49, 0.28],
      [0.51, 0.72, 0.49, 0.28],
    ],
  },
  duo: {
    label: 'Double',
    panels: [
      [0.0, 0.0, 0.485, 1.0],
      [0.515, 0.0, 0.485, 1.0],
    ],
  },
};

/** Pixel rect for panel i of `layout` on a canvas of w×h, inset by the gutter. */
export function panelRect(layout, i, w, h, gutter) {
  const [x, y, rw, rh] = layout.panels[i];
  return {
    x: x * w + gutter,
    y: y * h + gutter,
    w: rw * w - gutter * 2,
    h: rh * h - gutter * 2,
  };
}

export function panelAt(layout, w, h, gutter, px, py) {
  for (let i = layout.panels.length - 1; i >= 0; i--) {
    const r = panelRect(layout, i, w, h, gutter);
    if (px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h) return i;
  }
  return -1;
}
