# Booking engine

A booking engine, or Internet Booking Engine (IBE), is the online funnel a property uses to take direct reservations: the guest picks dates and a room, sees live availability and pricing, adds extras and pays.
Building your own booking engine on the **Mews Connector API** gives you full control over availability, pricing, upsells and payment.
The sections below follow the guest journey in order.

## Choosing the right option

|                     | Mews Booking Engine       | Mews Booking Engine API        | Mews Connector API (this guide) |
| :------------------ | :------------------------ | :----------------------------- | :------------------------------ |
| **Front-end**       | Built and hosted by Mews  | You build it                   | You build it                    |
| **Calls made from** | Mews-hosted               | Guest's browser                | Your server                     |
| **Customization**   | Limited                   | Moderate                       | Unlimited                       |
| **Dev effort**      | Minimal                   | Moderate                       | High                            |
| **Best for**        | Ready-made direct channel | Custom UI on Mews' booking API | Fully bespoke funnel            |

{% hint style="info" %}

### Front-end vs server-to-server

The Mews Booking Engine API is called directly by the guest's browser and has anti-scraping protection, so it is not suited to server-side polling.
For server-to-server integrations, use the Mews Connector API.
See [The Mews APIs] and the [Booking Engine Guide].

{% endhint %}

## Before you start

{% hint style="info" %}

### Please note

This is a recommended starting point, not an exhaustive list.
Depending on your product – deposits, multi-property, loyalty, extra services, tax or payment setups – you may need more operations.

{% endhint %}

{% hint style="warning" %}

### Server-to-server only

Never call the Connector API from the browser – card data and credentials stay on your backend.
See the [Usage guidelines].

{% endhint %}

{% hint style="info" %}

### Prerequisite

The property must be on the Enterprise tier or have the Connectivity add-on.
All requests use your `ClientToken` and `AccessToken`.

{% endhint %}

## Displaying the property and rooms

1. Get the bookable "Stay" service (filter `ServiceType` = `Bookable`) and store its `ServiceId` – every later call needs it.
2. Get the room categories, with `Capacity` and `ExtraCapacity` (maximum occupancy), names and type.
3. Get each category's images and features.
4. Get the age categories – their IDs are needed to create the reservation.

| 'How to' use case               | API Operations                                                       |
| :------------------------------ | :------------------------------------------------------------------- |
| How to get the bookable service | [Get all services]                                                   |
| How to get room categories      | [Get all resource categories]                                        |
| How to get category images      | [Get all resource category image assignments], [Get image URLs]      |
| How to get category features    | [Get all resource features], [Get all resource feature assignments] |
| How to get age categories       | [Get all age categories]                                             |

## Checking availability

1. Get the service availability per category for the date range.
2. Get the restrictions to catch close-outs and minimum or maximum length-of-stay rules.

| 'How to' use case                              | API Operations                              |
| :--------------------------------------------- | :------------------------------------------ |
| How to get availability per category           | [Get service availability (ver 2024-01-22)] |
| How to get close-outs and length-of-stay rules | [Get all restrictions]                      |

{% hint style="info" %}

### Use the latest version

`services/getAvailability/2024-01-22` returns richer availability metrics and is the recommended version.

{% endhint %}

## Pricing the stay

1. Get the rates; keep only those where `IsPublic`, `IsEnabled` and `IsActive` are all `true`.
2. Price each rate per category across the dates. Prices come as a list – sum them.
3. Validate any promo code and unlock the rates it grants.
4. For rates that bundle a product (e.g. breakfast), use the rules to find the `ProductId`, then add its `GrossValue` according to the `PostingMode`.

| 'How to' use case                           | API Operations     |
| :------------------------------------------ | :----------------- |
| How to get bookable rates                   | [Get all rates]    |
| How to price a rate                         | [Get rate pricing] |
| How to validate a promo code                | [Get all vouchers] |
| How to find products bundled into a rate    | [Get all rules]    |
| How to get product prices and posting modes | [Get all products] |

## Adding extras

1. Reuse [Get all products] for optional add-ons; filter out items already bundled into the rate.
2. Store any day-specific choices with their dates for the reservation.

| 'How to' use case          | API Operations     |
| :------------------------- | :----------------- |
| How to get optional extras | [Get all products] |

## Creating the reservation

1. Create the guest profile to get a `CustomerId`. If the email already exists, fetch the existing customer instead.
2. Create the reservation in the `Optional` state (`ServiceId`, `CustomerId`, category, rate, dates, age-category counts), pending payment.

| 'How to' use case                | API Operations      |
| :------------------------------- | :------------------ |
| How to create a customer         | [Add customer]      |
| How to find an existing customer | [Get all customers] |
| How to create the reservation    | [Add reservations]  |

{% hint style="info" %}

### Billing is at the profile level

Payments post to the customer profile, not the reservation, so the `CustomerId` is needed throughout payment.

{% endhint %}

## Taking payment

Payment goes through Mews Payments via the PCI Proxy.
The guest types their card into PCI Proxy iframes, not your page, so card data never touches your server.
You get a short-lived `transactionId`, hand it to Mews, and Mews charges the card.
For how Mews handles card data, see [Mews PCI compliance].

1. **Your backend** – [Get configuration]; read `PaymentCardStorage.PublicKey`. This is your PCI Proxy `merchantId`.
2. **Your frontend** – set up the [PCI Proxy Secure Fields] form to collect card number, CVV and expiry (iframes are injected, so card data bypasses your server).
3. **Your frontend** – call `initTokenize(merchantId, …)`, then `submit({expm, expy})`; on success you get a `transactionId`.
4. **Your frontend** – send the `transactionId` (plus cardholder name and expiry) to your backend.
5. **Your backend** – [Add tokenized credit card] with `CustomerId`, the `transactionId` and obfuscated card details in `CreditCardData`, plus `Expiration`. Returns a `CreditCardId`.
6. **Your backend** – [Charge credit card] with the `CreditCardId` and amount.

| 'How to' use case                 | API Operations              |
| :-------------------------------- | :-------------------------- |
| How to get the PCI Proxy key      | [Get configuration]         |
| How to check for an existing card | [Get all credit cards]      |
| How to store a tokenized card     | [Add tokenized credit card] |
| How to charge a card              | [Charge credit card]        |

{% hint style="info" %}

### Use the public key

Use the `PublicKey` from [Get configuration] as your PCI Proxy `merchantId`.

{% endhint %}

{% hint style="warning" %}

### Transaction IDs expire

A `transactionId` is valid for 30 minutes only – charge promptly.

{% endhint %}

{% hint style="info" %}

### Mews does the token exchange

Don't follow the PCI Proxy "Obtain the tokens" step – Mews does that server-to-server inside [Add tokenized credit card].

{% endhint %}

{% hint style="info" %}

### Obfuscated number

In [Add tokenized credit card], `ObfuscatedNumber` should hold at most the first six and last four digits, or 16 asterisks.

{% endhint %}

{% hint style="info" %}

### Expiration date

Cache the expiry from your form and pass it to [Add tokenized credit card].
It isn't sent to PCI Proxy, but it shows on the profile and flags expired cards.

{% endhint %}

{% hint style="warning" %}

### Only gateway cards can be charged

Only cards with `Kind` = `Gateway` can be charged via the API. Check with [Get all credit cards].

{% endhint %}

{% hint style="warning" %}

### Store, then charge

[Add tokenized credit card] only stores the card; [Charge credit card] actually charges it. Both are required, in that order.

{% endhint %}

{% hint style="info" %}

### Cards aren't shared across a chain

Customer profiles are shared across a chain's properties, but stored credit cards are not.

{% endhint %}

## Confirming the reservation

Once payment is posted, change the reservation from `Optional` to `Confirmed`.
This order means unpaid holds don't block inventory.

| 'How to' use case              | API Operations        |
| :----------------------------- | :-------------------- |
| How to confirm the reservation | [Confirm reservation] |

## Testing your integration

Follow our general [Usage guidelines].
Build against a demo environment – IDs can be read from the demo Mews Operations or fetched with the operations above.
Create a booking end to end and confirm it lands in Mews with the correct room, rate, extras and payment.
Before onboarding a live property, check they've finished their rate, availability and payment configuration.

### Additional help for working with the demo environment

- Help guide: [Set up a bookable service]

[Add customer]: ../operations/customers.md#add-customer
[Add reservations]: ../operations/reservations.md#add-reservations
[Add tokenized credit card]: ../operations/creditcards.md#add-tokenized-credit-card
[Booking Engine Guide]: https://docs.mews.com/booking-engine-guide
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
[Set up a bookable service]: https://help.mews.com/s/article/set-up-a-bookable-service?language=en_US
[The Mews APIs]: https://docs.mews.com/getting-started/the-mews-apis
[Usage guidelines]: ../guidelines/README.md
