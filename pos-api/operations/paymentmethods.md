<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# PaymentMethods

## Get payment methods

This operation returns a list of active and inactive payment methods with pagination.

**Note**: This operation needs [Authentication](../guidelines/authentication.md) and supports the following JSON:API features:

- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `paymentMethod` with `fields` query parameter.

### Request

`GET` `[PlatformAddress]/v1/payment-methods`

### Response

```javascript
{
  "data": [
    {
      "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
      "type": "paymentMethods",
      "attributes": {
        "name": "Cash",
        "code": "cash",
        "isActive": true,
        "isTippable": false,
        "createdAt": "2023-01-01T00:00:00Z",
        "updatedAt": "2023-01-01T00:00:00Z"
      }
    }
  ],
  "links": {
    "prev": "https://api.mews-demo.com/pos/v1/payment-methods?page%5Bbefore%5D=NA&page%5Bsize%5D=1",
    "next": "https://api.mews-demo.com/pos/v1/payment-methods?page%5Bafter%5D=NA&page%5Bsize%5D=1"
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | array of object [payment_method](paymentmethods.md#payment_method) | required, max 1000 items | The document's "primary data". |
| `links` | [links](paymentmethods.md#links) | required | A [links object](https://jsonapi.org/profiles/ethanresnick/cursor-pagination/#auto-id-links) describing cursor pagination links. |

#### payment_method

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [payment_method_attributes](paymentmethods.md#payment_method_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

#### payment_method_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `name` | string,null | optional, max length 255 characters | Name of the payment method. |
| `code` | string | required | Code identifier of the payment method. |
| `isActive` | boolean | required | Indicates if the payment method is active. |
| `isTippable` | boolean | required | Indicates if tips are allowed for this payment method. |
| `createdAt` | string | required, max length 25 characters | Payment method created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Payment method updated at timestamp in RFC 3339 format. |

#### links

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `prev` | string,null | optional, max length 1024 characters | The link to the previous page of results. |
| `next` | string,null | optional, max length 1024 characters | The link to the next page of results. |
