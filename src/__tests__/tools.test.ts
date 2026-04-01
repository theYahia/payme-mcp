import { describe, it, expect, vi, beforeEach } from "vitest";
import { createTransactionSchema } from "../tools/create-transaction.js";
import { performTransactionSchema } from "../tools/perform-transaction.js";
import { cancelTransactionSchema } from "../tools/cancel-transaction.js";
import { checkTransactionSchema } from "../tools/check-transaction.js";
import { getStatementSchema } from "../tools/get-statement.js";
import { checkPerformTransactionSchema } from "../tools/check-perform-transaction.js";
import { createPaymentLinkSchema } from "../tools/create-payment-link.js";
import { getMerchantBalanceSchema } from "../tools/get-merchant-balance.js";

describe("payme-mcp schemas", () => {
  it("validates create_transaction params", () => {
    const valid = createTransactionSchema.safeParse({
      account: { order_id: "123" },
      amount: 500000,
    });
    expect(valid.success).toBe(true);
  });

  it("rejects create_transaction with negative amount", () => {
    const invalid = createTransactionSchema.safeParse({
      account: { order_id: "123" },
      amount: -100,
    });
    expect(invalid.success).toBe(false);
  });

  it("validates perform_transaction params", () => {
    const valid = performTransactionSchema.safeParse({ transaction_id: "txn_abc" });
    expect(valid.success).toBe(true);
  });

  it("validates cancel_transaction with reason code", () => {
    const valid = cancelTransactionSchema.safeParse({
      transaction_id: "txn_abc",
      reason: 3,
    });
    expect(valid.success).toBe(true);
  });

  it("rejects cancel_transaction with invalid reason", () => {
    const invalid = cancelTransactionSchema.safeParse({
      transaction_id: "txn_abc",
      reason: 10,
    });
    expect(invalid.success).toBe(false);
  });

  it("validates check_transaction params", () => {
    const valid = checkTransactionSchema.safeParse({ transaction_id: "txn_abc" });
    expect(valid.success).toBe(true);
  });

  it("validates get_statement params", () => {
    const valid = getStatementSchema.safeParse({
      from_timestamp: 1700000000000,
      to_timestamp: 1700100000000,
    });
    expect(valid.success).toBe(true);
  });

  it("validates check_perform_transaction params", () => {
    const valid = checkPerformTransactionSchema.safeParse({
      account: { order_id: "456" },
      amount: 100000,
    });
    expect(valid.success).toBe(true);
  });

  it("validates create_payment_link params", () => {
    const valid = createPaymentLinkSchema.safeParse({
      amount: 500000,
      order_id: "ORD-789",
      return_url: "https://example.com/return",
    });
    expect(valid.success).toBe(true);
  });

  it("validates get_merchant_balance (empty params)", () => {
    const valid = getMerchantBalanceSchema.safeParse({});
    expect(valid.success).toBe(true);
  });
});

describe("PaymeClient", () => {
  beforeEach(() => {
    vi.stubEnv("PAYME_MERCHANT_ID", "");
    vi.stubEnv("PAYME_KEY", "");
  });

  it("throws when credentials are missing", async () => {
    const { PaymeClient } = await import("../client.js");
    expect(() => new PaymeClient()).toThrow("PAYME_MERCHANT_ID");
  });
});
