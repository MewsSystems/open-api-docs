<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Tables

## Get tables

This operation returns a list of restaurant tables.

**Note:** This operation needs [Authentication](../guidelines/authentication.md) and supports the following JSON:API features:

- [Filters](../guidelines/filtering.md) - `orderIdEq`
- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `table` with `fields` query parameter.

### Request

`GET` `[PlatformAddress]/v1/tables`

### Response

```javascript
{
  "data": [
    {
      "id": "286ef74f-e37f-477f-bcda-77f8fbfd13ea",
      "type": "tables",
      "attributes": {
        "name": "Table number 1",
        "numberOfSeats": 4,
        "createdAt": "2024-11-13T11:29:00Z",
        "updatedAt": "2024-11-15T11:29:00Z"
      },
      "relationships": {
        "area": {
          "data": {
            "id": "c53372e2-9aa1-452a-8965-2ea3fa514fb2",
            "type": "areas"
          }
        }
      }
    }
  ],
  "links": {
    "prev": "https://api.mews-demo.com/pos/v1/tables?page%5Bbefore%5D=NA&page%5Bsize%5D=1",
    "next": "https://api.mews-demo.com/pos/v1/tables?page%5Bafter%5D=NA&page%5Bsize%5D=1"
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | array of object [table](tables.md#table) | required, max 1000 items | The document's "primary data". |
| `links` | [table_pagination_links](tables.md#table_pagination_links) | required | A [links object](https://jsonapi.org/profiles/ethanresnick/cursor-pagination/#auto-id-links) describing cursor pagination links. |

#### table

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [table_attributes](tables.md#table_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `relationships` | [table_relationships](tables.md#table_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |

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

#### table_pagination_links

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `prev` | string,null | optional, max length 1024 characters | The link to the previous page of results. |
| `next` | string,null | optional, max length 1024 characters | The link to the next page of results. |
