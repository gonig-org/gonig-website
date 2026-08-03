import type { Metadata } from "next";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply for Membership",
  description:
    "Apply to join the Guild of Organists of Nigeria. Membership is open to organists, choirmasters, and church musicians across Nigeria and the diaspora.",
};

export default function ApplyPage() {
  return <ApplyForm />;
}
