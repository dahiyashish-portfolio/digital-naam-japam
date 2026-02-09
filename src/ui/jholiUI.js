// ui/jholiUI.js
// --------------------------------------------------
// Meri Jholi (History & Totals) UI Module
// Phase 8B – Step 1
// --------------------------------------------------
// RESPONSIBILITIES:
// - Own Meri Jholi button click
// - Calculate & render totals
// - Render daily + historical counts
// - Open / close Jholi modal
// --------------------------------------------------
// RULES:
// - NO state mutation
// - NO storage access
// - READ-ONLY via core/state
// - DOM ownership only
// --------------------------------------------------

import { getAppData, getHistory } from "../core/state.js";

function $(id) {
  return document.getElementById(id);
}

export function initJholiUI() {
  const jholiBtn = $("jholiBtn");
  const modal = $("jholiModal");
  const totalEl = $("grandTotalDisplay");
  const listEl = $("histList");

  if (!jholiBtn || !modal || !totalEl || !listEl) {
    console.warn("[jholiUI] Required DOM elements missing");
    return;
  }

  jholiBtn.onclick = () => {
    const appData = getAppData();
    const history = getHistory();

    // ---- Calculate grand total ----
    let grandTotal = appData.count;
    history.forEach((h) => (grandTotal += h.count));

    totalEl.innerText = grandTotal.toLocaleString();

    // ---- Build history list ----
    let html = "";

    if (appData.count > 0) {
      html += `
        <div class="hist-item" style="font-weight:bold; color:var(--primary)">
          <span>Aaj</span>
          <span>${appData.count}</span>
        </div>`;
    }

    history.forEach((h) => {
      html += `
        <div class="hist-item">
          <span>${h.date}</span>
          <span>${h.count}</span>
        </div>`;
    });

    listEl.innerHTML = html || `
      <div class="hist-item">
        <span>Koi Data Nahi</span>
        <span>—</span>
      </div>`;

    // ---- Show modal ----
    modal.style.display = "flex";
  };
}

// --------------------------------------------------
// End of ui/jholiUI.js
// --------------------------------------------------
