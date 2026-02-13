// core/state.js
// --------------------------------------------------
// Canonical in-memory state for Sadhana
// Phase 1 refactor: extracted from index.html
// --------------------------------------------------
//
// IMPORTANT RULES:
// - STATE ONLY (no DOM, no storage)
// - Controlled mutation only via setters
// - Offline-first, truth-preserving
// --------------------------------------------------
import { getOrCreateDeviceId } from "./device.js";

export const MALA = 108;

// ----- Default State Shapes -----
const DEFAULT_APP_DATA = {
  count: 0,
  text: "",
  date: new Date().toDateString(),
  activeSeconds: 0,
  ishtaImg: null,
  customSound: null,
  deviceId: null
};

const DEFAULT_CONFIG = {
  mantra: "Ram",
  target: 108,
  theme: "light",
  transEnable: false,
  transScript: "राम",
};

// ----- Canonical State (private) -----
let appData = { ...DEFAULT_APP_DATA };
let config = { ...DEFAULT_CONFIG };
let history = [];

// ----- Normalizers (defensive by design) -----
function normalizeAppData(input) {
  const base = {
    ...DEFAULT_APP_DATA,
    ...(input && typeof input === "object" ? input : {}),
  };

  if (!base.deviceId) {
    base.deviceId = getOrCreateDeviceId();
  }
  if (base.count === undefined || Number.isNaN(base.count)) {
    base.count = 0;
  }
  if (base.text === undefined || typeof base.text !== "string") {
    base.text = "";
  }
  
  if (base.activeSeconds === undefined || Number.isNaN(base.activeSeconds)) {
    base.activeSeconds = 0;
  }

  if (!base.date) {
    base.date = new Date().toDateString();
  }

  return base;
}

function normalizeConfig(input) {
  return {
    ...DEFAULT_CONFIG,
    ...(input && typeof input === "object" ? input : {}),
  };
}

function normalizeHistory(input) {
  return Array.isArray(input) ? [...input] : [];
}

// ----- Read-only Getters (NO live references) -----
export function getAppData() {
  return { ...appData };
}

export function getConfig() {
  return { ...config };
}

export function getHistory() {
  return [...history];
}

// ----- Controlled Mutators -----
export function setAppData(partial) {
  appData = normalizeAppData({
    ...appData,
    ...(partial && typeof partial === "object" ? partial : {}),
  });
}

export function setConfig(partial) {
  config = normalizeConfig({
    ...config,
    ...(partial && typeof partial === "object" ? partial : {}),
  });
}

export function setHistory(array) {
  history = normalizeHistory(array);
}

// ----- Daily Reset Helper -----
// NOTE: reset happens ONLY when date actually changes
export function resetDailyState(today) {
  const current = today || new Date().toDateString();

  if (appData.date !== current) {
    if (appData.count > 0) {
      // history = [
      //   { date: appData.date, count: appData.count },
      //   ...history,
      // ];
      history = [
        {
          date: appData.date,
          count: appData.count,
          activeSeconds: appData.activeSeconds || 0,
          deviceId: appData.deviceId,
        },
        ...history,
    ];

    }

    appData = normalizeAppData({
      ...appData,
      count: 0,
      text: "",
      activeSeconds: 0,
      date: current,
    });
  }
}

// ----- Full State Hydration (restore / future sync) -----
export function hydrateState(nextState) {
  const incoming = nextState && typeof nextState === "object" ? nextState : {};
  appData = normalizeAppData(incoming.appData);
  config = normalizeConfig(incoming.config);
  history = normalizeHistory(incoming.history);
}

// ----- Snapshot (deep, read-only, witness view) -----
function deepFreeze(value) {
  if (!value || typeof value !== "object") return value;
  Object.freeze(value);
  Object.keys(value).forEach((k) => deepFreeze(value[k]));
  return value;
}

function clone(value) {
  // Safe for Phase 1 data shapes
  return JSON.parse(JSON.stringify(value));
}

export function snapshotState() {
  const snapshot = {
    appData: clone(appData),
    config: clone(config),
    history: clone(history),
  };
  return deepFreeze(snapshot);
}

// --------------------------------------------------
// End of core/state.js
// --------------------------------------------------
