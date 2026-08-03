import type { Metadata } from "next";
import RenewForm from "./RenewForm";

export const metadata: Metadata = {
  title: "Renew Your Membership",
  description:
    "Renew your Guild of Organists of Nigeria membership. Keep your registration active and continue enjoying full member benefits.",
};

export default function RenewPage() {
  return <RenewForm />;
}
