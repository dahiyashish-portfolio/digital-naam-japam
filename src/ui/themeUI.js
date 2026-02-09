// ui/themeUI.js
// --------------------------------------------------
// Theme UI Module (Light / Dark / Drishti)
// Phase 8B – Step 3
// --------------------------------------------------
// RESPONSIBILITIES:
// - Own theme toggle button wiring
// - Apply theme to document root
// - Persist theme choice via core/state
// --------------------------------------------------
// RULES:
// - NO direct localStorage access
// - NO CSS mutation outside theme attributes
// - Single source of truth: core/state
// --------------------------------------------------

import { getConfig, setConfig } from "../core/state.js";

function $(id) {
  return document.getElementById(id);
}

// function applyTheme(theme) {
//   // Expecting theme values like: 'light' | 'dark'
//   document.documentElement.setAttribute("data-theme", theme);
// }
function applyTheme(theme) {
  document.body.classList.toggle("dark-mode", theme === "dark");
}

export function initThemeUI() {
  const themeBtn = $("themeBtn");
  if (!themeBtn) {
    console.warn("[themeUI] themeBtn not found");
    return;
  }

  // ---- Apply persisted theme on load ----
  const { theme } = getConfig();
  if (theme) applyTheme(theme);

  // ---- Toggle handler ----
  themeBtn.onclick = () => {
    const cfg = getConfig();
    const nextTheme = cfg.theme === "dark" ? "light" : "dark";

    setConfig({ theme: nextTheme });
    applyTheme(nextTheme);
  };
}

// --------------------------------------------------
// End of ui/themeUI.js
// --------------------------------------------------
