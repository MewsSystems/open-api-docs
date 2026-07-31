<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Resource categories

## Get all resource categories

Returns all categories of resources. This operation uses [Pagination](../guidelines/pagination.md).

### Request

`[PlatformAddress]/api/connector/v1/resourceCategories/getAll`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "EnterpriseIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "4d0201db-36f5-428b-8d11-4f0a65e960cc"
  ],
  "ResourceCategoryIds": [
    "5c0804f9-d03a-4b13-a57d-b00300781a41",
    "47d6b462-35ec-467e-a565-b00300781a41"
  ],
  "ServiceIds": [
    "9b3a6c54-63aa-4383-b50e-b0030078184b",
    "c0f71466-6c0b-4993-88ac-1794f6b7e958"
  ],
  "UpdatedUtc": {
    "StartUtc": "2023-05-05T00:00:00Z",
    "EndUtc": "2023-05-10T00:00:00Z"
  },
  "ActivityStates": [
    "Active"
  ],
  "Limitation": {
    "Count": 10
  }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `EnterpriseIds` | array of string | optional, max 1000 items | Unique identifiers of the Enterprises. If not specified, the operation returns data for all enterprises within scope of the Access Token. |
| `ResourceCategoryIds` | array of string | optional, max 1000 items | Unique identifiers of [Resource categories](resourcecategories.md#resource-category). |
| `ServiceIds` | array of string | required, max 1000 items | Unique identifiers of [Services](services.md#service) to which the resource categories belong. |
| `UpdatedUtc` | [Time interval](_objects.md#time-interval) | optional, max length 3 months | Interval in which the resource categories were updated. |
| `ActivityStates` | array of [Activity state](_objects.md#activity-state) | optional | Whether to return only active, only deleted or both records. |
| `Limitation` | [Limitation](../guidelines/pagination.md#limitation) | required | Limitation on the quantity of data returned and optional Cursor for the starting point of data. |

### Response

```javascript
{
  "ResourceCategories": [
    {
      "Id": "5c0804f9-d03a-4b13-a57d-b00300781a41",
      "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "ServiceId": "9b3a6c54-63aa-4383-b50e-b0030078184b",
      "IsActive": true,
      "Type": "Bed",
      "Names": {
        "en-US": "Bed 1"
      },
      "ShortNames": {
        "en-US": "Bed 1"
      },
      "Descriptions": {},
      "Ordering": 2,
      "Capacity": 1,
      "ExtraCapacity": 0,
      "ExternalIdentifier": null
    },
    {
      "Id": "47d6b462-35ec-467e-a565-b00300781a41",
      "EnterpriseId": "4d0201db-36f5-428b-8d11-4f0a65e960cc",
      "ServiceId": "c0f71466-6c0b-4993-88ac-1794f6b7e958",
      "IsActive": true,
      "Type": "Dorm",
      "Names": {
        "en-US": "Dorm 1"
      },
      "ShortNames": {
        "en-US": "Dorm 1"
      },
      "Descriptions": {},
      "Ordering": 1,
      "Capacity": 4,
      "ExtraCapacity": 0,
      "ExternalIdentifier": null
    }
  ],
  "Cursor": "47d6b462-35ec-467e-a565-b00300781a41"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ResourceCategories` | array of [Resource category](resources.md#resource-category) | required, max 1000 items | Resource categories of the resources. |
| `Cursor` | string | optional | Unique identifier of the last and hence oldest resource category returned. This can be used in [Limitation](../guidelines/pagination.md#limitation) in a subsequent request to fetch the next batch of older resource categories. |

## Get all resource category assignments

Returns all resource category assignments. This operation uses [Pagination](../guidelines/pagination.md).

### Request

`[PlatformAddress]/api/connector/v1/resourceCategoryAssignments/getAll`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "ResourceCategoryAssignmentIds": [
    "fb69fc51-c4e9-4ef6-874a-24bcfe74a894",
    "28704948-77df-4bb4-8f39-f8380dc8a914"
  ],
  "ResourceCategoryIds": [
    "5c0804f9-d03a-4b13-a57d-b00300781a41",
    "47d6b462-35ec-467e-a565-b00300781a41"
  ],
  "UpdatedUtc": {
    "StartUtc": "2023-11-01T00:00:00Z",
    "EndUtc": "2023-11-30T00:00:00Z"
  },
  "ActivityStates": [
    "Active"
  ],
  "ResourceIds": [
    "5ee074b1-6c86-48e8-915f-c7aa4702086f",
    "c32386aa-1cd2-414a-a823-489325842fbe"
  ],
  "EnterpriseIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "4d0201db-36f5-428b-8d11-4f0a65e960cc"
  ],
  "Limitation": {
    "Count": 10,
    "Cursor": "e7f26210-10e7-462e-9da8-ae8300be8ab7"
  }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `EnterpriseIds` | array of string | optional, max 1000 items | Unique identifiers of the Enterprises. If not specified, the operation returns data for all enterprises within scope of the Access Token. |
| `ResourceCategoryAssignmentIds` | array of string | optional, max 1000 items | Unique identifiers of [Resource category assignment](resourcecategories.md#resource-category-assignment). |
| `ResourceCategoryIds` | array of string | required, max 1000 items | Unique identifiers of [Resource categories](resourcecategories.md#resource-category) to which the resource category assignment belong. |
| `UpdatedUtc` | [Time interval](_objects.md#time-interval) | optional | Interval in which the resource category assignments were updated. |
| `ActivityStates` | array of [Activity state](_objects.md#activity-state) | optional | Whether to return only active, only deleted or both records. The `ActivityState` filter applies only to record’s own status. The `IsActive` response property also considers the parent’s status, so some returned records may have `IsActive = false` if their parent is deleted. |
| `ResourceIds` | array of string | optional, max 1000 items | Unique identifiers of resources to which the resource category assignments belong. |
| `Limitation` | [Limitation](../guidelines/pagination.md#limitation) | required | Limitation on the quantity of data returned and optional Cursor for the starting point of data. |

### Response

```javascript
{
  "ResourceCategoryAssignments": [
    {
      "Id": "fb69fc51-c4e9-4ef6-874a-24bcfe74a894",
      "ResourceId": "e5a34a69-d35e-4e85-a645-a9bc4ee3a80f",
      "CategoryId": "5c0804f9-d03a-4b13-a57d-b00300781a41",
      "IsActive": true,
      "CreatedUtc": "2023-10-01T11:48:57Z",
      "UpdatedUtc": "2023-10-28T11:48:57Z"
    },
    {
      "Id": "28704948-77df-4bb4-8f39-f8380dc8a914",
      "ResourceId": "90908a65-35fc-4856-b659-106f60b591e5",
      "CategoryId": "47d6b462-35ec-467e-a565-b00300781a41",
      "IsActive": true,
      "CreatedUtc": "2023-10-01T11:48:57Z",
      "UpdatedUtc": "2023-10-28T11:48:57Z"
    }
  ],
  "Cursor": "28704948-77df-4bb4-8f39-f8380dc8a914"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ResourceCategoryAssignments` | array of [Resource category assignment](resourcecategories.md#resource-category-assignment) | required, max 1000 items | Resource category assignments. |
| `Cursor` | string | optional | Unique identifier of the last and hence oldest resource category assignment returned. This can be used in [Limitation](../guidelines/pagination.md#limitation) in a subsequent request to fetch the next batch of older resource category assignments. |

#### Resource category assignment

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the assignment. |
| `IsActive` | boolean | required | Whether the assignment is still active. |
| `ResourceId` | string | required | Unique identifier of the [Resource](resourcecategories.md#resource) assigned to the Resource category. |
| `CategoryId` | string | required | Unique identifier of the [Resource category](resourcecategories.md#resource-category). |
| `CreatedUtc` | string | required | Creation date and time of the assignment in UTC timezone in ISO 8601 format. |
| `UpdatedUtc` | string | required | Last update date and time of the assignment in UTC timezone in ISO 8601 format. |

## Get all resource category image assignments

Returns all resource category image assignments. This operation uses [Pagination](../guidelines/pagination.md).

### Request

`[PlatformAddress]/api/connector/v1/resourceCategoryImageAssignments/getAll`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "ResourceCategoryImageAssignmentIds": [
    "edb5f556-7afb-4650-8d4e-8c0a6fff784d",
    "9d18f5fb-cce5-4e70-9561-f7804262344b"
  ],
  "ResourceCategoryIds": [
    "773d5e42-de1e-43a0-9ce6-f940faf2303f",
    "47d6b462-35ec-467e-a565-b00300781a41"
  ],
  "UpdatedUtc": {
    "StartUtc": "2023-11-01T00:00:00Z",
    "EndUtc": "2023-11-30T00:00:00Z"
  },
  "ActivityStates": [
    "Active"
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
| `ResourceCategoryImageAssignmentIds` | array of string | optional, max 1000 items | Unique identifiers of [Resource category image assignments](resourcecategories.md#resource-category-image-assignment). |
| `ResourceCategoryIds` | array of string | required, max 1000 items | Unique identifiers of [Resource categories](resources.md#resource-category) to which the resource category image assignments belong. |
| `UpdatedUtc` | [Time interval](_objects.md#time-interval) | optional | Interval in which the resource category image assignments were updated. |
| `ActivityStates` | array of [Activity state](_objects.md#activity-state) | optional | Whether to return only active, only deleted or both records. |
| `Limitation` | [Limitation](../guidelines/pagination.md#limitation) | required | Limitation on the quantity of data returned and optional Cursor for the starting point of data. |

### Response

```javascript
{
  "ResourceCategoryImageAssignments": [
    {
      "Id": "edb5f556-7afb-4650-8d4e-8c0a6fff784d",
      "IsActive": true,
      "CategoryId": "773d5e42-de1e-43a0-9ce6-f940faf2303f",
      "ImageId": "e910d008-fded-4af5-a84f-c00f92e3947d",
      "CreatedUtc": "2023-10-01T11:48:57Z",
      "UpdatedUtc": "2023-10-28T11:48:57Z",
      "Ordering": 0
    },
    {
      "Id": "9d18f5fb-cce5-4e70-9561-f7804262344b",
      "IsActive": true,
      "CategoryId": "47d6b462-35ec-467e-a565-b00300781a41",
      "ImageId": "11056cdb-2045-49e0-821f-2b93905ff522",
      "CreatedUtc": "2023-10-01T11:48:57Z",
      "UpdatedUtc": "2023-10-28T11:48:57Z",
      "Ordering": 0
    }
  ],
  "Cursor": "9d18f5fb-cce5-4e70-9561-f7804262344b"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ResourceCategoryImageAssignments` | array of [Resource category image assignment](resourcecategories.md#resource-category-image-assignment) | required, max 1000 items | Resource category image assignments. |
| `Cursor` | string | optional | Unique identifier of the last and hence oldest resource category image assignment returned. This can be used in [Limitation](../guidelines/pagination.md#limitation) in a subsequent request to fetch the next batch of older resource category image assignments. |

#### Resource category image assignment

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the assignment. |
| `IsActive` | boolean | required | Whether the assignment is still active. |
| `CategoryId` | string | required | Unique identifier of the [Resource category](resourcecategories.md#resource-category). |
| `ImageId` | string | required | Unique identifier of the image assigned to the Resource category. |
| `CreatedUtc` | string | required | Creation date and time of the assignment in UTC timezone in ISO 8601 format. |
| `UpdatedUtc` | string | required | Last update date and time of the assignment in UTC timezone in ISO 8601 format. |
| `Ordering` | integer | required | Ordering of the image in the resource category. |

## Add resource categories

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Adds one or more resource categories (also known as space categories or room types) to the specified services. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/resourceCategories/add`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "ResourceCategories": [
    {
      "ServiceId": "bd26d8db-86da-4f96-9efc-e5a4654a4a94",
      "Type": "Room",
      "Capacity": 2,
      "ExtraCapacity": 1,
      "Names": {
        "en-US": "Standard Double Room"
      },
      "ShortNames": {
        "en-US": "SDBL"
      },
      "Descriptions": {
        "en-US": "A standard room with a double bed."
      },
      "Classification": "StandardDouble",
      "Ordering": 1,
      "ExternalIdentifier": "STD-DBL",
      "AccountingCategoryId": "90eff5aa-36b4-4689-80c0-ab3a00bb412e"
    }
  ],
  "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `EnterpriseId` | string | optional | Unique identifier of the enterprise. Required when using [Portfolio Access Tokens](../concepts/multi-property.md), ignored otherwise. |
| `ResourceCategories` | array of [Resource category add parameters](resourcecategories.md#resource-category-add-parameters) | required, max 100 items | Parameters of the new resource categories to be created. |

#### Resource category add parameters

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ServiceId` | string | required | Unique identifier of the `Service` the resource category belongs to. |
| `Type` | [Resource category type](restrictions.md#resource-category-type) | required | Type of the category. |
| `Capacity` | integer | required | Capacity that can be served (e.g. bed count). Must be a positive number. |
| `ExtraCapacity` | integer | optional | Extra capacity that can be served (e.g. extra bed count). Must not be negative. |
| `Names` | [Localized text](_objects.md#localized-text) | optional | All translations of the name. |
| `ShortNames` | [Localized text](_objects.md#localized-text) | optional | All translations of the short name. |
| `Descriptions` | [Localized text](_objects.md#localized-text) | optional | All translations of the description. |
| `Classification` | [Resource classification](resourcecategories.md#resource-classification) | optional | Classification of the resource category. |
| `Ordering` | integer | optional | Ordering of the category, lower number corresponds to lower category (note that neither uniqueness nor continuous sequence is guaranteed). |
| `ExternalIdentifier` | string | optional, max length 255 characters | Identifier of the resource category from an external system. |
| `AccountingCategoryId` | string | optional | Unique identifier of the accounting category. |

#### Resource classification

* `StandardSingle`
* `StandardDouble`
* `SuperiorTwin`
* `SuperiorDouble`
* `JuniorSuite`
* `SharedOrDorm`
* `Other`
* `SuperiorSingle`
* `Triple`
* `Family`
* `StandardTwin`
* `Studio`
* `SuperiorTripleRoom`
* `OneBedroomApartment`
* `ThreeBedroomsApartment`
* `TwoBedroomsApartment`

### Response

```javascript
{
  "ResourceCategories": [
    {
      "Id": "773d5e42-de1e-43a0-9ce6-f940faf2303f",
      "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "ServiceId": "bd26d8db-86da-4f96-9efc-e5a4654a4a94",
      "IsActive": true,
      "Type": "Room",
      "Classification": "StandardDouble",
      "Names": {
        "en-US": "Standard Double Room"
      },
      "ShortNames": {
        "en-US": "SDBL"
      },
      "Descriptions": {
        "en-US": "A standard room with a double bed."
      },
      "Ordering": 1,
      "Capacity": 2,
      "ExtraCapacity": 1,
      "ExternalIdentifier": "STD-DBL",
      "AccountingCategoryId": "90eff5aa-36b4-4689-80c0-ab3a00bb412e"
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ResourceCategories` | array of [Resource category](resources.md#resource-category) | required, max 100 items | Resource categories affected by the operation. |

## Update resource categories

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Updates one or more existing resource categories. Only the fields that are set are updated. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/resourceCategories/update`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "ResourceCategoryUpdates": [
    {
      "ResourceCategoryId": "773d5e42-de1e-43a0-9ce6-f940faf2303f",
      "Names": {
        "Value": {
          "en-US": "Superior Double Room"
        }
      },
      "Capacity": {
        "Value": 3
      },
      "Ordering": {
        "Value": 2
      }
    }
  ],
  "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `EnterpriseId` | string | optional | Unique identifier of the enterprise. Required when using [Portfolio Access Tokens](../concepts/multi-property.md), ignored otherwise. |
| `ResourceCategoryUpdates` | array of [Resource category update parameters](resourcecategories.md#resource-category-update-parameters) | required, max 100 items | Details of the resource categories to be updated. |

#### Resource category update parameters

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ResourceCategoryId` | string | required | Unique identifier of the resource category to be updated. |
| `Names` | [Localized text update value](resourcecategories.md#localized-text-update-value) | optional | All translations of the name (or null if it should not be updated). |
| `ShortNames` | [Localized text update value](resourcecategories.md#localized-text-update-value) | optional | All translations of the short name (or null if it should not be updated). |
| `Descriptions` | [Localized text update value](resourcecategories.md#localized-text-update-value) | optional | All translations of the description (or null if it should not be updated). |
| `Type` | [Resource category type update value](resourcecategories.md#resource-category-type-update-value) | optional | Type of the category (or null if it should not be updated). |
| `Capacity` | [Integer update value](_objects.md#integer-update-value) | optional | Capacity that can be served, e.g. bed count. Must be a positive number (or null if it should not be updated). |
| `ExtraCapacity` | [Integer update value](_objects.md#integer-update-value) | optional | Extra capacity that can be served, e.g. extra bed count. Must not be negative (or null if it should not be updated). |
| `Ordering` | [Integer update value](_objects.md#integer-update-value) | optional | Ordering of the category, lower number corresponds to lower category (or null if it should not be updated). |
| `Classification` | [Resource classification update value](resourcecategories.md#resource-classification-update-value) | optional | Classification of the resource category. Set the inner value to null to clear it (or null if it should not be updated). |
| `ExternalIdentifier` | [String update value](_objects.md#string-update-value) | optional | Identifier of the resource category from an external system. Set the inner value to null to clear it (or null if it should not be updated). |
| `AccountingCategoryId` | [String update value](_objects.md#string-update-value) | optional | Unique identifier of the accounting category. Set the inner value to null to clear it (or null if it should not be updated). |

#### Localized text update value

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Value` | [Localized text](_objects.md#localized-text) | optional | Value which is to be updated. |

#### Resource category type update value

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Value` | [Resource category type](restrictions.md#resource-category-type) | required | Value which is to be updated. |

#### Resource classification update value

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Value` | [Resource classification](resourcecategories.md#resource-classification) | optional | Value which is to be updated. |

### Response

```javascript
{
  "ResourceCategories": [
    {
      "Id": "773d5e42-de1e-43a0-9ce6-f940faf2303f",
      "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "ServiceId": "bd26d8db-86da-4f96-9efc-e5a4654a4a94",
      "IsActive": true,
      "Type": "Room",
      "Classification": "StandardDouble",
      "Names": {
        "en-US": "Standard Double Room"
      },
      "ShortNames": {
        "en-US": "SDBL"
      },
      "Descriptions": {
        "en-US": "A standard room with a double bed."
      },
      "Ordering": 1,
      "Capacity": 2,
      "ExtraCapacity": 1,
      "ExternalIdentifier": "STD-DBL",
      "AccountingCategoryId": "90eff5aa-36b4-4689-80c0-ab3a00bb412e"
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ResourceCategories` | array of [Resource category](resources.md#resource-category) | required, max 100 items | Resource categories affected by the operation. |

## Delete resource categories

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Deletes the specified resource categories. A resource category cannot be deleted while it still has active resources, overbookings, rate adjustments, channel manager mappings, product rules, promotions, restrictions or active reservations. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/resourceCategories/delete`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "ResourceCategoryIds": [
    "773d5e42-de1e-43a0-9ce6-f940faf2303f",
    "47d6b462-35ec-467e-a565-b00300781a41"
  ],
  "EnterpriseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `EnterpriseId` | string | optional | Unique identifier of the enterprise. Required when using [Portfolio Access Tokens](../concepts/multi-property.md), ignored otherwise. |
| `ResourceCategoryIds` | array of string | required, max 100 items | Unique identifiers of the resource categories to be deleted. |

### Response

```javascript
{}
```
