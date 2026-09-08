/**
 * Single source of truth for commercial terms.
 *
 * Every shipping/return figure shown anywhere on the site is derived from here
 * so the marketing copy, the checkout and the policy pages cannot drift apart.
 * Payment providers (Airwallex, card networks) reject storefronts whose
 * advertised terms contradict each other.
 */

export const FREE_SHIPPING_THRESHOLD = 120;

export const SHIPPING_OPTIONS = [
  {
    id: "standard",
    label: "Standard",
    eta: "5–8 business days",
    price: 8,
    freeOverThreshold: true,
  },
  {
    id: "express",
    label: "Express",
    eta: "2–3 business days",
    price: 18,
    freeOverThreshold: false,
  },
] as const;

export type ShippingOptionId = (typeof SHIPPING_OPTIONS)[number]["id"];

export const DEFAULT_SHIPPING_OPTION: ShippingOptionId = "standard";

export const RETURN_WINDOW_DAYS = 30;
export const DAMAGE_REPORT_WINDOW_DAYS = 14;
export const REFUND_PROCESSING_DAYS = "5–7 business days";
export const ORDER_PROCESSING_TIME = "1–2 business days";

export function shippingCostFor(
  optionId: ShippingOptionId,
  discountedSubtotal: number,
): number {
  const option = SHIPPING_OPTIONS.find((o) => o.id === optionId);
  if (!option) return 0;
  if (discountedSubtotal === 0) return 0;
  if (option.freeOverThreshold && discountedSubtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }
  return option.price;
}

export function getShippingOption(optionId: ShippingOptionId) {
  return SHIPPING_OPTIONS.find((o) => o.id === optionId) ?? SHIPPING_OPTIONS[0];
}
