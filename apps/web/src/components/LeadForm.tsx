"use client";

import { useState } from "react";

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setMessage("");
    const body = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      consent: data.get("consent") === "yes",
      company_website: String(data.get("company_website") ?? ""),
      landing_page: "/process-audit",
      utm_source: new URLSearchParams(window.location.search).get("utm_source") ?? undefined,
      utm_medium: new URLSearchParams(window.location.search).get("utm_medium") ?? undefined,
      utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign") ?? undefined,
      assessment_score: (() => {
        const raw = sessionStorage.getItem("opralvin_assessment_score");
        if (raw == null || raw === "") return undefined;
        const n = Number(raw);
        return Number.isFinite(n) ? n : undefined;
      })(),
      turnstile_token: String(data.get("cf-turnstile-response") ?? "") || undefined,
    };
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      setStatus("ok");
      setMessage("Stored. We will use this only to call you about a process audit.");
      form.reset();
      return;
    }
    setStatus("err");
    const payload = (await response.json().catch(() => ({}))) as { error?: string };
    setMessage(payload.error ?? "The form did not store.");
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-5 border border-line bg-sheet p-5" noValidate>
      <p className="text-sm text-muted">
        Name, phone, email, and company. Consent is required. The purpose is a call about a process audit.
      </p>
      <label className="block">
        <span className="block text-sm">Name</span>
        <input name="name" autoComplete="name" required minLength={2} className="mt-1 w-full border border-line bg-paper px-3 py-2" />
      </label>
      <label className="block">
        <span className="block text-sm">Phone</span>
        <input
          name="phone"
          autoComplete="tel"
          required
          inputMode="tel"
          pattern="\+91[6-9]\d{9}"
          placeholder="+91"
          className="mt-1 w-full border border-line bg-paper px-3 py-2 font-mono"
        />
      </label>
      <label className="block">
        <span className="block text-sm">Email</span>
        <input name="email" type="email" autoComplete="email" required className="mt-1 w-full border border-line bg-paper px-3 py-2" />
      </label>
      <label className="block">
        <span className="block text-sm">Company</span>
        <input name="company" autoComplete="organization" required minLength={2} className="mt-1 w-full border border-line bg-paper px-3 py-2" />
      </label>
      <label className="hidden">
        Company website
        <input name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY.includes("{{") ? (
        <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
      ) : null}
      <label className="flex gap-3 text-sm">
        <input name="consent" type="checkbox" value="yes" required className="mt-1" />
        <span>
          I agree that Opralvin Technologies may use these details to contact me about a free process audit, as described
          on the privacy page.
        </span>
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-ink px-4 py-3 text-sm font-semibold text-on-ink disabled:opacity-60"
      >
        {status === "sending" ? "Sending" : "Request the audit"}
      </button>
      {message ? (
        <p className={status === "ok" ? "text-posted" : "text-rule"} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
