# Booking engine

A booking engine, or Internet Booking Engine (IBE), is the online funnel a property uses to take direct reservations: the guest picks dates and a room, sees live availability and prices, adds extras and pays.
Building your own booking engine on the **Mews Connector API** gives you full control over availability, pricing, upsells and payment.
The sections below follow the guest journey in order.

## Choosing an API

Mews offers three ways to take direct bookings.

|                        | Mews Booking Engine         | Mews Booking Engine API           | Mews Connector API (this guide) |
| :--------------------- | :-------------------------- | :-------------------------------- | :------------------------------ |
| **Front-end**          | Built and hosted by Mews    | You build it                      | You build it                    |
| **Calls made from**    | Mews-hosted pages           | The guest's browser               | Your server                     |
| **Customization**      | Limited                     | Moderate                          | Full                            |
| **Development effort** | Minimal                     | Moderate                          | High                            |
| **Best for**           | A ready-made direct channel | A custom UI on Mews booking logic | A fully bespoke funnel          |

The Mews Booking Engine API is called directly from the guest's browser and has anti-scraping protection, so requests from a single server can fail.
If your booking engine calls Mews from your backend, use the Mews Connector API.
For more detail, see [The Mews APIs] and the [Booking Engine Guide].

## Before you start

* The property must be on the Enterprise tier or have the Connectivity add-on.
* All requests use your `ClientToken` and the property's `AccessToken`.
* The operations in this guide are a recommended starting point, not an exhaustive list. Deposits, multiple properties, loyalty, extra services, tax setups and payment setups can each need more operations.

{% hint style="warning" %}

### Server-to-server only

Never call the Connector API from the browser. Your credentials and the guest's card data must stay on your backend. See the [Usage guidelines].

{% endhint %}

## Displaying the property and rooms

1. Get the bookable "Stay" service with [Get all services], filtering by `ServiceType` = `Bookable`. Store its `ServiceId` – every later call needs it.
2. Get the room categories with [Get all resource categories]. `Capacity` plus `ExtraCapacity` gives the maximum occupancy.
3. Get each category's images and features.
4. Get the age categories. You need their IDs to price and create the reservation.

| 'How to' use case               | API Operations                                                       |
| :------------------------------ | :------------------------------------------------------------------- |
| How to get the bookable service | [Get all services]                                                   |
| How to get room categories      | [Get all resource categories]                                        |
| How to get category images      | [Get all resource category image assignments], [Get image URLs]      |
| How to get category features    | [Get all resource features], [Get all resource feature assignments] |
| How to get age categories       | [Get all age categories]                                             |

## Checking availability

1. Get availability per room category for the requested dates with [Get service availability (ver 2024-01-22)]. This version returns availability metrics rather than a single count – request the metrics you need and derive the number of bookable rooms per category.
2. Get restrictions with [Get all restrictions] to catch close-outs and minimum or maximum length-of-stay rules. Restrictions can apply to a rate, a rate group or a room category.

Availability and pricing operations accept only timestamps at the start of a [time unit](../concepts/time-units.md) – for a nightly service, midnight in the property's time zone, converted to UTC.

| 'How to' use case                              | API Operations                              |
| :--------------------------------------------- | :------------------------------------------ |
| How to get availability per room category      | [Get service availability (ver 2024-01-22)] |
| How to get close-outs and length-of-stay rules | [Get all restrictions]                      |

## Pricing the stay

1. Get the rates with [Get all rates]. Show only rates where `IsEnabled` and `IsActive` are `true`. Show rates where `IsPublic` is `false` only when the guest has a promo code that unlocks them.
2. To validate a promo code, call [Get all vouchers] with the code in `VoucherCodeValues` and `VoucherAssignments` set to `true`. The voucher assignments list the rates the code unlocks. Check that the code is active and within its validity dates. Keep the code – you must send it when creating the reservation.
3. To show prices while the guest browses, call [Get rate pricing] for each rate. It returns base prices per room category per night, plus separate adjustments for age categories and extra or empty beds.
4. For rates that include a product (for example, breakfast), call [Get all rules] with `RuleActions` set to `true` to find the `ProductId` the rate adds. Get its price from [Get all products]. The product's `ChargingMode` decides how its `GrossValue` multiplies (once, per night, per person or per person per night).
5. Before creating the reservation, call [Price reservations] with the exact dates, room category, rate, person counts, extras and promo code. It returns the `TotalAmount` to show the guest and to charge.

| 'How to' use case                            | API Operations       |
| :------------------------------------------- | :------------------- |
| How to get bookable rates                    | [Get all rates]      |
| How to validate a promo code                 | [Get all vouchers]   |
| How to price a rate per night                | [Get rate pricing]   |
| How to find products included in a rate     | [Get all rules]      |
| How to get product prices and charging modes | [Get all products]   |
| How to get the total price of a stay         | [Price reservations] |

## Adding extras

1. Use [Get all products] for optional add-ons. Leave out products the rate already includes.
2. Send the chosen extras in `ProductOrders` when you create the reservation. For an extra on specific days, set its `StartUtc` and `EndUtc`.

| 'How to' use case          | API Operations     |
| :------------------------- | :----------------- |
| How to get optional extras | [Get all products] |

## Creating the reservation

1. Find or create the guest profile. Search by email with [Get all customers] first. If there is no match, create the profile with [Add customer] and `OverwriteExisting` set to `false`. Don't use `OverwriteExisting` set to `true` from a public booking form – anyone who enters a guest's email could overwrite that guest's details.
2. Create the reservation with [Add reservations] in the `Optional` state. Send the `ServiceId`, `CustomerId`, room category, rate, dates, `PersonCounts` per age category, `ProductOrders` and any `VoucherCode`. Set `SendConfirmationEmail` to `false` so the guest gets one email, sent at confirmation.

Payments post to the customer profile, not to the reservation, so keep the `CustomerId` for the payment steps.

| 'How to' use case                | API Operations      |
| :------------------------------- | :------------------ |
| How to find an existing customer | [Get all customers] |
| How to create a customer         | [Add customer]      |
| How to create the reservation    | [Add reservations]  |

{% hint style="warning" %}

### Optional reservations hold rooms

An `Optional` reservation holds the room until it is confirmed, released or canceled. Set `ReleasedUtc` so that abandoned bookings release automatically, and cancel the reservation with [Cancel reservation] if payment fails.

{% endhint %}

## Taking payment

Payment goes through Mews Payments using PCI Proxy.
The guest enters card details into PCI Proxy iframes on your page, so card data never reaches your server.
PCI Proxy returns a short-lived `transactionId`, your backend passes it to Mews, and Mews charges the card.
For how Mews handles card data, see [Mews PCI compliance].

1. **Backend** – call [Get configuration] and read `PaymentCardStorage.PublicKey`. Use it as your PCI Proxy `merchantId`.
2. **Frontend** – set up the [PCI Proxy Secure Fields] form for card number, CVV and expiry date.
3. **Frontend** – call `initTokenize(merchantId, …)`, then `submit({expm, expy})`. On success, PCI Proxy returns a `transactionId`.
4. **Frontend** – send the `transactionId`, cardholder name and expiry date to your backend.
5. **Backend** – store the card with [Add tokenized credit card]. Send the `CustomerId`, the `transactionId`, the obfuscated card details in `CreditCardData` and the `Expiration`. The operation returns a `CreditCardId`.
6. **Backend** – charge the card with [Charge credit card], using the `CreditCardId` and the `TotalAmount` from [Price reservations].

| 'How to' use case                 | API Operations              |
| :-------------------------------- | :-------------------------- |
| How to get the PCI Proxy key      | [Get configuration]         |
| How to check for an existing card | [Get all credit cards]      |
| How to store a tokenized card     | [Add tokenized credit card] |
| How to charge a card              | [Charge credit card]        |

### Payment pitfalls

* **Transaction IDs expire after 30 minutes.** Store and charge the card promptly.
* **Skip the PCI Proxy "Obtain the tokens" step.** Mews exchanges the token server-to-server inside [Add tokenized credit card].
* **Obfuscate the card number.** `ObfuscatedNumber` must contain at most the first six and last four digits, or 16 asterisks.
* **Send the expiry date yourself.** PCI Proxy doesn't pass it to Mews. Cache it from your form and send it in `Expiration` – Mews shows it on the profile and uses it to flag expired cards.
* **Storing a card doesn't charge it.** Call [Charge credit card] after [Add tokenized credit card].
* **Only gateway cards can be charged.** When reusing a stored card, check with [Get all credit cards] that its `Kind` is `Gateway`.
* **Cards aren't shared across a chain.** Customer profiles are shared across a chain's properties, but stored credit cards are not.

## Confirming the reservation

After the charge succeeds, confirm the reservation with [Confirm reservation]. This changes its state from `Optional` to `Confirmed` and, by default, sends the guest a confirmation email.

| 'How to' use case              | API Operations        |
| :----------------------------- | :-------------------- |
| How to confirm the reservation | [Confirm reservation] |

## Testing your integration

Follow the general [Usage guidelines].
Build against a demo environment. You can read IDs in the demo Mews Operations or fetch them with the operations above.
Make a booking end to end – including a promo code, an extra and a failed payment – and check that it appears in Mews with the correct room, rate, extras and payment.
Before going live with a property, check that it has completed its rate, availability and payment configuration.

For setting up the demo environment, see the help guide [Set up a bookable service].

[Add customer]: ../operations/customers.md#add-customer
[Add reservations]: ../operations/reservations.md#add-reservations
[Add tokenized credit card]: ../operations/creditcards.md#add-tokenized-credit-card
[Booking Engine Guide]: https://docs.mews.com/booking-engine-guide
[Cancel reservation]: ../operations/reservations.md#cancel-reservation
[Charge credit card]: ../operations/creditcards.md#charge-credit-card
[Confirm reservation]: ../operations/reservations.md#confirm-reservation
[Get all age categories]: ../operations/agecategories.md#get-all-age-categories
[Get all credit cards]: ../operations/creditcards.md#get-all-credit-cards
[Get all customers]: ../operations/customers.md#get-all-customers
[Get all products]: ../operations/products.md#get-all-products
[Get all rates]: ../operations/rates.md#get-all-rates
[Get all resource categories]: ../operations/resourcecategories.md#get-all-resource-categories
[Get all resource category image assignments]: ../operations/resourcecategories.md#get-all-resource-category-image-assignments
[Get all resource feature assignments]: ../operations/resourcefeatures.md#get-all-resource-feature-assignments
[Get all resource features]: ../operations/resourcefeatures.md#get-all-resource-features
[Get all restrictions]: ../operations/restrictions.md#get-all-restrictions
[Get all rules]: ../operations/rules.md#get-all-rules
[Get all services]: ../operations/services.md#get-all-services
[Get all vouchers]: ../operations/vouchers.md#get-all-vouchers
[Get configuration]: ../operations/configuration.md#get-configuration
[Get image URLs]: ../operations/images.md#get-image-urls
[Get rate pricing]: ../operations/rates.md#get-rate-pricing
[Get service availability (ver 2024-01-22)]: ../operations/services.md#get-service-availability-ver-2024-01-22
[Mews PCI compliance]: https://help.mews.com/s/article/pci-compliance?language=en_US
[PCI Proxy Secure Fields]: https://docs.pci-proxy.com/docs/secure-fields
[Price reservations]: ../operations/reservations.md#price-reservations
[Set up a bookable service]: https://help.mews.com/s/article/set-up-a-bookable-service?language=en_US
[The Mews APIs]: https://docs.mews.com/getting-started/the-mews-apis
[Usage guidelines]: ../guidelines/README.md
