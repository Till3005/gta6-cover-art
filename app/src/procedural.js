// A photo generated in code for the demo scene: a neon night city with a slatted sun and a wet street,
// so every demo panel can hold a different picture without needing a third sample file.

import { mulberry32 } from './grade.js';

export function proceduralPhoto(w = 1000, h = 1300, seed = 5) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const rnd = mulberry32(seed);
  const horizon = h * 0.62;

  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, '#170033');
  sky.addColorStop(0.45, '#5b1060');
  sky.addColorStop(0.8, '#c92a6d');
  sky.addColorStop(1, '#ff7a45');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, horizon);

  for (let i = 0; i < 60; i++) {
    ctx.fillStyle = `rgba(255,235,250,${0.15 + rnd() * 0.5})`;
    ctx.fillRect(rnd() * w, rnd() * horizon * 0.5, 2, 2);
  }

  const sunR = w * 0.22;
  const sun = ctx.createRadialGradient(w / 2, horizon - sunR * 0.3, sunR * 0.1, w / 2, horizon - sunR * 0.3, sunR * 2);
  sun.addColorStop(0, 'rgba(255,230,170,0.95)');
  sun.addColorStop(0.4, 'rgba(255,140,110,0.55)');
  sun.addColorStop(1, 'rgba(255,110,160,0)');
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, w, horizon);
  const disc = ctx.createLinearGradient(0, horizon - sunR * 1.6, 0, horizon);
  disc.addColorStop(0, '#ffe9a8');
  disc.addColorStop(1, '#ff4f8e');
  ctx.fillStyle = disc;
  ctx.beginPath();
  ctx.arc(w / 2, horizon - sunR * 0.25, sunR, 0, Math.PI * 2);
  ctx.fill();
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  let y = horizon - sunR * 0.55;
  let gap = sunR * 0.05;
  while (y < horizon) {
    ctx.fillRect(0, y, w, gap);
    y += gap + sunR * 0.12;
    gap *= 1.5;
  }
  ctx.restore();

  const street = ctx.createLinearGradient(0, horizon, 0, h);
  street.addColorStop(0, '#3a0a3f');
  street.addColorStop(0.4, '#1c0326');
  street.addColorStop(1, '#0e0118');
  ctx.fillStyle = street;
  ctx.fillRect(0, horizon, w, h - horizon);

  let x = -w * 0.05;
  while (x < w * 1.05) {
    const bw = w * (0.08 + rnd() * 0.14);
    const bh = h * (0.12 + rnd() * 0.38);
    const shade = 12 + rnd() * 16;
    ctx.fillStyle = `rgb(${shade},${shade * 0.6 | 0},${shade * 1.6 | 0})`;
    ctx.fillRect(x, horizon - bh, bw, bh);
    if (rnd() < 0.5) {
      ctx.fillRect(x + bw * 0.42, horizon - bh - h * 0.06, bw * 0.05, h * 0.06);
      ctx.fillStyle = 'rgba(255,80,80,0.9)';
      ctx.fillRect(x + bw * 0.42 - 2, horizon - bh - h * 0.065, 5, 5);
    }
    const rows = Math.floor(bh / (h * 0.045));
    const cols = Math.max(2, Math.floor(bw / (w * 0.03)));
    for (let r = 0; r < rows; r++) {
      for (let cCol = 0; cCol < cols; cCol++) {
        if (rnd() < 0.55) continue;
        const pink = rnd() < 0.5;
        const glow = pink ? 'rgba(255,90,190,' : 'rgba(90,225,255,';
        const wx = x + bw * (0.12 + (cCol / cols) * 0.76);
        const wy = horizon - bh * (0.1 + (r / Math.max(1, rows)) * 0.82);
        const ww = Math.max(3, bw * 0.055);
        ctx.fillStyle = glow + (0.5 + rnd() * 0.5) + ')';
        ctx.fillRect(wx, wy, ww, ww * 1.5);
        if (rnd() < 0.25) {
          ctx.fillStyle = glow + '0.14)';
          ctx.fillRect(wx - ww, wy, ww * 3, bh + (h - horizon) * 0.35);
        }
      }
    }
    ctx.fillStyle = `rgb(${shade},${shade * 0.6 | 0},${shade * 1.6 | 0})`;
    x += bw + w * 0.02;
  }

  for (let i = 0; i < 3; i++) {
    const laneY = horizon + (h - horizon) * (0.25 + i * 0.3);
    ctx.fillStyle = 'rgba(255,190,120,0.5)';
    for (let lx = w * (rnd() * 0.2); lx < w; lx += w * 0.14) {
      ctx.fillRect(lx, laneY, w * 0.07, Math.max(3, h * 0.008));
    }
  }
  const shine = ctx.createLinearGradient(0, horizon, 0, h);
  shine.addColorStop(0, 'rgba(255,90,160,0.35)');
  shine.addColorStop(1, 'rgba(255,90,160,0)');
  ctx.fillStyle = shine;
  ctx.fillRect(0, horizon, w, (h - horizon) * 0.5);

  return c;
}
