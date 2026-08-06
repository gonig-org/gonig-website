import type { Metadata } from "next";
import { CALENDAR_2026, FORMAT_LABELS } from "@/lib/calendar2026";

export const metadata: Metadata = {
  title: "2026 Calendar",
  description: "The Guild of Organists of Nigeria's full programme calendar for 2026.",
};

function isPast(isoDate: string | null, monthIndex: number): boolean {
  const today = new Date().toISOString().split("T")[0];
  const currentMonth = new Date().getMonth() + 1;
  if (isoDate) return isoDate < today;
  return monthIndex < currentMonth;
}

export default function CalendarPage() {
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
            2026 Programme Calendar
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
            The Guild's full schedule of meetings, recitals, workshops, and
            zonal activities for the year.
          </p>
        </div>
      </section>

      {/* Calendar table */}
      <section
        style={{
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            maxWidth: "900px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              {["Month", "Date", "Programme / Activity", "Format"].map((h) => (
                <th
                  key={h}
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-navbar)",
                    textAlign: "left",
                    padding: "0 16px 16px 0",
                    borderBottom: "2px solid var(--color-navbar)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CALENDAR_2026.map((entry, i) => {
              const past = isPast(entry.isoDate, entry.monthIndex);
              const empty = entry.format === "none";
              const ztd = entry.format === "ztd";
              const opacity = past ? 0.35 : empty ? 0.3 : 1;

              const prevMonth = i > 0 ? CALENDAR_2026[i - 1].month : null;
              const showMonth = entry.month !== prevMonth;

              return (
                <tr
                  key={i}
                  style={{
                    borderBottom: "1px solid rgba(26,0,0,0.08)",
                    opacity,
                  }}
                >
                  <td
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "var(--color-text-dark)",
                      padding: "20px 16px 20px 0",
                      whiteSpace: "nowrap",
                      verticalAlign: "top",
                      minWidth: "110px",
                    }}
                  >
                    {showMonth ? entry.month : ""}
                  </td>

                  <td
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "15px",
                      color: "var(--color-text-dark)",
                      padding: "20px 16px 20px 0",
                      whiteSpace: "nowrap",
                      verticalAlign: "top",
                      minWidth: "120px",
                      opacity: ztd ? 0.5 : 1,
                      fontStyle: ztd ? "italic" : "normal",
                    }}
                  >
                    {empty ? "—" : ztd ? "TBA" : entry.date}
                  </td>

                  <td
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "16px",
                      color: "var(--color-text-dark)",
                      padding: "20px 24px 20px 0",
                      lineHeight: 1.55,
                      verticalAlign: "top",
                    }}
                  >
                    {empty ? (
                      <span style={{ opacity: 0.4, fontSize: "14px" }}>No programme this month</span>
                    ) : (
                      <span>
                        {entry.activity}
                        {past && (
                          <span
                            style={{
                              display: "inline-block",
                              marginLeft: "10px",
                              fontFamily: "var(--font-montserrat)",
                              fontSize: "11px",
                              fontWeight: 700,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "var(--color-text-dark)",
                              opacity: 0.4,
                            }}
                          >
                            Concluded
                          </span>
                        )}
                      </span>
                    )}
                  </td>

                  <td
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "13px",
                      color: "var(--color-navbar)",
                      padding: "20px 0",
                      whiteSpace: "nowrap",
                      verticalAlign: "top",
                      opacity: empty || ztd ? 0 : 0.7,
                    }}
                  >
                    {FORMAT_LABELS[entry.format]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p
          style={{
            fontFamily: "var(--font-montserrat)",
            color: "var(--color-text-dark)",
            fontSize: "13px",
            lineHeight: 1.7,
            opacity: 0.4,
            marginTop: "40px",
            maxWidth: "600px",
          }}
        >
          TBA dates are set by the relevant Zonal leadership. Dates marked
          Physical / Online are available both in person and via live stream.
          This calendar is subject to change.
        </p>
      </section>

    </div>
  );
}
