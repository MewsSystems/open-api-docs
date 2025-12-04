# Reservation groups

## Create reservation group

Create a group of one or more reservations, i.e. make a reservation.

### Request

`[ApiBaseUrl]/api/distributor/v1/reservationGroups/create`

```json
{
    "Client": "My Client 1.0.0",
    "ConfigurationId": "5dfgaeb5-5848-81b3-40b7-d102e96kcf52",
    "HotelId": "3edbe1b4-6739-40b7-81b3-d369d9469c48",
    "Customer": {
        "Email": "hiro@snow.com",
        "FirstName": "Hiro",
        "LastName": "Protagonist",
        "Telephone": "",
        "NationalityCode": "",
        "SendMarketingEmails": false
    },
    "Booker": {
        "Email": "john.doe@snow.com",
        "FirstName": "John",
        "LastName": "Doe",
        "Telephone": "654257001458",
        "SendMarketingEmails": true
    },
    "Reservations": [
        {
            "RoomCategoryId": "4037c0ec-a59d-43f1-9d97-d6c984764e8c",
            "StartUtc": "2015-01-01T00:00:00Z",
            "EndUtc": "2015-01-03T00:00:00Z",
            "VoucherCode": "Discount2042",
            "RateId": "c1d48c54-9382-4ceb-a820-772bf370573d",
            "AdultCount": 3,
            "ChildCount": 0,
            "ProductIds": [
                "d0e88da5-ae64-411c-b773-60ed68954f64"
            ],
            "Notes": "Quiet room please."
        }
    ],
    "CreditCardData": {
        "PaymentGatewayData": "...",
        "Expiration": "2030-10",
        "HolderName": "John Smith"
    },
    "AvailabilityBlockId": "5mgbe1b4-6739-40b7-81b3-d369d9469c48"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Client` | string | required | Client application name, as described in [Authentication](../guidelines/authentication.md). |
| `ConfigurationId` | string | required | Unique identifier of the Booking Engine configuration used. |
| `HotelId` | string | required | Unique identifier of the hotel. |
| `Customer` | [Customer](#customer) | required | Information about the customer or guest. |
| `Booker` | [Customer](#customer) | optional | Information about the person making the booking. |
| `Reservations` | array of [Reservation data](#reservation-data) | required | Reservation parameters, such as dates and quantities of persons. |
| `CreditCardData` | [Credit card data](#credit-card-data) | optional | Credit card data, required if hotel has payment gateway. |
| `AvailabilityBlockId` | string | optional | Unique identifier of availability block if present. Provide always when you have it.  |

#### Customer

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Email` | string | required | Email of the customer. |
| `FirstName` | string | required | First name of the customer. |
| `LastName` | string | required | Last name of the customer. |
| `Telephone` | string | optional | Telephone number of the customer. |
| `NationalityCode` | string | optional | ISO 3166-1 Aplha-2 code of the customer’s nation country, e.g.`US`. |
| `SendMarketingEmails` | boolean | optional | Subscribe to marketing emails. When `Booker` is present, this should be `false` or `null` because the customer is not subscribing, the booker is. See [Send marketing emails](#send-marketing-emails). |

#### Send marketing emails

The boolean flag `SendMarketingEmails` indicates if the user has opted in to receive marketing communication or not.
The API accepts the following values:

* `true` - subscription is created
* `false` - subscription is disabled
* `null` - subscription remains untouched

When `Booker` is present in the request, we assume that the booker is booking on behalf of the customer, but their opt-in to marketing communication is for them as user and not for the customer.
Therefore, the `SendMarketingEmails` property for the booker should be set according to the user's choice, while the `SendMarketingEmails` property for the customer should be set to `false` or `null`.

#### Reservation data

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `RoomCategoryId` | string | required | Identifier of the requested room or space category. |
| `StartUtc` | string | required | Start date of the reservation, i.e. arrival date. |
| `EndUtc` | string | required | End date of the reservation, i.e. departure date. |
| `VoucherCode` | string | optional | A voucher code, to be paired with reservation for later retrieval only. The actual voucher rate used is determined by setting a proper `RateId`. |
| `RateId` | string | required | Identifier of the chosen rate. |
| `AdultCount` | number | required | Number of adults. |
| `ChildCount` | number | required | Number of children. |
| `ProductIds` | array of string | optional | Unique identifiers of the requested products. |
| `Notes` | string | optional | Additional notes. |

#### Credit card data

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `PaymentGatewayData` | string | required | Encoded payment card data obtained from the payment gateway specific library. For more details, see our [Supporting payment cards](../use-cases/supporting-payment-cards.md) use case. |
| `Expiration` | string | required | Expiration date of payment card, in format `YYYY-MM`. |
| `HolderName` | string | required | Name of the card holder. |

### Response

```json
{
    "Id": "f6fa7e62-eb22-4176-bc49-e521d0524dee",
    "CustomerId": "7ac6ca0d-7c08-4ab1-8da8-9b44979d8855",
    "Reservations": [
        {
            "Id": "123456ec-a59d-43f1-9d97-d6c984764e8c",
            "RoomCategoryId": "4037c0ec-a59d-43f1-9d97-d6c984764e8c",
            "StartUtc": "2015-01-01T00:00:00Z",
            "EndUtc": "2015-01-03T00:00:00Z",
            "RateId": "c1d48c54-9382-4ceb-a820-772bf370573d",
            "Rate": {
                "Id": "c1d48c54-9382-4ceb-a820-772bf370573d",
                "Name": {
                    "en-US": "Rate"
                },
                "Description": {
                    "en-US": "Best rate available."
                }
            },
            "AdultCount": 3,
            "ChildCount": 0,
            "ProductIds": [
                "d0e88da5-ae64-411c-b773-60ed68954f64"
            ],
            "Notes": "Quiet room please.",
            "Amount": { },
            "Number": "1234"
        }
    ],
    "PaymentRequestId": "2e3a700a-7b10-4e61-8e9f-acfa00ee00df",
    "PaymentCardId": "dc2f8608-9d71-47fd-9d41-ad1a009913c6",
    "TotalAmount": { }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the created reservation group. |
| `CustomerId` | string | required | Unique identifier of the reservation group customer. |
| `Reservations` | array of [Reservation](#reservation) | required | Details of the reservations in the group. |
| `PaymentRequestId` | string | optional | Unique identifier of the [Payment request](#payment-request) that can be used to complete [on session payment](../use-cases/on-session-payments.md). |
| `PaymentCardId` | string | optional | Unique identifier of the [Payment card](payment-cards.md#payment-card) that can be used to complete [on session payment card authorization](../use-cases/payment-card-authorization.md). |
| `TotalAmount` | [Amount](hotels.md#multi-currency-amount) | required | Total amount of the whole group. |

#### Reservation

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Identifier of the reservation. |
| `Number` | string | required | Confirmation number of the reservation. |
| `RoomCategoryId` | string | required | Identifier of the requested room or space category. |
| `StartUtc` | string | required | Start date of the reservation, i.e. arrival date. |
| `EndUtc` | string | required | End date of the reservation, i.e. departure date. |
| `AdultCount` | number | required | Number of adults. |
| `ChildCount` | number | required | Number of children. |
| `ProductIds` | array of string | optional | Unique identifiers of the requested products. |
| `RateId` | string | required | Identifier of the chosen rate. |
| `Notes` | string | optional | Additional notes. |
| `Amount` | [Amount](hotels.md#multi-currency-amount) | required | Total amount of the reservation. |

### Documentation Update: Reservation Status Based on Feature Setting


#### Enable Automatic Cancellation for Optional Reservations

**When the feature [Enable automatic cancellation for optional reservations](https://help.mews.com/s/article/confirm-or-cancel-optional-reservations?language=en_US) is activated on your bookable service under *Visit Options*:**

- Reservations with a balance due upon confirmation will initially be set to an **Optional** state.
- These reservations will only transition to a **Confirmed** status upon successful payment of the due amount.

**If the feature is not activated:**

- Reservations will be created directly in the **Confirmed** state.

### Error response

In case of an error caused by insufficient availability \(which might have decreased since the time it was provided to the client\), the error response may contain the following fields on top of the standard ones:


| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ExceedingReservationIndexes` | array of number | optional | Indexes of reservations from the request that are not available anymore. |

## Get reservation group

Fetch details of the specified reservation group.

### Request

`[ApiBaseUrl]/api/distributor/v1/reservationGroups/get`

```json
{
    "Client": "My Client 1.0.0",
    "HotelId": "3edbe1b4-6739-40b7-81b3-d369d9469c48",
    "ReservationGroupId": "f6fa7e62-eb22-4176-bc49-e521d0524dee",
    "Extent": {
        "PaymentRequests": false,
        "Payments": false
    }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Client` | string | required | Client application name, as described in [Authentication](../guidelines/authentication.md). |
| `HotelId` | string | required | Unique identifier of the hotel. |
| `ReservationGroupId` | string | required | Unique identifier of the reservation group. |
| `Extent` | [Reservation group extent](#reservation-group-extent) | optional | Extent of data to be returned. e.g. it is possible to specify that together with the reservation group, payment requests and payments will be returned. |

#### Reservation group extent

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `PaymentRequests` | boolean | optional | Whether the response should contain [Payment requests](#payment-request) related to the reservation group. |
| `Payments` | boolean | optional | Whether the response should contain [Payment](#payment) attempts related to the [Payment requests](#payment-request) for reservation group. |

### Response

```json
{
    "Id": "f6fa7e62-eb22-4176-bc49-e521d0524dee",
    "CustomerId": "7ac6ca0d-7c08-4ab1-8da8-9b44979d8855",
    "Reservations": [
        {
            "Id": "123456ec-a59d-43f1-9d97-d6c984764e8c",
            "RoomCategoryId": "4037c0ec-a59d-43f1-9d97-d6c984764e8c",
            "StartUtc": "2015-01-01T00:00:00Z",
            "EndUtc": "2015-01-03T00:00:00Z",
            "RateId": "c1d48c54-9382-4ceb-a820-772bf370573d",
            "Rate": {
                "Id": "c1d48c54-9382-4ceb-a820-772bf370573d",
                "Name": {
                    "en-US": "Rate"
                },
                "Description": {
                    "en-US": "Best rate available."
                }
            },
            "AdultCount": 3,
            "ChildCount": 0, 
            "ProductIds": [
                "d0e88da5-ae64-411c-b773-60ed68954f64"
            ],
            "Notes": "Quiet room please.",
            "Amount": { },
            "Number": "1234"
        }
    ],
    "PaymentRequestId": "2e3a700a-7b10-4e61-8e9f-acfa00ee00df",
    "TotalAmount": { },
    "PaymentRequests": [
        {
            "Id": "ace78dac-a0f3-420e-8a42-acfb00b9e1e5",
            "ReservationGroupId": "f6fa7e62-eb22-4176-bc49-e521d0524dee",
            "State": "Completed"
        }
    ],
    "Payments": [
        {
            "Id": "21639c17-edad-47f9-8348-acfb00b9f569",
            "EnterpriseId": "8a51f050-8467-4e92-84d5-abc800c810b8",
            "PaymentRequestId": "ace78dac-a0f3-420e-8a42-acfb00b9e1e5",
            "CreatedUtc": "2021-03-30T11:17:03Z",
            "State": "Charged",
            "Amount": {
                "Currency": "EUR",
                "GrossValue": 929.70,
                "NetValue": 929.70,
                "TaxValues": []
            },
            "ChargeAmount": {
              "Currency": "EUR",
              "GrossValue": 929.70,
              "NetValue": 929.70,
              "TaxValues": []
            }
        }
    ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the created reservation group. |
| `CustomerId` | string | required | Unique identifier of customer who created reservation group. |
| `Reservations` | array of [Reservation](#reservation) | required | Details of the created reservations in the group. |
| `PaymentRequestId` | string | optional | Unique identifier of payment request that can be used to complete [on session payment](../use-cases/on-session-payments.md). |
| `TotalAmount` | [Amount](hotels.md#multi-currency-amount) | required | Total amount of the whole group. |
| `PaymentRequests` | array of [Payment request](#payment-request) | optional | Contains payment requests related to the reservation group. |
| `Payments` | array of [Payment](#payment) | optional | Contains Payments related to the payment requests. |

#### Payment request

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the payment request. |
| `ReservationGroupId` | string | required | Identifier of the related reservation group. |
| `State` | string [Payment request state](#payment-request-state) | required | State of the payment request. |

#### Payment request state

- `Pending` - Non-finite state. Awaiting a next action.
- `Completed` - Finite state. Payment request that has been covered by payment.
- `Canceled` - Finite state. Payment request has been manually canceled by the creator (enterprise).
- `Expired` - Finite state. Payment request has not been completed within its expiration time.

#### Payment

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the payment. |
| `Amount` | [Amount](#amount) | required | Amount in a currency which was used to create the [Payment request](#payment-request) - usually the default currency of the enterprise. |
| `ChargeAmount` | [Amount](#amount) | required | Amount in currency which was used for the payment during the charge. i.e. currency that will be visible on the user bank statement for the payment. |
| `CreatedUtc` | string | required | Date and time of the payment creation in UTC timezone in ISO 8601 format. |
| `EnterpriseId` | string | required | Identifier of the enterprise receiving the payment. |
| `PaymentRequestId` | string | required | Identifier of the payment request. |
| `State` | string [Payment state](#payment-state) | required | State of the payment attempt. |

#### Amount

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Currency` | string | required | ISO 4217 code of the currency. |
| `GrossValue` | number | required | Gross value of the amount. (Net + sum of `TaxValues`) |
| `NetValue` | number | required | Net value of the amount. |
| `TaxValues` | array of [Tax values](hotels.md#tax-value) | required | Tax values of the amount. |

#### Payment state

- `Pending` - Non-finite state. Payment has been created, but the state is not known yet.
- `Verifying` - Non-finite state. Payment is awaiting a 3DS verification.
- `Charged` - Finite state. Payment has been successfully charged.
- `Canceled` - Finite state. Payment has been canceled, and it has not been charged.
- `Failed` - Finite state. Payment has not been charged.
