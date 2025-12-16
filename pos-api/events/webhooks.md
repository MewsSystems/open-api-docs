# Webhooks

Webhooks provide a streamlined way to receive event notifications about various entities. Register your Webhook endpoints with Mews using API Operation [Create webhook endpoint](/broken/pages/ggnhYT4S5VDM3HN1SCwj#create-webhook-endpoint).

## Key features

* **POST requests** – Webhook messages are sent as HTTP `POST` requests with the event details in the JSON body.
* **Authenticated** – Each webhook request includes an `X-Signature` header, which contains an HMAC SHA-256 signature to verify the authenticity of the webhook. For more details, see [Webhook security](wh-security.md).
* **Unified event delivery** – Each message encapsulates all simultaneous events related to the entities you’ve subscribed to. For example, subscribing to booking events may result in a webhook containing multiple `booking.status.updated` events, each corresponding to a different booking.
* **Event structure** – Each event within a message specifies the event type and includes the unique identifier of the associated entity, e.g., `booking.status.updated` events include a `BookingId`. To retrieve detailed information about an entity, use the relevant API Operation along with the entity’s unique identifier.

## Implementation

To implement Webhooks:

1. Define the entities and event types you are interested in via your Webhook subscription.
2. Fetch additional details about entities as needed by using the appropriate API Operations.

## Supported events

| Entity     | Event                          | Description                                                                                 |
| ---------- | ------------------------------ | ------------------------------------------------------------------------------------------- |
| `bookings` | `booking.status.updated`       | A booking is updated. This includes any modifications to its properties.                    |
| `orders`   | `order.state.updated`          | An order state is updated. This includes any modifications to order state.                  |
| `orders`   | `order.status.updated`         | An order status is updated. This includes any modifications to order fulfillment status.    |
| `products` | `product.availability.updated` | A product availability is updated. This includes any modifications to product availability. |
| `orders`   | `order.total.updated`          | An order total is updated due to gratuity (tip) or correction amount changes.               |
| `orders`   | `orders.payments.added`        | A payment has been successfully added to an order.                                          |

## Request body

```json
{
    "data": {
        "id": "98656c4a-950d-4b19-b7ef-ad1744e92b53",
        "type": "bookings",
        "attributes": {
            "status": "seated",
            "updatedAt": "2025-02-06T09:41:30.465Z"
        }
    },
    "meta": {
        "eventType": "booking.status.updated"
    }
}
```

| Property | Type                               | Contract | Description                     |
| -------- | ---------------------------------- | -------- | ------------------------------- |
| `data`   | [EventData](webhooks.md#eventdata) | required | Details of the event.           |
| `meta`   | [MetaData](webhooks.md#metadata)   | required | Meta data related to the event. |

### EventData

| Property     | Type                                           | Contract | Description                                                               |
| ------------ | ---------------------------------------------- | -------- | ------------------------------------------------------------------------- |
| `id`         | string                                         | required | Unique identifier of the entity related to the event.                     |
| `type`       | string                                         | required | The type of entity related to the event, e.g. `bookings`.                 |
| `attributes` | [EventAttributes](webhooks.md#eventattributes) | required | Attributes of the event or entity. The contents depend on the event type. |

### MetaData

| Property    | Type   | Contract | Description                                       |
| ----------- | ------ | -------- | ------------------------------------------------- |
| `eventType` | string | required | The type of event, e.g. `booking.status.updated`. |

### EventAttributes

#### booking.status.updated properties:

| Property    | Type                                                | Contract | Description                                   |
| ----------- | --------------------------------------------------- | -------- | --------------------------------------------- |
| `status`    | string [Booking status](webhooks.md#booking-status) | required | The new status of the booking, e.g. `seated`. |
| `updatedAt` | string                                              | required | Timestamp of when the booking was updated.    |

#### Booking status

* `confirmed` – The booking has been made and confirmed.
* `seated` – The customer has arrived and the party is seated.
* `completed` – The booking has finished.
* `cancelled` – The customer has cancelled the booking.
* `no_show` – The customer did not show up and the booking has been registered by the staff as a 'no show'.

#### order.state.updated properties:

| Property    | Type                                          | Contract | Description                              |
| ----------- | --------------------------------------------- | -------- | ---------------------------------------- |
| `state`     | string [Order state](webhooks.md#order-state) | required | The new state of the order, e.g. `open`. |
| `updatedAt` | string                                        | required | Timestamp of when the order was updated. |

#### Order state

* `draft` – The order is in draft state.
* `sent` – The order has been sent.
* `paid` – The order has been paid.
* `discarded` – The order has been discarded.
* `cart` – The order is in cart state.
* `pending_payment` – The order is pending payment.
* `open` – The order is open and can be modified.
* `open_web` – The order is open for web processing.

#### order.status.updated properties:

| Property    | Type                                            | Contract | Description                                   |
| ----------- | ----------------------------------------------- | -------- | --------------------------------------------- |
| `status`    | string [Order status](webhooks.md#order-status) | required | The new status of the order, e.g. `received`. |
| `updatedAt` | string                                          | required | Timestamp of when the order was updated.      |

#### Order status

* `received` – The order has been received by the venue but has not yet been accepted.
* `confirmed` – The venue has accepted the order and will proceed with fulfillment.
* `rejected` – The venue has declined the order.
* `preparing` – The order items are being prepared.
* `ready_for_delivery` – The order is prepared and ready for pickup/hand‑off to a courier or customer.
* `dispatched` – The order has left the venue with a courier/runner.
* `in_transit` – The order is on the way to the customer.
* `delivered` – The order has been delivered to the customer.

#### product.availability.updated properties:

| Property      | Type    | Contract | Description                                             |
| ------------- | ------- | -------- | ------------------------------------------------------- |
| `isAvailable` | boolean | required | The new availability status of the product.             |
| `updatedAt`   | string  | required | Timestamp of when the product availability was updated. |

#### order.total.updated properties:

| Property           | Type           | Contract | Description                                                                   |
| ------------------ | -------------- | -------- | ----------------------------------------------------------------------------- |
| `tipAmount`        | string or null | optional | The gratuity (tip) amount added to the order.                                 |
| `correctionAmount` | string or null | optional | A correction amount applied to the order total (can be positive or negative). |
| `total`            | string         | required | The total amount of the order including gratuity and corrections.             |
| `updatedAt`        | string         | required | Timestamp of when the order total was updated.                                |

#### orders.payments.added properties:

| Property    | Type          | Contract | Description                                                  |
| ----------- | ------------- | -------- | ------------------------------------------------------------ |
| `orderId`   | string (UUID) | required | The unique identifier of the order the payment was added to. |
| `paymentId` | string (UUID) | required | The unique identifier of the payment that was added.         |
| `updatedAt` | string        | required | Timestamp of when the payment was added.                     |
