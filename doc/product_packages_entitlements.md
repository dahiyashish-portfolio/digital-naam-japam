# Product Packages & Entitlements

This document defines **sellable tiers**, their intent, and their technical boundaries.

---
## Package 1: Sadhak (Offline Only)
**Payment Model**: One-time

### Intent
Personal sadhana without dependency on cloud or accounts.

### Features
- 100% offline PWA
- Single device
- Local storage only
- Ekagrata & Active Time
- Calendar history
- Encrypted manual backup/restore

### Restrictions
- No sync
- No multi-device merge
- No Naam Daan
- No transfer

---
## Package 2: Abhyasi (Offline + Sync)
**Payment Model**: Subscription (monthly/yearly)

### Intent
Serious practitioners using multiple devices responsibly.

### Features
- Everything in Sadhak
- Optional login
- Multi-device usage
- Mostly offline
- Encrypted sync
- Device identity
- Session metadata
- Duplicate/overlap detection
- Merge assistant

### Behaviour
- Parallel usage allowed
- No hard blocking
- Overlaps flagged during merge

---
## Package 3: Sevak (Naam Daan & Active Session)
**Payment Model**: Premium subscription or donation-based unlock

### Intent
Allow sadhana to become seva for others.

### Features
- Everything in Abhyasi
- Active session awareness
- Naam Daan
- Transfer Naam Jaap to another devotee
- Donate to Naam Bank (e.g., Ram Mandir)

### Restrictions
- Naam Daan always requires explicit declaration
- Original performer is never erased

---
## Entitlement Model
Packages unlock **permissions**, not UI tricks.

Example:
```
permissions:
  sync: true
  multiDevice: true
  naamDaan: true
```

This document must be updated whenever pricing or features change.

