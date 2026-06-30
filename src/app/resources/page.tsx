/* Replace the VIDEO_ID strings below with the YouTube video IDs from the
 * Guild's channel. The ID is the part after "v=" in a YouTube URL, e.g.
 * https://www.youtube.com/watch?v=dQw4w9WgXcQ → ID is dQw4w9WgXcQ */

type Video = {
  id: string;
  title: string;
  description?: string;
};

const VIDEOS: Video[] = [
  {
    id: "xzRYVk2olFw",
    title: "10th Anniversary of the Guild of Organists of Nigeria",
  },
  {
    id: "Hn9mUwPbp8o",
    title: "Quarterly Meeting and Workshop: Hymn Leadership and Registration",
  },
  {
    // TODO: confirm title with client — YouTube shows generic "Live broadcast"
    id: "k6VmN59kdaA",
    title: "GONiG Live Broadcast",
  },
  {
    // TODO: confirm title with client — YouTube shows generic "Live broadcast"
    id: "yj4RuQBsP8o",
    title: "GONiG Live Broadcast",
  },
];

export default function Resources() {
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
            Resources
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
            Resources
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
            Recordings, documents, and materials from the Guild of Organists
            of Nigeria.
          </p>
        </div>
      </section>

      {/* Video grid */}
      <section
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
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
            display: "block",
            marginBottom: "32px",
          }}
        >
          Recordings
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {VIDEOS.map((video) => (
            <div key={video.id} className="flex flex-col gap-4">

              {/* 16:9 embed */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  backgroundColor: "#0D0101",
                  border: "1px solid #E8E0D0",
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              </div>

              {/* Title + description */}
              <div className="flex flex-col gap-2">
                <h2
                  className="font-heading"
                  style={{
                    color: "var(--color-text-dark)",
                    fontSize: "clamp(17px, 1.6vw, 20px)",
                    lineHeight: 1.25,
                  }}
                >
                  {video.title}
                </h2>
                {video.description && (
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "var(--color-text-dark)",
                      fontSize: "15px",
                      lineHeight: 1.7,
                      opacity: 0.6,
                    }}
                  >
                    {video.description}
                  </p>
                )}
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
