"use server";

export type RfqState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

/**
 * Handles the RFQ form. Validation lives on the server so it cannot be
 * bypassed; swap the console transport for Resend / SendGrid / your CRM
 * webhook when the site goes live.
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

  // Replace with a real transport (email or CRM) in production.
  console.info("[RFQ]", payload);

  return {
    status: "success",
    message:
      "Thank you — your enquiry is with our sales team. You will receive a reply within one business day, including indicative pricing and the next available sampling slot.",
  };
}
