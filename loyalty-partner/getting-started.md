# Getting started

This page walks you through the key steps to integrate with the **Mews Loyalty Partner API** – from confirming your use case fits the API to going live with a pilot property.

### Is this the right API?

The Loyalty Partner API is for **loyalty program providers** that need to look up and enroll members inside Mews. It uses a reverse API model: Mews calls your system whenever a **Mews Operations** user performs a loyalty action such as searching for a member or enrolling a customer.

If your primary need is syncing customer or reservation data with Mews as a generic CRM, use the [Connector API](https://app.gitbook.com/s/8QGgEdFlLPx3GworPLr8/) instead.

{% stepper %}
{% step %}

### Get in touch

Contact us at [partnersuccess@mews.com](mailto:partnersuccess@mews.com) with the subject line `Loyalty Partner API`. Include your intended use cases and the types of properties or chains you plan to serve.

We'll follow up to confirm fit and discuss next steps.
{% endstep %}

{% step %}

### Agree scope & get access

Once initial fit is confirmed:

1. **Review the public documentation** and the OpenAPI specification to familiarize yourself with the operations you'll need to implement.
2. **You provide your integration details** – share your API base URL and the bearer token Mews should use to authenticate requests to your API.
3. **Mews sets up access** – we provision a demo property with Loyalty integration for you to test against.

{% hint style="info" %}
For details on how Mews authenticates requests to your API, see [Authentication](guidelines/authentication.md).
{% endhint %}
{% endstep %}

{% step %}

### Implement & self-test

Implement the operations defined in the OpenAPI specification and test your integration end-to-end. At minimum, validate the following flows:

- **Member search** – Mews queries your API to find matching members for a given customer.
- **Enroll** – Mews calls your API to create a new membership for a customer.
- **List & refresh** – Mews retrieves current membership data for one or more customers.
- **Link & unlink** – Mews links or removes an existing partner membership from a customer profile.
- **Checkout event handling** – if applicable to your use case, verify that your API handles checkout notifications correctly.

{% hint style="info" %}
For implementation context and workflow examples, see the [Workflows overview](workflows/overview.md).
{% endhint %}
{% endstep %}

{% step %}

### Certification review

Once your implementation is complete and self-tested, we conduct a joint review to validate that the integration meets the requirements and works as expected in the Mews demo environment. We'll test all key flows and provide feedback for any necessary adjustments.
{% endstep %}

{% step %}

### Go live with a pilot

Once the certification review is complete, we roll out the integration to a first property or chain. We monitor usage (lookups, enrollments, and other events) during the initial period to catch any issues early.

{% endstep %}
{% endstepper %}
