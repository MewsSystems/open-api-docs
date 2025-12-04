<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Bookings

## Update booking

This operation updates a booking.

**Note:** This operation needs [Authentication](../essential-guide/authentication.md).

### Request

`PATCH` `[PlatformAddress]/v1/bookings/{id}`

```javascript
{
  "data": {
    "type": "bookings",
    "id": "83f93e1c-b6e1-4040-90cf-3274b6f3c82d",
    "attributes": {
      "status": "confirmed",
      "partySize": 6,
      "bookingDatetime": "2024-10-24T08:44:45.409Z"
    },
    "relationships": {
      "customer": {
        "data": {
          "type": "customers",
          "id": "5efa8b3c-b930-4b31-918d-95ab0e212e65"
        }
      },
      "tables": {
        "data": [
          {
            "type": "tables",
            "id": "5efa8b3c-b930-4b31-918d-95ab0e212e78"
          }
        ]
      }
    }
  }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [booking_update](bookings.md#booking_update) | required | The document's "primary data". |

#### booking_update

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [booking_update_attributes](bookings.md#booking_update_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `relationships` | object | required | An [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) representing associations with other resources. |

#### booking_update_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `isWalkIn` | boolean,null | optional | Indicates if the booking is a walk-in. |
| `status` | string,null | optional | The initial status of the booking. Possible values are "confirmed", "seated", "completed", "cancelled", and "no_show". |
| `partySize` | integer | required | Represents the number of people included in the booking. |
| `bookingDatetime` | string | required, max length 25 characters | The booking's date. |
| `duration` | integer,null | optional | Represents the length of the booking in minutes. |
| `notes` | string,null | optional, max length 10000 characters | Additional notes for the booking. |
| `roomNumber` | string,null | optional, max length 100 characters | The room number of the booking's customer. |
| `promotions` | string,null | optional, max length 100 characters | The promotions of the booking. |
| `bookingReference` | string,null | optional, max length 255 characters | A reference code or identifier associated with the booking. |
| `depositAmount` | string,null | optional, max length 255 characters | The amount of the deposit. |

### Response

```javascript
{
  "data": {
    "id": "83f93e1c-b6e1-4040-90cf-3274b6f3c82d",
    "type": "bookings",
    "attributes": {
      "status": "confirmed",
      "bookingDatetime": "2024-10-24T08:44:45.409Z",
      "duration": 90,
      "partySize": 6,
      "notes": "Vegetarian",
      "promotions": "Dinner - 4 courses INC",
      "roomNumber": "11",
      "bookingReference": "R43RdhQ",
      "isWalkIn": false,
      "createdAt": "2024-10-24T08:44:45.409Z",
      "updatedAt": "2024-10-24T08:44:45.409Z"
    },
    "relationships": {
      "orders": {
        "data": [
          {
            "id": "5efa8b3c-b930-4b31-918d-95ab0e212e65",
            "type": "orders"
          }
        ]
      },
      "customer": {
        "data": {
          "id": "5efa8b3c-b930-4b31-918d-95ab0e212e65",
          "type": "customers"
        }
      },
      "tables": {
        "data": [
          {
            "id": "5efa8b3c-b930-4b31-918d-95ab0e212e78",
            "type": "tables"
          }
        ]
      }
    }
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [booking](bookings.md#booking) | required | The document's "primary data". |

#### booking

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [booking_attributes](bookings.md#booking_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `relationships` | [booking_relationships](bookings.md#booking_relationships) | required | A [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) describing relationships between the resource and other JSON:API resources. |

#### booking_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `isWalkIn` | boolean | required | Indicates if the booking is a walk-in. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |
| `status` | string,null | optional | The initial status of the booking. Possible values are "confirmed", "seated", "completed", "cancelled", and "no_show". |
| `partySize` | integer | required | Represents the number of people included in the booking. |
| `bookingDatetime` | string | required, max length 25 characters | The booking's date. |
| `duration` | integer,null | optional | Represents the length of the booking in minutes. |
| `notes` | string,null | optional, max length 10000 characters | Additional notes for the booking. |
| `roomNumber` | string,null | optional, max length 100 characters | The room number of the booking's customer. |
| `promotions` | string,null | optional, max length 100 characters | The promotions of the booking. |
| `bookingReference` | string,null | optional, max length 255 characters | A reference code or identifier associated with the booking. |
| `depositAmount` | string,null | optional, max length 255 characters | The amount of the deposit. |

#### booking_relationships

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `tables` | object | required | Details of the tables associated with the booking. |
| `customer` | object | required | Details of the customer associated with the booking. |
| `orders` | object | required | Details of the orders associated with the booking. |

## Get bookings

This operation returns a list of bookings.

**Note**: This operation needs [Authentication](../guidelines/authentication.md) and supports the following JSON:API features:

- [Relationships](../guidelines/relationships.md) - `customer`, `orders`, `tables` using `include` query parameter.
- [Filters](../guidelines/filtering.md) - `createdAtGt`, `createdAtGteq`, `createdAtLt`, `createdAtLteq`, `updatedAtGt`, `updatedAtGteq`, `updatedAtLt`, `updatedAtLteq`, `bookingDatetimeGt`, `bookingDatetimeGteq`, `bookingDatetimeLt`, `bookingDatetimeLteq`
- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `booking` query parameter.

### Request

`GET` `[PlatformAddress]/v1/bookings`

### Response

```javascript
{
  "data": [
    {
      "id": "31b14937-2524-491f-b0a0-dc0a7393ff33",
      "type": "bookings",
      "attributes": {
        "status": "confirmed",
        "bookingDatetime": "2024-10-24T08:44:45.409Z",
        "duration": 60,
        "partySize": 2,
        "notes": "Vegetarian",
        "promotions": "Dinner - 4 courses INC",
        "roomNumber": "11",
        "bookingReference": "R43RdhQ",
        "isWalkIn": false,
        "createdAt": "2024-10-24T08:44:45.409Z",
        "updatedAt": "2024-10-24T08:44:45.409Z"
      },
      "relationships": {
        "orders": {
          "data": [
            {
              "id": "5efa8b3c-b930-4b31-918d-95ab0e212e65",
              "type": "orders"
            }
          ]
        },
        "customer": {
          "data": {
            "id": "5efa8b3c-b930-4b31-918d-95ab0e212e65",
            "type": "customers"
          }
        },
        "tables": {
          "data": [
            {
              "id": "5efa8b3c-b930-4b31-918d-95ab0e212e78",
              "type": "tables"
            }
          ]
        }
      }
    }
  ],
  "links": {
    "prev": "https://api.mews-demo.com/pos/v1/bookings?page%5Bbefore%5D=NA&page%5Bsize%5D=1",
    "next": "https://api.mews-demo.com/pos/v1/bookings?page%5Bafter%5D=NA&page%5Bsize%5D=1"
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | array of object [booking](bookings.md#booking) | required, max 1000 items | The document's "primary data". |
| `links` | [booking_pagination_links](bookings.md#booking_pagination_links) | required | A [links object](https://jsonapi.org/profiles/ethanresnick/cursor-pagination/#auto-id-links) describing cursor pagination links. |

#### booking_pagination_links

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `prev` | string,null | optional, max length 1024 characters | The link to the previous page of results. |
| `next` | string,null | optional, max length 1024 characters | The link to the next page of results. |

## Create booking

A booking represents a reservation made by a booking for goods or services, such as a table at a restaurant.

**Note:** This operation needs [Authentication](../essential-guide/authentication.md).

### Request

`POST` `[PlatformAddress]/v1/bookings`

```javascript
{
  "data": {
    "type": "bookings",
    "attributes": {
      "status": "confirmed",
      "partySize": 5,
      "bookingDatetime": "2024-10-24T08:44:45.409Z"
    },
    "relationships": {
      "customer": {
        "data": {
          "type": "customers",
          "id": "5efa8b3c-b930-4b31-918d-95ab0e212e65"
        }
      },
      "tables": {
        "data": [
          {
            "type": "tables",
            "id": "5efa8b3c-b930-4b31-918d-95ab0e212e78"
          }
        ]
      }
    }
  }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [booking_create](bookings.md#booking_create) | required | The document's "primary data". |

#### booking_create

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [booking_create_attributes](bookings.md#booking_create_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |
| `relationships` | object | required | An [relationships object](https://jsonapi.org/format/#document-resource-object-relationships) representing associations with other resources. |

#### booking_create_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `isWalkIn` | boolean,null | optional | Indicates if the booking is a walk-in. Defaults to `false`. |
| `status` | string,null | optional | The initial status of the booking. Possible values are "confirmed", "seated", "completed", "cancelled", and "no_show". |
| `partySize` | integer | required | Represents the number of people included in the booking. |
| `bookingDatetime` | string | required, max length 25 characters | The booking's date. |
| `duration` | integer,null | optional | Represents the length of the booking in minutes. |
| `notes` | string,null | optional, max length 10000 characters | Additional notes for the booking. |
| `roomNumber` | string,null | optional, max length 100 characters | The room number of the booking's customer. |
| `promotions` | string,null | optional, max length 100 characters | The promotions of the booking. |
| `bookingReference` | string,null | optional, max length 255 characters | A reference code or identifier associated with the booking. |
| `depositAmount` | string,null | optional, max length 255 characters | The amount of the deposit. |

### Response

```javascript
{
  "data": {
    "id": "83f93e1c-b6e1-4040-90cf-3274b6f3c82d",
    "type": "bookings",
    "attributes": {
      "status": "confirmed",
      "bookingDatetime": "2024-10-24T08:44:45.409Z",
      "duration": 60,
      "partySize": 2,
      "notes": "Vegetarian",
      "promotions": "Dinner - 4 courses INC",
      "roomNumber": "11",
      "bookingReference": "R43RdhQ",
      "isWalkIn": false,
      "createdAt": "2024-10-24T08:44:45.409Z",
      "updatedAt": "2024-10-24T08:44:45.409Z"
    },
    "relationships": {
      "customer": {
        "data": {
          "id": "5efa8b3c-b930-4b31-918d-95ab0e212e65",
          "type": "customers"
        }
      },
      "tables": {
        "data": [
          {
            "id": "5efa8b3c-b930-4b31-918d-95ab0e212e78",
            "type": "tables"
          }
        ]
      }
    }
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [booking](bookings.md#booking) | required | The document's "primary data". |
