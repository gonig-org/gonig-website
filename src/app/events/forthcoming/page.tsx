import Image from "next/image";
import Link from "next/link";
import { getForthcomingEvents } from "@/sanity/lib/queries";

export const revalidate = 60;

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  return `${months[month - 1]} ${day}, ${year}`;
}

export default async function ForthcomingEventsPage() {
  const events = await getForthcomingEvents();

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
        {events.length === 0 ? (
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
          <div className="flex flex-col" style={{ gap: "0" }}>
            {events.map((event, i) => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="group flex flex-col lg:flex-row gap-6 lg:gap-10 items-start hover:opacity-90 transition-opacity"
                style={{
                  paddingTop: "clamp(32px, 4vw, 48px)",
                  paddingBottom: "clamp(32px, 4vw, 48px)",
                  borderTop: i === 0 ? "1px solid rgba(26,0,0,0.12)" : undefined,
                  borderBottom: "1px solid rgba(26,0,0,0.12)",
                  textDecoration: "none",
                }}
              >
                {/* Thumbnail */}
                {event.heroImage && (
                  <div
                    className="hidden lg:block relative flex-shrink-0 overflow-hidden"
                    style={{ width: "200px", height: "134px" }}
                  >
                    <Image
                      src={event.heroImage}
                      alt={event.title}
                      fill
                      className="object-cover object-center"
                      sizes="200px"
                    />
                  </div>
                )}

                {/* Text */}
                <div className="flex flex-col gap-3">
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-navbar)",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      opacity: 0.75,
                    }}
                  >
                    {formatDate(event.date)}
                  </p>
                  <h2
                    className="font-heading"
                    style={{
                      color: "var(--color-text-dark)",
                      fontSize: "clamp(20px, 2vw, 26px)",
                      lineHeight: 1.15,
                    }}
                  >
                    {event.title}
                  </h2>
                  {event.standfirst && (
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        color: "var(--color-text-dark)",
                        fontSize: "16px",
                        lineHeight: 1.75,
                        opacity: 0.7,
                      }}
                    >
                      {event.standfirst}
                    </p>
                  )}
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-navbar)",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      marginTop: "4px",
                    }}
                  >
                    View details &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
