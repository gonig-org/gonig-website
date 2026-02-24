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
    </div>
  );
}