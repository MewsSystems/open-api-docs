# Booking engine

A booking engine lets guests search for accommodation, compare offers, make reservations and pay online. You can build a custom booking engine with the **Mews Connector API** when you need to combine booking with functionality beyond the scope of the **Mews Distributor API**, such as a bespoke guest journey, customer data workflows or other Mews Operations capabilities.

## Choose an API

The Mews Distributor API is purpose-built for booking engines. The Mews Connector API is a general-purpose API for Mews Operations. Choose the API that matches the required scope and implementation effort.

| | Mews Distributor API | Mews Connector API |
| :-- | :-- | :-- |
| **What it is** | A booking-engine API for finding offers, checking availability and creating reservations. | A general-purpose API for accessing Mews Operations data and services. |
| **Best for** | A standard booking engine with a focused booking flow. | A custom booking engine that also needs broader Mews Operations data or workflows. |
| **Approach** | Simpler and opinionated around the booking-engine use case. | More flexible, but requires you to design and implement more of the booking flow. |
| **Data and capabilities** | Provides the data and operations needed for the booking-engine flow. | Provides access to a broader set of Mews data and API operations, including reservations, customers and payments. |

Use the Distributor API if its booking model meets your requirements. Use the Connector API when you need the additional flexibility and are prepared to manage the booking flow, data mapping and operational safeguards yourself.

## Booking flow

A typical Connector API booking flow has the following steps.

### 1. Get services, rates and space types

Retrieve the services configured for the enterprise, then identify the accommodation service to offer. Retrieve rates and resources to present available space types and rate plans in your booking engine. Cache configuration data that changes infrequently instead of loading it for every search.

| 'How to' use case | API Operations |
| :-- | :-- |
| Get configured services | [Get all services] |
| Get configured rates | [Get all rates] |
| Get resources and resource categories | [Get all resources] |

### 2. Check availability and pricing

For the guest's selected dates, use service availability to find available accommodation. Use rate pricing to retrieve prices for a rate, and price reservations when you need a quotation for the exact reservation parameters. Recheck availability and price immediately before creating the reservation, because inventory and prices can change during the guest journey.

| 'How to' use case | API Operations |
| :-- | :-- |
| Get availability for a service | [Get service availability] |
| Get pricing for a rate | [Get rate pricing] |
| Get a quotation for reservation parameters | [Price reservations] |

### 3. Create the customer and reservation

Create or update the customer profile as required, then create the reservation using the confirmed dates, selected rate and accommodation details. Store the returned identifiers so your booking engine can show and manage the reservation later.

| 'How to' use case | API Operations |
| :-- | :-- |
| Create a customer profile | [Add customer] |
| Update an existing customer profile | [Update customer] |
| Create a reservation | [Add reservations] |

### 4. Take or record payment

Select a payment flow that matches the property's configuration and your payment-provider integration. For Mews Payments, charge a stored gateway card. If payment is processed outside Mews, record it using the appropriate external-payment operation. Confirm the amount and the customer or bill to which the payment is applied before submitting it.

| 'How to' use case | API Operations |
| :-- | :-- |
| Charge a stored gateway card | [Charge credit card] |
| Record an external payment | [Add external payment] |
| Record a supported alternative payment | [Add alternative payment] |

### 5. Manage the reservation

Provide guests with a way to retrieve their reservation and support changes or cancellations according to the property's policies. Use the appropriate operation for the change, and always present the resulting price or cancellation fee before confirming the action.

| 'How to' use case | API Operations |
| :-- | :-- |
| Retrieve reservation details | [Get all reservations] |
| Update reservation details | [Update reservations] |
| Change reservation dates | [Update reservation interval] |
| Cancel a reservation | [Cancel reservation] |

## Implementation notes

- **Prevent duplicate bookings:** Treat a failed or timed-out create request as an unknown outcome. Record your own booking reference and reconcile with [Get all reservations] before retrying, rather than submitting the same reservation repeatedly.
- **Respect request limits:** Cache configuration and short-lived search results, limit requests as users change search inputs, and use the `Retry-After` header or exponential backoff after a `429 Too Many Requests` response. See [Request limits] and [Best practices].
- **Keep reservations current:** Subscribe to reservation-related [Webhooks] or [WebSockets] instead of polling. Use the reservation identifier in the event to retrieve the current reservation details when required.
- **Test the complete flow:** Validate availability, reservation creation, payment, modification and cancellation in the appropriate environment before going live. See [Environments].

[Add alternative payment]: ../operations/payments.md#add-alternative-payment
[Add customer]: ../operations/customers.md#add-customer
[Add external payment]: ../operations/payments.md#add-external-payment
[Add reservations]: ../operations/reservations.md#add-reservations
[Best practices]: ../guidelines/best-practices.md
[Cancel reservation]: ../operations/reservations.md#cancel-reservation
[Charge credit card]: ../operations/creditcards.md#charge-credit-card
[Environments]: ../guidelines/environments.md
[Get all rates]: ../operations/rates.md#get-all-rates
[Get all reservations]: ../operations/reservations.md#get-all-reservations-ver-2023-06-06
[Get all resources]: ../operations/resources.md#get-all-resources
[Get all services]: ../operations/services.md#get-all-services
[Get rate pricing]: ../operations/rates.md#get-rate-pricing
[Get service availability]: ../operations/services.md#get-service-availability-ver-2024-01-22
[Price reservations]: ../operations/reservations.md#price-reservations
[Request limits]: ../guidelines/requests.md#request-limits
[Update customer]: ../operations/customers.md#update-customer
[Update reservation interval]: ../operations/reservations.md#update-reservation-interval
[Update reservations]: ../operations/reservations.md#update-reservations
[Webhooks]: ../events/README.md
[WebSockets]: ../events/websockets.md
