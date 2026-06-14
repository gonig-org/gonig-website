/**
 * Shared layout for legal / policy pages (Privacy, Terms, Cookies).
 *
 * Matches the institutional design established by the membership and
 * about pages: maroon header band, white body, max-width prose column.
 */

type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export default function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>

      {/* Header band */}
      <section
        style={{
          backgroundColor: "var(--color-navbar)",
          paddingTop: "var(--space-page-top)",
          paddingBottom: "clamp(40px, 5vw, 64px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div style={{ maxWidth: "760px" }}>
          <h1
            className="font-heading"
            style={{
              color: "var(--color-nav-text)",
              fontSize: "clamp(32px, 4.5vw, 52px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "13px",
              opacity: 0.5,
              letterSpacing: "0.03em",
            }}
          >
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Prose body */}
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
          className="flex flex-col gap-10"
          style={{
            maxWidth: "720px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E8E0D0",
            padding: "clamp(32px, 5vw, 64px)",
          }}
        >
          {children}
        </div>
      </section>
    </div>
  );
}

/** A section heading (h2) for a numbered policy section */
export function LegalHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-heading"
      style={{
        color: "var(--color-text-dark)",
        fontSize: "clamp(18px, 2vw, 22px)",
        paddingBottom: "12px",
        borderBottom: "1px solid #E8E0D0",
      }}
    >
      {children}
    </h2>
  );
}

/** Body paragraph for legal content */
export function LegalParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-montserrat)",
        color: "var(--color-text-dark)",
        fontSize: "16px",
        lineHeight: 1.85,
        opacity: 0.75,
      }}
    >
      {children}
    </p>
  );
}

/** A section wrapper: heading + one or more paragraphs */
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <LegalHeading>{heading}</LegalHeading>
      {children}
    </div>
  );
}
