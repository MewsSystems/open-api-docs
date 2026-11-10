# Unused permission policy

Mews removes a **Mews Connector API** permission if an integration has not used it for 12 months. This reduces the data an integration can expose if its credentials are leaked or stolen.

## Scope

This policy applies to all **Mews Connector API** permissions and all integrations.

## What counts as use

A permission counts as used when an integration makes a successful request that requires it. This includes requests to operations controlled by the permission and requests that load data through an extent controlled by it. For example:

- A successful request to [Get all customers](../operations/customers.md#get-all-customers) uses the `Customer` permission.
- A successful request to [Get all accounting items](../operations/accountingitems.md#get-all-accounting-items) with the `CreditCardTransactions` extent uses the `CreditCard` permission.

Requests to deprecated operations or extents also count while they still work. Failed requests — for example, those that return a validation error — do not count.

Mews counts use across all enterprises connected to the integration. If the integration uses a permission for one enterprise, it keeps that permission for all enterprises.

## When Mews removes a permission

Mews reviews permission use at regular intervals. A permission may be removed when both of these conditions are met:

- The integration has not used the permission in the last 12 months.
- The integration was created at least 12 months ago.

The age requirement gives each new integration at least 12 months to begin using its permissions.

## What happens when a permission is removed

The integration keeps its other permissions, and its access tokens remain valid. Mews does not send a separate notice; this policy page is the notice.

If the integration has not used any of its permissions for 12 months, Mews removes all of them. Until a permission is restored, the integration cannot read or change data.

A request that requires a removed permission returns `403 Forbidden`. The response message names the permission and refers to this policy. See [403 Forbidden](responses.md#403-forbidden).

## How to restore a permission

Contact the Partner Success team at [partnersuccess@mews.com](mailto:partnersuccess@mews.com) and provide:

- The integration's name.
- The permission you need.
- What the integration uses the permission for.

Partner Success reviews the request and restores the permission. This policy applies to restored permissions too: the 12-month period starts again on the date the permission is restored.

## Why Mews removes unused permissions

Each permission grants access to data. If an integration's credentials are leaked, an attacker could access the data allowed by its permissions. Removing permissions the integration does not use reduces that exposure and supports the data minimization principle of data protection law.
