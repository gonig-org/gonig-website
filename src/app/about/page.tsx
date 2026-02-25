import Image from "next/image";
import Link from "next/link";

export default function AboutOverview() {
  return (
    <div style={{ backgroundColor: "#0D0101" }}>
      {/* Page Entry — atmospheric */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: "clamp(120px, 14vw, 180px)",
          paddingBottom: "clamp(64px, 8vw, 96px)",
          paddingLeft: "clamp(24px, 5vw, 72px)",
          paddingRight: "clamp(24px, 5vw, 72px)",
          backgroundColor: "#0D0101",
        }}
      >
        {/* Faint atmospheric background image */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Image
            src="/images/about-us-hero.webp"
            alt=""
            fill
            className="object-cover object-center"
            style={{ opacity: 0.80 }}
          />
          {/* Gradient fade to solid at bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(13,1,1,0.3) 0%, rgba(13,1,1,0.7) 60%, #0D0101 100%)",
            }}
          />
        </div>
        <div style={{ maxWidth: "720px", position: "relative", zIndex: 1 }}>
          {" "}
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-3"
            style={{ marginBottom: "40px" }}
          >
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-nav-text)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                opacity: 0.4,
                textTransform: "uppercase",
              }}
            >
              Home
            </Link>
            <span
              style={{
                color: "var(--color-nav-text)",
                opacity: 0.2,
                fontSize: "11px",
              }}
            >
              /
            </span>
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-nav-text)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                opacity: 0.4,
                textTransform: "uppercase",
              }}
            >
              About
            </span>
            <span
              style={{
                color: "var(--color-nav-text)",
                opacity: 0.2,
                fontSize: "11px",
              }}
            >
              /
            </span>
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-nav-text)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                opacity: 0.85,
                textTransform: "uppercase",
              }}
            >
              Overview
            </span>
          </div>
          {/* Page title */}
          <div
            style={{
              width: "32px",
              height: "2px",
              backgroundColor: "var(--color-nav-text)",
              opacity: 0.3,
              marginBottom: "24px",
            }}
          />
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--color-nav-text)",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            About the Guild
          </h1>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "clamp(13px, 1.2vw, 15px)",
              lineHeight: 1.8,
              letterSpacing: "-0.01em",
              opacity: 0.55,
              marginTop: "24px",
              maxWidth: "560px",
            }}
          >
            The Guild of Organists of Nigeria is the foremost body representing
            organists and organ music across Nigeria — committed to excellence,
            education, and the sacred tradition of the instrument.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section
        style={{
          paddingTop: "clamp(64px, 8vw, 120px)",
          paddingBottom: "clamp(64px, 8vw, 120px)",
          paddingLeft: "clamp(24px, 5vw, 72px)",
          paddingRight: "clamp(24px, 5vw, 72px)",
          backgroundColor: "#0D0101",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — editorial prose */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-nav-text)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  opacity: 0.4,
                  textTransform: "uppercase",
                }}
              >
                Our History
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "var(--color-nav-text)",
                  fontSize: "clamp(24px, 3vw, 40px)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                }}
              >
                A legacy rooted in sacred music
              </h2>
            </div>

            <div
              className="flex flex-col gap-6"
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-nav-text)",
                fontSize: "clamp(13px, 1.1vw, 15px)",
                lineHeight: 1.9,
                letterSpacing: "-0.01em",
                opacity: 0.65,
              }}
            >
              <p>
                The Guild of Organists of Nigeria was founded with a singular
                vision — to bring together the scattered community of organists
                across the nation under one distinguished body. From its
                earliest gatherings in Lagos, the Guild drew musicians from
                cathedrals, parishes, and concert halls who shared a deep
                reverence for the pipe organ and its sacred heritage.
              </p>
              <p>
                Through decades of dedication, the Guild established itself as
                the authoritative voice on organ music in Nigeria, forging
                relationships with international bodies, training generations of
                organists, and championing the restoration and installation of
                organs in worship spaces across the country.
              </p>
              <p>
                Today, the Guild stands as both a custodian of tradition and a
                catalyst for innovation — embracing new voices while honouring
                the discipline and artistry that have defined organ music for
                centuries.
              </p>
            </div>
          </div>

          {/* Right — image */}
          <div
            className="relative overflow-hidden"
            style={{
              height: "clamp(300px, 40vw, 560px)",
              marginTop: "0",
            }}
          >
            <Image
              src="/images/hero-bg.webp"
              alt="Guild history"
              fill
              className="object-cover object-center"
            />
            {/* Subtle overlay */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
            />
            {/* Caption */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                padding: "16px 20px",
                backgroundColor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-nav-text)",
                  fontSize: "11px",
                  letterSpacing: "0.05em",
                  opacity: 0.6,
                }}
              >
                Early Guild gathering, Lagos — circa 1980s
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        style={{
          marginLeft: "clamp(24px, 5vw, 72px)",
          marginRight: "clamp(24px, 5vw, 72px)",
          height: "1px",
          backgroundColor: "rgba(255,249,236,0.08)",
        }}
      />

      {/* Mission Section */}
      <section
        style={{
          paddingTop: "clamp(64px, 8vw, 120px)",
          paddingBottom: "clamp(48px, 5vw, 72px)",
          paddingLeft: "clamp(24px, 5vw, 72px)",
          paddingRight: "clamp(24px, 5vw, 72px)",
          backgroundColor: "#0D0101",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Image */}
          <div
            className="lg:col-span-5 relative overflow-hidden"
            style={{ height: "clamp(240px, 30vw, 420px)" }}
          >
            <Image
              src="/images/hero-float.webp"
              alt="Mission"
              fill
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
            />
          </div>

          {/* Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-nav-text)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                opacity: 0.4,
                textTransform: "uppercase",
              }}
            >
              Our Mission
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--color-nav-text)",
                fontSize: "clamp(24px, 3vw, 40px)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              To promote, preserve, and advance the art of organ music in
              Nigeria
            </h2>
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-nav-text)",
                fontSize: "clamp(13px, 1.1vw, 15px)",
                lineHeight: 1.9,
                letterSpacing: "-0.01em",
                opacity: 0.65,
                maxWidth: "560px",
              }}
            >
              The Guild exists to unite organists across Nigeria, provide
              pathways for education and professional development, advocate for
              the maintenance and installation of organs in worship and concert
              spaces, and foster a culture of excellence in sacred and classical
              music.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section
        style={{
          paddingTop: "clamp(48px, 5vw, 72px)",
          paddingBottom: "clamp(64px, 8vw, 120px)",
          paddingLeft: "clamp(24px, 5vw, 72px)",
          paddingRight: "clamp(24px, 5vw, 72px)",
          backgroundColor: "#0D0101",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:order-1 order-2">
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-nav-text)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                opacity: 0.4,
                textTransform: "uppercase",
              }}
            >
              Our Vision
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--color-nav-text)",
                fontSize: "clamp(24px, 3vw, 40px)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              A Nigeria where the organ resounds in every generation
            </h2>
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-nav-text)",
                fontSize: "clamp(13px, 1.1vw, 15px)",
                lineHeight: 1.9,
                letterSpacing: "-0.01em",
                opacity: 0.65,
                maxWidth: "560px",
              }}
            >
              We envision a future where organ music is woven into the cultural
              and spiritual fabric of Nigerian life — where skilled organists
              serve in every region, where young musicians are inspired and
              equipped, and where the sacred voice of the organ continues to
              elevate worship and concert life for generations to come.
            </p>
          </div>

          {/* Image */}
          <div
            className="lg:col-span-5 relative overflow-hidden lg:order-2 order-1"
            style={{ height: "clamp(240px, 30vw, 420px)" }}
          >
            <Image
              src="/images/hero-bg.webp"
              alt="Vision"
              fill
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
            />
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section
        style={{
          paddingTop: "clamp(48px, 5vw, 72px)",
          paddingBottom: "clamp(48px, 5vw, 72px)",
          paddingLeft: "clamp(24px, 5vw, 72px)",
          paddingRight: "clamp(24px, 5vw, 72px)",
          backgroundColor: "#3D0C0C",
          borderTop: "1px solid rgba(255,249,236,0.08)",
        }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <h3
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--color-nav-text)",
              fontSize: "clamp(20px, 2.5vw, 32px)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              maxWidth: "480px",
            }}
          >
            Ready to become a part of the Guild?
          </h3>
          <Link
            href="/membership/apply"
            className="flex items-center gap-4 hover:opacity-70 transition-opacity"
            style={{
              border: "1px solid var(--color-nav-text)",
              color: "var(--color-nav-text)",
              fontFamily: "var(--font-montserrat)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              paddingTop: "18px",
              paddingBottom: "18px",
              paddingLeft: "28px",
              paddingRight: "28px",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Apply for Membership
            <span style={{ fontSize: "10px" }}>&#9658;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
