"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

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

const PRESETS = [
  { label: "₦5,000", value: 5000 },
  { label: "₦10,000", value: 10000 },
  { label: "₦20,000", value: 20000 },
];

type DonationState = "idle" | "collecting-email" | "processing" | "success" | "error";

export default function DonationBlock() {
  const [selected, setSelected] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<DonationState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isCustom = selected === -1;
  const hasAmount = Boolean(selected && selected > 0) || Boolean(custom);

  const amountInNaira = isCustom
    ? Number(custom)
    : selected ?? 0;

  const displayAmount = amountInNaira
    ? `₦${amountInNaira.toLocaleString("en-NG")}`
    : "";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  function handlePreset(value: number) {
    setSelected(value);
    setCustom("");
  }

  function handleCustomFocus() {
    setSelected(-1);
  }

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");
    setCustom(raw);
  }

  async function submitAfterPayment(reference: string) {
    setState("processing");
    setErrorMsg("");
    try {
      const res = await fetch("/api/donation/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference,
          amount: amountInNaira,
          email,
        }),
      });
      if (!res.ok) throw new Error("Notification failed");
      setState("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrorMsg(
        "Your payment was received but we could not send the confirmation. Please keep your payment reference and contact us directly."
      );
      setState("error");
    }
  }

  function openPaystack() {
    if (!email) {
      setErrorMsg("Please enter your email address so we can send you a receipt.");
      return;
    }
    setErrorMsg("");

    // Dev bypass — no public key configured
    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      submitAfterPayment(`TEST-DONATION-${Date.now()}`);
      return;
    }

    const ref = `GONIG-DON-${Date.now()}`;
    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email,
      amount: amountInNaira * 100, // kobo
      currency: "NGN",
      ref,
      metadata: {
        type: "donation",
        amount_naira: amountInNaira,
        donor_email: email,
      },
      callback: (response) => {
        submitAfterPayment(response.reference);
      },
      onClose: () => {
        setErrorMsg("Payment was not completed. Please try again.");
      },
    });
    handler.openIframe();
  }

  function handleDonateClick() {
    if (state === "idle") {
      setState("collecting-email");
    } else if (state === "collecting-email") {
      openPaystack();
    }
  }

  if (state === "success") {
    return (
      <section
        style={{
          backgroundColor: "#FFFFFF",
          paddingTop: "clamp(72px, 9vw, 120px)",
          paddingBottom: "clamp(72px, 9vw, 120px)",
          paddingLeft: "var(--space-section-x)",
          paddingRight: "var(--space-section-x)",
          borderTop: "4px solid var(--color-navbar)",
        }}
      >
        <div style={{ maxWidth: "560px" }}>
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-navbar)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "24px",
            }}
          >
            Support the Guild
          </span>
          <h2
            className="font-heading"
            style={{
              color: "var(--color-text-dark)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: "20px",
            }}
          >
            Thank you for your generous gift
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
            Your donation of {displayAmount} has been received. Paystack will send
            a receipt to <strong>{email}</strong>. The Guild is grateful for your
            support.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        backgroundColor: "#FFFFFF",
        paddingTop: "clamp(72px, 9vw, 120px)",
        paddingBottom: "clamp(72px, 9vw, 120px)",
        paddingLeft: "var(--space-section-x)",
        paddingRight: "var(--space-section-x)",
        borderTop: "4px solid var(--color-navbar)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

        {/* Left — heading */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-navbar)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Support the Guild
          </span>
          <h2
            className="font-heading"
            style={{
              color: "var(--color-text-dark)",
              fontSize: "clamp(32px, 4vw, 54px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Help us keep organ music alive in Nigeria
          </h2>
        </div>

        {/* Right — copy + amount selector + CTA */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "var(--color-text-dark)",
              fontSize: "17px",
              lineHeight: 1.85,
              opacity: 0.78,
            }}
          >
            Your gift supports education programmes, organ maintenance, and the
            Guild's ongoing work to nurture the next generation of organists
            across Nigeria. Every contribution, however modest, sustains this
            mission.
          </p>

          {/* Amount selector */}
          <div className="flex flex-col gap-4">
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                color: "var(--color-text-dark)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                opacity: 0.5,
              }}
            >
              Select an amount
            </span>

            {/* Preset buttons — equal width, spanning the full row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
              }}
            >
              {PRESETS.map((preset) => {
                const active = selected === preset.value;
                return (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => handlePreset(preset.value)}
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "15px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      padding: "14px 0",
                      minHeight: "52px",
                      border: `2px solid ${active ? "var(--color-navbar)" : "rgba(26,0,0,0.2)"}`,
                      backgroundColor: active ? "var(--color-navbar)" : "transparent",
                      color: active ? "var(--color-nav-text)" : "var(--color-text-dark)",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* Custom amount input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: `2px solid ${isCustom ? "var(--color-navbar)" : "rgba(26,0,0,0.2)"}`,
                transition: "border-color 0.15s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-text-dark)",
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "0 16px",
                  opacity: isCustom ? 0.9 : 0.35,
                  userSelect: "none",
                  flexShrink: 0,
                }}
              >
                ₦
              </span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Other amount"
                value={custom}
                onFocus={handleCustomFocus}
                onChange={handleCustomChange}
                style={{
                  flex: 1,
                  height: "52px",
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "16px",
                  color: "var(--color-text-dark)",
                  paddingRight: "16px",
                }}
              />
            </div>
          </div>

          {/* Email field — slides in after first CTA click */}
          {state === "collecting-email" && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="donor-email"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-text-dark)",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  opacity: 0.5,
                }}
              >
                Your email address
              </label>
              <input
                id="donor-email"
                type="email"
                autoFocus
                placeholder="For your Paystack receipt"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && openPaystack()}
                style={{
                  width: "100%",
                  height: "52px",
                  border: "2px solid rgba(26,0,0,0.2)",
                  backgroundColor: "transparent",
                  outline: "none",
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "16px",
                  color: "var(--color-text-dark)",
                  padding: "0 16px",
                  transition: "border-color 0.15s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-navbar)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(26,0,0,0.2)")}
              />
            </div>
          )}

          {/* Error message */}
          {errorMsg && (
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
              {errorMsg}
            </p>
          )}

          {/* Donate CTA */}
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={handleDonateClick}
              disabled={!hasAmount || state === "processing"}
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "18px 40px",
                minHeight: "56px",
                backgroundColor: hasAmount ? "var(--color-navbar)" : "rgba(26,0,0,0.08)",
                color: hasAmount ? "var(--color-nav-text)" : "rgba(26,0,0,0.25)",
                border: "none",
                cursor: hasAmount && state !== "processing" ? "pointer" : "default",
                transition: "all 0.2s ease",
                width: "100%",
                opacity: state === "processing" ? 0.6 : 1,
              }}
            >
              {state === "processing"
                ? "Processing..."
                : state === "collecting-email"
                ? `Proceed to pay ${displayAmount}`
                : displayAmount
                ? `Donate ${displayAmount}`
                : "Donate"}
            </button>

            {/* Paystack attribution */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "var(--color-text-dark)",
                  fontSize: "12px",
                  opacity: 0.4,
                  letterSpacing: "0.04em",
                }}
              >
                Secured by
              </span>
              <Image
                src="/images/paystack-logo.svg"
                alt="Paystack"
                width={72}
                height={20}
                style={{ opacity: 0.45 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
