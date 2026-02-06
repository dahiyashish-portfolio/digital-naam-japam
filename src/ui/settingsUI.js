// ui/settingsUI.js
// --------------------------------------------------
// Settings UI Module (Mantra, Target, Preferences)
// Phase 8B – Step 4
// --------------------------------------------------
// RESPONSIBILITIES:
// - Own Settings (Sankalpa) UI interactions
// - Read inputs and persist config via core/state
// - Apply immediate, local effects only
// --------------------------------------------------
// RULES:
// - NO direct localStorage access
// - NO backup / restore logic
// - NO DOM creation
// - Single source of truth: core/state
// --------------------------------------------------

import { getConfig, setConfig } from "../core/state.js";

function $(id) {
  return document.getElementById(id);
}

export function initSettingsUI() {
  const saveBtn = $("saveSettingsBtn");
  const mantraInput = $("mantraInput");
  const targetInput = $("targetInput");
  const transToggle = $("transToggle");
  const transScriptInput = $("transScriptInput");

  if (!saveBtn) {
    console.warn("[settingsUI] saveSettingsBtn not found");
    return;
  }

  // ---- Hydrate form from config ----
  const cfg = getConfig();
  if (mantraInput) mantraInput.value = cfg.mantra || "";
  if (targetInput) targetInput.value = cfg.target || 108;
  if (transToggle) transToggle.checked = !!cfg.transEnable;
  if (transScriptInput) transScriptInput.value = cfg.transScript || "";

  // ---- Save handler ----
  saveBtn.onclick = () => {
    const nextConfig = {
      mantra: mantraInput?.value?.trim() || cfg.mantra,
      target: parseInt(targetInput?.value, 10) || cfg.target,
      transEnable: !!transToggle?.checked,
      transScript: transScriptInput?.value?.trim() || cfg.transScript,
    };

    setConfig(nextConfig);

    alert("Sankalpa surakshit ho gaya 🙏");
  };
}

// --------------------------------------------------
// End of ui/settingsUI.js
// --------------------------------------------------
