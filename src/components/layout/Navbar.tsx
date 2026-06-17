"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import TopBar from "./TopBar";
import { NAV_ITEMS, TOP_BAR_LINKS, SITE_NAME } from "@/lib/constants";

/**
 * Main site navigation — fixed to the top of the viewport.
 *
 * Structure (desktop):
 *   ┌─────────────── TopBar (56px) ───────────────┐
 *   ├── Logo ──── Nav links ──── Search ──────────┤  ← Navbar (64px), solid bg
 *   └── Simple dropdown on hover ────────────────┘
 *
 * Structure (mobile):
 *   ┌── Hamburger ──── Logo ──── Search ──────────┤
 *   └── Full-screen slide-out panel ──────────────┘
 *
 * Design decisions:
 *   - Solid background (no frosted glass) — institutions don't blur
 *   - Simple per-item dropdowns (not a mega menu) — clean, legible, precise
 *   - Chevron is a static indicator only — no rotation animation
 */

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    // Short delay so users can move cursor from trigger into the dropdown
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Auto-close mobile menu when viewport grows past lg breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ── TopBar (desktop only) ── */}
      <div className="hidden lg:block fixed top-0 left-0 w-full" style={{ zIndex: 60 }}>
        <TopBar />
      </div>

      {/* ── Header ── */}
      <header
        className="fixed left-0 w-full pointer-events-none"
        style={{ top: 0, zIndex: 70 }}
      >
        {/* Spacer equal to TopBar height so nav sits flush below it on desktop */}
        <div className="hidden lg:block" style={{ height: "56px" }} />

        <nav
          className="w-full flex items-center relative pointer-events-auto"
          style={{
            /*
             * Solid background — not frosted glass.
             * Institutions don't blur; a solid bar reads with more authority
             * and is easier to read for older users (no bleed-through content).
             */
            backgroundColor: "var(--color-navbar)",
            color: "var(--color-nav-text)",
            height: "64px",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          {/* Mobile: hamburger */}
          <button
            className="lg:hidden flex items-center justify-center"
            aria-label="Toggle menu"
            style={{ color: "var(--color-nav-text)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Mobile: centred logo + name — links to home */}
          <Link href="/" className="lg:hidden absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
            <div className="rounded-full overflow-hidden flex-shrink-0" style={{ width: "44px", height: "44px" }}>
              <Image src="/images/gonig-logo.webp" alt="GONiG Logo" width={72} height={72} className="w-full h-full object-cover" />
            </div>
            <span
              className="text-xs uppercase leading-tight whitespace-nowrap"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--color-nav-text)", letterSpacing: "0.08em" }}
            >
              {SITE_NAME}
            </span>
          </Link>


          {/* Desktop: logo floating above the navbar */}
          <div
            className="hidden lg:flex absolute flex-col items-center gap-1 pointer-events-none"
            style={{ top: "-48px", left: "72px", zIndex: 80 }}
          >
            <Link href="/" className="pointer-events-auto">
              <div className="rounded-full overflow-hidden" style={{ width: "72px", height: "72px" }}>
                <Image src="/images/gonig-logo.webp" alt="GONiG Logo" width={72} height={72} className="w-full h-full object-cover" />
              </div>
            </Link>
            <span
              className="text-xs uppercase leading-tight pointer-events-auto text-center"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--color-nav-text)", letterSpacing: "0.08em" }}
            >
              {SITE_NAME}
            </span>
          </div>

          {/* Spacer — pushes links to the right of the logo region */}
          <div className="hidden lg:block" style={{ width: "clamp(200px, 35vw, 560px)" }} />

          {/* Desktop: nav links with per-item dropdowns */}
          <div className="hidden lg:flex items-center gap-16 flex-nowrap flex-shrink-0">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center gap-1.5 hover:opacity-70 transition-opacity uppercase"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: "var(--color-nav-text)",
                  }}
                >
                  {item.label}
                  {/* Static chevron — indicates submenu exists, does not animate */}
                  <ChevronDown size={12} style={{ opacity: 0.6, flexShrink: 0 }} />
                </button>

                {/* ── Simple dropdown ── */}
                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0"
                      style={{
                        marginTop: "16px",
                        minWidth: "200px",
                        backgroundColor: "#2a0000",
                        border: "1px solid rgba(255,249,236,0.1)",
                        zIndex: 90,
                      }}
                    >
                      {item.children.map((child, i) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block hover:bg-white/8 transition-colors"
                          style={{
                            fontFamily: "var(--font-montserrat)",
                            color: "var(--color-nav-text)",
                            fontSize: "14px",
                            letterSpacing: "-0.01em",
                            padding: "13px 20px",
                            borderBottom:
                              i < item.children.length - 1
                                ? "1px solid rgba(255,249,236,0.07)"
                                : "none",
                            opacity: 0.85,
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </nav>
      </header>

      {/* ── Mobile menu (full-screen slide-out) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 z-[100]"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="lg:hidden fixed top-0 left-0 h-full w-full z-[110] flex flex-col"
              style={{ backgroundColor: "var(--color-topbar)" }}
            >
              {/* Fixed header */}
              <div
                className="flex-shrink-0 flex items-center justify-between"
                style={{ padding: "20px 32px", borderBottom: "1px solid rgba(255,249,236,0.1)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full overflow-hidden flex-shrink-0" style={{ width: "40px", height: "40px" }}>
                    <Image src="/images/gonig-logo.webp" alt="GONiG Logo" width={72} height={72} className="w-full h-full object-cover" />
                  </div>
                  <span
                    className="text-xs uppercase"
                    style={{ fontFamily: "var(--font-playfair)", color: "var(--color-nav-text)", letterSpacing: "0.08em" }}
                  >
                    {SITE_NAME}
                  </span>
                </div>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" style={{ color: "var(--color-nav-text)" }}>
                  <X size={22} />
                </button>
              </div>

              {/* Scrollable nav content */}
              <div
                className="flex-1 overflow-y-auto"
                style={{ padding: "24px 32px 48px", overscrollBehavior: "none" }}
              >
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    <button
                      className="w-full flex items-center justify-between uppercase"
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        color: "var(--color-nav-text)",
                        fontSize: "16px",
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                      }}
                      onClick={() =>
                        setOpenMobileSection(
                          openMobileSection === item.label ? null : item.label,
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown
                        size={18}
                        style={{
                          color: "var(--color-nav-text)",
                          opacity: 0.5,
                          transition: "transform 0.25s ease",
                          transform: openMobileSection === item.label ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </button>

                    <AnimatePresence>
                      {openMobileSection === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col" style={{ paddingBottom: "12px" }}>
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="uppercase hover:opacity-60 transition-opacity"
                                style={{
                                  fontFamily: "var(--font-montserrat)",
                                  color: "var(--color-nav-text)",
                                  fontSize: "14px",
                                  opacity: 0.65,
                                  paddingTop: "13px",
                                  paddingBottom: "13px",
                                  paddingLeft: "16px",
                                }}
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Secondary links (TopBar) */}
                <div
                  className="flex flex-col"
                  style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid rgba(255,249,236,0.08)" }}
                >
                  {TOP_BAR_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="uppercase hover:opacity-60 transition-opacity"
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        color: "var(--color-nav-text)",
                        fontSize: "14px",
                        fontWeight: 400,
                        opacity: 0.55,
                        letterSpacing: "0.06em",
                        paddingTop: "13px",
                        paddingBottom: "13px",
                      }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
