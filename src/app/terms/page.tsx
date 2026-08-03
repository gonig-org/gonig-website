import type { Metadata } from "next";
import LegalPageLayout, {
  LegalSection,
  LegalParagraph,
} from "@/components/shared/LegalPageLayout";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the Guild of Organists of Nigeria website and services.",
};

export default function TermsOfService() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="February 2026">

      <LegalParagraph>
        These terms govern your use of this website and the Guild of Organists
        of Nigeria&apos;s membership services. By accessing this site or
        registering as a member, you agree to them.
      </LegalParagraph>

      <LegalSection heading="1. Who We Are">
        <LegalParagraph>
          The Guild of Organists of Nigeria (GONiG) is a registered
          professional body dedicated to the promotion and advancement of organ
          music across Nigeria and among Nigerians in the diaspora. Our
          registered office is in Lagos, Nigeria. References to &quot;the
          Guild&quot;, &quot;we&quot;, or &quot;our&quot; throughout these
          terms refer to GONiG.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="2. Use of This Website">
        <LegalParagraph>
          This website is for individuals with a genuine interest in organ
          music, Guild membership, and related educational resources. You agree
          to use it only for lawful purposes and in a way that does not
          infringe the rights of others. Unauthorised access, introduction of
          malicious code, and automated scraping of content are not permitted.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="3. Membership">
        <LegalParagraph>
          Membership is open to organists, students, and supporters of organ
          music across Nigeria and internationally. All applications are
          subject to review and approval by the Guild, and to payment of
          applicable dues. Members are expected to conduct themselves with
          integrity and in a manner consistent with the Guild&apos;s values.
          The Guild reserves the right to suspend or revoke membership where
          conduct falls short of these standards.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="4. Intellectual Property">
        <LegalParagraph>
          All content on this website, including text, imagery, logos, and
          design, is the property of the Guild of Organists of Nigeria or its
          licensors. You may not reproduce or use any content from this site
          for commercial purposes without prior written permission. Personal,
          non-commercial use is permitted provided the Guild is credited.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="5. Limitation of Liability">
        <LegalParagraph>
          We make every reasonable effort to keep the information on this
          website accurate, but we cannot guarantee it is always complete or
          current. We accept no liability for loss or inconvenience arising
          from reliance on information published here. Links to third-party
          websites are provided for convenience only. We are not responsible
          for their content or practices.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="6. Changes to These Terms">
        <LegalParagraph>
          These terms may be updated from time to time. The date at the top of
          this page will reflect the most recent revision. Continued use of
          the website following any changes constitutes acceptance of the
          revised terms.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="7. Contact">
        <LegalParagraph>
          Questions about these terms can be directed to us at{" "}
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
