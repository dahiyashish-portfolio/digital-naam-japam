// core/device.js
// --------------------------------------------------
// Device Identity (Phase 9A.1)
// --------------------------------------------------

const DEVICE_KEY = "sadhana_device_id";

/**
 * Returns existing deviceId or creates a new one.
 * DeviceId is:
 * - random UUID v4
 * - stored locally
 * - never rotated automatically
 */
export function getOrCreateDeviceId() {
  let id = localStorage.getItem(DEVICE_KEY);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_KEY, id);
  }

  return id;
}

/**
 * Read-only accessor (no creation)
 * Useful for display/debug later
 */
export function getDeviceId() {
  return localStorage.getItem(DEVICE_KEY);
}
