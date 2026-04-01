import { z } from "zod";
import { PaymeClient } from "../client.js";

const client = new PaymeClient();

export const getMerchantBalanceSchema = z.object({});

export async function handleGetMerchantBalance(_params: z.infer<typeof getMerchantBalanceSchema>): Promise<string> {
  const result = await client.rpc("GetBalance", {});
  return JSON.stringify(result, null, 2);
}
