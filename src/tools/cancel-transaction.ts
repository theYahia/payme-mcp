import { z } from "zod";
import { PaymeClient } from "../client.js";

const client = new PaymeClient();

export const cancelTransactionSchema = z.object({
  transaction_id: z.string().describe("Payme transaction ID"),
  reason: z.number().int().min(1).max(5).describe("Cancel reason code (1-5)"),
});

export async function handleCancelTransaction(params: z.infer<typeof cancelTransactionSchema>): Promise<string> {
  const result = await client.rpc("CancelTransaction", {
    id: params.transaction_id,
    reason: params.reason,
  });
  return JSON.stringify(result, null, 2);
}
