// ui/jaapUI.js
// --------------------------------------------------
// UI Wiring for Naam Jaap (Phase 5)
// --------------------------------------------------
// PURPOSE:
// - Own all DOM event listeners
// - Delegate logic to sadhana/jaapEngine
// - Delegate activity tracking to core/time
// - Keep index.html free of business logic
// --------------------------------------------------

import { handleTypingJaap, handleTapJaap } from "../sadhana/jaapEngine.js";
import { registerActivity } from "../core/time.js";

// --------------------------------------------------
// DOM Helpers
// --------------------------------------------------

function $(id) {
  return document.getElementById(id);
}

// --------------------------------------------------
// Init UI Wiring
// --------------------------------------------------

export function initJaapUI() {
  const jaapArea = $("jaapArea");
  const tapBtn = $("tapBtn");

  if (!jaapArea || !tapBtn) return;

  // Typing-based Jaap
  jaapArea.addEventListener("input", (e) => {
    handleTypingJaap(e.target.value);
  });

  // Prevent paste shortcuts (discipline rule)
  jaapArea.addEventListener("paste", (e) => {
    e.preventDefault();
    alert("⚠️ No Shortcuts! Likith Jaap Anivarya Hai.");
  });

  // Tap-based Jaap
  tapBtn.addEventListener("pointerup", (e) => {
    e.preventDefault();
    handleTapJaap();
  });

  // Keyboard support for tap mode (Space / Enter)
  document.addEventListener("keyup", (e) => {
    if (e.code === "Space" || e.code === "Enter") {
      handleTapJaap();
    }
  });

  // Generic activity hook (fallback)
  document.addEventListener("click", () => registerActivity());
}

// --------------------------------------------------
// End of ui/jaapUI.js
// --------------------------------------------------
