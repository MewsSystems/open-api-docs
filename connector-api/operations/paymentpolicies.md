<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Payment policies

## Get all payment policies

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Returns all payment policies matching the specified filter parameters. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/paymentPolicies/getAll`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "UpdatedUtc": {
    "StartUtc": "2023-10-01T00:00:00Z",
    "EndUtc": "2023-10-31T00:00:00Z"
  },
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
| `PaymentPolicyIds` | array of string | optional, max 100 items | Unique identifiers of the payment policies. |
| `UpdatedUtc` | [Time interval](_objects.md#time-interval) | optional, max length 3 months | Interval in which the payment policy was updated. |
| `ActivityStates` | array of [Activity state](_objects.md#activity-state) | optional | Whether to return only active, only deleted, or both types of record. If not specified, only active records will be returned. |
| `Limitation` | [Limitation](../guidelines/pagination.md#limitation) | required | Limitation on the quantity of data returned and optional Cursor for the starting point of data. |

### Response

```javascript
{
  "PaymentPolicies": [
    {
      "Id": "e2a8a5d3-71f4-4b52-a8d0-2b963f660001",
      "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "CreatedUtc": "2023-10-01T00:00:00Z",
      "UpdatedUtc": "2023-10-01T00:00:00Z",
      "SettlementAction": "ChargeCreditCard",
      "SettlementTrigger": "Confirmation",
      "SettlementType": "Automatic",
      "SettlementOffset": "P0Y0M0DT0H0M0S",
      "RelativeValue": 0.5,
      "AbsoluteValue": null,
      "IsActive": true,
      "Name": null
    }
  ],
  "Cursor": null
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `PaymentPolicies` | array of [Payment policy](paymentpolicies.md#payment-policy) | required, max 1000 items | The payment policies. |
| `Cursor` | string | optional | Pagination cursor for retrieving the next page of results. Null if there are no more results. |

#### Payment policy

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the payment policy. |
| `EnterpriseId` | string | required | Unique identifier of the enterprise the payment policy belongs to. |
| `CreatedUtc` | string | required | Date and time of the payment policy creation in UTC timezone in ISO 8601 format. |
| `UpdatedUtc` | string | required | Date and time of the last update of the payment policy in UTC timezone in ISO 8601 format. |
| `SettlementAction` | [Payment policy settlement action](paymentpolicies.md#payment-policy-settlement-action) | required | Whether the policy charges the credit card or creates a preauthorization. |
| `SettlementTrigger` | [Payment policy settlement trigger](paymentpolicies.md#payment-policy-settlement-trigger) | required | The event that triggers the settlement. |
| `SettlementType` | [Payment policy settlement type](paymentpolicies.md#payment-policy-settlement-type) | required | Whether the settlement is manual or automatic. |
| `SettlementOffset` | string | required | ISO 8601 duration offset applied relative to the settlement trigger. |
| `RelativeValue` | number | optional | Relative portion of the total amount to settle, expressed as a fraction of 1 (e.g. `0.5` means 50%). Non-null when the policy is relative; null when absolute. |
| `AbsoluteValue` | [Currency value (ver 2023-02-02)](_objects.md#currency-value-ver-2023-02-02) | optional | Gross flat amount to settle. Non-null when the policy is absolute; null when relative. |
| `IsActive` | boolean | required | Whether the payment policy is still active. |
| `Name` | string | optional | Name of the payment policy. Null when not defined. |

#### Payment policy settlement action

* `ChargeCreditCard` - The amount is charged to the credit card.
* `CreatePreauthorization` - An authorization hold is placed on the credit card without charging it.

#### Payment policy settlement trigger

* `Confirmation` - Settlement is triggered when the reservation is confirmed.
* `Start` - Settlement is triggered at the start of the reservation.
* `End` - Settlement is triggered at the end of the reservation.
* `StartDate` - Settlement is triggered on a specific date before the reservation start date.
* `EndDate` - Settlement is triggered on a specific date before the reservation end date.

#### Payment policy settlement type

* `Manual` - Mews creates a task for hotel staff to initiate the settlement manually from the Mews UI. The integration is not the executor.
* `Automatic` - Mews automatically processes the settlement at the trigger moment without any human intervention.
