"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const supabase = createBrowserSupabaseClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      setError(signInError.message);
      setPending(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="w-full max-w-md">
        <p className="eyebrow">Yunhong admin</p>
        <h1 className="mt-4 font-display text-[2rem] leading-tight">Sign in to the console</h1>
        <form onSubmit={handleSubmit} className="card mt-8 space-y-5 p-6 sm:p-8">
          <div>
            <label className="field-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="field"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label className="field-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="field"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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
          <a href="/" className="link-underline">
            ← Back to the website
          </a>
        </p>
      </div>
    </div>
  );
}
