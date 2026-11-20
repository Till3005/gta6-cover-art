// Fixed scenes for screenshots: ?demo (or ?shot=1) auto-loads sample photos + a caption and renders the cover.
// ?view=cover strips the UI so only the poster fills the window; ?preset=, ?layout=, ?caption=, ?kicker=,
// ?scale= and ?size=WxH vary the scene. window.__shotReady is set once painted.

export async function runShot(params, api) {
  if (params.get('view') === 'cover') document.body.classList.add('shot-cover');

  const size = params.get('size');
  if (size) {
    const [w, h] = size.split('x').map(Number);
    if (w > 0 && h > 0) api.setRatio(w, h);
  }

  const preset = params.get('preset');
  if (preset) api.setPreset(preset);

  const layout = params.get('layout');
  if (layout) api.setLayout(layout);

  const caption = params.get('caption');
  const kicker = params.get('kicker') ?? 'SUNSET CITY';
  const scale = Number(params.get('scale'));
  const lines = [];
  if (kicker) lines.push(kicker);
  lines.push(caption ?? 'VICE NIGHTS');
  api.applyCaption(lines, { titleScale: Number.isFinite(scale) && scale > 0 ? Math.min(1.5, scale / 100) : undefined });

  await api.loadSamples();
  api.render();
  api.done();
}
