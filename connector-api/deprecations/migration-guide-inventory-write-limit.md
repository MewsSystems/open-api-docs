# Migration guide: Inventory write limit

This guide helps you prepare your integration for the [inventory write limit](../guidelines/inventory-write-limit.md). The limit applies to [Update rate price], [Set restrictions] and [Clear restrictions].

## Key points

* **Each rate and resource category pair accepts 200 writes in one hour.** Each request adds 1 to every pair that it covers. For the counting rules, see [Inventory write limit](../guidelines/inventory-write-limit.md).
* **The response headers come first.** The covered operations return `RateLimit-Policy` and `RateLimit` headers before the limit is enforced. Use them to measure how close your integration is to the limit.
* **From 1 March 2027, Mews rejects requests over the limit** with `429 Too Many Requests`. A rejected request writes nothing.
* **One request per day of a date range is the most common cause of hitting the limit.** Send the date range in one request.

## Timeline

| Phase | Date | What changes |
| :-- | :-- | :-- |
| Headers on the demo environment | To be announced | The covered operations return the `inventory-writes` headers. No request is rejected. |
| Headers on the production environment | To be announced | The covered operations return the `inventory-writes` headers. No request is rejected. |
| Enforcement | 1 March 2027 | Requests over the limit get `429 Too Many Requests`, on all environments. |

Before the enforcement date, a response can show `r=0` while the request succeeds. This means that the request would be rejected after the enforcement date.

> **Important:** Mews can enforce the limit before 1 March 2027, or set a lower limit, for an integration that causes operational problems on Mews systems. In that case, the integration gets `429 Too Many Requests` before the enforcement date. The `RateLimit-Policy` header always shows the limit that applies to you.

The [Changelog](../changelog/README.md) announces each phase.

## Migration steps

### Log the inventory-writes headers

For each request to a covered operation, log the `RateLimit-Policy` and `RateLimit` values of the `inventory-writes` policy, with the time and the property. For the meaning of each value, see [Response headers](../guidelines/inventory-write-limit.md#response-headers).

### Find the pairs that you write most often

Look for responses with low `r` values. Low values show the pairs that your integration writes many times in one hour. Common causes:

* One request for each day of a date range.
* A full synchronization that sends all prices or restrictions again, also when nothing changed.
* A retry loop that sends the same request again after it succeeded.
* A [Clear restrictions] call followed by a [Set restrictions] call for the same restrictions.
* Requests without a rate or resource category, which cover all rates or all resource categories of the service.

### Change how you send inventory

* Send a date range in one request.
* Send only the prices and restrictions that changed since your last request.
* Select only the rates and resource categories that changed.
* To change restrictions, call [Set restrictions] with the new values. Do not clear them first.

For restrictions, also follow [Bulk updates and ordering best practices](migration-guide-restrictions-set-clear.md#bulk-updates-and-ordering-best-practices).

### Handle the 429 response

If a request takes any pair over the limit, the API returns `429 Too Many Requests`. Nothing from the request is written.

* Wait for the number of seconds in the `Retry-After` header before you send the request again.
* Use the `Pairs` list in the response body to find the pairs over the limit. For the body, see [Rejected requests](../guidelines/inventory-write-limit.md#rejected-requests).
* Do not split the request and send the parts at once. Each part counts against the same pairs.

The same `429` status code is also used by the [request limits](../guidelines/requests.md#request-limits). Use the `Details.Policy` value or the `RateLimit` headers to tell the two apart.

### Test on the demo environment

When the headers are available on the demo environment, run your usual synchronization against a demo property. Check the `r` values for the busiest hours. If `r` reaches 0, change your integration before the enforcement date.

## Getting help

If your integration cannot stay under the limit after these changes, [contact support](../contact-support/README.md) with your integration name, the affected properties, and example `RequestId` values.

[Update rate price]: ../operations/rates.md#update-rate-price
[Set restrictions]: ../operations/restrictions.md#set-restrictions
[Clear restrictions]: ../operations/restrictions.md#clear-restrictions
