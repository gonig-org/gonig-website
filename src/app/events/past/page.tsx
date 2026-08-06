import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPastEvents } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Past Events",
  description: "A record of past programmes, concerts, and Guild meetings held by the Guild of Organists of Nigeria.",
};

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  return `${months[month - 1]} ${day}, ${year}`;
}

export default async function PastEventsPage() {
  const events = await getPastEvents();

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
            Past Events
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
            A record of the Guild's programmes, concerts, and meetings.
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
            No past events recorded yet.
          </p>
        ) : (
          <div className="flex flex-col">
            {events.map((event, i) => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="group"
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  gap: "0",
                  paddingTop: "clamp(28px, 4vw, 44px)",
                  paddingBottom: "clamp(28px, 4vw, 44px)",
                  borderBottom: "1px solid rgba(26,0,0,0.10)",
                  textDecoration: "none",
                }}
              >
                {/* Left accent bar — always present, structural anchor */}
                <div
                  style={{
                    width: "3px",
                    flexShrink: 0,
                    backgroundColor: "var(--color-navbar)",
                    marginRight: "28px",
                    opacity: 0.18,
                    transition: "opacity 0.2s",
                  }}
                  className="group-hover:opacity-60"
                />

                {/* Text — always full, never depends on image */}
                <div className="flex flex-col gap-2 flex-1" style={{ minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-navbar)",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      opacity: 0.65,
                    }}
                  >
                    {formatDate(event.date)}
                  </p>
                  <h2
                    className="font-heading"
                    style={{
                      color: "var(--color-text-dark)",
                      fontSize: "clamp(18px, 2vw, 26px)",
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
                        opacity: 0.62,
                        marginTop: "4px",
                      }}
                    >
                      {event.standfirst}
                    </p>
                  )}
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-navbar)",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      marginTop: "6px",
                      opacity: 0.7,
                    }}
                  >
                    Read more &rarr;
                  </span>
                </div>

                {/* Thumbnail — bonus where it exists, never structural */}
                {event.heroImage && (
                  <div
                    className="hidden lg:block relative shrink-0 overflow-hidden"
                    style={{ width: "180px", height: "120px", marginLeft: "32px" }}
                  >
                    <Image
                      src={event.heroImage}
                      alt={event.title}
                      fill
                      className="object-cover object-center"
                      sizes="180px"
                    />
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
