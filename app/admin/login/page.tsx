"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminLogin } from "../actions";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    search.get("logout") === "1" ? "Signed out." : null,
  );
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const form = new FormData();
    form.set("password", password);

    const result = await adminLogin({ ok: true }, form);
    if (!result.ok) {
      setError(result.message ?? "Login failed");
      setPending(false);
      return;
    }

    // Auth cookie is set httpOnly by the server action — nothing to do here.
    const from = search.get("from") ?? "/admin";
    router.push(from);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="w-full max-w-md">
        <p className="eyebrow">Yunhong admin</p>
        <h1 className="mt-4 font-display text-[2rem] leading-tight">Admin console</h1>
        <p className="mt-3 text-sm text-muted">
          Enter the admin password to edit products, articles and site settings.
        </p>
        <form onSubmit={handleSubmit} className="card mt-8 space-y-5 p-6 sm:p-8">
          <div>
            <label className="field-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="field"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
            />
          </div>
          {error && (
            <p role="alert" className="rounded-lg border border-clay/40 bg-clay-soft px-4 py-3 text-sm text-clay-deep">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn-primary w-full" disabled={pending}>
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-[0.75rem] text-muted">
          Sign-in requires <code>ADMIN_PASSWORD</code> to be configured on the server.
        </p>
        <p className="mt-2 text-center text-[0.75rem]">
          <a href="/" className="link-underline text-muted">← Back to the website</a>
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
