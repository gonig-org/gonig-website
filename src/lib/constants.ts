/**
 * Site-wide constants and navigation data.
 *
 * All link arrays that appear in more than one component live here so
 * there's a single source of truth. If a new page is added to the nav,
 * update it HERE — the Navbar, TopBar, Footer, and mobile menu all read
 * from these arrays.
 */

/* ---------- Contact info (used in Footer + legal pages) ---------- */

export const SITE_NAME = "Guild of Organists of Nigeria";
export const SITE_ABBREVIATION = "GONiG";
export const CONTACT_EMAIL = "gonig@gmail.com";
export const CONTACT_PHONE = "+2348062346580";
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
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    children: [
      { label: "Membership Overview", href: "/membership" },
      { label: "Apply", href: "/membership/apply" },
      { label: "Renew", href: "/membership/renew" },
    ],
  },
  {
    label: "Education",
    href: "/education",
    children: [
      { label: "Education Overview", href: "/education" },
      { label: "Programmes", href: "/education/programmes" },
      { label: "Mentorship", href: "/education/mentorship" },
      { label: "Study Resources", href: "/education/resources" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "Events Overview", href: "/events" },
      { label: "Conference", href: "/events/conference" },
      { label: "Workshops", href: "/events/workshops" },
      { label: "Competitions", href: "/events/competitions" },
      { label: "Performances", href: "/events/performances" },
      { label: "Calendar", href: "/events/calendar" },
    ],
  },
];

/* ---------- Secondary navigation (TopBar + mobile menu footer) ---------- */

export const TOP_BAR_LINKS = [
  { label: "Resources", href: "/resources" },
  { label: "News", href: "/news" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
];

/* ---------- Footer links ---------- */

export const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Membership", href: "/membership" },
  { label: "Education", href: "/education" },
  { label: "Shop", href: "/shop" },
  { label: "Contribute", href: "/support" },
  { label: "Blog", href: "/blog" },
];

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Twitter/X", href: "https://twitter.com" },
  { label: "Youtube", href: "https://youtube.com" },
];

export const LEGAL_LINKS = [
  { label: "Terms Of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
];
