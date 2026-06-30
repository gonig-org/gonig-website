import {
  getFoundingTrustees,
  getAppointees,
  type SanityTrustee,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function BoardOfTrustees() {
  const [foundingTrustees, appointees] = await Promise.all([
    getFoundingTrustees(),
    getAppointees(),
  ]);

  const trustees: SanityTrustee[] = [...foundingTrustees, ...appointees];

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
        <div style={{ maxWidth: "800px" }}>
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
              marginBottom: "16px",
            }}
          >
            About the Guild
          </span>
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
            Board of Trustees
          </h1>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "17px",
              lineHeight: 1.8,
              opacity: 0.7,
              maxWidth: "580px",
            }}
          >
            The custodians of the Guild's values, assets, and long-term
            institutional integrity.
          </p>
        </div>
      </section>

      {/* Register */}
      <div
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div style={{ maxWidth: "960px" }}>
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-navbar)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "20px",
            }}
          >
            Trustees
          </span>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E8E0D0",
              borderTop: "3px solid var(--color-navbar)",
            }}
          >
            {trustees.map((trustee, index) => {
              const isLast = index === trustees.length - 1;
              return (
                <div
                  key={trustee.name}
                  className="flex items-center gap-4"
                  style={{
                    padding: "20px clamp(24px, 4vw, 40px)",
                    borderBottom: isLast ? "none" : "1px solid #E8E0D0",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-navbar)",
                      fontSize: "11px",
                      fontWeight: 700,
                      opacity: 0.3,
                      flexShrink: 0,
                      minWidth: "24px",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="font-heading"
                    style={{
                      color: "var(--color-text-dark)",
                      fontSize: "clamp(17px, 1.8vw, 21px)",
                      lineHeight: 1.2,
                    }}
                  >
                    {trustee.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
