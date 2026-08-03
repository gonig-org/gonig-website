"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";

/**
 * Membership application form — institutional light treatment.
 *
 * Pattern: maroon header band → white form body.
 * Form style: clean, government-adjacent — generous labels, bordered inputs,
 * clear field groupings separated by ruled lines.
 *
 * Two states:
 *   idle    — the form is displayed
 *   success — personalised confirmation shown after submit
 *
 * No backend wired yet. When an API route is ready, replace the
 * handleSubmit body with a fetch() call to that endpoint.
 */

const CATEGORIES = [
  { value: "regular", label: "Regular Membership", disabled: false },
  { value: "fellow", label: "Fellow (FGON)", disabled: true },
  { value: "associate", label: "Associate (AGON)", disabled: true },
  { value: "student", label: "Student Member", disabled: false },
  { value: "affiliate", label: "Affiliate Member", disabled: false },
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: string;
  institution: string;
  role: string;
  yearsPlaying: string;
  notes: string;
};

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  category: "",
  institution: "",
  role: "",
  yearsPlaying: "",
  notes: "",
};

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

const hintStyle: React.CSSProperties = {
  fontFamily: "var(--font-montserrat)",
  color: "#1a0000",
  fontSize: "13px",
  opacity: 0.45,
  marginTop: "6px",
  lineHeight: 1.6,
};

export default function ApplyForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPEG, PNG, or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }

    setError("");
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo) {
      setError("Please upload a passport photograph.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const uploadData = new FormData();
      uploadData.append("file", photo);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!uploadRes.ok) throw new Error("Failed to upload photo");
      const { url: photoUrl } = await uploadRes.json();

      const res = await fetch("/api/membership/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, photoUrl }),
      });

      if (!res.ok) throw new Error("Failed to send application");

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>

      {/* ================================================================
       *  PAGE HEADER BAND — maroon, matches membership overview
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
            Application for Membership
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
            Please complete all fields as accurately as possible. Applications
            are reviewed by the membership committee and you will be contacted
            within 10 working days.
          </p>
        </div>
      </section>

      {/* ================================================================
       *  FORM / CONFIRMATION — white body
       * ================================================================ */}
      <section
        style={{
          backgroundColor: "#FAFAF8",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
        }}
      >
        {submitted ? (

          /* ── Confirmation ── */
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
                Application received
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
                Thank you, {form.firstName}. Your application for{" "}
                <strong>
                  {CATEGORIES.find((c) => c.value === form.category)?.label ??
                    "membership"}
                </strong>{" "}
                has been received. The membership committee will review it and
                contact you at{" "}
                <strong>{form.email}</strong> within 10 working days.
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
                For urgent enquiries, write to{" "}
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
              className="font-nav flex items-center gap-3 hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: "var(--color-navbar)",
                color: "var(--color-nav-text)",
                padding: "16px 32px",
                width: "fit-content",
              }}
            >
              Return to Home
            </Link>
          </div>

        ) : (

          /* ── Application form ── */
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-0"
            style={{ maxWidth: "760px" }}
          >

            {/* ── Section 1: Personal Information ── */}
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
                Personal Information
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" style={labelStyle}>
                    First Name <span style={{ color: "var(--color-navbar)" }}>*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={form.firstName}
                    onChange={set("firstName")}
                    style={inputStyle}
                    autoComplete="given-name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" style={labelStyle}>
                    Last Name <span style={{ color: "var(--color-navbar)" }}>*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={form.lastName}
                    onChange={set("lastName")}
                    style={inputStyle}
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" style={labelStyle}>
                    Email Address <span style={{ color: "var(--color-navbar)" }}>*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
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
                    value={form.phone}
                    onChange={set("phone")}
                    style={inputStyle}
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>
                  Passport Photograph <span style={{ color: "var(--color-navbar)" }}>*</span>
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
                        Click to upload a clear photograph of your face
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

            {/* ── Section 2: Membership Category ── */}
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
                Membership Category
              </h2>

              <div>
                <label htmlFor="category" style={labelStyle}>
                  Category Applying For <span style={{ color: "var(--color-navbar)" }}>*</span>
                </label>
                <select
                  id="category"
                  required
                  value={form.category}
                  onChange={set("category")}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value} disabled={cat.disabled}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <p style={hintStyle}>
                  Not sure which category applies?{" "}
                  <Link
                    href="/membership"
                    style={{
                      color: "var(--color-navbar)",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    Review the categories
                  </Link>
                </p>
              </div>
            </div>

            {/* ── Section 3: Professional Background ── */}
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
                Professional Background
              </h2>

              <div>
                <label htmlFor="institution" style={labelStyle}>
                  Church / Institution / School <span style={{ color: "var(--color-navbar)" }}>*</span>
                </label>
                <input
                  id="institution"
                  type="text"
                  required
                  value={form.institution}
                  onChange={set("institution")}
                  style={inputStyle}
                  placeholder="e.g. Cathedral Church of Christ, Lagos"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="role" style={labelStyle}>
                    Current Role <span style={{ color: "var(--color-navbar)" }}>*</span>
                  </label>
                  <input
                    id="role"
                    type="text"
                    required
                    value={form.role}
                    onChange={set("role")}
                    style={inputStyle}
                    placeholder="e.g. Cathedral Organist"
                  />
                </div>
                <div>
                  <label htmlFor="yearsPlaying" style={labelStyle}>
                    Years Playing / Studying
                  </label>
                  <input
                    id="yearsPlaying"
                    type="text"
                    value={form.yearsPlaying}
                    onChange={set("yearsPlaying")}
                    style={inputStyle}
                    placeholder="e.g. 12 years"
                  />
                </div>
              </div>

            </div>

            {/* ── Section 4: Supporting Statement ── */}
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
                Supporting Statement
              </h2>

              <div>
                <label htmlFor="notes" style={labelStyle}>
                  Statement
                </label>
                <textarea
                  id="notes"
                  rows={6}
                  value={form.notes}
                  onChange={set("notes")}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    lineHeight: 1.75,
                    minHeight: "150px",
                  }}
                  placeholder="Briefly describe your connection to organ music and your reasons for wishing to join the Guild."
                />
              </div>
            </div>

            {/* ── Submission ── */}
            <div
              className="flex flex-col gap-5"
              style={{
                paddingTop: "32px",
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
                By submitting this application you confirm that the information
                provided is accurate and that you agree to abide by the Guild's{" "}
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

              {error && (
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
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="font-nav flex items-center gap-3 hover:opacity-85 transition-opacity"
                style={{
                  backgroundColor: "var(--color-navbar)",
                  color: "var(--color-nav-text)",
                  padding: "20px 44px",
                  fontSize: "13px",
                  cursor: submitting ? "wait" : "pointer",
                  border: "none",
                  width: "fit-content",
                  opacity: submitting ? 0.6 : 1,
                }}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
