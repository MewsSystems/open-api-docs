# Changelog

{% updates format="full" %}
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
