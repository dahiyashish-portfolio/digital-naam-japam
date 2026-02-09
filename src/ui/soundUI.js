// // src/ui/soundUI.js
// // --------------------------------------------------
// // Sound / Naad UI
// // Phase 8C Step 2: Extracted from index.html
// // --------------------------------------------------
// ui/soundUI.js
// --------------------------------------------------
// Continuous Naad Engine (Phase 8C – Final)
// --------------------------------------------------

import { getAppData, setAppData } from "../core/state.js";

let soundEnabled = false;      // default muted
let audioObj = null;
let audioSrc = "ram.mp3";
let isPlaying = false;

// --------------------------------------------------
// Init
// --------------------------------------------------
export function initSoundUI() {
  const muteBtn = document.getElementById("muteBtn");
  const soundInput = document.getElementById("soundInput");

  // Restore saved Naad source
  const appData = getAppData();
  if (appData.customSound) {
    audioSrc = appData.customSound;
  }

  if (muteBtn) {
    muteBtn.onclick = () => {
      soundEnabled ? disableNaad() : enableNaad();
      updateMuteIcon(muteBtn);
    };
    updateMuteIcon(muteBtn);
  }

  if (soundInput) {
    soundInput.onchange = handleSoundUpload;
  }
}

// --------------------------------------------------
// Public API (used by jaapUI ONLY)
// --------------------------------------------------
export function notifyJapaActivity() {
  if (!soundEnabled) return;

  if (!audioObj) {
    audioObj = new Audio(audioSrc);
    audioObj.loop = true;
    audioObj.volume = 0.5;
  }

  if (!isPlaying) {
    audioObj.currentTime = 0;
    audioObj.play().catch(() => {});
    isPlaying = true;
  }
}

// --------------------------------------------------
// Control
// --------------------------------------------------
function enableNaad() {
  soundEnabled = true;
}

function disableNaad() {
  soundEnabled = false;
  stopNaad();
}

function stopNaad() {
  if (audioObj) {
    audioObj.pause();
    audioObj.currentTime = 0;
  }
  isPlaying = false;
}

// --------------------------------------------------
// UI helpers
// --------------------------------------------------
function updateMuteIcon(btn) {
  btn.innerText = soundEnabled ? "🔊" : "🔇";
}

function handleSoundUpload() {
  const file = this.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;

    // Persist Naad source
    setAppData({
      ...getAppData(),
      customSound: dataUrl,
    });

    audioSrc = dataUrl;

    // If Naad is currently playing, restart with new source
    if (isPlaying) {
      stopNaad();
      notifyJapaActivity();
    }

    alert("Naad Set 🙏");
  };

  reader.readAsDataURL(file);
}

// import { getAppData, setAppData } from "../core/state.js";

// let soundEnabled = false;
// let audioSrc = "ram.mp3";
// let audioObj = null;

// export function initSoundUI() {
//   const muteBtn = document.getElementById("muteBtn");
//   const soundInput = document.getElementById("soundInput");

//   if (muteBtn) {
//     muteBtn.onclick = toggleMute;
//     updateMuteIcon(muteBtn);
//   }

//   if (soundInput) {
//     soundInput.onchange = handleSoundUpload;
//   }

//   // Restore saved custom sound
//   const appData = getAppData();
//   if (appData.customSound) {
//     audioSrc = appData.customSound;
//   }
// }

// export function playTapSound() {
//   if (!soundEnabled) return;

//   if (!audioObj || audioObj.src !== audioSrc) {
//     audioObj = new Audio(audioSrc);
//     audioObj.volume = 0.5;
//   }
//   audioObj.currentTime = 0;
//   audioObj.play().catch(() => {});
// }

// function toggleMute() {
//   soundEnabled = !soundEnabled;
//   if (!soundEnabled && audioObj) {
//     audioObj.pause();
//     audioObj.currentTime = 0;
//   }
//   updateMuteIcon(this);
// }

// function updateMuteIcon(btn) {
//   btn.innerText = soundEnabled ? "🔊" : "🔇";
// }

// function handleSoundUpload() {
//   const file = this.files?.[0];
//   if (!file) return;

//   const reader = new FileReader();
//   reader.onload = e => {
//     const dataUrl = e.target.result;

//     const appData = getAppData();
//     setAppData({
//       ...appData,
//       customSound: dataUrl,
//     });

//     audioSrc = dataUrl;
//     alert("Naad Set!");
//   };

//   reader.readAsDataURL(file);
// }
