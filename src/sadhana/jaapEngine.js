// sadhana/jaapEngine.js
// --------------------------------------------------
// Jaap Engine for Sadhana
// Phase 4 refactor: extracted from index.html
// --------------------------------------------------
// PURPOSE:
// - Centralize Naam Jaap counting logic
// - Handle typing & tap-based jaap consistently
// - Register activity for Ekagrata
// - Update canonical state ONLY via core/state
// --------------------------------------------------

import { getAppData, getConfig, setAppData } from "../core/state.js";
import { registerActivity } from "../core/time.js";
import { renderStats } from "../app.js";
import { renderMandala } from "./visualEngine.js";
import { playTapSound } from "../ui/soundUI.js";

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getMantraPattern() {
  const { mantra, transEnable, transScript } = getConfig();

  let pattern = escapeRegExp(mantra.trim());
  if (transEnable && transScript) {
    pattern += "|" + escapeRegExp(transScript);
  }

  return new RegExp(pattern, "gi");
}

// --------------------------------------------------
// 1. Typing-based Jaap
// --------------------------------------------------
export function handleTypingJaap(rawText) {
  registerActivity();
  playTapSound();
  const { mantra, transEnable, transScript } = getConfig();

  let text = rawText;

  // 🔤 Transcription (NO word-boundary, Unicode-safe)
  if (transEnable && transScript) {
    const escapedMantra = escapeRegExp(mantra.trim());
    const replacePattern = new RegExp(escapedMantra, "gi");
    text = rawText.replace(replacePattern, transScript);
  }

  // 🧮 Count using canonical pattern (Ram + राम)
  const pattern = getMantraPattern();
  const matches = text.match(pattern);
  const count = matches ? matches.length : 0;

  setAppData({ text, count });

  // 🔁 SYNC textarea (CRITICAL — same as tap)
  const jaapArea = document.getElementById("jaapArea");
  if (jaapArea && jaapArea.value !== text) {
    jaapArea.value = text;
  }

  // 🔁 UI update
  renderStats();
  renderMandala();
}
// --------------------------------------------------
// 2. Tap / Click-based Jaap
// --------------------------------------------------

export function handleTapJaap({ syncUI = true } = {}) {
  registerActivity();
  playTapSound();

  const { text, count } = getAppData();
  const { mantra, transEnable, transScript } = getConfig();

  const token = transEnable && transScript ? transScript : mantra;
  const spacer = text.length > 0 ? " " : "";

  setAppData({
    text: text + spacer + token,
    count: count + 1,
  });

  // 🔁 Sync text ONLY for real tap / spacebar
  if (syncUI) {
    const jaapArea = document.getElementById("jaapArea");
    if (jaapArea) jaapArea.value = getAppData().text;
  }

  renderStats();
  renderMandala();
}

// --------------------------------------------------
// 3. Read-only Utilities
// --------------------------------------------------

export function getCurrentCount() {
  return getAppData().count;
}

// --------------------------------------------------
// End of sadhana/jaapEngine.js
// --------------------------------------------------
