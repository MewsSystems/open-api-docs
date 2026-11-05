<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Balance transactions

## Get all balance transactions

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Returns the transactions that make up an enterprise's Mews Payments balance – charges, commissions, fees, payouts and adjustments – for reconciling a bank feed against Mews. Note this operation uses [Pagination](../guidelines/pagination.md) and supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/balanceTransactions/getAll`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "CreatedUtc": {
    "StartUtc": "2023-08-01T00:00:00Z",
    "EndUtc": "2023-08-31T00:00:00Z"
  },
  "EnterpriseIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "4d0201db-36f5-428b-8d11-4f0a65e960cc"
  ],
  "Limitation": {
    "Count": 100
  }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `EnterpriseIds` | array of string | optional, max 1000 items | Unique identifiers of the Enterprises. If not specified, the operation returns data for all enterprises within scope of the Access Token. |
| `BalanceTransactionIds` | array of string | optional, max 100 items | Unique identifiers of the requested transactions. |
| `CreatedUtc` | [Time interval](_objects.md#time-interval) | optional, max length 3 months | Interval in which the transaction was recorded in Mews. |
| `SettledUtc` | [Time interval](_objects.md#time-interval) | optional, max length 3 months | Interval in which the transaction was settled. |
| `States` | array of [Payment settlement state](balancetransactions.md#payment-settlement-state) | optional | Settlement states to filter transactions by. |
| `Types` | array of [Balance transaction type](payouts.md#balance-transaction-type) | optional | Transaction types to filter transactions by. |
| `PaymentProviders` | array of [Payment provider](payouts.md#payment-provider) | optional | Payment service providers to filter transactions by. |
| `PayoutIds` | array of string | optional, max 100 items | Unique identifiers of the payouts whose transactions are requested, including transactions from payouts merged into them. |
| `PaymentIds` | array of string | optional, max 100 items | Unique identifiers of the payments whose transactions are requested. |
| `Limitation` | [Limitation](../guidelines/pagination.md#limitation) | required | Limitation on the quantity of data returned and optional Cursor for the starting point of data. |

### Response

```javascript
{
  "BalanceTransactions": [
    {
      "Id": "b2c3d4e5-0000-4a00-8a00-000000000001",
      "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "Type": "Charge",
      "State": "Settled",
      "Amount": {
        "Currency": "EUR",
        "Value": 320
      },
      "Provider": "Stripe",
      "PaymentId": "f6313945-94c1-4e27-b402-031c2a8c989f",
      "GatewayIdentifier": null,
      "Description": null,
      "PayoutId": "a1b2c3d4-0000-4a00-8a00-000000000001",
      "CreatedUtc": "2023-08-14T09:12:33Z",
      "SettledUtc": "2023-08-15T00:00:00Z",
      "UpdatedUtc": "2023-08-15T00:00:00Z"
    },
    {
      "Id": "a1b2c3d4-0000-4a00-8a00-000000000001",
      "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "Type": "Payout",
      "State": "Settled",
      "Amount": {
        "Currency": "EUR",
        "Value": -1250
      },
      "Provider": "Stripe",
      "PaymentId": null,
      "GatewayIdentifier": "po_1NqYcELkdIwHu7ixblOOWTVK",
      "Description": null,
      "PayoutId": null,
      "CreatedUtc": "2023-08-15T00:00:00Z",
      "SettledUtc": "2023-08-15T00:00:00Z",
      "UpdatedUtc": "2023-08-15T00:00:00Z"
    },
    {
      "Id": "b2c3d4e5-0000-4a00-8a00-000000000003",
      "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "Type": "Charge",
      "State": "Unsettled",
      "Amount": {
        "Currency": "EUR",
        "Value": 185
      },
      "Provider": "Stripe",
      "PaymentId": "c3d4e5f6-0000-4a00-8a00-000000000001",
      "GatewayIdentifier": null,
      "Description": null,
      "PayoutId": null,
      "CreatedUtc": "2023-08-16T14:27:05Z",
      "SettledUtc": null,
      "UpdatedUtc": "2023-08-16T14:27:05Z"
    }
  ],
  "Cursor": "b2c3d4e5-0000-4a00-8a00-000000000003"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `BalanceTransactions` | array of [Balance transaction](balancetransactions.md#balance-transaction) | required, max 1000 items | The balance transactions. |
| `Cursor` | string | optional | Opaque pagination cursor, used in `Limitation` on a subsequent request to fetch the next page. Null when there are no more data. |

#### Balance transaction

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique stable identifier of the transaction. |
| `EnterpriseId` | string | required | Unique identifier of the enterprise the transaction belongs to. |
| `Type` | [Balance transaction type](payouts.md#balance-transaction-type) | required | Type of the transaction. |
| `State` | [Payment settlement state](balancetransactions.md#payment-settlement-state) | required | Settlement state of the transaction. |
| `Amount` | [Currency value (ver 2023-02-02)](_objects.md#currency-value-ver-2023-02-02) | required | Amount of the transaction, signed by its effect on the balance. A positive balance is owed to the enterprise by the payment service provider, a negative balance is owed by the enterprise. |
| `Provider` | [Payment provider](payouts.md#payment-provider) | required | Payment service provider that holds the balance the transaction belongs to. |
| `PaymentId` | string | optional | Unique identifier of the related `Payment`, when the transaction is backed by one. |
| `GatewayIdentifier` | string | optional, max length 255 characters | Identifier of the transaction at the payment service provider. |
| `Description` | string | optional | Description of the transaction. |
| `PayoutId` | string | optional | Unique identifier of the `Payout` that settled the transaction, always one returned by [Get all payouts](payouts.md#get-all-payouts). When a payout is merged into another one, its transactions are settled by the payout it was merged into. Null while the transaction is unsettled, and on a `Payout` transaction that was not merged into another one. |
| `CreatedUtc` | string | required | Date and time when the transaction was recorded in Mews, in UTC timezone in ISO 8601 format. This is when Mews booked the transaction, not necessarily when the payment service provider processed it. |
| `SettledUtc` | string | optional | Date and time when the transaction was settled, in UTC timezone in ISO 8601 format: when the `Payout` that settled it was recorded in Mews. For a `Payout` transaction that was not merged into another one, when it was itself recorded. Null while the transaction is unsettled. |
| `UpdatedUtc` | string | required | Date and time when the transaction was last updated in Mews, in UTC timezone in ISO 8601 format. |

#### Payment settlement state

* `Unsettled` - Not yet linked to a payout.
* `Settled` - Linked to a `Payout`, or is itself a `Payout`.
