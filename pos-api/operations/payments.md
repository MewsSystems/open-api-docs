<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Payments

## Create a payment

This operation creates a payment.

**Note:** This operation needs [Authentication](../guidelines/authentication.md) and supports the following features:

- [Idempotency](../guidelines/idempotency.md)

### Request

`POST` `[PlatformAddress]/v1/payments`

```javascript
{
  "data": {
    "type": "payments",
    "attributes": {
      "amount": "100.25",
      "notes": "Payment notes",
      "roomNumber": "101",
      "tipAmount": "15.25"
    },
    "relationships": {
      "order": {
        "data": {
          "id": "4014e105-57d6-4b12-a4fc-164601ec53e9",
          "type": "orders"
        }
      },
      "paymentMethod": {
        "data": {
          "id": "4014e105-57d6-4b12-a4fc-164601ec53e9",
          "type": "paymentMethods"
        }
      },
      "register": {
        "data": {
          "id": "4014e105-57d6-4b12-a4fc-164601ec53e9",
          "type": "registers"
        }
      }
    }
  }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [payment_create](payments.md#payment_create) | required | The document's "primary data". |

#### payment_create

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification)
member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [payment_attributes](payments.md#payment_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the payment resource's data. |
| `relationships` | object | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the payment and other JSON:API resources. |

### Response

```javascript
{
  "data": {
    "id": "5624013b-5293-48b1-a07a-e7ee01cbde6a",
    "type": "payments",
    "attributes": {
      "amount": "100.00",
      "notes": "Payment notes",
      "roomNumber": "101",
      "tipAmount": "15.00",
      "createdAt": "2021-06-29T08:00:00Z",
      "updatedAt": "2021-06-29T08:00:00Z"
    },
    "relationships": {
      "order": {
        "data": {
          "id": "4014e105-57d6-4b12-a4fc-164601ec53e9",
          "type": "orders"
        }
      },
      "paymentMethod": {
        "data": {
          "id": "4014e105-57d6-4b12-a4fc-164601ec53e9",
          "type": "paymentMethods"
        }
      },
      "register": {
        "data": {
          "id": "4014e105-57d6-4b12-a4fc-164601ec53e9",
          "type": "registers"
        }
      }
    }
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [payment](payments.md#payment) | required | The document's "primary data". |
| `included` | array of object [order](payments.md#order),[payment_method](payments.md#payment_method),[register](payments.md#register) | optional, max 100 items | Details of the objects to which the payment is associated. |

#### payment

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification)
member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [payment_attributes](payments.md#payment_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the payment resource's data. |
| `relationships` | [payment_relationships](payments.md#payment_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the payment and other JSON:API resources. |

#### payment_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `amount` | string | required, max length 255 characters | Payment amount represented as a decimal string with 2 decimal places. |
| `notes` | string,null | optional, max length 500 characters | Notes about the payment. |
| `roomNumber` | string,null | optional, max length 255 characters | The room number associated with the payment. |
| `tipAmount` | string,null | optional, max length 255 characters | Tip amount represented as a decimal string with 2 decimal places. |
| `createdAt` | string | required, max length 25 characters | Payment created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Payment updated at timestamp in RFC 3339 format. |

#### payment_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `order` | object | required | Details of the order associated with the payment. |
| `paymentMethod` | object | required | Details of the payment method used for the payment. |
| `register` | object | required | Details of the register associated with the payment. |

#### order

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [order_attributes](payments.md#order_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `links` | object | required | A [links object](https://jsonapi.org/format/#document-resource-object-links) containing links related to the resource. |
| `relationships` | [order_relationships](payments.md#order_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |

#### order_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `notes` | string,null | optional, max length 500 characters | Notes about the order. |
| `covers` | undefined | required | How many people are seated at the table. |
| `depositAmount` | string,null | optional, max length 255 characters | The amount of discount applied to the invoice. |
| `tableStatus` | string,null | optional | Status of the table. Possible values are "no_table", "seated", "cleaning", and "free". |
| `surcharge` | string,null | optional, max length 10 characters | The surcharge amount applied to the order. |
| `surchargeType` | string,null | optional | The type of surcharge applied to the order. |
| `surchargeDescription` | string,null | optional, max length 255 characters | Description of the surcharge applied to the order. |
| `discount` | string,null | optional, max length 10 characters | The discount amount applied to the order. |
| `discountType` | string,null | optional | The type of discount applied to the order. |
| `discountDescription` | string,null | optional, max length 255 characters | Description of the discount applied to the order. |
| `status` | string,null | optional | Fulfillment status of the order lifecycle. |
| `state` | string | required | Order state. |
| `createdAt` | string | required, max length 25 characters | Order created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Order updated at timestamp in RFC 3339 format. |

#### order_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `invoice` | object | required | Details of the invoice associated with the order. |
| `customer` | object | required | Details of the customer associated with the order. |
| `booking` | object | required | Details of the booking associated with the order. |
| `tables` | object | required | Details of the tables associated with the order. |
| `promoCode` | object | required | Details of the promo codes associated with the order. |
| `outlet` | object | required | Details of the outlet associated with the order. |
| `revenueCenter` | object | required | Details of the revenue center associated with the order. |
| `taxes` | object | required | Details of the taxes associated with the product. |
| `orderItems` | object | required | Details of the items associated with the order. |

#### order_item_identifier

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | [Resource identifier](payments.md#resource-identifier) | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |

#### resource_identifier

#### order_bundle_item_identifier

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | [Resource identifier](payments.md#resource-identifier) | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |

#### payment_method

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [payment_method_attributes](payments.md#payment_method_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

#### payment_method_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `name` | string,null | optional, max length 255 characters | Name of the payment method. |
| `code` | string | required | Code identifier of the payment method. |
| `isActive` | boolean | required | Indicates if the payment method is active. |
| `isTippable` | boolean | required | Indicates if tips are allowed for this payment method. |
| `createdAt` | string | required, max length 25 characters | Payment method created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Payment method updated at timestamp in RFC 3339 format. |

#### register

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [register_attributes](payments.md#register_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `links` | object | required | A [links object](https://jsonapi.org/format/#document-resource-object-links) containing links related to the resource. |
| `relationships` | [register_relationships](payments.md#register_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |

#### register_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `name` | string | required, max length 255 characters | Name of the register. |
| `invoicesCount` | integer | required | Total number of invoices issued from this register. |
| `index` | integer | required | The index of a register within an outlet. |
| `virtual` | boolean | required | A boolean indicating whether the register is virtual `true` or physical `false`. |
| `createdAt` | string | required, max length 25 characters | Register created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Register updated at timestamp in RFC 3339 format. |

#### register_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `outlet` | object | required | Details of the outlet to which the register is associated. |
