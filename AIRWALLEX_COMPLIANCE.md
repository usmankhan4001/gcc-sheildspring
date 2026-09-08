# Airwallex onboarding — what was fixed and what still needs doing

Payment providers review a storefront before they activate card processing. They
are looking for three things: **PCI compliance**, **verifiable business identity**,
and **no misrepresentation**. This document tracks where `agentlume.io` stood and
what has been changed in this codebase.

---

## Fixed in this codebase

### 1. Raw card capture (was an automatic decline)

The checkout previously held the card number, expiry date and CVC in React state
on a client component, with no payment gateway behind it. Capturing and storing
PAN + CVV in your own page is a PCI-DSS violation — CVV must never be stored
after authorisation — and it is one of the fastest ways to be declined.

**Now:** card details are entered in an Airwallex-hosted field. The card data
goes to Airwallex's iframe and never reaches our DOM, state or servers. The
matching PaymentIntent is created server-side in
`src/app/api/payment-intent/route.ts`.

### 2. Fake checkout

"Place Order" previously ran `setTimeout(800)` and redirected to a confirmation
page without taking any payment. Reviewers click through the checkout, so a
non-functional flow is fatal.

**Now:** the button creates a real PaymentIntent and confirms it through
Airwallex. If Airwallex is not configured, the checkout says so instead of
pretending to take a payment.

### 3. Payment badges for methods we cannot accept

Visa, Mastercard, Amex, Apple Pay and Google Pay badges were shown with no
gateway connected. Advertising payment methods you cannot honour is a
card-network compliance violation.

**Now:** `PaymentBadges` shows card badges only. Wallet badges are behind a
`showWallets` prop — enable it once Apple Pay / Google Pay are live on the
Airwallex account.

### 4. Fabricated social proof

The home page claimed "Loved by 10,000+ happy customers", "4.9 / 5.0 Average
Rating" and three named reviews tagged "Verified Buyer". Unverifiable
performance claims count as misrepresentation.

**Now:** replaced with a "Shop With Confidence" section that links to the real
shipping, refund and privacy policies.

### 5. Contradictory commercial terms

The header and home page advertised "Free **Express** Shipping over $120" while
the policy page said free **standard** over $120 with express at $18. The
checkout promised "Free returns" and the home page promised "prepaid return
labels", neither of which appeared in the policy.

**Now:** every shipping rate, threshold and return window is defined once in
`src/lib/commerce.ts` and consumed by the header, home page, checkout and policy
pages, so they cannot drift apart again.

### 6. Unsubstantiated environmental claims

"100% organic & recycled" and "organic cotton, recycled materials, low-impact
dyes" were claimed while the catalogue lists cotton-nylon blends and standard
French terry.

**Now:** copy describes fabric weight and composition only.

### 7. Missing policy surface

There was no refund policy, no cancellation terms, no consent checkbox at
checkout, and no currency disclosure.

**Now:**

- New `/refund-policy` page (eligibility, non-returnable items, return shipping
  cost, refund timing, exchanges, cancellation, disputes)
- `/shipping-returns` expanded with customs/duties, tracking and lost parcels
- Checkout has a required Terms / Refund Policy / Privacy consent checkbox, an
  optional marketing opt-in, and a "charged in USD" disclosure
- Checkout shows support contact details and links the Refund Policy next to the
  pay button

### 8. `robots.txt` pointed at the wrong domain

The sitemap URL referenced `shieldspring.io`. Fixed to `agentlume.io`.

---

## Still to do — application side, cannot be fixed in code

These are business/verification issues. They are the most likely remaining
reasons for a decline, and no code change can resolve them.

- [ ] **Entity / contact mismatch.** The site declares "Agent Lume Limited",
      Hong Kong Company No. 81160869, at a serviced office (Office Plus, Sheung
      Wan), but the contact number is `+1 367 202 5511` — a North American
      number. Underwriters cross-check the website against the application and
      the companies registry. Either use a phone number in the entity's country
      or change the entity to match where you actually operate.
- [ ] **Serviced / virtual office.** A registered agent address is acceptable;
      a virtual office presented as an operating address is a risk flag. Be
      ready to supply a business registration certificate and a recent bank
      statement or utility bill for the entity.
- [ ] **Domain and entity name alignment.** `agentlume.io` vs "Agent Lume
      Limited" is consistent — keep it that way in the application, and make
      sure the WHOIS registrant and the Airwallex account holder match.
- [ ] **Stock product photography.** Product and lifestyle images are currently
      Unsplash stock. Reviewers recognise reused stock imagery on a brand that
      claims to manufacture its own clothing. Replace with your own product
      shots before applying.
- [ ] **Real fulfilment capability.** The site promises 1–2 business day
      processing and 5–8 day delivery. Make sure you can evidence this
      (supplier agreement, 3PL contract, or stock on hand).
- [ ] **Descriptor.** The PaymentIntent sends `descriptor: "AGENTLUME"`. Confirm
      this is the billing descriptor you want customers to see on their
      statement — an unclear descriptor drives chargebacks.

---

## Before you submit the application

1. Set `NEXT_PUBLIC_AIRWALLEX_ENV=demo` plus your demo credentials and complete
   a real test payment end to end.
2. Walk the site as a reviewer would: home → product → cart → checkout →
   confirmation. Every policy link should resolve.
3. Confirm the footer legal block (entity name, company number, address, email,
   phone) matches the Airwallex application exactly.
4. Switch to `prod` credentials only after Airwallex confirms approval.
