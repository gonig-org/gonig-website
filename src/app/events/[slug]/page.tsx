import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getEventBySlug } from "@/sanity/lib/queries";
import EventGallery from "@/components/events/EventGallery";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: "Event Not Found" };
  }

  const description = event.standfirst ?? `${event.title} — a Guild of Organists of Nigeria event.`;

  return {
    title: event.title,
    description,
    openGraph: {
      title: event.title,
      description,
      images: event.heroImage ? [{ url: event.heroImage }] : undefined,
    },
  };
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  return `${months[month - 1]} ${day}, ${year}`;
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>

      {/* Header band */}
      <section
        style={{
          backgroundColor: "var(--color-navbar)",
          paddingTop: "var(--space-page-top)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div style={{ maxWidth: "800px" }}>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              opacity: 0.65,
              marginBottom: "16px",
            }}
          >
            {formatDate(event.date)}
          </p>

          <h1
            className="font-heading"
            style={{
              color: "var(--color-nav-text)",
              fontSize: "clamp(28px, 4vw, 52px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: event.standfirst ? "24px" : "0",
            }}
          >
            {event.title}
          </h1>

          {event.standfirst && (
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-nav-text)",
                fontSize: "clamp(16px, 1.4vw, 18px)",
                lineHeight: 1.75,
                opacity: 0.78,
                maxWidth: "620px",
              }}
            >
              {event.standfirst}
            </p>
          )}
        </div>
      </section>

      {/* Hero image */}
      {event.heroImage && (
        <div
          className="relative w-full"
          style={{ height: "clamp(280px, 42vw, 520px)" }}
        >
          <Image
            src={event.heroImage}
            alt={event.title}
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      )}

      {/* Writeup prose */}
      {event.writeup && (
        <section
          style={{
            paddingTop: "clamp(48px, 6vw, 80px)",
            paddingBottom: "clamp(48px, 6vw, 80px)",
            paddingLeft: "var(--space-section-x)",
            paddingRight: "var(--space-section-x)",
          }}
        >
          <div style={{ maxWidth: "720px" }}>
            {event.writeup.split("\n\n").filter(Boolean).map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-text-dark)",
                  fontSize: "17px",
                  lineHeight: 1.9,
                  opacity: 0.82,
                  marginBottom: "24px",
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Photo gallery */}
      {event.gallery && event.gallery.length > 0 && (
        <section
          style={{
            backgroundColor: "#0D0101",
            paddingTop: "clamp(48px, 6vw, 72px)",
            paddingBottom: "clamp(48px, 6vw, 72px)",
            paddingLeft: "var(--space-section-x)",
            paddingRight: "var(--space-section-x)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.45,
              display: "block",
              marginBottom: "24px",
            }}
          >
            Photo Gallery
          </span>
          <EventGallery photos={event.gallery} eventTitle={event.title} />
        </section>
      )}

    </div>
  );
}
