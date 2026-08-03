import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HistoryExpander from "@/components/about/HistoryExpander";

export const metadata: Metadata = {
  title: "About the Guild",
  description:
    "The history, mission, and objects of the Guild of Organists of Nigeria — the professional body promoting and preserving organ music across Nigeria.",
};

/**
 * About page
 *
 * Sections:
 *   1. Page header  — maroon band (unchanged)
 *   2. History      — full-width heading, then prose + sticky image
 *   3. Objects      — full-width heading, then two-column item grid
 *   4. Strategies   — full-width heading, then clean numbered list
 *   5. CTA strip    — maroon (unchanged)
 */

export default function AboutOverview() {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>

      {/* ================================================================
       *  1. PAGE HEADER BAND — DO NOT MODIFY
       * ================================================================ */}
      <section
        style={{
          backgroundColor: "var(--color-navbar)",
          paddingTop: "var(--space-page-top)",
          paddingBottom: "clamp(40px, 5vw, 64px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div style={{ maxWidth: "800px" }}>
          <h1
            className="font-heading"
            style={{
              color: "var(--color-nav-text)",
              fontSize: "clamp(36px, 5vw, 60px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: "20px",
            }}
          >
            About the Guild
          </h1>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "18px",
              lineHeight: 1.8,
              opacity: 0.75,
              maxWidth: "620px",
            }}
          >
            The Guild of Organists of Nigeria is the foremost professional body
            representing organists and choral directors across Nigeria, dedicated
            to the promotion and advancement of organ music and choral practice
            at the highest standards of competence and artistry.
          </p>
        </div>
      </section>

      {/* ================================================================
       *  2. HISTORY
       *
       *  Heading row spans full width so it anchors the section cleanly.
       *  Below it: prose left + sticky image right. The image stays in
       *  view as the reader scrolls through the long narrative — this is
       *  the standard editorial pattern for long-form text with a single
       *  accompanying photo.
       *
       *  Image hidden on mobile (prose runs full width there).
       * ================================================================ */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          paddingTop: "clamp(56px, 7vw, 96px)",
          paddingBottom: "clamp(56px, 7vw, 96px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
          borderBottom: "1px solid #E8E0D0",
        }}
      >
        {/* Full-width section heading */}
        <div
          className="flex flex-col gap-3"
          style={{
            marginBottom: "clamp(36px, 4vw, 56px)",
            paddingBottom: "clamp(28px, 3vw, 40px)",
            borderBottom: "1px solid #E8E0D0",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-navbar)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Our History
          </span>
          <h2
            className="font-heading"
            style={{
              color: "var(--color-text-dark)",
              fontSize: "clamp(28px, 3.5vw, 46px)",
              lineHeight: 1.08,
            }}
          >
            History of the Guild of Organists of Nigeria
          </h2>
        </div>

        {/* Two-column body: prose left, sticky image right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

          {/* Prose */}
          <div className="lg:col-span-7">
            <HistoryExpander />
          </div>

          {/* Sticky image — hidden on mobile */}
          <div
            className="hidden lg:flex lg:col-span-5 flex-col gap-0"
            style={{ position: "sticky", top: "112px", alignSelf: "flex-start" }}
          >
            <div
              className="relative overflow-hidden"
              style={{ height: "clamp(340px, 38vw, 520px)" }}
            >
              <Image
                src="/images/about-guild.webp"
                alt="Guild of Organists of Nigeria"
                fill
                className="object-cover object-center"
              />
            </div>
            <div style={{ backgroundColor: "var(--color-navbar)", padding: "14px 20px" }}>
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-nav-text)",
                  fontSize: "12px",
                  opacity: 0.65,
                  letterSpacing: "0.04em",
                }}
              >
                Inauguration, Cathedral Church of Christ, Lagos, March 2014
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
       *  3. OBJECTS OF THE GUILD
       *
       *  Full-width heading row, then a two-column grid of the six
       *  CAC-registered objects. Each item: large decorative letter +
       *  text. Two columns fill the section width on desktop and stack
       *  to a single column on mobile.
       * ================================================================ */}
      <section
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(56px, 7vw, 96px)",
          paddingBottom: "clamp(56px, 7vw, 96px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
          borderBottom: "1px solid #E8E0D0",
        }}
      >
        {/* Full-width section heading */}
        <div
          className="flex flex-col gap-3"
          style={{
            marginBottom: "clamp(36px, 4vw, 56px)",
            paddingBottom: "clamp(28px, 3vw, 40px)",
            borderBottom: "1px solid #E8E0D0",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-navbar)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Our Mission
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-end">
            <h2
              className="font-heading"
              style={{
                color: "var(--color-text-dark)",
                fontSize: "clamp(28px, 3.5vw, 46px)",
                lineHeight: 1.08,
              }}
            >
              Objects of the Guild
            </h2>
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-text-dark)",
                fontSize: "16px",
                lineHeight: 1.75,
                opacity: 0.65,
              }}
            >
              As registered with the Corporate Affairs Commission and forming
              the formal purpose of the Guild.
            </p>
          </div>
        </div>

        {/* Two-column grid of objects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-0">
          {[
            "To promote and advance the arts and practice of organ playing and choral directing and related activities to the highest standards of competence and artistry.",
            "To increase the contributions of the organ and choral music to aesthetic and religious experiences, and to promote their understanding, appreciation, and enjoyment.",
            "To set and maintain proper standards in such arts for the benefit of the public.",
            "To educate musicians in such arts and practices, and improve the proficiency of organists and choral conductors.",
            "To promote study and research in such arts and practices, and to provide members with opportunities to meet for discussion of professional topics.",
            "To do all other such lawful things as will be required for the attainment of the above objects.",
          ].map((object, index) => (
            <div
              key={index}
              className="flex items-start gap-5"
              style={{
                paddingTop: "28px",
                paddingBottom: "28px",
                borderBottom: "1px solid #E8E0D0",
              }}
            >
              <span
                className="font-heading"
                style={{
                  color: "var(--color-navbar)",
                  fontSize: "clamp(24px, 2.4vw, 34px)",
                  lineHeight: 1,
                  flexShrink: 0,
                  paddingTop: "2px",
                  opacity: 0.25,
                  minWidth: "32px",
                }}
              >
                {String.fromCharCode(96 + index + 1)}.
              </span>
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-text-dark)",
                  fontSize: "16px",
                  lineHeight: 1.85,
                  opacity: 0.75,
                }}
              >
                {object}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
       *  4. STRATEGIES
       *
       *  Full-width heading row, then a clean numbered list. No image —
       *  the section carries its weight through the formal language alone.
       *  A two-column split here would leave the list items too short;
       *  a single authoritative column reads more seriously.
       * ================================================================ */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          paddingTop: "clamp(56px, 7vw, 96px)",
          paddingBottom: "clamp(56px, 7vw, 96px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
          borderBottom: "1px solid #E8E0D0",
        }}
      >
        {/* Full-width section heading */}
        <div
          className="flex flex-col gap-3"
          style={{
            marginBottom: "clamp(36px, 4vw, 56px)",
            paddingBottom: "clamp(28px, 3vw, 40px)",
            borderBottom: "1px solid #E8E0D0",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-navbar)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Our Strategies
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-end">
            <h2
              className="font-heading"
              style={{
                color: "var(--color-text-dark)",
                fontSize: "clamp(28px, 3.5vw, 46px)",
                lineHeight: 1.08,
              }}
            >
              Strategies
            </h2>
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-text-dark)",
                fontSize: "16px",
                lineHeight: 1.75,
                opacity: 0.65,
              }}
            >
              The Guild has adopted the following strategies for the
              attainment of its objects.
            </p>
          </div>
        </div>

        {/* Numbered strategy list */}
        <div style={{ maxWidth: "900px" }}>
          {[
            "Develop music education, especially the art of organ playing and choral conducting, targeting schools and choral groups.",
            "Organise regular recitals and concerts.",
            "Own concert halls and instruments to provide unhindered access to facilities for development and performance.",
            "Hold national and West African organ and choral festivals and competitions.",
            "Hold open organ and choral concerts to widen appreciation of the organ as a civic instrument, not limited to churches and other places of worship.",
          ].map((strategy, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-6 lg:gap-10 items-start"
              style={{
                paddingTop: "28px",
                paddingBottom: "28px",
                borderBottom: "1px solid #E8E0D0",
              }}
            >
              <div className="col-span-1 flex justify-end">
                <span
                  className="font-heading"
                  style={{
                    color: "var(--color-navbar)",
                    fontSize: "clamp(24px, 2.4vw, 34px)",
                    lineHeight: 1,
                    opacity: 0.25,
                    paddingTop: "2px",
                  }}
                >
                  {index + 1}.
                </span>
              </div>
              <div className="col-span-11">
                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "var(--color-text-dark)",
                    fontSize: "17px",
                    lineHeight: 1.85,
                    opacity: 0.75,
                  }}
                >
                  {strategy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
       *  5. CTA STRIP — DO NOT MODIFY
       * ================================================================ */}
      <section
        style={{
          backgroundColor: "var(--color-navbar)",
          paddingTop: "clamp(40px, 5vw, 64px)",
          paddingBottom: "clamp(40px, 5vw, 64px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex flex-col gap-2">
            <h3
              className="font-heading"
              style={{
                color: "var(--color-nav-text)",
                fontSize: "clamp(22px, 2.8vw, 34px)",
                maxWidth: "480px",
              }}
            >
              Ready to become a part of the Guild?
            </h3>
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-nav-text)",
                fontSize: "15px",
                opacity: 0.55,
              }}
            >
              Membership is open to organists, students, and supporters of
              organ music across Nigeria.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto lg:flex-shrink-0">
            <Link
              href="/membership/apply"
              className="font-nav flex items-center justify-center whitespace-nowrap hover:opacity-85 transition-opacity"
              style={{
                backgroundColor: "var(--color-nav-text)",
                color: "var(--color-navbar)",
                padding: "18px 36px",
                fontSize: "13px",
                letterSpacing: "0.1em",
              }}
            >
              Apply for Membership
            </Link>
            <Link
              href="/membership"
              className="font-nav flex items-center justify-center whitespace-nowrap hover:opacity-70 transition-opacity"
              style={{
                border: "1px solid rgba(255,249,236,0.5)",
                color: "var(--color-nav-text)",
                padding: "18px 36px",
                fontSize: "13px",
                letterSpacing: "0.1em",
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
