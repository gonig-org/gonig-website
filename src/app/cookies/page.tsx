import LegalPageLayout, {
  LegalSection,
  LegalParagraph,
} from "@/components/shared/LegalPageLayout";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function CookiePolicy() {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="February 2026">

      <LegalParagraph>
        This policy explains how the Guild of Organists of Nigeria uses
        cookies on this website. We use them sparingly and only where
        necessary.
      </LegalParagraph>

      <LegalSection heading="1. What Cookies Are">
        <LegalParagraph>
          Cookies are small text files placed on your device when you visit a
          website. They allow the site to remember certain information about
          your visit. They do not give us access to your device and they
          contain no personally identifiable information unless you have
          provided it to us directly.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="2. How We Use Cookies">
        <LegalParagraph>
          We use a small number of essential cookies to keep the website
          functioning correctly, such as maintaining your session if you are
          logged into a member area. We may also use anonymised analytics
          cookies to understand in broad terms how visitors navigate the site,
          so we can improve it. We do not use advertising or tracking cookies
          and we do not share cookie data with third-party advertisers.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="3. Types of Cookies We Use">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-text-dark)",
                fontSize: "16px",
                fontWeight: 700,
                opacity: 0.85,
              }}
            >
              Essential Cookies
            </p>
            <LegalParagraph>
              Required for the website to function. They cannot be switched
              off and are set in response to actions you take, such as logging
              in or submitting a form.
            </LegalParagraph>
          </div>
          <div className="flex flex-col gap-2">
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-text-dark)",
                fontSize: "16px",
                fontWeight: 700,
                opacity: 0.85,
              }}
            >
              Analytics Cookies
            </p>
            <LegalParagraph>
              Help us understand how visitors use the site. All data is
              anonymised. You may opt out at any time through your browser
              settings.
            </LegalParagraph>
          </div>
        </div>
      </LegalSection>

      <LegalSection heading="4. Managing Cookies">
        <LegalParagraph>
          Most browsers allow you to block or delete cookies through their
          settings. Blocking essential cookies may affect how certain parts of
          this website work. Instructions for managing cookies are available in
          your browser&apos;s help documentation.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="5. Changes to This Policy">
        <LegalParagraph>
          This policy may be updated to reflect changes in technology or
          legislation. The date at the top of the page will show when it was
          last revised.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="6. Contact">
        <LegalParagraph>
          Questions about our use of cookies can be sent to{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            style={{
              color: "var(--color-navbar)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            {CONTACT_EMAIL}
          </a>
          .
        </LegalParagraph>
      </LegalSection>

    </LegalPageLayout>
  );
}
