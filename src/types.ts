export interface PaymeTransaction {
  id: string;
  time: number;
  amount: number;
  account: Record<string, string>;
  create_time: number;
  perform_time?: number;
  cancel_time?: number;
  state: number;
  reason?: number;
}

export interface PaymeStatement {
  transactions: PaymeTransaction[];
}

export interface PaymeError {
  code: number;
  message: {
    uz?: string;
    ru?: string;
    en?: string;
  };
  data?: string;
}

export interface PaymeRpcResponse {
  jsonrpc: "2.0";
  id: number;
  result?: unknown;
  error?: PaymeError;
}
