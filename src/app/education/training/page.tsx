import Link from "next/link";
import EducationHeader from "@/components/education/EducationHeader";

export default function Training() {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <EducationHeader
        title="Training"
        standfirst="Equipping musicians with the technical, artistic, and leadership skills needed for excellence in organ performance and choral direction."
      />

      <section
        style={{
          backgroundColor: "#FFFFFF",
          paddingTop: "clamp(56px, 7vw, 96px)",
          paddingBottom: "clamp(56px, 7vw, 96px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
          borderBottom: "1px solid #E8E0D0",
        }}
      >
        <div style={{ maxWidth: "760px" }}>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-text-dark)",
              fontSize: "18px",
              lineHeight: 1.9,
              opacity: 0.78,
              marginBottom: "32px",
            }}
          >
            Our training programmes equip musicians with the technical,
            artistic, and leadership skills needed for excellence in organ
            performance and choral direction. Through workshops, masterclasses,
            seminars, and practical sessions, participants strengthen their
            musicianship, expand their knowledge, and maintain the highest
            professional standards.
          </p>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-text-dark)",
              fontSize: "18px",
              lineHeight: 1.9,
              opacity: 0.78,
            }}
          >
            Periodic trainings are organised at the National and Zonal/Chapter
            levels.
          </p>
        </div>
      </section>

      {/* Schedule CTA */}
      <section
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(48px, 6vw, 72px)",
          paddingBottom: "clamp(48px, 6vw, 72px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div style={{ maxWidth: "760px" }}>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-text-dark)",
              fontSize: "16px",
              lineHeight: 1.75,
              opacity: 0.7,
              marginBottom: "28px",
            }}
          >
            See the schedule for our forthcoming training workshops.
          </p>
          <Link
            href="/events/forthcoming"
            className="font-nav inline-flex items-center justify-center hover:opacity-85 transition-opacity"
            style={{
              backgroundColor: "var(--color-navbar)",
              color: "var(--color-nav-text)",
              padding: "18px 36px",
              fontSize: "13px",
              letterSpacing: "0.1em",
            }}
          >
            View Forthcoming Events
          </Link>
        </div>
      </section>
    </div>
  );
}
