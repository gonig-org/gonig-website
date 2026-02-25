import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div style={{ backgroundColor: "#F7E5C2" }}>

      {/* Page Entry */}
      <section
        style={{
          paddingTop: "clamp(120px, 14vw, 180px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
          paddingLeft: "clamp(24px, 5vw, 72px)",
          paddingRight: "clamp(24px, 5vw, 72px)",
          borderBottom: "1px solid rgba(56,1,1,0.1)",
        }}
      >
        <div className="flex items-center gap-3" style={{ marginBottom: "40px" }}>
          <Link href="/" style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "11px", letterSpacing: "0.1em", opacity: 0.4, textTransform: "uppercase" }}>Home</Link>
          <span style={{ color: "#1a0000", opacity: 0.2, fontSize: "11px" }}>/</span>
          <span style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "11px", letterSpacing: "0.1em", opacity: 0.85, textTransform: "uppercase" }}>Privacy Policy</span>
        </div>

        <div style={{ width: "32px", height: "2px", backgroundColor: "#380101", opacity: 0.4, marginBottom: "24px" }} />
        <h1 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          Privacy Policy
        </h1>
        <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "13px", opacity: 0.5, marginTop: "16px", letterSpacing: "-0.01em" }}>
          Last updated: February 2026
        </p>
      </section>

      {/* Content */}
      <section
        style={{
          paddingTop: "clamp(48px, 6vw, 96px)",
          paddingBottom: "clamp(64px, 8vw, 120px)",
          paddingLeft: "clamp(24px, 5vw, 72px)",
          paddingRight: "clamp(24px, 5vw, 72px)",
        }}
      >
        <div style={{ maxWidth: "720px" }} className="flex flex-col gap-12">

          <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
            The Guild of Organists of Nigeria takes your privacy seriously. This policy explains what personal information we collect, why we collect it, and how we handle it. We do not sell your data, and we never will.
          </p>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              1. Information We Collect
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              When you register interest in membership, apply to join, or contact us, we may collect your name, email address, phone number, and details about your musical background. We also collect basic analytics data — such as pages visited and time spent on the site — to help us improve the experience for all visitors. This data is anonymised and never tied to individuals.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              2. How We Use Your Information
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              We use your information solely to manage your membership, respond to enquiries, send relevant Guild communications such as event notices and newsletters, and administer our programmes. We will never send you unsolicited commercial messages, and you can unsubscribe from Guild communications at any time by contacting us directly.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              3. Sharing Your Information
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              We do not share your personal information with third parties except where required by law, or where necessary to deliver a service you have explicitly requested — such as processing a membership payment through a third-party provider. Any third parties we work with are required to handle your data responsibly and in accordance with applicable law.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              4. Data Retention
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              We retain your personal information for as long as your membership is active and for a reasonable period thereafter, in order to fulfil any legal or administrative obligations. If you would like your data deleted, you may request this at any time by writing to us at the contact below.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              5. Your Rights
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              You have the right to access the personal information we hold about you, to request corrections, and to request deletion. You also have the right to withdraw consent to communications at any time. To exercise any of these rights, please contact us directly — we will respond within a reasonable timeframe.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              6. Security
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              We take reasonable technical and organisational measures to protect your personal information from unauthorised access, loss, or misuse. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              7. Contact
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              For any privacy-related questions or requests, please contact us at{" "}
              <a href="mailto:gonig@gmail.com" style={{ color: "#380101", textDecoration: "underline", textUnderlineOffset: "3px" }}>gonig@gmail.com</a>.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}