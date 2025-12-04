# Changelog

## 4th December 2025
* [Products:](../operations/products.md#get-product)
  * Added new operation for retrieving a single product by ID.
* [Orders:](../operations/orders.md#get-orders)
  * Clarified new `state` field and its role in constraining `status` (fulfillment status).
* [Invoices:](../operations/invoices.md#get-invoices)
  * Updated embedded `order_attributes` section to reflect the `state` and `status` definitions.
* [Payments:](../operations/payments.md#create-a-payment)
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
* [Get invoice item:](../operations/invoiceitems.md#get-invoice-items)
  * Updated JSON examples to use consistent 2-decimal place format for numeric values (e.g., "17.00" instead of "17.0").
* [Update order:](../operations/orders.md#update-order)
  * Enhanced documentation with clarification on item identifiers: use `tempId` for new items and `id` (UUID) for existing items.
  * Added example showing how to update existing order items using `id` in the request body.
* [Digital ordering:](../use-cases/digital_ordering.md)
  * Added room charge section with documentation on room number validation for payments.
  * Clarified that `roomNumber` is only permitted when using the `room_charge` payment method.

## 7th November 2025
* [API Operations:](../operations/README.md)
  * Updated operations index to include all missing operations.
  * Added missing order operations: [Get order](../operations/orders.md#get-order), [Create order](../operations/orders.md#create-order), [Update order](../operations/orders.md#update-order).
  * Added missing register operation: [Get register](../operations/registers.md#get-register).
  * Added missing webhook operations: [Get webhook endpoints](../operations/webhookendpoints.md#get-webhook-endpoints), [Update webhook endpoint](../operations/webhookendpoints.md#update-webhook-endpoint).
  * Added missing operations: [Get modifier sets](../operations/modifiersets.md#get-modifier-sets), [Get modifier set](../operations/modifiersets.md#get-modifier-set), [Get outlets](../operations/outlets.md#get-outlets), [Get payment methods](../operations/paymentmethods.md#get-payment-methods), [Create payment](../operations/payments.md#create-a-payment), [Get product bundles](../operations/productbundles.md#get-product-bundles), [Get promo codes](../operations/promocodes.md#get-promo-codes), [Get revenue centers](../operations/revenuecenters.md#get-revenue-centers), [Get health check](../operations/system.md#get-the-health-check).
  * Sorted all operations alphabetically for better navigation.

## 23rd October 2025
* [Create a payment:](../operations/payments.md#create-a-payment)
  * New operation added for creating payments.
* [Idempotency:](../guidelines/idempotency.md)
  * New guidelines section added for idempotent API requests.
* [Digital ordering:](../use-cases/digital_ordering.md)
  * Enhanced use case documentation.
* [Get orders:](../operations/orders.md#get-orders)
  * Major updates to order operations and documentation.
* [Get invoices:](../operations/invoices.md#get-invoices)
  * Enhanced invoice operations documentation.
* [Get invoice items:](../operations/invoiceitems.md#get-invoice-items)
  * Updated invoice items operations.

## 13th October 2025
* [Webhooks:](../events/webhooks.md)
  * Added `order.status.updated` event for order status changes.
  * Added `product.availability.updated` event for product availability changes.
  * Updated field naming from `updated_at` to `updatedAt` for consistency with API conventions.

## 26th September 2025
* [Get payment methods:](../operations/paymentmethods.md#get-payment-methods)
  * New operation added.
* [Get product bundles:](../operations/productbundles.md#get-product-bundles)
  * New operation added.
* [Get products:](../operations/products.md#get-products)
  * Extended [product relationships](../operations/products.md#product_relationships) with `taxes`.
* [Get orders:](../operations/orders.md#get-orders)
  * Extended [order relationships](../operations/orders.md#order_relationships) with `taxes`.
* [Get invoices:](../operations/invoices.md#get-invoices)
  * Extended [invoice relationships](../operations/invoices.md#invoice_relationships) with `taxes`.
* [Get bookings:](../operations/bookings.md#get-bookings)
  * Updated booking status values from "noShow" to "no_show".
* [Webhooks:](../events/webhooks.md)
  * Added `order.status.updated` event for order status changes.
  * Added `product.availability.updated` event for product availability changes.

## 10th September 2025
* [Get promo codes:](../operations/promocodes.md#get-promo-codes)
  * New operation added.
* [Get invoices:](../operations/invoices.md#get-invoices)
  * Extended [invoice relationships](../operations/invoices.md#invoice_relationships) with `promoCode` and `revenueCenter`.
* [Get invoice items:](../operations/invoiceitems.md#get-invoice-items)
  * Extended [invoice item relationships](../operations/invoiceitems.md#invoice_item_relationships) with `revenueCenter`.
* [Get products:](../operations/products.md#get-products)
  * Extended [product attributes](../operations/products.md#product_attributes) with `isAvailable`.
  * Extended [product relationships](../operations/products.md#product_relationships) with `modifiers`.
* [Get orders:](../operations/orders.md#get-orders)
  * Extended [order relationships](../operations/orders.md#order_relationships) with `invoice`, `customer`, `booking`, `tables`, and `promoCode`.
* [Get registers:](../operations/registers.md#get-registers)
  * Updated operation to return list of registers instead of single register.
* [Get modifier sets:](../operations/modifiersets.md#get-modifier-sets)
  * New operation added.
* [Get outlets:](../operations/outlets.md#get-outlets)
  * New operation added.
* [Get revenue centers:](../operations/revenuecenters.md#get-revenue-centers)
  * New operation added.

## 14th July 2025
* [Get invoices:](../operations/invoices.md#get-invoices)
  * Extended [invoice relations](../operations/invoices.md#invoice_relationships) with `order`
  * [Update webhook endpoint](../operations/webhookendpoints.md#update-webhook-endpoint)
  * Introduced table [filter](../operations/tables.md) - `orderIdEq`

## 26th June 2025
* **IMPORTANT!** Changed platform address and API version number from https://pos.mews.com/api/v2 to https://api.mews.com/pos/v1.
* Updated [Environments](../guidelines/environments.md) page, including:
  * Production environment platform address
  * Demo environment platform address, API tokens and Mews POS application credentials
  * Demo environment API tokens for linked Mews Operations (PMS) account
  * Environment request limits

## 27th February 2025
* [Get bookings:](../operations/bookings.md#get_bookings)
  * Correcting booking JSON example response.
  * Added list of [booking statuses.](../operations/bookings.md#booking_attributes)
  * Extended [booking attributes](../operations/bookings.md#booking_attributes) with `depositAmount` and `isWalkIn`.
  * Extended bookings [filters](../operations/bookings.md#get_bookings) with  `bookingDatetimeGt`, `bookingDatetimeGteq`, `bookingDatetimeLt`, `bookingDatetimeLteq`.
* [Create booking:](../operations/bookings.md#create_booking)
  * Extended [booking attributes](../operations/bookings.md#booking_attributes) with `depositAmount` and `isWalkIn`.
* [Update booking:](../operations/bookings.md#update_booking)
  * Extended [booking attributes](../operations/bookings.md#booking_attributes) with `depositAmount` and `isWalkIn`.
* [Get products:](../operations/products.md#get_products)
  * Added permitted values for [product_attributes status](../operations/products.md#product_attributes) and [modifier_set_attributes selection](../operations/products.md#product_attributes).
* [Get tables:](../operations/tables.md#get_tables)
  * Extended tables relationships, now it is related to `area`.
  * Renamed `number` field to `name`.
* [Create webhook endpoint:](../operations/webhookendpoints.md)
  * General improvements to [webhook endpoints page.](../operations/webhookendpoints.md) Documentation-only, no changes to API.
* [Get areas:](../operations/areas.md)
  * New operation added.
* Added [Table booking](../use-cases/table-booking.md) use case.
* Added [Booking status](../events/webhooks.md#booking-status) values to [Webhooks](../events/webhooks.md).

## 20th February 2025
* Added [API Events](../events/README.md), [Webhooks](../events/webhooks.md) and [Webhook security](../events/wh-security.md)

## 17th February 2025
* Added new API operation [Create webhook endpoint](../operations/webhookendpoints.md#create-webhook-endpoint).
* Corrected booking status in JSON samples in [Bookings](../operations/bookings.md).
* Bookings are now connected to [multiple orders](../operations/bookings.md#booking_relationships) rather than only one.
* Extended [list of supported filters](../guidelines/filtering.md).

## 4th February 2025
* Extended [list of supported filters](../guidelines/filtering.md).
* [Get invoices](../operations/invoices.md#get-invoices): Extended Filters to include `registerIdEq`.

## 23rd January 2025
* New operations added:
  * [Get bookings](../operations/bookings.md#get-bookings)
  * [Create booking](../operations/bookings.md#create-booking)
  * [Update booking](../operations/bookings.md#update-booking)
  * [Get orders](../operations/orders.md#get-orders)
  * [Get customers](../operations/customers.md#get-customers)
  * [Create customer](../operations/customers.md#create-customer)
  * [Get tables](../operations/tables.md#get-tables)
* Updated operations list to match proper inflections.

| Changelog by year |
| :-- |
| [Changelog 2024](changelog2024.md) |
