import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";
import HeroSlider from "@/components/home/HeroSlider";

/**
 * Home page — the main landing experience for GONiG.
 *
 * Sections:
 *   1. Hero         — sliding event showcase (date, title, image)
 *   2. About        — editorial introduction to the Guild (image + prose)
 *   3. Membership   — formal invitation to apply, dark maroon treatment
 *
 * Typography notes (audience skews older):
 *   - Body text minimum 16px, 17px preferred for paragraphs
 *   - Secondary text opacity never below 0.7
 *   - Buttons have generous padding for easy tap/click targets
 */

export default function Home() {
  return (
    <div style={{ backgroundColor: "#000000" }}>

      {/* ================================================================
       *  1. HERO — sliding event showcase
       *  HeroSlider is a client component (needs useState for slide state).
       *  It is extracted to keep this server component clean.
       *  See src/components/home/HeroSlider.tsx for full implementation.
       * ================================================================ */}
      <HeroSlider />

      {/* ================================================================
       *  2. ABOUT THE GUILD
       *
       *  Clean white section — a breath of light after the dark hero.
       *  Designed for readability first: large text, high contrast,
       *  generous line height, and a single column of prose so older
       *  readers don't have to hunt across a fragmented grid.
       *
       *  Desktop: text left (wider), atmospheric image right.
       *  Mobile:  image hidden, prose runs full width.
       * ================================================================ */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          paddingTop: "clamp(72px, 9vw, 120px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
          borderTop: "4px solid var(--color-navbar)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Text column */}
          <div className="lg:col-span-6 flex flex-col gap-8">
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
              About the Guild
            </span>

            <h2
              className="font-heading"
              style={{
                color: "var(--color-text-dark)",
                fontSize: "clamp(30px, 3.5vw, 48px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              The foremost body for organ music in Nigeria
            </h2>

            <div className="flex flex-col gap-5">
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-text-dark)",
                  fontSize: "17px",
                  lineHeight: 1.85,
                  opacity: 0.78,
                }}
              >
                The Guild of Organists of Nigeria was founded to unite the
                community of organists across the nation under one distinguished
                body. From its earliest gatherings in Lagos, the Guild drew
                musicians from cathedrals, parishes, and concert halls who shared
                a deep reverence for the pipe organ and its sacred heritage.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-text-dark)",
                  fontSize: "17px",
                  lineHeight: 1.85,
                  opacity: 0.78,
                }}
              >
                Today it stands as a custodian of that tradition. The Guild
                unites organists across every region, champions education at all
                levels, and advocates for organs in worship and concert spaces
                throughout Nigeria.
              </p>
            </div>

            <Link
              href="/about"
              className="font-nav flex items-center gap-3 hover:opacity-70 transition-opacity"
              style={{
                color: "var(--color-navbar)",
                fontSize: "13px",
                marginTop: "4px",
                width: "fit-content",
                borderBottom: "1px solid var(--color-navbar)",
                paddingBottom: "3px",
              }}
            >
              Read the full story
            </Link>
          </div>

          {/* Image column with caption — hidden on mobile */}
          <div className="hidden lg:flex lg:col-span-6 flex-col gap-0">
            <div
              className="relative overflow-hidden"
              style={{ height: "clamp(360px, 42vw, 560px)" }}
            >
              <Image
                src="/images/about-guild.webp"
                alt="Guild of Organists of Nigeria"
                fill
                className="object-cover object-center"
              />
            </div>
            <div
              style={{
                backgroundColor: "var(--color-navbar)",
                padding: "14px 20px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-nav-text)",
                  fontSize: "12px",
                  opacity: 0.65,
                  letterSpacing: "0.04em",
                }}
              >
                Guild of Organists of Nigeria
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
       *  3. MEMBERSHIP
       *
       *  A formal institutional invitation — the tone of a prestigious
       *  guild sending a letter, not a website asking for a sign-up.
       *
       *  Dark maroon (#380101) background, cream text, very large Playfair
       *  heading so it commands attention even at a glance.
       *
       *  Single primary action (Apply) + secondary text link (Learn More)
       *  — older users should never be presented with two equally weighted
       *  buttons competing for attention.
       *
       *  Desktop: heading left, details right (2-column).
       *  Mobile:  stacked, button full-width.
       * ================================================================ */}
      <section
        style={{
          backgroundColor: "var(--color-surface-light)",
          paddingTop: "clamp(72px, 9vw, 120px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
          borderTop: "4px solid var(--color-navbar)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* Left — heading + overline */}
          <div className="lg:col-span-5 flex flex-col gap-6">
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
              Membership
            </span>
            <h2
              className="font-heading"
              style={{
                color: "var(--color-text-dark)",
                fontSize: "clamp(32px, 4vw, 54px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Membership is open to all who love the organ
            </h2>
          </div>

          {/* Right — body + CTAs + contact */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-text-dark)",
                fontSize: "17px",
                lineHeight: 1.85,
                opacity: 0.78,
              }}
            >
              The Guild has a place for seasoned performers, students of the
              instrument, and supporters of sacred music alike. Membership brings
              access to education programmes, a professional network, and a
              community committed to preserving organ music for generations to
              come.
            </p>

            {/* Buttons stack on mobile, sit side-by-side on desktop */}
            <div className="flex flex-col lg:flex-row gap-4">
              <Link
                href="/membership/apply"
                className="font-nav flex items-center justify-center lg:justify-start gap-3 hover:opacity-85 transition-opacity"
                style={{
                  backgroundColor: "var(--color-navbar)",
                  color: "var(--color-nav-text)",
                  padding: "18px 36px",
                  fontSize: "13px",
                  letterSpacing: "0.12em",
                }}
              >
                Apply for Membership
                </Link>

              <Link
                href="/membership"
                className="font-nav flex items-center justify-center lg:justify-start gap-3 hover:opacity-70 transition-opacity"
                style={{
                  border: "1px solid var(--color-navbar)",
                  color: "var(--color-navbar)",
                  padding: "18px 36px",
                  fontSize: "13px",
                  letterSpacing: "0.12em",
                }}
              >
                Learn More
              </Link>
            </div>

            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-text-dark)",
                fontSize: "15px",
                opacity: 0.65,
                borderTop: "1px solid rgba(26,0,0,0.12)",
                paddingTop: "24px",
              }}
            >
              Have questions? Write to us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="hover:opacity-80 transition-opacity"
                style={{
                  color: "var(--color-navbar)",
                  opacity: 1,
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

    </div>
  );
}

