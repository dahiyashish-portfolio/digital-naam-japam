// ui/printUI.js
// --------------------------------------------------
// Print UI Module – Grid / PDF-style Output
// Migrated from legacy index.html (Phase 8B)
// --------------------------------------------------
// RESPONSIBILITIES:
// - Own print modal button (doPrintBtn)
// - Generate grid-based printable layout
// - Read canonical state only
// - Trigger browser print
// --------------------------------------------------
// RULES:
// - NO global variables (appData, config, etc.)
// - NO state mutation
// - NO storage access
// - Exact visual parity with legacy print
// --------------------------------------------------

import { getAppData, getConfig } from "../core/state.js";

function $(id) {
  return document.getElementById(id);
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function initPrintUI() {
  const openBtn = $("printSlipBtn");
  const printBtn = $("doPrintBtn");
  const jholiModal = $("jholiModal");
  const printModal = $("printModal");

  if (!openBtn || !printBtn) {
    console.warn("[printUI] print buttons not found");
    return;
  }
  // ---- Open Print Modal ----
  openBtn.onclick = () => {
    if (jholiModal) jholiModal.style.display = "none";
    if (printModal) printModal.style.display = "flex";
  };

  // ---- Generate & Print ----
  printBtn.onclick = () => {
    const appData = getAppData();
    const config = getConfig();

    // ---- Build mantra regex ----
    let pat = escapeRegExp(config.mantra);
    if (config.transEnable && config.transScript) {
      pat += "|" + escapeRegExp(config.transScript);
    }

    const matches = appData.text.match(new RegExp(pat, "gi"));

    if (!matches) {
      alert("Kuch likha nahi (Nothing typed)!");
      return;
    }

    // ---- Grid generation ----
    let gridHtml = "";
    const hwImg = appData.ishtaImg || null; // handwriting / ishta image

    if (hwImg) {
      for (let i = 0; i < matches.length; i++) {
        gridHtml += `
          <div style="border-right:1px solid #fc0; border-bottom:1px solid #fc0;
                      padding:5px; display:flex; justify-content:center; align-items:center;">
            <img src="${hwImg}" style="max-height:25px; max-width:100%;">
          </div>`;
      }
    } else {
      gridHtml = matches
        .map(
          (x) =>
            `<div style="border-right:1px solid #fc0; border-bottom:1px solid #fc0;
                          padding:5px; text-align:center;">${x}</div>`
        )
        .join("");
    }

    // ---- Optional UI fields ----
    const sadhak = $("devName")?.value || "Guest";
    const ardas = $("ardasNote")?.value || "";
    const sigImg = appData.customSound || null; // reuse if signature image exists

    // ---- Open print window ----
    const w = window.open("", "", "width=800,height=800");
    if (!w) {
      alert("Popup blocked. Allow popups to print.");
      return;
    }

    w.document.write(`
      <html>
      <body style="font-family:serif; color:#4e342e; padding:30px;">
        <h1 style="text-align:center; color:#d84315;">|| Shree Ram ||</h1>

        <div style="background:#fff8e1; padding:10px; font-weight:bold;
                    display:flex; justify-content:space-between;">
          <span>Sadhak: ${sadhak}</span>
          <span>Sankhya: ${matches.length}</span>
        </div>

        <div style="display:grid;
                    grid-template-columns:repeat(auto-fill, minmax(60px,1fr));
                    border:1px solid #fc0;
                    margin-top:20px; font-size:12px;">
          ${gridHtml}
        </div>

        <div style="margin-top:20px; font-style:italic;">Ardas: ${ardas}</div>

        <div style="text-align:right; margin-top:40px;">
          ${sigImg ? `<img src="${sigImg}" height="50">` : "Hastakshar"}
        </div>
      </body>
      </html>`);

    w.document.close();
    w.focus();
    w.print();

    // ---- Close print modal ----
    if (printModal) printModal.style.display = "none";
  };
}

// --------------------------------------------------
// End of ui/printUI.js
// --------------------------------------------------
