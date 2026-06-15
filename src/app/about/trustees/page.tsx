import Image from "next/image";

/**
 * Board of Trustees page.
 *
 * Two groups rendered differently:
 *
 *   1. Founding trustees — names only, formal register layout (same
 *      pattern as Board of Advisers). Deceased members marked with
 *      "In Memoriam" beneath their name.
 *
 *   2. New appointees — full bio cards with image placeholders
 *      (same pattern as National Executives).
 *
 * Deceased members: set `inMemoriam: true`. The † prefix is omitted
 * from the stored name — the "In Memoriam" note replaces it cleanly.
 */

type FoundingTrustee = {
  name: string;
  inMemoriam?: boolean;
};

type Appointee = {
  name: string;
  image: string | null;
  bio: string;
  inMemoriam?: boolean;
};

const FOUNDING_TRUSTEES: FoundingTrustee[] = [
  { name: "Dr. D.K. Olukoya" },
  { name: "Mr. D.R. Ajayi" },
  { name: "Chief Maria Aseeva" },
  { name: "Deacon Dr. O.A. Dosunmu" },
  { name: "Mrs. Tolu Obajimi" },
  { name: "Sir Emeka Nwokedi" },
  { name: "Chief Dr. M.O.A. Kuti", inMemoriam: true },
  { name: "Mr. James Adekunle", inMemoriam: true },
  { name: "Alabo Dr. C.I.T. Wokoma", inMemoriam: true },
  { name: "Mr. Kayode Oni FTCL", inMemoriam: true },
];

const APPOINTEES: Appointee[] = [
  {
    name: "Sir Brig. Gen. Charles Adisa Bossman (Rtd)",
    image: null,
    bio: "Born in Lafiaji, Lagos Island on 28 January 1963, Charles Adisa Bossman studied at the Universities of Ibadan, Lagos, Lagos State University, and Tai Solarin University, where he obtained bachelor's degrees, postgraduate qualifications, and specialist certificates. He received a Presidential Commission into the Nigerian Army as a Second Lieutenant in 1989, rose through the ranks serving at tactical, operational, and strategic levels across the country, and retired voluntarily in 2021 as a decorated senior officer. His love for organ music began early in life. He was enrolled as a chorister at the Methodist Church of the Trinity, Tinubu, Lagos in 1980 and had the privilege of studying under distinguished organists including Pa Derby Osotuke-Johnson, Kweku Harrison, and the late Kayode Oni. He served as Assistant Organist, Organist, Choirmaster, and Director of Music at various churches across Nigeria through the course of his military postings, and is currently the Choirmaster at the Methodist Church of the Trinity, Tinubu, Lagos. A former member of the MUSON Choir, he now holds Sustainer Membership. He is a foundation member of the Guild of Organists of Nigeria. He is married to Barrister (Mrs) Folashade Bossman and the marriage is blessed with children.",
  },
  {
    name: "Mr. Ebenezer Ekundayo Omole",
    image: null,
    bio: "Ebenezer Ekundayo Omole began his career in church music in 1959 as a chorister at Anglican Church, Irolu-Remo, Ogun State. He joined the Holy Trinity Church, Ebute-Ero Choir in 1972 and had the opportunity to study under the late Pa James Adekunle. He joined the Lagos Musical Society under Pa Christopher Oyesiku in 1974, and by 1979 had joined the Laz Ekwueme National Chorale at the University of Lagos. He began playing the organ in 1968 and held various organist positions in Lagos churches before becoming Organist and Master of the Music at the Cathedral of St. Paul, Sagamu in 1985, where he served until 1990. He then served as Assistant Choirmaster and Organist at Archbishop Vining Memorial Church, Ikeja (1990 to 1994) before being appointed Organist and Choirmaster at St. Jude's Church, Odi-Olowo in 1994, where he continues as Director of Music to date. As a music educator, he contributed to the teaching and development of music in schools at state level and in higher institutions for many years, including as a teacher on LTV's Teaching Music programme in 1979 and 1980. He was appointed Head of Music and Music Education by the Lagos State Ministry of Education from 1990 to 2008 and was a pioneer teacher at MUSON School of Music, where he taught Piano, Voice, and Theory of Music from 1991 to 2019. He holds a BA in Music Performance and Composition, an MA in Music Composition and Musicology, and an MA in Creative Arts and Music Theory.",
  },
  {
    name: "Sir Engr. Tamunobubelebara Poloamina",
    image: null,
    bio: "Sir Obele, as he is popularly known, hails from Okrika in Rivers State and has been a registered member of the Guild of Organists of Nigeria since 2012. Following the death of Alabo Dr. C.I.T. Wokoma in January 2020, Sir Obele championed and successfully coordinated the inauguration of the South-South Zone of the Guild in October 2020 at St. Andrew's Anglican Church, Rumuobiakani Deanery, in a service officiated by the Rt. Revd. Innocent U. Odu, Bishop of the Diocese of Evo. Over sixty organists and choirmasters were inducted on the occasion. Sir Obele was elected pioneer Vice President of the South-South Zone and subsequently handed over to his successor upon his relocation from the zone. He is currently the Music Director of the Anglican Missionary Congregations (AMC) England and Ireland, headquartered in Manchester, United Kingdom. He is married and blessed with four children.",
  },
  {
    name: "Rev. Emmanuel Oluyemi Akinpelu",
    image: null,
    bio: "Rev. Yemi Akinpelu's introduction to music began as a choirboy at Comprehensive High School, Aiyetoro, Egbado (1970 to 1974), under the tutelage of the late Chief M.A.O. Kuti, whose musical mentorship inspired him to pursue music as a vocation. He is a graduate of Music who majored in Performance (Piano) for his first degree. He lectured in the Department of Music at Alvan Ikoku College of Education, Owerri (1985 to 1986) and Osun State College of Education, Ilesa (1986 to 1996), before moving to the International School, University of Lagos as Head of Music, where he served until retirement from active teaching. He was appointed Organist and Master of the Music at Holy Trinity Anglican Church, Ilesa (1986 to 1991) and is the Choirmaster-General for the Blood of Jesus Apostolic Church International. He currently serves as Chief Examiner and Chairman of the Body of Music Examiners for both WAEC and NECO in Nigeria. He is a church music composer and arranger, married to Deaconess Ayomikun Oluwatoyin Akinpelu, and the marriage is blessed with two children.",
  },
];

function Monogram({ name }: { name: string }) {
  const initials = name
    .replace(/^(Dr\.|Engr\.|Rev\.|Prof\.|Sir|Mr\.|Mrs\.|Chief|Deacon|Alabo|Brig\.|Gen\.)\s*/gi, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "var(--color-surface-light)",
        border: "1px solid #E8E0D0",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-playfair)",
          color: "var(--color-navbar)",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 400,
          letterSpacing: "0.05em",
          opacity: 0.5,
        }}
      >
        {initials}
      </span>
    </div>
  );
}

export default function BoardOfTrustees() {
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
            Board of Trustees
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
            The custodians of the Guild's values, assets, and long-term
            institutional integrity.
          </p>
        </div>
      </section>

      <div
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >

        {/* ── Founding Trustees — register ── */}
        <div style={{ maxWidth: "960px", marginBottom: "clamp(56px, 7vw, 96px)" }}>
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-navbar)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "20px",
            }}
          >
            Trustees
          </span>

          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E8E0D0",
              borderTop: "3px solid var(--color-navbar)",
            }}
          >
            {FOUNDING_TRUSTEES.map((trustee, index) => {
              const isLast = index === FOUNDING_TRUSTEES.length - 1;
              return (
                <div
                  key={trustee.name}
                  className="flex items-start gap-4"
                  style={{
                    padding: "20px clamp(24px, 4vw, 40px)",
                    borderBottom: isLast ? "none" : "1px solid #E8E0D0",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-navbar)",
                      fontSize: "11px",
                      fontWeight: 700,
                      opacity: 0.3,
                      flexShrink: 0,
                      minWidth: "24px",
                      paddingTop: "4px",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p
                      className="font-heading"
                      style={{
                        color: "var(--color-text-dark)",
                        fontSize: "clamp(17px, 1.8vw, 21px)",
                        lineHeight: 1.2,
                      }}
                    >
                      {trustee.name}
                    </p>
                    {trustee.inMemoriam && (
                      <p
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          color: "var(--color-navbar)",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          fontStyle: "italic",
                          opacity: 0.6,
                        }}
                      >
                        In Memoriam
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── New Appointees — bio cards ── */}
        <div style={{ maxWidth: "960px" }}>
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-navbar)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "20px",
            }}
          >
            New Appointees
          </span>

          <div className="flex flex-col" style={{ gap: "1px" }}>
            {APPOINTEES.map((person, index) => (
              <div
                key={person.name}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8E0D0",
                  borderTop: index === 0 ? "3px solid var(--color-navbar)" : "none",
                  padding: "clamp(28px, 4vw, 44px)",
                }}
              >
                {/* Image / Monogram */}
                <div className="lg:col-span-3">
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "180px",
                      aspectRatio: "1 / 1",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {person.image ? (
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <Monogram name={person.name} />
                    )}
                  </div>
                </div>

                {/* Name + bio */}
                <div className="lg:col-span-9 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h2
                      className="font-heading"
                      style={{
                        color: "var(--color-text-dark)",
                        fontSize: "clamp(20px, 2.2vw, 26px)",
                        lineHeight: 1.15,
                      }}
                    >
                      {person.name}
                    </h2>
                    {person.inMemoriam && (
                      <p
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          color: "var(--color-navbar)",
                          fontSize: "12px",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          fontStyle: "italic",
                          opacity: 0.65,
                        }}
                      >
                        In Memoriam
                      </p>
                    )}
                  </div>

                  <div
                    style={{
                      width: "32px",
                      height: "2px",
                      backgroundColor: "var(--color-navbar)",
                      opacity: 0.3,
                    }}
                  />

                  <p
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-text-dark)",
                      fontSize: "16px",
                      lineHeight: 1.85,
                      opacity: 0.72,
                    }}
                  >
                    {person.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
