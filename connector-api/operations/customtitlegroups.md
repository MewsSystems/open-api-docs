<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Custom title groups

## Get all custom title groups

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Returns custom title groups configured for the chain. Use [Get all custom titles](customtitles.md#get-all-custom-titles) to retrieve the titles within a group. Note this operation uses [Pagination](../guidelines/pagination.md) and supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/customTitleGroups/getAll`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "CustomTitleGroupIds": [
    "4b1f6f0e-9e9a-4d94-9f3d-6c9a2f1a0b6c",
    "7a2e6d3c-3f8b-4b2a-8b6a-1e5c9d3a7f42"
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
| `CustomTitleGroupIds` | array of string | optional, max 100 items | Unique identifiers of `CustomTitleGroup`. |
| `ActivityStates` | array of [Activity state](_objects.md#activity-state) | optional | Whether to return only active, only deleted, or both types of record. If not specified, only active records will be returned. |
| `Limitation` | [Limitation](../guidelines/pagination.md#limitation) | required | Limitation on the quantity of data returned and optional Cursor for the starting point of data. |

### Response

```javascript
{
  "CustomTitleGroups": [
    {
      "Id": "4b1f6f0e-9e9a-4d94-9f3d-6c9a2f1a0b6c",
      "ChainId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "Name": "Military ranks",
      "IsEditable": true,
      "IsActive": true
    }
  ],
  "Cursor": "4b1f6f0e-9e9a-4d94-9f3d-6c9a2f1a0b6c"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CustomTitleGroups` | array of [Custom title group](customtitlegroups.md#custom-title-group) | required, max 1000 items | The custom title groups. |
| `Cursor` | string | optional | Unique identifier of the last custom title group returned. Use it as the `Cursor` in `Limitation` on a subsequent request to fetch the next batch. |

#### Custom title group

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the custom title group. |
| `ChainId` | string | required | Unique identifier of the `Chain` the custom title group belongs to. |
| `Name` | string | required, max length 255 characters | Name of the custom title group. |
| `IsEditable` | boolean | required | Whether the custom title group itself can be renamed or deleted. Groups managed by Mews are not editable. This governs the group only – the custom titles within it are always editable and can be managed regardless of this value. |
| `IsActive` | boolean | required | Whether the custom title group is active. Inactive groups can still be referenced by existing custom titles – request them with the `ActivityStates` filter. |

## Add custom title groups

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Adds custom title groups to the chain. A group is created without any custom titles; use [Add custom titles](customtitles.md#add-custom-titles) to add them. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/customTitleGroups/add`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "CustomTitleGroups": [
    {
      "Name": "Military ranks"
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
| `CustomTitleGroups` | array of [Custom title group add parameters](customtitlegroups.md#custom-title-group-add-parameters) | required, max 100 items | Custom title groups to be added. |

#### Custom title group add parameters

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Name` | string | required, max length 255 characters | Name of the custom title group. The group is created without any custom titles; add them afterwards via [Add custom titles](customtitles.md#add-custom-titles). |

### Response

```javascript
{
  "CustomTitleGroups": [
    {
      "Id": "4b1f6f0e-9e9a-4d94-9f3d-6c9a2f1a0b6c",
      "ChainId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "Name": "Military ranks",
      "IsEditable": true,
      "IsActive": true
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CustomTitleGroups` | array of [Custom title group](customtitlegroups.md#custom-title-group) | required, max 100 items | The custom title groups. |

## Update custom title groups

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Renames the specified custom title groups. Fails if any specified group has `IsEditable` set to `false` and its `Name` would actually change; a group whose `Name` is omitted, or resolves to its current value, is left as is regardless of `IsEditable`. Use [Add custom titles](customtitles.md#add-custom-titles), [Update custom titles](customtitles.md#update-custom-titles) or [Delete custom titles](customtitles.md#delete-custom-titles) to manage the titles within a group. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/customTitleGroups/update`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "CustomTitleGroupUpdates": [
    {
      "CustomTitleGroupId": "4b1f6f0e-9e9a-4d94-9f3d-6c9a2f1a0b6c",
      "Name": {
        "Value": "Military ranks"
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
| `CustomTitleGroupUpdates` | array of [Custom title group update parameters](customtitlegroups.md#custom-title-group-update-parameters) | required, max 100 items | Custom title groups to be updated. |

#### Custom title group update parameters

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CustomTitleGroupId` | string | required | Unique identifier of the `CustomTitleGroup` to be updated. |
| `Name` | [String update value](_objects.md#string-update-value) | optional, max length 255 characters | Name of the custom title group (or `null` if the name should not be updated). |

### Response

```javascript
{
  "CustomTitleGroups": [
    {
      "Id": "4b1f6f0e-9e9a-4d94-9f3d-6c9a2f1a0b6c",
      "ChainId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "Name": "Military ranks",
      "IsEditable": true,
      "IsActive": true
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CustomTitleGroups` | array of [Custom title group](customtitlegroups.md#custom-title-group) | required, max 100 items | The custom title groups. |

## Delete custom title groups

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Deletes custom title groups, along with the custom titles within them. Fails if any specified group has `IsEditable` set to `false`. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/customTitleGroups/delete`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "CustomTitleGroupIds": [
    "4b1f6f0e-9e9a-4d94-9f3d-6c9a2f1a0b6c"
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
| `CustomTitleGroupIds` | array of string | required, max 30 items | Unique identifiers of the `CustomTitleGroup` to be deleted. |

### Response

```javascript
{}
```
