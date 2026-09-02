"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);

  if (subscribed) {
    return <p className="mx-auto mt-6 max-w-md text-sm font-medium text-paper">You&apos;re on the list — welcome to Shieldspring.</p>;
  }

  return (
    <form
      className="mx-auto mt-6 flex max-w-md gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSubscribed(true);
      }}
    >
      <input
        type="email"
        required
        placeholder="you@example.com"
        className="w-full rounded-full border border-paper/30 bg-transparent px-4 py-2.5 text-sm text-paper placeholder:text-paper/60 focus:border-paper focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-accent-dark"
      >
        Sign up
      </button>
    </form>
  );
}
