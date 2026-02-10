# Discontinued API operations

The following API operations have been discontinued and are no longer available for use. They are retained in the documentation for reference purposes, but they will not function and should not be used in new integrations. Please refer to the recommended alternative operations mentioned in the descriptions.

## Add restrictions

{% hint style="warning" %}
Use [Set restrictions](restrictions.md#set-restrictions) instead.
{% endhint %}

Adds new restrictions with the specified conditions. Care is needed to specify `StartUtc` and `EndUtc` in the correct format - see [Datetimes](../guidelines/serialization.md#datetimes).
**Important:** If consecutive restrictions are sent with the exact same conditions and exceptions, no attempt at merging them into a single restriction is made. This means that there can be a large number of restrictions per service, leading to sub-optimal performance. A quota limit of 150,000 has been introduced for this reason. To mitigate the issue, the preferred way to add restrictions is operation [Set restriction](restrictions.md#set-restrictions).

### Request

`[PlatformAddress]/api/connector/v1/restrictions/add`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "ServiceId": "bd26d8db-86da-4f96-9efc-e5a4654a4a94",
  "Restrictions": [
    {
      "Identifier": "1234",
      "ExternalIdentifier": "5678",
      "Conditions": {
        "Type": "Start",
        "ExactRateId": "7c7e89d6-69c0-4cce-9d42-35443f2193f3",
        "ResourceCategoryId": "86336EAC-4168-46B1-A544-2A47251BF864",
        "Days": [
          "Friday",
          "Saturday",
          "Sunday"
        ]
      },
      "Exceptions": {
        "MinLength": "P0M2DT0H0M0S",
        "MaxLength": "P0M7DT0H0M0S"
      }
    },
    {
      "Identifier": "1235",
      "ExternalIdentifier": "5678",
      "Conditions": {
        "Type": "Start",
        "BaseRateId": "e5b538b1-36e6-43a0-9f5c-103204c7f68e",
        "Days": [
          "Friday",
          "Saturday",
          "Sunday"
        ]
      },
      "Exceptions": {
        "MinAdvance": "P0Y0M1DT0H0M0S",
        "MaxAdvance": "P0Y0M3DT0H0M0S"
      }
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `ServiceId` | string | required | Unique identifier of the [Service](services.md#service) restrictions will be added in. |
| `Restrictions` | array of [Restriction data](#restriction-data) | required, max 1000 items | Parameters of restrictions. |

#### Restriction data

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Identifier` | string | optional | Identifier of the restriction within the transaction. |
| `ExternalIdentifier` | string | optional | External identifier of the restriction. |
| `Conditions` | [Restriction condition data](#restriction-condition-data) | required | The conditions or rules that must be met by a reservation for the restriction to apply. |
| `Exceptions` | [Restriction exception data](#restriction-exception-data) | optional | The rules that prevent the restriction from applying to a reservation, even when all conditions have been met. |

#### Restriction condition data

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Type` | [Restriction type](#restriction-type) | required | Restriction type. |
| `ExactRateId` | string [Hybrid identifier](_objects.md#hybrid-identifier) | optional | Unique identifier of the exact `Rate` to which the restriction applies. |
| `BaseRateId` | string [Hybrid identifier](_objects.md#hybrid-identifier) | optional | Unique identifier of the base `Rate` to which the restriction applies. |
| `RateGroupId` | string [Hybrid identifier](_objects.md#hybrid-identifier) | optional | Unique identifier of the `Rate group` to which the restriction applies. |
| `ResourceCategoryId` | string [Hybrid identifier](_objects.md#hybrid-identifier) | optional | Unique identifier of the `Resource category` to which the restriction applies. |
| `ResourceCategoryType` | [Resource category type](#resource-category-type) | optional | Name of the `Resource category type` to which the restriction applies. |
| `StartUtc` | string | optional | Start date of the time interval for which the restriction conditions should be applied. This must be in UTC timezone in ISO 8601 format - see [Datetimes](../guidelines/serialization.md#datetimes). |
| `EndUtc` | string | optional | End date of the time interval for which the restriction conditions should be applied. This must be in UTC timezone in ISO 8601 format - see [Datetimes](../guidelines/serialization.md#datetimes). |
| `Days` | array of string | optional | The restricted days of week. Defaults to all days when not provided. Ignored when the service uses a time unit longer than a day. |
| `Hours` | [Hours](#hours) | optional | The restricted hours. Defaults to all hours when not provided. |

#### Restriction type

* `Stay` - Guests can't stay within specified dates.
* `Start` - Guests can't check in within specified dates.
* `End` - Guests can't check out within specified dates.


#### Resource category type

* `Room`
* `Bed`
* `Dorm`
* `Apartment`
* `Suite`
* `Villa`
* `Site`
* `Office`
* `MeetingRoom`
* `ParkingSpot`
* `Desk`
* `TeamArea`
* `Membership`
* `Tent`
* `CaravanOrRV`
* `UnequippedCampsite`
* `Bike`
* `ExtraBed`
* `Cot`
* `Crib`
* `ConferenceRoom`
* `Rooftop`
* `Garden`
* `Restaurant`
* `Amphitheater`
* `PrivateSpaces`


#### Restriction exception data

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `MinAdvance` | string | optional | The minimum time before the reservation starts, you can reserve in ISO 8601 duration format. |
| `MaxAdvance` | string | optional | The maximum time before the reservation starts, you can reserve in ISO 8601 duration format. |
| `MinLength` | string | optional | Minimal reservation length in ISO 8601 duration format. |
| `MaxLength` | string | optional | Maximal reservation length in ISO 8601 duration format. |
| `MinPrice` | [Currency value (ver 2018-06-07)](_objects.md#currency-value-ver-2018-06-07) | optional | Value of the minimum price per time unit. |
| `MaxPrice` | [Currency value (ver 2018-06-07)](_objects.md#currency-value-ver-2018-06-07) | optional | Value of the maximum price per time unit. |


#### Hours

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Zero` | boolean | required | Hour 0 enabled |
| `One` | boolean | required | Hour 1 enabled |
| `Two` | boolean | required | Hour 2 enabled |
| `Three` | boolean | required | Hour 3 enabled |
| `Four` | boolean | required | Hour 4 enabled |
| `Five` | boolean | required | Hour 5 enabled |
| `Six` | boolean | required | Hour 6 enabled |
| `Seven` | boolean | required | Hour 7 enabled |
| `Eight` | boolean | required | Hour 8 enabled |
| `Nine` | boolean | required | Hour 9 enabled |
| `Ten` | boolean | required | Hour 10 enabled |
| `Eleven` | boolean | required | Hour 11 enabled |
| `Twelve` | boolean | required | Hour 12 enabled |
| `Thirteen` | boolean | required | Hour 13 enabled |
| `Fourteen` | boolean | required | Hour 14 enabled |
| `Fifteen` | boolean | required | Hour 15 enabled |
| `Sixteen` | boolean | required | Hour 16 enabled |
| `Seventeen` | boolean | required | Hour 17 enabled |
| `Eighteen` | boolean | required | Hour 18 enabled |
| `Nineteen` | boolean | required | Hour 19 enabled |
| `Twenty` | boolean | required | Hour 20 enabled |
| `TwentyOne` | boolean | required | Hour 21 enabled |
| `TwentyTwo` | boolean | required | Hour 22 enabled |
| `TwentyThree` | boolean | required | Hour 23 enabled |

### Response

```javascript
{
  "Restrictions": [
    {
      "Identifier": "1234",
      "Restriction": {
        "Id": "40c24757-c16e-4094-91d3-4ca952e488a1",
        "ServiceId": "bd26d8db-86da-4f96-9efc-e5a4654a4a94",
        "ExternalIdentifier": "5678",
        "Conditions": {
          "Type": "Stay",
          "ExactRateId": "7c7e89d6-69c0-4cce-9d42-35443f2193f3",
          "BaseRateId": null,
          "RateGroupId": null,
          "ResourceCategoryId": "86336EAC-4168-46B1-A544-2A47251BF864",
          "ResourceCategoryType": null,
          "StartUtc": "2018-10-09T00:00:00Z",
          "EndUtc": "2018-10-31T00:00:00Z",
          "Days": [
            "Saturday",
            "Sunday"
          ]
        },
        "Exceptions": {
          "MinAdvance": null,
          "MaxAdvance": null,
          "MinLength": "P0M2DT0H0M0S",
          "MaxLength": "P0M7DT0H0M0S",
          "MinPrice": null,
          "MaxPrice": null
        }
      }
    },
    {
      "Identifier": "1235",
      "Restriction": {
        "Id": "b40ac4a8-f5da-457d-88fe-7a895e1580ab",
        "ServiceId": "bd26d8db-86da-4f96-9efc-e5a4654a4a94",
        "ExternalIdentifier": "5678",
        "Conditions": {
          "Type": "Start",
          "ExactRateId": null,
          "BaseRateId": "e5b538b1-36e6-43a0-9f5c-103204c7f68e",
          "RateGroupId": null,
          "ResourceCategoryId": null,
          "ResourceCategoryType": "Room",
          "StartUtc": "2018-10-01T00:00:00Z",
          "EndUtc": "2018-10-31T00:00:00Z",
          "Days": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ]
        },
        "Exceptions": {
          "MinAdvance": "P0M1DT0H0M0S",
          "MaxAdvance": "P0M3DT0H0M0S",
          "MinLength": null,
          "MaxLength": null,
          "MinPrice": null,
          "MaxPrice": null
        }
      }
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Restrictions` | array of [Added restriction](#added-restriction) | optional | The added restrictions. |

#### Added restriction

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Identifier` | string | optional | Identifier of the restriction within the transaction. |
| `Restriction` | [Restriction](#restriction) | optional | The added restriction. |


#### Restriction
The added restriction.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the restriction. |
| `ServiceId` | string | required | Unique identifier of the `Service`. |
| `ExternalIdentifier` | string | optional | External identifier of the restriction. |
| `Origin` | [Restriction origin](#restriction-origin) | required | Restriction origin |
| `Conditions` | [Restriction condition](#restriction-condition) | required | The conditions or rules that must be met by a reservation for the restriction to apply. |
| `Exceptions` | [Restriction exception](#restriction-exception) | optional | The rules that prevent the restriction from applying to a reservation, even when all conditions have been met. |

#### Restriction origin

* `User` - Restriction was created by a user in Mews.
* `Integration` - Restriction was created by a 3rd-party integration.

#### Restriction condition
The conditions or rules that must be met by a reservation for the restriction to apply.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Type` | [Restriction type](#restriction-type) | required | Restriction type. |
| `ExactRateId` | string | optional | Unique identifier of the restricted exact `Rate`. |
| `BaseRateId` | string | optional | Unique identifier of the restricted base `Rate`. |
| `RateGroupId` | string | optional | Unique identifier of the restricted `Rate group`. |
| `ResourceCategoryId` | string | optional | Unique identifier of the restricted `Resource category`. |
| `ResourceCategoryType` | [Resource category type](#resource-category-type) | optional | Name of the restricted `Resource category type`. |
| `StartUtc` | string | optional | Start date of the restriction time interval, specified in ISO 8601 format and adjusted to UTC - see [Datetimes](../guidelines/serialization.md#datetimes) for important information on format and implementation. |
| `EndUtc` | string | optional | End date of the restriction time interval, specified in ISO 8601 format and adjusted to UTC - see [Datetimes](../guidelines/serialization.md#datetimes) for important information on format and implementation. |
| `Days` | array of string | optional | The restricted days of week. Defaults to all days when not provided. Ignored when the service uses a time unit longer than a day. |
| `Hours` | [Hours](#hours) | optional | The restricted hours. Defaults to all hours when not provided. |

#### Restriction type

* `Stay` - Guests can't stay within specified dates.
* `Start` - Guests can't check in within specified dates.
* `End` - Guests can't check out within specified dates.

#### Resource category type

* `Room`
* `Bed`
* `Dorm`
* `Apartment`
* `Suite`
* `Villa`
* `Site`
* `Office`
* `MeetingRoom`
* `ParkingSpot`
* `Desk`
* `TeamArea`
* `Membership`
* `Tent`
* `CaravanOrRV`
* `UnequippedCampsite`
* `Bike`
* `ExtraBed`
* `Cot`
* `Crib`
* `ConferenceRoom`
* `Rooftop`
* `Garden`
* `Restaurant`
* `Amphitheater`
* `PrivateSpaces`


## Delete restrictions

{% hint style="warning" %}
Use [Clear restrictions](restrictions.md#clear-restrictions) instead.
{% endhint %}

Removes restrictions from the service.

### Request

`[PlatformAddress]/api/connector/v1/restrictions/delete`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "RestrictionIds": [
    "af4949ce-c061-4f27-89f9-5a6a9ef725a7",
    "e2f8aa29-0c09-4097-801c-7888c9fb57ae"
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `RestrictionIds` | array of string | required | Unique identifiers of the `Restriction`. |

### Response

```javascript
{}
```
