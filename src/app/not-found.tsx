import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
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
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.55,
              marginBottom: "16px",
            }}
          >
            404
          </p>
          <h1
            className="font-heading"
            style={{
              color: "var(--color-nav-text)",
              fontSize: "clamp(32px, 4.5vw, 56px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Page not found
          </h1>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "17px",
              lineHeight: 1.8,
              opacity: 0.7,
              maxWidth: "520px",
            }}
          >
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
      </section>

      <section
        style={{
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div className="flex flex-col gap-6" style={{ maxWidth: "480px" }}>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-text-dark)",
              fontSize: "17px",
              lineHeight: 1.85,
              opacity: 0.7,
            }}
          >
            You may want to return to the home page or use the navigation above
            to find what you need.
          </p>
          <Link
            href="/"
            className="font-nav hover:opacity-85 transition-opacity"
            style={{
              backgroundColor: "var(--color-navbar)",
              color: "var(--color-nav-text)",
              padding: "18px 36px",
              fontSize: "13px",
              letterSpacing: "0.12em",
              width: "fit-content",
              display: "inline-block",
            }}
          >
            Return to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
