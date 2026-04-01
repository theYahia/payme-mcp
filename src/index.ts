#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createTransactionSchema, handleCreateTransaction } from "./tools/create-transaction.js";
import { performTransactionSchema, handlePerformTransaction } from "./tools/perform-transaction.js";
import { cancelTransactionSchema, handleCancelTransaction } from "./tools/cancel-transaction.js";
import { checkTransactionSchema, handleCheckTransaction } from "./tools/check-transaction.js";
import { getStatementSchema, handleGetStatement } from "./tools/get-statement.js";
import { checkPerformTransactionSchema, handleCheckPerformTransaction } from "./tools/check-perform-transaction.js";
import { createPaymentLinkSchema, handleCreatePaymentLink } from "./tools/create-payment-link.js";
import { getMerchantBalanceSchema, handleGetMerchantBalance } from "./tools/get-merchant-balance.js";

const server = new McpServer({ name: "payme-mcp", version: "1.0.0" });

server.tool("create_transaction", "Create a new Payme transaction (JSON-RPC).", createTransactionSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreateTransaction(params) }] }));

server.tool("perform_transaction", "Perform (confirm) a created transaction.", performTransactionSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handlePerformTransaction(params) }] }));

server.tool("cancel_transaction", "Cancel a transaction with a reason code.", cancelTransactionSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCancelTransaction(params) }] }));

server.tool("check_transaction", "Check transaction status.", checkTransactionSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCheckTransaction(params) }] }));

server.tool("get_statement", "Get transaction statement for a time period.", getStatementSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetStatement(params) }] }));

server.tool("check_perform_transaction", "Validate if a transaction can be performed.", checkPerformTransactionSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCheckPerformTransaction(params) }] }));

server.tool("create_payment_link", "Generate a Payme checkout payment link.", createPaymentLinkSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreatePaymentLink(params) }] }));

server.tool("get_merchant_balance", "Get merchant account balance.", getMerchantBalanceSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetMerchantBalance(params) }] }));

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[payme-mcp] Server started. 8 tools registered.");
}

main().catch((error) => { console.error("[payme-mcp] Error:", error); process.exit(1); });
