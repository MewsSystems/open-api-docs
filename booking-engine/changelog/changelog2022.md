# Changelog 2022

## 13th December 2022
* API: Added [OpenAPI definition](../booking-engine-api/README.md#openapi-definition)

## 9th November 2022
* API: Changed [SettlementValue](../booking-engine-api/operations/hotels.md#rate-group) to optional field and added `SettlementFlatValue` property of absolute settlement amount

## 25th October 2022
* Widget: Added new [Google Analytics 4](../integrations/google-triggers-reference.md#google-analytics-4-ga4-events) documentation
* Widget: Enhanced [Google Tag Manager (GTM)](../integrations/google-tag-manager.md#google-tag-manager-gtm) documentation

## 20th October 2022

* API: Added new operation [Get services availability](../booking-engine-api/operations/services.md#get-services-availability)
* API: Added new operation [Get services pricing](../booking-engine-api/operations/services.md#get-services-pricing)

## 19th October 2022

* API: Added new operation [Get reservation price](../booking-engine-api/operations/reservations.md#get-reservation-price)

## 1st July 2022

* API: Added new operation [Get availability blocks](../booking-engine-api/operations/availability-blocks.md#get-availability-blocks)
* API: `AvailabilityBlockId` property added to [Get availability](../booking-engine-api/operations/hotels.md#get-availability), [Create reservation groups](../booking-engine-api/operations/reservation-groups.md#create-reservation-groups) and [Get reservation pricing](../booking-engine-api/operations/reservations.md#get-reservation-pricing)
* API: Added new [Availability Blocks Use Case](../booking-engine-api/use-cases/availability-blocks.md)
* API: Added new [Supported currency codes](../booking-engine-api/guidelines/supported-currency-codes.md) documentation.
* API: Added new [Supported language codes](../booking-engine-api/guidelines/supported-language-codes.md) documentation.

## 7th June 2022

* General: Launch of __Mews Booking Engine Guide__ at new URL [https://mews-systems.gitbook.io/booking-engine-guide/](https://mews-systems.gitbook.io/booking-engine-guide/), based on the old Distributor Guide
  * Entire documentation re-structured and re-worded, for improved navigation and readability, and for consistency with other Mews APIs
  * Product re-branded from 'Distributor' to 'Mews Booking Engine'
  * No changes to API functionality

## 28th March 2022

* API: Password for test environment changed to _Distributor-api1_

## 18th January 2022

* Widget: Introduced new API methods to Distributor instance: [`setAdultCount`](../booking-engine-widget/reference.md) and [`setChildCount`](../booking-engine-widget/reference.md).
* Standalone: Introduced new deeplinks `mewsAdultCount` and `mewsChildCount` to set initial occupancy.

| Next |
| :-- |
| [Changelog 2021](changelog2021.md) |
