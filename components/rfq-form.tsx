"use client";

import { useActionState } from "react";
import { submitRfq, type RfqState } from "@/app/actions";
import { categories } from "@/lib/products";
import { site } from "@/lib/site";

const initialState: RfqState = { status: "idle" };

export function RfqForm({ defaultProduct }: { defaultProduct?: string }) {
  const [state, formAction, pending] = useActionState(submitRfq, initialState);

  if (state.status === "success") {
    return (
      <div className="card p-8 sm:p-10" role="status" aria-live="polite">
        <p className="eyebrow">Enquiry received</p>
        <h3 className="mt-4 font-display text-2xl">Thank you — we have your spec.</h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{state.message}</p>
        <p className="mt-6 text-sm text-muted">
          Need a faster answer? Message us on WhatsApp at{" "}
          <a className="link-underline text-ink-soft" href={`https://wa.me/${site.whatsapp.replace(/[^\d]/g, "")}`}>
            {site.whatsapp}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="card p-6 sm:p-8" noValidate>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-[1.75rem] leading-tight">Request a quotation</h2>
        <p className="text-[0.75rem] text-muted">{site.responseTime}</p>
      </div>
      <p className="mt-2 text-sm text-ink-soft">
        Tell us the composition, weight and quantity. We reply with pricing, lab dip timing and
        the earliest sampling slot.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="name">
            Full name *
          </label>
          <input
            id="name"
            name="name"
            className="field"
            autoComplete="name"
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
          />
          {state.errors?.name && (
            <p id="name-error" className="mt-1 text-xs text-clay">
              {state.errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="field-label" htmlFor="company">
            Company *
          </label>
          <input
            id="company"
            name="company"
            className="field"
            autoComplete="organization"
            aria-invalid={Boolean(state.errors?.company)}
            aria-describedby={state.errors?.company ? "company-error" : undefined}
          />
          {state.errors?.company && (
            <p id="company-error" className="mt-1 text-xs text-clay">
              {state.errors.company}
            </p>
          )}
        </div>

        <div>
          <label className="field-label" htmlFor="email">
            Business email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="field"
            autoComplete="email"
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
          />
          {state.errors?.email && (
            <p id="email-error" className="mt-1 text-xs text-clay">
              {state.errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="field-label" htmlFor="country">
            Country
          </label>
          <input id="country" name="country" className="field" autoComplete="country-name" />
        </div>

        <div>
          <label className="field-label" htmlFor="product">
            Fabric interest
          </label>
          <select
            id="product"
            name="product"
            className="field"
            defaultValue={
              categories.find((category) => category.name === defaultProduct)?.name ?? ""
            }
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.name}>
                {category.name}
              </option>
            ))}
            <option value="Custom development">Custom development</option>
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="quantity">
            Quantity (metres)
          </label>
          <input
            id="quantity"
            name="quantity"
            inputMode="numeric"
            className="field"
            placeholder="e.g. 3000"
            aria-invalid={Boolean(state.errors?.quantity)}
            aria-describedby={state.errors?.quantity ? "quantity-error" : undefined}
          />
          {state.errors?.quantity && (
            <p id="quantity-error" className="mt-1 text-xs text-clay">
              {state.errors.quantity}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="timeline">
            Required delivery window
          </label>
          <input
            id="timeline"
            name="timeline"
            className="field"
            placeholder="e.g. shipping by March, or fabric in-house by 15 February"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="message">
            Specification and colour reference
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="field"
            placeholder="Composition, weight in gsm, width, Pantone TCX shades, finish, certification needs."
          />
        </div>
      </div>

      {/* Honeypot — hidden from users and assistive tech */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && (
        <p role="alert" className="mt-5 text-sm text-clay">
          {state.message}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.6875rem] leading-relaxed text-muted">
          We use your details only to answer this enquiry and never share them with third
          parties. See our <a href="/privacy" className="link-underline">privacy policy</a>.
        </p>
        <button type="submit" className="btn btn-primary disabled:opacity-60" disabled={pending}>
          {pending ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
