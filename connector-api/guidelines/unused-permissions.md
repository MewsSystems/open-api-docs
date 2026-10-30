# Unused permission policy

An integration keeps only the permissions that it uses. This protects the personal and business data of Mews customers and their guests. Mews removes a permission from an integration when the integration has not used it for 12 months.

## Scope

This policy applies to all **Mews Connector API** permissions, for all integrations.

## What counts as use

An integration uses a permission when it makes a successful request that needs that permission. This includes:

- A request to an API operation that the permission controls. For example, a request to [Get all customers](../operations/customers.md#get-all-customers) uses the `Customer` permission.
- A request that loads data through an extent that the permission controls. For example, a request to [Get all accounting items](../operations/accountingitems.md#get-all-accounting-items) with the `CreditCardTransactions` extent uses the `CreditCard` permission.

Deprecated operations and deprecated extents also count. While a deprecated operation or extent still works, a successful request to it is use of the permission that controls it.

Mews counts use across all enterprises that the integration is connected to. If the integration uses a permission for one enterprise, it keeps that permission for all enterprises.

Requests that fail, for example because of a validation error, do not count as use.

## When Mews removes a permission

Mews reviews permission use at regular intervals. Mews removes a permission when both of these conditions are true:

- The integration has not used the permission in the last 12 months.
- The integration was created at least 12 months ago.

The second condition protects new integrations. They always get 12 months to start to use their permissions.

When Mews removes a permission:

- The integration keeps all its other permissions.
- The access tokens of the integration stay valid.
- Mews does not send a separate notice. This page is the notice.

If an integration does not use any of its permissions for 12 months, Mews removes all of them. The integration can then not read or change data until Mews restores a permission.

## How to know that a permission was removed

When the integration makes a request that needs a removed permission, the API returns `403 Forbidden`. The error message names the removed permission and refers to this policy. See [403 Forbidden](responses.md#403-forbidden).

## How to restore a permission

Contact the Partner Success team at [partnersuccess@mews.com](mailto:partnersuccess@mews.com) and give:

- The name of the integration.
- The permission that you need.
- What the integration uses the permission for.

Partner Success reviews the request and restores the permission. This policy applies again to a restored permission. The 12-month period starts again on the date that Mews restores it.

## Why Mews does this

Each permission gives access to data. If the credentials of an integration are leaked, an attacker gets access to all data that the permissions of the integration allow. When an integration keeps only the permissions that it uses, less data is at risk. This also supports the data minimization principle of data protection law.
