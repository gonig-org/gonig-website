"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { ChevronDown, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "./TopBar";

const navItems = [
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "History", href: "/about/history" },
      { label: "Vision & Mission", href: "/about/mission" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Patrons", href: "/about/patrons" },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    children: [
      { label: "Benefits", href: "/membership/benefits" },
      { label: "How to Join", href: "/membership/join" },
      { label: "Member Directory", href: "/membership/directory" },
    ],
  },
  {
    label: "Education",
    href: "/education",
    children: [
      { label: "Courses", href: "/education/courses" },
      { label: "Workshops", href: "/education/workshops" },
      { label: "Scholarships", href: "/education/scholarships" },
      { label: "Exams", href: "/education/exams" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "Upcoming Events", href: "/events/upcoming" },
      { label: "Past Events", href: "/events/past" },
    ],
  },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 100);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <TopBar />

      <nav
        className="w-full flex items-center justify-between backdrop-blur-md relative"
        style={{
          backgroundColor: "rgba(56, 1, 1, 0.4)",
          color: "var(--color-nav-text)",
          height: "64px",
          paddingLeft: "72px",
          paddingRight: "72px",
        }}
      >
        {/* Logo at intersection */}
        <div
          className="absolute flex flex-col items-center gap-1"
          style={{ top: "-48px", left: "72px" }}
        >
          <div
            className="rounded-full overflow-hidden flex items-center justify-center text-xs flex-shrink-0"
            style={{ width: "72px", height: "72px" }}
          >
            <img src="/images/gonig-logo.png" alt="GONiG Logo" className="w-full h-full object-cover" />
          </div>
          <span
            className="text-xs uppercase leading-tight"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--color-nav-text)",
              letterSpacing: "0.08em",
            }}
          >
            Guild of Organists of Nigeria
          </span>
        </div>

        {/* Left spacer */}
        <div style={{ width: "560px" }} />

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.label}
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center gap-1 font-medium hover:opacity-70 transition-opacity uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "-0.03em",
                  color: "var(--color-nav-text)",
                  fontSize: "13px",
                }}
              >
                {item.label}
                <ChevronDown
                  size={13}
                  style={{
                    transition: "transform 0.3s ease",
                    transform: openDropdown === item.label ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Search + Mobile toggle */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="hover:opacity-70 transition-opacity"
            style={{ color: "var(--color-nav-text)" }}
          >
            <Search size={18} />
          </button>

          <button
            className="md:hidden hover:opacity-70 transition-opacity"
            aria-label="Toggle menu"
            style={{ color: "var(--color-nav-text)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Invisible bridge */}
      <div
        className="fixed left-0 w-full"
        style={{ top: "112px", height: "8px" }}
        onMouseEnter={() => openDropdown && handleMouseEnter(openDropdown)}
      />

      {/* Mega menu */}
      <AnimatePresence>
        {openDropdown && (
          <motion.div
            key={openDropdown}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-0 w-full backdrop-blur-md"
            style={{
              top: "120px",
              height: "380px",
              backgroundColor: "rgba(56, 1, 1, 0.4)",
            }}
            onMouseEnter={() => handleMouseEnter(openDropdown!)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="flex gap-24 h-full items-center"
              style={{ paddingLeft: "72px", paddingRight: "72px" }}
            >
              {/* Big section title on the left */}
              <div className="flex items-baseline gap-3 flex-shrink-0">
                <h2
                  className="text-6xl"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    color: "var(--color-nav-text)",
                    fontWeight: 400,
                  }}
                >
                  {openDropdown}
                </h2>
                <span
                  style={{
                    color: "var(--color-nav-text)",
                    opacity: 0.5,
                    fontSize: "48px",
                    fontWeight: 200,
                  }}
                >
                  /
                </span>
              </div>

              {/* Stacked links — no dividers */}
              <div className="flex flex-col" style={{ maxWidth: "480px", gap: "28px" }}>
                {navItems
                  .find((item) => item.label === openDropdown)
                  ?.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="flex items-center justify-between group hover:opacity-60 transition-opacity"
                      style={{ color: "var(--color-nav-text)" }}
                    >
                      <span
                        className="uppercase"
                        style={{
                          fontFamily: "var(--font-inter)",
                          letterSpacing: "-0.02em",
                          fontSize: "20px",
                        }}
                      >
                        {child.label}
                      </span>
                      <ChevronDown
                        size={16}
                        style={{
                          transform: "rotate(-90deg)",
                          color: "var(--color-nav-text)",
                          opacity: 0.6,
                          marginLeft: "48px",
                        }}
                      />
                    </Link>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden w-full px-6 py-4 flex flex-col gap-4"
          style={{ backgroundColor: "#3D0C0C", color: "var(--color-nav-text)" }}
        >
          {navItems.map((item) => (
            <div key={item.label}>
              <p
                className="text-sm font-semibold mb-2 uppercase"
                style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.03em" }}
              >
                {item.label}
              </p>
              <div className="flex flex-col gap-1 pl-3">
                {item.children?.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity uppercase"
                    style={{ fontFamily: "var(--font-inter)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}