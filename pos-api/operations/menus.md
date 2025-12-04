<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Menus

## Get menus

This operation returns a list of menus.

### Request

`GET` `[PlatformAddress]/v1/menus`

### Response

```javascript
{
  "data": [
    {
      "id": "31b14937-2524-491f-b0a0-dc0a7393ff33",
      "type": "menus",
      "attributes": {
        "name": "Menu 1",
        "status": "active",
        "description": "Updated description",
        "createdAt": "2025-01-23T13:01:03.409Z",
        "updatedAt": "2025-01-23T13:01:03.409Z"
      },
      "relationships": {
        "menuSections": {
          "data": [
            {
              "id": "c53372e2-9aa1-452a-8965-2ea3fa514fb2",
              "type": "menuSections"
            }
          ]
        }
      },
      "links": {
        "self": "https://api.mews-demo.com/pos/v1/menus/c2380b6a-900b-4ac0-8c29-7382224a4907"
      }
    }
  ],
  "links": {
    "prev": "https://api.mews-demo.com/pos/v1/menus?page%5Bbefore%5D=NA&page%5Bsize%5D=1",
    "next": "https://api.mews-demo.com/pos/v1/menus?page%5Bafter%5D=NA&page%5Bsize%5D=1"
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [outlet_attributes](menus.md#outlet_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

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

#### tax

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [tax_attributes](menus.md#tax_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

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

## Get Menu Details

Retrieves details of a specific menu including its menu sections and associated outlets.

### Request

`GET` `[PlatformAddress]/v1/menus/{id}`

### Response

```javascript
{}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [outlet_attributes](menus.md#outlet_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
