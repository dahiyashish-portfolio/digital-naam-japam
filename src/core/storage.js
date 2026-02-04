// core/storage.js
// --------------------------------------------------
// Persistence & day-boundary handling for Sadhana
// Phase 2 refactor: extracted from index.html
// --------------------------------------------------

// IMPORTANT RULES:
// - This file handles STORAGE ONLY
// - No DOM access
// - No UI logic
// - Calls into core/state for mutations
// - Offline-first, synchronous by default
// --------------------------------------------------

import {
  getAppData,
  getConfig,
  getHistory,
  setAppData,
  setConfig,
  setHistory,
  resetDailyState,
} from "./state.js";

// ----- Storage Keys (v1) -----
// NOTE: Keep keys stable for backward compatibility
export const STORAGE_KEYS = {
  DATA: "sadhana_jholi_data",
  CONF: "sadhana_jholi_conf",
  HIST: "sadhana_jholi_hist",
};

// ----- Safe JSON helpers -----
function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function safeStringify(obj) {
  try {
    return JSON.stringify(obj);
  } catch {
    return null;
  }
}

// ----- Load from storage -----
export function loadFromStorage() {
  const rawData = localStorage.getItem(STORAGE_KEYS.DATA);
  const rawConf = localStorage.getItem(STORAGE_KEYS.CONF);
  const rawHist = localStorage.getItem(STORAGE_KEYS.HIST);

  if (rawData) {
    const parsed = safeParse(rawData);
    if (parsed) setAppData(parsed);
  }

  if (rawConf) {
    const parsed = safeParse(rawConf);
    if (parsed) setConfig(parsed);
  }

  if (rawHist) {
    const parsed = safeParse(rawHist);
    if (parsed) setHistory(parsed);
  }

  // Ensure correct day boundary after hydration
  resetDailyState();
}

// ----- Save to storage -----
export function saveToStorage() {
  const data = safeStringify(getAppData());
  const conf = safeStringify(getConfig());
  const hist = safeStringify(getHistory());

  if (data) localStorage.setItem(STORAGE_KEYS.DATA, data);
  if (conf) localStorage.setItem(STORAGE_KEYS.CONF, conf);
  if (hist) localStorage.setItem(STORAGE_KEYS.HIST, hist);
}

// ----- Clear storage (explicit user action only) -----
export function clearStorage() {
  localStorage.removeItem(STORAGE_KEYS.DATA);
  localStorage.removeItem(STORAGE_KEYS.CONF);
  localStorage.removeItem(STORAGE_KEYS.HIST);
}

// --------------------------------------------------
// End of core/storage.js
// --------------------------------------------------
