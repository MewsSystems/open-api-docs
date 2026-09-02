# Multi-occupancy availability blocks

An explanation of how an [Availability block] splits its allocated units by guest count, and how reservations are matched to those splits.

## What is an occupancy split?

An [Availability block] holds a guaranteed set of units for a group, event, or company – for example, 10 units of a [Resource category] per night for a conference.

A **multi-occupancy** availability block divides that allocation by guest count. Instead of "10 units", the block can hold "3 units for single occupancy and 7 units for double occupancy". Each part of the division is an **occupancy slot**: a pairing of a guest count (`PersonCount`) with a number of blocked units (`UnitCount`).

An occupancy split changes how the block is reported and how bookings are evaluated against it. It does not change the total number of units the block holds.

{% hint style="info" %}

### Feature availability

Defining more than one occupancy slot per availability adjustment requires the multi-occupancy availability blocks feature to be enabled for the enterprise. When the feature is disabled, an adjustment accepts at most one occupancy slot.

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

### Rules

- **Block updates only.** `PaxCounts` applies to updates that set an `AvailabilityBlockId`. On an update without one, it has no effect.
- **Maximum of 5 entries.** Each `PersonCount` must be unique within the collection, must be positive, and must not exceed the capacity of the resource category.
- **Totals must reconcile.** The sum of all `UnitCount` values must equal the absolute value of `UnitCountAdjustment.Value`.
- **No split supplied.** A block adjustment sent without `PaxCounts` is stored as one slot covering the whole adjustment. On the read side it appears as a single combined entry, so the block behaves the same as one with no occupancy split.

{% hint style="warning" %}

### An update replaces the whole split

[Update service availability] overwrites any existing adjustment for the same resource category, block, and interval. A later call that omits `PaxCounts` therefore collapses a previously defined split back into a single combined allocation.

To keep a split in place, re-send the full `PaxCounts` collection on every update that touches the interval.

{% endhint %}

## How reservations are matched to occupancy slots

Reservations need no new field to participate in a multi-occupancy block. [Add reservations] is unchanged: a reservation already carries its guest count in `PersonCounts` and its block in `AvailabilityBlockId`.

A reservation is not bound to a slot when it is created. Its pickup is attributed to the slot with the **largest `PersonCount` that does not exceed the reservation's total guest count**. A reservation with a guest count below every defined slot is attributed to the lowest slot. The matching is recomputed each time the allocation is read, so every picked-up reservation always lands in a defined slot and there is no unmatched bucket.

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

Occupancy slots guide the distribution of a block; they are not separate capacity limits. The total number of units in the block is what constrains bookings.

When a slot picks up more reservations than its blocked count, the excess is reported on that slot as `Overflow`, and spare capacity on a sibling slot is consumed to cover it. The donating slot reports the consumed units as `OutgoingOffset`, which lowers its own remaining availability without adding reservations to it.

The result is that an individual slot can report more pickups or less availability than its own `UnitCount` suggests, while the resource category totals stay exact. The remaining availability of the block is never overstated.

When the multi-occupancy feature is enabled, overbooking checks are evaluated against the matched occupancy slot, with the cross-slot balancing above, rather than against the block total alone. If several availability adjustments overlap on the same resource category and date, the check falls back to the block total for that date. With the feature disabled, overbooking is always evaluated against the block total.

## Reading the occupancy allocation

{% hint style="danger" %}

### Restricted operation

The allocation operation described in this section is under development and available on request only. Its contract can still change before general release. Contact Mews before you build against it.

{% endhint %}

The allocation of a single availability block is returned by `availabilityBlocks/getAllocation`. Each resource category entry in the response carries an `OccupancyAllocations` collection describing the occupancy breakdown.

`OccupancyAllocations` is never empty:

- When the block defines occupancy slots, it contains one entry per slot, ordered by guest count ascending.
- When the block has no occupancy split, it contains a single combined entry with `PersonCount` set to `0` that mirrors the resource category totals.

Clients can therefore read `OccupancyAllocations` without first checking whether a split exists.

The resource category arrays remain the authoritative totals. Every picked-up reservation is attributed to a slot, so the per-slot `PickedUp` values reconcile to the resource category `PickedUp` total. Per-slot `EffectiveAvailable` does not reconcile the same way. It subtracts `OutgoingOffset`, so the per-slot values sum to the resource category `Available` minus the total `OutgoingOffset` across the slots, and match it only while no slot overflows. In the overflow example below, the slots sum to -1 on the third time unit while the resource category reports `Available` of 0. Use the resource category `Available` when you need the remaining capacity of the block.

### Occupancy allocation

All array properties contain one integer per time unit covered by the block, aligned to the `TimeUnitStartsUtc` array in the response.

| Property             | Type             | Description                                                                                                                                                                            |
| :------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PersonCount`        | integer          | Guest count the slot is defined for. `0` in the combined entry returned when no occupancy split is defined.                                                                            |
| `UnitCount`          | array of integer | Units blocked for the slot. In the combined entry, mirrors the resource category `OriginalAvailability`.                                                                               |
| `PickedUp`           | array of integer | Reservations matched to the slot. In the combined entry, mirrors the resource category `PickedUp`.                                                                                     |
| `EffectiveAvailable` | array of integer | Remaining capacity of the slot: `UnitCount - PickedUp - OutgoingOffset`. Negative when the slot absorbed more pickups than it blocked. In the combined entry, mirrors `Available`.     |
| `OutgoingOffset`     | array of integer | Units the slot donates to cover overflow on a sibling slot. Lowers `EffectiveAvailable` without adding reservations. Always `0` in the combined entry.                                 |
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

### Example: block without an occupancy split

The same block with no occupancy split returns a single combined entry that mirrors the resource category totals.

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
