# Deprecations

Deprecations are features of the API which you are discouraged from using, even though they may still be supported for a period of time for the sake of backwards compatibility. Such features are normally deprecated because they are superseded by a better alternative. They can include object properties or entire API operations. The list of deprecations is as follows. Individual items are also highlighted in the [Changelog](../../changelog/README.md) when they occur. Historic deprecations that have already been discontinued may not be listed.

**For more information, see our [Deprecations Policy](https://mews-systems.gitbook.io/open-api/staying-up-to-date/deprecations-policy).**

> **Important:** We strongly advise you to review this list and if you are using any of the deprecated items in your integration, to update your implementation accordingly.

The table columns have the following meanings:

* __Object__ \- JSON data object containing the deprecated field or property
* __Property__ \- Field or property which is deprecated
* __Replaced by__ \- What the replacement is, if applicable
* __Context__ \- The context in which the property is used, usually the API operation
* __Deprecated__ \- The date at which the deprecation notice was given (see the [Changelog](../../changelog/README.md))
* __Discontinued__ \- The date at which it is planned to discontinue the feature completely; a value of '-' indicates no date has been set

## Deprecated object properties

| Object | Property | Replaced by | Context | Deprecated | Discontinued |
| :-- | :-- | :-- | :-- | :-- | :-- |
| [Room occupancy availability](../operations/hotels.md#room-occupancy-availability) | `AdultCount`, `ChildCount` | [OccupancyData](../operations/hotels.md#room-occupancy-availability) | [Get availability](../operations/hotels.md#get-availability) | 18 Mar 2024 | - |
| Request object | `AdultCount`, `ChildCount` | [OccupancyData](../operations/hotels.md#get-availability) | [Get availability](../operations/hotels.md#get-availability) | 18 Mar 2024 | - |
| [Occupancy](../operations/reservations.md#occupancy) | `AdultCount`, `ChildCount` | [OccupancyData](../operations/reservations.md#occupancy) | [Get reservations pricing](../operations/reservations.md#get-reservations-pricing) | 18 Mar 2024 | - |
| [Reservation](../operations/reservations.md#reservation) | `AdultCount`, `ChildCount` | [OccupancyData](../operations/reservations.md#reservation) | [Get reservation price](../operations/reservations.md#get-reservation-price) | 18 Mar 2024 | - |
| [Amount](../operations/reservations.md#amount) | `TaxValues` | [Breakdown](../operations/reservations.md#amount) | [Get reservation price](../operations/reservations.md#get-reservation-price) | 19 Oct 2022 | - |
| [Room category](../operations/hotels.md#room-category) | `ImageIds` | [Category image assignment](../operations/configuration.md#category-image-assignment) \([Get configuration](../operations/configuration.md#get-configuration)\) | [Get configuration](../operations/configuration.md#get-configuration), [Get hotels](../operations/hotels.md#get-hotels) | 21 Oct 2021 | - |
| [Room price](../operations/hotels.md#room-price) | `AverageAmountPerNight` | `AverageAmountPerTimeUnit` | [Get availability](../operations/hotels.md#get-availability), [Get reservations pricing](../operations/reservations.md#get-reservations-pricing) | 21 Jul 2021 | - |
| [Rate group](../operations/hotels.md#rate-group) | `SettlementMaximumNights` | `SettlementMaximumTimeUnits` | [Get availability](../operations/hotels.md#get-availability) | 21 Jul 2021 | - |
| [Product](../operations/hotels.md#product) | `Charging` | `ChargingMode` | [Get hotels](../operations/hotels.md#get-hotels), [Get configuration](../operations/configuration.md#get-configuration) | 21 Jul 2021 | - |
| [Product](../operations/hotels.md#product) | `Posting` | `PostingMode` | [Get hotels](../operations/hotels.md#get-hotels), [Get configuration](../operations/configuration.md#get-configuration) | 21 Jul 2021 | - |
| [Product](../operations/hotels.md#product) | `Amounts`, `RelativePrice` | `Pricing` | [Get hotels](../operations/hotels.md#get-hotels), [Get configuration](../operations/configuration.md#get-configuration) | 01 Jul 2021 | - |
| [Configuration](../operations/configuration.md#configuration-1) | `PaymentCardInput` | `PaymentCardRequirement` | [Get configuration](../operations/configuration.md#get-configuration) | 18 Apr 2021 | - |
