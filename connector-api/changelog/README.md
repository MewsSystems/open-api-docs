# Changelog

{% updates format="full" %}
{% update date="2026-04-30" %}

## Integration Webhooks documentation update

- [Integration Webhooks](../events/wh-integration.md#integration-webhooks):
  - Clarified contract and description of `Requestor` field in integration created data. Documentation-only, no change to API.

{% endupdate %}
{% update date="2026-04-23" %}

## Blocklist replaces Blacklist in customer classifications

- [Update accounts](../operations/accounts.md#update-accounts):
  - Extended [Customer update classifications](../operations/accounts.md#customer-update-classifications) request object with `Blocklist` property.
  - Extended [Customer classifications](../operations/accounts.md#customer-classifications) response object with `Blocklist` property.
  - **Deprecated:** `Blacklist` property in [Customer update classifications](../operations/accounts.md#customer-update-classifications) and [Customer classifications](../operations/accounts.md#customer-classifications). Use `Blocklist` instead.
- [Get all customers](../operations/customers.md#get-all-customers):
- [Add customer](../operations/customers.md#add-customer):
- [Update customer](../operations/customers.md#update-customer):
- [Search customers](../operations/customers.md#search-customers):
  - Extended [Customer classification](../operations/customers.md#customer-classification) enum with `Blocklist` value.
  - Removed incorrect `None` value from [Customer classification](../operations/customers.md#customer-classification) enum.
  - **Deprecated:** `Blacklist` value in [Customer classification](../operations/customers.md#customer-classification) enum. Use `Blocklist` instead.

{% endupdate %}
{% update date="2026-04-16" %}

## New export entity type: Ledger entries

- [Add export](../operations/exports.md#add-export):
- [Get all exports](../operations/exports.md#get-all-exports):
  - Extended [Exported entity type](../operations/exports.md#exported-entity-type) enum with `LedgerEntry` value (beta).
  - Extended [Export data filters](../operations/exports.md#export-data-filters) with `LedgerEntryFilters` parameter required `LedgerEntry` type.
  - Added [Export ledger entry data filters](../operations/exports.md#export-ledger-entry-data-filters) object with `Posting` date interval filter.
  - Added [Ledger entry](../operations/_export-types.md#ledger-entry) entity definition for exported ledger entry file content (beta).

{% endupdate %}
{% update date="2026-04-08" %}

## Payments and payment methods updates

- [Get all payments](../operations/payments.md#get-all-payments):
  - Extended [Payment data](../operations/payments.md#payment-data) response object with `Alternative` property.
  - Extended [Payment data discriminator](../operations/payments.md#payment-data-discriminator) with `Alternative` value.
  - Added [Alternative payment data](../operations/payments.md#alternative-payment-data) response object with [Alternative payment method type](../operations/payments.md#alternative-payment-method-type) enum.
  - **Deprecated:** `DepositCreditCard` value in [External payment type](../operations/payments.md#external-payment-type). Only supported for existing partners.
- [Add payment requests](../operations/paymentrequests.md#add-payment-requests):
  - Extended [Payment request parameters](../operations/paymentrequests.md#payment-request-parameters) request object with optional `BillId` parameter.

{% endupdate %}
{% update date="2026-03-25" %}

## March 2026 updates

- [Get all billing automations](../operations/billingautomations.md#get-all-billing-automations):
- [Add billing automations](../operations/billingautomations.md#add-billing-automations):
- [Update billing automations](../operations/billingautomations.md#update-billing-automations):
- [Update billing automations assignments](../operations/billingautomations.md#update-billing-automations-assignments):
  - Extended [Billing automation](../operations/billingautomations.md#billing-automation) response object with `UpdatedUtc`, `CreatorProfileId`, and `UpdaterProfileId` properties.
- [Get all customers](../operations/customers.md#get-all-customers):
- [Search customers](../operations/customers.md#search-customers):
- [Add customer](../operations/customers.md#add-customer):
- [Update customer](../operations/customers.md#update-customer):
  - Extended [Customer](../operations/customers.md#customer) response object with `BirthCountryCode`, `BirthCountrySubdivisionCode`, and `ItalianLotteryCode` properties.
  - Extended request objects with `BirthCountryCode`, `BirthCountrySubdivisionCode`, and `ItalianLotteryCode` parameters.
- [Update accounts](../operations/accounts.md#update-accounts):
  - Extended [Company update parameters](../operations/accounts.md#company-update-parameters) request object with `ItLotteryCode` parameter.
  - Extended [Company](../operations/accounts.md#company) response object with `ItLotteryCode` property.
- [Get all payments](../operations/payments.md#get-all-payments):
  - Extended [Payment](../operations/payments.md#payment) response object with `PaymentRequestId` property.

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
