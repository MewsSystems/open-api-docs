# Multi-occupancy availability blocks

An explanation of how an [Availability block] splits its allocated units by guest count, and how reservations are matched to those splits.

## What is an occupancy split?

An [Availability block] holds a guaranteed set of units for a group, event, or company – for example, 10 units of a [Resource category] per night for a conference.

A **multi-occupancy** availability block divides that allocation by guest count. Instead of "10 units", the block can hold "3 units for single occupancy and 7 units for double occupancy". Each part of the division is an **occupancy slot**: a pairing of a guest count (`PersonCount`) with a number of blocked units (`UnitCount`).

An occupancy split changes how the block is reported. It does not change the total number of units the block holds, and it does not limit which reservations the block accepts through the Connector API – see [How slots balance each other](#how-slots-balance-each-other).

{% hint style="info" %}

### Feature availability

Defining more than one occupancy slot per availability adjustment requires the multi-occupancy availability blocks feature to be enabled for the enterprise. When the feature is disabled, an adjustment accepts at most one occupancy slot, and the allocation always reports the [combined entry](#reading-the-occupancy-allocation), even when a split is stored.

Both the `PaxCounts` parameter and the occupancy breakdown in the response are additive. Integrations that do not send `PaxCounts` and ignore the new response fields are unaffected.

{% endhint %}

## Defining the occupancy split

Occupancy splits are created and changed through [Update service availability]. There is no separate operation for them. Each [Availability update] carries an optional `PaxCounts` collection of [Pax count] entries that distributes the adjustment across occupancy slots.

The request below reserves 10 units of a resource category for a block over three nights, split into 3 single-occupancy and 7 double-occupancy units. As with any block allocation, `UnitCountAdjustment` is negative because the units are taken out of general availability.

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "ServiceId": "bd26d8db-86da-4f96-9efc-e5a4654a4a94",
  "AvailabilityUpdates": [
    {
      "FirstTimeUnitStartUtc": "2026-06-01T00:00:00Z",
      "LastTimeUnitStartUtc": "2026-06-03T00:00:00Z",
      "AvailabilityBlockId": "aaaa654a-1f36-4cb1-8f9f-3225a4eb52fb",
      "ResourceCategoryId": "a1b2c3d4-0000-0000-0000-000000000001",
      "UnitCountAdjustment": { "Value": -10 },
      "PaxCounts": [
        { "PersonCount": 1, "UnitCount": 3 },
        { "PersonCount": 2, "UnitCount": 7 }
      ]
    }
  ]
}
```

To read the stored split back, use [Get all availability adjustments]. Each [Availability adjustment] returns its `PaxCounts`, including the default slot.

### Rules

- **Block updates only.** `PaxCounts` applies to updates that set an `AvailabilityBlockId`. On an update without one, it has no effect.
- **Maximum of 5 entries.** Each `PersonCount` must be unique within the collection, must be positive, and must not exceed the total capacity of the resource category (`Capacity` plus `ExtraCapacity`). Each `UnitCount` must be zero or positive.
- **Totals must reconcile.** The sum of all `UnitCount` values must equal the absolute value of `UnitCountAdjustment.Value`.
- **No split supplied.** A block adjustment sent without `PaxCounts` is stored with one default occupancy slot. Its `PersonCount` is the `Capacity` of the resource category, and its `UnitCount` covers the whole adjustment. When the feature is enabled, the allocation reports this default slot like any other slot.

{% hint style="warning" %}

#### An update replaces the whole split

[Update service availability] overwrites any existing adjustment for the same resource category, block, and interval. The time units in the update get the new `PaxCounts`, or the default slot when `PaxCounts` is omitted or empty.

When the update covers only part of an existing adjustment, the time units outside the update keep their unit count but lose their occupancy split. This happens also when the update itself sends `PaxCounts`. Mews replaces the existing adjustment with new adjustments that have new IDs. These time units are then reported as [time units without an occupancy split](#time-units-without-an-occupancy-split). An update that removes adjustments (`UnitCountAdjustment` without `Value`) ignores `PaxCounts` and has the same effect on the time units it does not cover.

To keep a split in place, re-send the full `PaxCounts` collection for the whole interval of the existing adjustment. Time units before the editable history window of the enterprise cannot be updated: the update interval is cut to that window. On a block that has already started, an update therefore removes the split from the past time units.

Some Mews processes also write block adjustments without `PaxCounts` – for example, when a picked-up reservation moves to a different resource category. These processes write single time units, so the effect is the same as a partial update without `PaxCounts`: the touched time units get the default slot, and the rest of each affected adjustment loses its split.

{% endhint %}

## How reservations are matched to occupancy slots

Reservations need no new field to participate in a multi-occupancy block. [Add reservations] is unchanged: a reservation already carries its guest count in `PersonCounts` and its block in `AvailabilityBlockId`.

A reservation is not bound to a slot when it is created. Its pickup is attributed to the slot with the **largest `PersonCount` that does not exceed the reservation's total guest count**, counted across all age categories. A reservation with a guest count below every defined slot is attributed to the lowest slot. The matching is recomputed each time the allocation is read, so every picked-up reservation always lands in a defined slot and there is no unmatched bucket.

With slots defined at 2 and 4 persons:

| Reservation guest count | Matched slot | Reason                              |
| :---------------------- | :----------- | :---------------------------------- |
| 2                       | 2            | Exact match                         |
| 3                       | 2            | Largest slot not exceeding 3        |
| 4                       | 4            | Exact match                         |
| 5                       | 4            | Largest slot not exceeding 5        |
| 1                       | 2            | Below every slot, falls to the lowest |

Because matching is derived rather than stored, changing a reservation's guest count moves its pickup to the corresponding slot on the next read. No extra API call is needed.

## How slots balance each other

Occupancy slots guide the distribution of a block; they are not separate capacity limits.

When a slot picks up more reservations than its blocked count, the excess is reported on that slot as `Overflow`. Spare capacity on the other slots is consumed to cover it. The excess is spread over all slots that have spare units, in proportion to their spare units, and each donating slot reports its share as `OutgoingOffset`. This lowers the remaining availability of the donating slot without adding reservations to it. If the total excess is larger than the total spare capacity, all spare capacity is consumed and the rest of the excess stays uncovered.

The result is that an individual slot can report more pickups or less availability than its own `UnitCount` suggests. Use the resource category totals for the capacity of the block.

[Add reservations] checks a new reservation against the units the block holds for the resource category on each time unit, whether or not the multi-occupancy feature is enabled. The occupancy slots are not enforced: the block accepts a reservation of any guest count the resource category allows, while it holds a free unit.

## Reading the occupancy allocation

{% hint style="danger" %}

### Restricted operation

The allocation operation described in this section is under development and available on request only. Its contract can still change before general release. Contact Mews before you build against it.

{% endhint %}

The allocation of a single availability block is returned by `availabilityBlocks/getAllocation`. Each resource category entry in the response carries an `OccupancyAllocations` collection describing the occupancy breakdown.

`OccupancyAllocations` is never empty:

- When the multi-occupancy feature is enabled and the block has stored occupancy slots for the resource category, it contains one entry per `PersonCount`, ordered by guest count ascending. Every adjustment that [Update service availability] creates for the update interval has stored slots – at least the default slot.
- In all other cases, it contains a single combined entry with `PersonCount` set to `0` that mirrors the resource category totals. This happens when the feature is disabled for the enterprise, even if a split is stored, and when none of the adjustments of the block for the resource category has stored occupancy data – for example, adjustments created before occupancy splits were available.

Clients can therefore read `OccupancyAllocations` without first checking whether a split exists.

The split can be different on different time units. The response contains one entry for each `PersonCount` used on any time unit. On a time unit that has a split but does not define a given slot, that slot reports `0` in every array. For a time unit with no split at all, see [Time units without an occupancy split](#time-units-without-an-occupancy-split).

The resource category arrays remain the authoritative totals. Every picked-up reservation is attributed to a slot, so the per-slot `PickedUp` values sum to the resource category `PickedUp`. The per-slot `EffectiveAvailable` values do not always sum to the resource category `Available`. They subtract `OutgoingOffset`, and they are not set to `0` on released time units. In the overflow example below, the slots sum to -1 on the third time unit while the resource category reports `Available` of 0. Use the resource category `Available` for the remaining capacity of the block.

### Time units without an occupancy split

A resource category can have a split on some time units of the block and none on others. This happens to the part of an existing adjustment that a partial update did not cover (see [An update replaces the whole split](#an-update-replaces-the-whole-split)), and to adjustments created before occupancy splits were available. The response still contains one entry per slot. On a time unit without a split, the slot with the lowest `PersonCount` takes the whole resource category: its `UnitCount` is the resource category `OriginalAvailability` and its `PickedUp` contains all pickups for that time unit. Every other slot reports `0` for that time unit.

### Occupancy allocation

All array properties contain one integer per time unit covered by the block, aligned to the `TimeUnitStartsUtc` array in the response.

| Property             | Type             | Description                                                                                                                                                                            |
| :------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PersonCount`        | integer          | Guest count the slot is defined for. `0` in the combined entry.                                                                            |
| `UnitCount`          | array of integer | Units blocked for the slot. In the combined entry, mirrors the resource category `OriginalAvailability`. On a time unit without a split, the lowest slot shows the resource category `OriginalAvailability` and other slots show `0`. |
| `PickedUp`           | array of integer | Reservations matched to the slot. In the combined entry, mirrors the resource category `PickedUp`.                                                                                     |
| `EffectiveAvailable` | array of integer | Remaining capacity of the slot: `UnitCount - PickedUp - OutgoingOffset`. Negative when the slot absorbed more pickups than it blocked. `0` for every slot of a canceled block. Not set to `0` on released time units, where the resource category `Available` is `0`. In the combined entry, mirrors `Available`.     |
| `OutgoingOffset`     | array of integer | Units the slot donates to cover overflow on other slots. Lowers `EffectiveAvailable` without adding reservations. Always `0` in the combined entry.                                 |
| `Overflow`           | array of integer | Pickups beyond the blocked count of the slot: `max(0, PickedUp - UnitCount)`. `0` while the slot stays within its blocked count, and always `0` in the combined entry.                 |

### Example: block with an occupancy split

A three-night block holding 10 units of one resource category per night, split into 3 single-occupancy and 7 double-occupancy units. One single and one double reservation are picked up each night.

```javascript
{
  "SummaryMetrics": { "Released": 0, "Available": 24, "PickedUp": 6 },
  "TimeUnitStartsUtc": ["2026-06-01T00:00:00Z", "2026-06-02T00:00:00Z", "2026-06-03T00:00:00Z"],
  "ResourceCategoryAllocations": [
    {
      "ResourceCategoryId": "a1b2c3d4-0000-0000-0000-000000000001",
      "EnterpriseAvailable":  [15, 15, 14],
      "OriginalAvailability": [10, 10, 10],
      "PickedUp":             [2, 2, 2],
      "Available":            [8, 8, 8],
      "OccupancyAllocations": [
        {
          "PersonCount": 1,
          "UnitCount":          [3, 3, 3],
          "PickedUp":           [1, 1, 1],
          "EffectiveAvailable": [2, 2, 2],
          "OutgoingOffset":     [0, 0, 0],
          "Overflow":           [0, 0, 0]
        },
        {
          "PersonCount": 2,
          "UnitCount":          [7, 7, 7],
          "PickedUp":           [1, 1, 1],
          "EffectiveAvailable": [6, 6, 6],
          "OutgoingOffset":     [0, 0, 0],
          "Overflow":           [0, 0, 0]
        }
      ]
    }
  ]
}
```

### Example: combined entry

The same block, read when the multi-occupancy feature is disabled for the enterprise, returns a single combined entry that mirrors the resource category totals. With the feature enabled, a block created without `PaxCounts` instead reports its default slot, with `PersonCount` set to the `Capacity` of the resource category.

```javascript
{
  "SummaryMetrics": { "Released": 0, "Available": 24, "PickedUp": 6 },
  "TimeUnitStartsUtc": ["2026-06-01T00:00:00Z", "2026-06-02T00:00:00Z", "2026-06-03T00:00:00Z"],
  "ResourceCategoryAllocations": [
    {
      "ResourceCategoryId": "a1b2c3d4-0000-0000-0000-000000000001",
      "EnterpriseAvailable":  [15, 15, 14],
      "OriginalAvailability": [10, 10, 10],
      "PickedUp":             [2, 2, 2],
      "Available":            [8, 8, 8],
      "OccupancyAllocations": [
        {
          "PersonCount": 0,
          "UnitCount":          [10, 10, 10],
          "PickedUp":           [2, 2, 2],
          "EffectiveAvailable": [8, 8, 8],
          "OutgoingOffset":     [0, 0, 0],
          "Overflow":           [0, 0, 0]
        }
      ]
    }
  ]
}
```

### Example: overflow and cross-slot balancing

The same split block. On the third night the block is fully picked up: 8 double-occupancy reservations against 7 blocked double-occupancy units, and 2 single-occupancy reservations against 3 blocked single-occupancy units. The single-occupancy slot has one spare unit and absorbs the excess.

```javascript
{
  "SummaryMetrics": { "Released": 0, "Available": 16, "PickedUp": 14 },
  "TimeUnitStartsUtc": ["2026-06-01T00:00:00Z", "2026-06-02T00:00:00Z", "2026-06-03T00:00:00Z"],
  "ResourceCategoryAllocations": [
    {
      "ResourceCategoryId": "a1b2c3d4-0000-0000-0000-000000000001",
      "EnterpriseAvailable":  [15, 15, 14],
      "OriginalAvailability": [10, 10, 10],
      "PickedUp":             [2,  2,  10],
      "Available":            [8,  8,   0],
      "OccupancyAllocations": [
        {
          "PersonCount": 1,
          "UnitCount":          [3, 3, 3],
          "PickedUp":           [1, 1, 2],
          "EffectiveAvailable": [2, 2, 0],
          "OutgoingOffset":     [0, 0, 1],
          "Overflow":           [0, 0, 0]
        },
        {
          "PersonCount": 2,
          "UnitCount":          [7, 7, 7],
          "PickedUp":           [1, 1, 8],
          "EffectiveAvailable": [6, 6, -1],
          "OutgoingOffset":     [0, 0, 0],
          "Overflow":           [0, 0, 1]
        }
      ]
    }
  ]
}
```

On the third night the 2-person slot picked up 8 reservations against 7 blocked units, so it reports an `Overflow` of 1 and an `EffectiveAvailable` of -1. The 1-person slot blocked 3 units and picked up 2, so it donated its single spare unit: an `OutgoingOffset` of 1 and an `EffectiveAvailable` of 0. The resource category totals report 10 picked up and 0 available – all 10 units accounted for.

[Availability block]: ../operations/availabilityblocks.md#availability-block
[Resource category]: ../operations/resources.md#resource-category
[Update service availability]: ../operations/services.md#update-service-availability
[Availability update]: ../operations/services.md#availability-update
[Pax count]: ../operations/services.md#pax-count
[Add reservations]: ../operations/reservations.md#add-reservations
[Get all availability adjustments]: ../operations/availabilityadjustments.md#get-all-availability-adjustments
[Availability adjustment]: ../operations/availabilityadjustments.md#availability-adjustment
