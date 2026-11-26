# Inventory write limit

The inventory write limit protects the processing of inventory changes for all properties and partners. It limits how often your integration can write the prices and restrictions of one rate and resource category.

It is separate from the [request limits](requests.md#request-limits), which count requests. Both limits apply.

> **Rollout:** The limit is introduced in phases, and requests are rejected only from 1 March 2027. For the timeline and the steps to prepare your integration, see [Migration guide: Inventory write limit](../deprecations/migration-guide-inventory-write-limit.md).

## Operations covered

The limit applies to these operations:

* [Update rate price]
* [Set restrictions]
* [Clear restrictions]

Mews can extend the limit to other operations that write inventory. Those operations will use the same counters.

## How the limit works

The limit counts **writes per pair**. A pair is one rate and one resource category.

* Each `AccessToken` has a separate counter for each pair.
* A pair accepts **200 writes in one hour**.
* The window is fixed. It starts with the first counted write to the pair and resets one hour later. Each pair has its own window.
* Each request adds 1 to the counter of every pair that it covers.
* If a request takes any pair over the limit, Mews rejects the whole request and writes nothing. The API does not apply partial updates.

The limit value can change. Read the current value from the `RateLimit-Policy` header. Mews can set a different limit for one integration to protect its systems. The header always shows the limit that applies to you.

## Which pairs a request covers

A request covers every rate and resource category that it selects, directly or through a group.

| Rate selector | Rates covered |
| :-- | :-- |
| Rate | That rate. |
| Base rate | The base rate and all rates that depend on it, directly or indirectly. |
| Rate group | All active rates in the group. |
| None | All active rates of the service. |

| Resource category selector | Resource categories covered |
| :-- | :-- |
| Resource category | That resource category. |
| Resource category type | All active resource categories of that type. |
| None | All active resource categories of the service. |

A request covers every combination of the rates and resource categories that it selects. For example, a [Set restrictions] item with a base rate that has 9 dependent rates, and with no resource category, in a service with 25 resource categories, covers 10 × 25 = 250 pairs.

For [Update rate price], the request covers the base rate and its dependent rates, combined with the resource categories of all price updates. If any price update has no resource category, the request covers all active resource categories.

These rules also apply:

* A request counts each pair once, even if several items in the request cover the same pair.
* The limit counts the pairs that a request covers, not the pairs that it changes. A request that sends the same values again counts in full.
* Dates do not change the count. One request for 365 days adds 1 to each pair. 365 requests for one day each add 365.
* Group and service-wide selectors count their members at the time of the request.
* A request that fails validation is not counted. A request that passes validation is counted, even if it fails later.

## Response headers

The covered operations return the rate-limit headers from [draft-ietf-httpapi-ratelimit-headers](https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-ratelimit-headers-11). The policy name is `inventory-writes`.

```text
RateLimit-Policy: "inventory-writes";q=200;w=3600
RateLimit: "inventory-writes";r=112;t=2140;pk=:AXQ2…=:
```

| Header | Parameter | Description |
| :-- | :-- | :-- |
| `RateLimit-Policy` | `q` | Number of writes that one pair accepts in one window. |
| `RateLimit-Policy` | `w` | Length of the window, in seconds. |
| `RateLimit` | `r` | Number of writes that remain for the reported pair in its current window. The minimum value is 0. |
| `RateLimit` | `t` | Number of seconds until the window of the reported pair resets. |
| `RateLimit` | `pk` | Key of the reported pair. The key is opaque. Use it only to tell pairs apart. |

The **reported pair** is the pair with the fewest remaining writes. If Mews rejects the request, the reported pair is the pair over the limit whose window resets last.

Responses can contain more than one `RateLimit` and `RateLimit-Policy` header. The [request limits](requests.md#request-limits) use their own policy. Use the policy name to find `inventory-writes`.

Some responses do not contain the `inventory-writes` headers:

* If the request fails validation, the response has no `inventory-writes` headers.
* If the request covers no pairs, the response has `RateLimit-Policy` but no `RateLimit`.
* If Mews cannot check the limit, the request continues without the check, and the response has no `inventory-writes` headers.

Do not treat a missing header as an error.

## Rejected requests

If a request takes any pair over the limit, the API returns `429 Too Many Requests`. Nothing from the request is written.

```text
HTTP/1.1 429 Too Many Requests
Retry-After: 2140
RateLimit-Policy: "inventory-writes";q=200;w=3600
RateLimit: "inventory-writes";r=0;t=2140;pk=:AXQ2…=:
```

```json
{
  "Message": "Inventory write limit exceeded.",
  "RequestId": "c5f1c9a4-3d2e-4b7a-9f1e-2a6b8d0e4c31",
  "Details": {
    "Policy": "inventory-writes",
    "TotalPairCount": 2,
    "Pairs": [
      {
        "RateId": "ed4b660b-19d0-434b-9360-a4de2ea42eda",
        "ResourceCategoryId": "44bd8ad0-e70b-4bd9-8445-ad7200d7c349",
        "UpdatesInWindow": 201
      },
      {
        "RateId": "ed4b660b-19d0-434b-9360-a4de2ea42eda",
        "ResourceCategoryId": "773d5e42-de1e-43a0-9ce6-f940faf2303f",
        "UpdatesInWindow": 201
      }
    ]
  }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Policy` | string | required | Name of the policy that rejected the request, `inventory-writes`. |
| `TotalPairCount` | integer | required | Number of pairs that the request takes over the limit. |
| `Pairs` | array of objects | required | Pairs over the limit, highest `UpdatesInWindow` first. Contains at most 100 pairs. |
| `Pairs.RateId` | string | required | Unique identifier of the rate. |
| `Pairs.ResourceCategoryId` | string | required | Unique identifier of the resource category. |
| `Pairs.UpdatesInWindow` | integer | required | Number of writes in the current window, including the rejected request. |

Wait for the number of seconds in `Retry-After` before you send the request again. At that time, the windows of all pairs in `Pairs` have reset. A rejected request is not counted.

## Stay under the limit

* **Send a date range in one request.** Do not send one request for each day. The limit counts requests per pair, not days.
* **Send only changes.** Do not send prices or restrictions again if they did not change since your last request.
* **Select only the rates and resource categories that changed.** A request without a rate or resource category covers all of them.
* **Do not clear and then set the same restrictions.** Each of the two requests counts. To change restrictions, call [Set restrictions] with the new values. For more information, see [Migration guide: Restrictions](../deprecations/migration-guide-restrictions-set-clear.md#bulk-updates-and-ordering-best-practices).
* **Watch the `r` value.** If `r` decreases fast for some pairs, find out why your integration writes those pairs so often.

[Update rate price]: ../operations/rates.md#update-rate-price
[Set restrictions]: ../operations/restrictions.md#set-restrictions
[Clear restrictions]: ../operations/restrictions.md#clear-restrictions
