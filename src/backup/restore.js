// backup/restore.js
// --------------------------------------------------
// Encrypted Backup Restore for Sadhana (Phase 7)
// --------------------------------------------------
// PURPOSE:
// - Restore encrypted backup file
// - Decrypt using Web Crypto API
// - Hydrate canonical state
// --------------------------------------------------

import { hydrateState } from "../core/state.js";

const ITERATIONS = 250000;

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
      salt: new Uint8Array(salt),
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
}

export async function restoreEncryptedBackup(file, password) {
  const text = await file.text();
  const payload = JSON.parse(text);

  if (!payload || payload.v !== 1) {
    throw new Error("Invalid backup format");
  }

  const key = await deriveKey(password, payload.salt);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(payload.iv) },
    key,
    new Uint8Array(payload.data)
  );

  const dec = new TextDecoder();
  const state = JSON.parse(dec.decode(decrypted));

  hydrateState(state);
}
