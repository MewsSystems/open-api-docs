<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Webhook endpoints

## Get webhook endpoints

This operation returns a list of webhook endpoints with pagination.

**Note**: This operation needs [Authentication](../guidelines/authentication.md).

### Request

`GET` `[PlatformAddress]/v1/webhook-endpoints`

### Response

```javascript
{
  "data": [
    {
      "id": "83f93e1c-b6e1-4040-90cf-3274b6f3c82d",
      "type": "webhookEndpoints",
      "attributes": {
        "targetUrl": "https://example.com/webhooks/receive",
        "secret": "secret",
        "events": [
          "booking.status.updated",
          "product.availability.updated"
        ],
        "createdAt": "2024-10-24T08:44:45.409Z",
        "updatedAt": "2024-10-24T08:44:45.409Z"
      }
    },
    {
      "id": "7f5d9c2a-1b34-4d7e-b2a3-9c51b4f4fabc",
      "type": "webhookEndpoints",
      "attributes": {
        "targetUrl": "https://another.example.com/webhooks",
        "secret": "secret",
        "events": [
          "order.status.updated"
        ],
        "createdAt": "2024-10-23T10:30:00.000Z",
        "updatedAt": "2024-10-23T10:30:00.000Z"
      }
    }
  ],
  "links": {
    "prev": "https://api.mews-demo.com/pos/v1/webhook-endpoints?page%5Bbefore%5D=NA&page%5Bsize%5D=10",
    "next": "https://api.mews-demo.com/pos/v1/webhook-endpoints?page%5Bafter%5D=NA&page%5Bsize%5D=10"
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | array of object [webhook_endpoint](webhookendpoints.md#webhook_endpoint) | required, max 1000 items | The document's "primary data". |
| `links` | [links](webhookendpoints.md#links) | required | A [links object](https://jsonapi.org/profiles/ethanresnick/cursor-pagination/#auto-id-links) describing cursor pagination links. |

#### webhook_endpoint

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | The UUID of the webhook endpoint |
| `type` | string | required | The resource type |
| `attributes` | [webhook_endpoint_attributes](webhookendpoints.md#webhook_endpoint_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

#### webhook_endpoint_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `targetUrl` | string | required, max length 100 characters | The Webhook URL configured to receive event notifications from Mews. |
| `secret` | string | required, max length 100 characters | A string generated to ensure the authenticity of the webhook. It is used to verify that the webhook request comes from a trusted source. |
| `events` | array of object string | required, max 1000 items | The list of events that the webhook endpoint is subscribed to. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |

#### links

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `prev` | string,null | optional, max length 1024 characters | The link to the previous page of results. |
| `next` | string,null | optional, max length 1024 characters | The link to the next page of results. |

## Create Webhook endpoint

Use this operation to register a Webhook with Mews to receive notification events that you subscribed to.
For more information, including details about supported events, see [API Events](../events/README.md).

**Note:** This operation needs [Authentication](../guidelines/authentication.md).

### Request

`POST` `[PlatformAddress]/v1/webhook-endpoints`

```javascript
{
  "data": {
    "type": "webhookEndpoints",
    "attributes": {
      "targetUrl": "https://example.com/webhooks/receive"
    }
  }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [webhook_endpoint_create](webhookendpoints.md#webhook_endpoint_create) | required | The document's "primary data". |

#### webhook_endpoint_create

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [webhook_endpoint_attributes](webhookendpoints.md#webhook_endpoint_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

### Response

```javascript
{
  "data": {
    "id": "83f93e1c-b6e1-4040-90cf-3274b6f3c82d",
    "type": "webhookEndpoints",
    "attributes": {
      "targetUrl": "https://example.com/webhooks/receive",
      "secret": "secret",
      "createdAt": "2024-10-24T08:44:45.409Z",
      "updatedAt": "2024-10-24T08:44:45.409Z"
    }
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `targetUrl` | string | required, max length 100 characters | The Webhook URL configured to receive event notifications from Mews. |
| `secret` | string | required, max length 100 characters | A string generated to ensure the authenticity of the webhook. It is used to verify that the webhook request comes from a trusted source. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |

## Update webhook endpoint

This operation updates a webhook endpoint. It allows to subscribe or unsubscribe from events.

**Note:** This operation needs [Authentication](../essential-guide/authentication.md).

### Request

`PATCH` `[PlatformAddress]/v1/webhook-endpoints/{id}`

```javascript
{
  "data": {
    "type": "webhookEndpoints",
    "id": "83f93e1c-b6e1-4040-90cf-3274b6f3c82d",
    "attributes": {
      "events": [
        "booking.status.updated"
      ],
      "targetUrl": "https://example.com/webhooks/receive"
    }
  }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [webhook_endpoint_update](webhookendpoints.md#webhook_endpoint_update) | required | The document's "primary data". |

#### webhook_endpoint_update

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [webhook_endpoint_update_attributes](webhookendpoints.md#webhook_endpoint_update_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

#### webhook_endpoint_update_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `targetUrl` | string | required, max length 100 characters | The Webhook URL configured to receive event notifications from Mews. |
| `events` | array of object string | required, max 1000 items | The list of events that will trigger the webhook. |

### Response

```javascript
{
  "data": {
    "id": "83f93e1c-b6e1-4040-90cf-3274b6f3c82d",
    "type": "webhookEndpoints",
    "attributes": {
      "events": [
        "booking.status.updated"
      ],
      "targetUrl": "https://example.com/webhooks/receive",
      "createdAt": "2024-10-24T08:44:45.409Z",
      "updatedAt": "2024-10-24T08:44:45.409Z"
    }
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `targetUrl` | string | required, max length 100 characters | The Webhook URL configured to receive event notifications from Mews. |
| `secret` | string | required, max length 100 characters | A string generated to ensure the authenticity of the webhook. It is used to verify that the webhook request comes from a trusted source. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |
