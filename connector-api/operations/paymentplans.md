<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Payment plans

## Add billing automation payment plan

Adds a payment plan connected to a `Billing automation` and returns the payment request URL associated with the created payment plan. The fulfillment of the payment request will activate the payment plan.
Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/billingAutomationPaymentPlans/add`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "BillingAutomationId": "ecd64eec-4423-4c65-b844-814b9199856d",
  "CustomerId": "fadd5bb6-b428-45d5-94f8-fd0d89fece6d",
  "Name": "Payment Plan Name",
  "PaymentRequest": {
    "PaymentMethods": [
      "PaymentCard",
      "SepaDirectDebit"
    ],
    "Message": "Your scheduled payments will be collected automatically based on your selected plan and timing.",
    "Note": "Bill for previous month included",
    "ExpirationDateUtc": "2026-10-01T12:00:00Z",
    "SendEmail": false
  },
  "PaymentOffsetDays": 5,
  "StartMonth": "2026-10"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `EnterpriseId` | string | optional | Unique identifier of the enterprise. Required when using [Portfolio Access Tokens](../concepts/multi-property.md), ignored otherwise. |
| `BillingAutomationId` | string | required | Unique identifier of the `Billing automation` associated with the payment plan. |
| `CustomerId` | string | required | Unique identifier of the `Customer` associated with the payment plan. |
| `Name` | string | required, max length 255 characters | Name of the payment plan. |
| `PaymentRequest` | [Billing automation payment plan payment request](paymentplans.md#billing-automation-payment-plan-payment-request) | required | Data related to the payment request associated with the payment plan created. |
| `PaymentOffsetDays` | integer | required | Number of days since the bill creation when the payment will be charged. |
| `StartMonth` | string | optional | Specifies the month when the payment plan begins collecting payments, in the 'YYYY-MM' format. The month must be in the future. If a value is not set, it'll start with the earliest available bill created from billing automation. |

#### Billing automation payment plan payment request

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `PaymentMethods` | array of [Available payment plan payment methods](paymentplans.md#available-payment-plan-payment-methods) | required | Allowed payment methods to use for the payment plan. Currently only `Payment card` and `SEPA Direct Debit` are supported. |
| `Message` | string | required, max length 1000 characters | Message for customer in the payment request email. |
| `Note` | string | optional, max length 2000 characters | Internal note for the payment request. |
| `ExpirationDateUtc` | string | required | Expiration date (UTC time) of the payment request. Must be within 30 days of payment plan creation. ISO-8601 format. |
| `SendEmail` | boolean | required | Specifies whether a payment request email is sent to the customer. |

#### Available payment plan payment methods

* `Ideal` - iDEAL
* `PaymentCard` - Payment card
* `ApplePay` - Apple Pay
* `GooglePay` - Google Pay
* `SepaDirectDebit` - SEPA Direct Debit
* `All`

### Response

```javascript
{
  "PaymentRequestUrl": "https://example.com/payment-request-url"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `PaymentRequestUrl` | string | required | Payment request URL associated with the created payment plan. |
