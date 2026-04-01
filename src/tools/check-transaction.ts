import { z } from "zod";
import { PaymeClient } from "../client.js";

const client = new PaymeClient();

export const checkTransactionSchema = z.object({
  transaction_id: z.string().describe("Payme transaction ID"),
});

export async function handleCheckTransaction(params: z.infer<typeof checkTransactionSchema>): Promise<string> {
  const result = await client.rpc("CheckTransaction", {
    id: params.transaction_id,
  });
  return JSON.stringify(result, null, 2);
}
