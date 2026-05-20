# Reservations

This page covers specific scenarios when working with reservations via the **Mews Connector API** that require combining or interpreting multiple API response fields.

## Online check-in status

**Mews PMS** displays an "Online check-in" pseudo-state for reservations. This field is not returned directly by the API, it's a calculated status that PMS derives from guest check-in data. If your integration needs to reproduce this calculation, you can derive it from the `Options` object returned in [Get all reservations](../operations/reservations.md#get-all-reservations-ver-2023-06-06).

### How the status is derived

The derivation depends on whether the property's accommodation environment legally requires all companions to check in before a reservation is considered fully checked in. This is a per-jurisdiction requirement determined by local regulations.

{% hint style="info" %}

Whether all companions must check in is not directly exposed via the Connector API. You can retrieve the property's `AccommodationEnvironmentCode` from [Get all enterprises](../operations/enterprises.md#get-all-enterprises) and use it to determine the applicable legal requirement for that jurisdiction.

{% endhint %}

- **If the accommodation environment requires all companions to check in:**
  - The reservation is considered online checked-in when `AllCompanionsCheckedIn` is `true`.
- **Otherwise:**
  - The reservation is considered online checked-in when any of the following `Options` fields is `true`: `OwnerCheckedIn`, `AnyCompanionCheckedIn`, `AllCompanionsCheckedIn`
