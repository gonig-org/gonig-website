import Link from "next/link";
import { Youtube, Twitter, Facebook } from "lucide-react";

const topLinks = [
  { label: "Resources", href: "/resources" },
  { label: "News", href: "/news" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com", label: "X (Twitter)" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
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
      <div className="flex items-center gap-8">
        {topLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="hover:underline underline-offset-2 transition-opacity hover:opacity-80 uppercase"
            style={{
              color: "var(--color-nav-text)",
              fontFamily: "var(--font-montserrat)",
              letterSpacing: "-0.02em",
              fontSize: "12px",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div
        className="w-px h-4"
        style={{ backgroundColor: "var(--color-nav-text)", opacity: 0.4 }}
      />

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
