"use server";

import { createHash } from "crypto";
import { headers } from "next/headers";

export type RfqState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// In-memory per-IP rate limit: 3 submissions per 10 minutes. The counter
// resets when the serverless instance recycles — fine for the current
// traffic level; move to Redis if abuse appears.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const submissions = new Map<string, number[]>();

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

const BRAND = {
  ink: "#26221d",
  muted: "#8a857c",
  paper: "#faf7f2",
  accent: "#b4573a",
};

function emailShell(title: string, body: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:${BRAND.paper};font-family:Georgia,'Times New Roman',serif;color:${BRAND.ink};">
    <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${BRAND.muted};">Yunhong Textiles</p>
      <h1 style="margin:0 0 20px;font-size:24px;font-weight:600;">${title}</h1>
      ${body}
      <hr style="border:none;border-top:1px solid #e5dfd4;margin:28px 0 12px;" />
      <p style="margin:0;font-size:12px;color:${BRAND.muted};line-height:1.6;">
        Zhejiang Yunhong Textile Co., Ltd. · Keqiao, Shaoxing, China<br />
        sales@yunhongtex.com · Mon–Fri 09:00–18:00 (GMT+8)
      </p>
    </div>
  </body>
</html>`;
}

/** The internal notification sent to the sales team. */
function buildRfqHtml(payload: Record<string, string>): string {
  const rows = [
    ["Name", payload.name],
    ["Company", payload.company],
    ["Email", payload.email],
    ["Country", payload.country || "-"],
    ["Product", payload.product || "-"],
    ["Quantity", payload.quantity || "-"],
    ["Timeline", payload.timeline || "-"],
    ["Received", payload.receivedAt],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;font-size:12px;color:${BRAND.muted};text-transform:uppercase;letter-spacing:0.08em;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:6px 0;font-size:14px;">${value}</td></tr>`,
    )
    .join("");

  return emailShell(
    `New RFQ from ${payload.company}`,
    `<table style="border-collapse:collapse;width:100%;">${rows}</table>
     <p style="margin:24px 0 0;padding:16px;background:#fff;border-left:3px solid ${BRAND.accent};font-size:14px;line-height:1.6;white-space:pre-wrap;">${payload.message || "—"}</p>`,
  );
}

/** The confirmation sent back to the buyer. */
function buildAutoReplyHtml(payload: Record<string, string>): string {
  return emailShell(
    "We received your enquiry",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">Dear ${payload.name},</p>
     <p style="margin:0 0 14px;font-size:15px;line-height:1.7;">Thank you for contacting Yunhong Textiles. Our sales team has received your enquiry${
       payload.product ? ` regarding <strong>${payload.product}</strong>` : ""
     } and will reply within one business day with indicative pricing and the next available sampling slot.</p>
     <p style="margin:0;font-size:14px;line-height:1.7;color:${BRAND.muted};">Reference details you sent us:</p>
     <ul style="margin:8px 0 0;padding-left:20px;font-size:14px;line-height:1.8;">
       <li>Quantity: ${payload.quantity || "—"}</li>
       <li>Timeline: ${payload.timeline || "—"}</li>
     </ul>`,
  );
}

/**
 * Delivers an RFQ via Resend when configured: a notification to the sales
 * inbox plus a branded confirmation to the buyer. Falls back to the server
 * console when RESEND_* variables are missing. Throws on notification
 * failure so the caller can surface an error; the buyer auto-reply is
 * best-effort and never blocks the submission.
 */
async function sendRfqEmail(payload: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.RFQ_TO;

  if (!apiKey || !from || !to) {
    console.info("[RFQ] no email transport configured — logged only:", payload);
    return;
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers,
    body: JSON.stringify({
      from,
      to,
      replyTo: payload.email,
      subject: `New RFQ from ${payload.company} — ${payload.product || "general enquiry"}`,
      html: buildRfqHtml(payload),
    }),
  });

  if (!res.ok) {
    console.error("[RFQ] Resend notification failed", res.status, await res.text());
    throw new Error("Could not deliver your enquiry — please email us directly.");
  }

  try {
    const ack = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers,
      body: JSON.stringify({
        from,
        to: payload.email,
        replyTo: to,
        subject: "We received your enquiry — Yunhong Textiles",
        html: buildAutoReplyHtml(payload),
      }),
    });
    if (!ack.ok) console.error("[RFQ] buyer auto-reply failed", ack.status, await ack.text());
  } catch (error) {
    console.error("[RFQ] buyer auto-reply error", error);
  }
}

/**
 * Server-side GA4 conversion via the Measurement Protocol. Works even when
 * the visitor's browser blocks gtag — needs GA4_MP_API_SECRET (create one in
 * GA4 → Admin → Data streams → Measurement Protocol API secrets).
 */
async function sendGa4Conversion(payload: Record<string, string>, clientId: string) {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;
  const apiSecret = process.env.GA4_MP_API_SECRET;
  if (!measurementId || !apiSecret) return;

  try {
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: "POST",
        body: JSON.stringify({
          client_id: clientId,
          events: [
            {
              name: "generate_lead",
              params: {
                product: payload.product || "general",
                company: payload.company,
                country: payload.country,
              },
            },
          ],
        }),
      },
    );
  } catch (error) {
    // Analytics must never break the enquiry flow.
    console.error("[RFQ] GA4 measurement protocol failed", error);
  }
}

/**
 * Handles the RFQ form. Validation lives on the server so it cannot be
 * bypassed; submissions are rate-limited per IP and delivered by email
 * (Resend) when RESEND_* variables are configured.
 */
export async function submitRfq(_prev: RfqState, formData: FormData): Promise<RfqState> {
  // Honeypot: bots fill hidden fields, humans never see them.
  if (text(formData, "website")) {
    return { status: "success", message: "Thank you — your enquiry has been received." };
  }

  const name = text(formData, "name");
  const company = text(formData, "company");
  const email = text(formData, "email");
  const quantity = text(formData, "quantity");
  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = "Please enter your full name.";
  if (company.length < 2) errors.company = "Please enter your company name.";
  if (!emailPattern.test(email)) errors.email = "Please enter a valid business email.";
  if (quantity && Number.isNaN(Number(quantity))) {
    errors.quantity = "Quantity must be a number in metres.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors };
  }

  // Rate limit by client IP.
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    return {
      status: "error",
      message:
        "Too many enquiries from your address — please try again later or email us directly at sales@yunhongtex.com.",
    };
  }

  const payload = {
    name,
    company,
    email,
    country: text(formData, "country"),
    product: text(formData, "product"),
    quantity,
    timeline: text(formData, "timeline"),
    message: text(formData, "message"),
    receivedAt: new Date().toISOString(),
  };

  try {
    await sendRfqEmail(payload);
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Something went wrong. Please email us directly.",
    };
  }

  recent.push(now);
  submissions.set(ip, recent);

  // Deterministic pseudo-anonymous client id for the Measurement Protocol.
  const userAgent = headerList.get("user-agent") ?? "";
  const clientId = createHash("sha256").update(`${ip}|${userAgent}`).digest("hex").slice(0, 32);
  await sendGa4Conversion(payload, clientId);

  return {
    status: "success",
    message:
      "Thank you — your enquiry is with our sales team. You will receive a reply within one business day, including indicative pricing and the next available sampling slot.",
  };
}
