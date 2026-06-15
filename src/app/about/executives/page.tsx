import Image from "next/image";

/**
 * National Executives page.
 *
 * Layout: maroon header band, then each executive in a full-width row —
 * image/monogram left, name and bio right. Stacks to single column on mobile.
 *
 * Images: each executive has an `image` field. Set it to a file path once
 * photos are available. When null, the monogram placeholder renders instead.
 *
 * Deceased members: set `inMemoriam: true` — their entry renders with a
 * subtle "In Memoriam" note beneath the name. No other visual change.
 */

type Executive = {
  name: string;
  postnominals?: string;
  bio: string;
  image: string | null;
  inMemoriam?: boolean;
};

const EXECUTIVES: Executive[] = [
  {
    name: "Dr. Toyin Samuel Ajose",
    image: null,
    bio: "Toyin Samuel Ajose is a lecturer and the immediate past Head of Department of Music, University of Ibadan. He possesses a broad range of experience in choral directing and organ musicianship. As the Director of Music at the Chapel of the Resurrection, University of Ibadan, he coordinates various organ music programmes including periodic organ recitals and manages a pool of young organists under the Chapel Organ Scholar initiative, in collaboration with the Department of Music. He has participated in organ playing development programmes organised by ABRSM London and Viscount SPA Italy. A member from inception, Samuel Ajose has always been committed to contributing meaningfully to the advancement of the Guild by facilitating collegiate, professional, artistic, and educational activities in pursuance of its objectives.",
  },
  {
    name: "Olugbemi Muyiwa Okunnuga",
    image: null,
    bio: "Born into the musical family of Ven. Dr B.O. Okunnuga (rtd), Gbemi holds church music in high esteem. He is an Associate of the Royal Schools of Music and holds an Associate Diploma (Organ Major) from the Musical Society of Nigeria. Whilst studying Zoology at the University of Ibadan, he served as accompanist of the Students' Chorale Ensemble and Assistant Organist at the Cathedral of St. David, Kudeti, and later St. James' The Great Cathedral, Oke-Bola, Ibadan. He is currently the Organist at Good News Baptist Church, Surulere, Lagos, where he has served for fifteen years. He has been the recording scribe to the Guild of Organists of Nigeria since its inception and is passionate about educational training and skill acquisition for budding organists. His marriage to Sedode, an organist, choirmistress, and fellow Guild member, is blessed with children.",
  },
  {
    name: "Babatunde Olurombi",
    image: null,
    bio: "Tunde Olurombi has been a chorister for over three and a half decades, holding several elective positions and currently assisting with the playing of the organ at Hoares Memorial Methodist Cathedral, Yaba, Lagos. He holds a B.Eng. (Hons) in Electrical Engineering from the University of Ilorin and an MBA from Obafemi Awolowo University, Ile-Ife, in addition to several professional certifications and training undertaken locally and internationally. He is married to Tolulope Olurombi and the marriage is blessed with children.",
  },
  {
    name: "Samuel Abiodun Ojo",
    image: null,
    bio: "Abiodun Ojo has played an active role in the Nigerian church music scene for over two decades. A graduate of Mass Communication, he has functioned as organist, choir director, and church music consultant to various denominations across Nigeria. He is presently the Music Director and Choirmaster at Hoare's Memorial Methodist Cathedral, Sabo, Yaba, Lagos. He is married to Abimbola Ojo and the marriage is blessed with two children.",
  },
  {
    name: "Engr. Wilcox Abbey",
    image: null,
    bio: "Engr. Wilcox Abbey is the Diocesan Music Director and Choirmaster of Evo Diocese, and Chief Organist of All Saints Cathedral Church, Evo Diocese, Rivers State. He holds a Bachelor of Technology in Electrical and Electronics Engineering and works with the Shell Petroleum Development Company (SPDC), with experience spanning oil and gas facilities and construction, drilling and completions, production operations, business planning, and corporate governance.",
  },
  {
    name: "Dr. Adeolu Samuel Akeredolu",
    image: null,
    bio: "Dr. Adeolu Samuel Akeredolu was born in Ibadan into a Christ Apostolic Church family. He received his primary and secondary education in Ibadan before attending Ladoke Akintola University of Technology, where he obtained an MBBS. He holds further postgraduate qualifications from Obafemi Awolowo University, the National Open University of Nigeria, and the National Postgraduate Medical College. He currently works at Osun State University. His musical formation was shaped under the tutelage of several distinguished practitioners including the late Mr Kayode Oni (FTCL), the late Pa Olaolu Omideyi (FRCO), and others. Dr. Akeredolu served as cathedral organist at St. Peter's Anglican Cathedral, Aremo, where he played a three-manual pipe organ for seven years, and is currently among the organists at All Souls Anglican Church, Osogbo. He is also the CEO of Clarion Multimedia Studio, which specialises in live multichannel audio, multicamera concert recording, organ and piano recital recording, live streaming, and sheet music and hymnal publishing.",
  },
  {
    name: "Olusegun Stanley Akinfenwa",
    image: null,
    bio: "Segun Akinfenwa is a founding member of the Guild of Organists of Nigeria and also holds membership of the RSCM and RCO, UK. A graduate of the University of Ibadan, he holds ABRSM and ICMP certifications. After serving as Organist and Choirmaster in Nigeria, he is currently Teacher of Musical Instruments and Theory of Music at St. Crispin's Grammar School, Leicester City, UK, and Organist at St. Michael's Church, C.O.E., Waddington, Lincolnshire.",
  },
];

/** Renders the person's initials when no photo is available */
function Monogram({ name }: { name: string }) {
  const initials = name
    .replace(/^(Dr\.|Engr\.|Rev\.|Prof\.)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
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

export default function NationalExecutives() {
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
            National Executives
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
            The elected officers responsible for the administration and
            advancement of the Guild of Organists of Nigeria.
          </p>
        </div>
      </section>

      {/* Executives list */}
      <section
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        <div className="flex flex-col" style={{ maxWidth: "960px", gap: 0 }}>
          {EXECUTIVES.map((exec, index) => (
            <div
              key={exec.name}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E0D0",
                borderTop: index === 0 ? "3px solid var(--color-navbar)" : "none",
                padding: "clamp(28px, 4vw, 44px)",
                marginBottom: "1px",
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
                  {exec.image ? (
                    <Image
                      src={exec.image}
                      alt={exec.name}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <Monogram name={exec.name} />
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
                    {exec.name}
                  </h2>

                  {exec.inMemoriam && (
                    <p
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        color: "var(--color-navbar)",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        opacity: 0.65,
                        fontStyle: "italic",
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
                  {exec.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
