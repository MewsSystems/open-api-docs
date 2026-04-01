# Glossary

Key terms and data objects used throughout the Loyalty Partner API.

### Customer

A `Customer` object holds personal information about a person, including name, email, and address.

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "birthday": "1985-07-20",
  "phoneNumber": "+9876543210",
  "address": {
    "line1": "456 Oak Avenue",
    "city": "Example City",
    "postalCode": "54321",
    "countryCode": "US"
  }
}
```

### Member

A `Member` is a customer who has a membership in the loyalty system. The membership does not need to be in an enrolled state.

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "birthday": "1985-07-20",
  "phoneNumber": "+9876543210",
  "address": {
    "line1": "456 Oak Avenue",
    "line2": "Suite 2A",
    "city": "Example City",
    "postalCode": "54321",
    "countryCode": "US",
    "countrySubdivisionCode": "NY"
  },
  "membership": {
    "providerMembershipId": "7c86eaaf-3b9c-4af6-a8b7-adb14abf7791",
    "membershipNumber": "MEM123456789",
    "tier": "Platinum",
    "points": 5000,
    "status": "enrolled",
    "expiresAt": "2025-01-14T17:30:00+02:00",
    "deeplinkUrl": "https://example.com/membership/MEM123456789"
  }
}
```

### Membership

A `Membership` object contains details about a customer's membership in the loyalty system, including tier, points, and status.

```json
{
  "providerMembershipId": "7c86eaaf-3b9c-4af6-a8b7-adb14abf7791",
  "membershipNumber": "MEM123456789",
  "tier": "Platinum",
  "points": 5000,
  "status": "enrolled",
  "expiresAt": "2025-01-14T17:30:00+02:00",
  "deeplinkUrl": "https://example.com/membership/MEM123456789"
}
```

### Membership status

The `status` field indicates the current state of a membership:

* `pending` — The enrollment is not yet complete and requires confirmation or further action. A membership with this status contains only `providerMembershipId` and `status`.
* `enrolled` — The membership is active and fully operational.
* `canceled` — The membership has expired or been manually revoked. The membership object retains all fields (tier, points, etc.).
* `declined` — The enrollment request was rejected.
* `notFound` — The membership never existed or was deleted from the partner system. A membership with this status contains only `providerMembershipId` and `status`.

### ProviderMembershipId

The `providerMembershipId` is a unique identifier assigned by the partner loyalty system to identify a specific member. It is used to link or verify membership details. If the `membershipNumber` is already globally unique in your system, it can be used as the `providerMembershipId`.
