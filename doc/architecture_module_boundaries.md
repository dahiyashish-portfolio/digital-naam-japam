# Architecture Diagram & Module Boundaries

This document defines the **current architecture**, **future-ready extensions**, and **clear module boundaries** for the Sadhana (Digital Naam Bank) system.

---
## 1. High-Level Architecture (Conceptual Diagram)

```
┌──────────────────────────────┐
│        User (Sadhak)         │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│     PWA Frontend (Mandir)    │
│  - index.html                │
│  - CSS + JS                  │
│  - Service Worker            │
│  - Manifest                  │
└──────────────┬───────────────┘
               │ (Local-first)
               ▼
┌──────────────────────────────┐
│   Local Storage Layer        │
│  - IndexedDB / localStorage  │
│  - Encrypted blobs           │
│  - Device Identity           │
└──────────────┬───────────────┘
               │ (Optional Sync)
               ▼
┌──────────────────────────────┐
│ Sync / Session Middleware    │
│ (Witness, not owner)         │
│  - Device registry           │
│  - Session awareness         │
│  - Entitlements              │
└──────────────┬───────────────┘
               │ (Encrypted)
               ▼
┌──────────────────────────────┐
│ User Cloud Storage           │
│ (Drive / Object Storage)     │
│  - Encrypted sync blobs      │
│  - No raw jaap visibility    │
└──────────────────────────────┘
```

---
## 2. Current State (What Exists Today)

### 2.1 Frontend (index.html)
**Technology**:
- HTML5, CSS3, Vanilla JS
- Single-file SPA

**Core Features Implemented**:
- Likhita Jaap (typing)
- Manasik Jaap (tap/clicker)
- Ekagrata (active time tracking)
- Mandala visualizer
- Ishta Devata visual feedback
- Daily rollover & history
- Encrypted manual backup/restore (AES-GCM)
- PWA installability

---
### 2.2 Storage Layer

Currently implemented:
```js
localStorage:
  - sadhana_jholi_data
  - sadhana_jholi_conf
  - sadhana_jholi_hist
```

Limitations:
- Single profile only
- No device identity
- No session metadata

---
### 2.3 Service Worker
- Static asset caching
- Offline availability
- No background sync

---
## 3. Proposed Modularization (Next Phase)

### 3.1 Core Modules

```
/modules
  ├── core/
  │   ├── state.js        # appData, config, history
  │   ├── storage.js      # IndexedDB abstraction
  │   ├── crypto.js       # encrypt/decrypt helpers
  │   └── device.js       # deviceId & session role
  │
  ├── sadhana/
  │   ├── jaapEngine.js   # counting & validation
  │   ├── ekagrata.js     # focus time logic
  │   └── overlap.js     # overlap detection
  │
  ├── sync/
  │   ├── syncClient.js  # encrypted sync blobs
  │   ├── merge.js       # merge assistant
  │   └── entitlement.js # package permissions
  │
  ├── ui/
  │   ├── modals.js
  │   ├── calendar.js
  │   └── prompts.js
  │
  └── naamdaan/
      ├── declaration.js
      ├── transfer.js
      └── naamBank.js
```

---
## 4. Data Model Specifications

### 4.1 Device Identity
```json
{
  "deviceId": "uuid",
  "createdAt": "timestamp"
}
```

---
### 4.2 Jaap Session Record
```json
{
  "sessionId": "uuid",
  "deviceId": "uuid",
  "role": "primary | secondary | guest",
  "start": "timestamp",
  "end": "timestamp",
  "count": 108,
  "activeTime": 1800
}
```

---
### 4.3 Merge Result
```json
{
  "total": 216,
  "overlap": 54,
  "accepted": 162,
  "userDecision": true
}
```

---
## 5. Backend (Optional, Future)

### Strict Responsibilities
- Authentication
- Session registry
- Device list
- Entitlement verification

### Explicitly NOT Allowed
- Counting jaap
- Editing data
- Auto-merging

---
## 6. Security & Trust Model

- All sensitive data encrypted client-side
- Backend sees only encrypted blobs
- No analytics on jaap counts
- No public leaderboards

---
## 7. Migration Path

### Phase 1
- Introduce IndexedDB
- Add deviceId
- Refactor storage layer

### Phase 2
- Session metadata
- Overlap detection
- Merge assistant

### Phase 3
- Sync middleware
- Entitlements
- Naam Daan workflows

---
## 8. Rule of Continuity

Any new feature must:
1. Respect offline-first design
2. Preserve original data
3. Expose truth, not hide it
4. Update this document

This document evolves with the product.

