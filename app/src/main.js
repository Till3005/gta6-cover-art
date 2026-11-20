// Wires the page: photos in, panels arranged, caption set, PNG out. Query params set up fixed scenes
// (?demo or ?shot=... plus ?view=cover&layout=...&caption=...&size=WxH) for screenshots — ./shots.js.

import { LAYOUTS, panelAt } from './layouts.js';
import { makeState, renderPoster } from './cover.js';
import { proceduralPhoto } from './procedural.js';
import { runShot } from './shots.js';

const canvas = document.getElementById('cover');
const captionBox = document.getElementById('caption');
const statusEl = document.getElementById('status');
const panelIndex = document.getElementById('panelIndex');
const panelCtrls = document.getElementById('panelCtrls');
const panelEmpty = document.getElementById('panelEmpty');

const state = makeState();
let selected = -1;

window.addEventListener('error', (e) => { document.title = `ERR: ${e.message} @ ${e.filename}:${e.lineno}`; });
window.addEventListener('unhandledrejection', (e) => { document.title = `REJ: ${e.reason}`; });

async function loadFont() {
  const url = new URL('../fonts/Anton-Regular.ttf', import.meta.url);
  const buffer = await fetch(url).then((r) => r.arrayBuffer());
  const font = new FontFace('Anton', buffer);
  await font.load();
  document.fonts.add(font);
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

function fitPanels() {
  const n = LAYOUTS[state.layout].panels.length;
  while (state.panels.length < n) state.panels.push({ zoom: 1, ox: 0, oy: 0, seed: state.panels.length * 977 + 13 });
  state.panels.length = n;
  if (selected >= n) selectPanel(-1);
}

function render() {
  renderPoster(canvas, state, selected);
}

function selectPanel(i) {
  selected = i;
  panelCtrls.classList.toggle('hidden', i < 0);
  panelEmpty.classList.toggle('hidden', i >= 0);
  if (i < 0) { panelIndex.textContent = '—'; return; }
  panelIndex.textContent = `#${i + 1}`;
  const p = state.panels[i];
  pZoom.value = (p.zoom ?? 1) * 100;
  pOx.value = p.ox ?? 0;
  pOy.value = p.oy ?? 0;
  render();
}

/* ---------- photos ---------- */

async function addFiles(files, targetPanel = null) {
  const images = [...files].filter((f) => f.type.startsWith('image/'));
  if (!images.length) return;
  let at = targetPanel;
  for (const file of images) {
    if (at === null || at >= state.panels.length) {
      at = state.panels.findIndex((p) => !p.photo);
      if (at === -1) at = selected >= 0 ? selected : 0;
    }
    state.panels[at].photo = await loadImage(URL.createObjectURL(file));
    at += 1;
  }
  render();
}

document.getElementById('photos').addEventListener('change', (e) => {
  addFiles(e.target.files);
  e.target.value = '';
});

document.getElementById('samples').addEventListener('click', () => loadSamples());

async function loadSamples() {
  const pier = await loadImage('samples/pier.jpg');
  const blvd = await loadImage('samples/boulevard.jpg');
  const cityA = proceduralPhoto(1000, 1300, 5);
  const cityB = proceduralPhoto(1200, 1000, 23);
  fitPanels();
  Object.assign(state.panels[0], { photo: blvd, zoom: 1.15, oy: -18 });
  if (state.panels[1]) Object.assign(state.panels[1], { photo: pier, zoom: 1.1, oy: 6 });
  if (state.panels[2]) Object.assign(state.panels[2], { photo: cityA, zoom: 1.05 });
  if (state.panels[3]) Object.assign(state.panels[3], { photo: cityB, zoom: 1.25, ox: -14 });
  if (state.panels[4]) Object.assign(state.panels[4], { photo: pier, zoom: 1.9, ox: -22, oy: -12, seed: 909 });
  render();
}

/* ---------- drag & drop ---------- */

const veil = document.getElementById('dragveil');
const stage = document.querySelector('.stage');
let dragDepth = 0;

function enterDrag(on) {
  dragDepth += on ? 1 : -1;
  veil.classList.toggle('on', dragDepth > 0);
  document.getElementById('dropzone').classList.toggle('hot', dragDepth > 0);
}

for (const el of [stage, document.getElementById('dropzone')]) {
  el.addEventListener('dragenter', (e) => { e.preventDefault(); enterDrag(true); });
  el.addEventListener('dragleave', () => enterDrag(false));
  el.addEventListener('dragover', (e) => e.preventDefault());
}

window.addEventListener('dragenter', () => enterDrag(true));
window.addEventListener('dragleave', () => enterDrag(false));

window.addEventListener('drop', (e) => {
  e.preventDefault();
  dragDepth = 0;
  veil.classList.remove('on');
  document.getElementById('dropzone').classList.remove('hot');
  const rect = canvas.getBoundingClientRect();
  const px = (e.clientX - rect.left) * (canvas.width / rect.width);
  const py = (e.clientY - rect.top) * (canvas.height / rect.height);
  const hit = panelAt(LAYOUTS[state.layout], canvas.width, canvas.height, Math.round(Math.min(canvas.width, canvas.height) * 0.014), px, py);
  addFiles(e.dataTransfer.files, hit >= 0 ? hit : null);
});

/* ---------- canvas interaction ---------- */

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const px = (e.clientX - rect.left) * (canvas.width / rect.width);
  const py = (e.clientY - rect.top) * (canvas.height / rect.height);
  const hit = panelAt(LAYOUTS[state.layout], canvas.width, canvas.height, Math.round(Math.min(canvas.width, canvas.height) * 0.014), px, py);
  selectPanel(hit);
});

/* ---------- controls ---------- */

const layoutRow = document.getElementById('layouts');
for (const [key, def] of Object.entries(LAYOUTS)) {
  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'chip';
  chip.textContent = def.label;
  chip.dataset.layout = key;
  chip.addEventListener('click', () => setLayout(key));
  layoutRow.append(chip);
}

function setLayout(key) {
  state.layout = key;
  fitPanels();
  for (const chip of layoutRow.children) chip.classList.toggle('on', chip.dataset.layout === key);
  render();
}

function syncCaption() {
  state.lines = captionBox.value.split('\n');
  render();
}
captionBox.addEventListener('input', syncCaption);

const bind = (id, fn) => document.getElementById(id).addEventListener('input', fn);
bind('titleScale', (e) => { state.titleScale = e.target.value / 100; render(); });
bind('titleColor', (e) => { state.titleColor = e.target.value; render(); });
bind('grade', (e) => { state.grade = e.target.value / 100; render(); });
bind('grain', (e) => { state.grainAmt = e.target.value / 100; render(); });
bind('vignette', (e) => { state.vignetteAmt = e.target.value / 100; render(); });
bind('outline', (e) => { state.outline = e.target.checked; render(); });
bind('kickerOn', (e) => { state.kicker = e.target.checked; render(); });
bind('frameOn', (e) => { state.frame = e.target.checked; render(); });

bind('pZoom', (e) => { if (selected >= 0) { state.panels[selected].zoom = e.target.value / 100; render(); } });
bind('pOx', (e) => { if (selected >= 0) { state.panels[selected].ox = +e.target.value; render(); } });
bind('pOy', (e) => { if (selected >= 0) { state.panels[selected].oy = +e.target.value; render(); } });
document.getElementById('pClear').addEventListener('click', () => { if (selected >= 0) { delete state.panels[selected].photo; render(); } });
document.getElementById('pReshuffle').addEventListener('click', () => { if (selected >= 0) { state.panels[selected].seed = Math.floor(Math.random() * 100000); render(); } });
document.getElementById('pReplace').addEventListener('click', () => document.getElementById('pFile').click());
document.getElementById('pFile').addEventListener('change', async (e) => {
  if (selected >= 0 && e.target.files[0]) {
    state.panels[selected].photo = await loadImage(URL.createObjectURL(e.target.files[0]));
    render();
  }
  e.target.value = '';
});

/* ---------- ratio + export ---------- */

function setRatio(w, h) {
  canvas.width = w;
  canvas.height = h;
  for (const chip of document.querySelectorAll('.ratio .chip')) {
    chip.classList.toggle('on', chip.dataset.ratio === `${w}x${h}`);
  }
  render();
}

for (const chip of document.querySelectorAll('.ratio .chip')) {
  chip.addEventListener('click', () => {
    const [w, h] = chip.dataset.ratio.split('x').map(Number);
    setRatio(w, h);
  });
}

for (const btn of document.querySelectorAll('.exports .btn')) {
  btn.addEventListener('click', () => {
    const [w, h] = btn.dataset.size.split('x').map(Number);
    const out = document.createElement('canvas');
    out.width = w; out.height = h;
    renderPoster(out, state, -1);
    out.toBlob((blob) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `sunset-district-${w}x${h}.png`;
      a.click();
      statusEl.textContent = `Saved sunset-district-${w}x${h}.png`;
    }, 'image/png');
  });
}

/* ---------- boot + fixed scenes ---------- */

async function boot() {
  fitPanels();
  setLayout(state.layout);
  syncCaption();
  render();

  const params = new URLSearchParams(location.search);
  const demo = params.has('demo') || params.has('shot');
  if (demo) {
    await runShot(params, {
      setRatio,
      setLayout,
      loadSamples,
      applyCaption(lines, opts) {
        captionBox.value = lines.join('\n');
        state.lines = lines;
        if (opts.titleScale) { state.titleScale = Math.min(1.5, opts.titleScale); document.getElementById('titleScale').value = state.titleScale * 100; }
      },
      render,
      done() {
        requestAnimationFrame(() => requestAnimationFrame(() => { window.__shotReady = true; }));
      },
    });
  }
}

loadFont().then(boot).catch(() => boot());
