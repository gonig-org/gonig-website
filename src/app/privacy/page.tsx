import LegalPageLayout, {
  LegalSection,
  LegalParagraph,
} from "@/components/shared/LegalPageLayout";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="February 2026">

      <LegalParagraph>
        This policy sets out how the Guild of Organists of Nigeria collects,
        uses, and protects the personal information you provide to us. We
        collect only what we need and hold it only for as long as necessary.
        Your information is never sold.
      </LegalParagraph>

      <LegalSection heading="1. Information We Collect">
        <LegalParagraph>
          When you apply for membership, register for an event, or contact us
          directly, we collect your name, email address, phone number, and any
          professional details relevant to your application. We also collect
          basic, anonymised site usage data to help us understand how the
          website is being used. This data is not tied to any individual.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="2. How We Use Your Information">
        <LegalParagraph>
          Your information is used to process membership applications, respond
          to enquiries, send Guild communications such as event notices and
          newsletters, and administer our programmes. We do not send
          unsolicited commercial messages. You may withdraw from Guild
          communications at any time by writing to us directly.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="3. Sharing Your Information">
        <LegalParagraph>
          We do not share your personal information with third parties except
          where the law requires it, or where you have explicitly requested a
          service that involves a third party, such as payment processing.
          Where third parties are involved, they are bound to handle your data
          responsibly and in accordance with applicable law.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="4. Data Retention">
        <LegalParagraph>
          We keep your personal information for as long as your membership is
          active and for a reasonable period afterwards to meet any legal or
          administrative obligations. You may request deletion of your data at
          any time by writing to us at the address below.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="5. Your Rights">
        <LegalParagraph>
          You have the right to access the information we hold about you, to
          request corrections, and to request that it be deleted. You may also
          withdraw consent to communications at any time. Write to us directly
          and we will respond promptly.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="6. Security">
        <LegalParagraph>
          We take reasonable steps to protect your personal information from
          unauthorised access or misuse. No method of transmission over the
          internet is entirely secure, and we cannot guarantee absolute
          security, but we take this responsibility seriously.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="7. Contact">
        <LegalParagraph>
          For any questions or requests relating to this policy, write to us
          at{" "}
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
