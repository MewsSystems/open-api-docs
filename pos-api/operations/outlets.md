<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Outlets

## Get outlets

Returns a list of not deleted outlets with pagination

**Note:** This operation needs [Authentication](../guidelines/authentication.md) and supports the following JSON:API features:

- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `outlet` with `fields` query parameter.

### Request

`GET` `[PlatformAddress]/v1/outlets`

### Response

```javascript
{
  "data": [
    {
      "id": "2bf58012-e340-478e-a123-dbe372ac86fb",
      "type": "outlets",
      "attributes": {
        "name": "Outlet 1",
        "address1": "123 Main St",
        "address2": "Suite 100",
        "city": "Anytown",
        "state": "CA",
        "index": 1,
        "postalCode": "12345",
        "createdAt": "2023-01-01T00:00:00Z",
        "updatedAt": "2023-01-02T00:00:00Z"
      }
    }
  ],
  "links": {
    "prev": "https://api.mews-demo.com/pos/v1/outlets?page%5Bbefore%5D=NA&page%5Bsize%5D=1",
    "next": "https://api.mews-demo.com/pos/v1/outlets?page%5Bafter%5D=NA&page%5Bsize%5D=1"
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | array of object [outlet](outlets.md#outlet) | required, max 1000 items | The document's "primary data". |
| `links` | [links](outlets.md#links) | required | A [links object](https://jsonapi.org/profiles/ethanresnick/cursor-pagination/#auto-id-links) describing cursor pagination links. |

#### outlet

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [outlet_attributes](outlets.md#outlet_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

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

#### links

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `prev` | string,null | optional, max length 1024 characters | The link to the previous page of results. |
| `next` | string,null | optional, max length 1024 characters | The link to the next page of results. |
