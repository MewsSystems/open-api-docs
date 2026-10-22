# Booking engine

## Overview

A booking engine, or Internet Booking Engine (IBE), is the online funnel an enterprise uses to take direct reservations: the guest picks dates and a room, sees live availability and pricing, adds extras and pays. Building your own on the **Mews Connector API** gives you full control over availability, pricing, upsells and payment. The sections below follow the guest journey in order.

{% hint style="info" %}
### Recommended starting point

This is a recommended starting point, not an exhaustive list. Depending on your product, deposits, multi-property, loyalty, extra services, tax or payment setups may require more operations.
{% endhint %}

## Prerequisites

* If Mews will set up your integration as a **private integration** – that is, it is not publicly listed on the Marketplace – the enterprise must be on the **Enterprise tier** or have the **Connectivity add-on**. This requirement does not apply to public certified integrations that enterprises connect to themselves.
* All requests use your `ClientToken` and `AccessToken`.
* **Server-to-server only:** Never call the Connector API from the browser. Keep card data and credentials on your backend. See the [Usage guidelines].

## Integration patterns at a glance

This use case has one pattern: a self-built booking funnel that calls the Connector API directly and follows the guest journey: display, availability, pricing, extras, reservation, payment and confirmation. There is no two-way variant. Complexity varies by product: deposits, multi-property, loyalty, extra services and tax setups all add operations beyond this baseline.

## Connector API vs Distributor API

| | Mews Distributor API | Mews Connector API |
| :-- | :-- | :-- |
| **Purpose** | Purpose-built for booking engines. | General-purpose. |
| **Operations** | Simpler, opinionated and bundled; for example, get rooms and pricing in one call. | More granular; requires client-side business logic for pricing. |
| **Pricing** | Calculates the final price, including product rules such as breakfast. | Returns prices as a list; the client must sum them. |
| **Payments** | Supports on-session payments. | Server-to-server only. |
| **Authentication** | Register a Distributor Client with Mews and use the enterprise ID. | Send `ClientToken` and `AccessToken` in the request body. |
| **Flexibility** | Less flexible. | Full access to Mews data; more flexible. |
| **Implementation effort** | Lower. | Higher. |

**When to choose which:**

* Choose the **Mews Distributor API** if you want a simpler integration with bundled operations and built-in pricing logic.
* Choose the **Mews Connector API** if you need full control over availability, pricing, upsells, multi-property support or deeper Mews data access.

## Operation quick reference

### Enterprise and rooms

| How to | API operation | Documentation |
| :-- | :-- | :-- |
| Get the bookable service | `services/getAll` | [Services] |
| Get room categories | `resourceCategories/getAll` | [Resource categories] |
| Get category images | `resourceCategoryImageAssignments/getAll`, image URLs | [Resource categories], [Images] |
| Get category features | `resourceFeatures/getAll`, `resourceFeatureAssignments/getAll` | [Resource features] |
| Get age categories | `ageCategories/getAll` | [Age categories] |

### Availability

| How to | API operation | Documentation |
| :-- | :-- | :-- |
| Get availability per category | `services/getAvailability/2024-01-22` | [Services] |
| Get close-outs and length-of-stay rules | `restrictions/getAll` | [Restrictions] |

{% hint style="info" %}
#### Use the latest version

`services/getAvailability/2024-01-22` returns richer availability metrics and is the recommended version.
{% endhint %}

### Pricing

| How to | API operation | Documentation |
| :-- | :-- | :-- |
| Get bookable rates | `rates/getAll` | [Rates] |
| Price a rate | `rates/getPricing` | [Rates] |
| Validate a promo code | `vouchers/getAll` | [Vouchers] |
| Find products bundled into a rate | `rules/getAll` | [Rules] |
| Get product prices and posting modes | `products/getAll` | [Products] |

### Extras

| How to | API operation | Documentation |
| :-- | :-- | :-- |
| Get optional extras | `products/getAll` | [Products] |

### Guest and reservation

| How to | API operation | Documentation |
| :-- | :-- | :-- |
| Create a customer | `customers/add` | [Customers] |
| Find an existing customer | `customers/getAll` | [Customers] |
| Create the reservation | `reservations/add` | [Reservations] |

{% hint style="info" %}
#### Billing is at the profile level

Payments post to the customer profile, not the reservation, so `CustomerId` is required throughout the payment flow.
{% endhint %}

### Payment

| How to | API operation | Documentation |
| :-- | :-- | :-- |
| Get the PCI Proxy key | `configuration/get` | [Configuration] |
| Check for an existing card | `creditCards/getAll` | [Credit cards] |
| Store a tokenized card | `creditCards/addTokenized` | [Credit cards] |
| Charge a card | `creditCards/charge` | [Credit cards] |

{% hint style="info" %}
#### Payment automation details

For complete detail, including Mews PCI compliance, see the [Payment automation use case](payment-automation.md). The tokenized-card flow here is identical.
{% endhint %}

### Confirmation

| How to | API operation | Documentation |
| :-- | :-- | :-- |
| Confirm the reservation | `reservations/confirm` | [Reservations] |

## Integration journey

### 1. Display the enterprise and rooms

* Get room categories, including `Capacity` and `ExtraCapacity` for maximum occupancy, names and type.
* Get each category's images and features.
* Get age categories. Their IDs are required when creating the reservation.

### 2. Check availability

* Get service availability per category for the requested date range.
* Get restrictions to catch close-outs and minimum or maximum length-of-stay rules.

### 3. Price the stay

* Get rates. Show only rates where `IsPublic`, `IsEnabled` and `IsActive` are all `true`.
* Price each rate per category across the dates. Prices are returned as a list; sum them.
* Validate any promo code and unlock the rates it grants.
* For rates that bundle a product, such as breakfast, use `rules/getAll` to find the `ProductId`, then add its `GrossValue` according to the `PostingMode`.

### 4. Add extras

* Reuse `products/getAll` for optional add-ons. Filter out items already bundled into the rate.
* Store any day-specific choices with their dates for inclusion in the reservation.

### 5. Create the reservation

* Create the guest profile with `customers/add` to get a `CustomerId`. If the email already exists, fetch the existing customer with `customers/getAll` instead.
* Create the reservation in the `Optional` state. Pass `ServiceId`, `CustomerId`, category, rate, dates and age-category counts to hold inventory pending payment.

**Key write call:**

```javascript
POST /api/connector/v1/reservations/add
{
  "ClientToken": "...",
  "AccessToken": "...",
  "Client": "Sample Client 1.0.0",
  "ServiceId": "bd26d8db-86da-4f96-9efc-e5a4654a4a94",
  "SendConfirmationEmail": true,
  "Reservations": [
    {
      "Identifier": "1234",
      "State": "Optional",
      "StartUtc": "2026-09-01T14:00:00Z",
      "EndUtc": "2026-09-03T10:00:00Z",
      "CustomerId": "e465c031-fd99-4546-8c70-abcf0029c249",
      "RequestedCategoryId": "0a5da171-3663-4496-a61e-35ecbd78b9b1",
      "RateId": "a39a59fa-3a08-4822-bdd4-ab0b00e3d21f",
      "PersonCounts": [
        { "AgeCategoryId": "1f67644f-052d-4863-acdf-ae1600c60ca0", "Count": 2 }
      ]
    }
  ]
}
```

{% hint style="info" %}
#### Create an optional reservation

Set `State` to `Optional`, not `Confirmed`, when creating the reservation. This holds inventory without confirming it to the guest until payment posts.
{% endhint %}

### 6. Take payment

Payment goes through Mews Payments via PCI Proxy. The guest enters card details into PCI Proxy iframes, not your page, so card data never reaches your server. You receive a short-lived `transactionId`, pass it to Mews and Mews charges the card.

**Steps:**

1. **Your backend:** Call `configuration/get` and read `PaymentCardStorage.PublicKey`. This is your PCI Proxy `merchantId`.
2. **Your frontend:** Set up the [PCI Proxy Secure Fields] form to collect card number, CVV and expiry. The injected iframes keep card data out of your server.
3. **Your frontend:** Call `initTokenize(merchantId, ...)`, then `submit({expm, expy})`. On success, you receive a `transactionId`.
4. **Your frontend:** Send the `transactionId`, cardholder name and expiry to your backend.
5. **Your backend:** Call `creditCards/addTokenized` with `CustomerId`, the `transactionId`, obfuscated card details in `CreditCardData` and `Expiration`. The operation returns a `CreditCardId`.
6. **Your backend:** Call `creditCards/charge` with the `CreditCardId` and amount.

**Payment notes:**

* **Use the public key:** Use the `PublicKey` from `configuration/get` as your PCI Proxy `merchantId`.
* **Transaction IDs expire:** A `transactionId` is valid for 30 minutes only. Charge promptly after tokenizing.
* **Mews does the token exchange:** Do not follow the PCI Proxy "Obtain the tokens" step. Mews handles that server-to-server in `creditCards/addTokenized`.
* **Obfuscated number:** In `creditCards/addTokenized`, `ObfuscatedNumber` should contain at most the first six and last four digits, or 16 asterisks.
* **Expiration date:** Cache the expiry from your form and pass it to `creditCards/addTokenized`. It is not sent to PCI Proxy, but appears on the profile and flags expired cards.
* **Only gateway cards can be charged:** Only cards with `Kind = Gateway` can be charged through the API. Verify with `creditCards/getAll`.
* **Store, then charge:** `creditCards/addTokenized` only stores the card; `creditCards/charge` charges it. Both steps are required, in that order.
* **Cards are not shared across a chain:** Customer profiles are shared across a chain's enterprises, but stored credit cards are not.

### 7. Confirm the reservation

Once payment is posted, change the reservation from `Optional` to `Confirmed` with `reservations/confirm`. Keeping this as the final step ensures unpaid holds do not block inventory.

## Key considerations

* **Order matters:** Create the reservation as `Optional` first, take payment second and confirm last with `reservations/confirm`. Confirming before payment risks holding inventory against a booking that never completes.
* **AccessToken is enterprise-specific:** A multi-property booking engine needs one token per enterprise, or a Portfolio Access Token where supported.
* Rates must pass `IsPublic`, `IsEnabled` and `IsActive` checks before you show them to guests.
* Validate the promo code before it unlocks the rate for pricing, not after creating the reservation.
* Billing is at the profile level, not the reservation level, so `CustomerId` is required throughout the payment flow.
* Only cards with `Kind = Gateway` can be charged through the API; check with `creditCards/getAll` first.
* A PCI Proxy `transactionId` is valid for 30 minutes only. Charge promptly after tokenizing.
* `creditCards/charge` and the deprecated `payments/addCreditCard` are different operations; only `creditCards/charge` charges the card through the gateway.
* Stored credit cards are not shared across a chain's enterprises, even though customer profiles are.
* Card data never reaches your server. PCI Proxy Secure Fields iframes collect it, while your backend receives only the short-lived `transactionId` and the obfuscated card details you choose to store.

## What is not possible

* You cannot embed third-party widgets inside Mews Operations. The booking engine is a separate guest-facing surface.
* Mews does not provide custom API development for individual partners. The operations listed here are the available surface for this use case.
* Mews does not provide a payment gateway account for partners to use. Automated payments use Mews' account through PCI Proxy, not a partner-supplied processor.
* You cannot top up a preauthorization for a tokenized card through the Connector API today. Only a direct charge is supported.

## Authentication and access

All requests use your `ClientToken` and `AccessToken`; `AccessToken` is enterprise-specific. Call the Connector API server-to-server only, never from the browser, to keep card data and credentials on your backend. See the [Usage guidelines].

Build and test against a demo environment first. Read IDs from demo Mews Operations or fetch them with the operations listed above. Create a booking end to end and confirm that it appears in Mews with the correct room, rate, extras and payment. Before onboarding a live enterprise, verify that it has completed rate, availability and payment configuration.

Help guide: [Set up a bookable service].

## Useful links

| Resource | Link |
| :-- | :-- |
| Connector API documentation | [docs.mews.com/connector-api](https://docs.mews.com/connector-api) |
| Usage guidelines | [Usage guidelines] |
| Payment automation use case | [Payment automation](payment-automation.md) |
| Mews PCI compliance | [PCI compliance](https://help.mews.com/s/article/pci-compliance?language=en_US) |
| PCI Proxy Secure Fields | [docs.pci-proxy.com/docs/secure-fields](https://docs.pci-proxy.com/docs/secure-fields) |
| Set up a bookable service | [help.mews.com](https://help.mews.com/s/article/set-up-a-bookable-service?language=en_US) |
| Partner registration form | [mews.com/en/mews-marketplace-form](https://www.mews.com/en/mews-marketplace-form) |
| Certification form | [mews.typeform.com/to/ehTUz7](https://mews.typeform.com/to/ehTUz7) |

[Age categories]: ../operations/agecategories.md
[Configuration]: ../operations/configuration.md
[Credit cards]: ../operations/creditcards.md
[Customers]: ../operations/customers.md
[Images]: ../operations/images.md
[PCI Proxy Secure Fields]: https://docs.pci-proxy.com/docs/secure-fields
[Products]: ../operations/products.md
[Rates]: ../operations/rates.md
[Reservations]: ../operations/reservations.md
[Resource categories]: ../operations/resourcecategories.md
[Resource features]: ../operations/resourcefeatures.md
[Restrictions]: ../operations/restrictions.md
[Rules]: ../operations/rules.md
[Services]: ../operations/services.md
[Set up a bookable service]: https://help.mews.com/s/article/set-up-a-bookable-service?language=en_US
[Usage guidelines]: ../guidelines/README.md
[Vouchers]: ../operations/vouchers.md
