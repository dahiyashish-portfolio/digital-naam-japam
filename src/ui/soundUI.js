// src/ui/soundUI.js
// --------------------------------------------------
// Sound / Naad UI
// Phase 8C Step 2: Extracted from index.html
// --------------------------------------------------

import { getAppData, setAppData } from "../core/state.js";

let soundEnabled = true;
let audioSrc = "ram.mp3";
let audioObj = null;

export function initSoundUI() {
  const muteBtn = document.getElementById("muteBtn");
  const soundInput = document.getElementById("soundInput");

  if (muteBtn) {
    muteBtn.onclick = toggleMute;
    updateMuteIcon(muteBtn);
  }

  if (soundInput) {
    soundInput.onchange = handleSoundUpload;
  }

  // Restore saved custom sound
  const appData = getAppData();
  if (appData.customSound) {
    audioSrc = appData.customSound;
  }
}

export function playTapSound() {
  if (!soundEnabled) return;

  if (!audioObj || audioObj.src !== audioSrc) {
    audioObj = new Audio(audioSrc);
    audioObj.volume = 0.5;
  }

  audioObj.currentTime = 0;
  audioObj.play().catch(() => {});
}

function toggleMute() {
  soundEnabled = !soundEnabled;
  updateMuteIcon(this);
}

function updateMuteIcon(btn) {
  btn.innerText = soundEnabled ? "🔊" : "🔇";
}

function handleSoundUpload() {
  const file = this.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;

    const appData = getAppData();
    setAppData({
      ...appData,
      customSound: dataUrl,
    });

    audioSrc = dataUrl;
    alert("Naad Set!");
  };

  reader.readAsDataURL(file);
}
