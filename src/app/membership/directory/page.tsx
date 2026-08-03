import type { Metadata } from "next";
import { getMembersDirectory } from "@/sanity/lib/queries";
import MemberSearch from "./MemberSearch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Member Directory",
  description: "Search the register of current and past members of the Guild of Organists of Nigeria.",
};

export default async function MemberDirectoryPage() {
  const members = await getMembersDirectory();

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>

      {/* ================================================================
       *  HEADER BAND
       * ================================================================ */}
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
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.65,
              display: "block",
              marginBottom: "16px",
            }}
          >
            Membership
          </span>
          <h1
            className="font-heading"
            style={{
              color: "var(--color-nav-text)",
              fontSize: "clamp(36px, 4.5vw, 56px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Member Directory
          </h1>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-nav-text)",
              fontSize: "17px",
              lineHeight: 1.8,
              opacity: 0.7,
              maxWidth: "560px",
            }}
          >
            A register of the Guild&apos;s current and past members.
          </p>
        </div>
      </section>

      {/* Search + directory rows — client component owns filter state */}
      <MemberSearch members={members} />

    </div>
  );
}
