<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# ProductBundles

## Get product bundles

This operation returns a list of product bundles. Product bundles are groups of products that can have a fixed price and are always sold together as combo meals.

**Note:** This operation needs [Authentication](../guidelines/authentication.md) and supports the following JSON:API features:

- [Relationships](../guidelines/relationships.md) - `productBundleItems` using `include` query parameter.
- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `productBundle` and related resources with `fields` query parameter.

### Request

`GET` `[PlatformAddress]/v1/product-bundles`

### Response

```javascript
{
  "data": [
    {
      "id": "286ef74f-e37f-477f-bcda-77f8fbfd13ea",
      "type": "productBundles",
      "attributes": {
        "name": "Combo Meal",
        "description": "A burger, fries, and drink",
        "imageUrl": "https://api.mews-demo.com/pos/images/example.png",
        "priceRange": {
          "min": "10.00",
          "max": "15.00"
        },
        "retailPriceInclTax": "15.00",
        "createdAt": "2022-10-16T11:29:00Z",
        "updatedAt": "2022-10-19T11:29:00Z"
      },
      "relationships": {
        "productBundleItems": {
          "data": [
            {
              "id": "c53372e2-9aa1-452a-8965-2ea3fa514fb2",
              "type": "productBundleItems"
            },
            {
              "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
              "type": "productBundleItems"
            }
          ]
        }
      }
    }
  ],
  "included": [
    {
      "id": "c53372e2-9aa1-452a-8965-2ea3fa514fb2",
      "type": "productBundleItems",
      "attributes": {
        "retailPriceInclTax": "5.00",
        "groupName": "Lunch",
        "createdAt": "2022-10-16T11:29:00Z",
        "updatedAt": "2022-10-19T11:29:00Z"
      },
      "relationships": {
        "product": {
          "data": {
            "id": "06382148-c76a-489d-b382-72fb7d7ab37b",
            "type": "products"
          }
        },
        "productVariant": {
          "data": {
            "id": "e727124a-d2bb-4002-98bd-81af6d788666",
            "type": "productVariants"
          }
        }
      }
    },
    {
      "id": "5efa8b3c-b930-4b31-918d-95ab0e212e64",
      "type": "productBundleItems",
      "attributes": {
        "retailPriceInclTax": "10.00",
        "groupName": "Lunch",
        "createdAt": "2022-10-16T11:29:00Z",
        "updatedAt": "2022-10-19T11:29:00Z"
      },
      "relationships": {
        "product": {
          "data": {
            "id": "0907e6d2-62c1-44cd-a886-f403ce9c7145",
            "type": "products"
          }
        },
        "productVariant": {
          "data": null
        }
      }
    }
  ],
  "links": {
    "prev": "https://api.mews-demo.com/pos/v1/product-bundles?page%5Bbefore%5D=NA&page%5Bsize%5D=1",
    "next": "https://api.mews-demo.com/pos/v1/product-bundles?page%5Bafter%5D=NA&page%5Bsize%5D=1"
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | array of object [product_bundle](productbundles.md#product_bundle) | required, max 1000 items | The document's "primary data". |
| `included` | array of object [product_bundle_item](productbundles.md#product_bundle_item) | optional, max 1000 items | Details of the product bundle items related to the product bundle. |
| `links` | [links](productbundles.md#links) | required | A [links object](https://jsonapi.org/profiles/ethanresnick/cursor-pagination/#auto-id-links) describing cursor pagination links. |

#### product_bundle

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [product_bundle_attributes](productbundles.md#product_bundle_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `relationships` | [product_bundle_relationships](productbundles.md#product_bundle_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |

#### product_bundle_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `name` | string | required, max length 255 characters | Name of the product bundle. |
| `description` | string,null | optional, max length 10000 characters | Description of the product bundle. |
| `imageUrl` | string,null | optional, max length 1024 characters | URL of the product bundle image. |
| `priceRange` | object,null | optional | Price range of the bundle when not using fixed pricing. Contains minimum and maximum prices. |
| `retailPriceInclTax` | string,null | optional, max length 255 characters | Retail price including tax of the bundle when using fixed pricing. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |

#### product_bundle_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `productBundleItems` | object | required | Details of the product bundle items associated with the bundle. |

#### product_bundle_item

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [product_bundle_item_attributes](productbundles.md#product_bundle_item_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `relationships` | [product_bundle_item_relationships](productbundles.md#product_bundle_item_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |

#### product_bundle_item_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `retailPriceInclTax` | string | required, max length 255 characters | Price of the item within the bundle. |
| `groupName` | string | required, max length 255 characters | Name of the group this item belongs to within the bundle. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |

#### product_bundle_item_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `product` | object | required | Details of the product associated with this bundle item. |
| `productVariant` | object | required | Details of the product variant associated with this bundle item (nullable). |

#### links

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `prev` | string,null | optional, max length 1024 characters | The link to the previous page of results. |
| `next` | string,null | optional, max length 1024 characters | The link to the next page of results. |
