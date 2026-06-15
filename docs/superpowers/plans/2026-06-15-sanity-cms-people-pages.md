# Sanity CMS — People Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire up Sanity CMS so the Guild can manage the National Executives, Board of Advisers, and Board of Trustees pages without touching code.

**Architecture:** A single `person` Sanity document type covers all three people pages, filtered by a `board` field. The studio is embedded at `/studio` and uses Sanity's built-in auth. Each people page becomes an async server component that fetches from Sanity with 60-second ISR revalidation.

**Tech Stack:** Next.js 16 App Router, `next-sanity` v12, `@sanity/client` v7, Sanity hosted project (free tier)

---

## File Map

| Action | Path | Purpose |
|---|---|---|
| Create | `src/sanity/sanity.config.ts` | Studio configuration |
| Create | `src/sanity/schemaTypes/person.ts` | Person document schema |
| Create | `src/sanity/schemaTypes/index.ts` | Schema barrel export |
| Create | `src/sanity/lib/client.ts` | Sanity fetch client |
| Create | `src/sanity/lib/queries.ts` | GROQ queries + TypeScript types |
| Create | `src/app/studio/[[...tool]]/page.tsx` | Embedded Sanity Studio route |
| Create | `.env.local` | Sanity credentials (never committed) |
| Modify | `src/app/about/executives/page.tsx` | Fetch from Sanity, remove hardcoded array |
| Modify | `src/app/about/advisers/page.tsx` | Fetch from Sanity, remove hardcoded array |
| Modify | `src/app/about/trustees/page.tsx` | Fetch from Sanity, remove hardcoded arrays |

---

## Task 0: Create a Sanity Project (manual — do this first)

This is a one-time browser task. No code yet.

- [ ] Go to https://sanity.io and sign in or create an account
- [ ] Click **Create new project**, name it `gonig`
- [ ] Choose dataset name `production` (the default)
- [ ] Once created, you land on the project dashboard
- [ ] Copy the **Project ID** (a short alphanumeric string like `abc12def`) — you need it in Task 1
- [ ] Invite the Guild editor: go to **Members** tab, click **Invite**, enter their email, set role to **Editor**

---

## Task 1: Environment Variables

**Files:**
- Create: `.env.local`

- [ ] **Create `.env.local` in the project root**

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

Replace `your_project_id_here` with the Project ID from Task 0.

- [ ] **Verify `.env.local` is gitignored**

Run:
```bash
git check-ignore -v .env.local
```
Expected output: `.gitignore:33:.env*    .env.local`

If no output, `.env.local` is not ignored — do not proceed until this is fixed.

- [ ] **Commit note**

`.env.local` is never committed. No commit for this task.

---

## Task 2: Sanity Client

**Files:**
- Create: `src/sanity/lib/client.ts`

- [ ] **Create the client file**

```ts
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
});
```

- [ ] **Verify TypeScript compiles**

Run:
```bash
npx tsc --noEmit
```
Expected: no errors

- [ ] **Commit**

```bash
git add src/sanity/lib/client.ts
git commit -m "Add Sanity client"
```

---

## Task 3: Person Schema

**Files:**
- Create: `src/sanity/schemaTypes/person.ts`
- Create: `src/sanity/schemaTypes/index.ts`

- [ ] **Create the person schema**

```ts
// src/sanity/schemaTypes/person.ts
import { defineField, defineType } from "sanity";

export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "board",
      title: "Board",
      type: "string",
      options: {
        list: [
          { title: "National Executives", value: "executives" },
          { title: "Board of Advisers", value: "advisers" },
          { title: "Board of Trustees", value: "trustees" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "trusteeType",
      title: "Trustee Type",
      type: "string",
      description: "Only set this when Board is Board of Trustees",
      options: {
        list: [
          { title: "Founding Trustee", value: "founding" },
          { title: "New Appointee", value: "appointee" },
        ],
      },
      hidden: ({ document }) => document?.board !== "trustees",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "inMemoriam",
      title: "In Memoriam",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls the order this person appears on the page. Lower numbers appear first.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "board",
      media: "photo",
    },
  },
});
```

- [ ] **Create the schema index**

```ts
// src/sanity/schemaTypes/index.ts
import { person } from "./person";

export const schemaTypes = [person];
```

- [ ] **Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors

- [ ] **Commit**

```bash
git add src/sanity/schemaTypes/
git commit -m "Add Sanity person schema"
```

---

## Task 4: Studio Config + Embedded Studio Route

**Files:**
- Create: `src/sanity/sanity.config.ts`
- Create: `src/app/studio/[[...tool]]/page.tsx`

- [ ] **Create the studio config**

```ts
// src/sanity/sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "gonig",
  title: "GONiG",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
```

- [ ] **Create the studio page route**

The studio must cover the site navbar. The `position: fixed; inset: 0; zIndex: 9999` wrapper achieves this.

```tsx
// src/app/studio/[[...tool]]/page.tsx
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

export default function StudioPage() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
      <NextStudio config={config} />
    </div>
  );
}
```

- [ ] **Start the dev server and open `/studio`**

```bash
npm run dev
```

Open http://localhost:3000/studio

Expected: Sanity Studio login screen appears, covering the full viewport. Log in with your sanity.io account. After login, you should see the studio with a "Person" content type in the left sidebar.

- [ ] **Commit**

```bash
git add src/sanity/sanity.config.ts src/app/studio/[[...tool]]/page.tsx
git commit -m "Embed Sanity Studio at /studio"
```

---

## Task 5: GROQ Queries and Types

**Files:**
- Create: `src/sanity/lib/queries.ts`

- [ ] **Create the queries file**

```ts
// src/sanity/lib/queries.ts
import { client } from "./client";

/* ── Shared cache option: revalidate every 60 seconds ── */
const CACHE = { next: { revalidate: 60 } };

/* ── Types ── */

export type SanityPerson = {
  name: string;
  bio: string | null;
  photo: string | null;
  inMemoriam: boolean;
};

export type SanityAdviser = {
  name: string;
};

export type SanityTrustee = {
  name: string;
  inMemoriam: boolean;
};

/* ── Queries ── */

export async function getExecutives(): Promise<SanityPerson[]> {
  return client.fetch(
    `*[_type == "person" && board == "executives"] | order(order asc) {
      name,
      bio,
      inMemoriam,
      "photo": photo.asset->url
    }`,
    {},
    CACHE
  );
}

export async function getAdvisers(): Promise<SanityAdviser[]> {
  return client.fetch(
    `*[_type == "person" && board == "advisers"] | order(order asc) {
      name
    }`,
    {},
    CACHE
  );
}

export async function getFoundingTrustees(): Promise<SanityTrustee[]> {
  return client.fetch(
    `*[_type == "person" && board == "trustees" && trusteeType == "founding"] | order(order asc) {
      name,
      inMemoriam
    }`,
    {},
    CACHE
  );
}

export async function getAppointees(): Promise<SanityPerson[]> {
  return client.fetch(
    `*[_type == "person" && board == "trustees" && trusteeType == "appointee"] | order(order asc) {
      name,
      bio,
      inMemoriam,
      "photo": photo.asset->url
    }`,
    {},
    CACHE
  );
}
```

- [ ] **Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors

- [ ] **Commit**

```bash
git add src/sanity/lib/queries.ts
git commit -m "Add GROQ queries for people pages"
```

---

## Task 6: Seed All People into Sanity Studio

Do this **before** updating the pages, so there is no moment where the pages are empty.

Open http://localhost:3000/studio and create one record per person below. For each record:
1. Click **Create new document** (pencil icon or "+ New")
2. Fill in the fields
3. Click **Publish**

### National Executives — Board: `National Executives`

| Order | Name | Has Bio |
|---|---|---|
| 1 | Dr. Toyin Samuel Ajose | Yes |
| 2 | Olugbemi Muyiwa Okunnuga | Yes |
| 3 | Babatunde Olurombi | Yes |
| 4 | Samuel Abiodun Ojo | Yes |
| 5 | Engr. Wilcox Abbey | Yes |
| 6 | Dr. Adeolu Samuel Akeredolu | Yes |
| 7 | Olusegun Stanley Akinfenwa | Yes |

Copy bios from `src/app/about/executives/page.tsx`.

### Board of Advisers — Board: `Board of Advisers`

| Order | Name |
|---|---|
| 1 | Mr. Ibiyefiebo Harry |
| 2 | Mr. Oluwamuyiwa Akinmejiwa |
| 3 | Dr. Segun Fadeyi |
| 4 | Mr. Akin Olubi |
| 5 | Engr. Babajide Idowu |
| 6 | Dr. Dayo Oyedun |
| 7 | Mr. Theophilus Okang |
| 8 | Prof. Soji Adejumo |
| 9 | Revd. Canon Bola Omodun Ilori |

No bio needed for advisers.

### Board of Trustees — Founding — Board: `Board of Trustees`, Trustee Type: `Founding Trustee`

| Order | Name | In Memoriam |
|---|---|---|
| 1 | Dr. D.K. Olukoya | No |
| 2 | Mr. D.R. Ajayi | No |
| 3 | Chief Maria Aseeva | No |
| 4 | Deacon Dr. O.A. Dosunmu | No |
| 5 | Mrs. Tolu Obajimi | No |
| 6 | Sir Emeka Nwokedi | No |
| 7 | Chief Dr. M.O.A. Kuti | Yes |
| 8 | Mr. James Adekunle | Yes |
| 9 | Alabo Dr. C.I.T. Wokoma | Yes |
| 10 | Mr. Kayode Oni FTCL | Yes |

### Board of Trustees — New Appointees — Board: `Board of Trustees`, Trustee Type: `New Appointee`

| Order | Name | Has Bio |
|---|---|---|
| 1 | Sir Brig. Gen. Charles Adisa Bossman (Rtd) | Yes |
| 2 | Mr. Ebenezer Ekundayo Omole | Yes |
| 3 | Sir Engr. Tamunobubelebara Poloamina | Yes |
| 4 | Rev. Emmanuel Oluyemi Akinpelu | Yes |

Copy bios from `src/app/about/trustees/page.tsx`.

- [ ] **Verify all 30 records are published in the studio** before proceeding.

No commit for this task.

---

## Task 7: Update Executives Page

**Files:**
- Modify: `src/app/about/executives/page.tsx`

Replace the entire file content with the version below. The layout JSX is identical — only the data source changes.

- [ ] **Rewrite `src/app/about/executives/page.tsx`**

```tsx
import Image from "next/image";
import { getExecutives, type SanityPerson } from "@/sanity/lib/queries";

export const revalidate = 60;

function Monogram({ name }: { name: string }) {
  const initials = name
    .replace(/^(Dr\.|Engr\.|Rev\.|Prof\.)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "var(--color-surface-light)",
        border: "1px solid #E8E0D0",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-playfair)",
          color: "var(--color-navbar)",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 400,
          letterSpacing: "0.05em",
          opacity: 0.5,
        }}
      >
        {initials}
      </span>
    </div>
  );
}

export default async function NationalExecutives() {
  const executives = await getExecutives();

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>

      {/* Header band */}
      <section
        style={{
          backgroundColor: "var(--color-navbar)",
          paddingTop: "var(--space-page-top)",
          paddingBottom: "clamp(40px, 5vw, 64px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div style={{ maxWidth: "800px" }}>
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.55,
              display: "block",
              marginBottom: "16px",
            }}
          >
            About the Guild
          </span>
          <h1
            className="font-heading"
            style={{
              color: "var(--color-nav-text)",
              fontSize: "clamp(32px, 4.5vw, 56px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            National Executives
          </h1>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "17px",
              lineHeight: 1.8,
              opacity: 0.7,
              maxWidth: "580px",
            }}
          >
            The elected officers responsible for the administration and
            advancement of the Guild of Organists of Nigeria.
          </p>
        </div>
      </section>

      {/* Executives list */}
      <section
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div className="flex flex-col" style={{ maxWidth: "960px", gap: 0 }}>
          {executives.map((exec: SanityPerson, index: number) => (
            <div
              key={exec.name}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E0D0",
                borderTop: index === 0 ? "3px solid var(--color-navbar)" : "none",
                padding: "clamp(28px, 4vw, 44px)",
                marginBottom: "1px",
              }}
            >
              {/* Image / Monogram */}
              <div className="lg:col-span-3">
                <div
                  style={{
                    width: "100%",
                    maxWidth: "180px",
                    aspectRatio: "1 / 1",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {exec.photo ? (
                    <Image
                      src={exec.photo}
                      alt={exec.name}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <Monogram name={exec.name} />
                  )}
                </div>
              </div>

              {/* Name + bio */}
              <div className="lg:col-span-9 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h2
                    className="font-heading"
                    style={{
                      color: "var(--color-text-dark)",
                      fontSize: "clamp(20px, 2.2vw, 26px)",
                      lineHeight: 1.15,
                    }}
                  >
                    {exec.name}
                  </h2>
                  {exec.inMemoriam && (
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        color: "var(--color-navbar)",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        opacity: 0.65,
                        fontStyle: "italic",
                      }}
                    >
                      In Memoriam
                    </p>
                  )}
                </div>
                <div
                  style={{
                    width: "32px",
                    height: "2px",
                    backgroundColor: "var(--color-navbar)",
                    opacity: 0.3,
                  }}
                />
                {exec.bio && (
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-text-dark)",
                      fontSize: "16px",
                      lineHeight: 1.85,
                      opacity: 0.72,
                    }}
                  >
                    {exec.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
```

- [ ] **Verify the page loads correctly**

Open http://localhost:3000/about/executives

Expected: page shows all 7 executives in the same layout as before, pulling data from Sanity.

- [ ] **Commit**

```bash
git add src/app/about/executives/page.tsx
git commit -m "Wire executives page to Sanity"
```

---

## Task 8: Update Advisers Page

**Files:**
- Modify: `src/app/about/advisers/page.tsx`

- [ ] **Rewrite `src/app/about/advisers/page.tsx`**

```tsx
import { getAdvisers, type SanityAdviser } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function BoardOfAdvisers() {
  const advisers = await getAdvisers();

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>

      {/* Header band */}
      <section
        style={{
          backgroundColor: "var(--color-navbar)",
          paddingTop: "var(--space-page-top)",
          paddingBottom: "clamp(40px, 5vw, 64px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div style={{ maxWidth: "800px" }}>
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.55,
              display: "block",
              marginBottom: "16px",
            }}
          >
            About the Guild
          </span>
          <h1
            className="font-heading"
            style={{
              color: "var(--color-nav-text)",
              fontSize: "clamp(32px, 4.5vw, 56px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Board of Advisers
          </h1>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "17px",
              lineHeight: 1.8,
              opacity: 0.7,
              maxWidth: "580px",
            }}
          >
            Distinguished individuals whose counsel and experience guide the
            Guild's direction and long-term vision.
          </p>
        </div>
      </section>

      {/* Register */}
      <section
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E8E0D0",
            borderTop: "3px solid var(--color-navbar)",
          }}
        >
          {/* Column header */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{
              padding: "16px clamp(28px, 4vw, 44px)",
              borderBottom: "1px solid #E8E0D0",
              backgroundColor: "#FAFAF8",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-navbar)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Name
            </span>
          </div>

          {/* Members */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {advisers.map((adviser: SanityAdviser, index: number) => {
              const isLastOdd =
                advisers.length % 2 !== 0 && index === advisers.length - 1;
              const isRightColumn = index % 2 !== 0;
              const isLastRow =
                index >= advisers.length - (advisers.length % 2 === 0 ? 2 : 1);

              return (
                <div
                  key={adviser.name}
                  style={{
                    padding: "24px clamp(28px, 4vw, 44px)",
                    borderBottom: isLastRow && !isLastOdd ? "none" : "1px solid #E8E0D0",
                    borderRight: isRightColumn ? "none" : "1px solid #E8E0D0",
                    gridColumn: isLastOdd ? "1 / -1" : undefined,
                  }}
                  className="flex items-center gap-4"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-navbar)",
                      fontSize: "11px",
                      fontWeight: 700,
                      opacity: 0.35,
                      flexShrink: 0,
                      minWidth: "24px",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="font-heading"
                    style={{
                      color: "var(--color-text-dark)",
                      fontSize: "clamp(17px, 1.8vw, 21px)",
                      lineHeight: 1.2,
                    }}
                  >
                    {adviser.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
```

- [ ] **Verify the page loads correctly**

Open http://localhost:3000/about/advisers

Expected: all 9 advisers in the two-column register, pulling from Sanity.

- [ ] **Commit**

```bash
git add src/app/about/advisers/page.tsx
git commit -m "Wire advisers page to Sanity"
```

---

## Task 9: Update Trustees Page

**Files:**
- Modify: `src/app/about/trustees/page.tsx`

- [ ] **Rewrite `src/app/about/trustees/page.tsx`**

```tsx
import Image from "next/image";
import { getFoundingTrustees, getAppointees, type SanityPerson, type SanityTrustee } from "@/sanity/lib/queries";

export const revalidate = 60;

function Monogram({ name }: { name: string }) {
  const initials = name
    .replace(/^(Dr\.|Engr\.|Rev\.|Prof\.|Sir|Mr\.|Mrs\.|Chief|Deacon|Alabo|Brig\.|Gen\.)\s*/gi, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "var(--color-surface-light)",
        border: "1px solid #E8E0D0",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-playfair)",
          color: "var(--color-navbar)",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 400,
          letterSpacing: "0.05em",
          opacity: 0.5,
        }}
      >
        {initials}
      </span>
    </div>
  );
}

export default async function BoardOfTrustees() {
  const [foundingTrustees, appointees] = await Promise.all([
    getFoundingTrustees(),
    getAppointees(),
  ]);

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>

      {/* Header band */}
      <section
        style={{
          backgroundColor: "var(--color-navbar)",
          paddingTop: "var(--space-page-top)",
          paddingBottom: "clamp(40px, 5vw, 64px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div style={{ maxWidth: "800px" }}>
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.55,
              display: "block",
              marginBottom: "16px",
            }}
          >
            About the Guild
          </span>
          <h1
            className="font-heading"
            style={{
              color: "var(--color-nav-text)",
              fontSize: "clamp(32px, 4.5vw, 56px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Board of Trustees
          </h1>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "17px",
              lineHeight: 1.8,
              opacity: 0.7,
              maxWidth: "580px",
            }}
          >
            The custodians of the Guild's values, assets, and long-term
            institutional integrity.
          </p>
        </div>
      </section>

      <div
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >

        {/* Founding Trustees register */}
        <div style={{ maxWidth: "960px", marginBottom: "clamp(56px, 7vw, 96px)" }}>
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-navbar)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "20px",
            }}
          >
            Trustees
          </span>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E8E0D0",
              borderTop: "3px solid var(--color-navbar)",
            }}
          >
            {foundingTrustees.map((trustee: SanityTrustee, index: number) => {
              const isLast = index === foundingTrustees.length - 1;
              return (
                <div
                  key={trustee.name}
                  className="flex items-start gap-4"
                  style={{
                    padding: "20px clamp(24px, 4vw, 40px)",
                    borderBottom: isLast ? "none" : "1px solid #E8E0D0",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-navbar)",
                      fontSize: "11px",
                      fontWeight: 700,
                      opacity: 0.3,
                      flexShrink: 0,
                      minWidth: "24px",
                      paddingTop: "4px",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p
                      className="font-heading"
                      style={{
                        color: "var(--color-text-dark)",
                        fontSize: "clamp(17px, 1.8vw, 21px)",
                        lineHeight: 1.2,
                      }}
                    >
                      {trustee.name}
                    </p>
                    {trustee.inMemoriam && (
                      <p
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          color: "var(--color-navbar)",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          fontStyle: "italic",
                          opacity: 0.6,
                        }}
                      >
                        In Memoriam
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* New Appointees bio cards */}
        <div style={{ maxWidth: "960px" }}>
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-navbar)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "20px",
            }}
          >
            New Appointees
          </span>
          <div className="flex flex-col" style={{ gap: "1px" }}>
            {appointees.map((person: SanityPerson, index: number) => (
              <div
                key={person.name}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8E0D0",
                  borderTop: index === 0 ? "3px solid var(--color-navbar)" : "none",
                  padding: "clamp(28px, 4vw, 44px)",
                }}
              >
                <div className="lg:col-span-3">
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "180px",
                      aspectRatio: "1 / 1",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {person.photo ? (
                      <Image
                        src={person.photo}
                        alt={person.name}
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <Monogram name={person.name} />
                    )}
                  </div>
                </div>
                <div className="lg:col-span-9 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h2
                      className="font-heading"
                      style={{
                        color: "var(--color-text-dark)",
                        fontSize: "clamp(20px, 2.2vw, 26px)",
                        lineHeight: 1.15,
                      }}
                    >
                      {person.name}
                    </h2>
                    {person.inMemoriam && (
                      <p
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          color: "var(--color-navbar)",
                          fontSize: "12px",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          fontStyle: "italic",
                          opacity: 0.65,
                        }}
                      >
                        In Memoriam
                      </p>
                    )}
                  </div>
                  <div
                    style={{
                      width: "32px",
                      height: "2px",
                      backgroundColor: "var(--color-navbar)",
                      opacity: 0.3,
                    }}
                  />
                  {person.bio && (
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        color: "var(--color-text-dark)",
                        fontSize: "16px",
                        lineHeight: 1.85,
                        opacity: 0.72,
                      }}
                    >
                      {person.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
```

- [ ] **Verify the page loads correctly**

Open http://localhost:3000/about/trustees

Expected: founding trustees register (10 names, 4 with In Memoriam) and new appointees bio cards (4 people), all pulling from Sanity.

- [ ] **Commit**

```bash
git add src/app/about/trustees/page.tsx
git commit -m "Wire trustees page to Sanity"
```

---

## Task 10: Allow Sanity Image Domain + Final Verification

Next.js blocks external images by default. Sanity serves images from `cdn.sanity.io` — this domain must be whitelisted.

**Files:**
- Modify: `next.config.ts` (or `next.config.js` — whichever exists)

- [ ] **Check which config file exists**

```bash
ls next.config.*
```

- [ ] **Add Sanity CDN to allowed image domains**

Open the config file and add the `images` block:

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
```

If the file already has a `nextConfig` object, merge the `images` key into it — do not replace existing configuration.

- [ ] **Upload a test photo for one person in the studio, then reload the page**

Open http://localhost:3000/about/executives — the photo should render. If it throws an error about an unallowed hostname, the `remotePatterns` config is not applied — restart the dev server.

- [ ] **Run a production build to confirm no type errors or missing imports**

```bash
npm run build
```

Expected: build completes with no errors. Any TypeScript or import errors will surface here.

- [ ] **Commit**

```bash
git add next.config.ts
git commit -m "Allow Sanity CDN image domain"
```

---

## Task 11: Push to Remote

- [ ] **Push all commits**

```bash
git push
```

- [ ] **Verify deployment** (if on Vercel)

Add the two env vars to Vercel:
- Go to your Vercel project settings
- Open **Environment Variables**
- Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
- Redeploy

After deployment, open the live `/studio` URL and confirm the studio loads and the people pages reflect Sanity data.

---

## Self-Review Notes

- All 30 people are accounted for in the seed table (7 executives + 9 advisers + 10 founding trustees + 4 appointees)
- The `SanityPerson` type is reused for both executives and trustee appointees — both have the same fields
- `Promise.all` on the trustees page fetches both queries in parallel
- The `Monogram` components in executives and trustees pages are intentionally duplicated — they have slightly different title-stripping regex and live in different files. No shared component needed until a third page requires one.
- The `next.config` task is last because it is only needed when actual photos are uploaded
