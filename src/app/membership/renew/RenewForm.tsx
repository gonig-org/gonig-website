"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        metadata?: Record<string, unknown>;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-montserrat)",
  color: "#1a0000",
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "0.04em",
  display: "block",
  marginBottom: "8px",
  opacity: 0.75,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#FFFFFF",
  border: "1px solid #C8BFB0",
  borderRadius: 0,
  color: "#1a0000",
  fontFamily: "var(--font-montserrat)",
  fontSize: "16px",
  padding: "14px 16px",
  outline: "none",
  transition: "border-color 0.2s",
};

type Step = "lookup" | "form" | "success";

export default function RenewForm() {
  const [step, setStep] = useState<Step>("lookup");

  // Lookup state
  const [membershipNo, setMembershipNo] = useState("");
  const [lookingUp, setLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState("");

  // Confirmed member (from Sanity)
  const [confirmedName, setConfirmedName] = useState("");

  // Form state (filled after lookup)
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    if (!membershipNo.trim()) return;

    setLookingUp(true);
    setLookupError("");

    try {
      const res = await fetch(
        `/api/membership/lookup?membershipNo=${encodeURIComponent(membershipNo.trim())}`
      );
      const data = await res.json();

      if (!res.ok) {
        if (data.error === "not_found") {
          setLookupError(
            "This membership number is not on our records. Please check it carefully, or contact us if you believe this is an error."
          );
        } else {
          setLookupError("Something went wrong. Please try again.");
        }
        return;
      }

      if (data.status === "Active") {
        setLookupError(
          `${data.fullName}'s membership is already active for this period. If you believe this is incorrect, please contact the Guild directly.`
        );
        return;
      }

      setConfirmedName(data.fullName);
      setStep("form");
    } catch {
      setLookupError("Could not reach the server. Please try again.");
    } finally {
      setLookingUp(false);
    }
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setFormError("Please upload a JPEG, PNG, or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFormError("Image must be under 5MB.");
      return;
    }

    setFormError("");
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  async function submitAfterPayment(paystackReference: string) {
    setSubmitting(true);
    setFormError("");

    try {
      let photoUrl = "";
      if (photo) {
        const uploadData = new FormData();
        uploadData.append("file", photo);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "x-upload-secret": process.env.NEXT_PUBLIC_UPLOAD_SECRET ?? "" },
          body: uploadData,
        });
        if (!uploadRes.ok) throw new Error("Failed to upload photo");
        const result = await uploadRes.json();
        photoUrl = result.url;
      }

      const res = await fetch("/api/membership/renew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          membershipNumber: membershipNo.trim().toUpperCase(),
          fullName: confirmedName,
          email,
          phone,
          photoUrl,
          paystackReference,
        }),
      });

      if (!res.ok) throw new Error("Failed to send renewal");

      setStep("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setFormError(
        "Payment was received but we could not send your renewal. Please keep your payment reference and contact us directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) {
      setFormError("Please enter your email address.");
      return;
    }
    if (!phone) {
      setFormError("Please enter your phone number.");
      return;
    }

    setFormError("");

    // Dev bypass
    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      submitAfterPayment(`TEST-RENEW-${Date.now()}`);
      return;
    }

    const ref = `GONIG-REN-${Date.now()}`;
    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email,
      amount: 500000, // ₦5,000 in kobo
      currency: "NGN",
      ref,
      metadata: {
        type: "membership_renewal",
        membership_number: membershipNo.trim().toUpperCase(),
        full_name: confirmedName,
      },
      callback: (response) => {
        submitAfterPayment(response.reference);
      },
      onClose: () => {
        setFormError("Payment was not completed. Please try again.");
      },
    });
    handler.openIframe();
  }

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
            Membership Renewal
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
            Enter your membership number to look up your record, then complete
            payment to renew for the current year.
          </p>
        </div>
      </section>

      {/* Body */}
      <section
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >

        {/* ── Step 1: Lookup ── */}
        {step === "lookup" && (
          <form
            onSubmit={handleLookup}
            className="flex flex-col gap-0"
            style={{ maxWidth: "560px" }}
          >
            <div
              className="flex flex-col gap-6"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E0D0",
                padding: "clamp(28px, 4vw, 44px)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-navbar)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  paddingBottom: "16px",
                  borderBottom: "1px solid #E8E0D0",
                  margin: 0,
                }}
              >
                Verify your membership
              </h2>

              <div>
                <label htmlFor="membershipNo" style={labelStyle}>
                  Membership Number <span style={{ color: "var(--color-navbar)" }}>*</span>
                </label>
                <input
                  id="membershipNo"
                  type="text"
                  required
                  value={membershipNo}
                  onChange={(e) => {
                    setMembershipNo(e.target.value);
                    setLookupError("");
                  }}
                  placeholder="e.g. GON-0051"
                  style={inputStyle}
                  autoComplete="off"
                />
                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "#1a0000",
                    fontSize: "13px",
                    opacity: 0.45,
                    marginTop: "6px",
                    lineHeight: 1.6,
                  }}
                >
                  Your membership number appears on your certificate and any
                  correspondence from the Guild.
                </p>
              </div>

              {lookupError && (
                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "#991B1B",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    padding: "16px 20px",
                    backgroundColor: "#FEF2F2",
                    border: "1px solid #FECACA",
                  }}
                >
                  {lookupError}
                </p>
              )}

              <button
                type="submit"
                disabled={lookingUp || !membershipNo.trim()}
                className="font-nav hover:opacity-85 transition-opacity"
                style={{
                  backgroundColor: "var(--color-navbar)",
                  color: "var(--color-nav-text)",
                  padding: "18px 36px",
                  fontSize: "13px",
                  letterSpacing: "0.12em",
                  border: "none",
                  cursor: lookingUp || !membershipNo.trim() ? "default" : "pointer",
                  opacity: lookingUp || !membershipNo.trim() ? 0.5 : 1,
                  width: "fit-content",
                }}
              >
                {lookingUp ? "Looking up..." : "Look up my record"}
              </button>
            </div>

            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-text-dark)",
                fontSize: "14px",
                lineHeight: 1.75,
                opacity: 0.5,
                marginTop: "20px",
              }}
            >
              Not yet a member?{" "}
              <Link
                href="/membership/apply"
                style={{
                  color: "var(--color-navbar)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Apply for membership
              </Link>
            </p>
          </form>
        )}

        {/* ── Step 2: Form ── */}
        {step === "form" && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-0"
            style={{ maxWidth: "760px" }}
          >
            {/* Confirmed member banner */}
            <div
              style={{
                backgroundColor: "#F0F7F0",
                border: "1px solid #C3DCC3",
                borderBottom: "none",
                padding: "20px clamp(28px, 4vw, 44px)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ fontSize: "18px" }}>✓</span>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "#1a4d1a",
                    fontSize: "15px",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {confirmedName}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "#1a4d1a",
                    fontSize: "13px",
                    opacity: 0.7,
                    margin: "2px 0 0",
                  }}
                >
                  Membership No. {membershipNo.trim().toUpperCase()} — Renewal due
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setStep("lookup"); setFormError(""); }}
                style={{
                  marginLeft: "auto",
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "12px",
                  color: "#1a4d1a",
                  opacity: 0.6,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Not you?
              </button>
            </div>

            {/* Contact details */}
            <div
              className="flex flex-col gap-6"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E0D0",
                borderBottom: "none",
                padding: "clamp(28px, 4vw, 44px)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-navbar)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  paddingBottom: "16px",
                  borderBottom: "1px solid #E8E0D0",
                  margin: 0,
                }}
              >
                Contact Details
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" style={labelStyle}>
                    Email Address <span style={{ color: "var(--color-navbar)" }}>*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" style={labelStyle}>
                    Phone Number <span style={{ color: "var(--color-navbar)" }}>*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={inputStyle}
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Photo — optional for renewal */}
              <div>
                <label style={labelStyle}>
                  Updated Photograph{" "}
                  <span style={{ fontWeight: 400, opacity: 0.55 }}>(optional)</span>
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    width: "100%",
                    border: "1px dashed #C8BFB0",
                    backgroundColor: "#FAFAF8",
                    padding: "24px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  {photoPreview ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "20px", width: "100%" }}>
                      <Image
                        src={photoPreview}
                        alt="Preview"
                        width={80}
                        height={80}
                        style={{ width: "80px", height: "80px", objectFit: "cover", border: "1px solid #E8E0D0" }}
                      />
                      <div>
                        <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "14px", color: "#1a0000", opacity: 0.75 }}>
                          {photo?.name}
                        </p>
                        <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "13px", color: "var(--color-navbar)", marginTop: "4px" }}>
                          Click to change
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "14px", color: "#1a0000", opacity: 0.6 }}>
                        Upload a recent photograph if yours has changed
                      </p>
                      <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "12px", color: "#1a0000", opacity: 0.35 }}>
                        JPEG, PNG, or WebP. Max 5MB.
                      </p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            {/* Submission */}
            <div
              className="flex flex-col gap-5"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E0D0",
                borderTop: "none",
                padding: "clamp(28px, 4vw, 44px)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-text-dark)",
                  fontSize: "14px",
                  lineHeight: 1.75,
                  opacity: 0.5,
                }}
              >
                By submitting this renewal you confirm that the information
                provided is accurate and that you agree to the Guild's{" "}
                <Link
                  href="/terms"
                  style={{
                    color: "var(--color-navbar)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  Terms of Service
                </Link>
                .
              </p>

              {formError && (
                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "#991B1B",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    padding: "16px 20px",
                    backgroundColor: "#FEF2F2",
                    border: "1px solid #FECACA",
                  }}
                >
                  {formError}
                </p>
              )}

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="font-nav hover:opacity-85 transition-opacity"
                  style={{
                    backgroundColor: "var(--color-navbar)",
                    color: "var(--color-nav-text)",
                    padding: "20px 44px",
                    fontSize: "13px",
                    letterSpacing: "0.12em",
                    border: "none",
                    cursor: submitting ? "wait" : "pointer",
                    width: "fit-content",
                    opacity: submitting ? 0.6 : 1,
                  }}
                >
                  {submitting ? "Processing..." : "Pay Annual Dues & Renew"}
                </button>
                <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "13px", color: "var(--color-text-dark)", opacity: 0.5 }}>
                  Annual dues of <strong>₦5,000</strong> are required to complete your renewal.
                </p>
                <div className="flex items-center gap-2" style={{ marginTop: "6px" }}>
                  <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "12px", color: "var(--color-text-dark)", opacity: 0.4, letterSpacing: "0.02em" }}>
                    Secured by
                  </span>
                  <img
                    src="/images/paystack-logo.svg"
                    alt="Paystack"
                    style={{ height: "20px", width: "auto", opacity: 0.55 }}
                  />
                </div>
              </div>
            </div>
          </form>
        )}

        {/* ── Step 3: Success ── */}
        {step === "success" && (
          <div
            className="flex flex-col gap-8"
            style={{
              maxWidth: "640px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E8E0D0",
              padding: "clamp(32px, 4vw, 56px)",
            }}
          >
            <div className="flex flex-col gap-4">
              <h2
                className="font-heading"
                style={{
                  color: "var(--color-text-dark)",
                  fontSize: "clamp(24px, 3vw, 34px)",
                }}
              >
                Renewal received
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-text-dark)",
                  fontSize: "17px",
                  lineHeight: 1.85,
                  opacity: 0.75,
                }}
              >
                Thank you, {confirmedName.split(" ")[0]}. Your renewal for
                membership number{" "}
                <strong>{membershipNo.trim().toUpperCase()}</strong> has been
                received. Paystack will send a receipt to{" "}
                <strong>{email}</strong>. The Guild will update your record
                shortly.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-text-dark)",
                  fontSize: "15px",
                  opacity: 0.5,
                  paddingTop: "12px",
                  borderTop: "1px solid #E8E0D0",
                }}
              >
                For enquiries, write to{" "}
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
              </p>
            </div>

            <Link
              href="/"
              className="font-nav hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: "var(--color-navbar)",
                color: "var(--color-nav-text)",
                padding: "16px 32px",
                width: "fit-content",
                display: "inline-block",
              }}
            >
              Return to Home
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
