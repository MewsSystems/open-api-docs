<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Custom titles

## Get all custom titles

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Returns custom titles, optionally filtered by `CustomTitleGroup` or `CustomTitle` unique identifiers. Note this operation uses [Pagination](../guidelines/pagination.md) and supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/customTitles/getAll`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "CustomTitleGroupIds": [
    "4b1f6f0e-9e9a-4d94-9f3d-6c9a2f1a0b6c"
  ],
  "ActivityStates": [
    "Active"
  ],
  "ChainIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "5fcd1933-22f2-40b9-84da-7db04cbecec2"
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
| `ChainIds` | array of string | optional, max 1000 items | Unique identifiers of `Chain`. If not specified, the operation returns data for all chains within scope of the Access Token. |
| `CustomTitleGroupIds` | array of string | optional, max 100 items | Unique identifiers of the `CustomTitleGroup` whose custom titles are requested. |
| `CustomTitleIds` | array of string | optional, max 100 items | Unique identifiers of `CustomTitle`. |
| `ActivityStates` | array of [Activity state](_objects.md#activity-state) | optional | Whether to return only active, only deleted, or both types of record. If not specified, only active records will be returned. |
| `Limitation` | [Limitation](../guidelines/pagination.md#limitation) | required | Limitation on the quantity of data returned and optional Cursor for the starting point of data. |

### Response

```javascript
{
  "CustomTitles": [
    {
      "Id": "9c6b3e2d-2a7f-4c1b-9e5a-3d8f6b2c1a4e",
      "ChainId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "CustomTitleGroupId": "4b1f6f0e-9e9a-4d94-9f3d-6c9a2f1a0b6c",
      "Name": "Sergeant",
      "Code": "SGT",
      "IsActive": true
    },
    {
      "Id": "1d4a7c9e-6b3f-4e2a-8c1d-5f9b3a7e2c6d",
      "ChainId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "CustomTitleGroupId": "4b1f6f0e-9e9a-4d94-9f3d-6c9a2f1a0b6c",
      "Name": "Captain",
      "Code": "CPT",
      "IsActive": true
    }
  ],
  "Cursor": "1d4a7c9e-6b3f-4e2a-8c1d-5f9b3a7e2c6d"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CustomTitles` | array of [Custom title](customtitles.md#custom-title) | required, max 1000 items | The custom titles. |
| `Cursor` | string | optional | Unique identifier of the last custom title returned. Use it as the `Cursor` in `Limitation` on a subsequent request to fetch the next batch. |

#### Custom title

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the custom title. |
| `ChainId` | string | required | Unique identifier of the `Chain` the custom title belongs to. |
| `CustomTitleGroupId` | string | required | Unique identifier of the `CustomTitleGroup` the custom title belongs to. |
| `Name` | string | required, max length 255 characters | Name of the custom title. |
| `Code` | string | optional, max length 100 characters | Short code of the custom title. |
| `IsActive` | boolean | required | Whether the custom title is active. |

## Add custom titles

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Adds custom titles to existing custom title groups. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/customTitles/add`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "CustomTitles": [
    {
      "CustomTitleGroupId": "4b1f6f0e-9e9a-4d94-9f3d-6c9a2f1a0b6c",
      "Name": "Sergeant",
      "Code": "SGT"
    },
    {
      "CustomTitleGroupId": "4b1f6f0e-9e9a-4d94-9f3d-6c9a2f1a0b6c",
      "Name": "Captain",
      "Code": "CPT"
    }
  ],
  "ChainId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `ChainId` | string | optional | Unique identifier of the chain. Required when using [Portfolio Access Tokens](../concepts/multi-property.md), ignored otherwise. |
| `CustomTitles` | array of [Custom title add parameters](customtitles.md#custom-title-add-parameters) | required, max 100 items | Custom titles to be added. |

#### Custom title add parameters

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CustomTitleGroupId` | string | required | Unique identifier of the `CustomTitleGroup` the custom title should be added to. |
| `Name` | string | required, max length 255 characters | Name of the custom title. |
| `Code` | string | optional, max length 100 characters | Short code of the custom title. |

### Response

```javascript
{
  "CustomTitles": [
    {
      "Id": "9c6b3e2d-2a7f-4c1b-9e5a-3d8f6b2c1a4e",
      "ChainId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "CustomTitleGroupId": "4b1f6f0e-9e9a-4d94-9f3d-6c9a2f1a0b6c",
      "Name": "Sergeant",
      "Code": "SGT",
      "IsActive": true
    },
    {
      "Id": "1d4a7c9e-6b3f-4e2a-8c1d-5f9b3a7e2c6d",
      "ChainId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "CustomTitleGroupId": "4b1f6f0e-9e9a-4d94-9f3d-6c9a2f1a0b6c",
      "Name": "Captain",
      "Code": "CPT",
      "IsActive": true
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CustomTitles` | array of [Custom title](customtitles.md#custom-title) | required, max 100 items | The custom titles. |

## Update custom titles

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Updates the specified custom titles. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/customTitles/update`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "CustomTitleUpdates": [
    {
      "CustomTitleId": "9c6b3e2d-2a7f-4c1b-9e5a-3d8f6b2c1a4e",
      "Name": {
        "Value": "Sergeant Major"
      },
      "Code": {
        "Value": "SGM"
      }
    }
  ],
  "ChainId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `ChainId` | string | optional | Unique identifier of the chain. Required when using [Portfolio Access Tokens](../concepts/multi-property.md), ignored otherwise. |
| `CustomTitleUpdates` | array of [Custom title update parameters](customtitles.md#custom-title-update-parameters) | required, max 100 items | Custom titles to be updated. |

#### Custom title update parameters

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CustomTitleId` | string | required | Unique identifier of the `CustomTitle` to be updated. |
| `Name` | [String update value](_objects.md#string-update-value) | optional, max length 255 characters | Name of the custom title (or `null` if the name should not be updated). |
| `Code` | [String update value](_objects.md#string-update-value) | optional, max length 100 characters | Short code of the custom title (or `null` if the code should not be updated). |

### Response

```javascript
{
  "CustomTitles": [
    {
      "Id": "9c6b3e2d-2a7f-4c1b-9e5a-3d8f6b2c1a4e",
      "ChainId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "CustomTitleGroupId": "4b1f6f0e-9e9a-4d94-9f3d-6c9a2f1a0b6c",
      "Name": "Sergeant",
      "Code": "SGT",
      "IsActive": true
    },
    {
      "Id": "1d4a7c9e-6b3f-4e2a-8c1d-5f9b3a7e2c6d",
      "ChainId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "CustomTitleGroupId": "4b1f6f0e-9e9a-4d94-9f3d-6c9a2f1a0b6c",
      "Name": "Captain",
      "Code": "CPT",
      "IsActive": true
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CustomTitles` | array of [Custom title](customtitles.md#custom-title) | required, max 100 items | The custom titles. |

## Delete custom titles

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Deletes custom titles. A `Customer` already assigned a deleted title keeps showing it in `CustomTitleId` and `CustomTitleName` until reassigned, and the title itself stays retrievable through [Get all custom titles](customtitles.md#get-all-custom-titles) with `ActivityStates` set to `Deleted`. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/customTitles/delete`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "CustomTitleIds": [
    "9c6b3e2d-2a7f-4c1b-9e5a-3d8f6b2c1a4e"
  ],
  "ChainId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `ChainId` | string | optional | Unique identifier of the chain. Required when using [Portfolio Access Tokens](../concepts/multi-property.md), ignored otherwise. |
| `CustomTitleIds` | array of string | required, max 30 items | Unique identifiers of the `CustomTitle` to be deleted. |

### Response

```javascript
{}
```
