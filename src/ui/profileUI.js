// src/ui/profileUI.js
// --------------------------------------------------
// Profile & Login UI (Netlify Identity)
// Phase 8C Step 1 — CORRECT binding
// --------------------------------------------------

let currentUser = null;

export function initProfileUI() {
  const btn = document.getElementById("loginActionBtn");
  if (!btn) return;

  // ✅ ALWAYS bind click immediately
  btn.onclick = handleLogin;

  // If Netlify Identity not loaded yet, wait
  if (!window.netlifyIdentity) return;

  // Sync once widget is ready (or already ready)
  window.netlifyIdentity.on("init", user => {
    updateProfileUI(user);
  });

  window.netlifyIdentity.on("login", user => {
    updateProfileUI(user);
    window.netlifyIdentity.close();
  });

  window.netlifyIdentity.on("logout", () => {
    updateProfileUI(null);
    document.location.href = "/";
  });

  // In case init already happened
  const existingUser = window.netlifyIdentity.currentUser?.();
  if (existingUser) {
    updateProfileUI(existingUser);
  }
}

function updateProfileUI(user) {
  currentUser = user;

  const nameD = document.getElementById("userNameDisplay");
  const statD = document.getElementById("userStatusDisplay");
  const btn = document.getElementById("loginActionBtn");

  if (!nameD || !statD || !btn) return;

  if (user) {
    nameD.innerText = user.user_metadata?.full_name || "Sadhak";
    statD.innerText = "Logged In (Netlify)";
    btn.innerText = "Nikas (Logout)";
  } else {
    nameD.innerText = "Abhyasi (Guest)";
    statD.innerText = "Sthaniya (Local)";
    btn.innerText = "Pravesh (Login)";
  }
}

function handleLogin() {
  const jholi = document.getElementById("jholiModal");
  if (jholi) jholi.style.display = "none";

  if (!window.netlifyIdentity) return;

  if (currentUser) {
    window.netlifyIdentity.logout();
  } else {
    window.netlifyIdentity.open();
  }
}
