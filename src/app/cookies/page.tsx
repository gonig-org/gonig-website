import Link from "next/link";

export default function CookiePolicy() {
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
          <span style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "11px", letterSpacing: "0.1em", opacity: 0.85, textTransform: "uppercase" }}>Cookie Policy</span>
        </div>

        <div style={{ width: "32px", height: "2px", backgroundColor: "#380101", opacity: 0.4, marginBottom: "24px" }} />
        <h1 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          Cookie Policy
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
            This Cookie Policy explains what cookies are, how the Guild of Organists of Nigeria uses them on this website, and what choices you have regarding their use. We keep our use of cookies minimal and purposeful.
          </p>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              1. What Are Cookies
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              Cookies are small text files placed on your device when you visit a website. They are widely used to make websites function properly, remember your preferences, and provide information to site owners about how their site is being used. Cookies do not give us access to your device or any information beyond what you choose to share with us.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              2. How We Use Cookies
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              We use a small number of essential cookies to ensure the website functions correctly — for example, to maintain your session when you are logged into a member area. We may also use anonymised analytics cookies to understand how visitors navigate the site, so we can improve it over time. We do not use advertising or tracking cookies, and we do not share cookie data with third-party advertisers.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              3. Types of Cookies We Use
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", fontWeight: 600, letterSpacing: "-0.01em", opacity: 0.85 }}>
                  Essential Cookies
                </p>
                <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
                  These are necessary for the website to function and cannot be switched off. They are typically set in response to actions you take, such as logging in or filling in a form.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", fontWeight: 600, letterSpacing: "-0.01em", opacity: 0.85 }}>
                  Analytics Cookies
                </p>
                <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
                  These help us understand how visitors interact with our website. All data collected is anonymised. You may opt out of analytics cookies by adjusting your browser settings.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              4. Managing Cookies
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              Most browsers allow you to control cookies through their settings. You can choose to block or delete cookies at any time. Please be aware that blocking essential cookies may affect the functionality of certain parts of this website. Instructions for managing cookies can be found in your browser&apos;s help documentation.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              5. Changes to This Policy
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              We may update this Cookie Policy from time to time to reflect changes in technology or legislation. When we do, the revised date at the top of this page will be updated accordingly.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 style={{ fontFamily: "var(--font-playfair)", color: "#1a0000", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              6. Contact
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#1a0000", fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.9, letterSpacing: "-0.01em", opacity: 0.75 }}>
              If you have any questions about how we use cookies, please contact us at{" "}
              <a href="mailto:gonig@gmail.com" style={{ color: "#380101", textDecoration: "underline", textUnderlineOffset: "3px" }}>gonig@gmail.com</a>.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}