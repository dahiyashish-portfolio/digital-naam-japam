// src/ui/profileUI.js
// --------------------------------------------------
// Profile & Login UI (Netlify Identity)
// Phase 8C Step 1: Extracted from index.html
// --------------------------------------------------

let currentUser = null;

// export function initProfileUI() {
//   if (!window.netlifyIdentity) return;

//   window.netlifyIdentity.init();

//   const user = window.netlifyIdentity.currentUser();
//   if (user) updateProfileUI(user);

//   window.netlifyIdentity.on("login", user => {
//     updateProfileUI(user);
//     window.netlifyIdentity.close();
//   });

//   window.netlifyIdentity.on("logout", () => {
//     updateProfileUI(null);
//     document.location.href = "/";
//   });
// }
// export function initProfileUI() {
//   if (!window.netlifyIdentity) return;

//   // 🔑 Wait until Netlify Identity is fully ready
//   window.netlifyIdentity.on("init", user => {
//     updateProfileUI(user);

//     window.netlifyIdentity.on("login", user => {
//       updateProfileUI(user);
//       window.netlifyIdentity.close();
//     });

//     window.netlifyIdentity.on("logout", () => {
//       updateProfileUI(null);
//       document.location.href = "/";
//     });
//   });
// }
export function initProfileUI() {
  if (!window.netlifyIdentity) return;

  window.netlifyIdentity.on("init", user => {
    updateProfileUI(user);

    window.netlifyIdentity.on("login", user => {
      updateProfileUI(user);
      window.netlifyIdentity.close();
    });

    window.netlifyIdentity.on("logout", () => {
      updateProfileUI(null);
      document.location.href = "/";
    });
  });
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
    btn.onclick = () => window.netlifyIdentity.logout();
  } else {
    nameD.innerText = "Abhyasi (Guest)";
    statD.innerText = "Sthaniya (Local)";
    btn.innerText = "Pravesh (Login)";
    btn.onclick = handleLogin;
  }
}

function handleLogin() {
  const jholi = document.getElementById("jholiModal");
  if (jholi) jholi.style.display = "none";

  if (currentUser) window.netlifyIdentity.logout();
  else window.netlifyIdentity.open();
}
