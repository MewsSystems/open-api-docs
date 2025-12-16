# Changelog

## 4th December 2025

* [Products:](/broken/pages/kXP6AdYRRWo5OaPjRzsD#get-product)
  * Added new operation for retrieving a single product by ID.
* [Orders:](/broken/pages/ZRocaBqQcRHp9x4ephdW#get-orders)
  * Clarified new `state` field and its role in constraining `status` (fulfillment status).
* [Invoices:](/broken/pages/7VnohNzCNsSbrSYswA7i#get-invoices)
  * Updated embedded `order_attributes` section to reflect the `state` and `status` definitions.
* [Payments:](/broken/pages/K0VXLtBcwi3aUV298Mc0#create-a-payment)
  * Updated embedded `order_attributes` section to reflect the `state` and `status` definitions.
* [Webhooks:](../events/webhooks.md)
  * Added `order.state.updated` event for changes to order state.
  * Updated `order.status.updated` event to reflect actual statuses.

## 25th November 2025

* [Webhooks:](../events/webhooks.md)
  * Added `order.total.updated` event for changes to order totals due to gratuity (tip) or correction amount updates.
  * Added `orders.payments.added` event when a payment is successfully added to an order.

## 24th November 2025

* [Get menus:](../operations/menus.md#get-menus)
  * New operation added for retrieving a list of menus.
* [Get menu details:](../operations/menus.md#get-menu-details)
  * New operation added for retrieving details of a specific menu, including sections and associated outlets.

## 20th November 2025

* [Get invoice item:](/broken/pages/2RRR9M5SmB5TZ1xh56In#get-invoice-items)
  * Updated JSON examples to use consistent 2-decimal place format for numeric values (e.g., "17.00" instead of "17.0").
* [Update order:](/broken/pages/ZRocaBqQcRHp9x4ephdW#update-order)
  * Enhanced documentation with clarification on item identifiers: use `tempId` for new items and `id` (UUID) for existing items.
  * Added example showing how to update existing order items using `id` in the request body.
* [Digital ordering:](../use-cases/digital_ordering.md)
  * Added room charge section with documentation on room number validation for payments.
  * Clarified that `roomNumber` is only permitted when using the `room_charge` payment method.

## 7th November 2025

* [API Operations:](/broken/pages/9cAxzDNLVliB7LXfQj2c)
  * Updated operations index to include all missing operations.
  * Added missing order operations: [Get order](/broken/pages/ZRocaBqQcRHp9x4ephdW#get-order), [Create order](/broken/pages/ZRocaBqQcRHp9x4ephdW#create-order), [Update order](/broken/pages/ZRocaBqQcRHp9x4ephdW#update-order).
  * Added missing register operation: [Get register](/broken/pages/nLJLugEgelLnXahJGiQm#get-register).
  * Added missing webhook operations: [Get webhook endpoints](/broken/pages/ggnhYT4S5VDM3HN1SCwj#get-webhook-endpoints), [Update webhook endpoint](/broken/pages/ggnhYT4S5VDM3HN1SCwj#update-webhook-endpoint).
  * Added missing operations: [Get modifier sets](/broken/pages/v0GXCv5i84sOcY3i1NyX#get-modifier-sets), [Get modifier set](/broken/pages/v0GXCv5i84sOcY3i1NyX#get-modifier-set), [Get outlets](/broken/pages/DwXAPhtwZoZfNzjzHfjT#get-outlets), [Get payment methods](/broken/pages/GQcLhpLzd9eFLH39a2Ea#get-payment-methods), [Create payment](/broken/pages/K0VXLtBcwi3aUV298Mc0#create-a-payment), [Get product bundles](/broken/pages/q2Br8YdUm8GWi5COvVpz#get-product-bundles), [Get promo codes](/broken/pages/Vmkku9rsMgadSy8k0DMh#get-promo-codes), [Get revenue centers](/broken/pages/UuxjyCWEOcgHqhvm8r8f#get-revenue-centers), [Get health check](../operations/system.md#get-the-health-check).
  * Sorted all operations alphabetically for better navigation.

## 23rd October 2025

* [Create a payment:](/broken/pages/K0VXLtBcwi3aUV298Mc0#create-a-payment)
  * New operation added for creating payments.
* [Idempotency:](../guidelines/idempotency.md)
  * New guidelines section added for idempotent API requests.
* [Digital ordering:](../use-cases/digital_ordering.md)
  * Enhanced use case documentation.
* [Get orders:](/broken/pages/ZRocaBqQcRHp9x4ephdW#get-orders)
  * Major updates to order operations and documentation.
* [Get invoices:](/broken/pages/7VnohNzCNsSbrSYswA7i#get-invoices)
  * Enhanced invoice operations documentation.
* [Get invoice items:](/broken/pages/2RRR9M5SmB5TZ1xh56In#get-invoice-items)
  * Updated invoice items operations.

## 13th October 2025

* [Webhooks:](../events/webhooks.md)
  * Added `order.status.updated` event for order status changes.
  * Added `product.availability.updated` event for product availability changes.
  * Updated field naming from `updated_at` to `updatedAt` for consistency with API conventions.

## 26th September 2025

* [Get payment methods:](/broken/pages/GQcLhpLzd9eFLH39a2Ea#get-payment-methods)
  * New operation added.
* [Get product bundles:](/broken/pages/q2Br8YdUm8GWi5COvVpz#get-product-bundles)
  * New operation added.
* [Get products:](/broken/pages/kXP6AdYRRWo5OaPjRzsD#get-products)
  * Extended [product relationships](/broken/pages/kXP6AdYRRWo5OaPjRzsD#product_relationships) with `taxes`.
* [Get orders:](/broken/pages/ZRocaBqQcRHp9x4ephdW#get-orders)
  * Extended [order relationships](/broken/pages/ZRocaBqQcRHp9x4ephdW#order_relationships) with `taxes`.
* [Get invoices:](/broken/pages/7VnohNzCNsSbrSYswA7i#get-invoices)
  * Extended [invoice relationships](/broken/pages/7VnohNzCNsSbrSYswA7i#invoice_relationships) with `taxes`.
* [Get bookings:](/broken/pages/ohpr0xfYuZ2oOTqTLc9z#get-bookings)
  * Updated booking status values from "noShow" to "no\_show".
* [Webhooks:](../events/webhooks.md)
  * Added `order.status.updated` event for order status changes.
  * Added `product.availability.updated` event for product availability changes.

## 10th September 2025

* [Get promo codes:](/broken/pages/Vmkku9rsMgadSy8k0DMh#get-promo-codes)
  * New operation added.
* [Get invoices:](/broken/pages/7VnohNzCNsSbrSYswA7i#get-invoices)
  * Extended [invoice relationships](/broken/pages/7VnohNzCNsSbrSYswA7i#invoice_relationships) with `promoCode` and `revenueCenter`.
* [Get invoice items:](/broken/pages/2RRR9M5SmB5TZ1xh56In#get-invoice-items)
  * Extended [invoice item relationships](/broken/pages/2RRR9M5SmB5TZ1xh56In#invoice_item_relationships) with `revenueCenter`.
* [Get products:](/broken/pages/kXP6AdYRRWo5OaPjRzsD#get-products)
  * Extended [product attributes](/broken/pages/kXP6AdYRRWo5OaPjRzsD#product_attributes) with `isAvailable`.
  * Extended [product relationships](/broken/pages/kXP6AdYRRWo5OaPjRzsD#product_relationships) with `modifiers`.
* [Get orders:](/broken/pages/ZRocaBqQcRHp9x4ephdW#get-orders)
  * Extended [order relationships](/broken/pages/ZRocaBqQcRHp9x4ephdW#order_relationships) with `invoice`, `customer`, `booking`, `tables`, and `promoCode`.
* [Get registers:](/broken/pages/nLJLugEgelLnXahJGiQm#get-registers)
  * Updated operation to return list of registers instead of single register.
* [Get modifier sets:](/broken/pages/v0GXCv5i84sOcY3i1NyX#get-modifier-sets)
  * New operation added.
* [Get outlets:](/broken/pages/DwXAPhtwZoZfNzjzHfjT#get-outlets)
  * New operation added.
* [Get revenue centers:](/broken/pages/UuxjyCWEOcgHqhvm8r8f#get-revenue-centers)
  * New operation added.

## 14th July 2025

* [Get invoices:](/broken/pages/7VnohNzCNsSbrSYswA7i#get-invoices)
  * Extended [invoice relations](/broken/pages/7VnohNzCNsSbrSYswA7i#invoice_relationships) with `order`
  * [Update webhook endpoint](/broken/pages/ggnhYT4S5VDM3HN1SCwj#update-webhook-endpoint)
  * Introduced table [filter](/broken/pages/VDDhVkgEEtFIvxsMYaDz) - `orderIdEq`

## 26th June 2025

* **IMPORTANT!** Changed platform address and API version number from https://pos.mews.com/api/v2 to https://api.mews.com/pos/v1.
* Updated [Environments](../guidelines/environments.md) page, including:
  * Production environment platform address
  * Demo environment platform address, API tokens and Mews POS application credentials
  * Demo environment API tokens for linked Mews Operations (PMS) account
  * Environment request limits

## 27th February 2025

* [Get bookings:](/broken/pages/ohpr0xfYuZ2oOTqTLc9z#get_bookings)
  * Correcting booking JSON example response.
  * Added list of [booking statuses.](/broken/pages/ohpr0xfYuZ2oOTqTLc9z#booking_attributes)
  * Extended [booking attributes](/broken/pages/ohpr0xfYuZ2oOTqTLc9z#booking_attributes) with `depositAmount` and `isWalkIn`.
  * Extended bookings [filters](/broken/pages/ohpr0xfYuZ2oOTqTLc9z#get_bookings) with `bookingDatetimeGt`, `bookingDatetimeGteq`, `bookingDatetimeLt`, `bookingDatetimeLteq`.
* [Create booking:](/broken/pages/ohpr0xfYuZ2oOTqTLc9z#create_booking)
  * Extended [booking attributes](/broken/pages/ohpr0xfYuZ2oOTqTLc9z#booking_attributes) with `depositAmount` and `isWalkIn`.
* [Update booking:](/broken/pages/ohpr0xfYuZ2oOTqTLc9z#update_booking)
  * Extended [booking attributes](/broken/pages/ohpr0xfYuZ2oOTqTLc9z#booking_attributes) with `depositAmount` and `isWalkIn`.
* [Get products:](/broken/pages/kXP6AdYRRWo5OaPjRzsD#get_products)
  * Added permitted values for [product\_attributes status](/broken/pages/kXP6AdYRRWo5OaPjRzsD#product_attributes) and [modifier\_set\_attributes selection](/broken/pages/kXP6AdYRRWo5OaPjRzsD#product_attributes).
* [Get tables:](/broken/pages/VDDhVkgEEtFIvxsMYaDz#get_tables)
  * Extended tables relationships, now it is related to `area`.
  * Renamed `number` field to `name`.
* [Create webhook endpoint:](/broken/pages/ggnhYT4S5VDM3HN1SCwj)
  * General improvements to [webhook endpoints page.](/broken/pages/ggnhYT4S5VDM3HN1SCwj) Documentation-only, no changes to API.
* [Get areas:](/broken/pages/dckTa5cg4F3uE8WswD98)
  * New operation added.
* Added [Table booking](../use-cases/table-booking.md) use case.
* Added [Booking status](../events/webhooks.md#booking-status) values to [Webhooks](../events/webhooks.md).

## 20th February 2025

* Added [API Events](../events/), [Webhooks](../events/webhooks.md) and [Webhook security](../events/wh-security.md)

## 17th February 2025

* Added new API operation [Create webhook endpoint](/broken/pages/ggnhYT4S5VDM3HN1SCwj#create-webhook-endpoint).
* Corrected booking status in JSON samples in [Bookings](/broken/pages/ohpr0xfYuZ2oOTqTLc9z).
* Bookings are now connected to [multiple orders](/broken/pages/ohpr0xfYuZ2oOTqTLc9z#booking_relationships) rather than only one.
* Extended [list of supported filters](../guidelines/filtering.md).

## 4th February 2025

* Extended [list of supported filters](../guidelines/filtering.md).
* [Get invoices](/broken/pages/7VnohNzCNsSbrSYswA7i#get-invoices): Extended Filters to include `registerIdEq`.

## 23rd January 2025

* New operations added:
  * [Get bookings](/broken/pages/ohpr0xfYuZ2oOTqTLc9z#get-bookings)
  * [Create booking](/broken/pages/ohpr0xfYuZ2oOTqTLc9z#create-booking)
  * [Update booking](/broken/pages/ohpr0xfYuZ2oOTqTLc9z#update-booking)
  * [Get orders](/broken/pages/ZRocaBqQcRHp9x4ephdW#get-orders)
  * [Get customers](/broken/pages/yOEqDjMHh4DWzOU4dFHr#get-customers)
  * [Create customer](/broken/pages/yOEqDjMHh4DWzOU4dFHr#create-customer)
  * [Get tables](/broken/pages/VDDhVkgEEtFIvxsMYaDz#get-tables)
* Updated operations list to match proper inflections.

| Changelog by year                  |
| ---------------------------------- |
| [Changelog 2024](changelog2024.md) |
