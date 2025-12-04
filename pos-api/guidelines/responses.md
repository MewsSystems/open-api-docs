# Responses

The **Mews POS API** follows the [JSON:API specification](https://jsonapi.org/) for formatting HTTP responses. `Content-Type` is set to the JSON:API media type `application/vnd.api+json`.

A typical JSON response looks like this:

```json
{
  "data": {
    "type": "invoices",
    "id": "12345",
    "attributes": {
      "customer_uuid": "customer-uuid",
      "order_uuid": "order-uuid",
      "register_uuid": "register-uuid",
      "total_amount": "100.00",
      "created_at": "2024-07-19T12:34:56Z",
      "updated_at": "2024-07-19T12:34:56Z"
    },
    "relationships": {
      "customer": {
        "links": {
          "self": "/api/v1/invoices/12345/relationships/customer",
          "related": "/api/v1/customers/customer-uuid"
        },
        "data": {
          "type": "customers",
          "id": "customer-uuid"
        }
      },
      "order": {
        "links": {
          "self": "/api/v1/invoices/12345/relationships/order",
          "related": "/api/v1/orders/order-uuid"
        },
        "data": {
          "type": "orders",
          "id": "order-uuid"
        }
      },
      "payments": {
        "links": {
          "self": "/api/v1/invoices/12345/relationships/payments",
          "related": "/api/v1/invoices/12345/payments"
        },
        "data": [
          {
            "type": "payments",
            "id": "payment-uuid-1"
          },
          {
            "type": "payments",
            "id": "payment-uuid-2"
          }
        ]
      }
    },
    "links": {
      "self": "/api/v1/invoices/12345"
    }
  },
  "headers": {
    "Content-Type": "application/vnd.api+json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Expires": "0",
    "X-RateLimit-Limit": "1000",
    "X-Response-Time": "123ms"
  }
}
```
## Response codes

| Code | Meaning |
| :-- | :-- |
| `200` | **OK**<br>Indicates that the request has succeeded. |
| `201` | **Created**<br>Indicates that the request has succeeded and a new resource has been created as a result. |
| `202` | **Accepted**<br>Indicates that the request has received but not completed yet. |
| `204` | **No Content**<br>The server has fulfilled the request but does not need to return a response body. |
| `400` | **Bad Request**<br>The request could not be understood by the server due to incorrect syntax. The client should not repeat the request without modifications. |
| `401` | **Unauthorized**<br>Indicates that the request requires user authentication information. |
| `403` | **Forbidden**<br>Unauthorized request. The client does not have access rights to the content. Unlike 401, the client’s identity is known to the server. |
| `404` | **Not Found**<br>The server cannot find the requested resource. |
| `408` | **Request Timeout**<br>Indicates that the server did not receive a complete request from the client within the server’s allotted timeout period. |
| `409` | **Conflict**<br>The request could not be completed due to a conflict with the current state of the resource. |
| `422` | **Unprocessable Entity**<br>The server understands the content type and syntax of the request entity, but still the server is unable to process the request for some reason. |
| `429` | **Too Many Requests**<br>The user has sent too many requests in a given amount of time (“rate limiting”). |
| `500` | **Internal Server Error**<br>The server encountered an unexpected condition that prevented it from fulfilling the request. |
