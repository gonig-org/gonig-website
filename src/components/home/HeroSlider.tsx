"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Hero event slider — the primary entry point of the GONiG home page.
 *
 * Each slide: full-bleed event image + date + title + "Learn More" link.
 *
 * Behaviour:
 *   Desktop — auto-advances every 6 seconds. A thin progress bar along
 *             the bottom of each tab shows how long until the next slide,
 *             making the automation visible and legible. Large side arrows
 *             let any user take manual control at any time. Hovering the
 *             hero pauses auto-advance.
 *   Mobile  — manual only. Large prev/next arrow buttons + "01 / 03"
 *             counter. Auto-advance is off — small screens are typically
 *             held in hand and users expect to control scrolling themselves.
 *
 * TODO: replace `events` array with Sanity CMS fetch when CMS is wired up.
 *       Pass events in as a prop — no other changes needed in this component.
 */

const SLIDE_DURATION = 6000; // ms per slide on desktop auto-advance

const events = [
  {
    id: "01",
    date: "February 9, 2026",
    title: "Dedication of New Appointees",
    image: "/images/hero-dedication.webp",
    href: "#",
  },
  {
    id: "02",
    date: "March 15, 2026",
    title: "Annual Organ Recital Series",
    image: "/images/hero-recital.webp",
    href: "#",
  },
  {
    id: "03",
    date: "April 3, 2026",
    title: "GONiG Conference — Lagos",
    image: "/images/hero-conference.webp",
    href: "#",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0); // 0–100, drives the tab progress bar

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0); // reset progress bar on manual change
  }, []);

  const prev = () => goTo(current === 0 ? events.length - 1 : current - 1);
  const next = useCallback(() => goTo(current === events.length - 1 ? 0 : current + 1), [current, goTo]);

  // Auto-advance — always running, never paused by hover
  useEffect(() => {
    const step = 50; // update interval in ms
    const increment = (step / SLIDE_DURATION) * 100;

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          next();
          return 0;
        }
        return p + increment;
      });
    }, step);

    return () => clearInterval(interval);
  }, [next]);

  const event = events[current];

  return (
    <div
      className="relative w-full mt-16 h-[70vh] lg:mt-[120px] lg:h-[calc(100vh-120px)]"
      /*
       * Pushed below the fixed nav entirely — image no longer tucks behind it.
       * Mobile:  64px navbar only  → mt-16,  height = 100vh - 64px
       * Desktop: 56px TopBar + 64px Navbar = 120px → mt-[120px], height = 100vh - 120px
       */
    >
      {/* ── Background image — crossfades between slides ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={event.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ zIndex: 0 }}
        >
          <Image
            src={event.image}
            alt={event.title}
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay — dark left (text side) fading to near-transparent right */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Layout shell ── */}
      <div
        className="absolute inset-0 flex flex-col"
        style={{ zIndex: 2 }}
      >
        {/* Breathing room at the top — navbar no longer overlaps the image */}
        <div className="h-10 lg:h-14 flex-shrink-0" />

        {/* ── Event content — grows to fill available space ── */}
        <div
          className="flex-1 flex items-center relative"
          style={{
            paddingLeft: "var(--space-section-x)",
            paddingRight: "var(--space-section-x)",
          }}
        >
          {/* Slide content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              style={{ maxWidth: "580px" }}
            >
              {/* Date label */}
              <div className="flex items-center gap-4" style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "1px",
                    backgroundColor: "var(--color-nav-text)",
                    opacity: 0.7,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "var(--color-nav-text)",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    opacity: 0.85,
                  }}
                >
                  {event.date}
                </span>
              </div>

              {/* Event title — reduced from 62px, comfortable at a glance */}
              <h1
                className="font-heading"
                style={{
                  color: "var(--color-nav-text)",
                  fontSize: "clamp(28px, 3.2vw, 46px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "36px",
                }}
              >
                {event.title}
              </h1>

              {/* CTA */}
              <Link
                href={event.href}
                className="inline-flex items-center gap-3 hover:opacity-75 transition-opacity"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-nav-text)",
                  border: "1px solid rgba(255,249,236,0.6)",
                  padding: "12px 28px",
                }}
              >
                Learn More
              </Link>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* ── Navigation strip — same layout on all screen sizes ── */}
        <div
          className="flex items-center justify-between"
          style={{
            padding: "20px var(--space-section-x)",
            borderTop: "1px solid rgba(255,249,236,0.15)",
          }}
        >
          {/* Slide counter + auto-advance progress */}
          <div className="flex items-center gap-5">
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-nav-text)",
                fontSize: "15px",
                letterSpacing: "0.05em",
                opacity: 0.75,
              }}
            >
              {String(current + 1).padStart(2, "0")}
              <span style={{ opacity: 0.4, margin: "0 8px" }}>/</span>
              {String(events.length).padStart(2, "0")}
            </span>

            {/* Thin progress bar — visible on desktop to show auto-advance is running */}
            <div
              className="hidden lg:block"
              style={{
                width: "80px",
                height: "1px",
                backgroundColor: "rgba(255,249,236,0.2)",
                position: "relative",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "1px",
                  backgroundColor: "var(--color-nav-text)",
                  opacity: 0.7,
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* Prev / Next arrow buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous event"
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
              style={{
                width: "48px",
                height: "48px",
                border: "1px solid rgba(255,249,236,0.35)",
                color: "var(--color-nav-text)",
                background: "none",
                cursor: "pointer",
              }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              aria-label="Next event"
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
              style={{
                width: "48px",
                height: "48px",
                border: "1px solid rgba(255,249,236,0.35)",
                color: "var(--color-nav-text)",
                background: "none",
                cursor: "pointer",
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
