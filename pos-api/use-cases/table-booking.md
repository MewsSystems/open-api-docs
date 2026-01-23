# Table booking

This use case is aimed at Restaurant Table Booking Systems, and it describes how to use the **Mews POS API** to manage table bookings, including:

* Getting table availability
* Making and amending bookings
* Checking booking status

## Contents

* [Checking availability](table-booking.md#checking-availability)
* [Making a table booking](table-booking.md#making-a-table-booking)
* [Working with customers](table-booking.md#working-with-customers)
* [Alternate flows](table-booking.md#alternate-flows)
* [Getting status changes](table-booking.md#getting-status-changes)
* [Getting the customer spend](table-booking.md#getting-the-customer-spend)
* [Frequently Asked Questions](table-booking.md#frequently-asked-questions)
* [Additional help](table-booking.md#additional-help)

## Checking availability

You can check availability at the POS level by correlating active bookings with tables.

### 1. Get tables

First call [Get tables](/broken/pages/9f268cd0fadb340e2662c3d97c46c52c73f57963#get-v1-tables) to get information on restaurant tables, including table names and quantity of seats.

#### Example request:

```
GET [PlatformAddress]/v1/tables
```

> **Areas**: If you want to work with restaurant areas, e.g. "terrace", you can also fetch information about Areas, see [Do you support restaurant areas?](table-booking.md#do-you-support-restaurant-areas)

### 2. Get bookings

Call [Get bookings](/broken/pages/ohpr0xfYuZ2oOTqTLc9z#get-bookings) and filter by the desired booking period, to get the set of all bookings for that period, and the tables they are linked to. Tables with no bookings are free to book. Note that this API Operation supports pagination, to manage requests in case of large amounts of data.

> **Booking period filters**
>
> The relevant booking period filters are:
>
> * `bookingDatetimeGt` – greater than
> * `bookingDatetimeGteq`– greater than or equal to
> * `bookingDatetimeLt` – less than
> * `bookingDatetimeLteq` – less than or equal to

#### Booking status

Check the booking status to see if the booking is active or not. The supported statuses are:

* `confirmed` – The booking has been made and confirmed.
* `seated` – The customer has arrived and the party is seated.
* `completed` – The booking has finished.
* `cancelled` – The customer has cancelled the booking.
* `noShow` – The customer did not show up and the booking has been registered by the staff as a 'no show'.

#### Example request:

```
GET [PlatformAddress]/v1/bookings?filter[bookingDatetimeGt]=2024-07-25T16%3A29%3A35%2B00%3A00&filter[bookingDatetimeLt]=2024-07-26T16%3A29%3A35%2B00%3A00
```

The response will tell you:

* What table or tables the booking is linked to
* The booking date and time
* The booking duration
* The party size
* The external booking reference, if applicable

See [Get bookings](/broken/pages/965b5a69f26099d2269f97ee4f0b00adef55e861#get-v1-bookings) for a full list of supported fields.

## Making a table booking

Once you have taken a customer booking, you can set up the booking in **Mews POS** using [Create booking](/broken/pages/965b5a69f26099d2269f97ee4f0b00adef55e861#post-v1-bookings). See the API Operation description for a full list of parameters. You must specify the following parameters as a minimum:

* Booking date and time
* Party size
* Table (linked through `booking_relationships`)

In addition, it is helpful to also specify the duration, otherwise we will apply a default value of 90 minutes.

* Duration

#### Example request:

```
POST [PlatformAddress]/v1/bookings
```

```json
{
  "data": {
    "type": "bookings",
    "attributes": {
      "status": "confirmed",
      "partySize": 5,
      "bookingDatetime": "2024-10-24T08:44:45.409Z",
      "duration": "120"
    },
    "relationships": {
      "tables": {
        "data": [
          {
            "type": "tables",
            "id": "5efa8b3c-b930-4b31-918d-95ab0e212e78"
          }
        ]
      }
    }
  }
}
```

## Working with customers

If you wish to attach a named customer to a booking, you can do this by adding a customer relationship and linking to a Mews customer profile with the `id` field.

#### Example request:

```
POST [PlatformAddress]/v1/bookings
```

```json
{
  "data": {
    "type": "bookings",
    "attributes": {
      "status": "confirmed",
      "partySize": 5,
      "bookingDatetime": "2024-10-24T08:44:45.409Z",
      "duration": "120"
    },
    "relationships": {
      "customer": {
        "data": {
          "type": "customers",
          "id": "5efa8b3c-b930-4b31-918d-95ab0e212e65"
        }
      },
      "tables": {
        "data": [
          {
            "type": "tables",
            "id": "5efa8b3c-b930-4b31-918d-95ab0e212e78"
          }
        ]
      }
    }
  }
}
```

To obtain the profile id, perform a customer look-up using [Get customers](/broken/pages/d8a1df3e49ade5477340b612dd9b08b1c9147a71#get-v1-customers) with either the `emailEq` or `fullNameEq` filter. Note that an exact match is required, so care is needed to ensure the search string is correct.

#### Example request:

```
GET [PlatformAddress]/v1/customers?filter[emailEq]=john.doe@mews.com
```

If no customer profile exists for the customer, you can create one with [Create customer](/broken/pages/d8a1df3e49ade5477340b612dd9b08b1c9147a71#post-v1-customers).

## Alternate flows

### Amending a table booking

To amend an existing booking, use [Update booking](/broken/pages/965b5a69f26099d2269f97ee4f0b00adef55e861#patch-v1-bookings-id). You can use this to update any booking parameters, including setting the booking status.

#### Example request:

```
PATCH [PlatformAddress]/v1/bookings/31b14937-2524-491f-b0a0-dc0a739
```

### Canceling a table booking

To cancel a booking, use [Update booking](/broken/pages/965b5a69f26099d2269f97ee4f0b00adef55e861#patch-v1-bookings-id) and set the booking status to `Cancelled`.

### Checking on bookings

To check on the details of bookings, use [Get bookings](/broken/pages/965b5a69f26099d2269f97ee4f0b00adef55e861#get-v1-bookings) (see [Checking availability](table-booking.md#checking-availability) above).

### Changing table assignment

The table assignment is made through the [relationship](../guidelines/relationships.md) between `Booking` and `Table`. To change table, remove the old relationship and set a new relationship.

#### Example request:

```
PATCH [PlatformAddress]/v1/bookings/31b14937-2524-491f-b0a0-dc0a739
```

```json
{
  "data": {
    "type": "bookings",
    "id": "83f93e1c-b6e1-4040-90cf-3274b6f3c82d",
    "attributes": {
      "status": "confirmed",
      "partySize": 6,
      "bookingDatetime": "2024-10-24T08:44:45.409Z"
    },
    "relationships": {
      "customer": {
        "data": {
          "type": "customers",
          "id": "5efa8b3c-b930-4b31-918d-95ab0e212e65"
        }
      },
      "tables": {
        "data": [
          {
            "type": "tables",
            "id": "7c888ff-b8c30-88bb1-878f-225ab0e38a78"
          }
        ]
      }
    }
  }
}
```

### Walk-in customer scenario

> **Scenario:** A customer arrives without a prior booking and requests a table on-site.

Walk-ins can be created either in the Table Booking System or in **Mews POS**. A walk-in booking is identified by the `isWalkIn` flag in [booking\_attributes](/broken/pages/ohpr0xfYuZ2oOTqTLc9z#booking_attributes). Use this field if creating a walk-in booking.

Walk-ins created through **Mews POS** have the value "pos" for `bookingReference`, otherwise this field contains the booking reference from the Table Booking System. Note that walk-ins created through **Mews POS** always have the initial booking status `seated`.

## Getting status changes

If you want to be notified when a booking changes status in near-real-time, for example when customers are seated or when a booking is closed or canceled, use [API Events](../events/).

## Getting the customer spend

Once the booking status is `completed`, you can fetch the total amount of customer spend for the booking. First obtain the `Order` linked to the `Booking`, then obtain the `Invoice` linked to the `Order`. Normally, a `Booking` will be linked to a single `Order` and a single `Invoice`, however in case of a split bill, a `Booking` will have multiple `Orders`, each with their own `Invoice`.

* `Booking` --> `Order` --> `Invoice`

## Frequently Asked Questions

* [How do I know if there is a no-show?](table-booking.md#how-do-i-know-if-there-is-a-no-show)
* [Is there a way to specify customer preferences?](table-booking.md#is-there-a-way-to-specify-customer-preferences)
* [Do you support restaurant areas?](table-booking.md#do-you-support-restaurant-areas)

### How do I know if there is a no-show?

_How can I be notified of a no-show, where the customer does not turn up for their booking?_

* **Answer**: Look at the booking status within the `Booking` record. To be notified of changes to booking status, use [API Events](../events/).

### Is there a way to specify customer preferences?

_Is there a way to express customer preferences such as table preferences or dietary requirements?_

* **Answer**: You are currently recommended to express customer preferences through the `Notes` field when creating the booking.

### Do you support restaurant areas?

_Do you support a level of organization between restaurant and table?_

* **Answer**: Yes, a table can be linked to an area and an area can be linked to one or more tables. To see all areas, use [Get areas](/broken/pages/112e7e97fccf40c9248a6f93f3e3bbcae6198d8d#get-v1-areas). When calling [Get areas](/broken/pages/112e7e97fccf40c9248a6f93f3e3bbcae6198d8d#get-v1-areas), you can use [the include query parameter](../guidelines/relationships.md#the-include-query-parameter) to also fetch information about related tables using the same API Operation. This can replace the call to [Get tables](/broken/pages/9f268cd0fadb340e2662c3d97c46c52c73f57963#get-v1-tables) in Step 1 of [Checking availability](table-booking.md#checking-availability).

## Additional help

You may find these additional resources helpful when working with **Mews POS** in the demo environment:

> **Help Guides**:
>
> * [Managing table orders in Mews POS](https://help.mews.com/s/article/managing-table-orders)
> * [How to move an open order to a new table in Mews POS if guests switch tables](https://help.mews.com/s/article/How-to-move-an-open-order-to-a-new-table-in-Mews-POS-if-guests-switch-tables)
