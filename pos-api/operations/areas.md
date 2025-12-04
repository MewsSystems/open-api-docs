<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Areas

## Get areas

This operation returns a list of areas.

**Note**: This operation needs [Authentication](../guidelines/authentication.md) and supports the following JSON:API features:
- [Relationships](../guidelines/relationships.md) - `tables` using `include` query parameter.
- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `area` and related resources with `fields` query parameter.

### Request

`GET` `[PlatformAddress]/v1/areas`

### Response

```javascript
{
  "data": [
    {
      "id": "31b14937-2524-491f-b0a0-dc0a7393ff33",
      "type": "areas",
      "attributes": {
        "name": "Terrace",
        "isActive": true,
        "createdAt": "2024-10-24T08:44:45.409Z",
        "updatedAt": "2024-10-24T08:44:45.409Z"
      },
      "relationships": {
        "tables": {
          "data": [
            {
              "id": "22426614-316e-4654-b567-60d781f9ae37",
              "type": "tables"
            }
          ]
        }
      }
    }
  ],
  "links": {
    "prev": "https://api.mews-demo.com/pos/v1/areas?page%5Bbefore%5D=NA&page%5Bsize%5D=1",
    "next": "https://api.mews-demo.com/pos/v1/areas?page%5Bafter%5D=NA&page%5Bsize%5D=1"
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | array of object [area](areas.md#area) | required, max 1000 items | The document's "primary data". |
| `links` | [area_pagination_links](areas.md#area_pagination_links) | required | A [links object](https://jsonapi.org/profiles/ethanresnick/cursor-pagination/#auto-id-links) describing cursor pagination links. |

#### area

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [area_attributes](areas.md#area_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `relationships` | [area_relationships](areas.md#area_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |

#### area_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `name` | string | required, max length 10000 characters | Name for the Area. |
| `isActive` | boolean | required | Indicates whether the Area is active or not. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |

#### area_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `tables` | object | required | Details of the tables associated with the area. |

#### area_pagination_links

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `prev` | string,null | optional, max length 1024 characters | The link to the previous page of results. |
| `next` | string,null | optional, max length 1024 characters | The link to the next page of results. |
