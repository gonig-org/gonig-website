# Member Directory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a publicly accessible, client-side-searchable Members Directory page at `/membership/directory` under the Membership nav dropdown.

**Architecture:** A single `"use client"` page component owns a `useState` search string and filters a hardcoded `MEMBERS` array on every keystroke. The data shape uses a typed `Member` interface designed for a future Sanity swap. The page follows the established interior-page pattern: maroon header band → white search section → light-grey row list.

**Tech Stack:** Next.js 16 App Router, Tailwind CSS, CSS custom properties, TypeScript, no external libraries.

---

### Task 1: Add "Member Directory" to the Membership nav dropdown

**Files:**
- Modify: `src/lib/constants.ts`

- [ ] **Step 1: Open `src/lib/constants.ts` and locate the Membership nav item**

Find the block starting at line 38:
```ts
{
  label: "Membership",
  href: "/membership",
  children: [
    { label: "Membership Overview", href: "/membership" },
    { label: "Apply", href: "/membership/apply" },
    { label: "Renew", href: "/membership/renew" },
  ],
},
```

- [ ] **Step 2: Add "Member Directory" as the last child**

Replace the children array with:
```ts
children: [
  { label: "Membership Overview", href: "/membership" },
  { label: "Apply", href: "/membership/apply" },
  { label: "Renew", href: "/membership/renew" },
  { label: "Member Directory", href: "/membership/directory" },
],
```

- [ ] **Step 3: Verify the navbar renders the new link**

Open http://localhost:3000 in a browser. Hover (desktop) or tap (mobile) the "Membership" nav item. Confirm "Member Directory" appears in the dropdown and clicking it navigates to `/membership/directory` (which will 404 until Task 2 is done — that is expected).

- [ ] **Step 4: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat: add Member Directory to Membership nav dropdown"
```

---

### Task 2: Create the Member Directory page

**Files:**
- Create: `src/app/membership/directory/page.tsx`

- [ ] **Step 1: Create the directory and file**

Create `src/app/membership/directory/page.tsx` with the following complete content:

```tsx
"use client";

import { useState } from "react";

interface Member {
  membershipNo: string;
  fullName: string;
  status: "Active" | "Inactive";
}

const MEMBERS: Member[] = [
  { membershipNo: "GON-0001", fullName: "Dr. Emmanuel Adebayo Okafor",   status: "Active"   },
  { membershipNo: "GON-0002", fullName: "Mrs. Grace Chidinma Nwosu",     status: "Active"   },
  { membershipNo: "GON-0003", fullName: "Prof. Samuel Tunde Adesanya",   status: "Inactive" },
  { membershipNo: "GON-0004", fullName: "Rev. Joseph Emeka Eze",         status: "Active"   },
  { membershipNo: "GON-0005", fullName: "Miss Adaeze Nkechi Obiora",     status: "Active"   },
  { membershipNo: "GON-0006", fullName: "Engr. Bola Oluwaseun Martins",  status: "Inactive" },
  { membershipNo: "GON-0007", fullName: "Mr. Daniel Chukwuemeka Ani",    status: "Active"   },
  { membershipNo: "GON-0008", fullName: "Dr. Funke Abimbola Salami",     status: "Active"   },
  { membershipNo: "GON-0009", fullName: "Mrs. Ngozi Perpetua Dike",      status: "Inactive" },
  { membershipNo: "GON-0010", fullName: "Mr. Oluwafemi Adewale Coker",   status: "Active"   },
  { membershipNo: "GON-0011", fullName: "Miss Ifeoma Blessing Achebe",   status: "Active"   },
  { membershipNo: "GON-0012", fullName: "Prof. Chidi Bartholomew Uche",  status: "Inactive" },
  { membershipNo: "GON-0013", fullName: "Rev. Kayode Abiodun Fashola",   status: "Active"   },
  { membershipNo: "GON-0014", fullName: "Dr. Amaka Roseline Obi",        status: "Inactive" },
  { membershipNo: "GON-0015", fullName: "Mr. Seun Olalekan Adeyemi",     status: "Active"   },
];

function StatusBadge({ status }: { status: Member["status"] }) {
  const isActive = status === "Active";
  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: isActive ? "#E8F5E9" : "#F0F0EB",
        color: isActive ? "#2E7D32" : "#6B6B60",
        fontSize: "11px",
        fontFamily: "var(--font-montserrat)",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "4px 12px",
        borderRadius: "999px",
      }}
    >
      {status}
    </span>
  );
}

export default function MemberDirectoryPage() {
  const [query, setQuery] = useState("");

  const filtered = MEMBERS.filter((m) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      m.fullName.toLowerCase().includes(q) ||
      m.membershipNo.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>

      {/* ================================================================
       *  1. HEADER BAND
       * ================================================================ */}
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
            Membership
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
            Member Directory
          </h1>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "17px",
              lineHeight: 1.8,
              opacity: 0.7,
              maxWidth: "560px",
            }}
          >
            A register of the Guild&apos;s current and past members.
          </p>
        </div>
      </section>

      {/* ================================================================
       *  2. SEARCH BAR
       * ================================================================ */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          paddingTop: "clamp(32px, 4vw, 48px)",
          paddingBottom: "clamp(32px, 4vw, 48px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
          borderBottom: "1px solid #E8E0D0",
        }}
      >
        <div style={{ maxWidth: "960px" }}>
          <label
            htmlFor="member-search"
            className="sr-only"
          >
            Search members
          </label>
          <input
            id="member-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or membership number..."
            style={{
              width: "100%",
              height: "52px",
              padding: "0 20px",
              fontFamily: "var(--font-montserrat)",
              fontSize: "16px",
              color: "var(--color-text-dark)",
              backgroundColor: "#FFFFFF",
              border: "1px solid #D8D0C0",
              borderRadius: "2px",
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = "2px solid var(--color-navbar)";
              e.currentTarget.style.outlineOffset = "2px";
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = "none";
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "13px",
              color: "var(--color-text-dark)",
              opacity: 0.55,
              marginTop: "10px",
            }}
          >
            Showing {filtered.length} of {MEMBERS.length} member{MEMBERS.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* ================================================================
       *  3. DIRECTORY ROWS
       * ================================================================ */}
      <section
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(40px, 5vw, 64px)",
          paddingBottom: "clamp(64px, 8vw, 100px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div style={{ maxWidth: "960px" }}>

          {/* Column headers — desktop only */}
          <div
            className="hidden lg:grid"
            style={{
              gridTemplateColumns: "20% 55% 25%",
              paddingBottom: "12px",
              borderBottom: "1px solid #E8E0D0",
              marginBottom: "0",
            }}
          >
            {["Membership No.", "Full Name", "Status"].map((label) => (
              <span
                key={label}
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-text-dark)",
                  opacity: 0.45,
                }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Member rows */}
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "clamp(40px, 6vw, 72px) 0",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "16px",
                  color: "var(--color-text-dark)",
                  opacity: 0.55,
                }}
              >
                No members match your search.
              </p>
            </div>
          ) : (
            <div className="flex flex-col" style={{ gap: 0 }}>
              {filtered.map((member, index) => (
                <div
                  key={member.membershipNo}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E8E0D0",
                    borderTop:
                      index === 0
                        ? "3px solid var(--color-navbar)"
                        : "none",
                    padding: "clamp(20px, 2.5vw, 28px) clamp(20px, 3vw, 32px)",
                    marginBottom: "1px",
                  }}
                >
                  {/* Desktop: 3-column grid */}
                  <div
                    className="hidden lg:grid items-center"
                    style={{ gridTemplateColumns: "20% 55% 25%" }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "13px",
                        color: "var(--color-text-dark)",
                        opacity: 0.6,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {member.membershipNo}
                    </span>
                    <span
                      className="font-heading"
                      style={{
                        fontSize: "18px",
                        color: "var(--color-text-dark)",
                      }}
                    >
                      {member.fullName}
                    </span>
                    <StatusBadge status={member.status} />
                  </div>

                  {/* Mobile: stacked card */}
                  <div className="flex flex-col gap-2 lg:hidden">
                    <span
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "12px",
                        color: "var(--color-text-dark)",
                        opacity: 0.5,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {member.membershipNo}
                    </span>
                    <span
                      className="font-heading"
                      style={{
                        fontSize: "18px",
                        color: "var(--color-text-dark)",
                        lineHeight: 1.2,
                      }}
                    >
                      {member.fullName}
                    </span>
                    <StatusBadge status={member.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
```

- [ ] **Step 2: Verify the page loads**

Open http://localhost:3000/membership/directory. Confirm:
- Maroon header band with "Member Directory" heading renders
- Search input is visible below the header
- All 15 members are listed
- Active members have a green badge, Inactive have a grey badge

- [ ] **Step 3: Test search filtering**

Type "okafor" in the search box. Confirm only "Dr. Emmanuel Adebayo Okafor" (GON-0001) appears and the count reads "Showing 1 of 15 members".

Clear the input. Type "GON-001" — confirm only GON-0010 and GON-0011... wait, type "GON-0001" specifically and confirm only GON-0001 appears.

Type a nonsense string like "zzzzz". Confirm the "No members match your search." empty state appears.

- [ ] **Step 4: Test mobile layout**

In browser DevTools, switch to a 390px wide viewport (iPhone 14 size). Confirm:
- Each row shows membership number as a small label on top, name in the middle, badge at the bottom
- No horizontal scrolling occurs
- Column headers ("Membership No.", "Full Name", "Status") are hidden

- [ ] **Step 5: Commit**

```bash
git add src/app/membership/directory/page.tsx
git commit -m "feat: add Member Directory page with client-side search"
```
