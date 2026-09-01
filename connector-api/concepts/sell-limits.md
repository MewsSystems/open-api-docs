# Sell limits

An explanation of how sell limit state is evaluated, for consumers of [Get all sell limits].

## What are sell limits?

A sell limit is a daily cap on how many spaces may be sold on a given rate. Properties use them to control consumption of a particular rate rather than of the inventory as a whole. For example:

- Cap a discounted corporate rate at 10 spaces per night, while the rest of the inventory stays open at public rates
- Cap a promotional rate during a high demand period so it cannot absorb the whole property

Sell limits are evaluated after availability and restrictions. When a limit is reached, the affected rate closes for that day even though physical inventory remains.

{% hint style="info" %}

### Additional help on sell limits

- [Search all Help articles related to sell limits](https://help.mews.com/s/global-search/sell%20limits?language=en_US)

{% endhint %}

## Sell limits in the API

To read sell limit state, use [Get all sell limits]. The operation is read only. Sell limits are configured in **Mews Operations**; there is no API operation to set or clear them.

Sell limits apply only to services whose time unit period is `Day`. Requesting state for any other service returns an error. For more information, see [Time units].

## What the operation returns

The operation returns one record per combination of rate, resource category and time unit covered by the request. Each record carries three related numbers.

| Property | Meaning |
| :-- | :-- |
| `Limit` | The effective sell limit for that combination, or null when no sell limit is configured. |
| `Sold` | The number of spaces already sold against the limit. |
| `Available` | `Limit` minus `Sold`, or null when no sell limit is configured. |

### No limit, and a limit of zero, are different states

A null `Limit` means the property has not configured a sell limit for that combination, so nothing constrains the sale. A `Limit` of `0` means the property has configured a cap of zero, which closes the rate for that day. Treat them as distinct: a client that reads null as zero will stop selling rates that are in fact open.

`Sold` is still reported when `Limit` is null, so a client can see consumption on rates that are currently uncapped.

### `Available` can be negative

A property can lower a sell limit below the number of spaces already sold, and reservations created with an override permission can exceed a limit. In both cases `Available` is negative. Treat any value of `0` or below as closed.

## Which limit is reported

A property can configure a limit on a rate, on the rate group that contains it, on a specific resource category, or across all resource categories. These combine, and more than one can apply to a single sale.

The operation reports the combination that actually constrains the sale, which is the one leaving the least availability. A rate limit of 9 alongside a rate group limit of 2 is reported as a limit of 2, because the rate group is what closes the rate first. This matches what **Mews Operations** enforces when a reservation is created, so a client does not need to reimplement the precedence rule.

Records where the resource category is null describe the limit that applies across all resource categories. Records with a resource category describe the limit for that category. Request the categories you care about, and the across-all-categories record is always returned alongside them.

## Which reservations count as sold

`Sold` counts confirmed, started, processed and optional reservations. It does not count:

- inquired reservations
- availability blocks that share the rate with the sell limit, or reservations picked up from within such a block

Availability blocks are a contractual allocation agreed separately, so they do not consume sell limit availability.

## Sell limits are consumed per night of stay

A sell limit is consumed on each night of a stay, not on the departure date. A one night reservation arriving on 1 November consumes the limit for 1 November only; 2 November is unaffected and can still be sold at the same rate.

## Related pages

- [Get all sell limits] - the operation reference
- [Restrictions] - the other mechanism evaluated before a sale, with its own set of rules
- [Time units] - why sell limits apply only to daily services

[Get all sell limits]: ../operations/selllimits.md#get-all-sell-limits
[Restrictions]: restrictions.md
[Time units]: time-units.md
