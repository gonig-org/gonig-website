import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";
import EducationHeader from "@/components/education/EducationHeader";

export const metadata: Metadata = {
  title: "Mentorship",
  description:
    "Nurturing the next generation of organists, choral conductors, and church musicians through structured guidance and peer learning.",
};

export default function Mentorship() {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <EducationHeader
        title="Mentorship"
        standfirst="Nurturing the next generation of organists, choral conductors, and church musicians through structured guidance and peer learning."
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
            }}
          >
            We nurture the next generation of organists, choral conductors, and
            church musicians through structured mentorship, professional
            guidance, and peer learning. Experienced musicians share practical
            knowledge, artistic insight, and leadership skills, helping emerging
            talents grow in confidence, competence, and lifelong commitment to
            musical excellence.
          </p>
        </div>
      </section>

      {/* Mentor CTA */}
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
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-navbar)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "16px",
            }}
          >
            Become a Mentor
          </span>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-text-dark)",
              fontSize: "17px",
              lineHeight: 1.85,
              opacity: 0.75,
              marginBottom: "28px",
            }}
          >
            If you are interested in serving as a mentor, please send us an
            email with your CV. We would be glad to have you on our mentorship
            programme.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Mentorship Programme — Expression of Interest`}
            className="font-nav inline-flex items-center justify-center hover:opacity-85 transition-opacity"
            style={{
              backgroundColor: "var(--color-navbar)",
              color: "var(--color-nav-text)",
              padding: "18px 36px",
              fontSize: "13px",
              letterSpacing: "0.1em",
            }}
          >
            Express Interest by Email
          </a>
        </div>
      </section>
    </div>
  );
}
