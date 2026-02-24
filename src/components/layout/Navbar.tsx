"use client";

import Link from "next/link";
import Image from "next/image";
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

const topBarLinks = [
  { label: "Resources", href: "/resources" },
  { label: "News", href: "/news" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(
    null,
  );
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
    <>
      {/* 1. TOP BAR - Remains at 60 */}
      <div
        className="hidden lg:block fixed top-0 left-0 w-full"
        style={{ zIndex: 60 }}
      >
        <TopBar />
      </div>

      {/* 2. HEADER WRAPPER - pointer-events-none makes it "ghostly" so clicks pass through to TopBar */}
      <header
        className="fixed left-0 w-full pointer-events-none"
        style={{ top: "0", zIndex: 70 }}
      >
        <div className="hidden lg:block" style={{ height: "56px" }} />

        {/* 3. NAV - pointer-events-auto restores clicking for the actual navbar */}
        <nav
          className="w-full flex items-center backdrop-blur-md relative pointer-events-auto"
          style={{
            backgroundColor: "rgba(56, 1, 1, 0.4)",
            color: "var(--color-nav-text)",
            height: "64px",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden flex items-center justify-center"
            aria-label="Toggle menu"
            style={{ color: "var(--color-nav-text)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Mobile Logo Group */}
          <div className="lg:hidden absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
            <div
              className="rounded-full overflow-hidden flex-shrink-0"
              style={{ width: "48px", height: "48px" }}
            >
              <Image
                src="/images/gonig-logo.webp"
                alt="GONiG Logo"
                width={72}
                height={72}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="text-xs uppercase leading-tight whitespace-nowrap"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--color-nav-text)",
                letterSpacing: "0.08em",
              }}
            >
              Guild of Organists of Nigeria
            </span>
          </div>

          <div className="lg:hidden absolute" style={{ right: "24px" }}>
            <button
              aria-label="Search"
              className="hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-nav-text)" }}
            >
              <Search size={18} />
            </button>
          </div>

          {/* 4. DESKTOP LOGO - top: -48px sits flush across the 56px TopBar and 64px Nav */}
          <div
            className="hidden lg:flex absolute flex-col items-center gap-1 pointer-events-none"
            style={{ top: "-48px", left: "72px", zIndex: 80 }}
          >
            <Link href="/" className="pointer-events-auto">
              <div
                className="rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
                style={{ width: "72px", height: "72px" }}
              >
                <Image
                  src="/images/gonig-logo.webp"
                  alt="GONiG Logo"
                  width={72}
                  height={72}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <span
              className="text-xs uppercase leading-tight pointer-events-auto text-center"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--color-nav-text)",
                letterSpacing: "0.08em",
              }}
            >
              Guild of Organists of Nigeria
            </span>
          </div>

          <div
            className="hidden lg:block"
            style={{ width: "clamp(200px, 35vw, 560px)" }}
          />

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-16 flex-nowrap flex-shrink-0">
            {navItems.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center gap-1 font-medium hover:opacity-70 transition-opacity uppercase"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    letterSpacing: "-0.04em",
                    color: "var(--color-nav-text)",
                    fontSize: "12px",
                  }}
                >
                  {item.label}
                  <ChevronDown
                    size={13}
                    style={{
                      transition: "transform 0.3s ease",
                      transform:
                        openDropdown === item.label
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>

          <div
            className="hidden lg:flex items-center gap-4 absolute"
            style={{ right: "72px" }}
          >
            <button
              aria-label="Search"
              className="hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-nav-text)" }}
            >
              <Search size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* Invisible bridge */}
      <div
        className="hidden lg:block fixed left-0 w-full"
        style={{ top: "112px", height: "8px", zIndex: 69 }}
        onMouseEnter={() => openDropdown && handleMouseEnter(openDropdown)}
      />

      {/* Mega menu - restored pointer-events-auto via motion.div */}
      <AnimatePresence>
        {openDropdown && (
          <motion.div
            key={openDropdown}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="hidden lg:block fixed left-0 w-full backdrop-blur-md pointer-events-auto"
            style={{
              top: "120px",
              height: "380px",
              backgroundColor: "rgba(56, 1, 1, 0.4)",
              zIndex: 68,
            }}
            onMouseEnter={() => handleMouseEnter(openDropdown!)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="flex gap-24 h-full items-center"
              style={{ paddingLeft: "72px", paddingRight: "72px" }}
            >
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
                    fontSize: "32px",
                    fontWeight: 200,
                  }}
                >
                  /
                </span>
              </div>

              <div
                className="flex flex-col"
                style={{ maxWidth: "480px", gap: "28px" }}
              >
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
                          fontFamily: "var(--font-montserrat)",
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

      {/* Mobile Menu - Remains high z-index and auto-pointer-events */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-[100]"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="lg:hidden fixed top-0 left-0 h-full w-full z-[110] overflow-y-auto"
              style={{ backgroundColor: "#3D0C0C" }}
            >
              {/* Mobile Content (unchanged) */}
              <div
                className="flex items-center justify-between"
                style={{
                  padding: "20px 32px",
                  borderBottom: "1px solid rgba(255,249,236,0.1)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="rounded-full overflow-hidden flex-shrink-0"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <Image
                      src="/images/gonig-logo.webp"
                      alt="GONiG Logo"
                      width={72}
                      height={72}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className="text-xs uppercase"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      color: "var(--color-nav-text)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Guild of Organists of Nigeria
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{ color: "var(--color-nav-text)" }}
                >
                  <X size={22} />
                </button>
              </div>
              <div
                className="flex flex-col pt-6 pb-16"
                style={{ paddingLeft: "32px", paddingRight: "32px" }}
              >
                {navItems.map((item) => (
                  <div key={item.label}>
                    <button
                      className="w-full flex items-center justify-between uppercase"
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        color: "var(--color-nav-text)",
                        fontSize: "16px",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
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
                        size={20}
                        style={{
                          transition: "transform 0.3s ease",
                          transform:
                            openMobileSection === item.label
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          color: "var(--color-nav-text)",
                          opacity: 0.5,
                        }}
                      />
                    </button>
                    <AnimatePresence>
                      {openMobileSection === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div
                            className="flex flex-col"
                            style={{ paddingTop: "16px", paddingBottom: "8px" }}
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="flex items-center justify-between uppercase hover:opacity-60 transition-opacity"
                                style={{
                                  fontFamily: "var(--font-montserrat)",
                                  color: "var(--color-nav-text)",
                                  fontSize: "13px",
                                  paddingTop: "14px",
                                  paddingBottom: "14px",
                                }}
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.label}
                                <ChevronDown
                                  size={14}
                                  style={{
                                    transform: "rotate(-90deg)",
                                    opacity: 0.4,
                                  }}
                                />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
