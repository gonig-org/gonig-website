# GONiG Website — Project Specification

## What This Is

The official website for the **Guild of Organists of Nigeria (GONiG)** — a registered professional body dedicated to the promotion, preservation, and advancement of organ music across Nigeria and among Nigerians in the diaspora.

This is an **institutional website**, not a product or marketing site. The tone and design should reflect the gravity, tradition, and prestige of a professional guild — comparable to bodies like the Royal College of Organists or a cathedral chapter. Think broadsheet newspaper, not startup landing page.

---

## The Audience

**Primary users are older adults** — established organists, clergy, church administrators, and long-standing members of the musical community. Many will be 50+ years old.

Design every page with this in mind:

- **No body text below 16px.** 17px is preferred for paragraph text. 13px is acceptable only for captions or metadata (dates, labels) — never for content.
- **No secondary text below opacity 0.65.** The previous developer used 0.35–0.4 opacity on supporting text; this is nearly unreadable for older eyes. Minimum 0.7 for anything a user needs to read.
- **One clear action per section.** Never present two equally weighted buttons competing for attention. One filled primary CTA, and if a second option is needed, use a plain text link beneath it — not a second button.
- **Generous line height.** Body paragraphs: `line-height: 1.85–2.0`. Headings: `1.05–1.15`.
- **Large tap/click targets.** Buttons must be at minimum 52px tall and have generous horizontal padding (36–44px). This matters for both mobile touch and desktop mouse users with reduced precision.
- **Simple layouts.** Avoid fragmented multi-column card grids for text content. A single clean column of prose is more readable than three narrow columns with the same information split across them.

---

## Design Principles

### Readability over decoration
If a design choice makes text harder to read — a low-opacity label, a small font size, a low-contrast colour combination — it is wrong regardless of how it looks in a design tool. Readability is non-negotiable.

### Scannability
Older users often scan before they read. Use clear visual hierarchy:
- Section overlines (labels above headings) must be legible — 13px minimum, opacity 0.55 minimum
- Headings must be significantly larger than body text
- Each section should have one obvious focal point

### Institutional gravity
The Guild is a serious professional body with decades of history. Design choices should reflect this:
- Prefer editorial restraint over decorative flourish
- Avoid patterns that read as "startup" or "tech" (email capture forms, aggressive CTAs, hero-section countdown timers, etc.)
- The Playfair Display serif headings carry the institutional weight — let them breathe

### Mobile responsiveness
All pages must work fully on mobile. The site will be accessed on phones and tablets by members checking event details, newcomers learning about the Guild, and church administrators. Specific rules:
- Body text does not shrink below 16px on any screen size — use `clamp()` with 16px floor
- Buttons go full-width on mobile (`w-full` on `sm:` and below)
- Multi-column desktop layouts stack to a single column on mobile
- Images used purely for decoration should be hidden on mobile (`hidden lg:block`) to keep prose uninterrupted

---

## Colour System

All colours are defined as CSS custom properties in `src/app/globals.css`. **Never hardcode hex values in components** — always use the variable. If a new colour is needed, add it to `globals.css` first.

| Variable | Value | Usage |
|---|---|---|
| `--color-topbar` | `#3D0C0C` | Top utility bar, mobile menu background |
| `--color-navbar` | `#380101` | Navbar, primary CTA buttons, membership section bg |
| `--color-nav-text` | `#FFF9EC` | All text on dark surfaces |
| `--color-body-bg` | `#230000` | Page-level background, footer |
| `--color-surface-dark` | `#0D0101` | Dark section backgrounds (about page) |
| `--color-surface-light` | `#F7E5C2` | Warm beige sections (legal pages) |
| `--color-text-dark` | `#1a0000` | Body text on light surfaces |

**Client concern: the site reads as too dark.** When designing new sections, lean toward white (`#FFFFFF`) or light backgrounds where the content allows. Dark sections should be purposeful and spaced out — not the default.

---

## Typography

Three typefaces are loaded via `next/font/google` in `src/app/layout.tsx` and exposed as CSS variables. Utility classes in `globals.css` cover the common patterns — use these instead of repeating inline styles:

| Class | Typeface | Use for |
|---|---|---|
| `.font-heading` | Playfair Display | All `h1`, `h2`, `h3` elements |
| `.font-body` | Montserrat | Paragraph text, descriptions |
| `.font-label` | Montserrat | Section overlines, form labels, breadcrumbs |
| `.font-nav` | Montserrat | Navigation links, buttons |

**Do not use `font-body` at its default size for main page content.** Override to 17px for body paragraphs on primary page sections. `font-body` defaults to `clamp(13px, 1.1vw, 15px)` which is appropriate for secondary/supporting text only.

---

## Content Architecture

### Navigation structure
The full nav tree lives in `src/lib/constants.ts`. Update it there — Navbar, TopBar, Footer, and mobile menu all read from those arrays. Never hardcode nav links inside components.

### Contact information
Also centralised in `src/lib/constants.ts` (`CONTACT_EMAIL`, `CONTACT_PHONE`, `CONTACT_ADDRESS`). Use the constants — do not hardcode `gonig@gmail.com` inline.

### Pages live / planned

| Route | Status |
|---|---|
| `/` | Live |
| `/about` | Live (overview, history, mission, vision) |
| `/privacy` | Live |
| `/terms` | Live |
| `/cookies` | Live |
| `/about/governance` | Planned |
| `/about/leadership` | Planned |
| `/about/partners` | Planned |
| `/membership` + subpages | Planned |
| `/education` + subpages | Planned |
| `/events` + subpages | Planned |
| `/resources`, `/news`, `/media`, `/contact` | Planned |

### CMS
Sanity is installed (`@sanity/client`, `next-sanity`) but not yet integrated. Future dynamic content (news, events, member spotlight) will come through Sanity. Do not remove these dependencies.

---

## Shared Components

| Component | Path | Purpose |
|---|---|---|
| `Navbar` | `src/components/layout/Navbar.tsx` | Primary navigation, mega menu, mobile slide-out |
| `TopBar` | `src/components/layout/TopBar.tsx` | Secondary utility bar (desktop only) |
| `Footer` | `src/components/layout/Footer.tsx` | Masthead footer with contact, links, socials |
| `Breadcrumb` | `src/components/shared/Breadcrumb.tsx` | Interior page breadcrumb, dark/light variants |
| `LegalPageLayout` | `src/components/shared/LegalPageLayout.tsx` | Shared wrapper for Privacy, Terms, Cookies pages |

When adding a new interior page, use `Breadcrumb` for wayfinding. When adding a new legal/policy page, use `LegalPageLayout`.

---

## What to Avoid

- **Small text.** If you are writing `fontSize: "11px"` or `fontSize: "12px"` for anything a user needs to read, stop and reconsider.
- **Heavy opacity on text.** `opacity: 0.35` or `opacity: 0.4` on text makes it inaccessible. Use actual lighter colours or increase opacity.
- **Two competing primary buttons.** One filled button. Secondary actions are text links.
- **Email capture forms.** The Guild runs a formal membership process, not a mailing list. Direct users to apply or contact.
- **Startup/SaaS patterns.** Countdown timers, "Free trial", gamification, notification nudges — none of these belong here.
- **Hardcoded colours or nav links.** Everything goes through `globals.css` and `constants.ts`.
- **`"use client"` on components that don't need it.** Only add when the component uses hooks, browser APIs, or event handlers.
- **Em dashes (—) in copy.** They read as AI-generated. Restructure the sentence, use a period, or use a comma instead.
