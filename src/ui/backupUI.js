// ui/backupUI.js
// --------------------------------------------------
// Backup & Restore UI Module
// Phase 8B – Step 2
// --------------------------------------------------
// RESPONSIBILITIES:
// - Own Backup / Restore button wiring
// - Read password & file inputs
// - Open / close related modals (UI-only)
// - Delegate crypto & file work to backup/* modules
// --------------------------------------------------
// RULES:
// - NO crypto logic here
// - NO state mutation here
// - Use backup/export.js & backup/restore.js only
// - Bind handlers AFTER DOM is ready (called from app.js)
// --------------------------------------------------

import { exportEncryptedBackup } from "../backup/export.js";
import { restoreEncryptedBackup } from "../backup/restore.js";

function $(id) {
  return document.getElementById(id);
}

export function initBackupUI() {
  const doBackupBtn = $("doBackupBtn");
  const doRestoreBtn = $("doRestoreBtn");

  const backupPassInput = $("backupPass");
  const restorePassInput = $("restorePass");
  const restoreFileInput = $("restoreFile");

  const backupModal = $("backupPassModal");
  const restoreModal = $("restorePassModal");

  const backupBtn = $("backupBtn");
  const restoreBtn = $("restoreBtn");

  if (backupBtn)
    backupBtn.onclick = () => {
      $("jholiModal").style.display = "none";
      $("backupPassModal").style.display = "flex";
    };
  
  if (restoreBtn)
    restoreBtn.onclick = () => {
      $("jholiModal").style.display = "none";
      $("restorePassModal").style.display = "flex";
    };

  // ---- Backup ----
  if (doBackupBtn && backupPassInput) {
    doBackupBtn.onclick = async () => {
      const pwd = backupPassInput.value.trim();
      if (!pwd) {
        alert("Gupt Shabd avashyak hai (Password required)");
        return;
      }

      try {
        await exportEncryptedBackup(pwd);
        backupPassInput.value = "";
        if (backupModal) backupModal.style.display = "none";
      } catch (err) {
        console.error("Backup failed", err);
        alert("Backup asafal raha. Dobara prayas karein.");
      }
    };
  }

  // ---- Restore ----
  if (doRestoreBtn && restorePassInput && restoreFileInput) {
    doRestoreBtn.onclick = async () => {
      const file = restoreFileInput.files?.[0];
      const pwd = restorePassInput.value.trim();

      if (!file || !pwd) {
        alert("File aur Password dono avashyak hain");
        return;
      }

      try {
        await restoreEncryptedBackup(file, pwd);
        restorePassInput.value = "";
        restoreFileInput.value = "";
        if (restoreModal) restoreModal.style.display = "none";
      } catch (err) {
        console.error("Restore failed", err);
        alert("Galat password ya file. Restore asafal.");
      }
    };
  }
}

// --------------------------------------------------
// End of ui/backupUI.js
// --------------------------------------------------
