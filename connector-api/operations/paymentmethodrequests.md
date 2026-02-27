<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Payment method requests

## Add payment method request

> ### Restricted!
> This operation is currently in beta-test and as such it is subject to change.

Create a payment method request for the specified customer or company account to securely collect a payment method without charging the guest immediately. An optional email notification is sent to the account's email address or a specified override address. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/paymentMethodRequests/add`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "AccountId": "fadd5bb6-b428-45d5-94f8-fd0d89fece6d",
  "ExpirationUtc": "2024-02-23T23:00:00Z",
  "Description": "Please provide a payment card to secure your reservation.",
  "Notes": "Sent via Connector API",
  "PaymentMethods": [
    "PaymentCard",
    "SepaDirectDebit"
  ],
  "Email": "john.smith@example.com",
  "EmailsToSend": [
    "PaymentMethodRequestAdded"
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
| `AccountId` | string | required | Unique identifier of the account (`Customer` or `Company`) to which the payment method request is issued. |
| `ExpirationUtc` | string | required | Date and time of the payment method request's expiration in ISO 8601 format. |
| `Description` | string | required, max length 1000 characters | Description of the payment method request displayed to the customer. |
| `Notes` | string | optional, max length 1000 characters | Payment method request's internal notes. |
| `PaymentMethods` | array of [Acceptable payment methods](paymentmethodrequests.md#acceptable-payment-methods) | required | Collectable payment methods. |
| `Email` | string | optional, max length 500 characters | Account email address for sending the payment method request. If not provided, uses the email from the customer profile. |
| `EmailsToSend` | array of [Supported email types](paymentmethodrequests.md#supported-email-types) | optional | Email notifications to send. If not specified, all emails will be sent. To disable all emails send an empty list. Additional email types may be added in the future. |

#### Acceptable payment methods

* `PaymentCard`
* `SepaDirectDebit`

#### Supported email types

* `PaymentMethodRequestAdded`

### Response

```javascript
{
  "PaymentMethodRequestId": "a5f5c82d-621a-4c8a-903b-1b0a9a23b71e"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `PaymentMethodRequestId` | string | required | Unique identifier of the created payment method request. |
