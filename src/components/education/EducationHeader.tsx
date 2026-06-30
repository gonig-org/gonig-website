type Props = {
  title: string;
  standfirst: string;
};

export default function EducationHeader({ title, standfirst }: Props) {
  return (
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
          Education
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
          {title}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-montserrat)",
            color: "var(--color-nav-text)",
            fontSize: "17px",
            lineHeight: 1.8,
            opacity: 0.7,
            maxWidth: "580px",
          }}
        >
          {standfirst}
        </p>
      </div>
    </section>
  );
}
