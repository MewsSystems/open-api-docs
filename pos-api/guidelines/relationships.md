# Relationships

__Mews POS API__ supports fetching resource relationships using syntax offered by the JSON:API specification. The resource response contains a [relationships](https://jsonapi.org/format/#document-resource-object-relationships) key. The value of the relationships key is called a relationships object. Each member of a relationships object represents some form of individual connection or relationship from the resource object in which it has been defined to another specified resource object.
Relationships may be to-one or to-many.

A relationship’s name is given by its individual relationship key. The value of this key is a relationship object containing a `data` key, which is the related [resource identifier object](https://jsonapi.org/format/#document-resource-identifier-objects). The `data` object contains the following members:

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |

__Mews POS API__, as per the JSON:API specification, supports inclusion of related resources (see [Relationships](#relationships) above) through the `include` query parameter.

## The include query parameter

The API client can request the inclusion of related resources in the response, using the `include` query parameter with comma separated values `?include=relatedResourceA,relatedResourceB`. For example, a request to the [Invoices](../operations/invoices.md) endpoint with `?include=register,invoiceItems` will generate a response that includes the related register and invoice items data for each invoice.


### Example request and response

In the example request, we will query the `/invoices` endpoint with include parameters:

`GET` `[PlatformAddress]/v1/invoices?include=invoiceItems,user,register`

#### Response

```javascript

{
    "data": [
        {
            "id": "babcf91e-5930-4b90-b929-0fb2b076bd3b",
            "type": "invoices",
            "attributes": {
                "cancelled": false,
                "cancelReason": null,
                "description": null,
                "createdAt": "2018-07-26T07:35:07.817Z",
                "updatedAt": "2018-07-26T07:35:07.836Z",
                "discount": null,
                "tax": "0.00",
                "total": "10.00",
                "subtotal": "10.00",
                "discountAmount": null,
                "itemDiscountAmount": null,
                "tipAmount": null
            },
            "relationships": {
                "user": {
                    "data": {
                        "id": "918a47d1-6553-42ee-8de4-3b5af5edc8e7",
                        "type": "users"
                    }
                },
                "register": {
                    "data": {
                        "id": "f35693cb-cc0c-4c6f-bf16-eb0547444642",
                        "type": "registers"
                    }
                },
                "invoiceItems": {
                    "data": [
                        {
                            "id": "7d87444b-807a-4ea4-8b69-b0e91f5fa174",
                            "type": "invoiceItems"
                        }
                    ]
                }
            }
        }
    ],
    "included": [
        {
            "id": "7d87444b-807a-4ea4-8b69-b0e91f5fa174",
            "type": "invoiceItems",
            "attributes": {
                "productName": "liebe",
                "quantity": "2.0",
                "unitPriceInclTax": "5.00",
                "subtotal": "10.00",
                "tax": "0.00",
                "total": "10.00",
                "discount": null
            },
            "relationships": {
                "product": {
                    "data": {
                        "id": "139a7f7a-591f-4797-ba23-08c9bee0d044",
                        "type": "products"
                    }
                },
                "productVariant": {
                    "data": null
                },
                "invoiceItemModifiers": {
                    "data": []
                }
            }
        },
        {
            "id": "918a47d1-6553-42ee-8de4-3b5af5edc8e7",
            "type": "users",
            "attributes": {
                "name": "John Smith"
            }
        },
        {
            "id": "f35693cb-cc0c-4c6f-bf16-eb0547444642",
            "type": "registers",
            "attributes": {
                "name": "Register #1",
                "invoicesCount": 1325,
                "index": 1,
                "virtual": false,
                "createdAt": "2018-07-12T13:18:04.306Z",
                "updatedAt": "2020-02-04T14:51:20.730Z"
            },
            "relationships": {
                "outlet": {
                    "data": {
                        "id": "65e8856a-8bab-46d2-85e2-2cde89f40f95",
                        "type": "outlets"
                    }
                }
            },
            "links": {
                "self": "[PlatformAddress]/v1/registers/f35693cb-cc0c-4c6f-bf16-eb0547444642"
            }
        }
    ],
    "links": {
        "prev": "[PlatformAddress]/v1/invoices?page[before]=OTMzMw&page[size]=1",
        "next": "[PlatformAddress]/v1/invoices?page[after]=OTMzMw&page[size]=1"
    }
}
```