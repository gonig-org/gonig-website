import Link from "next/link";
import { Youtube, Twitter, Facebook } from "lucide-react";
import { TOP_BAR_LINKS } from "@/lib/constants";

/**
 * Utility bar pinned above the main Navbar (desktop only).
 *
 * Contains secondary navigation links (Resources, News, Media, Contact)
 * and social media icons. Hidden on mobile — those links surface inside
 * the mobile slide-out menu instead (see Navbar.tsx).
 */

const socialLinks = [
  { icon: Youtube, href: "https://www.youtube.com/@guildoforganistsofnigeria2014", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com", label: "X (Twitter)" },
  { icon: Facebook, href: "https://www.facebook.com/Guildoforganistsofnigeria", label: "Facebook" },
];

export default function TopBar() {
  return (
    <div
      className="w-full flex items-center justify-end gap-8 text-sm relative z-50"
      style={{
        backgroundColor: "var(--color-topbar)",
        color: "var(--color-nav-text)",
        height: "56px",
        paddingLeft: "72px",
        paddingRight: "72px",
      }}
    >
      {/* Secondary nav links */}
      <div className="flex items-center gap-8">
        {TOP_BAR_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-nav hover:underline underline-offset-2 transition-opacity hover:opacity-80"
            style={{
              color: "var(--color-nav-text)",
              fontSize: "12px",
              letterSpacing: "-0.02em",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Divider between links and socials */}
      <div
        className="w-px h-4"
        style={{ backgroundColor: "var(--color-nav-text)", opacity: 0.4 }}
      />

      {/* Social media icons */}
      <div className="flex items-center gap-8">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-nav-text)" }}
            >
              <Icon size={15} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
