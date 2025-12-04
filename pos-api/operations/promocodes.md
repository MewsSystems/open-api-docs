<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# PromoCodes

## Get promo codes

This operation returns a list of active discount promo codes. Deleted promo codes are not included in the response.

**Note:** This operation needs [Authentication](../guidelines/authentication.md) and supports the following JSON:API features:

- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `promoCodes` and related resources with `fields` query parameter.

### Request

`GET` `[PlatformAddress]/v1/promo-codes`

### Response

```javascript
{
  "data": [
    {
      "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
      "type": "promoCodes",
      "attributes": {
        "discountType": "percent",
        "amount": "10.00",
        "channel": "ecommerce",
        "code": "SUMMER",
        "active": true,
        "description": "10% off on all orders",
        "maxUsages": 100,
        "startsAt": "2023-10-15T00:00:00Z",
        "endsAt": "2023-10-20T00:00:00Z",
        "createdAt": "2023-10-16T14:30:00Z",
        "updatedAt": "2023-10-19T14:30:00Z"
      }
    }
  ],
  "links": {
    "prev": "https://api.mews-demo.com/pos/v1/promo-codes?page%5Bbefore%5D=NA&page%5Bsize%5D=1",
    "next": "https://api.mews-demo.com/pos/v1/promo-codes?page%5Bafter%5D=NA&page%5Bsize%5D=1"
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | array of object [promo_code](promocodes.md#promo_code) | required, max 1000 items | The document's "primary data". |
| `links` | [links](promocodes.md#links) | required | A [links object](https://jsonapi.org/profiles/ethanresnick/cursor-pagination/#auto-id-links) describing cursor pagination links. |

#### promo_code

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [promo_code_attributes](promocodes.md#promo_code_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

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

#### links

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `prev` | string,null | optional, max length 1024 characters | The link to the previous page of results. |
| `next` | string,null | optional, max length 1024 characters | The link to the next page of results. |
