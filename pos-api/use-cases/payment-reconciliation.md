# Payment reconciliation

This use case is aimed at integration partners that reconcile payments taken in Mews POS, for example to compare daily payment totals by payment method with their own records. It describes how to use the **Mews POS API** to retrieve payments, including refunds, and how to calculate totals.

## Retrieving payments

Use [Get payments](../operations/payments.md#get-payments) to list the payments of the merchant that the access token belongs to. Use [Get payment](../operations/payments.md#get-payment) to retrieve a single payment by ID, for example the `paymentId` received in the [`order.payments.added`](../events/webhooks.md) webhook.

By default, the operation returns payments of every `state` and `transactionType`, oldest first. Nothing is filtered out, so filter on the client or use the filters below to select the payments you need.

| Filter                                                         | Description                                                                |
| :------------------------------------------------------------- | :------------------------------------------------------------------------- |
| `createdAtGt`, `createdAtGteq`, `createdAtLt`, `createdAtLteq` | Payments created within a time window.                                     |
| `updatedAtGt`, `updatedAtGteq`, `updatedAtLt`, `updatedAtLteq` | Payments updated within a time window.                                     |
| `registerIdEq`                                                 | Payments taken at one register.                                            |
| `paymentMethodIdEq`                                            | Payments made with one payment method.                                     |
| `stateIn`                                                      | Payments in any of the given states, as a comma-separated list.            |
| `transactionTypeIn`                                            | Payments of any of the given transaction types, as a comma-separated list. |

Filters can be combined, and all of them must match. For the filter syntax, see [Filtering](../guidelines/filtering.md). Unsupported filter names are ignored.

To include the related order, register, payment method, invoice or original payment in the response, use the `include` parameter. An included payment method carries its `code`. For details, see [Relationships](../guidelines/relationships.md).

## Refunds

A refund is a separate payment, not a change to the original payment. It has `transactionType` `refund`, a negative `amount`, and an `originalPayment` relationship that points to the refunded payment. The original payment keeps its own `state` and `amount`.

Refunds made at invoice level have no order, so the `order` relationship is `null`. A refund can also have a `null` `reservationId`.

#### Example refund

```javascript
{
  "id": "5f1b2c3d-0000-4000-8000-000000000002",
  "type": "payments",
  "attributes": {
    "amount": "-10.00",
    "tipAmount": "0.00",
    "currency": "EUR",
    "state": "approved",
    "transactionType": "refund",
    "refundReason": "Guest complaint",
    "reservationId": null,
    "createdAt": "2026-11-10T09:15:00.000Z",
    "updatedAt": "2026-11-10T09:15:00.000Z"
  },
  "relationships": {
    "originalPayment": {
      "data": { "id": "5f1b2c3d-0000-4000-8000-000000000001", "type": "payments" }
    }
  }
}
```

## Calculating totals

To calculate the amount taken for a period:

1. Keep only payments with `state` `approved` and `transactionType` `purchase`, `capture` or `refund`.
2. Sum their `amount`. The `amount` includes the tip, and `tipAmount` shows the tip portion. Refunds are negative, so they reduce the total.
3. Group by the payment method, using `include=paymentMethod`, if you need totals per method.

### Unknown states and transaction types

New values of `state` and `transactionType` can be added later. Your integration must tolerate values it does not recognize, and must not count them in totals.

The `state` `cancelled` can mean that a payment was reversed, or that it never completed. Do not count cancelled payments in totals.

## Keeping payments up to date

A payment can change after it is created. For example, a payment can be voided, or a refund can be added later. To pick up these changes, poll with the `updatedAtGteq` filter instead of `createdAtGteq`.

For example, every hour, request the payments updated in the last three days. Overlapping windows ensure that you see the latest state of recently changed payments. Match payments by `id` and replace the stored version with the latest one.

#### Example request

```
GET [PlatformAddress]/v1/payments?filter[updatedAtGteq]=2026-11-07T00:00:00Z&page[size]=1000
```

### Pagination

The default page size is 10. For the first, one-off load of historical payments, use a larger `page[size]`, up to 1000, and follow the `links.next` URL until it is no longer returned.
