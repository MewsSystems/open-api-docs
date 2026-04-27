# Allowances

## Overview

An `Allowance` is a packaged spending benefit that a `Property` attaches to a `Rate`, giving guests a defined amount they can redeem against specified on-property services — for example, food & beverage, spa, or minibar charges. Rather than discounting the room `Rate`, the `Property` adds value while protecting its Average Daily Rate (ADR).

From an accounting perspective, the allowance represents a liability the `Property` assumes at activation: the `Property` has committed to absorbing qualifying charges on the guest's behalf, up to the specified amount. When an allowance is activated for a `Reservation`, the system posts an allowance product order item (a `ProductOrder` with `ProductType = Allowance`) to the guest's `Bill`. When a qualifying charge is subsequently posted — one whose `Accounting Category` matches the allowance's permitted consumption categories — the system automatically creates an `AllowanceDiscount` order item that offsets the charge up to the remaining allowance balance.

Any unspent allowance is retained by the `Property` as additional revenue, which is known as `Breakage`.

Integrations — such as point-of-sale (POS) systems, accounting systems, and kiosk or self-service applications — can use the **Mews Connector API** to:

* post charges that are automatically offset against a guest's allowance
* retrieve allowance-related order items for billing, reconciliation, and balance reporting

## Key concepts

There are several types of order item specific to allowances. Understanding these is essential for working with allowance data through the API.

### Allowance-related order item types

| Order item type | What it represents |
| --- | --- |
| `ProductOrder` (with `ProductType = Allowance`) | The allowance product — the liability posted to the guest's bill when the allowance is activated. |
| `AllowanceDiscount` | A discount automatically applied to a qualifying charge, offsetting the charge up to the remaining allowance balance. |
| `AllowanceBreakage` | Unspent allowance retained by the `Property` as revenue at checkout. See `Breakage`. |
| `AllowanceContraBreakage` | The accounting contra entry for breakage, ensuring double-entry accounting integrity. |

### Automatic discounting

When a charge is posted to a guest who has an active allowance, and the charge's accounting category matches the allowance's permitted consumption categories, the system automatically creates an `AllowanceDiscount` item to offset the charge.

{% hint style="info" %}
No additional API call is needed to trigger the discount.
{% endhint %}

## Retrieving allowance-related order items

Use [`Get all order items`](../operations/orderitems.md#get-all-order-items) to retrieve order items related to allowances.

You can filter:

* by reservation using `ServiceOrderIds`
* by bill using `BillIds`
* by time period using, for example, `CreatedUtc`, `UpdatedUtc`, or `ClosedUtc`
* by item type using `Types`

### "How to" use cases (retrieving items)

| "How to" use case | API operations |
| --- | --- |
| How to get all order items for a reservation (including allowance items) | [`Get all order items`](../operations/orderitems.md#get-all-order-items) (use `ServiceOrderIds`) |
| How to get allowance discount items | [`Get all order items`](../operations/orderitems.md#get-all-order-items) (use `Types` filter with `AllowanceDiscount`) |
| How to get breakage items | [`Get all order items`](../operations/orderitems.md#get-all-order-items) (use `Types` filter with `AllowanceBreakage`) |
| How to get all allowance-related items on a bill | [`Get all order items`](../operations/orderitems.md#get-all-order-items) (use `BillIds`) |
| How to get allowance items over a period | [`Get all order items`](../operations/orderitems.md#get-all-order-items) (use `ClosedUtc` or `ConsumedUtc`) |

## Identifying allowance products

To identify whether an order item is an allowance product (as opposed to a regular product), check the item's `Data` field.

An order item with:

* `Data.Discriminator` set to `Product`, and
* `Data.Product.ProductType` set to `Allowance`

is an **allowance product** — the allowance amount itself, as opposed to a charge or discount.

### "How to" use cases (identifying products)

| "How to" use case | API operations |
| --- | --- |
| How to identify allowance product items among order items | [`Get all order items`](../operations/orderitems.md#get-all-order-items) (check `Data.Product.ProductType = Allowance`) |

## Working with allowance discounts

When you retrieve order items of type `AllowanceDiscount`, the item's `Data` field contains additional information that links the discount back to both:

* the original charge
* the allowance product that funded it

Specifically, an [`Order item`](../operations/orderitems.md#order-item) with `Data.Discriminator` set to `AllowanceDiscount` will have:

* `DiscountedOrderItemId` — the unique identifier of the original charge item that was discounted.
* `AllowanceProductOrderItemId` — the unique identifier of the allowance product order item which consumed the item.

You can use [`Get all order items`](../operations/orderitems.md#get-all-order-items) with the `OrderItemIds` filter to fetch the details of either:

* the original charge, or
* the allowance product.

### "How to" use cases (discount links)

| "How to" use case | API operations |
| --- | --- |
| How to find the original charge for an allowance discount | [`Get all order items`](../operations/orderitems.md#get-all-order-items) (use `OrderItemIds` with `DiscountedOrderItemId`) |
| How to find which allowance funded a discount | [`Get all order items`](../operations/orderitems.md#get-all-order-items) (use `OrderItemIds` with `AllowanceProductOrderItemId`) |

{% hint style="info" %}
Discount amounts are negative. An `AllowanceDiscount` order item carries a negative `Amount`, which offsets the positive amount of the original charge on the guest's bill.
{% endhint %}

## Working with breakage and profits

When a guest checks out or an allowance expires with unspent allowance remaining, the system generates breakage items. These represent the `Property`'s retained revenue from unused allowance.

An [`Order item`](../operations/orderitems.md#order-item) with `Data.Discriminator` set to `AllowanceProfits` will have:

* `AllowanceProductOrderItemId` — the unique identifier of the allowance product whose amount was not fully consumed.
* `AllowanceProfitType` — the type of profit entry, which can be one of:
  * `AllowanceBreakage` — the profit from unspent allowance amount.
  * `AllowanceContraBreakage` — the accounting balance entry for the breakage.
  * `AllowanceLoss` — the loss from the allowance product.
  * `AllowanceContraLoss` — the accounting balance entry for the loss.

### "How to" use cases (breakage and profits)

| "How to" use case | API operations |
| --- | --- |
| How to get breakage items for reconciliation | [`Get all order items`](../operations/orderitems.md#get-all-order-items) (use `Types` with `AllowanceBreakage`) |
| How to find which allowance generated a breakage item | [`Get all order items`](../operations/orderitems.md#get-all-order-items) (use `OrderItemIds` with `AllowanceProductOrderItemId` from the breakage item's `Data`) |

{% hint style="info" %}
Breakage and contra-breakage always occur in pairs. For every `AllowanceBreakage` item, there is a corresponding `AllowanceContraBreakage` item to maintain double-entry accounting balance. Accounting integrations should expect and reconcile both.
{% endhint %}

## Posting charges against an allowance

External systems such as POS integrations can post charges to a guest's profile using [`Add order`](../operations/orders.md#add-order).

If the guest has an active allowance and the charge falls within the allowance's permitted consumption categories (matched by `AccountingCategoryId`), the system will automatically generate an `AllowanceDiscount` order item that offsets the charge — up to the remaining allowance balance.

Both `ProductOrders` (for products already configured in Mews) and `Items` (for custom items not configured in Mews) are supported.

In both cases, the `AccountingCategoryId` on the item determines whether the charge qualifies for allowance discounting.

### Linking orders to reservations

Specify parameter `LinkedReservationId` when using [`Add order`](../operations/orders.md#add-order) to link the order to the guest's reservation.

This is especially important for allowances because it ensures the charge and the resulting allowance discount are associated with the correct reservation and its billing automation rules.

### "How to" use cases (posting charges)

| "How to" use case | API operations |
| --- | --- |
| How to post a charge that triggers an allowance discount | [`Add order`](../operations/orders.md#add-order) |
| How to post a custom item against an allowance | [`Add order`](../operations/orders.md#add-order) (use `Items` with `AccountingCategoryId`) |
| How to post an existing Mews product against an allowance | [`Add order`](../operations/orders.md#add-order) (use `ProductOrders`) |

## Partial consumption

If the charge amount exceeds the remaining allowance balance, the discount is applied only up to the remaining balance. The guest is responsible for the remainder.

For example, if a guest has €30 remaining on their F&B allowance and a €45 dinner charge is posted, an `AllowanceDiscount` of €30 is created and the guest owes €15.

## Charges that do not qualify

If the posted item's accounting category is not in the allowance's permitted consumption list, no discount is generated.

The charge is posted normally to the guest's bill.

## Testing your integration

Ensure you follow the general [`Usage guidelines`](../guidelines/README.md) for testing integrations.

When testing an integration that works with allowances, verify the following scenarios:

* Post a charge with an accounting category that matches the allowance's permitted consumption — confirm an `AllowanceDiscount` item is automatically created.
* Post a charge with an accounting category that does not match — confirm no discount is created.
* Post a charge that exceeds the remaining allowance balance — confirm the discount is capped at the remaining balance.
* Post a charge of amount 0 — confirm no discount is created.
* Retrieve order items for a reservation and confirm you can identify all allowance-related item types (`AllowanceDiscount`, `AllowanceBreakage`, `AllowanceContraBreakage`).
* Confirm that breakage items are created after checkout when allowance amount remains unspent.
* Reconcile the sum of allowance product amount, discount amounts, and breakage amounts — they should balance to zero.

To cross-check allowance financial data, you can use the [Accounting Report](https://help.mews.com/s/article/accounting-report?language=en_US) and the [Bills and Invoices Report](https://help.mews.com/s/article/bills-and-invoices-report?language=en_US) in **Mews Operations**.
