# Vouchers

## Validate voucher

Determine if the specified voucher code is valid or not.

### Request

`[ApiBaseUrl]/api/distributor/v1/vouchers/validate`

```json
{
    "Client": "My Client 1.0.0",
    "HotelId": "3edbe1b4-6739-40b7-81b3-d369d9469c48",
    "VoucherCode": "Discount2042"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Client` | string | required | Identification of the client as described in [Authentication](../guidelines/authentication.md). |
| `HotelId` | string | required | Unique identifier of hotel. |
| `VoucherCode` | string | required | Voucher code enabling special rate offerings (case sensitive). |

### Response

```json
{
    "IsValid": false
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `IsValid` | boolean | required | Indicates whether the voucher code is valid. |
