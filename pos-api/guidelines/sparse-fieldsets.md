# Sparse fieldsets

__Mews POS API__ allows the clients to fetch only a subset of fields from a resource or collection using the JSON:API sparse fieldsets feature. Sparse fieldsets can be specified using `?fields[TYPE]=exampleFieldA,exampleFieldB` as a query parameter, where `TYPE` is the singular resource type e.g. `invoices`, from which only `exampleFieldA` and `exampleFieldB` should be fetched. The value of any `fields` parameter must be a comma-separated (U+002C COMMA, ",") list that refers to the name(s) of the fields to be returned. An empty value indicates that no fields should be returned.
Please note that support for fieldsets is endpoint-specific. Visit the documentation of an endpoint to get more details about the fields that can be used in the `fields[TYPE]` query parameter.

> **Unsafe characters**: We recommend you always URI-encode the values of the `fields` query parameter, because fields can contain unsafe URL characters, such as square brackets.

### Example request and response

In the example request, we will query the `/invoices` endpoint with only a subset of fields:

`GET` `[PlatformAddress]/v1/invoices?fields[invoices]=total,subtotal,tax,createdAt,updatedAt`

#### Response

```javascript

{
    "data": [
        {
            "id": "babcf91e-5930-4b90-b929-0fb2b076bd3b",
            "type": "invoices",
            "attributes": {
                "total": "10.00",
                "subtotal": "10.00",
                "tax": "0.00",
                "createdAt": "2024-07-26T07:35:07.817Z",
                "updatedAt": "2024-07-26T07:35:07.836Z",
            },
            "relationships": {}
        }
    ],
    "links": {
        "prev": "[PlatformAddress]/v1/invoices?page[before]=OTMzMw&page[size]=1",
        "next": "[PlatformAddress]/v1/invoices?page[after]=OTMzMw&page[size]=1"
    }
}
```