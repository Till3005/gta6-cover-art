// The painterly/neon grade applied to every photo: saturation + contrast at draw time, then a hand-written
// pixel pass that posterizes the tones, finds luminance edges, lights them magenta/cyan, and shifts the red
// channel a touch for a printed-poster feel. A sunset gradient is burned in on top.

/** Draws `photo` (Image or canvas) into a fresh panel-sized canvas with cover-fit plus zoom/offset. */
export function photoLayer(photo, w, h, panel) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  if (!photo) return c;
  const iw = photo.naturalWidth || photo.width;
  const ih = photo.naturalHeight || photo.height;
  const zoom = panel.zoom ?? 1;
  const scale = Math.max(w / iw, h / ih) * zoom;
  const pw = iw * scale;
  const ph = ih * scale;
  const ox = ((panel.ox ?? 0) / 100) * ((pw - w) / 2);
  const oy = ((panel.oy ?? 0) / 100) * ((ph - h) / 2);
  ctx.filter = 'saturate(1.35) contrast(1.12) brightness(1.02)';
  ctx.drawImage(photo, (w - pw) / 2 - ox, (h - ph) / 2 - oy, pw, ph);
  ctx.filter = 'none';
  return c;
}

/** Posterize + neon edge glow + chromatic shift, in place on `layer`, scaled by `amount` (0..1). */
export function neonize(layer, amount, seed, edgeColors = { hi: [255, 96, 214], lo: [64, 216, 255] }) {
  const ctx = layer.getContext('2d');
  const { width: w, height: h } = layer;
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  const src = d.slice();
  const levels = Math.round(6 + (1 - amount) * 7);
  const step = 255 / (levels - 1);
  const thr = 24;
  const gain = 1.2 * amount;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const lx = x > 0 ? i - 4 : i;
      const uy = y > 0 ? i - w * 4 : i;
      let r = d[i], g = d[i + 1], b = d[i + 2];
      r = Math.round(Math.round(r / step) * step);
      g = Math.round(Math.round(g / step) * step);
      b = Math.round(Math.round(b / step) * step);
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const lLum = 0.299 * src[lx] + 0.587 * src[lx + 1] + 0.114 * src[lx + 2];
      const uLum = 0.299 * src[uy] + 0.587 * src[uy + 1] + 0.114 * src[uy + 2];
      const edge = Math.min(1, (Math.abs(lum - lLum) + Math.abs(lum - uLum) - thr) / 90) * gain;
      if (edge > 0) {
        const neon = lum > 128 ? edgeColors.hi : edgeColors.lo;
        const mix = edge * 0.8;
        r += (neon[0] - r) * mix;
        g += (neon[1] - g) * mix;
        b += (neon[2] - b) * mix;
      }
      if (x >= 3) r += (src[i - 12] - r) * 0.16 * amount;
      d[i] = Math.max(0, Math.min(255, r));
      d[i + 1] = Math.max(0, Math.min(255, g));
      d[i + 2] = Math.max(0, Math.min(255, b));
    }
  }
  ctx.putImageData(img, 0, 0);
  return layer;
}

/** Burns the tint's sky grade into the panel using its gradient stops. */
export function sunsetBurn(layer, amount, stops = null) {
  const ctx = layer.getContext('2d');
  const { width: w, height: h } = layer;
  if (amount <= 0) return layer;
  const spec = stops ?? [
    [0, 'rgba(40, 200, 255, 0.28)'],
    [0.45, 'rgba(255, 120, 60, 0.10)'],
    [0.78, 'rgba(255, 60, 150, 0.38)'],
    [1, 'rgba(190, 30, 140, 0.46)'],
  ];
  ctx.save();
  ctx.globalCompositeOperation = 'overlay';
  ctx.globalAlpha = Math.min(1, amount);
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  for (const [pos, color] of spec) sky.addColorStop(pos, color);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'soft-light';
  ctx.globalAlpha = Math.min(1, amount);
  ctx.fillStyle = 'rgba(255, 170, 90, 0.5)';
  ctx.fillRect(0, h * 0.55, w, h * 0.45);
  ctx.restore();
  return layer;
}

export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
