"use client";

// Error boundary for the public site pages (renders inside the site layout,
// so Tailwind utilities are available).

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-28 text-center">
      <p className="eyebrow">Unexpected error</p>
      <h1 className="mt-4 font-display text-3xl leading-tight">
        This page could not be loaded
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Something went wrong on our side. Please try again — if the problem persists,
        reach us at sales@yunhongtex.com.
      </p>
      <button type="button" onClick={reset} className="btn btn-primary mt-8">
        Try again
      </button>
      {error.digest ? (
        <p className="mt-6 text-xs text-muted">Reference: {error.digest}</p>
      ) : null}
    </div>
  );
}
