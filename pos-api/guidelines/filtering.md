# Filtering

__Mews POS API__ supports filtering using the JSON:API `filter` query parameter. The `filter` query parameter can be used to filter resources by attributes.
Please note that support for filters is endpoint-specific. Visit the documentation of an endpoint to get more details about the supported filters.

> **Unsafe characters**: We recommend you always URI-encode the values of filter query parameters, because filters can contain unsafe URL characters.

### Supported filters

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `createdAtGt` | string | optional | Date-time or date the resource was created, in RFC 3339 format. Gt means greater than. <br> Raw example: <br> `filter[createdAtGt]=2024-07-25T16:29:35+00:00` <br> Encoded example: <br> `filter%5BcreatedAtGt%5D%3D2024-07-25T16%3A29%3A35%2B00%3A00` |
| `createdAtGteq` | string | optional | Date-time or date the resource was created, in RFC 3339 format. Gteq means greater than or equal to. <br> Raw example: <br> `filter[createdAtGteq]=2024-07-25T16:29:35+00:00` <br> Encoded example: <br> `filter%5BcreatedAtGteq%5D%3D2024-07-25T16%3A29%3A35%2B00%3A00` |
| `createdAtLt` | string | optional | Date-time or date the resource was created, in RFC 3339 format. Lt means less than. <br> Raw example: <br> `filter[createdAtLt]=2024-07-25T16:29:35+00:00` <br> Encoded example: <br> `filter%5BcreatedAtLt%5D%3D2024-07-25T16%3A29%3A35%2B00%3A00` |
| `createdAtLteq` | string | optional | Date-time or date the resource was created, in RFC 3339 format. Lteq means less than or equal to. <br> Raw example: <br> `filter[createdAtLteq]=2024-07-25T16:29:35+00:00` <br> Encoded example: <br> `filter%5BcreatedAtLteq%5D%3D2024-07-25T16%3A29%3A35%2B00%3A00` |
| `updatedAtGt` | string | optional | Date-time or date the resource was updated, in RFC 3339 format. Gt means greater than. <br> Raw example: <br> `filter[updatedAtGt]=2024-07-25T16:29:35+00:00` <br> Encoded example: <br> `filter%5BupdatedAtGt%5D%3D2024-07-25T16%3A29%3A35%2B00%3A00` |
| `updatedAtGteq` | string | optional | Date-time or date the resource was updated, in RFC 3339 format. Gteq means greater than or equal to. <br> Raw example: <br> `filter[updatedAtGteq]=2024-07-25T16:29:35+00:00` <br> Encoded example: <br> `filter%5BupdatedAtGteq%5D%3D2024-07-25T16%3A29%3A35%2B00%3A00` |
| `updatedAtLt` | string | optional | Date-time or date the resource was updated, in RFC 3339 format. Lt means less than. <br> Raw example: <br> `filter[updatedAtLt]=2024-07-25T16:29:35+00:00` <br> Encoded example: <br> `filter%5BupdatedAtLt%5D%3D2024-07-25T16%3A29%3A35%2B00%3A00` |
| `updatedAtLteq` | string | optional | Date-time or date the resource was updated, in RFC 3339 format. Lteq means less than or equal to. <br> Raw example: <br> `filter[updatedAtLteq]=2024-07-25T16:29:35+00:00` <br> Encoded example: <br> `filter%5BupdatedAtLteq%5D%3D2024-07-25T16%3A29%3A35%2B00%3A00` |
| `registerIdEq` | string | optional | Register id, in Universally unique ID UUID4 format. <br> Raw example: <br> `filter[registerIdEq]=f35693cb-cc0c-4c6f-bf16-eb0547444642` <br> Encoded example: <br> `filter%5BregisterIdEq%5D%3Df35693cb-cc0c-4c6f-bf16-eb0547444642` |

* We plan to add support for more filters in future.


### Example request and response

In the example request, we will query the `/invoices` endpoint with filter:

`GET` `[PlatformAddress]/v1/invoices?filter[createdAtGt]=2024-07-25T16%3A29%3A35%2B00%3A00`

It is also possible to combine two filters:

`GET` `[PlatformAddress]/v1/invoices?filter[createdAtGt]=2024-07-25T16%3A29%3A35%2B00%3A00&filter[registerIdEq]=f35693cb-cc0c-4c6f-bf16-eb0547444642`

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
                "createdAt": "2024-07-26T07:35:07.817Z",
                "updatedAt": "2024-07-26T07:35:07.836Z",
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
    "links": {
        "prev": "[PlatformAddress]/v1/invoices?page[before]=OTMzMw&page[size]=1",
        "next": "[PlatformAddress]/v1/invoices?page[after]=OTMzMw&page[size]=1"
    }
}
```