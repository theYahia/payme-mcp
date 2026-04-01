import { z } from "zod";
import { PaymeClient } from "../client.js";

const client = new PaymeClient();

export const getStatementSchema = z.object({
  from_timestamp: z.number().describe("Start timestamp in milliseconds"),
  to_timestamp: z.number().describe("End timestamp in milliseconds"),
});

export async function handleGetStatement(params: z.infer<typeof getStatementSchema>): Promise<string> {
  const result = await client.rpc("GetStatement", {
    from: params.from_timestamp,
    to: params.to_timestamp,
  });
  return JSON.stringify(result, null, 2);
}
