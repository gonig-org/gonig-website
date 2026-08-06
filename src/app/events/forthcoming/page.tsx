import type { Metadata } from "next";
import { CALENDAR_2026, FORMAT_LABELS } from "@/lib/calendar2026";

export const metadata: Metadata = {
  title: "Forthcoming Events",
  description: "Upcoming programmes, concerts, and Guild meetings from the Guild of Organists of Nigeria.",
};

export default function ForthcomingEventsPage() {
  const today = new Date().toISOString().split("T")[0];
  const currentMonth = new Date().getMonth() + 1; // 1–12

  const upcoming = CALENDAR_2026.filter((entry) => {
    if (entry.format === "none") return false;
    // Specific date: show only if it's today or later
    if (entry.isoDate) return entry.isoDate >= today;
    // ZTD: show only if the month hasn't passed yet
    return entry.monthIndex >= currentMonth;
  });

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
            Events
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
            Forthcoming Events
          </h1>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "17px",
              lineHeight: 1.8,
              opacity: 0.7,
              maxWidth: "560px",
            }}
          >
            Upcoming programmes, concerts, and Guild meetings.
          </p>
        </div>
      </section>

      {/* Event list */}
      <section
        style={{
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        {upcoming.length === 0 ? (
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-text-dark)",
              fontSize: "17px",
              lineHeight: 1.85,
              opacity: 0.6,
            }}
          >
            No forthcoming events at this time. Check back soon.
          </p>
        ) : (
          <div className="flex flex-col">
            {upcoming.map((entry, i) => (
              <div
                key={i}
                className="flex flex-col lg:flex-row lg:items-start"
                style={{
                  gap: "clamp(8px, 2vw, 24px)",
                  paddingTop: "clamp(28px, 4vw, 44px)",
                  paddingBottom: "clamp(28px, 4vw, 44px)",
                  borderTop: i === 0 ? "1px solid rgba(26,0,0,0.12)" : undefined,
                  borderBottom: "1px solid rgba(26,0,0,0.12)",
                }}
              >
                {/* Month + date column */}
                <div
                  className="shrink-0"
                  style={{ minWidth: "180px" }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-navbar)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {entry.month}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-text-dark)",
                      fontSize: "15px",
                      opacity: entry.format === "ztd" ? 0.45 : 0.7,
                      fontStyle: entry.format === "ztd" ? "italic" : "normal",
                    }}
                  >
                    {entry.format === "ztd" ? "Date to be announced" : entry.date}
                  </p>
                </div>

                {/* Activity + format */}
                <div className="flex flex-col gap-2">
                  <h2
                    className="font-heading"
                    style={{
                      color: "var(--color-text-dark)",
                      fontSize: "clamp(18px, 2vw, 24px)",
                      lineHeight: 1.2,
                    }}
                  >
                    {entry.activity}
                  </h2>
                  {entry.format !== "ztd" && (
                    <span
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        color: "var(--color-navbar)",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        opacity: 0.65,
                      }}
                    >
                      {FORMAT_LABELS[entry.format]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
