"use client";

import Link from "next/link";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Membership", href: "/membership" },
  { label: "Education", href: "/education" },
  { label: "Shop", href: "/shop" },
  { label: "Contribute", href: "/support" },
  { label: "Blog", href: "/blog" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Twitter/X", href: "https://twitter.com" },
  { label: "Youtube", href: "https://youtube.com" },
];

const legalLinks = [
  { label: "Terms Of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      style={{
        backgroundColor: "#230000",
        color: "var(--color-nav-text)",
      }}
    >
      <div
        style={{
          paddingLeft: "72px",
          paddingRight: "72px",
          paddingTop: "96px",
          paddingBottom: "32px",
        }}
      >
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">

          {/* Left — Brand + Contact */}
          <div className="lg:col-span-5 flex flex-col gap-8">

            {/* Logo + Name */}
            <div className="flex items-center gap-4">
              <div
                className="rounded-full overflow-hidden shrink-0"
                style={{ width: "56px", height: "56px" }}
              >
                <img
                  src="/images/gonig-logo.png"
                  alt="GONiG Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="text-xl"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "var(--color-nav-text)",
                }}
              >
                GONig
              </span>
            </div>

            {/* Address */}
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-nav-text)",
                opacity: 0.75,
                letterSpacing: "-0.01em",
              }}
            >
              Plot 5, block 6, Sitec, off Town Planning way,<br />
              Satellite Town, Lagos, Nigeria
            </p>

            {/* Telephone + Email */}
            <div className="flex gap-16">
              <div className="flex flex-col gap-2">
                <span
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "var(--color-nav-text)",
                    opacity: 0.5,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Telephone:
                </span>
                <span
                  className="text-sm font-medium"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "var(--color-nav-text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  +2348062346580
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "var(--color-nav-text)",
                    opacity: 0.5,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Email:
                </span>
                <a
                  href="mailto:gonig@gmail.com"
                  className="text-sm font-medium hover:opacity-70 transition-opacity"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "var(--color-nav-text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  gonig@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right — Quick Links, Social, Legal */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10 lg:gap-16">

            {/* Quick Links */}
            <div className="flex flex-col gap-6">
              <span
                className="text-sm"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-nav-text)",
                  opacity: 0.5,
                  letterSpacing: "-0.01em",
                }}
              >
                Quick Links
              </span>
              <div className="flex flex-col gap-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm hover:opacity-60 transition-opacity"
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-nav-text)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-6">
              <span
                className="text-sm"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-nav-text)",
                  opacity: 0.5,
                  letterSpacing: "-0.01em",
                }}
              >
                Social
              </span>
              <div className="flex flex-col gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:opacity-60 transition-opacity"
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-nav-text)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-6 col-span-2 sm:col-span-1">
              <span
                className="text-sm"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-nav-text)",
                  opacity: 0.5,
                  letterSpacing: "-0.01em",
                }}
              >
                Legal
              </span>
              <div className="flex flex-col gap-4">
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm hover:opacity-60 transition-opacity"
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-nav-text)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Back to top + copyright */}
        <div
          className="flex items-center justify-between"
          style={{ marginTop: "120px" }}
        >
          <p
            className="text-xs"
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              opacity: 0.4,
              letterSpacing: "-0.01em",
            }}
          >
            © 2023 GONig. All rights reserved
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 hover:opacity-70 transition-opacity"
            style={{
              color: "var(--color-nav-text)",
              fontFamily: "var(--font-montserrat)",
              fontSize: "13px",
              letterSpacing: "-0.01em",
            }}
          >
            Back to Top
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "1px solid rgba(255,249,236,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "1",
              }}
            >
              <span style={{ fontSize: "18px", marginTop: "-2px" }}>↑</span>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}