---
layout: editorial
---

# Mews Payments Checkout

This section describes how to use **Mews Payments Checkout**, an embeddable checkout application that enables you to collect payments and payment methods directly within your own application, eliminating the need to redirect users to a separate Mews payment request page. The checkout handles all API communication for processing payments and recording data in Mews, including PCI-DSS compliant capture of payment card details. For connecting to Mews Payment Terminals to take payments from customers, refer to [Mews Payment Terminals](https://docs.mews.com/connector-api/use-cases/mews-terminals).

{% hint style="info" %}
### PCI Compliance

* [Mews PCI compliance](https://help.mews.com/s/article/pci-compliance?language=en_US)
* [Mews PCI certificate](https://www.mews.com/en/platform-documentation)
{% endhint %}

## How it works

Mews Payments Checkout is a JavaScript SDK that renders a fully responsive payment experience inside an iframe injected into a container element on your page. You use the **Mews Connector API** to create a [payment request](https://docs.mews.com/connector-api/operations/paymentrequests#add-payment-requests) or a [payment method request](https://docs.mews.com/connector-api/operations/paymentmethodrequests#add-payment-method-request), then pass the returned identifier to the checkout application, which takes care of the rest – payment method selection, card data capture, 3D Secure authentication, and posting the resulting payment or payment method into Mews.

Supported payment methods include payment cards, Apple Pay, Google Pay, iDEAL, and SEPA Direct Debit.

The checkout supports two integration goals:

* **Collect a payment** – charge the guest a specific amount, either against a pre-created payment request or directly with only an enterprise ID and amount.
* **Collect a payment method** – store a payment card or SEPA Direct Debit mandate against the guest profile, with consent, for future charges.

Application updates are deployed automatically without requiring configuration changes on your side.

## Integration steps

{% stepper %}
{% step %}
### Step 1: Add the checkout loading script

Add the Mews Payments Checkout script to your page. The script loads asynchronously and initializes the global `Mews.PaymentCheckout` object.

Script URL: `https://cdn.mews.com/payments/checkout-embed.js`

Place the following `<script>` code snippet in the `<head>` of your web page's HTML, preferably as close to the opening `<head>` tag as possible.

```html
<head>
  <script src="https://cdn.mews.com/payments/checkout-embed.js"></script>
  ...
</head>
```
{% endstep %}

{% step %}
### Step 2: Choose your payment flow

#### Flow 1: Capture a payment request

If you already have a guest profile in Mews, or guest details are collected before displaying the checkout and you don't want the guest to resubmit their information, use this flow to charge them a specific amount. The checkout renders only payment-related fields, as all guest details are already known.

To proceed, create a payment request for the desired amount and currency using [Add payment requests](https://docs.mews.com/connector-api/operations/paymentrequests#add-payment-requests). Take note of the payment request `Id` in the API response.

When a payment request is created, by default Mews sends an email to the guest to fulfill the payment request. For the checkout use case, the guest sees the checkout immediately, so there's usually no need to send an additional email. To skip sending the email, set the `SendPaymentRequestEmails` property to `false` in the request.

```javascript
{
  "PaymentRequests": [
    {
      ...payment request parameters...
    }
  ],
  "SendPaymentRequestEmails": false
}
```

| 'How to' use case                                | API Operations                                                                                                      |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| How to create a payment request for the checkout | [Add payment requests](https://docs.mews.com/connector-api/operations/paymentrequests#add-payment-requests)         |
| How to check the state of a payment request      | [Get all payment requests](https://docs.mews.com/connector-api/operations/paymentrequests#get-all-payment-requests) |
| How to cancel an unfulfilled payment request     | [Cancel payment requests](https://docs.mews.com/connector-api/operations/paymentrequests#cancel-payment-requests)   |

#### Flow 2: Capture a payment

This flow removes the dependency on pre-creating a payment request and guest account in Mews. It is sufficient to provide an enterprise ID and the desired amount and currency to the checkout's loading configuration; the checkout application then collects the payer details automatically. After the guest clicks the pay button, a guest account is created in Mews, the payment method is collected, and the payment is created and linked to the guest's account.

* **Option A: Express checkout** – a one-click payment option available for Apple Pay and Google Pay. The guest confirms the payment in their device's native interface, and the payment is created. All details are captured automatically.
* **Option B: Payment method selection** – for other payment methods (payment card, SEPA Direct Debit, iDEAL, etc.), the guest provides their payment method and billing details. A guest account is then created in Mews, and the payment is linked to it.

{% hint style="warning" %}
**Verify the charged amount server-side**

In Flow 2, the `amount` is supplied in the client-side loading configuration (see [Context](./#context)) and can be altered in the browser. Do not treat it as authoritative. After the payment succeeds, reconcile the charged amount against your records using [Get all payments](https://docs.mews.com/connector-api/operations/payments#get-all-payments) with the `paymentId` from the `onSuccess` callback.
{% endhint %}
{% endstep %}

{% step %}
### Step 3: Load the checkout application

Once the `Mews.PaymentCheckout` object is initialized (Step 1) and the payment collection flow is selected (Step 2), load the checkout application using either the payment request ID from the API response (Flow 1) or a `context` object (Flow 2).

Method: `Mews.PaymentCheckout.load(configuration)`

#### Configuration

| Parameter               | Required         | Type        | Description                                                                                                                                                                                                           |
| ----------------------- | ---------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `containerId`           | yes              | string      | The ID of the DOM element where the checkout application will be injected.                                                                                                                                            |
| `requestId`             | yes (for Flow 1) | GUID string | Payment request ID from [Flow 1: Capture a payment request](./#flow-1-capture-a-payment-request), or payment method request ID when [collecting a payment method](./#collecting-a-payment-method-for-future-charges). |
| `context`               | yes (for Flow 2) | object      | See [Context](./#context).                                                                                                                                                                                            |
| `dataBaseUrl`           | no               | string      | Use `https://app.mews-demo.com` for testing in the demo environment. See [Testing](./#testing).                                                                                                                       |
| `onSuccess`             | no               | function    | Callback invoked when a successful event occurs. See [Callback events](./#callback-events).                                                                                                                           |
| `onFailure`             | no               | function    | Callback invoked when a failure event occurs. See [Callback events](./#callback-events).                                                                                                                              |
| `enableTracking`        | no               | boolean     | When a guest declines cookies or tracking, set to `false` to prevent interaction tracking. Defaults to `true`.                                                                                                        |
| `idealRedirectUrl`      | no               | string      | Redirect URL after completing an iDEAL payment. Defaults to the current URL where the checkout is displayed. Must match the origin of the embedding site.                                                             |
| `paymentId`             | no               | GUID string | When provided, the application displays the current payment state. Used primarily for iDEAL payments after redirect upon guest confirmation. See [iDEAL payments](./#ideal-payments).                                 |
| `enabledPaymentMethods` | no               | array       | Limits available payment methods. Possible values: `paymentCard`, `ideal`, `sepaDirectDebit`, `applePay`, `googlePay`. See [Limit available payment methods](./#limit-available-payment-methods).                     |
| `styles`                | no               | object      | See [Style customization](./#style-customization).                                                                                                                                                                    |
| `layout`                | no               | object      | See [Layout customization](./#layout-customization).                                                                                                                                                                  |
| `languageCode`          | no               | string      | See [Language customization](./#language-customization).                                                                                                                                                              |
| `multicurrency`         | no               | object      | See [Multicurrency](./#multicurrency).                                                                                                                                                                                |
| `payer`                 | no               | object      | See [Billing details form display options](./#billing-details-form-display-options).                                                                                                                                  |
| ~~`paymentRequestId`~~  | no               | GUID string | **Deprecated!** Use `requestId` instead.                                                                                                                                                                              |
| ~~`onPaymentSuccess`~~  | no               | function    | **Deprecated!** Use `onSuccess` instead. Callback invoked when a payment is charged (or submitted, for SEPA payments). Receives the Mews payment ID (GUID string) as an argument.                                     |
| ~~`onPaymentFailure`~~  | no               | function    | **Deprecated!** Use `onFailure` instead. Callback invoked when a payment error occurs.                                                                                                                                |

**Context**

Required for [Flow 2: Capture a payment](./#flow-2-capture-a-payment).

| Parameter      | Required | Type        | Description                                                 |
| -------------- | -------- | ----------- | ----------------------------------------------------------- |
| `enterpriseId` | yes      | GUID string | The unique identifier of the enterprise (property) in Mews. |
| `amount`       | yes      | object      | The amount to be charged. See [Amount](./#amount).          |

**Amount**

| Parameter  | Required | Type   | Description                                                                                                                                         |
| ---------- | -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency` | yes      | string | The currency of the payment, in ISO 4217 format (e.g. `USD`, `EUR`, `GBP`). The currency must be accepted by your property's configuration in Mews. |
| `value`    | yes      | number | The amount to be charged in the specified currency (e.g. `49.99`).                                                                                  |

#### Callback events

The `onSuccess` callback is invoked when a payment or payment method collection succeeds.

| Type                       | Parameter shape                                                             | Description                                                                |
| -------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `payment-charged`          | `{ type: "payment-charged", paymentId: string, paymentMethodId: string }`   | Payment was charged successfully.                                          |
| `payment-submitted`        | `{ type: "payment-submitted", paymentId: string, paymentMethodId: string }` | Payment was submitted for processing. Only for SEPA Direct Debit payments. |
| `payment-method-collected` | `{ type: "payment-method-collected", paymentMethodId: string }`             | Payment method was collected successfully.                                 |

The `onFailure` callback is invoked when a payment or payment method collection fails.

| Type                                | Parameter shape                                                | Description                          |
| ----------------------------------- | -------------------------------------------------------------- | ------------------------------------ |
| `payment-failure`                   | `{ type: "payment-failure", error: string }`                   | Payment charge or submission failed. |
| `payment-method-collection-failure` | `{ type: "payment-method-collection-failure", error: string }` | Payment method collection failed.    |

The `error` property is a human-readable message intended for logging and diagnostics. Its content is not a stable enumeration and can change, so branch on `type` rather than parsing `error`. Always handle both failure types – payment failures are common (declined cards, failed 3D Secure, insufficient funds) and should surface a retry path to the guest.

#### Examples

Loading configuration example – Flow 1: Capture a payment request:

```html
<!doctype html>
<html lang="en">
  <head>
    ...
    <script src="https://cdn.mews.com/payments/checkout-embed.js"></script>
  </head>
  <body>
    <div id="payment-checkout-container"></div>
    <script>
      window.Mews.PaymentCheckout.load({
        containerId: 'payment-checkout-container',
        requestId: '148f529f-d6e1-487d-9876-b369008af249',
      });
    </script>
  </body>
</html>
```

Loading configuration example – Flow 2: Capture a payment:

```javascript
window.Mews.PaymentCheckout.load({
  containerId: 'payment-checkout-container',
  context: {
    enterpriseId: 'fb4ac177-7829-4d63-9999-b003008db555',
    amount: {
      currency: 'EUR',
      value: 100,
    }
  },
});
```

Example in a React application:

```jsx
// paymentRequestId: string – the payment request ID from Flow 1
export const MewsPaymentCheckout = ({ paymentRequestId }) => {
  const checkoutContainerRef = useRef(null);

  useEffect(() => {
    if (!checkoutContainerRef.current) {
      return;
    }
    window.Mews.PaymentCheckout.load({
      containerId: checkoutContainerRef.current.id,
      requestId: paymentRequestId,
      onSuccess: (event) => {
        // event.type: "payment-charged" | "payment-submitted" | "payment-method-collected"
        console.log('Payment checkout succeeded', event);
      },
      onFailure: (event) => {
        // Branch on event.type; event.error is a human-readable message, not a stable code
        console.error('Payment checkout failed', event.type, event.error);
      },
    });
  }, [paymentRequestId]);

  return (
    <div ref={checkoutContainerRef} id="payment-checkout-container"></div>
  );
};
```
{% endstep %}

{% step %}
### Step 4: All done

Setup is complete. The Mews Payments Checkout application handles all API communication for processing payments and recording data in Mews.

The application renders inside an iframe injected into the container element specified in Step 3. The application is fully responsive and adapts to its container dimensions. If initialization or communication is blocked, [contact support](https://docs.mews.com/connector-api/contact-support).
{% endstep %}
{% endstepper %}

## Testing

To test the checkout application, set the `dataBaseUrl` configuration parameter in Step 3 to `https://app.mews-demo.com`. This loads the application in the Mews demo environment.

{% hint style="warning" %}
### Remove dataBaseUrl in production

`dataBaseUrl` points the checkout at the demo environment. Remove it (or leave it unset) in your production build, otherwise real traffic is silently sent to the Mews demo environment and no live payments are taken.
{% endhint %}

{% hint style="info" %}
### Demo environment

If you chose [Flow 1: Capture a payment request](./#flow-1-capture-a-payment-request), the payment request (Step 2) must also be created in the Mews [demo environment](https://docs.mews.com/connector-api/guidelines/environments).
{% endhint %}

## Collecting a payment method for future charges

Instead of collecting a payment, you can use the checkout to collect a payment method with the guest's consent for future charges. The payment method is stored against the guest profile in Mews and can later be charged manually in **Mews Operations**, automatically via Mews automation, or programmatically via the **Mews Connector API**.

Currently supported payment methods for collection: payment card and SEPA Direct Debit.

{% stepper %}
{% step %}
### Create a payment method request

Instead of creating a payment request, create a payment method request using [Add payment method request](https://docs.mews.com/connector-api/operations/paymentmethodrequests#add-payment-method-request). Take note of the `PaymentMethodRequestId` in the API response.

{% hint style="warning" %}
#### Restricted

The [Add payment method request](https://docs.mews.com/connector-api/operations/paymentmethodrequests#add-payment-method-request) operation is currently in beta-test and as such is subject to change.
{% endhint %}

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "AccountId": "fadd5bb6-b428-45d5-94f8-fd0d89fece6d",
  "ExpirationUtc": "2026-12-29T12:00:00Z",
  "Description": "Payment method required",
  "Notes": "Internal notes",
  "PaymentMethods": ["PaymentCard", "SepaDirectDebit"],
  "EmailsToSend": []
}
```

{% hint style="info" %}
#### Emails to send

When a payment method request is created, Mews can email the guest to fulfill it. To disable all emails, send an empty list in `EmailsToSend`. Because the guest sees the checkout immediately, an empty array is the preferred value when collecting payment methods using the checkout.
{% endhint %}
{% endstep %}

{% step %}
### Load the checkout application

Use the `PaymentMethodRequestId` from the API response as the `requestId` in the loading configuration, exactly as in [Step 3](./#step-3-load-the-checkout-application). When the guest's payment method is successfully collected and stored in Mews, the `onSuccess` callback is triggered with type `payment-method-collected` and the `paymentMethodId` of the newly created payment method.

```javascript
window.Mews.PaymentCheckout.load({
  containerId: 'payment-checkout-container',
  requestId: 'd6737f7a-3244-4e9d-9790-b3fa00b21433',
  onSuccess: (event) => { /* event.paymentMethodId */ }
});
```
{% endstep %}

{% step %}
### Charge the collected payment method

Once collected, the payment method becomes available in the guest profile in **Mews Operations**, under **Payments > Payment methods**, and can be charged in three ways:

* **Manually in Mews Operations** – property staff charge the stored payment method directly from the guest profile.
* **Automatically with Mews automation** – create a reservation using [Add reservations](https://docs.mews.com/connector-api/operations/reservations#add-reservations) and set `CreditCardId` in the [reservation parameters](https://docs.mews.com/connector-api/operations/reservations#reservation-parameters) to the received payment method ID. The payment method is then charged automatically by Mews according to the rate's [payment policy schedule](https://help.mews.com/s/article/how-to-set-up-payment-automation).
* **Programmatically via the Mews Connector API** – charge the payment method directly using [Charge credit card](https://docs.mews.com/connector-api/operations/creditcards#charge-credit-card). This is currently supported only for collected payment cards.

| 'How to' use case                                                  | API Operations                                                                                                                |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| How to request a payment method from a guest                       | [Add payment method request](https://docs.mews.com/connector-api/operations/paymentmethodrequests#add-payment-method-request) |
| How to charge a collected payment method on a reservation schedule | [Add reservations](https://docs.mews.com/connector-api/operations/reservations#add-reservations)                              |
| How to charge a collected payment card using Mews Payments         | [Charge credit card](https://docs.mews.com/connector-api/operations/creditcards#charge-credit-card)                           |
| How to check if a payment method is stored against a guest profile | [Get all credit cards](https://docs.mews.com/connector-api/operations/creditcards#get-all-credit-cards)                       |
{% endstep %}
{% endstepper %}

## Additional use cases

### Reloading

To load a new payment request ID, call `Mews.PaymentCheckout.load(configuration)` with the updated configuration. The application detects changes and reloads the relevant parts automatically.

### Removing the application

To fully remove the checkout application from the screen, use the `Mews.PaymentCheckout.destroy()` method.

### Displaying Apple Pay and Google Pay

To enable Apple Pay in the checkout application, request domain activation using the [Apple Pay domain activation form](https://cmroytqod000at6wk80hyftzp.zapier.app/) with the URL of the site embedding the application. Mews will configure this payment method for your site. Google Pay requires no configuration and is displayed automatically.

Conditions that the guest's browser needs to fulfill to display these payment methods:

| Payment method | Condition                                        |
| -------------- | ------------------------------------------------ |
| Apple Pay      | Safari browser with a card in its Wallet         |
| Google Pay     | Chrome browser with an activated Google Pay card |

### iDEAL payments

When an iDEAL payment is selected, the guest is redirected to complete the payment. After completion, the guest returns to the embedding URL by default. The checkout application automatically uses a `paymentId` query parameter to display the payment result.

To redirect to a different URL, set `idealRedirectUrl` when loading the application. The URL must match the origin of the embedding site.

### Content Security Policy

If a Content Security Policy (CSP) is configured on your site, enable the following domains for the checkout application to function correctly:

* `*.mews.com`
* `https://www.recaptcha.net`
* `https://www.google.com/recaptcha/`
* `https://recaptcha.google.com/recaptcha/`
* `https://www.gstatic.com/recaptcha/`
* `https://pay.datatrans.com/upp/payment/js/secure-fields-2.0.0.min.js`

{% hint style="info" %}
#### PCI Proxy

The `pay.datatrans.com` domain is required for PCI Proxy, the PCI-DSS compliant solution used by Mews Payments to process payment cards.
{% endhint %}

### Language customization

By default, the checkout displays text in the property's default language. To customize the application's language, load it with a specified language code from the [supported language codes](https://docs.mews.com/booking-engine-guide/booking-engine-api/guidelines/supported-language-codes).

```javascript
window.Mews.PaymentCheckout.load({
  containerId: 'payment-checkout-container',
  requestId: '148f529f-d6e1-487d-9876-b369008af249',
  languageCode: "es-ES", // Spanish localization
});
```

### Limit available payment methods

By default, all available payment methods are detected from the property's configuration in Mews, making them available for any checkout instance. To limit payment methods, load the checkout with the `enabledPaymentMethods` array. Possible values: `paymentCard`, `ideal`, `sepaDirectDebit`, `applePay`, `googlePay`.

The checkout still verifies that each payment method is correctly configured and enabled in Mews, but limits the payment method selection to the specified setting.

```javascript
window.Mews.PaymentCheckout.load({
  containerId: 'payment-checkout-container',
  requestId: '148f529f-d6e1-487d-9876-b369008af249',
  enabledPaymentMethods: ["paymentCard"], // offers only a payment card as an available payment method
});
```

### Layout customization

Layout customization is limited, as most elements are part of the Mews product, which ensures consistency and best practices across all implementations.

| Configuration property              | Expected value | Description                          |
| ----------------------------------- | -------------- | ------------------------------------ |
| `layout.hidden.surchargeSummary`    | boolean        | Hides the surcharge summary section. |
| `layout.hidden.paymentMethodHeader` | boolean        | Hides the "Payment method" header.   |

### Multicurrency

The Multicurrency (MCCY) feature lets guests pay in their preferred currency rather than the property's default currency, which can improve conversion.

When a guest opens the checkout, the currency is pre-selected – either detected from their location, or defaulting to the property's currency. If this currency differs from the guest's preferred one, they can change it at any time using the currency picker. The exchange rate and any applicable fees are shown before the guest completes payment, and the displayed amount updates immediately, so what the guest sees is what they pay.

| Parameter                  | Required | Type    | Description                                                                                                                                        |
| -------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `multicurrency.enabled`    | no       | boolean | Enables multicurrency support, allowing the guest to see and pay in a currency different from the payment gateway account currency.                |
| `multicurrency.autoDetect` | no       | boolean | Enables automatic detection of the guest's local currency via their IP address. When enabled, the detected currency is pre-selected automatically. |

{% hint style="info" %}
#### Prerequisites

Multicurrency can only be enabled in the checkout if the [multicurrency feature](https://help.mews.com/s/article/Multicurrency-by-Mews-Payments-FAQ) is enabled for the property in Mews. Currently, multicurrency is available only for [Flow 1: Capture a payment request](./#flow-1-capture-a-payment-request).
{% endhint %}

### Billing details form display options

The billing details form is displayed automatically for [Flow 2: Capture a payment](./#flow-2-capture-a-payment) to collect the payer details. The payer details are collected from this form, and when the guest clicks the pay button, a guest account is first created in Mews and a payment is then created for that account.

If the guest details are known before loading the checkout, they can be passed to the loading configuration to avoid asking the guest for the same details twice. In this case, the billing details form is automatically hidden, as all details are already known. To display the provided details in the form instead, enable the `prefillDetails` option; the form is pre-filled so the guest can make any adjustments.

The `payer` object:

| Parameter        | Required | Type    | Description                                                                                                           |
| ---------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `details`        | yes      | object  | The payer's billing information. When provided, the billing details form is not displayed. See [Details](./#details). |
| `prefillDetails` | no       | boolean | When enabled, the provided details are pre-filled into the form.                                                      |

#### Details

| Parameter   | Required | Type   | Description                                                           |
| ----------- | -------- | ------ | --------------------------------------------------------------------- |
| `lastName`  | yes      | string | The payer's last name (surname).                                      |
| `firstName` | no       | string | The payer's first name (given name).                                  |
| `email`     | yes      | string | The payer's email address. Must be a valid email.                     |
| `telephone` | no       | string | The payer's phone number. Must be a valid phone number when provided. |
| `address`   | no       | object | The payer's billing address. See [Address](./#address).               |

#### Address

| Parameter      | Required | Type   | Description                                                        |
| -------------- | -------- | ------ | ------------------------------------------------------------------ |
| `addressLine1` | no       | string | First line of the billing address (street name and number).        |
| `addressLine2` | no       | string | Second line of the billing address (apartment, suite, unit, etc.). |
| `city`         | no       | string | City of the billing address.                                       |
| `postalCode`   | no       | string | Postal / ZIP code of the billing address.                          |
| `countryCode`  | no       | string | Country of the billing address, as an ISO country code.            |

## Style customization

To customize the visual appearance of the checkout application to align with your site's branding and theme, include a `styles` object within the configuration object when loading the application.

```javascript
window.Mews.PaymentCheckout.load({
  containerId: 'payment-checkout-container',
  requestId: '148f529f-d6e1-487d-9876-b369008af249',
  styles: { /* style customization */ },
});
```

Style overrides are organized into sections, each enabling granular customization of specific components. All style overrides are optional; configure as many or as few properties as needed. All color overrides support hex values (3, 6, or 8 digits). The 8-digit hex format (`#RRGGBBAA`) includes an alpha/transparency channel, where the last two digits represent opacity (`00` = fully transparent, `FF` = fully opaque).

{% hint style="warning" %}
### Global application

Styles are applied globally across the application. For example, modifying a text color affects all elements using that token throughout the application. Changing a single style property applies consistently across all related elements without requiring multiple configurations, but changes propagate throughout the application, so consider the effect of each modification carefully.
{% endhint %}

### Global styles

| Style property                         | Configuration property       | Expected value         |
| -------------------------------------- | ---------------------------- | ---------------------- |
| Text color primary                     | `global.textColorPrimary`    | color hex value        |
| Text color secondary                   | `global.textColorSecondary`  | color hex value        |
| Text color tertiary                    | `global.textColorTertiary`   | color hex value        |
| Border radius                          | `global.borderRadius`        | number, 0–100          |
| Background color                       | `global.backgroundColor`     | color hex value        |
| Container min-width (default `320px`)  | `global.container.minWidth`  | px, rem, em, %, vw, vh |
| Container max-width (default `640px`)  | `global.container.maxWidth`  | px, rem, em, %, vw, vh |
| Container width (default `100%`)       | `global.container.width`     | px, rem, em, %, vw, vh |
| Container min-height (default `750px`) | `global.container.minHeight` | px, rem, em, %, vw, vh |

### Payment method selection styles

Payment method selection styles are organized into two groups: **selected** applies styling to the currently selected payment method, and **unselected** applies styling to all non-selected payment methods, allowing you to create visual contrast between available and active options.

| Style property                           | Configuration property                                    | Expected value  |
| ---------------------------------------- | --------------------------------------------------------- | --------------- |
| Selected: background color               | `paymentMethodsSelection.selected.backgroundColor`        | color hex value |
| Selected: border color                   | `paymentMethodsSelection.selected.borderColor`            | color hex value |
| Selected: background color, hover state  | `paymentMethodsSelection.selected.hover.backgroundColor`  | color hex value |
| Selected: border color, hover state      | `paymentMethodsSelection.selected.hover.borderColor`      | color hex value |
| Selected: background color, active state | `paymentMethodsSelection.selected.active.backgroundColor` | color hex value |
| Unselected: border color                 | `paymentMethodsSelection.unselected.borderColor`          | color hex value |
| Unselected: border color, hover state    | `paymentMethodsSelection.unselected.hover.borderColor`    | color hex value |
| Unselected: border color, active state   | `paymentMethodsSelection.unselected.active.borderColor`   | color hex value |

### Button styles

| Style property                   | Configuration property            | Expected value  |
| -------------------------------- | --------------------------------- | --------------- |
| Background color                 | `button.backgroundColor`          | color hex value |
| Text color                       | `button.textColor`                | color hex value |
| Background color, hover state    | `button.hover.backgroundColor`    | color hex value |
| Background color, active state   | `button.active.backgroundColor`   | color hex value |
| Background color, disabled state | `button.disabled.backgroundColor` | color hex value |

### Input styles

| Style property            | Configuration property    | Expected value  |
| ------------------------- | ------------------------- | --------------- |
| Border color              | `input.borderColor`       | color hex value |
| Text color, error state   | `input.error.textColor`   | color hex value |
| Border color, error state | `input.error.borderColor` | color hex value |
| Border color, hover state | `input.hover.borderColor` | color hex value |
| Border color, focus state | `input.focus.borderColor` | color hex value |

### Loading spinner styles

The loading spinner component is composed of three distinct color properties that together form the visual indicator. Each color can be customized independently to match your brand palette.

| Style property  | Configuration property   | Expected value  |
| --------------- | ------------------------ | --------------- |
| Primary color   | `spinner.primaryColor`   | color hex value |
| Secondary color | `spinner.secondaryColor` | color hex value |
| Tertiary color  | `spinner.tertiaryColor`  | color hex value |

### Info banner styles

The info banner displayed for certain payment methods, such as Apple Pay, Google Pay, iDEAL, and SEPA Direct Debit, can be customized to better match your theme.

| Style property   | Configuration property       | Expected value  |
| ---------------- | ---------------------------- | --------------- |
| Background color | `infoBanner.backgroundColor` | color hex value |
| Icon color       | `infoBanner.iconColor`       | color hex value |

### Status card styles

The status card is displayed when the guest clicks the pay button, showing the current state of the payment.

| Style property        | Configuration property           | Expected value  |
| --------------------- | -------------------------------- | --------------- |
| Icon background color | `statusCard.iconBackgroundColor` | color hex value |

### Out of scope for style customization

The following aspects are not currently configurable via the public `styles` object:

* **Layout and structure** – page layout, component positioning, and the overall flow of the checkout are fixed. The `styles` object only affects visual tokens (colors, border radius), not the layout engine.
* **Copy and content** – text labels, helper copy, error messages, and legal text.
* **Payment method behavior and ordering** – the order, visibility, and grouping of payment methods (e.g. cards vs. wallets vs. SEPA) are defined by business rules and product configuration, not theming.
* **Typography** – font family, size, and weight.

### Design and accessibility best practices

Aim for at least WCAG AA contrast (4.5:1) between `global.textColorPrimary` and `global.backgroundColor`, and between `button.textColor` and `button.backgroundColor`. Use `textColorPrimary` for primary information and labels, reserving `textColorSecondary` and `textColorTertiary` for supporting information, to avoid low-contrast UIs.

Make sure hover and active states visibly differ from the default state, keep disabled buttons distinguishable from active ones without resembling error states, and map the pay button to your brand's primary button style. Choose spinner colors that stay visible on the background and avoid pure red or error colors, to prevent implying a failure state while the payment is still processing.
