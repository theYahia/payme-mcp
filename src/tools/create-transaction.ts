import { z } from "zod";
import { PaymeClient } from "../client.js";

const client = new PaymeClient();

export const createTransactionSchema = z.object({
  account: z.record(z.string()).describe("Account object (e.g. {order_id: '123'})"),
  amount: z.number().positive().describe("Amount in tiyin (1 UZS = 100 tiyin)"),
});

export async function handleCreateTransaction(params: z.infer<typeof createTransactionSchema>): Promise<string> {
  const result = await client.rpc("CreateTransaction", {
    id: crypto.randomUUID(),
    time: Date.now(),
    amount: params.amount,
    account: params.account,
  });
  return JSON.stringify(result, null, 2);
}
