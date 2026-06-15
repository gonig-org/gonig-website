# Sanity CMS — People Pages Integration

**Date:** 2026-06-15
**Status:** Approved

## Overview

Integrate Sanity CMS so the Guild can manage people content (National Executives, Board of Advisers, Board of Trustees) without developer involvement. The editor logs into a password-protected studio embedded at `/studio`, uploads photos, edits bios, and adds or removes members. Changes go live within 60 seconds.

Sanity is already installed (`@sanity/client`, `next-sanity`). No additional services are needed — Sanity hosts the content database, image storage, and authentication.

---

## Schema

One document type: `person`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | Yes | Full name with honorifics (e.g. "Sir Brig. Gen. Charles Adisa Bossman (Rtd)") |
| `board` | string enum | Yes | `executives` / `advisers` / `trustees` |
| `trusteeType` | string enum | No | `founding` / `appointee` — only used when `board` is `trustees` |
| `bio` | text | No | Plain text. Advisers have no bio. |
| `photo` | image | No | Sanity-hosted. Editor uploads directly. When absent, monogram placeholder renders. |
| `inMemoriam` | boolean | No | Defaults to false. Renders "In Memoriam" note beneath name when true. |
| `order` | number | Yes | Controls display order within each board. Editor sets manually. |

Schema file: `src/sanity/schemaTypes/person.ts`
Schema index: `src/sanity/schemaTypes/index.ts`

---

## Sanity Project Setup

- Project hosted on sanity.io (free tier — 10 GB bandwidth, 20 users, unlimited documents)
- Project ID and dataset name stored in environment variables:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET` (value: `production`)
- API version pinned: `2024-01-01`

Sanity client: `src/sanity/lib/client.ts`

---

## Studio

- Embedded in the Next.js app at `/studio`
- Route: `src/app/studio/[[...tool]]/page.tsx`
- Marked `"use client"` — required by Sanity's `NextStudio` component
- Authentication: Sanity's built-in auth. Users must be invited as project members at sanity.io. Uninvited visitors see a login prompt only.
- Studio config: `src/sanity/sanity.config.ts`

---

## Data Fetching

- All three people pages fetch from Sanity at request time using Next.js `fetch` with `revalidate: 60`
- GROQ queries filter by `board` field and sort by `order`
- Queries live in `src/sanity/lib/queries.ts`

Example query for executives:
```groq
*[_type == "person" && board == "executives"] | order(order asc) {
  name, bio, inMemoriam, "photo": photo.asset->url
}
```

For trustees, a secondary filter splits by `trusteeType`:
```groq
*[_type == "person" && board == "trustees" && trusteeType == "founding"] | order(order asc) { ... }
*[_type == "person" && board == "trustees" && trusteeType == "appointee"] | order(order asc) { ... }
```

---

## Page Changes

Each people page (`executives`, `advisers`, `trustees`) is updated to:
1. Become an `async` server component
2. Call the relevant Sanity query
3. Render the fetched data using the existing layout (register or bio card)
4. Remove the hardcoded data arrays entirely

The `Monogram` component continues to render when `photo` is null.

---

## Migration

All 21 existing people are entered into Sanity manually via the studio before the hardcoded arrays are removed. No seed script — 21 records is fast enough to enter by hand, and it doubles as a walkthrough of the studio for the Guild editor. Order of operations:

1. Set up Sanity project and get credentials
2. Configure studio and client
3. Seed all existing people into Sanity
4. Switch pages to fetch from Sanity
5. Delete hardcoded arrays

---

## What Is Not in Scope

- News, events, resources — future CMS work
- Contact info — stays in `constants.ts`
- Legal pages — prose content, no CMS needed
- Live preview / draft mode — not needed for this use case
