import type { Metadata } from "next";
import {
  CONTACT_EMAIL,
  CONTACT_PHONES,
  CONTACT_ADDRESS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Guild of Organists of Nigeria — membership, events, and general enquiries.",
};

/**
 * Contact page.
 *
 * Institutional register-style layout — direct contact details
 * with guidance on who to reach for different enquiry types.
 * No contact form: the Guild is a professional body, not a
 * web service.
 */

const ENQUIRY_TYPES = [
  {
    subject: "Membership",
    detail:
      "Applications, renewals, membership status, and member benefits.",
  },
  {
    subject: "Education and Training",
    detail:
      "Programmes, workshops, mentorship, and study resources.",
  },
  {
    subject: "Events and Performances",
    detail:
      "Conference, competitions, recitals, and calendar enquiries.",
  },
  {
    subject: "Media and Press",
    detail:
      "Interview requests, press releases, and media partnerships.",
  },
  {
    subject: "General Enquiries",
    detail:
      "Anything else — the Secretariat will direct your message to the appropriate officer.",
  },
];

export default function Contact() {
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
            Guild of Organists of Nigeria
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
            Contact Us
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
            Reach the Guild Secretariat directly. All enquiries are handled by
            the national office and directed to the appropriate officer.
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
        <div
          className="grid grid-cols-1 lg:grid-cols-12"
          style={{ maxWidth: "960px", gap: "clamp(32px, 4vw, 56px)" }}
        >

          {/* Left — Secretariat details */}
          <div className="lg:col-span-5">
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E0D0",
                borderTop: "3px solid var(--color-navbar)",
              }}
            >
              {/* Section label */}
              <div
                style={{
                  padding: "16px clamp(24px, 3vw, 36px)",
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
                  Secretariat
                </span>
              </div>

              {/* Address */}
              <div
                style={{
                  padding: "clamp(24px, 3vw, 36px)",
                  borderBottom: "1px solid #E8E0D0",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "var(--color-navbar)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                    opacity: 0.6,
                  }}
                >
                  Address
                </p>
                <address
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "var(--color-text-dark)",
                    fontSize: "16px",
                    lineHeight: 1.85,
                    fontStyle: "normal",
                    opacity: 0.85,
                  }}
                >
                  {CONTACT_ADDRESS.line1}
                  <br />
                  {CONTACT_ADDRESS.line2}
                </address>
              </div>

              {/* Email */}
              <div
                style={{
                  padding: "clamp(24px, 3vw, 36px)",
                  borderBottom: "1px solid #E8E0D0",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "var(--color-navbar)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                    opacity: 0.6,
                  }}
                >
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "var(--color-text-dark)",
                    fontSize: "16px",
                    lineHeight: 1.5,
                    textDecoration: "none",
                    opacity: 0.85,
                  }}
                  className="hover:opacity-100 transition-opacity"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>

              {/* Phone */}
              <div
                style={{
                  padding: "clamp(24px, 3vw, 36px)",
                  borderBottom: "1px solid #E8E0D0",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "var(--color-navbar)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                    opacity: 0.6,
                  }}
                >
                  Phone
                </p>
                <div className="flex flex-col gap-2">
                  {CONTACT_PHONES.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        color: "var(--color-text-dark)",
                        fontSize: "16px",
                        lineHeight: 1.5,
                        textDecoration: "none",
                        opacity: 0.85,
                      }}
                      className="hover:opacity-100 transition-opacity"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              {/* Response note */}
              <div style={{ padding: "clamp(24px, 3vw, 36px)" }}>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "var(--color-text-dark)",
                    fontSize: "15px",
                    lineHeight: 1.85,
                    opacity: 0.7,
                  }}
                >
                  The Secretariat responds to all enquiries within five working
                  days. For urgent matters, telephone contact is recommended.
                </p>
              </div>
            </div>
          </div>

          {/* Right — Enquiry guidance */}
          <div className="lg:col-span-7">
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E0D0",
                borderTop: "3px solid var(--color-navbar)",
              }}
            >
              {/* Section label */}
              <div
                style={{
                  padding: "16px clamp(24px, 3vw, 36px)",
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
                  Enquiry Types
                </span>
              </div>

              {/* Enquiry list */}
              {ENQUIRY_TYPES.map((item, index) => {
                const isLast = index === ENQUIRY_TYPES.length - 1;
                return (
                  <div
                    key={item.subject}
                    className="flex items-start gap-4"
                    style={{
                      padding: "clamp(20px, 2.5vw, 28px) clamp(24px, 3vw, 36px)",
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
                        paddingTop: "3px",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-1">
                      <p
                        className="font-heading"
                        style={{
                          color: "var(--color-text-dark)",
                          fontSize: "clamp(17px, 1.8vw, 20px)",
                          lineHeight: 1.2,
                        }}
                      >
                        {item.subject}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          color: "var(--color-text-dark)",
                          fontSize: "15px",
                          lineHeight: 1.75,
                          opacity: 0.7,
                        }}
                      >
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
