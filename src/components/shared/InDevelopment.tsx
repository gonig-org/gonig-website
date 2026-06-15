import Link from "next/link";

/**
 * InDevelopment — shown for pages that are planned but not yet built.
 *
 * Used in two ways:
 *   1. Dropped into src/app/not-found.tsx to handle all 404s site-wide
 *   2. Imported directly into any page file as a temporary placeholder
 *      while content is being prepared
 *
 * Props:
 *   title       — optional override for the page heading
 *   description — optional override for the supporting text
 */

type Props = {
  title?: string;
  description?: string;
};

export default function InDevelopment({
  title = "This page is being prepared",
  description = "The Guild's website is still being built. This section will be available shortly.",
}: Props) {
  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>

      {/* Header band — same pattern as all interior pages */}
      <section
        style={{
          backgroundColor: "var(--color-navbar)",
          paddingTop: "var(--space-page-top)",
          paddingBottom: "clamp(40px, 5vw, 64px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div style={{ maxWidth: "640px" }}>
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.55,
              display: "block",
              marginBottom: "20px",
            }}
          >
            In Development
          </span>

          <h1
            className="font-heading"
            style={{
              color: "var(--color-nav-text)",
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
        </div>
      </section>

      {/* Body */}
      <section
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div
          style={{
            maxWidth: "560px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E8E0D0",
            borderTop: "3px solid var(--color-navbar)",
            padding: "clamp(32px, 4vw, 52px)",
          }}
          className="flex flex-col gap-8"
        >
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-text-dark)",
              fontSize: "17px",
              lineHeight: 1.85,
              opacity: 0.75,
            }}
          >
            {description}
          </p>

          <div
            style={{
              borderTop: "1px solid #E8E0D0",
              paddingTop: "24px",
            }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/"
              className="font-nav flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: "var(--color-navbar)",
                color: "var(--color-nav-text)",
                padding: "16px 32px",
                fontSize: "13px",
                letterSpacing: "0.12em",
              }}
            >
              Return to Home
            </Link>

            <Link
              href="/membership"
              className="font-nav flex items-center justify-center hover:opacity-70 transition-opacity"
              style={{
                border: "1px solid var(--color-navbar)",
                color: "var(--color-navbar)",
                padding: "16px 32px",
                fontSize: "13px",
                letterSpacing: "0.12em",
              }}
            >
              Membership
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
