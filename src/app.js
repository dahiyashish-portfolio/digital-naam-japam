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

  // Start Ekagrata Engine
  startEkagrataEngine();

  // Initialize Jaap UI
  initJaapUI();
}

// --------------------------------------------------
// 2. Temporary Render Hooks
// (These will move to /ui modules later)
// --------------------------------------------------

function renderStats() {
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
