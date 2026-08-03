import type { Metadata } from "next";
import { getZoneOfficers, type SanityZoneOfficer } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Zone & Chapter Officers",
  description: "Find Guild of Organists of Nigeria zone and chapter officers across the country.",
};

export default async function ZoneAndChapterOfficers() {
  const officers = await getZoneOfficers();

  const zones = Array.from(new Set(officers.map((o) => o.zone)));

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
            Zone &amp; Chapter Officers
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
            The officers responsible for the Guild's activities across its
            regional zones and chapters.
          </p>
        </div>
      </section>

      {/* Tables */}
      <div
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        {officers.length === 0 ? (
          <div style={{ maxWidth: "960px" }}>
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-text-dark)",
                fontSize: "17px",
                lineHeight: 1.85,
                opacity: 0.5,
              }}
            >
              No officers have been added yet.
            </p>
          </div>
        ) : (
          <div
            className="flex flex-col"
            style={{ maxWidth: "960px", gap: "clamp(48px, 6vw, 72px)" }}
          >
            {zones.map((zone) => {
              const members = officers.filter((o: SanityZoneOfficer) => o.zone === zone);
              return (
                <div key={zone}>
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
                    {zone}
                  </span>

                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E8E0D0",
                      borderTop: "3px solid var(--color-navbar)",
                    }}
                  >
                    {/* Column headers */}
                    <div
                      className="grid grid-cols-12"
                      style={{
                        padding: "12px clamp(24px, 4vw, 40px)",
                        borderBottom: "1px solid #E8E0D0",
                        backgroundColor: "#FAFAF8",
                      }}
                    >
                      <div className="col-span-1" />
                      <div className="col-span-5">
                        <span
                          style={{
                            fontFamily: "var(--font-montserrat)",
                            color: "var(--color-text-dark)",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            opacity: 0.45,
                          }}
                        >
                          Name
                        </span>
                      </div>
                      <div className="col-span-6">
                        <span
                          style={{
                            fontFamily: "var(--font-montserrat)",
                            color: "var(--color-text-dark)",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            opacity: 0.45,
                          }}
                        >
                          Role
                        </span>
                      </div>
                    </div>

                    {/* Rows */}
                    {members.map((officer: SanityZoneOfficer, index: number) => {
                      const isLast = index === members.length - 1;
                      return (
                        <div
                          key={officer.name}
                          className="grid grid-cols-12 items-center"
                          style={{
                            padding: "18px clamp(24px, 4vw, 40px)",
                            borderBottom: isLast ? "none" : "1px solid #E8E0D0",
                          }}
                        >
                          <div className="col-span-1">
                            <span
                              style={{
                                fontFamily: "var(--font-montserrat)",
                                color: "var(--color-navbar)",
                                fontSize: "11px",
                                fontWeight: 700,
                                opacity: 0.3,
                              }}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="col-span-5">
                            <p
                              className="font-heading"
                              style={{
                                color: "var(--color-text-dark)",
                                fontSize: "clamp(16px, 1.6vw, 19px)",
                                lineHeight: 1.25,
                              }}
                            >
                              {officer.name}
                            </p>
                          </div>
                          <div className="col-span-6">
                            <p
                              style={{
                                fontFamily: "var(--font-montserrat)",
                                color: "var(--color-text-dark)",
                                fontSize: "15px",
                                lineHeight: 1.4,
                                opacity: 0.6,
                              }}
                            >
                              {officer.role}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
