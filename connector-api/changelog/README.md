# Changelog

{% updates format="full" %}

{% update date="2026-03-12" %}

## Deprecation of Add credit card payment operation

- [Add credit card payment](../operations/payments.md#add-credit-card-payment):
  - **Deprecated** operation. Follow the [Payment automation use case](../use-cases/payment-automation.md) for processing credit card payments.
  - This operation will be discontinued on **10 January 2028**.
  - Existing integrations can keep using this operation until the discontinuation date. A detailed migration guide will be provided in Q2 2026.
  - New integrations can join the pilot program for **Mews Payments Checkout** through an embedded form or external payment request page. [Contact partner support](../contact-support/) for more information on how to join the pilot program.

{% endupdate %}

{% update date="2026-02-27" %}

## New operation: Close tasks

- [Close tasks](../operations/tasks.md#close-task):
  - New operation to close tasks.

{% endupdate %}
{% update date="2026-02-25" %}

## 25th February 2026

- [Get service availability (ver 2024-01-22)](../operations/services.md#get-service-availability-ver-2024-01-22):
  - Extended [Service availability metrics](../operations/services.md#service-availability-metrics) with `HouseUse`.
- [Add payment method request](../operations/paymentmethodrequests.md#add-payment-method-request):
  - New operation. Adds a payment method request to a customer or company account, prompting them to provide a payment method such as a payment card or SEPA direct debit.

{% endupdate %}
{% update date="2026-02-10" %}

## Restrictions removal

- Add restrictions:
- Delete restrictions:
  - **Removed** operations. See [Migration guide: Restrictions (add/delete to set/clear)](../deprecations/migration-guide-restrictions-set-clear.md) for details.

{% endupdate %}
{% update date="2026-01-20" %}

## January 2026 updates

- [Add payment requests](../operations/paymentrequests.md#add-payment-requests):
  - Extended request object with `SendPaymentRequestEmails` parameter.
- [Get all reservations (ver 2023-06-06)](../operations/reservations.md#get-all-reservations-ver-2023-06-06):
  - Extended [Commander origin](../operations/reservations.md#commander-origin) with `RoomingList`.
- [Get all taxations](../operations/taxations.md#get-all-taxations):
- [Get all tax environments](../operations/taxenvironments.md#get-all-tax-environments):
  - Updated examples. Documentation-only, no change to API.

{% endupdate %}
{% endupdates %}
