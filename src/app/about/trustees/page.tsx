import Image from "next/image";
import {
  getFoundingTrustees,
  getAppointees,
  type SanityPerson,
  type SanityTrustee,
} from "@/sanity/lib/queries";

export const revalidate = 60;

function Monogram({ name }: { name: string }) {
  const initials = name
    .replace(/^(Dr\.|Engr\.|Rev\.|Prof\.|Sir|Mr\.|Mrs\.|Chief|Deacon|Alabo|Brig\.|Gen\.)\s*/gi, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "var(--color-surface-light)",
        border: "1px solid #E8E0D0",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-playfair)",
          color: "var(--color-navbar)",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 400,
          letterSpacing: "0.05em",
          opacity: 0.5,
        }}
      >
        {initials}
      </span>
    </div>
  );
}

export default async function BoardOfTrustees() {
  const [foundingTrustees, appointees] = await Promise.all([
    getFoundingTrustees(),
    getAppointees(),
  ]);

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

      <div
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >

        {/* Founding Trustees register */}
        <div style={{ maxWidth: "960px", marginBottom: "clamp(56px, 7vw, 96px)" }}>
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
            {foundingTrustees.map((trustee: SanityTrustee, index: number) => {
              const isLast = index === foundingTrustees.length - 1;
              return (
                <div
                  key={trustee.name}
                  className="flex items-start gap-4"
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
                      paddingTop: "4px",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1">
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
                    {trustee.inMemoriam && (
                      <p
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          color: "var(--color-navbar)",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          fontStyle: "italic",
                          opacity: 0.6,
                        }}
                      >
                        In Memoriam
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* New Appointees bio cards */}
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
            New Appointees
          </span>
          <div className="flex flex-col" style={{ gap: "1px" }}>
            {appointees.map((person: SanityPerson, index: number) => (
              <div
                key={person.name}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8E0D0",
                  borderTop: index === 0 ? "3px solid var(--color-navbar)" : "none",
                  padding: "clamp(28px, 4vw, 44px)",
                }}
              >
                <div className="lg:col-span-3">
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "180px",
                      aspectRatio: "1 / 1",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {person.photo ? (
                      <Image
                        src={person.photo}
                        alt={person.name}
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <Monogram name={person.name} />
                    )}
                  </div>
                </div>
                <div className="lg:col-span-9 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h2
                      className="font-heading"
                      style={{
                        color: "var(--color-text-dark)",
                        fontSize: "clamp(20px, 2.2vw, 26px)",
                        lineHeight: 1.15,
                      }}
                    >
                      {person.name}
                    </h2>
                    {person.inMemoriam && (
                      <p
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          color: "var(--color-navbar)",
                          fontSize: "12px",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          fontStyle: "italic",
                          opacity: 0.65,
                        }}
                      >
                        In Memoriam
                      </p>
                    )}
                  </div>
                  <div
                    style={{
                      width: "32px",
                      height: "2px",
                      backgroundColor: "var(--color-navbar)",
                      opacity: 0.3,
                    }}
                  />
                  {person.bio && (
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        color: "var(--color-text-dark)",
                        fontSize: "16px",
                        lineHeight: 1.85,
                        opacity: 0.72,
                      }}
                    >
                      {person.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
