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
let hwImg = null;
let sigImg = null;

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
  const hwInput = document.getElementById("hwMantraInput");
  const sigInput = document.getElementById("sigInput");

  if (hwInput) {
    hwInput.onchange = () => {
      const f = hwInput.files?.[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = e => (hwImg = e.target.result);
      r.readAsDataURL(f);
    };
  }

  if (sigInput) {
    sigInput.onchange = () => {
      const f = sigInput.files?.[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = e => (sigImg = e.target.result);
      r.readAsDataURL(f);
    };
  }

  if (!openBtn || !printBtn) {
    console.warn("[printUI] print buttons not found");
    return;
  }
  // ---- Open Print Modal ----
  // openBtn.onclick = () => {
  //   hwImg = null;
  //   sigImg = null;
  
  //   if (jholiModal) jholiModal.style.display = "none";
  //   if (printModal) printModal.style.display = "flex";
  // };
  openBtn.onclick = () => {
    hwImg = null;
    sigImg = null;

    if (hwInput) hwInput.value = "";   // 🔴 CRITICAL
    if (sigInput) sigInput.value = ""; // 🔴 CRITICAL

    if (jholiModal) jholiModal.style.display = "none";
    if (printModal) printModal.style.display = "flex";
  };


  // ---- Generate & Print ----
  printBtn.onclick = () => {
    const appData = getAppData();
    const config = getConfig();
    const localHwImg = hwImg;   // 🔒 snapshot
    const localSigImg = sigImg; // 🔒 snapshot

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
    //const hwImg = appData.ishtaImg || null; // hwImg comes ONLY from hwMantraInput upload (print-local state)

    if (localHwImg) {
      for (let i = 0; i < matches.length; i++) {
        gridHtml += `
          <div style="border-right:1px solid #fc0; border-bottom:1px solid #fc0;
                      padding:5px; display:flex; justify-content:center; align-items:center;">
            <img src="${localHwImg}" style="max-height:25px; max-width:100%;">
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
    //const sigImg = appData.customSound || null;// sigImg comes from file input, scoped to print only

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
          <span>Sankhya: ${appData.count}</span>
        </div>

        <div style="display:grid;
                    grid-template-columns:repeat(auto-fill, minmax(60px,1fr));
                    border:1px solid #fc0;
                    margin-top:20px; font-size:12px;">
          ${gridHtml}
        </div>

        <div style="margin-top:20px; font-style:italic;">Ardas: ${ardas}</div>

        <div style="text-align:right; margin-top:40px;">
          ${localSigImg ? `<img src="${localSigImg}" height="50">` : "Hastakshar"}
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
