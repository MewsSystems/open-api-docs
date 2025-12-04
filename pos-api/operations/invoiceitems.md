<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# InvoiceItems

## Get invoice item

An invoice item is an individual order item that is part of an invoice.

**Note:** This operation needs [Authentication](../guidelines/authentication.md) and supports the following JSON:API features:

- [Relationships](../guidelines/relationships.md) - `invoiceItemsModifiers`, `revenueCenter` using `include` query parameter.
- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `invoiceItem` and related resources with `fields` query parameter.

### Request

`GET` `[PlatformAddress]/v1/invoice-items/{id}`

### Response

```javascript
{
  "data": {
    "id": "31b14937-2524-491f-b0a0-dc0a7393ff3f",
    "type": "invoiceItems",
    "attributes": {
      "productName": "Main InvoiceItem",
      "unitPriceInclTax": "17.00",
      "subtotal": "15.00",
      "quantity": "1.00",
      "comp": false,
      "void": false,
      "isComp": false,
      "isVoid": false,
      "compVoidReason": null,
      "compVoidNotes": null,
      "discountAmount": null,
      "createdAt": "2024-10-24T08:44:45.409Z",
      "updatedAt": "2024-10-24T08:44:45.409Z",
      "tax": "2.00",
      "total": "17.00",
      "discount": null
    },
    "relationships": {
      "product": {
        "data": {
          "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
          "type": "products"
        }
      },
      "productVariant": {
        "data": {
          "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
          "type": "productVariants"
        }
      },
      "invoiceItemModifiers": {
        "data": [
          {
            "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
            "type": "invoiceItemModifiers"
          }
        ]
      },
      "revenueCenter": {
        "data": {
          "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
          "type": "revenueCenters"
        }
      }
    }
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [invoice_item](invoiceitems.md#invoice_item) | required | The document's "primary data". |
| `included` | array of object [invoice_item_modifier](invoiceitems.md#invoice_item_modifier),[revenue_center](invoiceitems.md#revenue_center) | optional, max 1000 items | Details of the invoiceItemModifiers to which the invoiceItem is associated. |

#### invoice_item

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [invoice_item_attributes](invoiceitems.md#invoice_item_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `relationships` | [invoice_item_relationships](invoiceitems.md#invoice_item_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |

#### invoice_item_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `productName` | string | required, max length 255 characters | The name of the product or item being invoiced. |
| `unitPriceInclTax` | string | required, max length 255 characters | The price of the product per unit, including applicable taxes. |
| `quantity` | string | required, max length 255 characters | The number of units of the product being purchased. |
| `subtotal` | string | required, max length 255 characters | The total price of the product before taxes and discounts are applied. |
| `tax` | string | required, max length 255 characters | The tax amount applicable to the specific item. |
| `total` | string | required, max length 255 characters | The total price of the item after taxes and discounts have been applied. |
| `discount` | string,null | optional, max length 255 characters | The percentage or amount of discount applied specifically to this item. |
| `isComp` | boolean | required | Indicates whether the item was provided for free (comped) or not. |
| `isVoid` | boolean | required | Indicates whether the item has been voided from the invoice. |
| `compVoidReason` | string,null | optional, max length 255 characters | The reason provided for voiding the item, if applicable. |
| `compVoidNotes` | string,null | optional, max length 2048 characters | Additional notes regarding the comping or voiding of the item. |
| `discountAmount` | string,null | optional, max length 255 characters | The total monetary value of the discount applied to this specific item. |
| `subtotalInclDiscount` | string | required, max length 255 characters | The subtotal of the item after applying any discounts. |
| `taxInclDiscount` | string | required, max length 255 characters | The tax amount applicable to the item after applying any discounts. |
| `totalInclDiscount` | string | required, max length 255 characters | The tax amount applicable to the item after applying any discounts. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |
| ~~`comp`~~ | ~~boolean~~ | ~~required~~ | ~~Indicates whether the item was provided for free (comped) or not.~~ **Deprecated!** |
| ~~`void`~~ | ~~boolean~~ | ~~required~~ | ~~Indicates whether the item has been voided from the invoice.~~ **Deprecated!** |

#### invoice_item_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `product` | object | required | Details of the product associated with the invoiceItem. |
| `productVariant` | object | required | Details of the productVariant associated with the invoiceItem. |
| `invoiceItemModifiers` | object | required | Details of the items associated with the invoiceItem. |
| `revenueCenter` | object | required | Details of the revenue center associated with the invoiceItem. |

#### invoice_item_modifier

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [invoice_item_modifiers_attributes](invoiceitems.md#invoice_item_modifiers_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

#### invoice_item_modifiers_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `name` | string | required, max length 255 characters | Name of the modifier item. |
| `price` | string | required, max length 255 characters | Price of the modifier item. |

#### revenue_center

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [revenue_center_attributes](invoiceitems.md#revenue_center_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

#### revenue_center_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `name` | string | required, max length 255 characters | Name of the revenue center. |
| `isActive` | boolean | required | Indicates whether the revenue center is active. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |
