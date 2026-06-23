# Member Directory — Design Spec
**Date:** 2026-06-23
**Status:** Approved

---

## Overview

A publicly accessible Members Directory page at `/membership/directory`, listed under the Membership dropdown in the primary nav. The page shows a searchable, client-side-filtered list of all Guild members with three columns: Membership Number, Full Name, and Status (Active / Inactive). The primary intent is to surface inactive members' status to nudge renewals — no auth required.

---

## Architecture

- **Route:** `src/app/membership/directory/page.tsx`
- **Rendering:** `"use client"` — requires `useState` for search filtering
- **Data:** Hardcoded `MEMBERS` array in the same file for now; typed with a `Member` interface designed for eventual Sanity integration
- **Nav:** Add `{ label: "Member Directory", href: "/membership/directory" }` to the Membership `children` array in `src/lib/constants.ts`

---

## Data Shape

```ts
interface Member {
  membershipNo: string;  // e.g. "GON-0042"
  fullName: string;
  status: "Active" | "Inactive";
}
```

Hardcode 15 realistic sample members covering a mix of statuses (roughly 10 Active, 5 Inactive) and membership number formats.

---

## Page Sections

### 1. Header Band
- Background: `var(--color-navbar)` (maroon)
- Padding: `var(--space-page-top)` top, `var(--space-section-x)` sides — matches all other interior pages
- Overline: "Membership" — `11px`, `0.18em` letter-spacing, `opacity: 0.55`, uppercase, Montserrat
- `h1`: "Member Directory" — Playfair Display, `clamp(32px, 4.5vw, 56px)`, `var(--color-nav-text)`
- Standfirst: "A register of the Guild's current and past members." — Montserrat `17px`, `opacity: 0.7`, `var(--color-nav-text)`

### 2. Search Bar Section
- Background: `#FFFFFF`
- Padding: `clamp(32px, 4vw, 48px)` vertical, `var(--space-section-x)` sides
- Border-bottom: `1px solid #E8E0D0`
- Input: full-width up to `maxWidth: 960px`, `48px` tall, `16px` placeholder text, `1px solid #E8E0D0` border, maroon focus ring (`outline: 2px solid var(--color-navbar)`)
- Placeholder: "Search by name or membership number..."
- Result count below input: `14px` Montserrat, `opacity: 0.55` — e.g. "Showing 14 of 14 members"
- Filtering: case-insensitive match on `fullName` or `membershipNo`; updates live on `onChange`

### 3. Directory Rows
- Background: `#FAFAF8`
- Padding: `clamp(40px, 5vw, 72px)` vertical, `var(--space-section-x)` sides
- Container `maxWidth: 960px`
- Column header row (desktop only, hidden on mobile): `11px` uppercase Montserrat labels for "Membership No.", "Full Name", "Status" — `opacity: 0.5`
- Each member row: white background, `1px solid #E8E0D0` border, top border of first row is `3px solid var(--color-navbar)` (matches executives page pattern)

**Desktop layout (lg+):** 3-column grid
  - Col 1 (`~20%`): Membership number — `13px` Montserrat, monospace feel, `opacity: 0.65`, `var(--color-text-dark)`
  - Col 2 (`~55%`): Full name — Playfair Display, `18px`, `var(--color-text-dark)`
  - Col 3 (`~25%`): Status badge — pill shape, `12px` Montserrat, `font-weight: 600`

**Mobile layout (below lg):** Stacked within each row card
  - Membership No. as a small label (`12px`, `opacity: 0.55`) — top
  - Full name (`18px` Playfair) — middle
  - Status badge — bottom-left

**Empty state:** When search returns 0 results, show a centred message — "No members match your search." — `16px` Montserrat, `opacity: 0.6`.

### Status Badges
| Status   | Background  | Text colour | Notes |
|----------|-------------|-------------|-------|
| Active   | `#E8F5E9`   | `#2E7D32`   | Muted green — not vibrant |
| Inactive | `#F5F5F0`   | `#6B6B60`   | Warm grey, clearly distinct |

Badge padding: `4px 12px`, `border-radius: 999px`, `font-size: 12px`, `font-weight: 600`, `letter-spacing: 0.06em`, uppercase.

---

## Accessibility & Responsiveness

- Search `<input>` has a visible `<label>` (visually hidden with `sr-only` if needed for layout)
- Status badges rely on both colour and text label — never colour alone
- All text meets CLAUDE.md minimums: no body text below `16px`, no readable text below `opacity: 0.65`
- Tap targets: row height minimum `64px` on mobile
- No horizontal scroll — rows reflow to stacked cards on mobile

---

## Out of Scope

- Authentication / member login
- Edit UI or admin controls
- Supabase or any database integration
- Pagination (list is short enough for now; add when Sanity integration lands)
- Sorting by column

---

## Sanity Migration Path

When Sanity integration is added later:
1. Replace the hardcoded `MEMBERS` array with a `getMembersDirectory()` query
2. Convert the page from `"use client"` to a server component that fetches data, passing the array down to a `"use client"` `MemberSearch` child component that owns the filter state
3. The `Member` interface maps directly to a `member` document type in Sanity
