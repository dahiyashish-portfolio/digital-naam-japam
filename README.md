# 🕉️ Digital Naam Bank (Sadhana App)

**A Privacy-First, Offline-Capable Digital Temple for Likhita Japa & Manasik Sadhana.**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=YOUR_GITHUB_REPO_URL)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📖 About The Project

**Digital Naam Bank** is a single-page web application (SPA) designed to bring the ancient practice of *Likhita Japa* (Mantra Writing) into the digital age without compromising on spiritual integrity.

Unlike standard tally counters, this application focuses on **Focus (Dharana)** and **Devotion (Bhakti)**. It features a "Darshan Engine" where the visibility of your deity is tied directly to your active concentration.

### ✨ Key Features

#### 🧘 Core Sadhana Modes
* **Likhita Japa (Typing Mode):** Type your mantra manually. Includes auto-transliteration (e.g., typing "Ram" converts to "राम").
* **Manasik Japa (Clicker Mode):** Count via Tap or Spacebar.
    * *FairTap™ Technology:* Prevents "speed spamming" and holding down keys. Counts are only registered on key release with a human-speed limit (200ms delay).

#### 👁️ Darshan Visualizer (Ishta Devata)
* **Active Focus:** Upload an image of your Deity. The image remains bright as long as you are chanting.
* **Fading Focus:** If you stop for 30 seconds, the image flickers (like a dying lamp). After 60 seconds, it fades to near-invisibility, encouraging you to resume practice.
* **Mandala Art:** A geometric flower weaves itself dynamically based on your count (1 stroke per bead).

#### 🎒 The Jholi (User Dashboard)
* **Statistics:** Tracks "Active Focus Time" (actual time spent chanting) vs. Total Elapsed Time.
* **Calendar History:** Automatically archives your counts at midnight to a local history log.
* **Printable Deposit Slip:** Generate a PDF "Bank Slip" of your session to print and offer at a physical temple.

#### 🔒 Privacy & Security
* **Zero-Database (Default):** All data is stored in your browser's `LocalStorage`.
* **Encrypted Backup:** Export your history as a `.json` file encrypted with **AES-GCM (Military Grade)** password protection.
* **Netlify Identity:** Optional Google/Email login to sync profile names (Data remains local).

#### 📱 PWA (Progressive Web App)
* Installable on iOS and Android.
* Works **100% Offline** (via Service Worker).
* No app store required.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+).
* **Authentication:** Netlify Identity Widget (GoTrue).
* **Encryption:** Web Crypto API.
* **Deployment:** Netlify (Static Hosting).

---

## 🚀 Getting Started

To run this project locally or deploy it yourself, follow these steps.

### Prerequisites
You need the following files in your root directory:
1.  `index.html` (The main application code).
2.  `manifest.json` (For PWA installation).
3.  `sw.js` (Service worker for offline mode).
4.  `icon-192.png` & `icon-512.png` (App icons).
5.  `ram.mp3` (Default chanting sound - optional).


## ☁️ Deployment Guide (Netlify)

This app is optimized for Netlify.

1.  **Drag & Drop:** Drag your project folder into the [Netlify Dashboard](https://app.netlify.com/).
2.  **Enable Identity:**
    * Go to **Site Settings > Identity**.
    * Click **Enable Identity**.
3.  **Configure Google Login (Optional):**
    * Go to **Registration** > **External Providers** > **Add Provider** > **Google**.
    * Enter your Client ID and Secret from Google Cloud Console.
    * *Crucial:* In Google Cloud Console, ensure your **Authorized Redirect URI** is set to:
        `https://YOUR-SITE-NAME.netlify.app/.netlify/identity/callback`

---

## 📂 File Structure

```text
/
├── index.html       # The Master Code (Logic, UI, CSS)
├── manifest.json    # App Metadata for Android/iOS
├── sw.js            # Offline Service Worker
├── ram.mp3          # Default sound file
├── icon-192.png     # Small Icon
└── icon-512.png     # Large Icon