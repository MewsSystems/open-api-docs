<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# System

## Get the health check

Returns the current health check status of the server, including checks for database.

### Request

`GET` `[PlatformAddress]/v1/health-check`

### Response

```javascript
{
  "data": {
    "type": "healthChecks",
    "id": "current",
    "attributes": {
      "status": "ok",
      "timestamp": "2025-10-02T14:45:00Z"
    },
    "relationships": {
      "checks": {
        "data": [
          {
            "type": "checks",
            "id": "database"
          }
        ]
      }
    }
  },
  "included": [
    {
      "type": "checks",
      "id": "database",
      "attributes": {
        "status": "ok"
      }
    }
  ]
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [health_check](system.md#health_check) | required | The document's "primary data". |
| `included` | array of object [health_check_item](system.md#health_check_item) | optional, max 1000 items | Details of the objects to which the health check is related. |

#### health_check

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required |  |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [health_check_attributes](system.md#health_check_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing information about the health check. |
| `relationships` | [health_check_relationships](system.md#health_check_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |

#### health_check_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `status` | string | required, max length 255 characters | Overall health check status of the server. |
| `timestamp` | string | required, max length 25 characters | The timestamp when the health check was performed. |

#### health_check_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `checks` | object | required | A relationship to the detailed list of checks performed. |

#### health_check_item

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 255 characters |  |
| `type` | string | required | Category of the check. |
| `attributes` | object | required |  |
