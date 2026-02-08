// app.js
// --------------------------------------------------
// Application bootstrap & wiring layer for Sadhana
// Phase 2.5: Wiring core/state + core/storage
// --------------------------------------------------
// IMPORTANT:
// - This file WIRES modules together
// - No business logic lives here
// - No state shape definitions
// - Minimal DOM touchpoints only
// --------------------------------------------------
// --- Global Sadhana Runtime State ---
console.log("[BOOT] app.js loaded");

window.__SADHANA__ = window.__SADHANA__ || {};
window.__SADHANA__.isClicker = false; // Tap (JAPA) mode OFF by default

import {
  getAppData,
  getConfig,
  getHistory,
  snapshotState,
} from "./core/state.js";
import {
  loadFromStorage,
  saveToStorage,
} from "./core/storage.js";
import { startEkagrataEngine } from "./core/time.js";
import { initJaapUI } from "./ui/jaapUI.js";
import {
  initMandala,
  renderMandala,
  initJyoti,
  updateJyotiVisual
} from "./sadhana/visualEngine.js";
import { getLastActivityTime } from "./core/time.js";
import { initIshtaUI } from "./ui/ishtaUI.js";;
import { initJholiUI } from "./ui/jholiUI.js";
import { initBackupUI } from "./ui/backupUI.js";
import { initThemeUI } from "./ui/themeUI.js";
import { initSettingsUI } from "./ui/settingsUI.js";
import { initPrintUI } from "./ui/printUI.js";
import { initProfileUI } from "./ui/profileUI.js";
import { initSoundUI } from "./ui/soundUI.js";

// --------------------------------------------------
// 1. Application Init
// --------------------------------------------------

function initApp() {
  // Load persisted state (offline-first)
  loadFromStorage();

  // Initial render hooks (temporary)
  renderStats();

  // Start autosave loop (matches old behavior)
  startAutoSave();

  // Register Service Worker (unchanged behavior)
  registerServiceWorker();

  // Initialize Jaap UI
  initJaapUI();

  const mandalaCanvas = document.getElementById("mandalaCanvas");
  const jyotiImg = document.getElementById("ishtaImageDisplay");

  initMandala(mandalaCanvas);
  initJyoti(jyotiImg);

  // Redraw mandala periodically (matches legacy behavior)
  setInterval(renderMandala, 1000);

  // Update Jyoti based on activity
  setInterval(() => {
    updateJyotiVisual(getLastActivityTime());
  }, 1000);

  initIshtaUI();

    // SAFE: DOM now exists
  // const backupBtn = document.getElementById("doBackupBtn");
  // if (backupBtn) {
  //   backupBtn.onclick = async () => {
  //     const pwd = document.getElementById("backupPass").value;
  //     if (!pwd) return alert("Password required");
  //     await exportEncryptedBackup(pwd);
  //   };
  // }

  // const restoreBtn = document.getElementById("doRestoreBtn");
  // if (restoreBtn) {
  //   restoreBtn.onclick = async () => {
  //     const file = document.getElementById("restoreFile").files[0];
  //     const pwd = document.getElementById("restorePass").value;
  //     if (!file || !pwd) return alert("File & password required");
  //     await restoreEncryptedBackup(file, pwd);
  //   };
  // }
  initProfileUI();
  initJholiUI();
  initBackupUI();
  initThemeUI();
  initSettingsUI();
  initPrintUI();
  initSoundUI();

  // Start Ekagrata Engine
  startEkagrataEngine();
}


// --------------------------------------------------
// 2. Temporary Render Hooks
// (These will move to /ui modules later)
// --------------------------------------------------

export function renderStats() {
  const { count, activeSeconds } = getAppData();

  const activeTimeDisplay = document.getElementById("activeTimeDisplay");
  const todayCountDisplay = document.getElementById("todayCountDisplay");

  if (!activeTimeDisplay || !todayCountDisplay) return;

  const minutes = Math.floor(activeSeconds / 60);
  activeTimeDisplay.innerText = minutes + "m";
  todayCountDisplay.innerText = count;
}

// --------------------------------------------------
// 3. Autosave (temporary – matches legacy behavior)
// --------------------------------------------------

function startAutoSave() {
  // Save every 10 seconds if state exists
  setInterval(() => {
    const state = snapshotState();
    if (state) saveToStorage();
  }, 10_000);
}

// --------------------------------------------------
// 4. Service Worker Registration
// --------------------------------------------------

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js")
      .catch((err) => console.warn("SW registration failed", err));
  }
}

// --------------------------------------------------
// 5. DOM Ready
// --------------------------------------------------

window.addEventListener("load", initApp);

// --------------------------------------------------
// End of app.js
// --------------------------------------------------
