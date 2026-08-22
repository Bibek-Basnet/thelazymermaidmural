import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, serviceLabel } from "@/lib/contact";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.4px;color:#8a7d72;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f3e8dc;">${label}</td>
      <td style="padding:10px 16px;font-size:14px;color:#2b2420;border-bottom:1px solid #f3e8dc;">${escapeHtml(value)}</td>
    </tr>`;
}

function buildEmailHtml(data: {
  name: string;
  email: string;
  location: string;
  service: string;
  wallSize?: string;
  budget?: string;
  message: string;
}): string {
  const rows = [
    detailRow("Name", data.name),
    detailRow("Email", data.email),
    detailRow("Location", data.location),
    detailRow("Service", serviceLabel(data.service)),
    data.wallSize ? detailRow("Wall size", data.wallSize) : "",
    data.budget ? detailRow("Budget", data.budget) : "",
  ].join("");

  const message = escapeHtml(data.message).replace(/\n/g, "<br />");

  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#fff4e8;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff4e8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background-color:#d93e87;padding:24px 28px;">
                <p style="margin:0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#ffe3f0;">The Lazy Mermaid Murals</p>
                <h1 style="margin:6px 0 0;font-size:22px;line-height:1.3;color:#ffffff;">New mural enquiry 🎨</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 12px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 28px 8px;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.4px;color:#8a7d72;">About the project</p>
                <div style="background-color:#fff8f0;border-left:4px solid #d93e87;border-radius:8px;padding:14px 16px;font-size:14px;line-height:1.6;color:#2b2420;">${message}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 28px 26px;">
                <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;background-color:#d93e87;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:11px 22px;border-radius:999px;">Reply to ${escapeHtml(data.name)}</a>
                <p style="margin:14px 0 0;font-size:12px;line-height:1.5;color:#8a7d72;">You can also just hit reply — this email replies straight to the sender.</p>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;font-size:11px;color:#b3a496;">Sent from the contact form at thelazymermaidmurals.com</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildEmailText(data: {
  name: string;
  email: string;
  location: string;
  service: string;
  wallSize?: string;
  budget?: string;
  message: string;
}): string {
  return [
    "New mural enquiry",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Location: ${data.location}`,
    `Service: ${serviceLabel(data.service)}`,
    data.wallSize ? `Wall size: ${data.wallSize}` : "",
    data.budget ? `Budget: ${data.budget}` : "",
    "",
    "About the project:",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !to) {
    return NextResponse.json(
      { message: "Email is not configured on the server." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please check the form fields and try again." },
      { status: 400 }
    );
  }

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from:
      process.env.CONTACT_EMAIL_FROM ||
      "The Lazy Mermaid Murals <onboarding@resend.dev>",
    to,
    replyTo: `${parsed.data.name} <${parsed.data.email}>`,
    subject: `New mural enquiry from ${parsed.data.name} — ${serviceLabel(parsed.data.service)}`,
    html: buildEmailHtml(parsed.data),
    text: buildEmailText(parsed.data),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { message: "The message couldn't be sent right now." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
