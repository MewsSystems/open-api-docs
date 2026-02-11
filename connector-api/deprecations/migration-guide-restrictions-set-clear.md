# Migration guide: Restrictions (add/delete to set/clear)

This guide helps API partners migrate from deprecated [Add restrictions] and [Delete restrictions] operations to [Set restrictions] and [Clear restrictions] operations.

## Key points

- **[Add restrictions] and [Delete restrictions] are discontinued.** All new development must use [Set restrictions] and [Clear restrictions] instead.
- **Restrictions are no longer addressed by `ExternalIdentifier` or `RestrictionIds`.** The new operations work on a desired state defined by conditions and time intervals, not by individual restriction entities.
- **[Set restrictions] merges similar restrictions** to keep the number of stored restrictions small and efficient, while **[Clear restrictions] uses a splicing algorithm** to remove or shorten existing restrictions that match the specified conditions and time intervals. For details, see [Restrictions concepts].
- **[Clear restrictions] is intended only when a time interval should have no restrictions at all** for the specified conditions. To change restrictions (for example, disable minimum length-of-stay condition but keep close-to-stay), call **[Set restrictions]** with the new desired parameters.
- **Batch updates per service and rate and use continuous date ranges** to minimize the number of operations and internal entity deletions. This works naturally with the merging and splicing algorithms.

## New restrictions operations

Originally, restrictions were managed as discrete entities:

- **[Add restrictions]** created restriction entities, each with its own `Id` and optional `ExternalIdentifier`.
- **[Delete restrictions]** removed restrictions by `RestrictionIds`, and integrations often used `ExternalIdentifier` plus [Get all restrictions] to find those IDs.

This model encouraged long-lived, addressable restriction entities, which led to:

- Very large numbers of small restriction entities, especially for day-by-day updates.
- Complex and brittle logic around identifying and deleting the correct restriction entities.

The new operations shift to a state-based model:

- **[Set restrictions]** defines which restrictions should exist for a combination of service, rate(s), resource category, days of week, date range, and exception parameters. The platform merges overlapping or adjacent rules with identical parameters into larger intervals.
- **[Clear restrictions]** defines intervals that should have no restrictions at all for a given combination of conditions. The platform splices existing restrictions to make the interval clear.

Important differences:

- They affect **only restrictions created via the API**, not those created manually in Mews Operations.
- They perform **stricter validation** on date and time values than the legacy endpoints. See [Datetimes].
- They no longer expose or rely on restriction identity (no `ExternalIdentifier`, no returned restriction IDs, and `clear` takes no IDs at all).

## Migration steps

{% stepper %}
{% step %}

### Check your usage of [Add restrictions] and [Delete restrictions]

- Identify all call sites, batch jobs, and workflows that:
  - Create restrictions (especially day-by-day updates or separate minimum length-of-stay and open/close rules).
  - Delete restrictions using `RestrictionIds` or `ExternalIdentifier`.

{% endstep %}
{% step %}

### Design your data model around a desired restriction state

- Model restrictions as rules over:
  - Service (`ServiceId`)
  - Rate or rate group (`ExactRateId`, `BaseRateId`, `RateGroupId`)
  - Resource category or type (`ResourceCategoryId`, `ResourceCategoryType`)
  - Time interval (`StartUtc`, `EndUtc`)
  - Days of week (`Days` flags)
  - Exceptions (`MinAdvance`, `MaxAdvance`, `MinLength`, `MaxLength`, `MinPrice`, `MaxPrice`)

{% endstep %}
{% step %}

### Replace [Add restrictions] calls with [Set restrictions] calls

- Convert the legacy Restrictions/Conditions/Exceptions payload into `Data[]` entries:
  - Map type, rate, category, dates, length, and price into [Restriction set data] fields.
  - Update days of week from an array of strings to a structured [Days parameters] object with boolean flags.
- Use broader ranges and merged rules where possible instead of day-by-day updates.

{% endstep %}
{% step %}

### Replace [Delete restrictions] plus ID or ExternalIdentifier logic with [Clear restrictions] and [Set restrictions]

- For intervals that should have **no restrictions at all**, call [Clear restrictions] with the appropriate conditions and date range.
- For cases where you previously removed one type of restriction (for example minimum length-of-stay) while keeping others (for example close-to-stay), do not clear by ID. Instead, compute the new desired set of restrictions and call [Set restrictions].

{% endstep %}
{% step %}

### Implement bulk updates and ordering best practices

Group updates by **Service + Rate (+ ResourceCategory)** and use date ranges. See [Bulk updates and ordering best practices](#bulk-updates-and-ordering-best-practices).

{% endstep %}
{% step %}

### Adjust validation, error handling, and monitoring

- Expect stricter validation of `StartUtc` and `EndUtc` than in [Add restrictions]. See [Datetimes].
- Update logs and dashboards to track usage of [Set restrictions] and [Clear restrictions] instead of the deprecated operations.

{% endstep %}
{% endstepper %}

## Operations mapping and payload differences

### Add restrictions to Set restrictions

#### Request parameters

{% tabs %}
{% tab title="Add restrictions (legacy)" %}

```json
{
  "ClientToken": "...",
  "AccessToken": "...",
  "Client": "Sample Client 1.0.0",
  "ServiceId": "bd26d8db-86da-4f96-9efc-e5a4654a4a94",
  "Restrictions": [
    {
      "Identifier": "1234",
      "ExternalIdentifier": "5678",
      "Conditions": {
        "Type": "Start",
        "ExactRateId": "7c7e89d6-69c0-4cce-9d42-35443f2193f3",
        "ResourceCategoryId": "86336EAC-4168-46B1-A544-2A47251BF864",
        "Days": ["Friday", "Saturday", "Sunday"]
      },
      "Exceptions": {
        "MinLength": "P0M2DT0H0M0S",
        "MaxLength": "P0M7DT0H0M0S"
      }
    }
  ]
}
```

{% endtab %}
{% tab title="Set restrictions" %}

```json
{
  "ClientToken": "...",
  "AccessToken": "...",
  "Client": "Sample Client 1.0.0",
  "ServiceId": "bd26d8db-86da-4f96-9efc-e5a4654a4a94",
  "Data": [
    {
      "Type": "Start",
      "ExactRateId": "7c7e89d6-69c0-4cce-9d42-35443f2193f3",
      "ResourceCategoryId": "86336EAC-4168-46B1-A544-2A47251BF864",
      "StartUtc": "2018-10-01T00:00:00Z",
      "EndUtc": "2018-10-31T00:00:00Z",
      "Days": {
        "Monday": false,
        "Tuesday": false,
        "Wednesday": false,
        "Thursday": false,
        "Friday": true,
        "Saturday": true,
        "Sunday": true
      },
      "MinLength": "P0M2DT0H0M0S",
      "MaxLength": "P0M7DT0H0M0S"
    }
  ]
}
```

{% endtab %}
{% endtabs %}

| Add restrictions                                                                                            | Set restrictions                                                                         | Notes                                                                                                                          |
| :---------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `ServiceId`                                                                                                 | `ServiceId`                                                                              | Same meaning (service whose restrictions are affected).                                                                        |
| `Restrictions[]`                                                                                            | `Data[]`                                                                                 | Both are the collection of restriction rules to apply.                                                                         |
| `Restrictions[].Identifier`                                                                                 | n/a                                                                                      | Identifier within the transaction only; not persisted in `set`.                                                                |
| `Restrictions[].ExternalIdentifier`                                                                         | n/a                                                                                      | No equivalent in `set`. External identifiers were removed because the splicing and merging algorithm breaks stable identities. |
| `Restrictions[].Conditions.Type`                                                                            | `Data[].Type`                                                                            | Restriction type (`Stay`, `Start`, `End`).                                                                                     |
| `Restrictions[].Conditions.ExactRateId` / `BaseRateId` / `RateGroupId`                                      | `Data[].ExactRateId` / `BaseRateId` / `RateGroupId`                                      | Same semantics, now part of set and clear data.                                                                                |
| `Restrictions[].Conditions.ResourceCategoryId` / `ResourceCategoryType`                                     | `Data[].ResourceCategoryId` / `ResourceCategoryType`                                     | Same semantics.                                                                                                                |
| `Restrictions[].Conditions.StartUtc` / `EndUtc`                                                             | `Data[].StartUtc` / `EndUtc`                                                             | Same semantics, stricter validation in `set`.                                                                                  |
| `Restrictions[].Conditions.Days` (array of strings)                                                         | `Data[].Days` (object with weekday booleans)                                             | Format changed from list to structured map.                                                                                    |
| `Restrictions[].Exceptions.MinAdvance` / `MaxAdvance` / `MinLength` / `MaxLength` / `MinPrice` / `MaxPrice` | `Data[].MinAdvance` / `MaxAdvance` / `MinLength` / `MaxLength` / `MinPrice` / `MaxPrice` | Moved from nested `Exceptions` to top-level of each data item.                                                                 |

#### Response differences

- [Add restrictions] returned a list of added restrictions, including their system `Id`, `ServiceId`, and `ExternalIdentifier`.
- [Set restrictions] returns an empty object (`{}`). Identity-level details are internal to Mews.

Do not rely on response content from [Set restrictions]. Instead, rely on your own model and, when necessary, [Get all restrictions] to verify what restrictions are currently active.

### Delete restrictions to Clear restrictions

Request parameters for **Delete restrictions** (legacy) by restriction IDs:

```json
{
  "ClientToken": "...",
  "AccessToken": "...",
  "Client": "Sample Client 1.0.0",
  "RestrictionIds": [
    "af4949ce-c061-4f27-89f9-5a6a9ef725a7",
    "e2f8aa29-0c09-4097-801c-7888c9fb57ae"
  ]
}
```

In many integrations, those `RestrictionIds` were obtained indirectly:

- The partner stored `ExternalIdentifier` values when calling [Add restrictions].
- When they needed to remove selected restrictions, they:
  1. Called [Get all restrictions] filtering by `ExternalIdentifier` and other conditions.
  2. Extracted the `Id` values of matching restrictions.
  3. Passed them to [Delete restrictions] as `RestrictionIds`.

Request parameters for **Clear restrictions** by conditions and interval:

```json
{
  "ClientToken": "...",
  "AccessToken": "...",
  "Client": "Sample Client 1.0.0",
  "ServiceId": "bd26d8db-86da-4f96-9efc-e5a4654a4a94",
  "Data": [
    {
      "Type": "Start",
      "ExactRateId": "ed4b660b-19d0-434b-9360-a4de2ea42eda",
      "ResourceCategoryId": "773d5e42-de1e-43a0-9ce6-f940faf2303f",
      "StartUtc": "2023-02-15T00:00:00Z",
      "EndUtc": "2023-02-22T00:00:00Z",
      "Days": {
        "Monday": false,
        "Tuesday": false,
        "Wednesday": false,
        "Thursday": false,
        "Friday": true,
        "Saturday": true,
        "Sunday": true
      }
    }
  ]
}
```

Here:

- No IDs or external IDs are passed.
- You describe which restrictions must be completely absent:
  - Given `ServiceId`, `Type`, rate identifiers, categories, and `Days`.
  - Over a specified `StartUtc` to `EndUtc` interval.
- The splicing algorithm splits, shortens, or removes any matching restrictions so that the interval is completely clear.

#### Main differences

- Deleting by `RestrictionIds` is not possible with [Clear restrictions].
- You no longer target a specific restriction entity. Instead, you assert that in this interval and for this combination of attributes, no restrictions should exist.

## Adapting to removal of `ExternalIdentifier`

Some partners used `ExternalIdentifier` to distinguish multiple logical rules (for example minimum length-of-stay (MinLOS) versus open or close) for the same rate and period. With the new operations, `ExternalIdentifier` is not present in [Set restrictions] or [Clear restrictions], and [Clear restrictions] does not target a single rule type.

### Why `ExternalIdentifier` was removed

The set and clear operations merge and split restrictions dynamically. That means internal restriction entities are not stable over time and persistent external ID would be ambiguous. The design intentionally forgoes entity identity to enable optimizations and move to desired-state updates.

### How Clear restrictions is intended to be used

Use [Clear restrictions] only when the interval should have **no restrictions at all** for the specified conditions. If you want to change just one part of a rule (for example remove MinLOS but keep open or close), **call [Set restrictions]** with the new desired parameters.

### Migration guidance for implementations relying on `ExternalIdentifier`

If your current implementation:

- Creates separate restrictions with different external IDs for different business concerns, and
- Deletes those restrictions individually via the combination of [Get all restrictions], [Delete restrictions], and `ExternalIdentifier`,

use the following migration pattern:

1. **Model restrictions as composite rules** for a given Service + Rate (+ Category) + interval + days.
2. **Whenever the rule changes, call [Set restrictions]** with the new combination (for example omit `MinLength` to remove MinLOS).
3. **Use [Clear restrictions] only when you want no restrictions at all** for that interval and conditions.
4. **Keep any identifiers in your own system** and translate them into [Set restrictions] payloads.

## Bulk updates and ordering best practices

The merging (set) and splicing (clear) design rewards batched updates. Frequent, overlapping, or granular updates can cause unnecessary splicing and deletions.

### 1. Bulk per Service + Rate (+ Category), not per day

Recommendation:

- Group `Data[]` items by `ServiceId`, rate or rate group, and optionally resource category.
- Compute continuous date ranges where parameters match (type, lengths, open or close, days).
- Send one set or clear item per continuous range, not one per day.

This aligns with the merging algorithm, which merges similar restrictions into longer intervals and helps keep the per-service restriction count below the 150,000 quota. For more detail, see [Restrictions concepts].

### 2. Prefer refresh by overwrite for regular updates

For partners that regularly synchronize restrictions from an RMS or similar system:

1. Compute the target restriction state for a planning horizon, for example the next 365 days.
2. **Option A - Overwrite via set only:** build merged intervals and call [Set restrictions].
3. **Option B - Occasional reset:** clear a broad horizon, then call [Set restrictions] for the same horizon.

### 3. Ordering of bulk operations

To minimize conflicts and internal splicing overhead:

1. **Process per service.**
   - Finish all operations for Service A before Service B when possible.
2. **Within a service, process per rate or rate group.**
   - For each rate, apply operations in this order:
     1. Optional wide-range clear if you are doing a full reset.
     2. Set calls with the broadest rules first, then more specific overrides as needed.
   - Avoid interleaving set and clear for overlapping intervals. Compute the target state once and send the minimal set of operations.
3. **Respect batch size limits.**
   - Ensure each `Data` array stays within the documented maximum of 1000 items.

This ordering guidance reflects the recommendation that partners should bulk updates per service and rate and use date ranges to minimize entity deletions.

## Example migration scenarios

<details>

<summary>Scenario 1: Simple minimum length-of-stay (MinLOS) restriction</summary>

**Goal:** For rate `{R}` in service `{S}`, set MinLOS = 2 on Fridays to Sundays for March and April.

**Legacy implementation:** [Add restrictions] called with one restriction per day or one per short range and an `ExternalIdentifier` like `minlos`.

**Migrated implementation:** Compute a single `Data` item for the entire March and April range:

```json
{
  "ClientToken": "...",
  "AccessToken": "...",
  "Client": "My RMS 1.0.0",
  "ServiceId": "{S}",
  "Data": [
    {
      "Type": "Stay",
      "ExactRateId": "{R}",
      "StartUtc": "2026-03-01T00:00:00Z",
      "EndUtc": "2026-05-01T00:00:00Z",
      "Days": {
        "Monday": false,
        "Tuesday": false,
        "Wednesday": false,
        "Thursday": false,
        "Friday": true,
        "Saturday": true,
        "Sunday": true
      },
      "MinLength": "P0M2DT0H0M0S"
    }
  ]
}
```

This creates the desired MinLOS rule. You do not track any external IDs; the combination of rate, date range, and parameters is the identifier.

</details>

<details>

<summary>Scenario 2: Change MinLOS while keeping close-to-stay</summary>

**Goal:** Remove MinLOS for July while keeping close-to-stay for the same dates.

**Legacy pattern:**

- Look up MinLOS restriction by `ExternalIdentifier = "minlos"` via [Get all restrictions].
- Delete those restrictions via [Delete restrictions].

**Migrated pattern:**

1. In your system, recompute the July rules so MinLOS is absent while open and close rules remain as desired.
2. Build a [Set restrictions] call for that July period with `MinLength` omitted or null.
3. Send only set, no clear.

The merging algorithm will adjust underlying entities to match your new desired state; you never need to delete a restriction.

</details>

## Known limitations and considerations

- **No way to explicitly target a single logical restriction by ID or external ID.**
  - This is by design given the splicing and merging algorithms and the desired-state nature of the contract. See [Why `ExternalIdentifier` was removed](#why-externalidentifier-was-removed).
- **[Clear restrictions] does not distinguish MinLOS versus MaxLOS versus open or close.**
  - It removes all matching restrictions for the given conditions and interval.
  - Use [Set restrictions] to adjust one aspect while keeping others.
- **Only API-created restrictions are affected.**
  - Restrictions created directly in Mews Operations do not interact with those created via set or clear and are not modified by them.
- **Quota and performance characteristics.**
  - There is a quota of 150,000 restrictions per service applied both to the legacy and new operations. The merging algorithm makes it unlikely to be hit when batching and merging are used correctly.
  - Highly fragmented daily updates with overlapping rules can still approach the quota; [batching per service and rate](#bulk-updates-and-ordering-best-practices) with ranges mitigates this.

[Add restrictions]: ../operations/discontinued.md#add-restrictions
[Delete restrictions]: ../operations/discontinued.md#delete-restrictions
[Set restrictions]: ../operations/restrictions.md#set-restrictions
[Clear restrictions]: ../operations/restrictions.md#clear-restrictions
[Get all restrictions]: ../operations/restrictions.md#get-all-restrictions
[Restriction set data]: ../operations/restrictions.md#restriction-set-data
[Days parameters]: ../operations/restrictions.md#days-parameters
[Restrictions concepts]: ../concepts/restrictions.md
[Datetimes]: ../guidelines/serialization.md#datetimes
