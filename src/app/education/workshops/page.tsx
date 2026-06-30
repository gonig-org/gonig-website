import { CONTACT_EMAIL } from "@/lib/constants";
import EducationHeader from "@/components/education/EducationHeader";

export default function Workshops() {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <EducationHeader
        title="Workshops"
        standfirst="Practical, focused sessions designed to sharpen musicianship and deepen knowledge of organ and choral practice."
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
            Details of upcoming workshops will be published here as they are
            confirmed. Please check back soon or contact the Secretariat to
            register your interest.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Workshops Enquiry`}
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
