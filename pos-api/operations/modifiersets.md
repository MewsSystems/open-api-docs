<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# ModifierSets

## Get modifier sets

This operation returns a list of modifier sets.

**Note:** This operation needs [Authentication](../guidelines/authentication.md) and supports the following JSON:API features:

- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `modifier_set` with `fields` query parameter.

### Request

`GET` `[PlatformAddress]/v1/modifier-sets`

### Response

```javascript
{
  "data": [
    {
      "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
      "type": "modifierSets",
      "attributes": {
        "name": "Modifier Set 1",
        "selection": "single",
        "minimumCount": 1,
        "maximumCount": 1,
        "createdAt": "2024-11-13T11:29:00Z",
        "updatedAt": "2024-11-15T11:29:00Z"
      },
      "relationships": {
        "modifiers": {
          "data": [
            {
              "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
              "type": "modifiers"
            }
          ]
        }
      }
    }
  ],
  "links": {
    "prev": "https://api.mews-demo.com/pos/v1/modifier-sets?page%5Bbefore%5D=NA&page%5Bsize%5D=1",
    "next": "https://api.mews-demo.com/pos/v1/modifier-sets?page%5Bafter%5D=NA&page%5Bsize%5D=1"
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | array of object [modifier_set](modifiersets.md#modifier_set) | required, max 1000 items | The document's "primary data". |
| `links` | [links](modifiersets.md#links) | required | A [links object](https://jsonapi.org/profiles/ethanresnick/cursor-pagination/#auto-id-links) describing cursor pagination links. |

#### modifier_set

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [modifier_set_attributes](modifiersets.md#modifier_set_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `links` | object | required | A [links object](https://jsonapi.org/format/#document-resource-object-links) containing links related to the resource. |
| `relationships` | [modifier_set_relationships](modifiersets.md#modifier_set_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |

#### modifier_set_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `name` | string | required, max length 255 characters | Name of the modifier set. |
| `selection` | string | required | Modifier set selection type. Possible values are "single" and "multiple". |
| `maximumCount` | integer | required | Maximum number of modifiers that can be selected. |
| `minimumCount` | integer | required | Minimum number of modifiers that must be selected. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |

#### modifier_set_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `modifiers` | object | required | Details of the modifiers associated with the modifier set. |

#### links

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `prev` | string,null | optional, max length 1024 characters | The link to the previous page of results. |
| `next` | string,null | optional, max length 1024 characters | The link to the next page of results. |

## Get modifier set

This operation returns a modifier set. Modifier sets are used to group modifiers together.

**Note:** This operation needs [Authentication](../guidelines/authentication.md) and supports the following JSON:API features:

- [Relationships](../guidelines/relationships.md) - `modifiers` using `include` query parameter.
- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `modifier_set` with `fields` query parameter.

### Request

`GET` `[PlatformAddress]/v1/modifier-sets/{id}`

### Response

```javascript
{
  "data": {
    "id": "7d7fc62f-ebc1-427c-a496-ab46a011c851",
    "type": "modifierSets",
    "attributes": {
      "name": "Modifier Set 1",
      "selection": "single",
      "minimumCount": 1,
      "maximumCount": 1,
      "createdAt": "2024-11-13T11:29:00Z",
      "updatedAt": "2024-11-15T11:29:00Z",
      "relationships": {
        "modifiers": {
          "data": [
            {
              "id": "7dd12ca7-e2b1-4dd0-9b25-de3121e6c84f",
              "type": "modifiers"
            }
          ]
        }
      }
    },
    "links": {
      "self": "https://api.mews-demo.com/pos/v1/modifier-sets/7d7fc62f-ebc1-427c-a496-ab46a011c851"
    }
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [modifier_set](modifiersets.md#modifier_set) | required |  |
