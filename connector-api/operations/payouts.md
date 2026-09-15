<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Payouts

## Get all payouts

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Returns payouts for reconciling bank deposits against Mews. Only payouts executed by a supported payment service provider are returned, currently `Stripe` and `Adyen`, so the results may not cover an enterprise's full merchant balance. Constituent payment transactions are retrieved separately via [Get all payout transactions](payouts.md#get-all-payout-transactions). Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/payouts/getAll`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "PayoutDateUtc": {
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
| `PayoutIds` | array of string | optional, max 100 items | Unique identifiers of the requested payouts. |
| `PayoutDateUtc` | [Time interval](_objects.md#time-interval) | optional, max length 3 months | Interval in which the payout was executed. |
| `PayoutProviders` | array of [Payout provider](payouts.md#payout-provider) | optional, max 10 items | Payment service providers to filter payouts by. |
| `Limitation` | [Limitation](../guidelines/pagination.md#limitation) | required | Limitation on the quantity of data returned and optional Cursor for the starting point of data. |

### Response

```javascript
{
  "Payouts": [
    {
      "Id": "a1b2c3d4-0000-4a00-8a00-000000000001",
      "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "State": "Paid",
      "Provider": "Stripe",
      "PayoutDateUtc": "2023-08-15T00:00:00Z",
      "Amount": {
        "Currency": "EUR",
        "Value": 1250
      },
      "BankDescriptor": "MEWS PAYOUT 12345"
    }
  ],
  "Cursor": null
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Payouts` | array of [Payout](payouts.md#payout) | required, max 1000 items | The payouts. |
| `Cursor` | string | optional | Unique identifier of the last returned payout, used as the starting point of the next data page. Null when there are no more data. |

#### Payout

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique stable identifier of the payout. |
| `EnterpriseId` | string | required | Unique identifier of the enterprise that owns the payout. |
| `State` | [Payout state](payouts.md#payout-state) | required | Current state of the payout. |
| `Provider` | [Payout provider](payouts.md#payout-provider) | required | Payment service provider that executed the payout. |
| `PayoutDateUtc` | string | optional | Date and time the payout was recorded in Mews, in UTC timezone in ISO 8601 format. This is not the date the funds arrived in the destination bank account. |
| `Amount` | [Currency value (ver 2023-02-02)](_objects.md#currency-value-ver-2023-02-02) | required | Total net amount paid out to the destination bank account, after fees and deductions. The individual fee and deduction transactions are available through the payout's transactions. |
| `BankDescriptor` | string | optional | Payout descriptor currently configured for the integration, as used on bank statements. Reflects the current configuration and may differ from the descriptor shown on statements of older payouts. |

#### Payout state

* `Pending` - The payout has been initiated but is not yet confirmed as paid.
* `Paid` - The payout has been paid out to the destination bank account.
* `Failed` - The payout failed and the funds were not paid out.

#### Payout provider

* `Adyen` - Adyen
* `Stripe` - Stripe

## Get all payout transactions

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Returns the payment transactions that compose payouts, filtered by payout. Only payouts executed by a supported payment service provider are covered, currently `Stripe` and `Adyen`. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/payoutTransactions/getAll`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "PayoutIds": [
    "a1b2c3d4-0000-4a00-8a00-000000000001"
  ],
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
| `PayoutIds` | array of string | required, max 100 items | Unique identifiers of the payouts whose transactions are requested. |
| `Limitation` | [Limitation](../guidelines/pagination.md#limitation) | required | Limitation on the quantity of data returned and optional Cursor for the starting point of data. |

### Response

```javascript
{
  "PayoutTransactions": [
    {
      "Id": "a1b2c3d4-0000-4a00-8a00-000000000002",
      "PayoutId": "a1b2c3d4-0000-4a00-8a00-000000000001",
      "Type": "Charge",
      "Amount": {
        "Currency": "EUR",
        "Value": 1312.5
      },
      "PaymentId": "f6313945-94c1-4e27-b402-031c2a8c989f",
      "InvoiceReferences": [
        "INV-2023-0042"
      ],
      "CreatedUtc": "2023-08-14T10:15:00Z"
    }
  ],
  "Cursor": null
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `PayoutTransactions` | array of [Payout transaction](payouts.md#payout-transaction) | required, max 1000 items | The payout transactions. |
| `Cursor` | string | optional | Unique identifier of the last returned transaction, used as the starting point of the next data page. Null when there are no more data. |

#### Payout transaction

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique stable identifier of the transaction, kept stable over time for re-fetch and reconciliation. |
| `PayoutId` | string | required | Unique identifier of the payout this transaction belongs to. |
| `Type` | [Payout transaction type](payouts.md#payout-transaction-type) | required | Type of the transaction. |
| `Amount` | [Currency value (ver 2023-02-02)](_objects.md#currency-value-ver-2023-02-02) | required | Amount of the transaction. |
| `PaymentId` | string | optional | Unique identifier of the related payment, when the transaction is backed by one. |
| `InvoiceReferences` | array of string | optional, max 100 items | Invoice references associated with the transaction, when available. |
| `CreatedUtc` | string | optional | Date and time the transaction was created, in UTC timezone in ISO 8601 format. This is the date of the underlying transaction rather than of the payout, so it can fall outside the interval used to filter payouts. |

#### Payout transaction type

* `Charge` - A payment charge included in the payout.
* `MerchantCommission` - Commission charged by Mews.
* `PlatformFee` - Platform fee charged by the payment service provider.
* `CommissionAdjustment` - An adjustment to a previously charged commission.
* `ReserveAdjustment` - An adjustment to the chargeback reserve held for the account.
* `BalanceTopUp` - A top-up of the account balance.
