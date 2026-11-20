// Hand-drawn scenery and finish: slatted sun, skyline, palm silhouettes with neon rim light, art-deco frame,
// film grain and vignette. All paths are drawn here, no assets.

import { mulberry32 } from './grade.js';

/** Slatted synthwave sun on its own canvas so the slats only cut the disc. */
export function sunDisc(size, rim, core, fade = 'rgba(255, 90, 160, 0)') {
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d');
  const r = size / 2;
  const glow = ctx.createRadialGradient(r, r, r * 0.1, r, r, r);
  glow.addColorStop(0, core);
  glow.addColorStop(0.55, rim);
  glow.addColorStop(1, fade);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);
  ctx.save();
  ctx.beginPath();
  ctx.arc(r, r, r * 0.72, 0, Math.PI * 2);
  ctx.clip();
  const disc = ctx.createLinearGradient(0, r * 0.28, 0, r * 1.72);
  disc.addColorStop(0, '#ffe9a8');
  disc.addColorStop(0.5, '#ffb36b');
  disc.addColorStop(1, '#ff4f9e');
  ctx.fillStyle = disc;
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = 'destination-out';
  let y = r * 1.02;
  let gap = size * 0.012;
  while (y < r * 1.75) {
    ctx.fillRect(0, y, size, gap);
    y += gap + size * 0.028;
    gap *= 1.6;
  }
  ctx.restore();
  return c;
}

/** Skyline strip along the bottom; sparse neon windows in `windows` colors. */
export function skyline(ctx, x0, yBase, w, maxH, seed, color, windows = ['rgba(255, 120, 210, 0.8)', 'rgba(90, 230, 255, 0.8)']) {
  const rnd = mulberry32(seed);
  ctx.save();
  ctx.fillStyle = color;
  let x = x0;
  while (x < x0 + w) {
    const bw = w * (0.04 + rnd() * 0.09);
    const bh = maxH * (0.25 + rnd() * 0.75);
    ctx.fillRect(x, yBase - bh, bw, bh);
    if (rnd() < 0.3) ctx.fillRect(x + bw * 0.4, yBase - bh - maxH * 0.18, bw * 0.08, maxH * 0.18);
    const wins = Math.floor(rnd() * 5);
    for (let i = 0; i < wins; i++) {
      ctx.fillStyle = windows[rnd() < 0.5 ? 0 : 1];
      ctx.fillRect(x + bw * (0.15 + rnd() * 0.7), yBase - bh * (0.15 + rnd() * 0.7), Math.max(1.5, bw * 0.05), Math.max(1.5, bw * 0.05));
      ctx.fillStyle = color;
    }
    x += bw + w * 0.012;
  }
  ctx.restore();
}

/** One palm: curved tapered trunk, arched drooping fronds, drawn twice for a neon rim on the upper edges. */
export function palm(ctx, x, baseY, height, lean, seed, color, rim) {
  const rnd = mulberry32(seed);
  const top = { x: x + lean * height, y: baseY - height };
  const trunk = () => {
    const baseW = height * 0.055;
    const topW = height * 0.02;
    const cx1 = x + lean * height * 0.15;
    const cx2 = x + lean * height * 0.6;
    ctx.beginPath();
    ctx.moveTo(x - baseW / 2, baseY);
    ctx.quadraticCurveTo(cx1, baseY - height * 0.4, top.x - topW / 2, top.y);
    ctx.lineTo(top.x + topW / 2, top.y);
    ctx.quadraticCurveTo(cx2 + baseW / 2, baseY - height * 0.45, x + baseW / 2, baseY);
    ctx.closePath();
    ctx.fill();
  };
  const frond = (angle, len, droop) => {
    const dir = { x: Math.cos(angle), y: Math.sin(angle) };
    const tip = {
      x: top.x + dir.x * len,
      y: top.y + dir.y * len * 0.35 + len * droop,
    };
    const cpUp = { x: top.x + dir.x * len * 0.55, y: top.y + dir.y * len * 0.3 - len * 0.18 };
    const pt = (t) => {
      const it = 1 - t;
      return {
        x: it * it * top.x + 2 * it * t * cpUp.x + t * t * tip.x,
        y: it * it * top.y + 2 * it * t * cpUp.y + t * t * tip.y,
      };
    };
    const mid = pt(0.5);
    const nrm = { x: -(mid.y - top.y), y: mid.x - top.x };
    const nl = Math.hypot(nrm.x, nrm.y) || 1;
    const leaflets = 8;
    for (let s = 0; s < leaflets; s++) {
      const t = 0.18 + (s / (leaflets - 1)) * 0.78;
      const p = pt(t);
      const side = s % 2 === 0 ? 1 : -1;
      const ll = len * 0.26 * (1 - t * 0.65);
      const bx = (nrm.x / nl) * side * ll;
      const by = (nrm.y / nl) * side * ll + ll * 0.35;
      const p2 = pt(Math.min(1, t + 0.09));
      const dx = p2.x - p.x, dy = p2.y - p.y;
      const dl = Math.hypot(dx, dy) || 1;
      ctx.beginPath();
      ctx.moveTo(p.x - (dx / dl) * ll * 0.3, p.y - (dy / dl) * ll * 0.3);
      ctx.lineTo(p.x + bx + (dx / dl) * ll * 0.35, p.y + by + (dy / dl) * ll * 0.35);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();
      ctx.fill();
    }
    ctx.beginPath();
    ctx.moveTo(top.x, top.y);
    ctx.quadraticCurveTo(cpUp.x, cpUp.y, tip.x, tip.y);
    ctx.lineWidth = Math.max(1.5, len * 0.045);
    ctx.strokeStyle = ctx.fillStyle;
    ctx.stroke();
  };
  const fronds = [];
  const n = 10;
  for (let i = 0; i < n; i++) {
    const angle = -Math.PI + (i / (n - 1)) * Math.PI;
    fronds.push([angle, height * (0.34 + rnd() * 0.12), 0.16 + rnd() * 0.16]);
  }
  ctx.save();
  ctx.fillStyle = rim;
  ctx.translate(-height * 0.012, -height * 0.012);
  trunk();
  for (const [a, l, d] of fronds) frond(a, l, d);
  ctx.translate(height * 0.012, height * 0.012);
  ctx.fillStyle = color;
  trunk();
  for (const [a, l, d] of fronds) frond(a, l, d);
  ctx.restore();
}

/** Double art-deco border with diamond studs at the corners and mid-top, in `stops` colors. */
export function decoFrame(ctx, w, h, inset, stops = ['#ffcf8a', '#ff5fae', '#7be2ff', '#ffc86b']) {
  const g = ctx.createLinearGradient(0, 0, w, h);
  const at = [0, 0.36, 0.72, 1];
  stops.forEach((color, i) => g.addColorStop(at[i] ?? 1, color));
  ctx.save();
  ctx.strokeStyle = g;
  ctx.lineWidth = Math.max(2, w * 0.0022);
  ctx.strokeRect(inset, inset, w - inset * 2, h - inset * 2);
  ctx.globalAlpha = 0.55;
  ctx.strokeRect(inset * 2.1, inset * 2.1, w - inset * 4.2, h - inset * 4.2);
  ctx.globalAlpha = 1;
  const dia = (cx, cy, r) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy - r); ctx.lineTo(cx + r, cy); ctx.lineTo(cx, cy + r); ctx.lineTo(cx - r, cy);
    ctx.closePath();
    ctx.fillStyle = g;
    ctx.fill();
  };
  const r = Math.max(4, w * 0.006);
  const o = inset;
  dia(o, o, r); dia(w - o, o, r); dia(o, h - o, r); dia(w - o, h - o, r);
  dia(w / 2, o, r * 1.4);
  ctx.restore();
}

let grainTile = null;
export function grain(ctx, w, h, amount) {
  if (amount <= 0) return;
  if (!grainTile) {
    grainTile = document.createElement('canvas');
    grainTile.width = 256; grainTile.height = 256;
    const gctx = grainTile.getContext('2d');
    const img = gctx.createImageData(256, 256);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 110 + Math.random() * 90;
      img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    gctx.putImageData(img, 0, 0);
  }
  ctx.save();
  ctx.globalCompositeOperation = 'overlay';
  ctx.globalAlpha = 0.16 * amount;
  for (let y = 0; y < h; y += 256) for (let x = 0; x < w; x += 256) ctx.drawImage(grainTile, x, y);
  ctx.restore();
}

export function vignette(ctx, w, h, amount) {
  if (amount <= 0) return;
  ctx.save();
  const g = ctx.createRadialGradient(w / 2, h * 0.42, Math.min(w, h) * 0.35, w / 2, h * 0.5, Math.max(w, h) * 0.75);
  g.addColorStop(0, 'rgba(10, 0, 24, 0)');
  g.addColorStop(1, `rgba(10, 0, 24, ${0.55 * amount})`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

/** Fills an empty slot with its own little poster: sky, slat sun, one palm, dashed frame. */
export function placeholder(ctx, x, y, w, h, seed, tint = {}) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  const stops = tint.backdrop ?? [[0, '#2a0540'], [0.55, '#7a1058'], [0.8, '#e8437a'], [1, '#ff8a4c']];
  const sky = ctx.createLinearGradient(0, y, 0, y + h);
  for (const [at, color] of stops) sky.addColorStop(at, color);
  ctx.fillStyle = sky;
  ctx.fillRect(x, y, w, h);
  const sun = sunDisc(Math.min(w, h) * 0.5, tint.sun?.rim ?? 'rgba(255, 120, 180, 0.8)', tint.sun?.core ?? '#fff3c9', tint.sun?.fade);
  ctx.drawImage(sun, x + w / 2 - sun.width / 2, y + h * 0.42 - sun.height / 2);
  skyline(ctx, x, y + h * 0.92, w, h * 0.14, seed, tint.skylineInk ?? 'rgba(30, 2, 44, 0.9)', tint.windows);
  palm(ctx, x + w * 0.14, y + h * 0.94, h * 0.62, 0.16, seed, tint.palmInk ?? 'rgba(24, 1, 38, 0.95)', (tint.palmRim ?? ['rgba(255, 95, 165, 0.5)'])[0]);
  ctx.restore();
  ctx.save();
  ctx.setLineDash([w * 0.03, w * 0.02]);
  ctx.strokeStyle = 'rgba(255, 210, 240, 0.55)';
  ctx.lineWidth = Math.max(1.5, w * 0.004);
  ctx.strokeRect(x + w * 0.06, y + h * 0.06, w * 0.88, h * 0.88);
  ctx.setLineDash([]);
  ctx.fillStyle = 'rgba(255, 225, 245, 0.8)';
  ctx.font = `${Math.max(10, w * 0.055)}px Anton, "Arial Narrow", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('DROP PHOTO', x + w / 2, y + h * 0.8);
  ctx.restore();
}
