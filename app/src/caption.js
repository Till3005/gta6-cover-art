// The stacked poster caption: small letter-spaced kicker lines above a huge title sized to span the width
// naturally (tall condensed GTA-logo look via a mild vertical stretch). Gradient fill, deep outline, shadow.

const FONT = 'Anton, "Arial Narrow", Impact, sans-serif';

function fitTitle(ctx, text, targetW) {
  ctx.font = `100px ${FONT}`;
  const w100 = Math.max(1, ctx.measureText(text).width);
  return Math.max(12, (100 * targetW) / w100);
}

function titleSizeFor(ctx, text, targetW, unit) {
  return Math.min(unit * 4.4, fitTitle(ctx, text, targetW * 0.97));
}

function drawTitle(ctx, text, cx, baseline, size, targetW) {
  ctx.save();
  ctx.font = `${size}px ${FONT}`;
  ctx.textAlign = 'left';
  const m = ctx.measureText(text);
  const sx = Math.min(1.12, Math.max(0.85, targetW / m.width));
  ctx.translate(cx, baseline);
  ctx.transform(1, 0, -0.05, 1, 0, 0);
  ctx.scale(sx, 1.22);
  ctx.fillText(text, -m.width / 2, 0);
  ctx.strokeText(text, -m.width / 2, 0);
  ctx.restore();
}

/**
 * Draws the caption block whose bottom edge is at footY, spanning targetW from x.
 * lines: array of strings, last one is the title. Returns the y the stack reaches up to.
 */
export function drawCaption(ctx, x, footY, targetW, lines, opts) {
  const text = lines.map((l) => l.trim()).filter(Boolean);
  if (!text.length) return footY;
  const kicker = opts.kicker !== false ? text.slice(0, -1) : [];
  const title = text[text.length - 1].toUpperCase();
  const unit = Math.min(targetW * 0.075, ctx.canvas.height * 0.16) * (opts.titleScale ?? 1);

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  const titleSize = titleSizeFor(ctx, title, targetW, unit);

  ctx.save();
  ctx.shadowColor = 'rgba(20, 0, 40, 0.85)';
  ctx.shadowBlur = unit * 0.22;
  ctx.shadowOffsetY = unit * 0.09;
  ctx.lineJoin = 'round';
  ctx.lineWidth = (opts.outline !== false ? unit * 0.1 : 0) / 1.22;
  ctx.strokeStyle = '#26013e';
  const fill = ctx.createLinearGradient(0, footY - titleSize * 1.3, 0, footY);
  fill.addColorStop(0, '#ffffff');
  fill.addColorStop(0.35, opts.color ?? '#ffd9f2');
  fill.addColorStop(0.75, '#ff64b8');
  fill.addColorStop(1, '#ff2fa0');
  ctx.fillStyle = fill;
  drawTitle(ctx, title, x + targetW / 2, footY, titleSize, targetW * 0.97);
  ctx.restore();

  let ky = footY - titleSize * 1.22 * 0.88 - unit * 0.24;
  for (let i = kicker.length - 1; i >= 0; i--) {
    const line = kicker[i].toUpperCase();
    const kSize = Math.max(14, unit * 0.44);
    ctx.save();
    ctx.font = `${kSize}px ${FONT}`;
    ctx.textAlign = 'left';
    const spacing = kSize * 0.5;
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = `${spacing}px`;
    const width = ctx.measureText(line).width;
    const sx = Math.min(1.25, Math.max(0.7, (targetW * 0.58) / Math.max(1, width)));
    ctx.translate(x + targetW / 2, ky);
    ctx.scale(sx, 1);
    ctx.fillStyle = '#ffe9f6';
    ctx.strokeStyle = '#26013e';
    ctx.lineWidth = kSize * 0.17;
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(20, 0, 40, 0.8)';
    ctx.shadowBlur = kSize * 0.3;
    ctx.shadowOffsetY = kSize * 0.1;
    ctx.strokeText(line, -width / 2, 0);
    ctx.fillText(line, -width / 2, 0);
    ctx.restore();
    ky -= kSize * 1.35;
  }
  return ky;
}

/** Height in px the caption stack needs for these lines at this width. */
export function captionHeight(ctx, targetW, lines, opts) {
  const text = (lines ?? []).map((l) => l.trim()).filter(Boolean);
  if (!text.length) return 0;
  const unit = Math.min(targetW * 0.075, ctx.canvas.height * 0.16) * (opts?.titleScale ?? 1);
  const kicker = opts?.kicker !== false ? text.slice(0, -1) : [];
  const title = text[text.length - 1];
  const titleSize = titleSizeFor(ctx, title, targetW, unit);
  return titleSize * 1.22 + kicker.length * unit * 0.44 * 1.35 + unit * 0.3;
}
