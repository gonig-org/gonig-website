import Image from "next/image";
import Link from "next/link";

/**
 * About page — redesigned to match the institutional light treatment
 * established by the membership pages.
 *
 * Pattern: maroon header band → alternating white/#FAFAF8 body sections.
 * No dark surfaces, no atmospheric overlays.
 *
 * Sections:
 *   1. Page header  — maroon band, title, standfirst
 *   2. History      — white, prose left + captioned image right
 *   3. Mission      — #FAFAF8, image left + text right
 *   4. Vision       — white, text left + image right
 *   5. CTA strip    — maroon, membership invitation
 */

export default function AboutOverview() {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>

      {/* ================================================================
       *  1. PAGE HEADER BAND
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
            The Guild of Organists of Nigeria is the foremost body representing
            organists and organ music across Nigeria, committed to excellence,
            education, and the sacred tradition of the instrument.
          </p>
        </div>
      </section>

      {/* ================================================================
       *  2. HISTORY
       *  Prose left, captioned image right.
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Prose */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
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
                  fontSize: "clamp(26px, 3vw, 40px)",
                }}
              >
                A legacy rooted in sacred music
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              <p
  
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-text-dark)",
                  fontSize: "17px",
                  lineHeight: 1.85,
                  opacity: 0.75,
                }}
              >
                The Guild of Organists of Nigeria was founded with a singular
                purpose: to bring together the scattered community of organists
                across the nation under one distinguished body. From its
                earliest gatherings in Lagos, the Guild drew musicians from
                cathedrals, parishes, and concert halls who shared a deep
                reverence for the pipe organ and its sacred heritage.
              </p>
              <p
  
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-text-dark)",
                  fontSize: "17px",
                  lineHeight: 1.85,
                  opacity: 0.75,
                }}
              >
                Through decades of dedication, the Guild established itself as
                the authoritative voice on organ music in Nigeria, forging
                relationships with international bodies, training generations of
                organists, and championing the restoration and installation of
                organs in worship spaces across the country.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-text-dark)",
                  fontSize: "17px",
                  lineHeight: 1.85,
                  opacity: 0.75,
                }}
              >
                Today it stands as a custodian of that tradition, embracing new
                voices while honouring the discipline and artistry that have
                defined organ music for centuries.
              </p>
            </div>
          </div>

          {/* Captioned image */}
          <div className="flex flex-col gap-0">
            <div
              className="relative overflow-hidden"
              style={{ height: "clamp(300px, 38vw, 520px)" }}
            >
              <Image
                src="/images/about-guild.webp"
                alt="Early Guild gathering"
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
                Early Guild gathering, Lagos, circa 1980s
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
       *  3. MISSION
       *  Image left, text right — light grey background for variety.
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Image */}
          <div className="lg:col-span-5 flex flex-col gap-0">
            <div
              className="relative overflow-hidden"
              style={{ height: "clamp(260px, 32vw, 460px)" }}
            >
              <Image
                src="/images/about-guild.webp"
                alt="Guild mission"
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
                Guild recital, Lagos
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-7 flex flex-col gap-6">
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
            <h2
              className="font-heading"
              style={{
                color: "var(--color-text-dark)",
                fontSize: "clamp(26px, 3vw, 40px)",
              }}
            >
              To promote, preserve, and advance the art of organ music in Nigeria
            </h2>
            <p

              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-text-dark)",
                fontSize: "17px",
                lineHeight: 1.85,
                opacity: 0.75,
              }}
            >
              The Guild exists to unite organists across Nigeria, provide
              pathways for education and professional development, advocate for
              the maintenance and installation of organs in worship and concert
              spaces, and foster a culture of excellence in sacred and classical
              music.
            </p>

            <div
              className="flex flex-col gap-4"
              style={{
                paddingTop: "24px",
                borderTop: "1px solid #E8E0D0",
              }}
            >
              {[
                "Unite organists and supporters of organ music across all regions of Nigeria",
                "Provide structured pathways for education and professional development",
                "Advocate for the installation and maintenance of organs in worship spaces",
                "Represent Nigeria in the international organ music community",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span
                    style={{
                      color: "var(--color-navbar)",
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: "2px",
                      fontSize: "14px",
                    }}
                  >
                    ·
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-text-dark)",
                      fontSize: "16px",
                      lineHeight: 1.75,
                      opacity: 0.7,
                    }}
                  >
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
       *  4. VISION
       *  Text left, image right — back to white.
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Text */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
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
              Our Vision
            </span>
            <h2
              className="font-heading"
              style={{
                color: "var(--color-text-dark)",
                fontSize: "clamp(26px, 3vw, 40px)",
              }}
            >
              A Nigeria where the organ resounds in every generation
            </h2>
            <p

              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-text-dark)",
                fontSize: "17px",
                lineHeight: 1.85,
                opacity: 0.75,
              }}
            >
              We envision a future where organ music is woven into the cultural
              and spiritual fabric of Nigerian life. Skilled organists serving
              in every region. Young musicians inspired and equipped. The sacred
              voice of the organ continuing to elevate worship and concert life
              for generations to come.
            </p>

            <Link
              href="/membership"
              className="font-nav flex items-center gap-3 hover:opacity-70 transition-opacity"
              style={{
                color: "var(--color-navbar)",
                fontSize: "13px",
                width: "fit-content",
                borderBottom: "1px solid var(--color-navbar)",
                paddingBottom: "3px",
                marginTop: "8px",
              }}
            >
              Learn about membership
            </Link>
          </div>

          {/* Image */}
          <div className="lg:col-span-5 flex flex-col gap-0 order-1 lg:order-2">
            <div
              className="relative overflow-hidden"
              style={{ height: "clamp(260px, 32vw, 460px)" }}
            >
              <Image
                src="/images/about-guild.webp"
                alt="The Guild's vision"
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
                Guild of Organists of Nigeria
              </p>
            </div>
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
