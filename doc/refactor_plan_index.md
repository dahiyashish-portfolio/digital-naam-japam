# Refactor Plan – index.html → Modular Architecture

> **Purpose**: This document defines a *safe, incremental refactor plan* to evolve the current single-file `index.html` into a clean, maintainable, module-based architecture **without breaking offline-first behavior or spiritual rules**.

This is a **planning document only**. No refactor should begin unless this plan is agreed upon.

---

## 1. Refactor Principles (Non-Negotiable)

1. **Behavior must not change**

   - Counting logic, Ekagrata, visuals must behave exactly the same.

2. **Offline-first must remain intact**

   - No new runtime dependency on network.

3. **Refactor ≠ Rewrite**

   - Code is *moved*, not reinvented.

4. **Single responsibility per module**

   - One concern per file.

5. **Gradual extraction**

   - One module at a time.

---

## 2. Current State Snapshot (index.html)

### index.html currently contains:

- UI (HTML markup)
- Styling (CSS)
- App state management
- Jaap counting logic
- Ekagrata logic
- Storage (localStorage)
- Crypto helpers
- Service Worker registration
- Modal logic
- Print logic

This is **too many responsibilities** for one file.

---

## 3. Target Directory Structure

```
/src
  ├── core/
  │   ├── state.js        # appData, config, history
  │   ├── storage.js      # IndexedDB / localStorage abstraction
  │   ├── device.js       # deviceId & session role
  │   ├── time.js         # Ekagrata & activity tracking
  │   └── crypto.js       # encrypt/decrypt helpers
  │
  ├── sadhana/
  │   ├── jaapEngine.js   # counting & validation
  │   ├── mandala.js      # mandala drawing
  │   └── jyoti.js        # Ishta Devata idle logic
  │
  ├── ui/
  │   ├── dom.js          # DOM references
  │   ├── modals.js       # open/close modal logic
  │   ├── stats.js        # UI stat updates
  │   └── prompts.js     # warnings & disclosures
  │
  ├── backup/
  │   ├── export.js       # encrypted backup
  │   └── restore.js      # encrypted restore
  │
  ├── print/
  │   └── slip.js         # Naam Daan / print logic
  │
  ├── app.js              # bootstrap & wiring
  └── index.html          # UI only
```

---

## 4. Module-by-Module Extraction Plan

### Phase 1: Core State (LOW RISK)

**Extract from index.html:**

```js
let appData
let config
let history
```

➡ Move to `core/state.js`

Responsibility:

- Hold canonical in-memory state
- No DOM access

---

### Phase 2: Storage Layer

**Extract:**

```js
loadState()
saveState()
checkNewDay()
```

➡ Move to `core/storage.js`

Responsibilities:

- Persist & restore state
- Handle date rollover
- Later switch localStorage → IndexedDB

---

### Phase 3: Ekagrata & Time Engine

**Extract:**

```js
registerActivity()
checkActiveTime()
updateTimeStats()
```

➡ Move to `core/time.js`

Responsibilities:

- Track lastActivity
- Compute activeSeconds
- Expose time summaries

---

### Phase 4: Jaap Engine

**Extract:**

```js
handleCountInput()
textarea input logic
tap button logic
```

➡ Move to `sadhana/jaapEngine.js`

Responsibilities:

- Increment counts
- Transliteration handling
- Input normalization

---

### Phase 5: Visual Engine

#### Mandala

➡ Move `drawMandala()` → `sadhana/mandala.js`

#### Jyoti / Ishta

➡ Move idle logic → `sadhana/jyoti.js`

These modules:

- Accept state as input
- Do not modify state

---

### Phase 6: UI Layer

**Extract:**

```js
document.getElementById(...)
modal open/close
button wiring
```

➡ Move to `/ui/*`

Rules:

- UI reads state
- UI never mutates state directly

---

### Phase 7: Backup & Restore

**Extract crypto + file logic:**

➡ `/backup/export.js` ➡ `/backup/restore.js`

Rules:

- Pure functions
- No DOM except file input/output

---

### Phase 8: Print / Naam Daan Slip

➡ Move print logic to `/print/slip.js`

Rule:

- Only formats data
- Does not alter state

---

## 5. Bootstrap Layer

### app.js responsibilities:

- Initialize app
- Wire modules together
- Register service worker
- Start timers & loops

`app.js` is the **only file** that knows all modules.

---

## 6. What index.html Becomes After Refactor

index.html will contain:

- HTML markup
- CSS
- `<script type="module" src="app.js"></script>`

No business logic.

---

## 7. Validation After Each Phase

After each phase:

- Run app offline
- Verify counts
- Verify Ekagrata
- Verify visuals
- Verify backup/restore

If anything changes → rollback.

---

## 8. When NOT to Refactor

Do NOT refactor:

- While adding new features
- While changing logic
- Without this document open

---

## 9. Final Rule

Refactoring is successful only if:

- User experience is identical
- Data remains intact
- Spiritual rules are preserved

---

🕉️ *Refactor slowly. Sadhana is not rushed.*

---

**End of Refactor Plan**

