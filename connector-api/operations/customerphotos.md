<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Customer photos

## Get all customer photos

Returns the photos of the specified customers, as metadata only – the image itself is not returned. A customer has at most one photo per enterprise, and customers without a photo are not returned. Photo identifiers change whenever a customer's photo is replaced, so they should not be stored. This operation is available only to enterprises with the **Advanced Guest Experience** module. When several enterprises are requested, including by omitting `EnterpriseIds`, the request fails if any of them does not have the module. With a Portfolio Access Token covering more than 1,000 enterprises, `EnterpriseIds` must be specified. Note this operation uses [Pagination](../guidelines/pagination.md) and supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/customerPhotos/getAll`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "CustomerIds": [
    "fadd5bb6-b428-45d5-94f8-fd0d89fece6d",
    "bccdafd1-3e44-439d-861f-341526b597a9"
  ],
  "EnterpriseIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "4d0201db-36f5-428b-8d11-4f0a65e960cc"
  ],
  "Limitation": {
    "Count": 100
  }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `EnterpriseIds` | array of string | optional, max 1000 items | Unique identifiers of the Enterprises. If not specified, the operation returns data for all enterprises within scope of the Access Token. |
| `CustomerIds` | array of string | required, max 100 items | Unique identifiers of the customers whose photos are requested. |
| `Limitation` | [Limitation](../guidelines/pagination.md#limitation) | required | Limitation on the quantity of data returned and optional Cursor for the starting point of data. |

### Response

```javascript
{
  "CustomerPhotos": [
    {
      "Id": "2e8b4c1d-9a3f-4f6e-b8d2-1c7a5e9f3d60",
      "CustomerId": "fadd5bb6-b428-45d5-94f8-fd0d89fece6d",
      "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "CreatedUtc": "2026-09-14T09:12:33Z"
    },
    {
      "Id": "6c1f2a9e-4b7d-4e2a-9c31-8d5f0e7a2b44",
      "CustomerId": "bccdafd1-3e44-439d-861f-341526b597a9",
      "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "CreatedUtc": "2026-09-21T16:45:08Z"
    }
  ],
  "Cursor": "6c1f2a9e-4b7d-4e2a-9c31-8d5f0e7a2b44"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CustomerPhotos` | array of [Customer photo](customerphotos.md#customer-photo) | required, max 1000 items | The customer photos. |
| `Cursor` | string | optional | Opaque pagination cursor, used in `Limitation` on a subsequent request to fetch the next page. Null when there are no more data. |

#### Customer photo

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the photo. Each photo stored for a customer replaces the previous one and gets a new identifier, so photo identifiers should not be stored. |
| `CustomerId` | string | required | Unique identifier of the `Customer` the photo belongs to. |
| `EnterpriseId` | string | required | Unique identifier of the enterprise the photo belongs to. |
| `CreatedUtc` | string | required | Date and time when the photo was stored in Mews, in UTC timezone in ISO 8601 format. |

## Set customer photo

Sets the photo of the specified customer for the enterprise. Only JPEG images (`image/jpeg`) are accepted, the content must be a valid JPEG, and the decoded image must not exceed 2 MB (2,000,000 bytes). A customer has at most one photo per enterprise: each call replaces the existing photo, and if calls overlap, the photo stored last is kept. Each stored photo gets a new identifier, so photo identifiers should not be stored. A failed call can safely be repeated. This operation is available only to enterprises with the **Advanced Guest Experience** module. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/customerPhotos/set`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "CustomerId": "fadd5bb6-b428-45d5-94f8-fd0d89fece6d",
  "Type": "image/jpeg",
  "Data": "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpKKKKAP/Z",
  "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `EnterpriseId` | string | optional | Unique identifier of the enterprise. Required when using [Portfolio Access Tokens](../concepts/multi-property.md), ignored otherwise. |
| `CustomerId` | string | required | Unique identifier of the `Customer` whose photo is set. |
| `Type` | string | required, max length 255 characters | MIME type of the image. Only `image/jpeg` is accepted. |
| `Data` | string | required, max length 2666668 characters | Base64-encoded content of the image, without a `data:` URI prefix. The decoded image must be a valid JPEG and must not exceed 2 MB (2,000,000 bytes). |

### Response

```javascript
{
  "CustomerPhoto": {
    "Id": "9a4e2f7c-3b1d-4c8a-a6e5-2f0d7b9c1e38",
    "CustomerId": "fadd5bb6-b428-45d5-94f8-fd0d89fece6d",
    "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "CreatedUtc": "2026-10-02T10:24:51Z"
  }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CustomerPhoto` | [Customer photo](customerphotos.md#customer-photo) | required | The stored customer photo. |
