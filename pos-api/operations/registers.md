<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Registers

## Get registers

This operation returns a list of registers.

**Note:** This operation needs [Authentication](../guidelines/authentication.md) and supports the following JSON:API features:

- [Relationships](../guidelines/relationships.md) - `outlet` using `include` query parameter.
- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `registers` and related resources with `fields` query parameter.

### Request

`GET` `[PlatformAddress]/v1/registers`

### Response

```javascript
{
  "data": [
    {
      "id": "5a43b8fa-8029-4093-895b-bddd8c74ebe1",
      "type": "registers",
      "attributes": {
        "name": "Register 1",
        "invoicesCount": 5,
        "index": 1,
        "virtual": true,
        "createdAt": "2023-10-16T14:30:00Z",
        "updatedAt": "2023-10-16T14:30:00Z"
      },
      "relationships": {
        "outlet": {
          "data": {
            "id": "2bf58012-e340-478e-a123-dbe372ac86fb",
            "type": "outlets"
          }
        }
      },
      "links": {
        "self": "https://api.mews-demo.com/pos/v1/registers/5a43b8fa-8029-4093-895b-bddd8c74ebe1"
      }
    }
  ],
  "links": {
    "prev": "https://api.mews-demo.com/pos/v1/registers?page%5Bbefore%5D=NA&page%5Bsize%5D=1",
    "next": "https://api.mews-demo.com/pos/v1/registers?page%5Bafter%5D=NA&page%5Bsize%5D=1"
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | array of object [register](registers.md#register) | required, max 1000 items | The document's "primary data". |
| `included` | array of object [outlet](registers.md#outlet) | optional, max 1000 items | Details of the objects to which the registers are related. |
| `links` | [links](registers.md#links) | required | A [links object](https://jsonapi.org/profiles/ethanresnick/cursor-pagination/#auto-id-links) describing cursor pagination links. |

#### register

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [register_attributes](registers.md#register_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `links` | object | required | A [links object](https://jsonapi.org/format/#document-resource-object-links) containing links related to the resource. |
| `relationships` | [register_relationships](registers.md#register_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |

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

#### outlet

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [outlet_attributes](registers.md#outlet_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

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

## Get register

A register represents a terminal or cash register within an outlet, used to issue invoices. Each register is uniquely identified within its outlet and can either be physical or virtual.

**Note:** This operation needs [Authentication](../guidelines/authentication.md) and supports the following JSON:API features:

- [Relationships](../guidelines/relationships.md) - `outlet` using `include` query parameter.
- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `register` and related resources with `fields` query parameter.

### Request

`GET` `[PlatformAddress]/v1/registers/{id}`

### Response

```javascript
{
  "data": {
    "id": "31b14937-2524-491f-b0a0-dc0a7393ff3f",
    "type": "registers",
    "attributes": {
      "name": "Main Register",
      "invoicesCount": 1200,
      "index": 3,
      "virtual": false,
      "createdAt": "2023-10-16T14:30:00Z",
      "updatedAt": "2023-10-19T14:30:00Z"
    },
    "relationships": {
      "outlet": {
        "data": {
          "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
          "type": "outlets"
        }
      }
    },
    "links": {
      "self": "https://api.mews-demo.com/pos/v1/registers/31b14937-2524-491f-b0a0-dc0a7393ff3f"
    }
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [register](registers.md#register) | required | The document's "primary data". |
| `included` | array of object [outlet](registers.md#outlet) | optional, max 1 item | Details of the outlet to which the register is associated. |
