# Reservations

## Get reservations pricing

Get a price quotation for a specific hotel, date interval, room category and person count.

### Request

`[ApiBaseUrl]/api/distributor/v1/reservations/getPricing`

```json
{
    "Client": "My Client 1.0.0",
    "HotelId": "3edbe1b4-6739-40b7-81b3-d369d9469c48",
    "StartUtc": "2015-01-01T00:00:00Z",
    "EndUtc": "2015-01-03T00:00:00Z",
    "VoucherCode": "Discount2042",
    "RoomCategoryId": "3540c7d4-e128-41e2-81d8-ff4d196c595a",
    "Occupancies": [
        {
            "OccupancyData": [
                {
                    "AgeCategoryId": "16e8a466-729e-4d32-a221-ade300e410a8",
                    "PersonCount": 1
                }
            ]
        }
    ],
    "ProductIds": [
        "d0e88da5-ae64-411c-b773-60ed68954f64"
    ],
    "AvailabilityBlockId": "5mgbe1b4-6739-40b7-81b3-d369d9469c48"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Client` | string | required | Identification of the client as described in [Authentication](../guidelines/authentication.md). |
| `HotelId` | string | required | Unique identifier of the hotel. |
| `StartUtc` | string | required | Start date of the reservation, i.e. arrival date. |
| `EndUtc` | string | required | End date of the reservation, i.e. departure date. |
| `VoucherCode` | string | optional | Voucher code enabling special rate offerings. |
| `RoomCategoryId` | string | required | Identifier of the requested room category. |
| `Occupancies` | array of [Occupancy](#occupancy) | required | Occupancy numbers for the reservations. |
| `ProductIds` | array of string | optional | Unique identifiers of the requested products. |
| `AvailabilityBlockId` | string | optional | Unique identifier of availability block if present. Provide always when you have it.  |

#### Occupancy

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `OccupancyData` | array of [OccupancyData](#occupancy-data) | required | List of occupancy data. |
| ~~`AdultCount`~~ | ~~number~~ | ~~required~~ | ~~Number of adults.~~ **Deprecated!** |
| ~~`ChildCount`~~ | ~~number~~ | ~~required~~ | ~~Number of children.~~ **Deprecated!** |

### Response

```json
{
    "OccupancyPrices": [
        {
            "AdultCount": 1,
            "ChildCount": 0,
            "OccupancyData": [
                {
                    "AgeCategoryId": "16e8a466-729e-4d32-a221-ade300e410a8",
                    "PersonCount": 1
                }
            ],
            "Pricing": [
                {
                    "MaxPrice": {
                        "TotalAmount": { },
                        "AverageAmountPerTimeUnit": { }
                    },
                    "Price": {
                        "TotalAmount": { },
                        "AverageAmountPerTimeUnit": { }
                    },
                    "RateId": "b34330be-7e19-453e-8959-592c4e820f85"
                }
            ]
        }
    ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `OccupancyPrices` | array of [Room occupancy availability](hotels.md#room-occupancy-availability) | required | Pricing information. |



## Get reservation price

Get a total price for the requested reservations.

### Request

`[ApiBaseUrl]/api/distributor/v1/reservations/price`

```json
{
  "Client": "My Client 1.0.0",
  "ConfigurationId": "e4da5c87-1b4b-4e68-841e-abc800c82505",
  "CurrencyCode": "EUR",
  "Reservations": [
    {
      "Identifier": "uniqueClientGeneratedIdentifier1",
      "StartUtc": "2030-01-01T00:00:00Z",
      "EndUtc": "2030-01-03T00:00:00Z",
      "ProductIds": [
        "13800226-e46d-429d-b31f-ae590104b256"
      ],
      "VoucherCode": null,
      "RateId": "7888ba86-7ad2-4d50-abd3-acf700f0d20a",
      "RoomCategoryId": "a0c790b7-51c4-4702-a351-abc800c8118b",
      "OccupancyData": [
        {
          "AgeCategoryId": "16e8a466-729e-4d32-a221-ade300e410a8",
          "PersonCount": 1
        }
      ]
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Client` | string | required | Identification of the client as described in [Authentication](../guidelines/authentication.md). |
| `ConfigurationId` | string | required | Unique identifier of the Booking Engine configuration used. |
| `CurrencyCode` | string | optional | ISO 4217 code of the currency in which price will be calculated. Enterprise default currency code is used as default. [Supported currency codes](../guidelines/supported-currency-codes.md)|
| `Reservations` | array of [Reservation](#reservation) | required | List of reservations. |

#### Reservation

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| ~~`AdultCount`~~ | ~~number~~ | ~~required~~ | ~~Number of adults.~~ **Deprecated!** |
| ~~`ChildCount`~~ | ~~number~~ | ~~required~~ | ~~Number of children.~~ **Deprecated!** |
| `Identifier` | string | required | Unique identifier for reservation generated on client. |
| `StartUtc` | string | required | Start date of the reservation, i.e. arrival date. |
| `EndUtc` | string | required | End date of the reservation, i.e. departure date. |
| `ProductIds` | array of string | optional | Unique identifiers of products which should be included into reservation price calculations. |
| `VoucherCode` | string | optional | Voucher code applied to reservation |
| `RateId` | string | required | Identifier of the chosen rate. |
| `RoomCategoryId` | string | required | Unique identifier of the room category. |
| `OccupancyData` | array of [OccupancyData](#occupancy-data) | required | List of occupancy data. |

#### Occupancy Data

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `AgeCategoryId` | string | required | Age category identifier. |
| `PersonCount` | number | required | Person count. |


### Response

```json
{
  "ReservationPrice": [
    {
      "Identifier": "uniqueClientGeneratedIdentifier1",
      "TotalAmount": {
        "Currency": "EUR",
        "GrossValue": 310.00,
        "NetValue": 282.72,
        "TaxValues": [
          {
            "TaxRateCode": "ES-2016-R",
            "Value": 27.28
          }
        ],
        "Breakdown": {
          "Items": [
            {
              "TaxRateCode": "ES-2016-R",
              "NetValue": 272.72,
              "TaxValue": 27.28
            },
            {
              "TaxRateCode": null,
              "NetValue": 10.0,
              "TaxValue": 0.0
            }
          ]
        }
      },
      "AmountToChargeOnConfirmation": null,
      "ProductOrderPrices": [
        {
          "ProductId": "13800226-e46d-429d-b31f-ae590104b256",
          "AgeCategoryId": null,
          "ProductName": {
            "es-ES": "Before check in"
          },
          "ProductOptions": {
            "SelectedByDefault": false,
            "BillAsPackage": false,
            "OfferToCustomer": true,
            "ExcludePriceFromOffer": false,
            "OfferToEmployee": true
          },
          "ChargingMode": "Once",
          "TotalAmount": {
            "Currency": "EUR",
            "GrossValue": 10.0,
            "NetValue": 10.0,
            "TaxValues": [],
            "Breakdown": {
              "Items": [
                {
                  "TaxRateCode": null,
                  "NetValue": 10.0,
                  "TaxValue": 0.0
                }
              ]
            }
          }
        }
      ]
    }
  ]
}
```

#### ReservationPrice

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Identifier` | string | optional | Unique identifier for reservation provided in the request data. |
| `AmountToChargeOnConfirmation` | [Amount](#amount) | optional | Amount that needs to be charged on payment gateway on reservationGroup confirmation. |
| `TotalAmount` | [Amount](#amount) | required | Total amount of the reservation. |
| `ProductOrderPrices` | array of [ProductOrderPricingInfo](#productorderpricinginfo) | required | List of product order prices assigned to the reservation. |

#### ProductOrderPricingInfo
| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ProductId` | string | required | Unique identifier of product. |
| `AgeCategoryId` | string | optional | Identifier of age category. |
| ~~`ProductName`~~ | ~~[Localized text](hotels.md#localized-text)~~ | ~~required~~ | ~~Name of the hotel.~~ **Deprecated!** |
| `ProductOptions` | [ProductOptions](#productoptions) | optional | Product options. |
| ~~`ChargingMode`~~ | ~~string [Product charging mode](hotels.md#product-charging-mode)~~ | ~~required~~ | ~~Charging mode of the product.~~ **Deprecated!** |
| `TotalAmount` | [Amount](#amount) | required | Total amount of product. |

#### ProductOptions
| Property | Type | Contract |Description |
| :-- | :-- | :-- | :-- |
| `SelectedByDefault` | boolean | optional  | If product was selected by default for reservation. |
| `BillAsPackage` | boolean | optional  | Product is part of a package. |
| `OfferToCustomer` | boolean | optional  | Product is available in booking engine. |
| `ExcludePriceFromOffer` | boolean | optional  | Product was not available in booking engine, but it is counted in reservation total price ( eg. CityTax ). |
| `OfferToEmployee` | boolean | optional  | Product available in Mews Operations. |

#### Amount
| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Currency` | string | required | ISO 4217 code of the currency. |
| `GrossValue` | number | required | Gross value of the amount. (Net + sum of `TaxValues`). |
| `NetValue` | number | required | Net value of the amount. |
| ~~`TaxValues`~~ | ~~array of [Tax values](hotels.md#tax-value)~~ | ~~required~~ | ~~Tax values of the amount~~ **Deprecated!**. |
| `Breakdown.Items` | array of [Complete tax](#complete-tax) | required | List of complete taxes related to this amount. |

#### Complete tax
| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `TaxRateCode` | string | required | Unique identifier of Tax Rate Code. |
| `NetValue` | number | required |  Net amount of product. |
| `TaxValue` | number | required | Tax amount of product ( Calculated from NetValue based on TaxRateCode ). |
