/**
 * Board of Advisers page.
 *
 * No bios are available for this board, so the page renders as a
 * formal register — names listed on ruled lines in two columns on
 * desktop, single column on mobile. Clean and deliberate, not sparse.
 *
 * When bios or images become available, convert to the executives
 * card layout used in /about/executives.
 */

const ADVISERS = [
  { name: "Mr. Ibiyefiebo Harry" },
  { name: "Mr. Oluwamuyiwa Akinmejiwa" },
  { name: "Dr. Segun Fadeyi" },
  { name: "Mr. Akin Olubi" },
  { name: "Engr. Babajide Idowu" },
  { name: "Dr. Dayo Oyedun" },
  { name: "Mr. Theophilus Okang" },
  { name: "Prof. Soji Adejumo" },
  { name: "Revd. Canon Bola Omodun Ilori" },
];

export default function BoardOfAdvisers() {
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
            About the Guild
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
            Board of Advisers
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
            Distinguished individuals whose counsel and experience guide the
            Guild's direction and long-term vision.
          </p>
        </div>
      </section>

      {/* Register */}
      <section
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E8E0D0",
            borderTop: "3px solid var(--color-navbar)",
          }}
        >
          {/* Column headers */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{
              padding: "16px clamp(28px, 4vw, 44px)",
              borderBottom: "1px solid #E8E0D0",
              backgroundColor: "#FAFAF8",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-navbar)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Name
            </span>
          </div>

          {/* Members */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {ADVISERS.map((adviser, index) => {
              const isLastOdd =
                ADVISERS.length % 2 !== 0 && index === ADVISERS.length - 1;
              const isRightColumn = index % 2 !== 0;
              const isLastRow =
                index >= ADVISERS.length - (ADVISERS.length % 2 === 0 ? 2 : 1);

              return (
                <div
                  key={adviser.name}
                  style={{
                    padding: "24px clamp(28px, 4vw, 44px)",
                    borderBottom: isLastRow && !isLastOdd ? "none" : "1px solid #E8E0D0",
                    borderRight: isRightColumn ? "none" : "1px solid #E8E0D0",
                    gridColumn: isLastOdd ? "1 / -1" : undefined,
                  }}
                  className="flex items-center gap-4"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-navbar)",
                      fontSize: "11px",
                      fontWeight: 700,
                      opacity: 0.35,
                      flexShrink: 0,
                      minWidth: "24px",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="font-heading"
                    style={{
                      color: "var(--color-text-dark)",
                      fontSize: "clamp(17px, 1.8vw, 21px)",
                      lineHeight: 1.2,
                    }}
                  >
                    {adviser.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
