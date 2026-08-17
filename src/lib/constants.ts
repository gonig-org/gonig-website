/**
 * Site-wide constants and navigation data.
 *
 * All link arrays that appear in more than one component live here so
 * there's a single source of truth. If a new page is added to the nav,
 * update it HERE — the Navbar, TopBar, Footer, and mobile menu all read
 * from these arrays.
 */

/* ---------- Site identity (used in metadata, sitemap, robots) ---------- */

export const SITE_NAME = "Guild of Organists of Nigeria";
export const SITE_ABBREVIATION = "GONiG";
export const SITE_DESCRIPTION =
  "GONiG is the registered professional body promoting, preserving, and advancing organ music across Nigeria and among Nigerians in the diaspora.";

/**
 * Canonical production URL, no trailing slash. Falls back to localhost
 * if unset or malformed (e.g. missing protocol) so a bad env var can
 * never break the build — see new URL(SITE_URL) in layout.tsx.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (!raw) return "http://localhost:3000";
  try {
    return new URL(raw).toString().replace(/\/$/, "");
  } catch {
    console.warn(
      `NEXT_PUBLIC_SITE_URL is set to an invalid URL ("${raw}") — falling back to localhost. It must include the protocol, e.g. "https://gonig.org".`
    );
    return "http://localhost:3000";
  }
}

export const SITE_URL = resolveSiteUrl();

/* ---------- Contact info (used in Footer + legal pages) ---------- */

export const CONTACT_EMAIL = "guildoforganistsofnigeria@gmail.com";
export const CONTACT_PHONES = ["08022800278", "08175351417"];
export const CONTACT_ADDRESS = {
  line1: "Plot 5, block 6, Sitec, off Town Planning way,",
  line2: "Satellite Town, Lagos, Nigeria",
};

/* ---------- Primary navigation (Navbar + mobile menu) ---------- */

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children: NavChild[] };

export const NAV_ITEMS: NavItem[] = [
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "About the Guild", href: "/about" },
      { label: "National Executives", href: "/about/executives" },
      { label: "Board of Advisers", href: "/about/advisers" },
      { label: "Board of Trustees", href: "/about/trustees" },
      { label: "Zone & Chapter Officers", href: "/about/zones" },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    children: [
      { label: "Membership Overview", href: "/membership" },
      { label: "Apply", href: "/membership/apply" },
      { label: "Renew", href: "/membership/renew" },
      { label: "Member Directory", href: "/membership/directory" },
    ],
  },
  {
    label: "Education",
    href: "#",
    children: [
      { label: "Programmes", href: "/education/programmes" },
      { label: "Mentorship", href: "/education/mentorship" },
      { label: "Training", href: "/education/training" },
      { label: "Certification", href: "/education/certification" },
      { label: "Workshops", href: "/education/workshops" },
    ],
  },
  {
    label: "Events",
    href: "/events/forthcoming",
    children: [
      { label: "Forthcoming Events", href: "/events/forthcoming" },
      { label: "Past Events", href: "/events/past" },
      { label: "Calendar", href: "/events/calendar" },
    ],
  },
];

/* ---------- Secondary navigation (TopBar + mobile menu footer) ---------- */

export const TOP_BAR_LINKS = [
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

/* ---------- Footer links ---------- */

export const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Membership", href: "/membership" },
  { label: "Events", href: "/events/forthcoming" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export const LEGAL_LINKS = [
  { label: "Terms Of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
];
