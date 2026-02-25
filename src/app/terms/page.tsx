import Link from "next/link";

export default function TermsOfService() {
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-3" style={{ marginBottom: "40px" }}>
          <Link href="/" style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "11px", letterSpacing: "0.1em", opacity: 0.4, textTransform: "uppercase" }}>Home</Link>
          <span style={{ color: "#1a0000", opacity: 0.2, fontSize: "11px" }}>/</span>
          <span style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "11px", letterSpacing: "0.1em", opacity: 0.85, textTransform: "uppercase" }}>Terms of Service</span>
        </div>

        <div style={{ width: "32px", height: "2px", backgroundColor: "#380101", opacity: 0.4, marginBottom: "24px" }} />
        <h1 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          Terms of Service
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

          {/* Intro */}
          <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
            These Terms of Service govern your use of the Guild of Organists of Nigeria&apos;s website and membership services. By accessing our website or registering as a member, you agree to be bound by these terms. Please read them carefully — they are written to be straightforward, not to obscure your rights.
          </p>

          {/* Section */}
          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              1. Who We Are
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              The Guild of Organists of Nigeria (GONiG) is a registered professional body dedicated to the promotion and advancement of organ music across Nigeria and among Nigerians in the diaspora. Our registered office is located in Lagos, Nigeria. References to &quot;the Guild&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot; throughout these terms refer to GONiG.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              2. Use of This Website
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              This website is intended for individuals with a genuine interest in organ music, Guild membership, and related educational resources. You agree to use this site only for lawful purposes and in a manner that does not infringe the rights of others. You must not attempt to gain unauthorised access to any part of this website, introduce malicious code, or use automated tools to extract content without our written consent.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              3. Membership
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              Membership of the Guild is open to organists, organ students, and supporters of organ music across Nigeria and internationally. Membership is subject to approval by the Guild and payment of applicable dues. Members are expected to conduct themselves with integrity and in a manner befitting the Guild&apos;s values. The Guild reserves the right to suspend or revoke membership where conduct falls short of these standards.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              4. Intellectual Property
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              All content on this website — including text, imagery, logos, and design — is the property of the Guild of Organists of Nigeria or its licensors. You may not reproduce, distribute, or use any content from this site for commercial purposes without our prior written permission. Limited personal and non-commercial use is permitted provided the Guild is credited.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              5. Limitation of Liability
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              The Guild makes every reasonable effort to ensure the accuracy of information published on this website, but we cannot guarantee it is always complete or current. We accept no liability for any loss or inconvenience arising from reliance on information on this site. Links to third-party websites are provided for convenience only — we are not responsible for their content or practices.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              6. Changes to These Terms
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              We may update these terms from time to time. When we do, the revised date at the top of this page will be updated. Continued use of the website following any changes constitutes your acceptance of the new terms.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              7. Contact
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              If you have questions about these terms, please write to us at{" "}
              <a href="mailto:gonig@gmail.com" style={{ color: "#380101", textDecoration: "underline", textUnderlineOffset: "3px" }}>gonig@gmail.com</a>.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}