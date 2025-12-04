
# Idempotency

__Mews POS API__ supports idempotent requests for specific endpoints to prevent duplicate operations when network issues occur. Idempotency ensures that an API request produces the same result regardless of how many times it is sent, which is particularly important for payment processing and other state-changing operations.

## How to Use Idempotency Keys

To make an idempotent request, include an `Idempotency-Key` header with a unique value in your request:

```
Idempotency-Key: 4809a25c-b188-4abb-a698-f2d02d35dd9a
```

The idempotency key must meet these requirements:
- Must be a string between 8 and 64 characters long
- Must contain only hexadecimal characters (0-9, a-f, A-F) and hyphens

### Idempotency Behavior

1. **First Request**: When you send a request with an idempotency key for the first time, the API processes it normally.

2. **Subsequent Identical Requests**: If you send the same request with the same idempotency key again, the API returns the exact same response as the first successful request, without performing the operation again.

3. **Different Requests with Same Key**: If you send a different request with an idempotency key that was already used, the API returns a `409 Conflict` error.

4. **Failed Requests**: If the first request fails (4xx or 5xx error), you can safely retry with the same idempotency key. The idempotency key is removed for failed requests.

### Idempotency Key Lifetime

Idempotency keys are stored for a configurable period, typically up to 24 hours after a successful request. After this period, the same key can be reused and will be treated as a new request.


## Example Request and Response

### Initial Request

```http
POST /v1/payments HTTP/1.1
Content-Type: application/vnd.api+json
Idempotency-Key: 4809a25c-b188-4abb-a698-f2d02d35dd9a
Authorization: Bearer {api_key}

{
  "data": {
    "type": "payments",
    "attributes": {
      "amount": "10.50"
    },
    "relationships": {
      "order": {
        "data": { "type": "orders", "id": "8d645f44-ce7a-4c52-a5c3-95f56fd7a8ab" }
      },
      "paymentMethod": {
        "data": { "type": "paymentMethods", "id": "e5c5d8bf-3b36-4c7f-a5a0-94148a754d57" }
      },
      "register": {
        "data": { "type": "registers", "id": "b2c22131-9d63-4a91-be94-09d980b3e77f" }
      }
    }
  }
}
```

### Response (First Request)

```http
HTTP/1.1 201 Created
Content-Type: application/vnd.api+json

{
  "data": {
    "id": "f7a56ce8-43cf-4f64-8e61-265af34c9a0b",
    "type": "payments",
    "attributes": {
      "amount": "10.50",
      "createdAt": "2025-10-16T13:45:22.456Z",
      "status": "processed"
    },
    "relationships": {
      "order": {
        "data": { "type": "orders", "id": "8d645f44-ce7a-4c52-a5c3-95f56fd7a8ab" }
      },
      "paymentMethod": {
        "data": { "type": "paymentMethods", "id": "e5c5d8bf-3b36-4c7f-a5a0-94148a754d57" }
      },
      "register": {
        "data": { "type": "registers", "id": "b2c22131-9d63-4a91-be94-09d980b3e77f" }
      }
    }
  }
}
```

### Duplicate Request (Same Idempotency Key and Request Body)

If you send the exact same request again with the same idempotency key:

```http
POST /v1/payments HTTP/1.1
Content-Type: application/vnd.api+json
Idempotency-Key: 4809a25c-b188-4abb-a698-f2d02d35dd9a
Authorization: Bearer {api_key}

{
  "data": {
    "type": "payments",
    "attributes": {
      "amount": "10.50"
    },
    "relationships": {
      "order": {
        "data": { "type": "orders", "id": "8d645f44-ce7a-4c52-a5c3-95f56fd7a8ab" }
      },
      "paymentMethod": {
        "data": { "type": "paymentMethods", "id": "e5c5d8bf-3b36-4c7f-a5a0-94148a754d57" }
      },
      "register": {
        "data": { "type": "registers", "id": "b2c22131-9d63-4a91-be94-09d980b3e77f" }
      }
    }
  }
}
```

The response will be identical to the first request, and no new payment will be created.

### Conflicting Request (Same Idempotency Key but Different Request Body)

```http
POST /v1/payments HTTP/1.1
Content-Type: application/vnd.api+json
Idempotency-Key: 4809a25c-b188-4abb-a698-f2d02d35dd9a
Authorization: Bearer {api_key}

{
  "data": {
    "type": "payments",
    "attributes": {
      "amount": "20.00"
    },
    "relationships": {
      "order": {
        "data": { "type": "orders", "id": "8d645f44-ce7a-4c52-a5c3-95f56fd7a8ab" }
      },
      "paymentMethod": {
        "data": { "type": "paymentMethods", "id": "e5c5d8bf-3b36-4c7f-a5a0-94148a754d57" }
      },
      "register": {
        "data": { "type": "registers", "id": "b2c22131-9d63-4a91-be94-09d980b3e77f" }
      }
    }
  }
}
```

### Conflict Response

```http
HTTP/1.1 409 Conflict
Content-Type: application/vnd.api+json

{
  "errors": [
    {
      "status": "409",
      "title": "Idempotency Conflict"
    }
  ]
}
```

## Best Practices

1. **Generate Unique Keys**: Use a UUID v4 for each unique request. Never reuse idempotency keys for different operations.

2. **Client-Side Retries**: Implement automatic retries with exponential backoff on network failures or 5xx errors, using the same idempotency key.

3. **Key Management**: Store idempotency keys alongside request details to track which operations have been attempted.

4. **Handling Non-Idempotent Actions**: Some actions cannot be made idempotent by design. In these cases, use other application-level checks to prevent duplicates.

5. **Key Preservation**: Keep idempotency keys for a reasonable amount of time on the client side (at least 24 hours) to handle long outages.
