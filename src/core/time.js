// core/time.js
// --------------------------------------------------
// Ekagrata (Active Focus Time) Engine for Sadhana
// Phase 3 refactor: extracted from index.html
// --------------------------------------------------
// PURPOSE:
// - Track active focus time (Ekagrata)
// - Increment time ONLY when user is active
// - No DOM access
// - No storage access
// - Pure time & activity logic
// --------------------------------------------------

import { getAppData, setAppData } from "./state.js";

// ----- Internal State (private) -----
let lastActivityTs = 0; // timestamp (ms)
let timerId = null;

// ----- Constants -----
const ACTIVE_WINDOW_MS = 5000; // 5 seconds rule
const TICK_INTERVAL_MS = 1000; // 1 second tick

// --------------------------------------------------
// 1. Register User Activity
// --------------------------------------------------

export function registerActivity(ts = Date.now()) {
  lastActivityTs = ts;
}

// --------------------------------------------------
// 2. Ekagrata Tick Logic
// --------------------------------------------------

function tick() {
  const now = Date.now();

  if (now - lastActivityTs <= ACTIVE_WINDOW_MS) {
    const { activeSeconds } = getAppData();

    setAppData({
      activeSeconds: (activeSeconds || 0) + 1,
    });
  }
}

// --------------------------------------------------
// 3. Engine Control
// --------------------------------------------------

export function startEkagrataEngine() {
  if (timerId) return; // already running

  timerId = setInterval(tick, TICK_INTERVAL_MS);
}

export function stopEkagrataEngine() {
  if (!timerId) return;

  clearInterval(timerId);
  timerId = null;
}

// --------------------------------------------------
// 4. Read-only Helpers
// --------------------------------------------------

export function getLastActivityTime() {
  return lastActivityTs;
}

export function isUserActive(now = Date.now()) {
  return now - lastActivityTs <= ACTIVE_WINDOW_MS;
}

// --------------------------------------------------
// End of core/time.js
// --------------------------------------------------
