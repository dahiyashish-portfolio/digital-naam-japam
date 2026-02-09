// sadhana/visualEngine.js
// --------------------------------------------------
// Visual Engine for Sadhana (Phase 6)
// --------------------------------------------------
// PURPOSE:
// - Own all canvas-based visuals
// - Mandala (108 beads) rendering
// - Jyoti / Ishta Devata idle-state visuals
// - NO state mutation
// - NO storage access
// --------------------------------------------------

import { MALA, getAppData } from "../core/state.js";

// --------------------------------------------------
// Mandala Engine
// --------------------------------------------------

let mandalaCtx = null;
let mandalaSize = 0;

export function initMandala(canvas) {
  if (!canvas) return;
  mandalaCtx = canvas.getContext("2d");
  mandalaSize = Math.min(canvas.width, canvas.height);
}

function drawMalaWire(ctx, cx, cy, radius) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "#cfa44a"; // warm mala gold
  ctx.lineWidth = 3;
  ctx.stroke();
}

function drawCentralBindu(ctx, cx, cy) {
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.fillStyle = "#cfa44a";
  ctx.shadowColor = "#cfa44a";
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.shadowBlur = 0;
}

export function renderMandala() {
  if (!mandalaCtx) return;

  const { count } = getAppData();
  const filled = count % MALA;

  mandalaCtx.clearRect(0, 0, mandalaSize, mandalaSize);

  const cx = mandalaSize / 2;
  const cy = mandalaSize / 2;
  const radius = mandalaSize * 0.4;

  // 1️⃣ Draw mala continuity FIRST (background)
  drawMalaWire(mandalaCtx, cx, cy, radius);
  drawCentralBindu(mandalaCtx, cx, cy);

  for (let i = 0; i < MALA; i++) {
  const angle = (2 * Math.PI * i) / MALA - Math.PI / 2;
  const x = cx + radius * Math.cos(angle);
  const y = cy + radius * Math.sin(angle);

  // 🔸 Optional energy ray (parity with original design)
  if (i < filled) {
    mandalaCtx.beginPath();
    mandalaCtx.moveTo(cx, cy);
    mandalaCtx.lineTo(x, y);
    mandalaCtx.strokeStyle = `hsla(${i * 3.3}, 70%, 50%, 0.4)`;
    mandalaCtx.lineWidth = 1;
    mandalaCtx.stroke();
  }

  // 🔸 Bead
  mandalaCtx.beginPath();
  mandalaCtx.arc(x, y, 4, 0, 2 * Math.PI);
  mandalaCtx.fillStyle = i < filled ? "#ff9933" : "#ccc";
  mandalaCtx.fill();
}
const roundsEl = document.getElementById("roundsCount");
if (roundsEl) {
  roundsEl.textContent = Math.floor(getAppData().count / MALA);
}
}


// --------------------------------------------------
// Jyoti / Ishta Devata Visual Engine
// --------------------------------------------------

let jyotiImg = null;
let jyotiEl = null;

const IDLE_DIM_1 = 30_000; // 30 sec
const IDLE_DIM_2 = 60_000; // 60 sec

export function initJyoti(imgEl) {
  jyotiEl = imgEl;
}

export function updateJyotiVisual(lastActivityTs) {
  if (!jyotiEl) return;

  const idleTime = Date.now() - lastActivityTs;

  if (idleTime < IDLE_DIM_1) {
    jyotiEl.style.opacity = "1";
    jyotiEl.style.animation = "none";
  } else if (idleTime < IDLE_DIM_2) {
    jyotiEl.style.opacity = "0.6";
    jyotiEl.style.animation = "flicker 2s infinite";
  } else {
    jyotiEl.style.opacity = "0.2";
    jyotiEl.style.animation = "none";
  }
}

// --------------------------------------------------
// End of sadhana/visualEngine.js
// --------------------------------------------------
