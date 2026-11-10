<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Sell limits

## Get sell limit state

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Returns the sell limit state of a daily service for the specified rates, resource categories and time interval. For each combination it returns the effective limit, the number of spaces already sold against it, and the number still available, so an integration can apply the same constraint that **Mews Operations** applies when a reservation is created. The operation returns an error when the property does not have sell limits enabled, or when the service does not use a time unit period of `Day`. The operation is not paginated, so the amount of state a request can ask for is capped: rates multiplied by requested resource categories (plus one for the across-all-categories dimension) multiplied by time units must not exceed 10000 combinations. A request over that returns an error naming the count, so narrow `RateIds`, `ResourceCategoryIds` or the time interval. Unmatched filter identifiers are ignored and do not count toward it. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/sellLimits/getState`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "ServiceId": "bd26d8db-86da-4f96-9efc-e5a4654a4a94",
  "RateIds": [
    "ed4b660b-19d0-434b-9360-a4de2ea42eda"
  ],
  "ResourceCategoryIds": [
    "773d5e42-de1e-43a0-9ce6-f940faf2303f"
  ],
  "FirstTimeUnitStartUtc": "2026-11-01T00:00:00Z",
  "LastTimeUnitStartUtc": "2026-11-03T00:00:00Z"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `ServiceId` | string | required | Unique identifier of the `Service` whose sell limits are requested. The service must use a time unit period of `Day`. |
| `RateIds` | array of string | required, max 100 items | Unique identifiers of the `Rate` for which sell limit state is returned. Subject to the combination cap described on the operation, so this bound and the resource category and interval bounds cannot all be used at their maximum together. |
| `ResourceCategoryIds` | array of string | optional, max 100 items | Unique identifiers of the `Resource category` for which sell limit state is returned. The limit that applies across all resource categories is reported alongside them, as an item whose `ResourceCategoryId` is null. |
| `FirstTimeUnitStartUtc` | string | required | Start of the time interval, expressed as the timestamp for the start of the first [time unit](../concepts/time-units.md), in UTC timezone ISO 8601 format. |
| `LastTimeUnitStartUtc` | string | required | End of the time interval, expressed as the timestamp for the start of the last [time unit](../concepts/time-units.md), in UTC timezone ISO 8601 format. The interval can span at most 100 days. |

### Response

```javascript
{
  "TimeUnitStartsUtc": [
    "2026-11-01T00:00:00Z",
    "2026-11-02T00:00:00Z",
    "2026-11-03T00:00:00Z"
  ],
  "RateSellLimits": [
    {
      "RateId": "ed4b660b-19d0-434b-9360-a4de2ea42eda",
      "ResourceCategorySellLimits": [
        {
          "ResourceCategoryId": null,
          "Limits": [
            5,
            5,
            null
          ],
          "Sold": [3, 5, 4],
          "Available": [
            2,
            0,
            null
          ]
        },
        {
          "ResourceCategoryId": "773d5e42-de1e-43a0-9ce6-f940faf2303f",
          "Limits": [
            0,
            5,
            null
          ],
          "Sold": [0, 5, 1],
          "Available": [
            0,
            0,
            null
          ]
        }
      ]
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `TimeUnitStartsUtc` | array of string | required, max 100 items | Starts of the [time units](../concepts/time-units.md) covered by the request, in ascending order, in UTC timezone ISO 8601 format. Every metric array in this response has exactly this many elements, in this order. |
| `RateSellLimits` | array of [Rate sell limit](selllimits.md#rate-sell-limit) | required, max 100 items | Sell limit state of the requested rates. Empty when no requested rate belongs to the service, or when `ResourceCategoryIds` was sent and matched no resource category of the service. |

#### Rate sell limit

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `RateId` | string | required | Unique identifier of the `Rate`. |
| `ResourceCategorySellLimits` | array of [Resource category sell limit](selllimits.md#resource-category-sell-limit) | required | Sell limit state of the rate, per resource category. Contains one item for each resource category returned, preceded by an item whose `ResourceCategoryId` is null carrying the state across all resource categories. At most 10000 items, which is the combination ceiling reached with one rate over one time unit. |

#### Resource category sell limit
This item gives the sell limit state of one `Resource category` for a `Rate`. When `ResourceCategoryId` is null, the item gives the state across all resource categories. A sell limit can apply at a broader level than this rate and resource category, for example on the `Rate group`. The values then apply to that broader level, and the other resource categories at that level give the same values. The applicable level can be different for each time unit. For one time unit, `Limits`, `Sold` and `Available` always give the state of the same level. When two levels are equally binding, the broader one is reported. These values are shared, and a sum across resource categories gives an incorrect total.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ResourceCategoryId` | string | optional | Unique identifier of the `Resource category`. Null when the state applies across all resource categories. |
| `Limits` | array of integer | required, max 100 items | Effective sell limits, that is the number of spaces that may be sold, for each time unit in `TimeUnitStartsUtc`. An element is null when no sell limit is configured for that time unit, which is different from a configured limit of `0`. |
| `Sold` | array of integer | required, max 100 items | Numbers of spaces already sold against the reported limit, for each time unit in `TimeUnitStartsUtc`. Counts confirmed, started, processed and optional reservations. Inquired reservations, and reservations picked up from an availability block sharing the rate, are not counted. A reservation is counted on each night of its stay, so it does not count towards its departure date. When no limit is configured for a time unit, the element is the number of spaces sold at this rate and resource category. |
| `Available` | array of integer | required, max 100 items | Numbers of spaces still available under the reported limit, for each time unit in `TimeUnitStartsUtc`, each equal to the corresponding `Limits` element minus the corresponding `Sold` element. An element is null when no sell limit is configured for that time unit. An element can be negative when the configured limit is lower than the number of spaces already sold. |
