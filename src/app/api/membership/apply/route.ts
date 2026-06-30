import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
    const { firstName, lastName, email, phone, category, institution, role, yearsPlaying, notes, photoUrl } = body;

    if (!firstName || !lastName || !email || !phone || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const categoryLabels: Record<string, string> = {
      regular: "Regular Membership",
      fellow: "Fellow (FGON)",
      associate: "Associate (AGON)",
      student: "Student Member",
      affiliate: "Affiliate Member",
    };

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #380101; padding: 32px; color: #FFF9EC;">
          <h1 style="margin: 0; font-size: 24px;">New Membership Application</h1>
          <p style="margin: 8px 0 0; opacity: 0.7; font-size: 14px;">Guild of Organists of Nigeria</p>
        </div>

        <div style="padding: 32px; border: 1px solid #E8E0D0; border-top: none;">
          ${photoUrl ? `
          <div style="margin-bottom: 24px;">
            <img src="${photoUrl}" alt="Applicant photograph" style="width: 120px; height: 120px; object-fit: cover; border: 1px solid #E8E0D0;" />
          </div>
          ` : ""}

          <h2 style="font-size: 14px; color: #380101; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #E8E0D0; padding-bottom: 12px;">
            Personal Information
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px; width: 160px;">Name</td>
              <td style="padding: 8px 0; font-size: 14px;"><strong>${firstName} ${lastName}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Phone</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
          </table>

          <h2 style="font-size: 14px; color: #380101; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #E8E0D0; padding-bottom: 12px;">
            Membership Details
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px; width: 160px;">Category</td>
              <td style="padding: 8px 0; font-size: 14px;"><strong>${categoryLabels[category] || category}</strong></td>
            </tr>
            ${institution ? `<tr><td style="padding: 8px 0; color: #666; font-size: 14px;">Institution</td><td style="padding: 8px 0; font-size: 14px;">${institution}</td></tr>` : ""}
            ${role ? `<tr><td style="padding: 8px 0; color: #666; font-size: 14px;">Role</td><td style="padding: 8px 0; font-size: 14px;">${role}</td></tr>` : ""}
            ${yearsPlaying ? `<tr><td style="padding: 8px 0; color: #666; font-size: 14px;">Years Playing</td><td style="padding: 8px 0; font-size: 14px;">${yearsPlaying}</td></tr>` : ""}
          </table>

          ${notes ? `
          <h2 style="font-size: 14px; color: #380101; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #E8E0D0; padding-bottom: 12px;">
            Supporting Statement
          </h2>
          <p style="font-size: 14px; line-height: 1.7; color: #333; white-space: pre-wrap;">${notes}</p>
          ` : ""}
        </div>

        <div style="padding: 20px 32px; background-color: #FAFAF8; border: 1px solid #E8E0D0; border-top: none; font-size: 12px; color: #999;">
          This application was submitted via the GONiG website.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"GONiG Website" <${process.env.GMAIL_USER}>`,
      to: process.env.MEMBERSHIP_RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Membership Application: ${firstName} ${lastName} (${categoryLabels[category] || category})`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send membership application email:", error);
    return NextResponse.json({ error: "Failed to send application" }, { status: 500 });
  }
}
