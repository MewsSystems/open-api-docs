<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Orders

## Get orders

This operation returns a list of orders.

**Note:** This operation needs [Authentication](../guidelines/authentication.md) and supports the following JSON:API features:

- [Relationships](../guidelines/relationships.md) - `invoice`, `customer`, `booking`, `tables`, `promoCode`, `outlet`, `revenueCenter` using `include` query parameter.
- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `order` and related resources with `fields` query parameter.

### Request

`GET` `[PlatformAddress]/v1/orders`

### Response

```javascript
{
  "data": [
    {
      "id": "5624013b-5293-48b1-a07a-e7ee01cbde6a",
      "type": "orders",
      "attributes": {
        "notes": "Please make sure the food is not too spicy.",
        "covers": 12,
        "createdAt": "2021-06-29T08:00:00Z",
        "updatedAt": "2021-06-29T08:00:00Z",
        "tableStatus": "seated",
        "status": "received",
        "state": "open",
        "depositAmount": "20.00"
      },
      "relationships": {
        "invoice": {
          "data": {
            "id": "4014e105-57d6-4b12-a4fc-164601ec53e9",
            "type": "invoices"
          }
        },
        "customer": {
          "data": {
            "id": "4014e105-57d6-4b12-a4fc-164601ec53e9",
            "type": "customers"
          }
        },
        "booking": {
          "data": {
            "id": "4014e105-57d6-4b12-a4fc-164601ec53e9",
            "type": "bookings"
          }
        },
        "tables": {
          "data": [
            {
              "id": "dcd9718c-abb0-4ba2-83c5-ae01505a5391",
              "type": "tables"
            }
          ]
        },
        "promoCode": {
          "data": {
            "id": "167beb82-e6a7-453b-8048-cfa25d3ce467",
            "type": "promoCodes"
          }
        },
        "taxes": {
          "data": [
            {
              "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
              "type": "taxes"
            }
          ]
        }
      },
      "links": {
        "self": "https://api.mews-demo.com/pos/v1/orders/5624013b-5293-48b1-a07a-e7ee01cbde6a"
      }
    }
  ],
  "links": {
    "prev": "https://api.mews-demo.com/pos/v1/orders?page%5Bbefore%5D=NA&page%5Bsize%5D=1",
    "next": "https://api.mews-demo.com/pos/v1/orders?page%5Bafter%5D=NA&page%5Bsize%5D=1"
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | array of object [order](orders.md#order) | required, max 1000 items | The document's "primary data". |
| `included` | array of object [invoice](orders.md#invoice),[table](orders.md#table),[booking](orders.md#booking),[customer](orders.md#customer),[promo_code](orders.md#promo_code),[outlet](orders.md#outlet),[revenue_center](orders.md#revenue_center),[tax](orders.md#tax),[order_item](orders.md#order_item),[order_bundle](orders.md#order_bundle),[order_bundle_item](orders.md#order_bundle_item) | optional, max 100 items | Details of the objects to which the order is associated. |
| `links` | [links](orders.md#links) | required | A [links object](https://jsonapi.org/profiles/ethanresnick/cursor-pagination/#auto-id-links) describing cursor pagination links. |

#### order

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [order_attributes](orders.md#order_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `links` | object | required | A [links object](https://jsonapi.org/format/#document-resource-object-links) containing links related to the resource. |
| `relationships` | [order_relationships](orders.md#order_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |

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
| `id` | [Resource identifier](orders.md#resource-identifier) | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |

#### resource_identifier

#### order_bundle_item_identifier

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | [Resource identifier](orders.md#resource-identifier) | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |

#### invoice

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [invoice_attributes](orders.md#invoice_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `relationships` | [invoice_relationships](orders.md#invoice_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |

#### invoice_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `discount` | string,null | optional, max length 255 characters | The amount of discount applied to the invoice. |
| `tax` | string | required, max length 255 characters | The total tax amount applicable to the invoice. |
| `total` | string | required, max length 255 characters | The final amount due on the invoice after all discounts and taxes. |
| `subtotal` | string | required, max length 255 characters | The total amount of the invoice before taxes and additional charges. |
| `tipAmount` | string,null | optional, max length 255 characters | The amount of gratuity or tip added to the invoice. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |
| `cancelled` | boolean | required | Indicates whether the invoice has been cancelled (true) or not (false). |
| `cancelReason` | string,null | optional, max length 255 characters | The reason provided for cancelling the invoice, if applicable. |
| `discountAmount` | string,null | optional, max length 255 characters | The total monetary value of the discount applied to the invoice. |
| `description` | string,null | optional, max length 255 characters | A brief description of the invoice, including details about the transaction. |
| `itemDiscountAmount` | string,null | optional, max length 255 characters | The total discount amount applied to individual items within the invoice. |

#### invoice_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `user` | object | required | Details of the user associated with the invoice. |
| `order` | object | required | Details of the order associated with the invoice. |
| `registers` | object | required | Details of the register associated with the invoice. |
| `originalInvoice` | object | required | Details of the original invoice associated with the invoice. |
| `items` | object | required | Details of the items associated with the invoice. |
| `promoCode` | object | required | Details of the promo codes associated with the invoice. |
| `revenueCenter` | object | required | Details of the revenue center associated with the invoice. |

#### table

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [table_attributes](orders.md#table_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `relationships` | [table_relationships](orders.md#table_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |

#### table_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `name` | string | required, max length 255 characters | The name of the table. |
| `numberOfSeats` | integer | required | Number of people that can be seated at this table. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |

#### table_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `area` | object | required | Details of the table area. |

#### booking

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [booking_attributes](orders.md#booking_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `relationships` | [booking_relationships](orders.md#booking_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |

#### booking_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `isWalkIn` | boolean | required | Indicates if the booking is a walk-in. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |
| `status` | string,null | optional | The initial status of the booking. Possible values are "confirmed", "seated", "completed", "cancelled", and "no_show". |
| `partySize` | integer | required | Represents the number of people included in the booking. |
| `bookingDatetime` | string | required, max length 25 characters | The booking's date. |
| `duration` | integer,null | optional | Represents the length of the booking in minutes. |
| `notes` | string,null | optional, max length 10000 characters | Additional notes for the booking. |
| `roomNumber` | string,null | optional, max length 100 characters | The room number of the booking's customer. |
| `promotions` | string,null | optional, max length 100 characters | The promotions of the booking. |
| `bookingReference` | string,null | optional, max length 255 characters | A reference code or identifier associated with the booking. |
| `depositAmount` | string,null | optional, max length 255 characters | The amount of the deposit. |

#### booking_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `tables` | object | required | Details of the tables associated with the booking. |
| `customer` | object | required | Details of the customer associated with the booking. |
| `orders` | object | required | Details of the orders associated with the booking. |

#### customer

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [customer_attributes](orders.md#customer_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

#### customer_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `fullName` | string,null | optional, max length 255 characters | The full name of the customer. This can be either a personal name or a company name. |
| `companyName` | string,null | optional, max length 255 characters | The name of the company associated with the customer. |
| `taxNumber` | string,null | optional, max length 40 characters | The customer's tax identification number. |
| `email` | string,null | optional, max length 320 characters | The customer's email address. |
| `address1` | string,null | optional, max length 255 characters | The first line of the customer's address. |
| `address2` | string,null | optional, max length 255 characters | The second line of the customer's address. |
| `city` | string,null | optional, max length 100 characters | The city of the customer's address. |
| `state` | string,null | optional, max length 100 characters | The state or province of the customer's address. |
| `postalCode` | string,null | optional, max length 20 characters | The postal or ZIP code of the customer's address. |
| `country` | string,null | optional, max length 100 characters | The country of the customer's address. |
| `notes` | string,null | optional, max length 500 characters | Additional notes about the customer. |
| `phone` | string,null | optional, max length 20 characters | The customer's phone number. |
| `mobile` | string,null | optional, max length 20 characters | The customer's mobile phone number. |
| `countrySpecificCode` | string,null | optional, max length 50 characters | A unique country specific code assigned to the customer. Lottery code, for example, in Italy. |
| `dateOfBirth` | string,null | optional, max length 10 characters | The customer's date of birth in YYYY-MM-DD format. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |

#### promo_code

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [promo_code_attributes](orders.md#promo_code_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

#### promo_code_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `discountType` | string | required | Specifies whether the discount is a fixed amount, a percentage, or free shipping. |
| `amount` | string,null | optional, max length 19 characters | The value of the discount. Required for absolute and percent discount types. |
| `channel` | string | required | The sales channel where the discount is applicable. |
| `code` | string | required, max length 255 characters | The unique identifier code for the promo code. |
| `active` | boolean | required | A boolean indicating if the promo code is currently active. |
| `description` | string,null | optional, max length 1000 characters | A description of the promo code. |
| `maxUsages` | integer,null | optional | Maximum number of times this promo code can be used. |
| `startsAt` | string,null | optional, max length 25 characters | Date and time when the promo code becomes valid in RFC 3339 format. |
| `endsAt` | string,null | optional, max length 25 characters | Date and time when the promo code expires in RFC 3339 format. |
| `createdAt` | string | required, max length 25 characters | Promo code created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Promo code updated at timestamp in RFC 3339 format. |

#### outlet

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [outlet_attributes](orders.md#outlet_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

#### outlet_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `name` | string | required, max length 255 characters | The name of the outlet, representing the business or location. |
| `address1` | string,null | optional, max length 255 characters | The first line of the outlet's street address, typically including the street number and name. |
| `address2` | string,null | optional, max length 255 characters | The second line of outlet's address. |
| `city` | string,null | optional, max length 86 characters | The city where the outlet is located. |
| `state` | string,null | optional, max length 54 characters | The state or region where the outlet is located. |
| `postalCode` | string,null | optional, max length 10 characters | The postal or ZIP code for outlet's location. |
| `index` | integer | required | A unique sequential number representing the outlet number within the establishment. |
| `createdAt` | string | required, max length 25 characters | Outlet created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Outlet updated at timestamp in RFC 3339 format. |

#### revenue_center

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [revenue_center_attributes](orders.md#revenue_center_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

#### revenue_center_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `name` | string | required, max length 255 characters | Name of the revenue center. |
| `isActive` | boolean | required | Indicates whether the revenue center is active. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |

#### tax

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [tax_attributes](orders.md#tax_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

#### tax_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `name` | string | required, max length 255 characters | Name of the tax. |
| `rate` | string | required, max length 255 characters | Tax rate as a decimal. |
| `taxType` | string | required | Type of the tax. |
| `isActive` | boolean | required | Whether the tax is active. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |
| `label` | string,null | optional, max length 255 characters | Label of the tax. |
| `ratePercent` | string | required, max length 7 characters | Tax rate as a percentage. |

#### order_item

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [order_item_attributes](orders.md#order_item_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `relationships` | [order_item_relationships](orders.md#order_item_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |
| `links` | object | required | A [links object](https://jsonapi.org/format/#document-resource-object-links) containing links related to the resource. |

#### order_item_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `quantity` | string | required, max length 255 characters | The number of units of the product being ordered. |
| `unitPriceInclTax` | string | required, max length 255 characters | The price of the product per unit, including applicable taxes. |
| `subtotal` | string | required, max length 255 characters | The total price of the product before taxes and discounts are applied. |
| `tax` | string | required, max length 255 characters | The tax amount applicable to the specific item. |
| `total` | string | required, max length 255 characters | The total price of the item after taxes and discounts have been applied. |
| `discount` | string,null | optional, max length 255 characters | The percentage or amount of discount applied specifically to this item. |
| `discountAmount` | string,null | optional, max length 255 characters | The total monetary value of the discount applied to this specific item. |
| `isComp` | boolean | required | Indicates whether the item was provided for free (comped) or not. |
| `isVoid` | boolean | required | Indicates whether the item has been voided from the order. |
| `notes` | string,null | optional, max length 2048 characters | Internal notes for the order item. |
| `compVoidReason` | string,null | optional, max length 255 characters | The reason provided for voiding the item, if applicable. |
| `compVoidNotes` | string,null | optional, max length 2048 characters | Additional notes regarding the comping or voiding of the item. |
| `status` | string | required | The current status of the order item. |
| `discountType` | string | required | The type of discount applied to the order item. |
| `discountDescription` | string,null | optional, max length 255 characters | Description of the discount applied to the order item. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |

#### order_item_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `product` | [relationship_product](orders.md#relationship_product) | required | Details of the product associated with the selected item. |
| `productVariant` | [relationship_product_variant](orders.md#relationship_product_variant) | required | Details of the product variant associated with the selected item. |
| `modifiers` | [relationship_modifiers](orders.md#relationship_modifiers) | required | Details of the modifiers associated with the selected item. |
| `revenueCenter` | [relationship_revenue_center](orders.md#relationship_revenue_center) | required | Details of the revenue center associated with the selected item. |

#### relationship_product

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | object | required |  |

#### relationship_product_variant

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | object,null | optional |  |

#### relationship_modifiers

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | array of object object | required, max 1000 items |  |

#### relationship_revenue_center

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | object,null | optional |  |

#### order_bundle

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | [Resource identifier](orders.md#resource-identifier) | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [order_bundle_attributes](orders.md#order_bundle_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `links` | object | required | A [links object](https://jsonapi.org/format/#document-resource-object-links) containing links related to the resource. |

#### order_bundle_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `discount` | string,null | optional, max length 255 characters | The percentage or amount of discount applied specifically to this item. |
| `discountType` | string | required | The type of discount applied to the order item. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |

#### order_bundle_item

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | [Resource identifier](orders.md#resource-identifier) | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [order_bundle_item_attributes](orders.md#order_bundle_item_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `relationships` | [order_item_relationships](orders.md#order_item_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |
| `links` | object | required | A [links object](https://jsonapi.org/format/#document-resource-object-links) containing links related to the resource. |

#### order_bundle_item_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `quantity` | string | required, max length 255 characters | The number of units of the product being ordered. |
| `unitPriceInclTax` | string | required, max length 255 characters | The price of the product per unit, including applicable taxes. |
| `total` | string | required, max length 255 characters | The total price of the item after taxes and discounts have been applied. |
| `notes` | string,null | optional, max length 1000 characters | Internal notes for the order bundle item. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |

#### relationship_order_bundle

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | object | required |  |

#### links

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `prev` | string,null | optional, max length 1024 characters | The link to the previous page of results. |
| `next` | string,null | optional, max length 1024 characters | The link to the next page of results. |

## Create order

This operation creates an order.

**Note:** This operation needs [Authentication](../essential-guide/authentication.md) and supports the following JSON:API features:

- [Relationships](../guidelines/relationships.md) - `invoice`, `customer`, `booking`, `tables`, `promoCode`, `outlet`, `revenueCenter`, `taxes`, `orderItems`, `payments` using `include` query parameter.
- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `order` and related resources with `fields` query parameter.

### Request

`POST` `[PlatformAddress]/v1/orders`

```javascript
{
  "data": {
    "type": "orders",
    "attributes": {
      "covers": 2,
      "notes": "Test notes"
    },
    "relationships": {
      "customer": {
        "data": {
          "type": "customers",
          "id": "a393a4bc-14fb-45cf-b980-427627cbfd65"
        }
      },
      "tables": {
        "data": [
          {
            "type": "tables",
            "id": "dcd9718c-abb0-4ba2-83c5-ae01505a5391"
          }
        ]
      },
      "outlet": {
        "data": {
          "type": "outlets",
          "id": "5e5c75c0-0adb-4fd9-af97-bdad5397c8a1"
        }
      },
      "revenueCenter": {
        "data": {
          "type": "revenue_centers",
          "id": "bda5d905-5bc3-45a5-adc2-f83854b23d9f"
        }
      },
      "promoCode": {
        "data": {
          "type": "promo_codes",
          "id": "7e526753-b30e-4067-8d01-cc41af7b3ef6"
        }
      },
      "items": {
        "data": [
          {
            "type": "orderItems",
            "tempId": "order-item-1"
          },
          {
            "type": "orderBundleItems",
            "tempId": "order-bundle-item-1"
          }
        ]
      },
      "payments": {
        "data": [
          {
            "type": "payments",
            "tempId": "payment-1"
          }
        ]
      }
    },
    "included": {
      "items": [
        {
          "type": "orderItems",
          "tempId": "order-item-1",
          "attributes": {
            "quantity": "3.00",
            "total": "18.00",
            "unitPriceInclTax": "6.00",
            "tax": "1.00",
            "subtotal": "17.00",
            "discount": "10.00",
            "discountType": "percentage",
            "discountDescription": "Regular customer",
            "isComp": false,
            "isVoid": false,
            "notes": "Special preparation instructions",
            "compVoidReason": "Example comp reason",
            "compVoidNotes": "Example void reason"
          },
          "relationships": {
            "product": {
              "data": {
                "type": "products",
                "id": "c8e421ac-dcce-458a-ba7c-6f44b642718e"
              }
            },
            "productVariant": {
              "data": {
                "type": "productVariants",
                "id": "39117180-5203-462a-b325-689427a7029f"
              }
            },
            "modifiers": {
              "data": [
                {
                  "type": "modifiers",
                  "id": "44582405-1201-427c-9015-153b4b1d724f"
                }
              ]
            }
          }
        },
        {
          "type": "orderBundleItems",
          "tempId": "order-bundle-item-1",
          "attributes": {
            "unitPriceInclTax": "12.50",
            "total": "12.50",
            "notes": "Special bundle item"
          },
          "relationships": {
            "product": {
              "data": {
                "type": "products",
                "id": "c8e421ac-dcce-458a-ba7c-6f44b642718e"
              }
            },
            "productVariant": {
              "data": {
                "type": "productVariants",
                "id": "39117180-5203-462a-b325-689427a7029f"
              }
            },
            "productBundleItem": {
              "data": {
                "type": "productBundleItems",
                "id": "d4f5e6a7-b8c9-40d1-9e2f-3a4b5c6d7e8f"
              }
            },
            "orderBundle": {
              "data": {
                "type": "orderBundles",
                "tempId": "order-bundle-1"
              }
            },
            "modifiers": {
              "data": [
                {
                  "type": "modifiers",
                  "id": "55667788-99aa-bbcc-ddee-ff0011223344"
                }
              ]
            }
          }
        }
      ],
      "orderBundles": [
        {
          "type": "orderBundles",
          "tempId": "order-bundle-1",
          "attributes": {
            "quantity": "1.00",
            "discount": "5.00",
            "discountType": "percentage"
          },
          "relationships": {
            "productBundle": {
              "data": {
                "type": "productBundles",
                "id": "123e4567-e89b-12d3-a456-426614174000"
              }
            }
          }
        }
      ],
      "payments": [
        {
          "type": "payments",
          "tempId": "payment-1",
          "attributes": {
            "amount": "100.00",
            "notes": "Payment for order",
            "tipAmount": "15.00"
          },
          "relationships": {
            "paymentMethod": {
              "data": {
                "type": "paymentMethods",
                "id": "4014e105-57d6-4b12-a4fc-164601ec53e9"
              }
            },
            "register": {
              "data": {
                "type": "registers",
                "id": "4014e105-57d6-4b12-a4fc-164601ec53e9"
              }
            }
          }
        }
      ]
    }
  }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [order_create](orders.md#order_create) | required | The document's "primary data". |

#### order_create

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [order_create_attributes](orders.md#order_create_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `relationships` | object | required | An [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) representing associations with other resources. |
| `included` | object | required | An object containing included resource objects that are related to the primary data and/or each other. |

#### order_create_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `notes` | string | required, max length 500 characters | Notes about the order. |
| `covers` | integer | required | How many people are seated at the table. |
| `surcharge` | string,null | optional, max length 10 characters | The surcharge amount applied to the order. |
| `surchargeType` | string,null | optional | The type of surcharge applied to the order. |
| `surchargeDescription` | string,null | optional, max length 255 characters | Description of the surcharge applied to the order. |
| `discount` | string,null | optional, max length 10 characters | The discount amount applied to the order. |
| `discountType` | string,null | optional | The type of discount applied to the order. |
| `discountDescription` | string,null | optional, max length 255 characters | Description of the discount applied to the order. |

#### order_bundle_item_create_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `total` | string | required, max length 10 characters | Total price of the item including tax. |
| `unitPriceInclTax` | string | required, max length 10 characters | Unit price including tax. |
| `notes` | string | required, max length 500 characters | Internal notes for the bundle item. |

#### order_bundle_item_create_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `productBundleItem` | object | required |  |
| `orderBundle` | object | required |  |
| `product` | object | required |  |
| `productVariant` | object | required |  |
| `modifiers` | object | required |  |

#### order_bundle_create_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `quantity` | string | required, max length 10 characters | Quantity of the bundle item. |
| `discount` | string | required, max length 10 characters | Discount amount for the item. |
| `discountType` | string | required | Type of discount applied. |

#### order_bundle_create_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `productBundle` | object | required |  |

### Response

```javascript
{
  "data": {
    "id": "2496b6bd-a326-4a5a-95c8-359c943dcee8",
    "type": "orders",
    "attributes": {
      "covers": 1,
      "tableStatus": "seated",
      "notes": "Please make it quick",
      "depositAmount": "20.00",
      "createdAt": "2021-06-29T08:00:00Z",
      "updatedAt": "2021-06-29T08:00:00Z"
    },
    "relationships": {
      "invoice": {
        "data": {
          "id": "4014e105-57d6-4b12-a4fc-164601ec53e9",
          "type": "invoices"
        }
      },
      "customer": {
        "data": {
          "id": "4014e105-57d6-4b12-a4fc-164601ec53e9",
          "type": "customers"
        }
      },
      "register": {
        "data": {
          "id": "a0312dc4-e0bf-4a27-837d-a6cf41f54464",
          "type": "bookings"
        }
      },
      "invoiceItems": {
        "data": [
          {
            "id": "dcd9718c-abb0-4ba2-83c5-ae01505a5391",
            "type": "tables"
          }
        ]
      },
      "promoCode": {
        "data": {
          "id": "167beb82-e6a7-453b-8048-cfa25d3ce467",
          "type": "promoCodes"
        }
      },
      "taxes": {
        "data": [
          {
            "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
            "type": "taxes"
          }
        ]
      },
      "orderItems": {
        "data": [
          {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "type": "orderItems"
          },
          {
            "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
            "type": "orderBundleItems"
          }
        ]
      }
    },
    "included": [
      {
        "type": "orderItems",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "attributes": {
          "quantity": "3.00",
          "total": "18.00",
          "unitPriceInclTax": "6.00",
          "tax": "1.00",
          "subtotal": "17.00",
          "discount": "10.00",
          "discountType": "percentage",
          "discountDescription": "Regular customer"
        },
        "relationships": {
          "product": {
            "data": {
              "type": "products",
              "id": "c8e421ac-dcce-458a-ba7c-6f44b642718e"
            }
          },
          "productVariant": {
            "data": {
              "type": "productVariants",
              "id": "39117180-5203-462a-b325-689427a7029f"
            }
          },
          "modifiers": {
            "data": [
              {
                "type": "modifiers",
                "id": "44582405-1201-427c-9015-153b4b1d724f"
              }
            ]
          }
        }
      },
      {
        "type": "orderBundleItems",
        "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
        "attributes": {
          "unitPriceInclTax": "12.50",
          "total": "12.50",
          "notes": "Special bundle item"
        },
        "relationships": {
          "productBundleItem": {
            "data": {
              "type": "productBundleItems",
              "id": "d4f5e6a7-b8c9-40d1-9e2f-3a4b5c6d7e8f"
            }
          },
          "modifiers": {
            "data": [
              {
                "type": "modifiers",
                "id": "55667788-99aa-bbcc-ddee-ff0011223344"
              }
            ]
          },
          "orderBundle": {
            "data": {
              "type": "orderBundles",
              "id": "f5e6d7c8-9ab0-1234-5678-90abcdef1234"
            }
          }
        }
      },
      {
        "type": "orderBundles",
        "id": "f5e6d7c8-9ab0-1234-5678-90abcdef1234",
        "attributes": {
          "quantity": "1.00",
          "discount": "5.00",
          "discountType": "percentage"
        },
        "relationships": {
          "productBundle": {
            "data": {
              "type": "productBundles",
              "id": "f2b8e1d3-3c4b-4e6a-9f5e-2d3c45b6a7b8"
            }
          }
        }
      }
    ],
    "links": {
      "self": "https://api.mews-demo.com/pos/v1/orders/2496b6bd-a326-4a5a-95c8-359c943dcee8"
    }
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [order](orders.md#order) | required | The document's "primary data". |
| `included` | array of object [invoice](orders.md#invoice),[table](orders.md#table),[booking](orders.md#booking),[customer](orders.md#customer),[promo_code](orders.md#promo_code),[outlet](orders.md#outlet),[revenue_center](orders.md#revenue_center),[tax](orders.md#tax),[order_item](orders.md#order_item),[order_bundle_item](orders.md#order_bundle_item),[order_bundle](orders.md#order_bundle) | optional, max 100 items | Details of the objects to which the order is associated. |

## Get order

An order represents a single set of items that was ordered by a customer. Each order is uniquely identified and can be associated with an invoice item.

**Note:** This operation needs [Authentication](../guidelines/authentication.md) and supports the following JSON:API features:

- [Relationships](../guidelines/relationships.md) - `invoice`, `customer`, `booking`, `tables`, `promoCode`, `outlet`, `revenueCenter` using `include` query parameter.
- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `order` and related resources with `fields` query parameter.

### Request

`GET` `[PlatformAddress]/v1/orders/{id}`

### Response

```javascript
{
  "data": {
    "id": "2496b6bd-a326-4a5a-95c8-359c943dcee8",
    "type": "orders",
    "attributes": {
      "covers": 1,
      "tableStatus": "seated",
      "notes": "Please make it quick",
      "depositAmount": "20.00",
      "createdAt": "2021-06-29T08:00:00Z",
      "updatedAt": "2021-06-29T08:00:00Z"
    },
    "relationships": {
      "invoice": {
        "data": {
          "id": "4014e105-57d6-4b12-a4fc-164601ec53e9",
          "type": "invoices"
        }
      },
      "customer": {
        "data": {
          "id": "4014e105-57d6-4b12-a4fc-164601ec53e9",
          "type": "customers"
        }
      },
      "register": {
        "data": {
          "id": "a0312dc4-e0bf-4a27-837d-a6cf41f54464",
          "type": "bookings"
        }
      },
      "invoiceItems": {
        "data": [
          {
            "id": "dcd9718c-abb0-4ba2-83c5-ae01505a5391",
            "type": "tables"
          }
        ]
      },
      "promoCode": {
        "data": {
          "id": "167beb82-e6a7-453b-8048-cfa25d3ce467",
          "type": "promoCodes"
        }
      },
      "taxes": {
        "data": [
          {
            "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
            "type": "taxes"
          }
        ]
      },
      "orderItems": {
        "data": [
          {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "type": "orderItems"
          },
          {
            "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
            "type": "orderBundleItems"
          }
        ]
      }
    },
    "included": [
      {
        "type": "orderItems",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "attributes": {
          "quantity": "3.00",
          "total": "18.00",
          "unitPriceInclTax": "6.00",
          "tax": "1.00",
          "subtotal": "17.00",
          "discount": "10.00",
          "discountType": "percentage",
          "discountDescription": "Regular customer"
        },
        "relationships": {
          "product": {
            "data": {
              "type": "products",
              "id": "c8e421ac-dcce-458a-ba7c-6f44b642718e"
            }
          },
          "productVariant": {
            "data": {
              "type": "productVariants",
              "id": "39117180-5203-462a-b325-689427a7029f"
            }
          },
          "modifiers": {
            "data": [
              {
                "type": "modifiers",
                "id": "44582405-1201-427c-9015-153b4b1d724f"
              }
            ]
          }
        }
      },
      {
        "type": "orderBundleItems",
        "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
        "attributes": {
          "unitPriceInclTax": "12.50",
          "total": "12.50",
          "notes": "Special bundle item"
        },
        "relationships": {
          "productBundleItem": {
            "data": {
              "type": "productBundleItems",
              "id": "d4f5e6a7-b8c9-40d1-9e2f-3a4b5c6d7e8f"
            }
          },
          "modifiers": {
            "data": [
              {
                "type": "modifiers",
                "id": "55667788-99aa-bbcc-ddee-ff0011223344"
              }
            ]
          },
          "orderBundle": {
            "data": {
              "type": "orderBundles",
              "id": "f5e6d7c8-9ab0-1234-5678-90abcdef1234"
            }
          }
        }
      },
      {
        "type": "orderBundles",
        "id": "f5e6d7c8-9ab0-1234-5678-90abcdef1234",
        "attributes": {
          "quantity": "1.00",
          "discount": "5.00",
          "discountType": "percentage"
        },
        "relationships": {
          "productBundle": {
            "data": {
              "type": "productBundles",
              "id": "f2b8e1d3-3c4b-4e6a-9f5e-2d3c45b6a7b8"
            }
          }
        }
      }
    ],
    "links": {
      "self": "https://api.mews-demo.com/pos/v1/orders/2496b6bd-a326-4a5a-95c8-359c943dcee8"
    }
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [order](orders.md#order) | required | The document's "primary data". |
| `included` | array of object [invoice](orders.md#invoice),[table](orders.md#table),[booking](orders.md#booking),[customer](orders.md#customer),[promo_code](orders.md#promo_code),[outlet](orders.md#outlet),[revenue_center](orders.md#revenue_center),[tax](orders.md#tax),[order_item](orders.md#order_item),[order_bundle_item](orders.md#order_bundle_item),[order_bundle](orders.md#order_bundle) | optional, max 100 items | Details of the objects to which the order is associated. |

## Update order

This operation updates an existing order. You can update order attributes (covers, notes) and relationships (customer, tables, outlet, revenue center, promo code). You can also add new items to the order or update existing ones.

**Item Identifiers:**
- Use `tempId` for new items being added to the order (items that don't exist in the database yet).
- Use `id` (UUID) for existing items that are being updated or kept in the order.

**Note:** This operation needs [Authentication](../guidelines/authentication.md) and supports the following JSON:API features:

- [Relationships](../guidelines/relationships.md) - `customer`, `tables`, `outlet`, `revenueCenter`, `promoCode` using relationships in the request body.
- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `order` and related resources with `fields` query parameter.

### Request

`PATCH` `[PlatformAddress]/v1/orders/{id}`

```javascript
{
  "data": {
    "type": "orders",
    "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
    "attributes": {
      "covers": 4,
      "notes": "Updated notes for the order"
    },
    "relationships": {
      "customer": {
        "data": {
          "type": "customers",
          "id": "a393a4bc-14fb-45cf-b980-427627cbfd65"
        }
      },
      "tables": {
        "data": [
          {
            "type": "tables",
            "id": "dcd9718c-abb0-4ba2-83c5-ae01505a5391"
          }
        ]
      },
      "outlet": {
        "data": {
          "type": "outlets",
          "id": "5e5c75c0-0adb-4fd9-af97-bdad5397c8a1"
        }
      },
      "revenueCenter": {
        "data": {
          "type": "revenue_centers",
          "id": "bda5d905-5bc3-45a5-adc2-f83854b23d9f"
        }
      },
      "promoCode": {
        "data": {
          "type": "promo_codes",
          "id": "7e526753-b30e-4067-8d01-cc41af7b3ef6"
        }
      },
      "items": {
        "data": [
          {
            "type": "orderItems",
            "tempId": "order-item-2"
          },
          {
            "type": "orderItems",
            "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
          },
          {
            "type": "orderBundleItems",
            "tempId": "order-bundle-item-1"
          }
        ]
      }
    },
    "included": {
      "items": [
        {
          "type": "orderItems",
          "tempId": "order-item-2",
          "attributes": {
            "quantity": "2.00",
            "total": "12.00",
            "unitPriceInclTax": "6.00",
            "tax": "1.00",
            "subtotal": "11.00",
            "discount": "0.00",
            "discountType": "fixed",
            "discountDescription": "Regular customer discount"
          },
          "relationships": {
            "product": {
              "data": {
                "type": "products",
                "id": "c8e421ac-dcce-458a-ba7c-6f44b642718e"
              }
            },
            "productVariant": {
              "data": {
                "type": "productVariants",
                "id": "39117180-5203-462a-b325-689427a7029f"
              }
            },
            "modifiers": {
              "data": [
                {
                  "type": "modifiers",
                  "id": "44582405-1201-427c-9015-153b4b1d724f"
                }
              ]
            }
          }
        },
        {
          "type": "orderItems",
          "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
          "attributes": {
            "quantity": "3.00",
            "notes": "Updated quantity for existing item"
          },
          "relationships": {
            "product": {
              "data": {
                "type": "products",
                "id": "c8e421ac-dcce-458a-ba7c-6f44b642718e"
              }
            }
          }
        },
        {
          "type": "orderBundleItems",
          "tempId": "order-bundle-item-1",
          "attributes": {
            "total": "12.50",
            "unitPriceInclTax": "12.50",
            "notes": "Special bundle item"
          },
          "relationships": {
            "product": {
              "data": {
                "type": "products",
                "id": "c8e421ac-dcce-458a-ba7c-6f44b642718e"
              }
            },
            "productVariant": {
              "data": {
                "type": "productVariants",
                "id": "39117180-5203-462a-b325-689427a7029f"
              }
            },
            "productBundleItem": {
              "data": {
                "type": "productBundleItems",
                "id": "d4f5e6a7-b8c9-40d1-9e2f-3a4b5c6d7e8f"
              }
            },
            "orderBundle": {
              "data": {
                "type": "orderBundles",
                "tempId": "order-bundle-1"
              }
            },
            "modifiers": {
              "data": [
                {
                  "type": "modifiers",
                  "id": "55667788-99aa-bbcc-ddee-ff0011223344"
                }
              ]
            }
          }
        },
        {
          "type": "orderBundleItems",
          "tempId": "order-bundle-item-1",
          "attributes": {
            "total": "12.50",
            "unitPriceInclTax": "12.50",
            "notes": "Special bundle item"
          },
          "relationships": {
            "product": {
              "data": {
                "type": "products",
                "id": "c8e421ac-dcce-458a-ba7c-6f44b642718e"
              }
            },
            "productVariant": {
              "data": {
                "type": "productVariants",
                "id": "39117180-5203-462a-b325-689427a7029f"
              }
            },
            "productBundleItem": {
              "data": {
                "type": "productBundleItems",
                "id": "d4f5e6a7-b8c9-40d1-9e2f-3a4b5c6d7e8f"
              }
            },
            "orderBundle": {
              "data": {
                "type": "orderBundles",
                "id": "87654321-0abc-def1-2345-67890abcdef1"
              }
            }
          }
        }
      ],
      "orderBundles": [
        {
          "type": "orderBundles",
          "tempId": "order-bundle-1",
          "attributes": {
            "quantity": "1.00",
            "discount": "5.00",
            "discountType": "percentage"
          },
          "relationships": {
            "productBundle": {
              "data": {
                "type": "productBundles",
                "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
              }
            }
          }
        }
      ]
    }
  }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [order_update](orders.md#order_update) | required | The document's "primary data". |

#### order_update

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the order. |
| `attributes` | [order_update_attributes](orders.md#order_update_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `relationships` | object | required | An [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) representing associations with other resources. |
| `included` | object | required | An object containing included resource objects that are related to the primary data and/or each other. |

#### order_update_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `notes` | string,null | optional, max length 500 characters | Notes about the order. |
| `covers` | undefined | required | How many people are seated at the table. |
| `surcharge` | string,null | optional, max length 10 characters | The surcharge amount applied to the order. |
| `surchargeType` | string,null | optional | The type of surcharge applied to the order. |
| `surchargeDescription` | string,null | optional, max length 255 characters | Description of the surcharge applied to the order. |
| `discount` | string,null | optional, max length 10 characters | The discount amount applied to the order. |
| `discountType` | string,null | optional | The type of discount applied to the order. |
| `discountDescription` | string,null | optional, max length 255 characters | Description of the discount applied to the order. |

#### order_item_update_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `quantity` | string | required, max length 10 characters | Quantity of the item. |
| `total` | string | required, max length 10 characters | Total price of the item including tax. |
| `unitPriceInclTax` | string | required, max length 10 characters | Unit price including tax. |
| `tax` | string | required, max length 10 characters | Tax amount for the item. |
| `subtotal` | string | required, max length 10 characters | Subtotal price of the item. |
| `discount` | string | required, max length 10 characters | Discount amount for the item. |
| `discountType` | string | required | Type of discount applied. |
| `discountDescription` | string | required, max length 255 characters | Description of the discount. |
| `isComp` | boolean | required | Indicates whether the item was provided for free (comped) or not. |
| `isVoid` | boolean | required | Indicates whether the item has been voided from the order. |
| `notes` | string,null | optional, max length 2048 characters | Internal notes for the order item. |
| `compVoidReason` | string | required, max length 255 characters | The reason provided for voiding the item, if applicable. |
| `compVoidNotes` | string | required, max length 2048 characters | Additional notes regarding the comping or voiding of the item. |

#### order_item_update_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `product` | object | required |  |
| `productVariant` | object | required |  |
| `modifiers` | object | required |  |

#### order_bundle_item_update_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `total` | string | required, max length 10 characters | Total price of the item including tax. |
| `unitPriceInclTax` | string | required, max length 10 characters | Unit price including tax. |
| `notes` | string | required, max length 500 characters | Internal notes for the bundle item. |

#### order_bundle_item_update_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `orderBundle` | object | required |  |
| `modifiers` | object | required |  |

#### order_bundle_update_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `quantity` | string | required, max length 10 characters | Quantity of the bundle item. |
| `discount` | string | required, max length 10 characters | Discount amount for the item. |
| `discountType` | string | required | Type of discount applied. |

### Response

```javascript
{
  "data": {
    "id": "2496b6bd-a326-4a5a-95c8-359c943dcee8",
    "type": "orders",
    "attributes": {
      "covers": 1,
      "tableStatus": "seated",
      "notes": "Please make it quick",
      "depositAmount": "20.00",
      "createdAt": "2021-06-29T08:00:00Z",
      "updatedAt": "2021-06-29T08:00:00Z"
    },
    "relationships": {
      "invoice": {
        "data": {
          "id": "4014e105-57d6-4b12-a4fc-164601ec53e9",
          "type": "invoices"
        }
      },
      "customer": {
        "data": {
          "id": "4014e105-57d6-4b12-a4fc-164601ec53e9",
          "type": "customers"
        }
      },
      "register": {
        "data": {
          "id": "a0312dc4-e0bf-4a27-837d-a6cf41f54464",
          "type": "bookings"
        }
      },
      "invoiceItems": {
        "data": [
          {
            "id": "dcd9718c-abb0-4ba2-83c5-ae01505a5391",
            "type": "tables"
          }
        ]
      },
      "promoCode": {
        "data": {
          "id": "167beb82-e6a7-453b-8048-cfa25d3ce467",
          "type": "promoCodes"
        }
      },
      "taxes": {
        "data": [
          {
            "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
            "type": "taxes"
          }
        ]
      },
      "orderItems": {
        "data": [
          {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "type": "orderItems"
          },
          {
            "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
            "type": "orderBundleItems"
          }
        ]
      }
    },
    "included": [
      {
        "type": "orderItems",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "attributes": {
          "quantity": "3.00",
          "total": "18.00",
          "unitPriceInclTax": "6.00",
          "tax": "1.00",
          "subtotal": "17.00",
          "discount": "10.00",
          "discountType": "percentage",
          "discountDescription": "Regular customer"
        },
        "relationships": {
          "product": {
            "data": {
              "type": "products",
              "id": "c8e421ac-dcce-458a-ba7c-6f44b642718e"
            }
          },
          "productVariant": {
            "data": {
              "type": "productVariants",
              "id": "39117180-5203-462a-b325-689427a7029f"
            }
          },
          "modifiers": {
            "data": [
              {
                "type": "modifiers",
                "id": "44582405-1201-427c-9015-153b4b1d724f"
              }
            ]
          }
        }
      },
      {
        "type": "orderBundleItems",
        "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
        "attributes": {
          "unitPriceInclTax": "12.50",
          "total": "12.50",
          "notes": "Special bundle item"
        },
        "relationships": {
          "productBundleItem": {
            "data": {
              "type": "productBundleItems",
              "id": "d4f5e6a7-b8c9-40d1-9e2f-3a4b5c6d7e8f"
            }
          },
          "modifiers": {
            "data": [
              {
                "type": "modifiers",
                "id": "55667788-99aa-bbcc-ddee-ff0011223344"
              }
            ]
          },
          "orderBundle": {
            "data": {
              "type": "orderBundles",
              "id": "f5e6d7c8-9ab0-1234-5678-90abcdef1234"
            }
          }
        }
      },
      {
        "type": "orderBundles",
        "id": "f5e6d7c8-9ab0-1234-5678-90abcdef1234",
        "attributes": {
          "quantity": "1.00",
          "discount": "5.00",
          "discountType": "percentage"
        },
        "relationships": {
          "productBundle": {
            "data": {
              "type": "productBundles",
              "id": "f2b8e1d3-3c4b-4e6a-9f5e-2d3c45b6a7b8"
            }
          }
        }
      }
    ],
    "links": {
      "self": "https://api.mews-demo.com/pos/v1/orders/2496b6bd-a326-4a5a-95c8-359c943dcee8"
    }
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [order](orders.md#order) | required | The document's "primary data". |
| `included` | array of object [invoice](orders.md#invoice),[table](orders.md#table),[booking](orders.md#booking),[customer](orders.md#customer),[promo_code](orders.md#promo_code),[outlet](orders.md#outlet),[revenue_center](orders.md#revenue_center),[tax](orders.md#tax),[order_item](orders.md#order_item),[order_bundle_item](orders.md#order_bundle_item),[order_bundle](orders.md#order_bundle) | optional, max 100 items | Details of the objects to which the order is associated. |
