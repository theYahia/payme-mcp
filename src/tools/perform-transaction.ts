import { z } from "zod";
import { PaymeClient } from "../client.js";

const client = new PaymeClient();

export const performTransactionSchema = z.object({
  transaction_id: z.string().describe("Payme transaction ID"),
});

export async function handlePerformTransaction(params: z.infer<typeof performTransactionSchema>): Promise<string> {
  const result = await client.rpc("PerformTransaction", {
    id: params.transaction_id,
  });
  return JSON.stringify(result, null, 2);
}
