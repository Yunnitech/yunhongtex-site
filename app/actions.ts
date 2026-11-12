"use server";

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

/**
 * Delivers an RFQ via Resend when configured, otherwise logs to the server
 * console. Throws on delivery failure so the caller can surface an error.
 */
async function sendRfqEmail(payload: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.RFQ_TO;

  if (!apiKey || !from || !to) {
    console.info("[RFQ] no email transport configured — logged only:", payload);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      replyTo: payload.email,
      subject: `New RFQ from ${payload.company} — ${payload.product || "general enquiry"}`,
      text: [
        `Name: ${payload.name}`,
        `Company: ${payload.company}`,
        `Email: ${payload.email}`,
        `Country: ${payload.country || "-"}`,
        `Product: ${payload.product || "-"}`,
        `Quantity: ${payload.quantity || "-"}`,
        `Timeline: ${payload.timeline || "-"}`,
        ``,
        payload.message,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("[RFQ] Resend delivery failed", res.status, await res.text());
    throw new Error("Could not deliver your enquiry — please email us directly.");
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

  return {
    status: "success",
    message:
      "Thank you — your enquiry is with our sales team. You will receive a reply within one business day, including indicative pricing and the next available sampling slot.",
  };
}
