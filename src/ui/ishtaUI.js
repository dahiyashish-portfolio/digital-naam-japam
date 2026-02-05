// ui/ishtaUI.js
// ---------------------------------------------
// Ishta Devata upload wiring (UI-only)
// ---------------------------------------------

import { setAppData, getAppData } from "../core/state.js";

export function initIshtaUI() {
  const input = document.getElementById("ishtaUploadInput");
  const img = document.getElementById("ishtaImageDisplay");

  if (!input || !img) return;

  input.addEventListener("change", () => {
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;

      // ✅ canonical state update
      setAppData({ ishtaImg: base64 });

      // ✅ immediate UI feedback
      img.src = base64;
      img.style.display = "block";
    };

    reader.readAsDataURL(file);
  });

  // Restore on reload
  const { ishtaImg } = getAppData();
  if (ishtaImg) {
    img.src = ishtaImg;
    img.style.display = "block";
  }
}
