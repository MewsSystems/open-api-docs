<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Payment policy assignments

## Get all payment policy assignments

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Returns all payment policy assignments matching the specified filter parameters. An assignment links a payment policy to a rate group or rate. Override assignments are not included. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/paymentPolicyAssignments/getAll`

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
| `PaymentPolicyAssignmentIds` | array of string | optional, max 100 items | Unique identifiers of the payment policy assignments. |
| `PaymentPolicyIds` | array of string | optional, max 100 items | Unique identifiers of the payment policies. |
| `RateGroupIds` | array of string | optional, max 100 items | Unique identifiers of the rate groups. |
| `RateIds` | array of string | optional, max 100 items | Unique identifiers of the rates. |
| `UpdatedUtc` | [Time interval](_objects.md#time-interval) | optional, max length 3 months | Interval in which the payment policy assignment was updated. |
| `ActivityStates` | array of [Activity state](_objects.md#activity-state) | optional | Whether to return only active, only deleted, or both types of record. If not specified, only active records will be returned. |
| `Limitation` | [Limitation](../guidelines/pagination.md#limitation) | required | Limitation on the quantity of data returned and optional Cursor for the starting point of data. |

### Response

```javascript
{
  "PaymentPolicyAssignments": [
    {
      "Id": "7c6e8f12-3a4b-4d5e-9f00-1b2c3d4e5f60",
      "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "PaymentPolicyId": "e2a8a5d3-71f4-4b52-a8d0-2b963f660001",
      "RateGroupId": "3b9b8e29-e3da-4b6c-bb59-f50020b51a3b",
      "RateId": null,
      "CreatedUtc": "2023-10-01T00:00:00Z",
      "UpdatedUtc": "2023-10-01T00:00:00Z",
      "IsActive": true
    }
  ],
  "Cursor": null
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `PaymentPolicyAssignments` | array of [Payment policy assignment](paymentpolicyassignments.md#payment-policy-assignment) | required, max 1000 items | The payment policy assignments. |
| `Cursor` | string | optional | Pagination cursor for retrieving the next page of results. Null if there are no more results. |

#### Payment policy assignment

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the payment policy assignment. |
| `EnterpriseId` | string | required | Unique identifier of the enterprise the payment policy assignment belongs to. |
| `PaymentPolicyId` | string | required | Unique identifier of the payment policy. |
| `RateGroupId` | string | optional | Unique identifier of the rate group this policy is assigned to. Null when the assignment is at the rate level. |
| `RateId` | string | optional | Unique identifier of the rate this policy is assigned to. Null when the assignment is at the rate group level. |
| `CreatedUtc` | string | required | Date and time of the payment policy assignment creation in UTC timezone in ISO 8601 format. |
| `UpdatedUtc` | string | required | Date and time of the last update of the payment policy assignment in UTC timezone in ISO 8601 format. |
| `IsActive` | boolean | required | Whether the payment policy assignment is still active. |
