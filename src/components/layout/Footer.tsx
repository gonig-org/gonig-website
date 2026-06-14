"use client";

import Link from "next/link";
import Image from "next/image";
import { Youtube, Twitter, Facebook } from "lucide-react";
import {
  QUICK_LINKS,
  LEGAL_LINKS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_ADDRESS,
} from "@/lib/constants";

/**
 * Site-wide footer — Masthead layout.
 *
 * Structure (top to bottom):
 *   ─────────────────── thin rule ───────────────────
 *   Guild of Organists of Nigeria          (masthead)
 *   ─────────────────── thin rule ───────────────────
 *
 *   Contact info  │  Quick Links  │  Legal + Socials
 *
 *   ─────────────────── thin rule ───────────────────
 *   © GONiG                              Back to Top ↑
 *
 * "use client" is required for the scrollToTop click handler.
 */

const socialLinks = [
  { icon: Youtube, href: "https://www.youtube.com/@guildoforganistsofnigeria2014", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com", label: "X (Twitter)" },
  { icon: Facebook, href: "https://www.facebook.com/Guildoforganistsofnigeria", label: "Facebook" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      style={{
        backgroundColor: "var(--color-body-bg)",
        color: "var(--color-nav-text)",
      }}
    >
      <div
        style={{
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        {/* ── Top rule ── */}
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(255,249,236,0.1)",
          }}
        />

        {/* ── Masthead row — logo left, name right ── */}
        <div
          className="flex items-center gap-6 flex-wrap"
          style={{ paddingTop: "40px", paddingBottom: "32px" }}
        >
          {/* Logo — large, anchors the left of the masthead */}
          <div
            className="rounded-full overflow-hidden shrink-0"
            style={{ width: "80px", height: "80px" }}
          >
            <Image
              src="/images/gonig-logo.webp"
              alt="GONiG Logo"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>

          <h2
            className="font-heading"
            style={{
              color: "var(--color-nav-text)",
              fontSize: "clamp(20px, 3.5vw, 44px)",
              letterSpacing: "-0.02em",
            }}
          >
            Guild of Organists of Nigeria
          </h2>
        </div>

        {/* ── Rule beneath masthead ── */}
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(255,249,236,0.1)",
            marginBottom: "clamp(40px, 6vw, 72px)",
          }}
        />

        {/* ── Three-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Col 1 — Contact information */}
          <div className="flex flex-col gap-6">
            <span
              className="font-label"
              style={{
                color: "var(--color-nav-text)",
                opacity: 0.4,
                fontSize: "10px",
                letterSpacing: "0.15em",
              }}
            >
              Contact
            </span>

            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "var(--color-nav-text)", opacity: 0.6 }}
            >
              {CONTACT_ADDRESS.line1}
              <br />
              {CONTACT_ADDRESS.line2}
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="font-body text-sm hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-nav-text)", opacity: 0.85 }}
              >
                {CONTACT_PHONE}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-body text-sm hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-nav-text)", opacity: 0.85 }}
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Col 2 — Quick links */}
          <div className="flex flex-col gap-6">
            <span
              className="font-label"
              style={{
                color: "var(--color-nav-text)",
                opacity: 0.4,
                fontSize: "10px",
                letterSpacing: "0.15em",
              }}
            >
              Quick Links
            </span>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm hover:opacity-60 transition-opacity"
                  style={{ color: "var(--color-nav-text)", opacity: 0.75 }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 — Legal links + social icons */}
          <div className="flex flex-col gap-6">
            <span
              className="font-label"
              style={{
                color: "var(--color-nav-text)",
                opacity: 0.4,
                fontSize: "10px",
                letterSpacing: "0.15em",
              }}
            >
              Legal
            </span>

            <div className="flex flex-col gap-3">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm hover:opacity-60 transition-opacity"
                  style={{ color: "var(--color-nav-text)", opacity: 0.75 }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social icons as proper icon buttons */}
            <div
              className="flex items-center gap-5"
              style={{ marginTop: "8px" }}
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center justify-center hover:opacity-70 transition-opacity"
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "1px solid rgba(255,249,236,0.2)",
                      color: "var(--color-nav-text)",
                    }}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom bar: copyright + back to top ── */}
        <div
          className="flex items-center justify-between"
          style={{
            marginTop: "clamp(48px, 6vw, 80px)",
            paddingTop: "24px",
            paddingBottom: "32px",
            borderTop: "1px solid rgba(255,249,236,0.08)",
          }}
        >
          <p
            className="font-body text-xs"
            style={{ color: "var(--color-nav-text)", opacity: 0.35 }}
          >
            &copy; {new Date().getFullYear()} GONiG. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 hover:opacity-70 transition-opacity"
            style={{
              color: "var(--color-nav-text)",
              fontFamily: "var(--font-montserrat)",
              fontSize: "12px",
              letterSpacing: "0.08em",
            }}
          >
            Back to Top
            <div
              className="flex items-center justify-center"
              style={{
                width: "36px",
                height: "36px",
                border: "1px solid rgba(255,249,236,0.25)",
              }}
            >
              <span style={{ fontSize: "16px", marginTop: "-2px" }}>↑</span>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
