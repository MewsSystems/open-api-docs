<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Cancellation policies

## Get all cancellation policies

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.
Returns all cancellation policies, filtered by services, rate groups and other filters. 
Note this operation uses [Pagination](../guidelines/pagination.md) and supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/cancellationPolicies/getAll`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "EnterpriseIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "4d0201db-36f5-428b-8d11-4f0a65e960cc"
  ],
  "ServiceIds": [
    "e654f217-d1b5-46be-a820-e93ba568dfac"
  ],
  "CancellationPolicyIds": [
    "fe795f96-0b64-445b-89ed-c032563f2bac"
  ],
  "RateGroupIds": [
    "deb9444e-6897-4f2a-86b4-aff100c2896e"
  ],
  "UpdatedUtc": {
    "StartUtc": "2023-04-27T11:48:57Z",
    "EndUtc": "2023-04-27T11:48:57Z"
  },
  "Limitation": {
    "Count": 10
  }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `EnterpriseIds` | array of string | optional, max 1000 items | Unique identifiers of the Enterprises. If not specified, the operation returns data for all enterprises within scope of the Access Token. |
| `ServiceIds` | array of string | required, max 100 items | Unique identifiers of the [Service](services.md#service). |
| `CancellationPolicyIds` | array of string | optional, max 1000 items | Unique identifiers of the [Cancellation Policy](cancellationpolicies.md#cancellationpolicy). Required if no other filter is provided. |
| `RateGroupIds` | array of string | optional, max 1000 items | Unique identifiers of the [Rate group](rates.md#rategroup). Required if no other filter is provided. |
| `UpdatedUtc` | [Time interval](_objects.md#time-interval) | optional, max length 3 months | Interval in which the Cancellation Policy was updated. Required if no other filter is provided. |
| `ActivityStates` | array of [Activity state](_objects.md#activity-state) | optional | Whether to return only active, only deleted, or both types of record. If not specified, only active records will be returned. |
| `Limitation` | [Limitation](../guidelines/pagination.md#limitation) | required | Limitation on the quantity of data returned and optional Cursor for the starting point of data. |

### Response

```javascript
{
  "CancellationPolicies": [
    {
      "Id": "769fc613-838f-41a7-ac2a-aff100c3189f",
      "RateGroupId": "deb9444e-6897-4f2a-86b4-aff100c2896e",
      "CreatedUtc": "2023-04-27T11:48:57Z",
      "UpdatedUtc": "2023-04-27T11:48:57Z",
      "Applicability": "Creation",
      "FeeExtent": [
        "TimeUnits",
        "Products"
      ],
      "ApplicabilityOffset": "0M0D0:0:0.0",
      "FeeMaximumTimeUnits": 0,
      "AbsoluteFee": {
        "Currency": "EUR",
        "Value": 15
      },
      "RelativeFee": 0
    }
  ],
  "Cursor": "769fc613-838f-41a7-ac2a-aff100c3189f"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CancellationPolicies` | array of [Cancellation Policy](cancellationpolicies.md#cancellation-policy) | required, max 1000 items | The filtered cancellation policies. |
| `Cursor` | string | optional | Unique identifier of the last and hence oldest cancellation policy returned. This can be used in [Limitation](../guidelines/pagination.md#limitation) in a subsequent request to fetch the next batch of older cancellation policies. |

#### Cancellation Policy

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the cancellation policy. |
| `RateGroupId` | string | required | Unique identifier of the rate group the cancellation policy belongs to. |
| `CreatedUtc` | string | required | Date and time of the cancellation policy creation in UTC timezone in ISO 8601 format. |
| `UpdatedUtc` | string | required | Date and time of the cancellation policy update in UTC timezone in ISO 8601 format. |
| `Applicability` | [Cancellation Policy Applicability](cancellationpolicies.md#cancellation-policy-applicability) | required | Applicability mode of the cancellation policy. |
| `FeeExtent` | array of [Cancellation Fee Extent](cancellationpolicies.md#cancellation-fee-extent) | required | Extent for the cancellation fee, i.e. what should be in scope for the automatic payment. |
| `ApplicabilityOffset` | string | required | Offset for order start (assuming Applicability is set to Start) from which the fee is applied. |
| `FeeMaximumTimeUnits` | integer | optional | Maximum number of time units the cancellation fee is applicable to. |
| `AbsoluteFee` | [Currency value (ver 2023-02-02)](_objects.md#currency-value-ver-2023-02-02) | required | Absolute value of the fee. |
| `RelativeFee` | number | required | Relative value of the fee, as a percentage of the reservation price. |
| `IsActive` | boolean | required | Whether the cancellation policy is still active. |

#### Cancellation Policy Applicability

* `Creation`
* `Start`
* `StartDate`

#### Cancellation Fee Extent

* `TimeUnits`
* `Products`

## Get cancellation policies by reservations

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Gets cancellation policies for enterprise grouped by reservation for granular cancellation policies flow. This operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/cancellationPolicies/getByReservations`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "ReservationIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "4d0201db-36f5-428b-8d11-4f0a65e960cc"
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `ReservationIds` | array of string | required, max 100 items | Unique identifiers of the `Reservation`. |

### Response

```javascript
{
  "CancellationPolicies": [
    {
      "ReservationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "Policies": [
        {
          "Applicability": "Start",
          "FeeExtents": [
            "TimeUnits",
            "Products"
          ],
          "ApplicabilityOffset": "P10DT20H30M",
          "FeeMaximumTimeUnits": 1,
          "AbsoluteFee": {
            "Currency": "EUR",
            "Value": 20
          },
          "RelativeFee": 0.1
        }
      ]
    },
    {
      "ReservationId": "4d0201db-36f5-428b-8d11-4f0a65e960cc",
      "Policies": [
        {
          "Applicability": "Start",
          "FeeExtents": [
            "TimeUnits",
            "Products"
          ],
          "ApplicabilityOffset": "P5DT10H30M",
          "FeeMaximumTimeUnits": 2,
          "AbsoluteFee": {
            "Currency": "EUR",
            "Value": 15
          },
          "RelativeFee": 0.4
        },
        {
          "Applicability": "Start",
          "FeeExtents": [
            "TimeUnits",
            "Products"
          ],
          "ApplicabilityOffset": "P10DT10H30M",
          "FeeMaximumTimeUnits": 2,
          "AbsoluteFee": {
            "Currency": "EUR",
            "Value": 15
          },
          "RelativeFee": 0.2
        }
      ]
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CancellationPolicies` | array of [Cancellation policy data grouped by reservation](cancellationpolicies.md#cancellation-policy-data-grouped-by-reservation) | required, max 1300 items | List of cancellation policies data grouped by reservation. |

#### Cancellation policy data grouped by reservation

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ReservationId` | string | required | Unique identifier of the reservation. |
| `Policies` | array of [Cancellation policy data](cancellationpolicies.md#cancellation-policy-data) | required | Collection of cancellation policy data. |

#### Cancellation policy data

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Applicability` | [Cancellation Policy Applicability](cancellationpolicies.md#cancellation-policy-applicability) | required | Applicability mode of the cancellation policy. |
| `FeeExtents` | array of [Cancellation Fee Extent](cancellationpolicies.md#cancellation-fee-extent) | required | Extent for the cancellation fee, i.e. what should be in scope for the automatic payment. |
| `ApplicabilityOffset` | string | required | Offset for order start (assuming Applicability is set to Start) from which the fee is applied in ISO 8601 duration format. |
| `FeeMaximumTimeUnits` | integer | optional | Maximum number of time units the cancellation fee is applicable to. |
| `AbsoluteFee` | [Currency value (ver 2023-02-02)](_objects.md#currency-value-ver-2023-02-02) | required | Absolute value of the fee. |
| `RelativeFee` | number | required | Relative value of the fee, as a percentage of the reservation price. |

## Get cancellation policies by rates

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Gets cancellation policies for enterprise grouped by rate for granular cancellation policies flow. This operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/cancellationPolicies/getByRates`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "RateIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "4d0201db-36f5-428b-8d11-4f0a65e960cc"
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `RateIds` | array of string | required, max 100 items | Unique identifiers of the `Rate`. |
| `ReservationStartUtc` | string | required | Start of the reservation interval in UTC timezone in ISO 8601 format. |
| `ReservationEndUtc` | string | required | End of the reservation interval in UTC timezone in ISO 8601 format. |

### Response

```javascript
{
  "CancellationPolicies": [
    {
      "RateId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "Policies": [
        {
          "Applicability": "Start",
          "FeeExtents": [
            "TimeUnits",
            "Products"
          ],
          "ApplicabilityOffset": "P10DT20H30M",
          "FeeMaximumTimeUnits": 1,
          "AbsoluteFee": {
            "Currency": "EUR",
            "Value": 20
          },
          "RelativeFee": 0.1
        }
      ]
    },
    {
      "RateId": "4d0201db-36f5-428b-8d11-4f0a65e960cc",
      "Policies": [
        {
          "Applicability": "Start",
          "FeeExtents": [
            "TimeUnits",
            "Products"
          ],
          "ApplicabilityOffset": "P5DT10H30M",
          "FeeMaximumTimeUnits": 2,
          "AbsoluteFee": {
            "Currency": "EUR",
            "Value": 15
          },
          "RelativeFee": 0.4
        },
        {
          "Applicability": "Start",
          "FeeExtents": [
            "TimeUnits",
            "Products"
          ],
          "ApplicabilityOffset": "P10DT10H30M",
          "FeeMaximumTimeUnits": 2,
          "AbsoluteFee": {
            "Currency": "EUR",
            "Value": 15
          },
          "RelativeFee": 0.2
        }
      ]
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CancellationPolicies` | array of [Cancellation policy data grouped by rate](cancellationpolicies.md#cancellation-policy-data-grouped-by-rate) | required, max 1300 items | List of cancellation policies data grouped by rate. |

#### Cancellation policy data grouped by rate

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `RateId` | string | required | Unique identifier of the `Rate`. |
| `Policies` | array of [Cancellation policy data](cancellationpolicies.md#cancellation-policy-data) | required | Collection of cancellation policy data. |

## Add cancellation policies

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Adds one or more cancellation policies to the specified enterprise. This operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/cancellationPolicies/add`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "CancellationPolicies": [
    {
      "Applicability": "Start",
      "FeeExtents": [
        "TimeUnits",
        "Products"
      ],
      "ApplicabilityOffset": "P0M-1DT0H0M0S",
      "FeeMaximumTimeUnits": 1,
      "AbsoluteFee": {
        "Currency": "EUR",
        "Value": 50
      },
      "RelativeFee": 0.5,
      "Name": "Standard cancellation policy",
      "ExternalIdentifier": "standard-policy"
    }
  ],
  "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `EnterpriseId` | string | optional | Unique identifier of the enterprise. Required when using [Portfolio Access Tokens](../concepts/multi-property.md), ignored otherwise. |
| `CancellationPolicies` | array of [Cancellation policy add parameters](cancellationpolicies.md#cancellation-policy-add-parameters) | required, max 100 items | Parameters of the new cancellation policies to be created. |

#### Cancellation policy add parameters

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Applicability` | [Cancellation Policy Applicability](cancellationpolicies.md#cancellation-policy-applicability) | required | Applicability mode of the cancellation policy. |
| `FeeExtents` | array of [Cancellation Fee Extent](cancellationpolicies.md#cancellation-fee-extent) | required, max 10 items | Extent for the cancellation fee, i.e. what should be in scope for the automatic payment. |
| `ApplicabilityOffset` | string | optional | Offset from which the fee is applied in ISO 8601 duration format. Defaults to zero when not provided. |
| `FeeMaximumTimeUnits` | integer | optional | Maximum number of time units the cancellation fee is applicable to. |
| `AbsoluteFee` | [Currency value (ver 2023-02-02)](_objects.md#currency-value-ver-2023-02-02) | required | Absolute value of the fee. |
| `RelativeFee` | number | required | Relative value of the fee, as a percentage of the reservation price. Must be between 0 and 1. Defaults to 0. |
| `Name` | string | optional, max length 255 characters | Name of the cancellation policy. |
| `ExternalIdentifier` | string | optional, max length 255 characters | Identifier of the cancellation policy from an external system, unique within the enterprise. Use it to reference the policy from your own system. Adding another policy with the same external identifier in the same enterprise is rejected. Note that `add` always creates a new policy; it never updates an existing one matched by this identifier. |

### Response

```javascript
{
  "CancellationPolicies": [
    {
      "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "CreatedUtc": "2023-02-02T00:00:00Z",
      "UpdatedUtc": "2023-02-02T00:00:00Z",
      "IsActive": true,
      "Applicability": "Start",
      "FeeExtents": [
        "TimeUnits",
        "Products"
      ],
      "ApplicabilityOffset": "P0M-1DT0H0M0S",
      "FeeMaximumTimeUnits": 1,
      "AbsoluteFee": {
        "Currency": "EUR",
        "Value": 50
      },
      "RelativeFee": 0.5,
      "Name": "Standard cancellation policy",
      "ExternalIdentifier": "standard-policy"
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CancellationPolicies` | array of [Cancellation policy modification data](cancellationpolicies.md#cancellation-policy-modification-data) | required, max 100 items | Cancellation policies affected by the operation. |

#### Cancellation policy modification data

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the cancellation policy. |
| `EnterpriseId` | string | required | Unique identifier of the enterprise the cancellation policy belongs to. |
| `CreatedUtc` | string | required | Creation date and time of the cancellation policy in UTC timezone in ISO 8601 format. |
| `UpdatedUtc` | string | required | Last update date and time of the cancellation policy in UTC timezone in ISO 8601 format. |
| `IsActive` | boolean | required | Whether the cancellation policy is still active. |
| `Applicability` | [Cancellation Policy Applicability](cancellationpolicies.md#cancellation-policy-applicability) | required | Applicability mode of the cancellation policy. |
| `FeeExtents` | array of [Cancellation Fee Extent](cancellationpolicies.md#cancellation-fee-extent) | required | Extent for the cancellation fee, i.e. what should be in scope for the automatic payment. |
| `ApplicabilityOffset` | string | required | Offset from which the fee is applied in ISO 8601 duration format. |
| `FeeMaximumTimeUnits` | integer | optional | Maximum number of time units the cancellation fee is applicable to. |
| `AbsoluteFee` | [Currency value (ver 2023-02-02)](_objects.md#currency-value-ver-2023-02-02) | required | Absolute value of the fee. |
| `RelativeFee` | number | required | Relative value of the fee, as a percentage of the reservation price. |
| `Name` | string | optional | Name of the cancellation policy. |
| `ExternalIdentifier` | string | optional | Identifier of the cancellation policy from an external system, unique within the enterprise, that can be used to reference the policy from your own system. |

#### Cancellation Policy Applicability

* `Creation`
* `Start`
* `StartDate`

#### Cancellation Fee Extent

* `Nothing`
* `TimeUnits`
* `Products`
* `Everything`

## Update cancellation policies

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Updates one or more existing cancellation policies. Only the fields that are set are updated. Cancellation policies managed by portfolio cannot be updated. This operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/cancellationPolicies/update`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "CancellationPolicyUpdates": [
    {
      "CancellationPolicyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "AbsoluteFee": {
        "Value": {
          "Currency": "EUR",
          "Value": 75
        }
      },
      "RelativeFee": {
        "Value": 0.75
      },
      "Name": {
        "Value": "Updated cancellation policy"
      }
    }
  ],
  "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `EnterpriseId` | string | optional | Unique identifier of the enterprise. Required when using [Portfolio Access Tokens](../concepts/multi-property.md), ignored otherwise. |
| `CancellationPolicyUpdates` | array of [Cancellation policy update parameters](cancellationpolicies.md#cancellation-policy-update-parameters) | required, max 100 items | Details of the cancellation policies to be updated. |

#### Cancellation policy update parameters

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CancellationPolicyId` | string | required | Unique identifier of the cancellation policy to be updated. |
| `Applicability` | [Cancellation Policy Applicability update value](cancellationpolicies.md#cancellation-policy-applicability-update-value) | optional | Applicability mode of the cancellation policy (or null if it should not be updated). |
| `FeeExtents` | [Cancellation Fee Extent array update value](cancellationpolicies.md#cancellation-fee-extent-array-update-value) | optional | Extent for the cancellation fee, up to 10 values (or null if it should not be updated). |
| `ApplicabilityOffset` | [String update value](_objects.md#string-update-value) | optional | Offset from which the fee is applied in ISO 8601 duration format. Set the inner value to null to reset it to zero (or null if it should not be updated). |
| `FeeMaximumTimeUnits` | [Number update value](_objects.md#number-update-value) | optional | Maximum number of time units the cancellation fee is applicable to. Set the inner value to null to clear it (or null if it should not be updated). |
| `AbsoluteFee` | [Currency value (ver 2023-02-02) update value](cancellationpolicies.md#currency-value-ver-2023-02-02-update-value) | optional | Absolute value of the fee (or null if it should not be updated). |
| `RelativeFee` | [Decimal update value](_objects.md#decimal-update-value) | optional | Relative value of the fee, as a percentage of the reservation price. Must be between 0 and 1 (or null if it should not be updated). |
| `Name` | [String update value](_objects.md#string-update-value) | optional | Name of the cancellation policy. Set the inner value to null to clear it (or null if it should not be updated). |
| `ExternalIdentifier` | [String update value](_objects.md#string-update-value) | optional | Identifier of the cancellation policy from an external system, unique within the enterprise, used to reference the policy from your own system. Set the inner value to null to clear it (or null if it should not be updated). |

#### Cancellation Policy Applicability update value

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Value` | [Cancellation Policy Applicability](cancellationpolicies.md#cancellation-policy-applicability) | required | Value which is to be updated. |

#### Cancellation Fee Extent array update value

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Value` | array of [Cancellation Fee Extent](cancellationpolicies.md#cancellation-fee-extent) | optional | Value which is to be updated. |

#### Currency value (ver 2023-02-02) update value

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Value` | [Currency value (ver 2023-02-02)](_objects.md#currency-value-ver-2023-02-02) | optional | Value which is to be updated. |

### Response

```javascript
{
  "CancellationPolicies": [
    {
      "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "CreatedUtc": "2023-02-02T00:00:00Z",
      "UpdatedUtc": "2023-02-02T00:00:00Z",
      "IsActive": true,
      "Applicability": "Start",
      "FeeExtents": [
        "TimeUnits",
        "Products"
      ],
      "ApplicabilityOffset": "P0M-1DT0H0M0S",
      "FeeMaximumTimeUnits": 1,
      "AbsoluteFee": {
        "Currency": "EUR",
        "Value": 50
      },
      "RelativeFee": 0.5,
      "Name": "Standard cancellation policy",
      "ExternalIdentifier": "standard-policy"
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CancellationPolicies` | array of [Cancellation policy modification data](cancellationpolicies.md#cancellation-policy-modification-data) | required, max 100 items | Cancellation policies affected by the operation. |

## Delete cancellation policies

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Deletes the specified cancellation policies. Cancellation policies managed by portfolio cannot be deleted. This operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/cancellationPolicies/delete`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "CancellationPolicyIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "4d0201db-36f5-428b-8d11-4f0a65e960cc"
  ],
  "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `EnterpriseId` | string | optional | Unique identifier of the enterprise. Required when using [Portfolio Access Tokens](../concepts/multi-property.md), ignored otherwise. |
| `CancellationPolicyIds` | array of string | required, max 100 items | Unique identifiers of the cancellation policies to be deleted. |

### Response

```javascript
{}
```
