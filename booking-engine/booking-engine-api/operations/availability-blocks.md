# Availability blocks

## Get availability blocks

Get details of the availability blocks for the given hotel.
This operation can be called initially to fetch data which may be important during the booking workflow.
Availability blocks can restrict your booking engine's calendar to specific intervals defined by `StartUtc` and `EndUtc` in the response, it also gives you `RateId` that should be used.

### Request

`[ApiBaseUrl]/api/distributor/v1/availabilityBlocks/getAll`

```json
{
    "Client": "My Client 1.0.0",
    "AvailabilityBlockIds": [
        "5mgbe1b4-6739-40b7-81b3-d369d9469c48"
    ],
    "EnterpriseId": "3edbe1b4-6739-40b7-81b3-d369d9469c48"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Client` | string | required | Identification of the API client, as described in [Authentication](../guidelines/authentication.md). |
| `EnterpriseId` | string | required | Unique identifier of the hotel (enterprise). |
| `AvailabilityBlockIds` | array of string | required | Set of unique identifiers of the Availability Blocks for which you want to get the details. |

### Response

```json
{
    "AvailabilityBlocks":[
      {
        "Id": "5mgbe1b4-6739-40b7-81b3-d369d9469c48",
        "Name": "Name of the availability block",
        "ServiceId": "a64f85bf-b92c-4df7-b7c8-ab7c00adc59a",
        "RateId": "038a88e6-17c6-4553-b036-aebb00a9bc4c",
        "StartUtc": "2022-06-27T22:00:00Z",
        "EndUtc": "2022-07-04T22:00:00Z"
      }
    ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Provided ID of availability block. |
| `Name` | string | required | Name of availability block. |
| `ServiceId` | string | required | Unique identifier of [Service](configuration.md#service) to which availability block is assigned |
| `RateId` | string | required | Unique identifier of [Rate](hotels.md#rate) which is intended for this availability block |
| `StartUtc` | string | required | Availability block start date \(validity start date\) in ISO 8601 format. |
| `EndUtc` | string | required | Availability block end date \(validity expiration date\) in ISO 8601 format. |
