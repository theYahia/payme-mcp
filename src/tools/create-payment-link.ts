import { z } from "zod";
import { PaymeClient } from "../client.js";

const client = new PaymeClient();

export const createPaymentLinkSchema = z.object({
  amount: z.number().positive().describe("Payment amount in tiyin"),
  order_id: z.string().describe("Merchant order ID"),
  return_url: z.string().url().describe("URL to redirect after payment"),
});

export async function handleCreatePaymentLink(params: z.infer<typeof createPaymentLinkSchema>): Promise<string> {
  const merchantId = client.getMerchantId();
  const encodedParams = Buffer.from(
    `m=${merchantId};ac.order_id=${params.order_id};a=${params.amount};c=${params.return_url}`
  ).toString("base64");
  const link = `https://checkout.paycom.uz/${encodedParams}`;
  return JSON.stringify({
    payment_link: link,
    amount: params.amount,
    order_id: params.order_id,
    return_url: params.return_url,
  }, null, 2);
}
