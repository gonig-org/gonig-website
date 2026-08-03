import EducationHeader from "@/components/education/EducationHeader";

export default function Programmes() {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <EducationHeader
        title="Programmes"
        standfirst="Promoting excellence in organ playing, choral conducting, and sacred music through performance and educational outreach."
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
            Our programmes promote excellence in organ playing, choral
            conducting, and sacred music through recitals, concerts, festivals,
            competitions, and educational outreach. We create opportunities for
            musicians to develop their artistry, engage with diverse audiences,
            and celebrate the rich tradition and evolving role of organ and
            choral music in society.
          </p>
        </div>
      </section>

      {/* PDF download CTA */}
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
            The 2026 National Programmes schedule is available to download below.
          </p>
          <a
            href="/images/documents/gonig-programmes-for-2026.pdf"
            download
            className="font-nav inline-flex items-center justify-center hover:opacity-85 transition-opacity"
            style={{
              backgroundColor: "var(--color-navbar)",
              color: "var(--color-nav-text)",
              padding: "18px 36px",
              fontSize: "13px",
              letterSpacing: "0.1em",
            }}
          >
            Download 2026 National Programmes
          </a>
        </div>
      </section>
    </div>
  );
}
