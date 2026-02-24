import Image from "next/image";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#000000" }}>
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center"
        style={{ height: "100vh", paddingTop: "80px" }}
      >
        {/* Background image */}
        <Image
          src="/images/hero-bg.webp"
          alt="GONiG Hero"
          fill
          priority
          className="object-cover object-center"
          style={{ zIndex: 0 }}
        />

        {/* Dark overlay so text pops */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.45)", zIndex: 1 }}
        />

        {/* Hero content */}
        <div
          className="relative w-full"
          style={{
            zIndex: 2,
            paddingLeft: "clamp(24px, 5vw, 72px)",
            paddingRight: "clamp(24px, 5vw, 72px)",
          }}
        >
          {/* Desktop layout */}
          <div className="hidden lg:flex items-center justify-between">
            {/* Left — Date, Headline, Button */}
            <div className="flex flex-col" style={{ maxWidth: "480px" }}>
              <div className="flex flex-col gap-8">
                {/* Date with line */}
                <div className="flex items-center gap-4">
                  <div
                    style={{
                      width: "32px",
                      height: "1px",
                      backgroundColor: "var(--color-nav-text)",
                      opacity: 0.7,
                    }}
                  />
                  <span
                    className="uppercase tracking-widest"
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-nav-text)",
                      fontSize: "12px",
                      letterSpacing: "0.15em",
                      fontWeight: 700,
                      opacity: 0.85,
                    }}
                  >
                    February 9, 2026
                  </span>
                </div>

                {/* Headline */}
                <h1
                  style={{
                    fontFamily: "var(--font-playfair)",
                    color: "var(--color-nav-text)",
                    fontSize: "clamp(24px, 2.5vw, 36px)",
                    fontWeight: 400,
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Dedication of new appointees
                </h1>
              </div>

              {/* Learn More button */}
              <button
                className="flex items-center gap-4 hover:opacity-70 transition-opacity"
                style={{
                  marginTop: "56px",
                  border: "1px solid var(--color-nav-text)",
                  color: "var(--color-nav-text)",
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  paddingLeft: "32px",
                  paddingRight: "32px",
                  width: "fit-content",
                  textTransform: "uppercase",
                }}
              >
                Learn More
                <span style={{ fontSize: "10px" }}>&#9658;</span>
              </button>
            </div>

            {/* Right — Floating image panel */}
            <div
              className="relative overflow-hidden flex-shrink-0"
              style={{
                width: "calc(50vw - 72px)",
                height: "clamp(200px, 25vw, 360px)",
              }}
            >
              <Image
                src="/images/hero-float.webp"
                alt="Featured event"
                fill
                className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          </div>

          {/* Mobile layout — stacked */}
          <div className="flex lg:hidden flex-col" style={{ gap: "24px" }}>
            {/* Date with line */}
            <div className="flex items-center gap-4">
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  backgroundColor: "var(--color-nav-text)",
                  opacity: 0.7,
                }}
              />
              <span
                className="uppercase"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-nav-text)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  fontWeight: 700,
                  opacity: 0.85,
                }}
              >
                February 9, 2026
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--color-nav-text)",
                fontSize: "clamp(22px, 6vw, 30px)",
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              Dedication of new appointees
            </h1>

            {/* Floating image — full width */}
            <div
              className="relative overflow-hidden w-full"
              style={{ height: "200px" }}
            >
              <Image
                src="/images/hero-float.webp"
                alt="Featured event"
                fill
                className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>

            {/* Learn More button */}
            <button
              className="flex items-center gap-3 hover:opacity-70 transition-opacity"
              style={{
                marginTop: "16px",
                marginBottom: "40px",
                border: "1px solid var(--color-nav-text)",
                color: "var(--color-nav-text)",
                fontFamily: "var(--font-montserrat)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                paddingTop: "16px",
                paddingBottom: "16px",
                paddingLeft: "24px",
                paddingRight: "24px",
                width: "fit-content",
                textTransform: "uppercase",
              }}
            >
              Learn More
              <span style={{ fontSize: "9px" }}>&#9658;</span>
            </button>
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <section
        className="w-full relative"
        style={{
          backgroundColor: "#F7E5C2",
          paddingTop: "clamp(64px, 8vw, 120px)",
          paddingBottom: "clamp(64px, 8vw, 120px)",
          paddingLeft: "clamp(24px, 5vw, 72px)",
          paddingRight: "clamp(24px, 5vw, 72px)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Headline + Description */}
          <div className="flex flex-col gap-8">
            <div
              style={{
                width: "32px",
                height: "2px",
                backgroundColor: "#380101",
                opacity: 0.4,
              }}
            />
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                color: "#1a0000",
                fontSize: "clamp(28px, 3.5vw, 48px)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Join the Guild
            </h2>
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "#1a0000",
                fontSize: "clamp(13px, 1.2vw, 15px)",
                lineHeight: 1.8,
                letterSpacing: "-0.01em",
                opacity: 0.65,
                maxWidth: "480px",
              }}
            >
              Become part of a distinguished community of organists dedicated to
              preserving and advancing the sacred art of organ music across
              Nigeria. Whether you are a seasoned performer, a student, or a
              passionate enthusiast — there is a place for you here.
            </p>
          </div>

          {/* Right — Email form */}
          <div
            className="flex flex-col gap-6"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(8px)",
              padding: "clamp(32px, 4vw, 56px)",
              border: "1px solid rgba(56, 1, 1, 0.1)",
            }}
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="uppercase"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "#1a0000",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  opacity: 0.5,
                }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "#1a0000",
                  fontSize: "14px",
                  letterSpacing: "-0.01em",
                  padding: "16px 0",
                  border: "none",
                  borderBottom: "1px solid rgba(56, 1, 1, 0.2)",
                  backgroundColor: "transparent",
                  outline: "none",
                  width: "100%",
                }}
              />
            </div>

            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "#1a0000",
                fontSize: "12px",
                opacity: 0.4,
                letterSpacing: "-0.01em",
                lineHeight: 1.6,
              }}
            >
              Submit your email and our membership team will reach out to you
              with next steps.
            </p>

            <button
              className="flex items-center justify-between gap-4 hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: "#380101",
                color: "#F7E5C2",
                fontFamily: "var(--font-montserrat)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "28px",
                paddingRight: "28px",
                textTransform: "uppercase",
                width: "100%",
                marginTop: "8px",
              }}
            >
              Register Interest
              <span style={{ fontSize: "10px" }}>&#9658;</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
