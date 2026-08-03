import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";
import EducationHeader from "@/components/education/EducationHeader";

export const metadata: Metadata = {
  title: "Certification",
  description: "Formal recognition of professional competence for organists and choral conductors in Nigeria.",
};

export default function Certification() {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <EducationHeader
        title="Certification"
        standfirst="Formal recognition of professional competence for organists and choral conductors in Nigeria."
      />

      <section
        style={{
          backgroundColor: "#FFFFFF",
          paddingTop: "clamp(56px, 7vw, 96px)",
          paddingBottom: "clamp(56px, 7vw, 96px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
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
              marginBottom: "40px",
            }}
          >
            Full details of the Guild's certification programme will be
            published here shortly. Please check back soon or contact the
            Secretariat for further information.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Certification Enquiry`}
            className="font-nav inline-flex items-center justify-center hover:opacity-85 transition-opacity"
            style={{
              backgroundColor: "var(--color-navbar)",
              color: "var(--color-nav-text)",
              padding: "18px 36px",
              fontSize: "13px",
              letterSpacing: "0.1em",
            }}
          >
            Contact the Secretariat
          </a>
        </div>
      </section>
    </div>
  );
}
