---
hidden: true
noIndex: true
---

# Digital ordering

This use case is aimed at Digital Ordering Systems and it describes how to use the **Mews POS API** to manage digital orders, including:

* Browsing the product catalog
* Creating and managing orders
* Processing payments

## Products endpoint polling to get availability updates

Digital ordering systems need to stay synchronized with real-time product availability changes. Use the [Get products](https://github.com/MewsSystems/poc-open-api-docs/blob/main/pos-api/operations/products.md#get-products) endpoint with filtering and sparse fieldsets to efficiently poll for availability updates.

### Polling strategy

Poll the products endpoint using the `updatedAtGteq` or `updatedAtGt` filters to retrieve only products that have been updated since your last check. Use sparse fieldsets to minimize bandwidth by requesting only the `isAvailable` field.

#### Example request:

```
GET https://api.pos.mews-demo.com/v1/products?filter[updatedAtGteq]=2025-03-12&fields[products]=isAvailable
```

#### Example response:

```json
{
  "data": [
    {
      "id": "139a7f7a-591f-4797-ba23-08c9bee0d044",
      "type": "products",
      "attributes": {
        "isAvailable": false
      }
    },
    {
      "id": "2a8b9c1d-4e5f-6789-abcd-ef1234567890",
      "type": "products",
      "attributes": {
        "isAvailable": true
      }
    }
  ]
}
```

## Orders endpoint polling to get most recent order state changes

Track order state changes in real-time by polling the [Get orders](https://github.com/MewsSystems/poc-open-api-docs/blob/main/pos-api/operations/orders.md#get-orders) endpoint with filtering and sparse fieldsets to monitor order lifecycle updates.

### Polling strategy

Poll the orders endpoint using the `updatedAtGteq` or `updatedAtGt` filters to retrieve only orders that have been updated since your last check. Use sparse fieldsets to request only the `state` field for efficient bandwidth usage.

#### Example request:

```
GET https://api.pos.mews-demo.com/v1/orders?filter[updatedAtGteq]=2025-05-16&fields[orders]=state
```

#### Example response:

```json
{
  "data": [
    {
      "id": "5624013b-5293-48b1-a07a-e7ee01cbde6a",
      "type": "orders",
      "attributes": {
        "state": "closed"
      }
    },
    {
      "id": "7c8d9e0f-1234-5678-9abc-def012345678",
      "type": "orders",
      "attributes": {
        "state": "open"
      }
    }
  ]
}
```

## Fetch covers for a table at a specific table

### Polling strategy

To retrieve the actual covers (guests seated) for a table, you have to poll the [Get orders](https://github.com/MewsSystems/poc-open-api-docs/blob/main/pos-api/operations/orders.md#get-orders) and include the `filter[tableIdEq]` query parameter.

#### Example request:

```
GET https://api.pos.mews-demo.com/v1/orders?filter[tableIdEq]=6d5e100c-5bf9-4781-85ec-cdf183e9486f
```

#### Example response:

```json
{
  "data": [
    {
      "id": "e194c497-f601-49c7-b952-08f329a5779e",
      "type": "orders",
      "attributes": {
        "notes": null,
        "createdAt": "2025-09-25T11:23:18.367Z",
        "updatedAt": "2025-09-25T11:24:24.344Z",
        "depositAmount": null,
        "tableStatus": "seated",
        "state": "paid",
        "covers": 4
      },
      "relationships": {
        "tables": {
          "data": [
            {
              "id": "6d5e100c-5bf9-4781-85ec-cdf183e9486f",
              "type": "tables"
            }
          ]
        }
      }
    }
  ]
}
```

### Room charge

#### Room Number Validation for Payments

When creating a payment, the `room_charge` payment method is the only scenario in which a `roomNumber` value is permitted. This is because room-charge payments must be associated with a specific guest room for proper billing.

If the payment method is anything other than `room_charge`, the `roomNumber` field must be omitted. Including a room number for non–room-charge payments causes the request to fail validation.

#### Errors

_Room number must be blank_

`roomNumber` is only allowed when the payment method is room-service (e.g., room\_charge). If `roomNumber` is provided with any other payment method, the request fails with HTTP 422 (Unprocessable Content).

```json
{
  "errors": [
    {
      "status": "422",
      "source": {
        "pointer": "/data/attributes/roomNumber"
      },
      "title": "Unprocessable Content",
      "detail": "Room number must be blank",
      "code": "present"
    }
  ]
}
```

**In short:** If the payment isn’t a room-charge payment, don’t send a room number.
