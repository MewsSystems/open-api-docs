# Changelog 2021

## 29th November 2021

* API: Changed domain from www.mews.li to api.mews.com
* Standalone: Changed domain from www.mews.li to api.mews.com
* Widget: Changed domain from www.mews.li to api.mews.com

## 19th November 2021

* Widget: Removed `distributorBedOccupancyChanged` event trigger.

## 9th November 2021

* API: Added [CategoryImageAssignment](../booking-engine-api/operations/configuration.md#category-image-assignment) docs and [deprecated ImageIds in the RoomCategory](../booking-engine-api/deprecations/README.md).

## 3rd August 2021

* API: Added `AverageAmountPerTimeUnit` field to [Room price](../booking-engine-api/operations/hotels.md#room-price) replacing the `AverageAmountPerNight`.
* API: Added `ChargingMode` field to [Product](../booking-engine-api/operations/hotels.md#product) replacing the `Charging`.
* API: Added `PostingMode` field to [Product](../booking-engine-api/operations/hotels.md#product) replacing the `Posting`.
* API: Added `SettlementMaximumTimeUnits` field to [Rate group](../booking-engine-api/operations/hotels.md#rate-group) replacing the `SettlementMaximumNights`.
* Standalone: Stopped supporting `mewsDistributorOpened` deeplink parameter.
* Standalone: Moved introduction guide to [Getting started](../booking-engine-standalone/getting-started.md).
* Widget: Stopped supporting deeplinks in Distributor widget. Deeplinks are now supported only in Distributor Standalone. For a widget, you can use the Widget API instead.
* Widget: Moved introduction guide to Getting started.

## 21st July 2021

* API: Added `Services` parameter at [Get configuration](../booking-engine-api/operations/configuration.md#get-configuration) endpoint that uses newly added [Service](../booking-engine-api/operations/configuration.md#service) object.

## 15th June 2021

* Widget: Rephrased and restructured main, Distributor Widget and Distributor Standalone introduction.
* Widget: Added FAQ about Configuration IDs.

## 10th May 2021

* API: Fixed inconsistency in naming in the documentation.
* API: Fixed DTOs table heading to reflect the columns.

## 3rd May 2021

* API: Added use case on [On session payment card authorization](../booking-engine-api/use-cases/payment-card-authorization.md).

## 19th April 2021

* API: Moved use case on [How to support payment card in booking engine client application](../booking-engine-api/use-cases/supporting-payment-cards.md).

## 30th March 2021

* API: Added use case for [On session payments](../booking-engine-api/use-cases/on-session-payments.md).

## 25th March 2021

* API: Changed naming of URL variables used in the documentation to make clear distinction between application URLs and API URLs.

## 19th March 2021

* API: Changed urls for testing (demo) environments.
* Widget: Changed urls for testing (demo) environments.

## 16th February 2021

* Widget: Removed deprecation notice for no longer supported integrations which can be set up via Google Tag Manager (GTM) integration. 

| Next |
| :-- |
| [Changelog 2020](changelog2020.md) |
