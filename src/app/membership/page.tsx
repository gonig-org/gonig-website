import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Membership of the Guild of Organists of Nigeria — categories, benefits, and how to apply or renew.",
};

/**
 * Membership overview — styled as a proper institutional interior page.
 *
 * Pattern: coloured header band (maroon) → white body.
 * No atmospheric photography, no dark overlays.
 * Comparable to: ISM, ABRSM, RCO membership pages.
 *
 * Sections:
 *   1. Page header   — maroon band, breadcrumb, title, standfirst
 *   2. Introduction  — brief editorial case for joining
 *   3. Categories    — four tiers in a clean bordered grid
 *   4. Benefits      — numbered list, two columns on desktop
 *   5. CTA           — maroon strip, apply + contact
 */

const CATEGORIES = [
  {
    title: "Fellow",
    code: "FGON",
    description:
      "Awarded to organists of distinguished standing who have made significant and sustained contributions to organ music in Nigeria. Fellows are the ambassadors of the Guild's standards and its highest-ranked members.",
    requirements: [
      "Minimum ten years as a practising organist",
      "Demonstrated contribution to the Guild or to organ music in Nigeria",
      "Nomination by two existing Fellows of the Guild",
    ],
  },
  {
    title: "Associate",
    code: "AGON",
    description:
      "Open to practising organists with formal training or verifiable experience serving in a church, cathedral, concert venue, or educational institution.",
    requirements: [
      "Active service as a church, cathedral, or concert organist",
      "Formal music training or equivalent professional experience",
      "Supported by one existing Guild member",
    ],
  },
  {
    title: "Student",
    code: "Student Member",
    description:
      "For those currently enrolled in organ or music programmes. Student membership opens access to the Guild's educational resources, mentorship network, and community.",
    requirements: [
      "Currently enrolled in a recognised music or organ programme",
      "Aged 16 or above",
      "Letter of endorsement from a tutor, music director, or organist",
    ],
  },
  {
    title: "Affiliate",
    code: "Affiliate",
    description:
      "For those who love and support organ music but do not hold a performance role — including clergy, church administrators, patrons of the arts, and interested members of the public.",
    requirements: [
      "A genuine interest in supporting organ music and the Guild's mission",
      "No performance qualification required",
    ],
  },
];

const BENEFITS = [
  {
    title: "Professional Recognition",
    body: "A formal credential identifying you as part of Nigeria's foremost body of organists, recognised in churches, educational institutions, and the wider musical community.",
  },
  {
    title: "Education & Development",
    body: "Access to masterclasses, workshops, and study resources curated by leading practitioners and overseen by the Guild's education committee.",
  },
  {
    title: "Event Invitations",
    body: "Priority access to Guild conferences, organ recitals, competitions, and the Annual General Meeting.",
  },
  {
    title: "Professional Network",
    body: "Connect with organists, music directors, church administrators, and organ builders across Nigeria and the diaspora.",
  },
  {
    title: "Guild Publications",
    body: "Receive the Guild's official newsletters, bulletins, and occasional papers on the state of organ music in Nigeria.",
  },
  {
    title: "Advocacy & Voice",
    body: "A voice in the Guild's advocacy for the installation, maintenance, and restoration of organs in worship and concert spaces across Nigeria.",
  },
];

export default function MembershipPage() {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>

      {/* ================================================================
       *  1. PAGE HEADER BAND
       *  Maroon background, cream text — the institutional interior-page
       *  treatment. No photography; the heading carries the weight.
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
            Membership
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
            The Guild of Organists of Nigeria welcomes organists, students, and
            supporters of organ music from across Nigeria and the diaspora.
          </p>
        </div>
      </section>

      {/* ================================================================
       *  2. INTRODUCTION
       * ================================================================ */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
          borderBottom: "1px solid #E8E0D0",
        }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24"
          style={{ maxWidth: "1100px" }}
        >
          <div className="lg:col-span-7">
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-text-dark)",
                fontSize: "18px",
                lineHeight: 1.85,
                opacity: 0.85,
              }}
            >
              Membership of the Guild is open to all who share our commitment to
              the organ and its sacred heritage — whether you are a seasoned
              cathedral organist, a student at the beginning of your musical
              journey, or a supporter of the art. Each membership category
              carries its own standing within the Guild and grants access to a
              community dedicated to excellence in organ music.
            </p>
          </div>

          <div
            className="lg:col-span-5 flex flex-col gap-4"
            style={{
              borderLeft: "3px solid var(--color-navbar)",
              paddingLeft: "clamp(20px, 3vw, 36px)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-text-dark)",
                fontSize: "15px",
                lineHeight: 1.8,
                opacity: 0.65,
              }}
            >
              Applications are reviewed by the Guild's membership committee.
              You will be contacted within <strong style={{ opacity: 0.9 }}>10 working days</strong> of submission.
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-text-dark)",
                fontSize: "15px",
                lineHeight: 1.8,
                opacity: 0.65,
              }}
            >
              For enquiries, write to{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                style={{
                  color: "var(--color-navbar)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
       *  3. MEMBERSHIP CATEGORIES
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
        {/* Section heading */}
        <div style={{ marginBottom: "clamp(36px, 5vw, 56px)", maxWidth: "1100px" }}>
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-navbar)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "12px",
            }}
          >
            Membership Categories
          </span>
          <h2
            className="font-heading"
            style={{
              color: "var(--color-text-dark)",
              fontSize: "clamp(26px, 3.2vw, 40px)",
            }}
          >
            Find the category that fits your standing
          </h2>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ maxWidth: "1100px" }}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="flex flex-col gap-5"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E0D0",
                padding: "clamp(28px, 3.5vw, 44px)",
              }}
            >
              {/* Category title row */}
              <div
                className="flex items-baseline justify-between flex-wrap gap-2"
                style={{ borderBottom: "2px solid var(--color-navbar)", paddingBottom: "16px" }}
              >
                <h3
                  className="font-heading"
                  style={{
                    color: "var(--color-text-dark)",
                    fontSize: "clamp(20px, 2.2vw, 26px)",
                  }}
                >
                  {cat.title}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "var(--color-navbar)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {cat.code}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-text-dark)",
                  fontSize: "16px",
                  lineHeight: 1.8,
                  opacity: 0.75,
                }}
              >
                {cat.description}
              </p>

              <div className="flex flex-col gap-3">
                <span
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "var(--color-navbar)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  Requirements
                </span>
                <ul className="flex flex-col gap-2" style={{ paddingLeft: 0, listStyle: "none" }}>
                  {cat.requirements.map((req) => (
                    <li
                      key={req}
                      className="flex items-start gap-3"
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        color: "var(--color-text-dark)",
                        fontSize: "15px",
                        lineHeight: 1.7,
                        opacity: 0.7,
                      }}
                    >
                      <span
                        style={{
                          color: "var(--color-navbar)",
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: "1px",
                        }}
                      >
                        ·
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
       *  4. MEMBER BENEFITS
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
        <div style={{ maxWidth: "1100px" }}>
          <div style={{ marginBottom: "clamp(36px, 5vw, 56px)" }}>
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-navbar)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Member Benefits
            </span>
            <h2
              className="font-heading"
              style={{
                color: "var(--color-text-dark)",
                fontSize: "clamp(26px, 3.2vw, 40px)",
              }}
            >
              What membership brings you
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="flex flex-col gap-2"
                style={{
                  paddingTop: "24px",
                  borderTop: "1px solid #E8E0D0",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "var(--color-text-dark)",
                    fontSize: "17px",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {benefit.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "var(--color-text-dark)",
                    fontSize: "16px",
                    lineHeight: 1.8,
                    opacity: 0.65,
                  }}
                >
                  {benefit.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
       *  5. CTA STRIP
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
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
          style={{ maxWidth: "1100px" }}
        >
          <div className="flex flex-col gap-2">
            <h3
              className="font-heading"
              style={{
                color: "var(--color-nav-text)",
                fontSize: "clamp(22px, 2.8vw, 34px)",
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
              Questions? Write to{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                style={{
                  color: "var(--color-nav-text)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  opacity: 0.85,
                }}
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

          <Link
            href="/membership/apply"
            className="font-nav flex items-center gap-3 hover:opacity-80 transition-opacity whitespace-nowrap w-full lg:w-auto justify-center"
            style={{
              backgroundColor: "var(--color-nav-text)",
              color: "var(--color-navbar)",
              padding: "18px 40px",
              fontSize: "13px",
            }}
          >
            Apply for Membership
          </Link>
        </div>
      </section>

    </div>
  );
}
