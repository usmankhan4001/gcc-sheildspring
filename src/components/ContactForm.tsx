"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-md border border-line bg-paper-2 p-6 text-sm text-ink/80">
        Thanks for reaching out — the Agent Lume team will reply within one
        business day.
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          type="text"
          name="name"
          placeholder="Your name"
          className="rounded-md border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email address"
          className="rounded-md border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
        />
      </div>
      <input
        type="text"
        name="orderNumber"
        placeholder="Order number (optional)"
        className="w-full rounded-md border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
      />
      <textarea
        required
        name="message"
        rows={5}
        placeholder="How can we help?"
        className="w-full rounded-md border border-ink/20 px-4 py-3 text-sm focus:border-accent focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-accent-dark"
      >
        Send Message
      </button>
    </form>
  );
}
