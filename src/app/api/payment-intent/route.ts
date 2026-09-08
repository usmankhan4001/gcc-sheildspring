import { NextResponse } from "next/server";
import { currency } from "@/lib/site";

const AIRWALLEX_API_BASE =
  process.env.AIRWALLEX_API_BASE ?? "https://api.airwallex.com/api/v1";

/**
 * Airwallex access tokens are valid for a short window, so we cache one per
 * process instead of re-authenticating on every checkout.
 */
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const clientId = process.env.AIRWALLEX_CLIENT_ID;
  const apiKey = process.env.AIRWALLEX_API_KEY;

  if (!clientId || !apiKey) {
    throw new Error("Airwallex credentials are not configured");
  }

  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.value;
  }

  const res = await fetch(`${AIRWALLEX_API_BASE}/authentication/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": clientId,
      "x-api-key": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error(`Airwallex authentication failed (${res.status})`);
  }

  const data = (await res.json()) as { token?: string; expires_at?: string };
  if (!data.token) {
    throw new Error("Airwallex authentication returned no token");
  }

  cachedToken = {
    value: data.token,
    // Default to 25 minutes when the API does not tell us the expiry.
    expiresAt: data.expires_at
      ? new Date(data.expires_at).getTime()
      : Date.now() + 25 * 60 * 1000,
  };

  return cachedToken.value;
}

interface CartLinePayload {
  name: string;
  quantity: number;
  unitPrice: number;
}

interface PaymentIntentRequestBody {
  amount: number;
  orderNumber: string;
  email?: string;
  lines?: CartLinePayload[];
}

export async function POST(request: Request) {
  let body: PaymentIntentRequestBody;

  try {
    body = (await request.json()) as PaymentIntentRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const amount = Number(body.amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  // Airwallex expects the minor-unit amount (cents for USD).
  const minorUnitAmount = Math.round(amount * 100);

  const origin = new URL(request.url).origin;

  try {
    const token = await getAccessToken();

    const res = await fetch(`${AIRWALLEX_API_BASE}/pa/payment_intents/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: minorUnitAmount,
        currency: currency.code,
        merchant_order_id: body.orderNumber,
        descriptor: "AGENTLUME",
        return_url: `${origin}/checkout/confirmation`,
        order: {
          type: "physical_goods",
          products: (body.lines ?? []).map((line) => ({
            name: line.name,
            quantity: line.quantity,
            unit_price: Math.round(line.unitPrice * 100),
          })),
        },
        metadata: {
          order_number: body.orderNumber,
          customer_email: body.email ?? "",
        },
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Airwallex payment intent failed", res.status, detail);
      return NextResponse.json(
        { error: "Could not initialise payment" },
        { status: 502 },
      );
    }

    const intent = (await res.json()) as {
      id?: string;
      client_secret?: string;
    };

    if (!intent.id || !intent.client_secret) {
      return NextResponse.json(
        { error: "Incomplete payment intent response" },
        { status: 502 },
      );
    }

    // Only the intent id and client_secret are safe to expose to the browser.
    return NextResponse.json({
      id: intent.id,
      clientSecret: intent.client_secret,
    });
  } catch (error) {
    console.error("Payment intent error", error);
    return NextResponse.json(
      { error: "Could not initialise payment" },
      { status: 500 },
    );
  }
}
