# payme-mcp

MCP server for Payme payment system (Uzbekistan). Uses JSON-RPC 2.0 protocol. Supports transactions, statements, payment links, and balance queries.

## Tools (8)

| Tool | Description |
|------|-------------|
| `create_transaction` | Create a new Payme transaction |
| `perform_transaction` | Confirm/perform a transaction |
| `cancel_transaction` | Cancel a transaction with reason |
| `check_transaction` | Check transaction status |
| `get_statement` | Get transactions for a time range |
| `check_perform_transaction` | Validate before creating |
| `create_payment_link` | Generate a checkout link |
| `get_merchant_balance` | Get merchant balance |

## Quick Start

```json
{
  "mcpServers": {
    "payme": {
      "command": "npx",
      "args": ["-y", "@theyahia/payme-mcp"],
      "env": {
        "PAYME_MERCHANT_ID": "<YOUR_MERCHANT_ID>",
        "PAYME_KEY": "<YOUR_KEY>"
      }
    }
  }
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PAYME_MERCHANT_ID` | Yes | Merchant ID from Paycom dashboard |
| `PAYME_KEY` | Yes | API key from Paycom dashboard |

## Demo Prompts

- "Create a transaction for 50000 UZS for order #789"
- "Check the status of transaction txn_abc123"
- "Cancel transaction txn_abc123 with reason code 3"
- "Get all transactions from March 1 to March 31"
- "Generate a payment link for 100000 UZS"

## License

MIT
