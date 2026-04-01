import { z } from "zod";
import { PaymeClient } from "../client.js";

const client = new PaymeClient();

export const checkPerformTransactionSchema = z.object({
  account: z.record(z.string()).describe("Account object to validate"),
  amount: z.number().positive().describe("Amount in tiyin to validate"),
});

export async function handleCheckPerformTransaction(params: z.infer<typeof checkPerformTransactionSchema>): Promise<string> {
  const result = await client.rpc("CheckPerformTransaction", {
    amount: params.amount,
    account: params.account,
  });
  return JSON.stringify(result, null, 2);
}
