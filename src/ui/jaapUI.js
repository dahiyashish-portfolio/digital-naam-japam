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
  console.log("[INIT] jaapUI initialized");
  const jaapArea = $("jaapArea");
  const tapBtn = $("tapBtn");
  const modeBtn = document.getElementById("modeBtn");
  const clickerView = document.getElementById("clickerView");
  if (modeBtn) {
      modeBtn.onclick = () => {
        window.__SADHANA__.isClicker = !window.__SADHANA__.isClicker;

        const isTap = window.__SADHANA__.isClicker;

        if (jaapArea) jaapArea.style.display = isTap ? "none" : "block";
        if (clickerView) clickerView.style.display = isTap ? "flex" : "none";
      };
    }

  if (!jaapArea || !tapBtn) return;

  // Typing-based Jaap
jaapArea.addEventListener("input", (e) => {
  console.log("[INPUT]", e.target.value);
  if (window.__SADHANA__?.isClicker) return; // ⛔ Tap mode ignores typing
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
  // document.addEventListener("keyup", (e) => {
  //   if (e.code === "Space" || e.code === "Enter") {
  //     handleTapJaap();
  //   }
  // });
document.addEventListener("keyup", (e) => {
  if (!window.__SADHANA__?.isClicker) return; // Vidhi gate

  if (e.code === "Space" || e.code === "Enter") {
    e.preventDefault();
    handleTapJaap();

    // visual feedback (same as mouse tap)
    const btn = document.getElementById("tapBtn");
    btn?.classList.add("active-press");
    setTimeout(() => btn?.classList.remove("active-press"), 100);
  }
});

  // Generic activity hook (fallback)
  document.addEventListener("click", () => registerActivity());
}

// --------------------------------------------------
// End of ui/jaapUI.js
// --------------------------------------------------
