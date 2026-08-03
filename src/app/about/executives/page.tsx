import type { Metadata } from "next";
import Image from "next/image";
import { getExecutives, type SanityPerson } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "National Executives",
  description: "Meet the National Executives leading the Guild of Organists of Nigeria.",
};

function Monogram({ name }: { name: string }) {
  const initials = name
    .replace(/^(Dr\.|Engr\.|Rev\.|Prof\.)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
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

export default async function NationalExecutives() {
  const executives = await getExecutives();

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
            National Executives
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
            The elected officers responsible for the administration and
            advancement of the Guild of Organists of Nigeria.
          </p>
        </div>
      </section>

      {/* Executives list */}
      <section
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div className="flex flex-col" style={{ maxWidth: "960px", gap: 0 }}>
          {executives.map((exec: SanityPerson, index: number) => (
            <div
              key={exec.name}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E0D0",
                borderTop: index === 0 ? "3px solid var(--color-navbar)" : "none",
                padding: "clamp(28px, 4vw, 44px)",
                marginBottom: "1px",
              }}
            >
              {/* Image / Monogram */}
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
                  {exec.photo ? (
                    <Image
                      src={exec.photo}
                      alt={exec.name}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <Monogram name={exec.name} />
                  )}
                </div>
              </div>

              {/* Name + bio */}
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
                    {exec.name}
                  </h2>
                  {exec.inMemoriam && (
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        color: "var(--color-navbar)",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        opacity: 0.65,
                        fontStyle: "italic",
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
                {exec.bio && (
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-text-dark)",
                      fontSize: "16px",
                      lineHeight: 1.85,
                      opacity: 0.72,
                    }}
                  >
                    {exec.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
