import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reference, amount, email } = body as {
      reference: string;
      amount: number;
      email: string;
    };

    if (!reference || !amount || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Skip Paystack verification in dev when using a TEST reference
    const isDev = process.env.NODE_ENV === "development";
    const isTestRef = reference.startsWith("TEST-");

    if (!isDev || !isTestRef) {
      const verifyRes = await fetch(
        `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
        { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
      );
      const verifyData = await verifyRes.json();
      if (!verifyData.status || verifyData.data?.status !== "success") {
        return NextResponse.json({ error: "Payment could not be verified" }, { status: 400 });
      }
    }

    const formattedAmount = `₦${amount.toLocaleString("en-NG")}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #380101; padding: 32px; color: #FFF9EC;">
          <h1 style="margin: 0; font-size: 24px;">New Donation Received</h1>
          <p style="margin: 8px 0 0; opacity: 0.7; font-size: 14px;">Guild of Organists of Nigeria</p>
        </div>

        <div style="padding: 32px; border: 1px solid #E8E0D0; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #666; font-size: 14px; width: 160px;">Amount</td>
              <td style="padding: 10px 0; font-size: 18px; font-weight: bold; color: #380101;">${esc(formattedAmount)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-size: 14px;">Donor email</td>
              <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${esc(email)}">${esc(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-size: 14px;">Type</td>
              <td style="padding: 10px 0; font-size: 14px;">Donation</td>
            </tr>
          </table>
        </div>

        <div style="padding: 20px 32px; background-color: #FAFAF8; border: 1px solid #E8E0D0; border-top: none; font-size: 12px; color: #999;">
          Payment reference: ${esc(reference)} &mdash; submitted via the GONiG website.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"GONiG Website" <${process.env.GMAIL_USER}>`,
      to: process.env.MEMBERSHIP_RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Donation: ${formattedAmount} from ${email}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send donation notification email:", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}
