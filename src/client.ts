const BASE_URL = "https://checkout.paycom.uz/api";
const TIMEOUT = 15_000;

let rpcId = 1;

export class PaymeClient {
  private merchantId: string;
  private key: string;

  constructor() {
    this.merchantId = process.env.PAYME_MERCHANT_ID ?? "";
    this.key = process.env.PAYME_KEY ?? "";
    if (!this.merchantId || !this.key) {
      throw new Error(
        "Environment variables PAYME_MERCHANT_ID and PAYME_KEY are required. " +
        "Get credentials at https://developer.help.paycom.uz/"
      );
    }
  }

  private get authHeader(): string {
    return "Basic " + Buffer.from(`Paycom:${this.key}`).toString("base64");
  }

  async rpc(method: string, params: Record<string, unknown>): Promise<unknown> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT);

    const body = {
      jsonrpc: "2.0",
      id: rpcId++,
      method,
      params,
    };

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Authorization": this.authHeader,
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-Auth": this.merchantId,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timer);

      const data = (await response.json()) as {
        result?: unknown;
        error?: { code: number; message: Record<string, string>; data?: string };
      };

      if (data.error) {
        const msg = data.error.message?.en || data.error.message?.ru || JSON.stringify(data.error.message);
        throw new Error(`Payme RPC error ${data.error.code}: ${msg}`);
      }

      return data.result;
    } catch (error) {
      clearTimeout(timer);
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("Payme: request timeout (15s). Try again later.");
      }
      throw error;
    }
  }

  getMerchantId(): string {
    return this.merchantId;
  }
}
