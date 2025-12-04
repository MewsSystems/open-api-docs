# Hotels

## Get hotels

Get hotels data for a single specified hotel. This operation can be called initially to fetch data which may be important during the booking workflow.

### Request

`[ApiBaseUrl]/api/distributor/v1/hotels/get`

```json
{
    "Client": "My Client 1.0.0",
    "HotelId": "3edbe1b4-6739-40b7-81b3-d369d9469c48"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Client` | string | required | Identification of the client, as described in [Authentication](../guidelines/authentication.md). |
| `HotelId` | string | required | Unique identifier of the hotel. |

### Response

```json
{
    "Languages": [
        {
            "Code": "en-US",
            "Name": "English (United States)",
            "DefaultCulture": {
                "CurrencyDecimalSeparator": ",",
                "CurrencyGroupSeparator": "."
            }
        }
    ],
    "Currencies": [
        {
            "Code": "CZK",
            "Symbol": "Kč",
            "ValueFormat": "#,##0 \"Kč\";−#,##0 \"Kč\"",
            "DecimalPlaces": 0,
            "SymbolIsBehindValue": true
        }
    ],
    "Countries": [
        {
            "Code": "CZ",
            "Name": "Czech Republic"
        }
    ],
    "ImageBaseUrl": "https://cdn.mews-demo.com/Media/Image",
    "Id": "3edbe1b4-6739-40b7-81b3-d369d9469c48",
    "Name": {
        "en-US": "Distributor api hotel"
    },
    "Description": {
        "en-US": ""
    },
    "CityId": "e5fd108e-1e0a-4cc4-9d3a-34d7e0e57527",
    "ImageId": "87ead9b6-8c96-4b3c-a90d-fb8a02a005ad",
    "IntroImageId": "c0dcec83-96a4-44b5-a898-de2becbbdb5e",
    "DefaultLanguageCode": "en-US",
    "DefaultCurrencyCode": "EUR",
    "DefaultRateCurrencyCode": "EUR",
    "SupportedLanguageCodes": [
        "cs-CZ",
        "da-DK",
        "de-CH",
        "de-DE",
        "el-GR",
        "en-GB",
        "ta-IN",
        "tr-TR",
        "uk-UA",
        "en-US"
    ],
    "AcceptedCurrencyCodes": [
        "CZK",
        "EUR",
        "USD"
    ],
    "RoomCategories": [
        {
            "Id": "d79fa529-d95e-485e-b81b-e8a669a1062a",
            "Name": {
                "en-US": "King Double Room"
            },
            "Description": {
                "en-US": "The double rooms have two separate beds, 2 x 105 wide."
            },
            "Ordering": 4,
            "NormalBedCount": 2,
            "ExtraBedCount": 0,
            "SpaceType": "Room"
        }
    ],
    "Products": [
        {
            "Id": "4fd0e6e0-101c-410d-8c12-ad6000b7e390",
            "Name": {
                "en-US": "Breakfast"
            },
            "Description": {},
            "CategoryId": "77e0a18c-f2a5-418f-b578-16d3599c059d",
            "ImageId": null,
            "IncludedByDefault": false,
            "Pricing": {
                "Discriminator": "Absolute",
                "Value": {
                    "CHF": {
                        "Currency": "CHF",
                        "GrossValue": 108.31,
                        "NetValue": 98.46,
                        "TaxValues": [
                            {
                                "TaxRateCode": "CZ-L",
                                "Value": 9.85
                            }
                        ]
                    },
                    "EUR": {
                        "Currency": "EUR",
                        "GrossValue": 100,
                        "NetValue": 90.91,
                        "TaxValues": [
                            {
                                "TaxRateCode": "CZ-L",
                                "Value": 9.09
                            }
                        ]
                    }
                }
            },
            "ChargingMode": "PerTimeUnit",
            "PostingMode": "PerTimeUnit",
            "Ordering": 1
        },
        {
            "Id": "5d6de830-8ada-4b65-b72c-60fc1e719f1b",
            "Name": {
                "nl-NL": "Extra bedlinnen",
                "en-US": "Extra bedlinnen (Once Off)"
            },
            "Description": {},
            "CategoryId": "77e0a18c-f2a5-418f-b578-16d3599c059d",
            "ImageId": "ec643f33-cd6c-4250-accd-518182165ffe",
            "IncludedByDefault": false,
            "Pricing": {
                "Discriminator": "Relative",
                "Value": {
                    "ProductIds": [],
                    "TaxRateCodes": [
                        "CZ-L"
                    ],
                    "Multiplier": 0.05,
                    "Target": "GrossValue"
                }
            },
            "ChargingMode": "Once",
            "PostingMode": "Once",
            "Ordering": 0
        }
    ],
    "PaymentGateway": {
        "PaymentGatewayType": "PciProxy",
        "IsMerchant": true,
        "SupportedCreditCardTypes": [
            "MasterCard",
            "Visa",
            "Amex"
        ],
        "PublicKey": "1100016827"
    },
    "TermsAndConditionsUrl": "https://app.mews-demo.com/Platform/Document/TermsAndConditions/3edbe1b4-6739-40b7-81b3-d369d9469c48",
    "IanaTimeZoneIdentifier": "Europe/Budapest",
    "Email": "distributor-api@mews.li",
    "Telephone": "+",
    "AdditionalLegalStatements": [],
    "Address": {
        "Line1": "Staromestske namesti 16",
        "Line2": "",
        "City": "Prague",
        "PostalCode": "11000",
        "CountryCode": "US",
        "Latitude": null,
        "Longitude": null
    }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Countries` | array of [Country](#country) | required | Countries supported by the hotel. |
| `Currencies` | array of [Currency](#currency) | required | Currencies accepted by the hotel. |
| `DefaultCurrencyCode` | string | required | Code of hotel’s default currency. |
| `DefaultLanguageCode` | string | required | Code of hotel’s default language. |
| `DefaultRateCurrencyCode` | string | required | Code of currency of hotel’s default rate. |
| `IanaTimezoneIdentifier` | string | required | Iana identifier of hotel’s time zone |
| `ImageId` | string | optional | Unique identifier of hotel’s logo image. |
| `IntroImageId` | string | optional | Unique identifier of hotel’s intro image \(usable as background image\). |
| `Languages` | array of [Language](#language) | required | Languages supported by the hotel. |
| `Name` | [Localized text](#localized-text) | required | Name of the hotel. |
| `Description` | [Localized text](#localized-text) | required | Description of the hotel. |
| `PaymentGateway` | one of [Payment gateway](#payment-gateway) types | optional | Info about payment gateway used by the hotel. |
| `Products` | array of [Product](#product) | required | All products orderable with rooms associated with the first bookable service in the list of services of this enterprise. |
| `RoomCategories` | array of [Room category](#room-category) | required | All room categories offered by hotel. |
| `TermsAndConditionsUrl` | string | optional | URL of hotel’s terms and conditions. |
| `ImageBaseUrl` | string | required | Base URL of images. |

> The returned list of products contains only the products associated with the first bookable service in the list of services of this enterprise.

#### Country

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Code` | string | required | ISO 3166-1 Aplha-2 code of the country. |
| `Name` | string | required | Name of the country. |

#### Currency

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Code` | string | required | Code of the currency in ISO 4217 format. |
| `Symbol` | string | required | Symbol of the currency. |
| `ValueFormat` | string | required | Format of a currency value \(for both positive and negative values, including symbol\). |
| `DecimalPlaces` | number | required | Number of decimal places used with the currency value. |
| `SymbolIsBehindValue` | boolean | required | Indicates whether the symbol stands behind a value in standard formatting. |

#### Language

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Code` | string | required | Language code. |
| `Name` | string | required | Name of the language. |
| `DefaultCulture` | [Culture](#culture) | required | Specifics of a default culture for the language. |

#### Culture

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `CurrencyDecimalSeparator` | string | required | Symbol used to separate decimal places in the currency value format. |
| `CurrencyGroupSeparator` | string | required | Symbol used to separate thousands in the currency value format. |

#### Localized text

A localized text is an object of the property values localized into languages supported by hotel, indexed by language codes.

#### Payment gateway

If the hotel does not use any payment gateway, the value is null. If it does, then you should use a specific API call and the gateway’s library to encode credit card data.
The main purpose of a payment gateway is to securely obtain the credit card of the customer before a reservation is created. You can decide not to support any of them and just ignore it, in which case reservations are created with a note about missing credit card.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `PaymentCardStorageType` | string [Payment card storage type](#payment-card-storage-type) | required | Type of the payment card storage used by enterprise. |
| `IsMerchant` | boolean | required | Whether the gateway is processed through **Mews Payments** or not (formerly called Mews Merchant). |
| `SupportedCreditCardTypes` | array of [Credit card type](#credit-card-type) | required | Supported payment cards, should be used to enhance UX. |
| `PublicKey` | string | required | Merchant identifier for which PCI Proxy iframe is connected. |
| `DefaultCurrencyCode` | string | required | Currency code of default payment gateway in ISO 4217 format. |

#### Payment card storage type

* `PciProxy`

#### Credit card type

* `MasterCard`
* `Visa`
* `Amex`
* `Discover`
* `DinersClub`
* `Jcb`
* `Maestro`
* ...

#### Product

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the product. |
| `CategoryId` | string | optional | Unique identifier of the product category. |
| `Name` | [Localized text](#localized-text) | required | Name of the product localized into all supported languages. |
| `Description` | [Localized text](#localized-text) | required | Description of the product localized into all supported languages. |
| `ImageId` | string | optional | Unique identifier of the product’s image. |
| `IncludedByDefault` | boolean | required | Indicates whether the product should be added to order by default. |
| `Pricing` | [Pricing coproduct](#pricing-coproduct) | required | Object defining the pricing method and price values. |
| `ChargingMode` | string [Product charging mode](#product-charging-mode) | required | Charging mode of the product. |
| `PostingMode` | string [Product posting mode](#product-posting-mode) | required | Posting mode of the product. |

#### Pricing coproduct

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Discriminator` | string [Pricing data discriminator](#pricing-data-discriminator) | required | Determines type of value. |
| `Value` | [Multi-currency amount](#multi-currency-amount) / [Relative price data value](#relative-price-data-value) | required | Structure of object depends on the [Pricing data discriminator](#pricing-data-discriminator) |

#### Pricing data discriminator

* `Absolute` - Data specific to absolutely priced product are represented by [Multi-currency amount](#multi-currency-amount).
* `Relative` - Data specific to relatively priced product are represented by [Relative price data value](#relative-price-data-value).

#### Relative price data value

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ProductIds` | array of string | required | Unique identifiers of [Products](#product) used to calculate the price of the relatively priced product. |
| `Multiplier` | number | required | Percentage of the relative price. |
| `Target` | [Relative price target](#relative-price-target) | required | Target defining whether the price of a product should be calculated by multiplying gross value, tax value or net value of dependant products. |
| `TaxRateCodes` | array of string | required | Tax rate codes that should be applied to the price in order to calculate the taxes of the product. |

#### Relative price target

* `GrossValue` - The price of the product should be calculated from gross value of dependant products
* `TaxValue` - The price of the product should be calculated from tax value of dependant products
* `NetValue` - The price of the product should be calculated from net value of dependant products

#### Product charging mode

* `Once`
* `PerTimeUnit`
* `PerPersonPerTimeUnit`
* `PerPerson`

#### Product posting mode

* `Once`
* `PerTimeUnit`

#### Multi-currency amount

An object where name corresponds to ISO code and value represents a structure that holds gross price, net price and tax values.

```json
{
    "USD":
        {
            "GrossValue": 100.00,
            "NetValue": 93.46,
            "TaxValues": [
                {
                    "TaxRateCode": "DE-R",
                    "Value": 6.54
                }
            ]
        }
}
```

| Property | Type | Description |
| :-- | :-- | :-- |
| `GrossValue` | Number | Net price + taxes |
| `NetValue` | Number | Amount without taxes |
| `TaxValues` | Collection of [Tax values](#tax-value) | Tax values for the net value amount |

#### Tax value

| Property | Type | Description |
| :-- | :-- | :-- |
| `TaxRateCode` | string | Unique identifier of the rate. |
| `Value` | Number | Amount of tax |

#### Room category

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the room category. |
| `Name` | [Localized text](#localized-text) | required | Name of the room category localized into all supported languages. |
| `Description` | [Localized text](#localized-text) | required | Description of the room category localized into all supported languages. |
| `NormalBedCount` | number | required | Number of normal beds in the room category. |
| `ExtraBedCount` | number | required | Number of extra beds possible in the room category. |
| `SpaceType` | [Space type](#space-type) | required | Type of the room category. |

#### Space type

* `Room`
* `Dorm`
* `Bed`
* ...

## Get availability

Get availability and pricing options for the specified hotel for the specified date interval.
Further optional parameters can be supplied, such as room categories and voucher codes.
The availability and pricing is returned for each applicable combination of occupancy and rate, for each available room category.

### Request

`[ApiBaseUrl]/api/distributor/v1/hotels/getAvailability`

```json
{
    "Client": "My Client 1.0.0",
    "ConfigurationId": "5dfgaeb5-5848-81b3-40b7-d102e96kcf52",
    "HotelId": "3edbe1b4-6739-40b7-81b3-d369d9469c48",
    "StartUtc": "2015-01-01T00:00:00Z",
    "EndUtc": "2015-01-03T00:00:00Z",
    "ProductIds": [
        "d0e88da5-ae64-411c-b773-60ed68954f64"
    ],
    "CurrencyCode": "EUR",
    "VoucherCode": "Discount2042",
    "OccupancyData": [
        {
            "AgeCategoryId": "47ae3dbb-0de6-4afd-845b-af4900c21e2c",
            "PersonCount": 2
        }
    ],
    "CategoryIds": [
        "295d96e7-8501-4cbd-b78d-8bf590bf6db9"
    ],
    "AvailabilityBlockId": "5mgbe1b4-6739-40b7-81b3-d369d9469c48"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Client` | string | required | Identification of the client as described in [Authentication](../guidelines/authentication.md). |
| `ConfigurationId` | string | required | Unique identifier of the used Distributor configuration. |
| `HotelId` | string | required | Unique identifier of hotel. |
| `StartUtc` | string | required | Reservation start date \(arrival date\) in ISO 8601 format. |
| `EndUtc` | string | required | Reservation end date \(departure date\) in ISO 8601 format. |
| `ProductIds` | array of string | optional | Unique identifiers of products which should be included into pricing calculations. |
| `CurrencyCode` | string | optional | ISO 4217 code of the currency. If specified the prices in response will contain only single currency based on the code provided. [Supported currency codes](../guidelines/supported-currency-codes.md) |
| `VoucherCode` | string | optional | Voucher code enabling special rate offerings. |
| `OccupancyData` | array of [Occupancy Data](#occupancy-data) | required | Occupancy numbers for the reservations. |
| ~~`AdultCount`~~ | ~~number~~ | ~~optional~~ | ~~Requested number of adults. If provided together with `ChildCount`, then `RoomOccupancyAvailabilities` will be computed only for that combination instead of all possible. If `RoomCategory` doesn’t support the given values, then the nearest applicable values are found.~~ **Deprecated!** |
| ~~`ChildCount`~~ | ~~number~~ | ~~optional~~ | ~~Requested number of children.~~ **Deprecated!** |
| `CategoryIds` | array of string | optional | Unique identifiers of categories for which should be the availability computed only. If omitted, availability of all categories is returned instead. |
| `AvailabilityBlockId` | string | optional | Unique identifier of availability block, if present. When provided, only availability for this block is returned. |


#### Occupancy Data

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `AgeCategoryId` | string | required | Age category identifier - see [Where can I get Age Category ID?](../../FAQ/README.md#where-can-i-get-age-category-id). |
| `PersonCount` | number | required | Number of people in the given age category. |


### Response

```json
{
    "RateGroups": [
        {
            "Id": "634d4625-e127-4282-a17d-ab51010e4deb",
            "SettlementType": "Manual",
            "SettlementAction": "ChargeCreditCard",
            "SettlementTrigger": "Start",
            "SettlementOffset": "P0M0DT0H0M0S",
            "SettlementValue": 1.00000000,
            "SettlementFlatValue": null,
            "SettlementMaximumTimeUnits": null
        }
    ],
    "Rates": [
        {
            "Id": "c1d48c54-9382-4ceb-a820-772bf370573d",
            "Name": {
                "en-US": "Rate"
            },
            "Description": {
                "en-US": "Best rate available."
            },
            "IsPrivate": false
        }
    ],
    "RoomCategoryAvailabilities": [
        {
            "RoomCategoryId": "4037c0ec-a59d-43f1-9d97-d6c984764e8c",
            "AvailableRoomCount": 5,
            "RoomOccupancyAvailabilities": [
                {
                    "AdultCount": 1,
                    "ChildCount": 0,
                    "OccupancyData": [
                        {
                            "AgeCategoryId": "47ae3dbb-0de6-4afd-845b-af4900c21e2c",
                            "PersonCount": 1
                        }
                    ],
                    "Pricing": [
                        {
                            "RateId": "c1d48c54-9382-4ceb-a820-772bf370573d",
                            "Price": { },
                            "MaxPrice": { }
                        }
                    ]
                },
                {
                    "AdultCount": 2,
                    "ChildCount": 0,
                    "OccupancyData": [
                        {
                            "AgeCategoryId": "47ae3dbb-0de6-4afd-845b-af4900c21e2c",
                            "PersonCount": 2
                        },
                    ],
                    "Pricing": [
                        {
                            "RateId": "c1d48c54-9382-4ceb-a820-772bf370573d",
                            "Price": {
                                "TotalAmount": { },
                                "AverageAmountPerTimeUnit": { }
                            },
                            "MaxPrice": {
                                "TotalAmount": { },
                                "AverageAmountPerTimeUnit": { }
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `RateGroups` | array of [Rate group](#rate-group) | required | Information about all available rate groups. |
| `Rates` | array of [Rate](#rate) | required | Information about all available rates. |
| `RoomCategoryAvailabilites` | array of [Room category availability](#room-category-availability) | required | Availabilities of room categories. If a room category is not available, it is not included. |

#### Rate group

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the rate. |
| `SettlementType` | string [Settlement type](#settlement-type) | required | Determines if system will charge reservation cost automatically or if you'd like employees to manually process payments. |
| `SettlementAction` | string [Settlement action](#settlement-action) | required | Determines how payment will be taken at time of automatic trigger. Valid if settlement is automatic only. |
| `SettlementTrigger` | string [Settlement trigger](#settlement-trigger) | required | Moment when amount is automatically charged, with offset applying to this time \(for example, a 'Creation' trigger with no offset will charge the amount when items are created\). If settlement is manual, a task will be created at this moment. |
| `SettlementOffset` | string | required | Start of the interval in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601#Durations) which gets added before or after selected settlement trigger \(for example, '-1 day' will charge the amount 1 day before\). |
| `SettlementValue` | number | optional | Percentage of the total extent cost which is charged automatically \(for example, a `1.0` settlement value will charge the full cost of extent included below\). Value is charged at the time of settlement trigger plus time difference from offset. When null, `FlatValue` is provided with absolute decimal value. |
| `SettlementFlatValue` | number | optional | Absolute value of settlement cost in settlement currency code. When provided `SettlementValue` is `null` |
| `SettlementCurrencyCode` | number | required | Settlement currency code |
| `SettlementMaximumTimeUnits` | number | optional | Maximum number of time units that will be charged automatically \(only applies to automatic settlements\). The rest will be charged manually. |

#### Settlement type

* `Automatic`
* `Manual`

#### Settlement action

* `ChargeCreditCard`
* `CreatePreauthorization`

#### Settlement trigger

* `Confirmation`
* `Start`
* `End`
* `StartDate`
* `EndDate`

#### Rate

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the rate. |
| `Name` | [Localized text](#localized-text) | required | Name of the rate localized into all supported languages. |
| `Description` | [Localized text](#localized-text) | required | Description of the rate localized into all supported languages. |
| `IsPrivate` | boolean | required | Set to `true` for promotion rate enabled by provided `VoucherCode` |

#### Room category availability

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `RoomCategoryId` | string | required | Unique identifier of the room category. |
| `RoomOccupancyAvailabilities` | array of [Room occupancy availability](#room-occupancy-availability) | required | Availabilities of rooms in the category by the room occupancy. |
| `AvailableRoomCount` | number | required | Number of available rooms from the room category. |

#### Room occupancy availability

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| ~~`AdultCount`~~ | ~~number~~ | ~~required~~ | ~~Number of adults for the associated pricing.~~ **Deprecated!** |
| ~~`ChildCount`~~ | ~~number~~ | ~~required~~ | ~~Number of childs for the associated pricing.~~ **Deprecated!** |
| `OccupancyData` | array of [OccupancyData](#occupancy-data) | required | List of occupancy data. |
| `Pricing` | array of [Pricing](#pricing) | required | Pricing information. |

#### Pricing

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `RateId` | string | required | Unique identifier of a rate. |
| `Price` | [Room price](#room-price) | required | Price of the room. |
| `MaxPrice` | [Room price](#room-price) | required | Max price of the room with the same parameters and conditions among other rates. Can be understood \(and possibly displayed\) as the value before discount. |

#### Room price

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `TotalAmount` | [Multi-currency amount](#multi-currency-amount) | required | Total amount of the room for whole reservation. |
| `AverageAmountPerTimeUnit` | [Multi-currency amount](#multi-currency-amount) | required | Average amount per time unit. |

## Get payment configuration

Fetch payment configuration parameters for the specified hotel.

### Request

`[ApiBaseUrl]/api/distributor/v1/hotels/getPaymentConfiguration`

```json
{
    "Client": "My Client 1.0.0",
    "HotelId": "3edbe1b4-6739-40b7-81b3-d369d9469c48"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Client` | string | required | Identification of the client as described in [Authentication](../guidelines/authentication.md). |
| `HotelId` | string | required | Unique identifier of hotel. |

### Response

```json
{
    "PaymentGateway": {
        "PaymentGatewayType": "PciProxy",
        "PaymentCardStorageType": "PciProxy",
        "IsMerchant": true,
        "SupportedCreditCardTypes": [
            "MasterCard",
            "Visa"
        ],
        "PublicKey": "1100116614",
        "DefaultCurrencyCode": "EUR"
    },
    "SurchargeConfiguration": {
        "SurchargeServiceId": "74d5eb0a-784a-4870-b34a-ab6500a1136e",
        "SurchargeFees": {
            "MasterCard": 0.02,
            "Visa": 0.01,
            "Amex": 0.0125
        }
    }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `PaymentGateway` | [Payment gateway](#payment-gateway) | required | Object that describes payment gateway of the enterprise. |
| `SurchargeConfiguration` | [Surcharge configuration](#surcharge-configuration) | required | Object describing surcharge configuration used by the enterprise. |

#### Surcharge configuration

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `SurchargeServiceId` | string | optional | Unique identifier of surcharge service. |
| `SurchargeFees` | [Surcharge fees](#surcharge-fees) | required | Surcharge fees are additional fees charged by payment card company. |

#### Surcharge fees

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Key` | string [Credit card type](#credit-card-type) | required | Credit card type. |
| `Value` | number | required | Amount of the surcharge fee itself. |
