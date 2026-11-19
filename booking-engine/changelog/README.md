# Changelog

## 19th November 2026
* Integrations: [Google Triggers Reference](../integrations/google-triggers-reference.md):
  * **Deprecated** `reservationGroupName` in the [purchase](../integrations/google-triggers-reference.md#purchase) and [ga4_ConfirmationLoaded](../integrations/google-triggers-reference.md#ga4_confirmationloaded) events, effective immediately. The value contains the guest's last name. It will be removed by 7 December 2026. Use `reservationGroupId` instead. See [Deprecations](../booking-engine-api/deprecations/README.md).
  * Added `reservationGroupId` to the list of [purchase](../integrations/google-triggers-reference.md#purchase) variables, and removed `reservationGroupName` from the example.

## 10th November 2026
* Integrations: [Google Triggers Reference](../integrations/google-triggers-reference.md):
  * Extended all [GA4 eCommerce events](../integrations/google-triggers-reference.md#ga4-ecommerce-events) with `hotelName`, `hotelId`, `startDate` and `endDate`.
  * Added `checkInDate` and `checkOutDate` to room items in [add_to_cart](../integrations/google-triggers-reference.md#add_to_cart), `remove_from_cart`, `begin_checkout` and `add_payment_info`.
  * Fixed `startDate` and `endDate` descriptions in [purchase](../integrations/google-triggers-reference.md#purchase), and described how they work for rooms with different date ranges.
  * Added the missing [view_item](../integrations/google-triggers-reference.md#view_item) event.
  * Added a note that Data Layer values don't persist between events.

## 23rd March 2026
* API: Changed `OccupancyData` property from required to optional in [Get availability](../booking-engine-api/operations/hotels.md#get-availability) request object. Documentation-only, no change to the API.

| Changelog by year |
| :-- |
| [Changelog 2025](changelog2025.md) |
| [Changelog 2024](changelog2024.md) |
| [Changelog 2023](changelog2023.md) |
| [Changelog 2022](changelog2022.md) |
| [Changelog 2021](changelog2021.md) |
| [Changelog 2020](changelog2020.md) |
