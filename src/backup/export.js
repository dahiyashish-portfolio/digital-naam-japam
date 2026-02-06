// backup/export.js
// --------------------------------------------------
// Encrypted Backup Export for Sadhana (Phase 7)
// --------------------------------------------------
// PURPOSE:
// - Export full canonical state
// - Encrypt using Web Crypto API (AES-GCM)
// - Download as .sadhana.backup file
// --------------------------------------------------

import { snapshotState } from "../core/state.js";

const ITERATIONS = 250000;
const SALT_LEN = 16;
const IV_LEN = 12;

async function deriveKey(password, salt) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function exportEncryptedBackup(password) {
  const state = snapshotState();
  const enc = new TextEncoder();

  const salt = crypto.getRandomValues(new Uint8Array(SALT_LEN));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LEN));
  const key = await deriveKey(password, salt);

  const data = enc.encode(JSON.stringify(state));
  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  const payload = {
    v: 1,
    salt: Array.from(salt),
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(cipher)),
  };

  const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `sadhana-backup-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}
