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

// export function handleTypingJaap(text) {
//   registerActivity();

//   const regex = getMantraPattern();
//   const matches = text.match(regex);

//   const count = matches ? matches.length : 0;

//   // setAppData({
//   //   text,
//   //   count,
//   // });
//   setAppData({ text });

// }
export function handleTypingJaap(text) {
  console.log("[ENGINE] handleTypingJaap", text);
  registerActivity();

  // 1️⃣ Update expressive text ONLY
  setAppData({ text });

  // 2️⃣ Detect desired count (OLD BEHAVIOR, restored)
  const { mantra, transEnable, transScript } = getConfig();

  let pat = mantra.trim();
  if (transEnable && transScript) {
    pat += "|" + transScript;
  }

  const regex = new RegExp(pat, "gi");
  const matches = text.match(regex);
  const desiredCount = matches ? matches.length : 0;

  // 3️⃣ Reconcile canonical count to desired count
  const { count } = getAppData();
  const delta = desiredCount - count;

  if (delta > 0) {
    for (let i = 0; i < delta; i++) {
      console.log({
        text,
        desiredCount,
        currentCount: getAppData().count,
        delta,
      
});
      handleTapJaap({ syncUI: false });
    }
    renderStats();
  }
}



// --------------------------------------------------
// 2. Tap / Click-based Jaap
// --------------------------------------------------

// export function handleTapJaap() {
//   registerActivity();

//   const { text, count } = getAppData();
//   const { mantra, transEnable, transScript } = getConfig();

//   const token = transEnable && transScript ? transScript : mantra;
//   const spacer = text.length > 0 ? " " : "";

//   setAppData({
//     text: text + spacer + token,
//     count: count + 1,
//   });
//     // 🔁 Sync text to UI (tap & spacebar)
//   const jaapArea = document.getElementById("jaapArea");
//   if (jaapArea) jaapArea.value = getAppData().text;
  
//   renderStats();
// }
export function handleTapJaap({ syncUI = true } = {}) {
  registerActivity();

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
