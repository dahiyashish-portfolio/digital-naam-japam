# Data, Sessions & Sync Rules

This document defines how data is recorded, classified, merged, and presented.

---

## Device Identity

- Each device generates a permanent `deviceId`.
- Stored locally.
- Never reused or overridden automatically.

---

## Session Roles

Each session has a role:

- `primary`
- `secondary`
- `guest`

Parallel sessions are **allowed**, never hidden.

---

## Data Units

All Naam Jaap is stored with metadata.

Example:

```
{
  date: "2026-01-16",
  count: 108,
  activeTime: 1800,
  deviceId: "abc",
  sessionRole: "secondary"
}
```

---

## Overlap Detection

- Time ranges are compared during merge/sync.
- Overlapping periods are flagged, not deleted.

System always presents:

1. Total Jaap (effort)
2. Overlap Jaap
3. Accepted Jaap (for Naam Daan)

---

## Naam Daan Rules

- Naam Daan is **never automatic**.
- Must be explicitly declared.
- Can be done:
  - To Naam Bank
  - On behalf of another devotee

Original performer is always preserved.

---

## Transparency Principle

The system never silently adjusts numbers. All interpretations require user confirmation.

---

## Future Backend Role (Optional)

- Session registry
- Encrypted blob sync
- Entitlement verification
- No raw jaap storage

This document governs all sync-related logic.

