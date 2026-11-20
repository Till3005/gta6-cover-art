// Puts the poster together: preset-tinted backdrop, graded photo panels with deco borders, the neon footer band
// (scrim, slatted sun, skyline, palms), the stacked caption, then frame, grain and vignette. Every scene color
// comes from state.presetTint — the palette the chosen preset (see ./presets.js) put on the state.

import { LAYOUTS, panelRect } from './layouts.js';
import { photoLayer, neonize, sunsetBurn } from './grade.js';
import { sunDisc, skyline, palm, decoFrame, grain, vignette, placeholder } from './deco.js';
import { drawCaption, captionHeight } from './caption.js';
import { applyPreset, rgba } from './presets.js';

export function makeState() {
  return applyPreset({
    layout: 'hero',
    lines: ['SUNSET CITY', 'VICE NIGHTS'],
    panels: [],
  }, 'sunset-strip');
}

export function renderPoster(canvas, state, selected = -1) {
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext('2d');
  const layout = LAYOUTS[state.layout] ?? LAYOUTS.hero;
  const gutter = Math.round(Math.min(w, h) * 0.014);
  const inset = Math.round(Math.min(w, h) * 0.024);
  const footY = h - inset * 2.6;
  const targetW = w - inset * 2;
  const tint = state.presetTint;

  const backdrop = ctx.createLinearGradient(0, 0, 0, h);
  for (const [pos, color] of tint.backdrop) backdrop.addColorStop(pos, color);
  ctx.fillStyle = backdrop;
  ctx.fillRect(0, 0, w, h);

  const unit = Math.min(targetW * 0.075, h * 0.16) * state.titleScale;
  const bandH = captionHeight(ctx, targetW, state.lines, state) + unit * 0.5;
  const bandTop = Math.max(h * 0.55, footY - bandH);

  for (let i = 0; i < layout.panels.length; i++) {
    const r = panelRect(layout, i, w, h, gutter);
    const panel = state.panels[i] ?? {};
    if (panel.photo) {
      const layer = photoLayer(panel.photo, Math.round(r.w), Math.round(r.h), panel);
      neonize(layer, state.grade, panel.seed ?? i * 977 + 13, tint.edge);
      sunsetBurn(layer, state.grade * 0.85, tint);
      ctx.drawImage(layer, r.x, r.y);
      panelBorder(ctx, r, tint, state.deco);
    } else {
      placeholder(ctx, r.x, r.y, r.w, r.h, i * 311 + 7);
    }
    if (i === selected) selectionBox(ctx, r);
  }

  const scrim = ctx.createLinearGradient(0, bandTop - h * 0.1, 0, h);
  scrim.addColorStop(0, 'rgba(24, 0, 44, 0)');
  scrim.addColorStop(0.45, 'rgba(24, 0, 44, 0.66)');
  scrim.addColorStop(1, 'rgba(16, 0, 32, 0.97)');
  ctx.fillStyle = scrim;
  ctx.fillRect(0, bandTop - h * 0.1, w, h - bandTop + h * 0.1);

  const sun = sunDisc(Math.min(w, h) * 0.42, tint.sun);
  ctx.save();
  ctx.globalAlpha = 0.9;
  ctx.drawImage(sun, w / 2 - sun.width / 2, footY - bandH * 0.98 - sun.height / 2);
  ctx.restore();

  skyline(ctx, 0, footY + 2, w, h * 0.07, 4242, tint.skyline);
  const palmH = h * 0.3;
  palm(ctx, inset * 2.2, footY + 4, palmH, 0.22, 11, tint.skyline, tint.palmRim);
  palm(ctx, w - inset * 2.2, footY + 4, palmH * 1.12, -0.18, 29, tint.skyline, rgba(tint.edge.lo, 0.5));

  drawCaption(ctx, inset, footY, targetW, state.lines, state);

  decoFrame(ctx, w, h, inset, state.frame, state.deco, tint);
  grain(ctx, w, h, state.grainAmt);
  vignette(ctx, w, h, state.vignetteAmt);
  return canvas;
}

function panelBorder(ctx, r, tint, deco) {
  if (deco <= 0.05) return;
  ctx.save();
  const mid = tint.edge.hi.map((v, i) => Math.round((v + tint.edge.lo[i]) / 2));
  const g = ctx.createLinearGradient(r.x, r.y, r.x + r.w, r.y + r.h);
  g.addColorStop(0, rgba(tint.edge.hi, 0.9));
  g.addColorStop(0.5, rgba(mid, 0.9));
  g.addColorStop(1, rgba(tint.edge.lo, 0.9));
  ctx.strokeStyle = g;
  ctx.lineWidth = Math.max(1.5, r.w * 0.004);
  ctx.globalAlpha = Math.min(1, 0.45 + deco * 0.55);
  ctx.strokeRect(r.x + 2, r.y + 2, r.w - 4, r.h - 4);
  if (deco > 0.6) {
    ctx.globalAlpha = 0.5 * deco;
    ctx.lineWidth = 1;
    ctx.strokeRect(r.x + 7, r.y + 7, r.w - 14, r.h - 14);
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = g;
  const t = Math.max(3, r.w * 0.008) * Math.min(1, deco);
  for (const [cx, cy] of [[r.x, r.y], [r.x + r.w, r.y], [r.x, r.y + r.h], [r.x + r.w, r.y + r.h]]) {
    ctx.beginPath();
    ctx.moveTo(cx, cy - t); ctx.lineTo(cx + t, cy); ctx.lineTo(cx, cy + t); ctx.lineTo(cx - t, cy);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function selectionBox(ctx, r) {
  ctx.save();
  ctx.strokeStyle = '#35e6ff';
  ctx.lineWidth = Math.max(2, r.w * 0.005);
  ctx.setLineDash([12, 8]);
  ctx.strokeRect(r.x + 4, r.y + 4, r.w - 8, r.h - 8);
  ctx.restore();
}
