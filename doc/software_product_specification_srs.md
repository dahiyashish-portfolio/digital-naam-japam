# Software Product Specification (SRS)

## 1. Product Overview

**Product Name**: Sadhana – Digital Naam Bank

**Purpose**:
A privacy-first, offline-capable spiritual application for Naam Jaap, Ekagrata tracking, and optional Naam Daan.

---
## 2. Target Users
- Individual Sadhaks
- Multi-device practitioners
- Sevaks performing Naam Daan

---
## 3. Functional Requirements

### 3.1 Jaap & Ekagrata
- Count Naam Jaap via typing or tapping
- Track active focus time only when user is engaged
- Daily reset with history preservation

### 3.2 Visualization
- Mandala visualization (108 beads)
- Ishta Devata image with idle-state feedback

### 3.3 Storage
- Local-first storage
- Encrypted backups
- Manual restore

### 3.4 Multi-Device (Tier-based)
- Device identification
- Parallel usage allowed
- Session role assignment
- Overlap detection

### 3.5 Naam Daan (Premium)
- Explicit declaration
- Donate to Naam Bank
- Transfer on behalf of another devotee
- Transparent reporting

---
## 4. Non-Functional Requirements

- Offline-first
- Data ownership with user
- No forced login
- Graceful degradation when offline
- High transparency

---
## 5. Technical Stack

- Frontend: HTML, CSS, Vanilla JS
- Storage: IndexedDB, localStorage
- Crypto: Web Crypto API (AES-GCM)
- Hosting: Static (Netlify)
- Optional Backend: Minimal API

---
## 6. Constraints

- No real-time dependency
- No server-side computation of jaap
- No gamification

---
## 7. Future Enhancements

- Calendar heatmap
- Guided Sankalpa flows
- Multi-language UI
- Optional notifications

---
## 8. Acceptance Criteria

- App works fully offline
- Jaap data never lost silently
- Overlaps are visible
- Naam Daan is explicit

---
## 9. Documentation Rule

Any change in functionality must:
- Update this SRS
- Update Architecture document
- Be reviewed against Vision & Principles

---
**End of Document**

