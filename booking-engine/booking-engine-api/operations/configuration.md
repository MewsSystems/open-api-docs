# Configuration

## Get configuration

Get configuration data for the specified booking engine instances, including location, supported room and space categories, products, tax environment, and so on.
This operation can be called initially to fetch data which may be important during the booking workflow.

### Request

`[ApiBaseUrl]/api/distributor/v1/configuration/get`

```json
{
    "Client": "My Client 1.0.0",
    "Ids": [
        "3edbe1b4-6739-40b7-81b3-d369d9469c48",
        ...
    ],
    "PrimaryId": "3edbe1b4-6739-40b7-81b3-d369d9469c48"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Client` | string | required | Identification of the API client, as described in [Authentication](../guidelines/authentication.md). |
| `PrimaryId` | string | required | Unique identifier of the primary [Configuration](#configuration-1). |
| `Ids` | array of string | required | Set of unique identifiers of [Configurations](#configuration-1). |

### Response

```json
{
    "Cities": [
        {
            "Id": "9044b0bf-cbe0-4df5-beeb-b32e19bcd073",
            "ImageId": "e956201e-ba2f-470f-8070-b43f9cd72194",
            "Name": {
                "en-US": "Amsterdam"
            }
        }
    ],
    "CityId": "9044b0bf-cbe0-4df5-beeb-b32e19bcd073",
    "Configurations": [
        {
            "Id": "3edbe1b4-6739-40b7-81b3-d369d9469c48",
            "AdultCount": null,
            "ChildCount": null,
            "ChildSelectionEnabled": null,
            "CompetitorRateDescription": {
                "en-US": "Competitor Rate Description"
            },
            "CompetitorPriceRelativeAdjustment": 1.1,
            "DisplayAvailability": null,
            "DisplayPromoCode": null,
            "DisplayRateComparision": null,
            "DisplaySpecialRequests": null,
            "Enterprise": {
                "AcceptedCurrencyCodes": ["EUR"],
                "AdditionalLegalStatements": {
                    "en-US": "Lorem ipsum."
                },
                "Address": {
                    "City": "Zeist",
                    "CountryCode": "NL",
                    "Latitude": 52.0749748,
                    "Line1": "Arnhemse Bovenweg 31",
                    "Line2": "",
                    "Longitude": 5.2590181,
                    "PostalCode": "3708 AA"
                },
                "Categories": [
                    {
                        "Description": {
                            "en-US": "Our Single Castleroom is a cozy and comfortable room with a single bed (80x200), spacious bathroom with guest supplies, working desk and a flat screen TV. This quiet non-smoking room of 15m2 has a nice view of the Castle and of course there is free high speed Wi-Fi.\r\n"
                        },
                        "ExtraBedCount": 0,
                        "Id": "295d96e7-8501-4cbd-b78d-8bf590bf6db9",
                        "Name": { "en-US": "Single Castleroom" },
                        "NormalBedCount": 1,
                        "Ordering": 0,
                        "SpaceType": "Room"
                    }
                ],
                "CategoryImageAssignments": [
                    {
                      "Id": "69832f4b-4b47-4d32-9b89-ac0600de0cd6",
                      "CategoryId": "295d96e7-8501-4cbd-b78d-8bf590bf6db9",
                      "ImageId": "f987a97c-5049-44ca-9933-5b657e5263e2",
                      "Ordering": 2
                    }
                ],
                "CityId": "39db0c2f-6929-47ec-9386-0abdaaef4c9c",
                "DefaultCurrencyCode": "EUR",
                "DefaultLanguageCode": "nl-NL",
                "DefaultRateCurrencyCode": "EUR",
                "Description": { "nl-NL": "" },
                "Email": "info@kasteelkerckebosch.com",
                "IanaTimeZoneIdentifier": "Europe/Berlin",
                "Id": "7a13590c-6538-461e-b02f-6357400de493",
                "ImageId": "263c3e5f-e11d-41d8-9746-4bdd0852f04f",
                "IntroImageId": "f24469f8-c23b-4450-a1f8-3ecd39904e99",
                "Name": {
                    "en-US": "Sample Hotel Description"
                },
                "Pricing": "Gross",
                "PrivacyPolicyUrl": {
                    "en-US": "https://localhost/en"
                },
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
                "TaxEnvironmentCode": "NL",
                "Telephone": "030 6926666",
                "TermsAndConditionsUrl": {
                    "en-US": "https://website.com/terms-and-conditions.html"
                }
            },
            "OnlineTravelAgencies": [],
            "PaymentCardRequirement": "NotRequired",
            "RequiredFields": [],
            "ServiceId": "c1eec12a-1101-4bg6-ad24-e48f8dlpb9ee"
        }
    ],
    "Services": [
        {
            "Id": "c1eec12a-1101-4bg6-ad24-e48f8dlpb9ee",
            "EnterpriseId": "7a13590c-6538-461e-b02f-6357400de493",
            "Ordering": 1,
            "CreatedUtc": "2021-03-30T11:17:03Z",
            "IsActive": true,
            "Names": {
                "en-US": "Accommodation"
            },
            "ShortNames": {
                "en-US": "Accommodation"
            },
            "Data": {
                "Discriminator": "Bookable",
                "Value": {
                    "StartOffset": "P0M0DT15H0M0S",
                    "EndOffset": "P0M0DT12H0M0S",
                    "TimeUnit": "Day"
                }
            }
        }
    ],
    "CurrencyCode": null,
    "CurrencyCodes": [],
    "DisplayVoucherCode": false,
    "EndDateOffset": null,
    "GtmContainerId": "",
    "IntroVideoUrl": "",
    "LanguageCode": null,
    "NowUtc": "2020-04-09T07:18:48Z",
    "PrimaryColor": "",
    "StartDateOffset": null,
    "Theme": null,
    "VoucherCode": ""
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Cities` | array of [City](#city) | required | Cities supported by the enterprise. |
| `CityId` | string | required | Unique identifier of the default city. |
| `Configurations` | array of [Configurations](#configuration-1) | required | Configurations of the booking engine instances. |
| `Services` | array of [Services](#service) | required | Services that the configurations are set up for. |
| `CurrencyCode` | string | optional | ISO 4217 code of the currency which Mews Booking Engine should use when displaying prices. [Supported currency codes](../guidelines/supported-currency-codes.md)|
| `DisplayVoucherCode` | boolean | required | Determines whether enterprise's voucher codes should be listed in Mews Booking Engine \(voucher codes are listed by default\). |
| `StartDateOffset` | number | optional | Number of days after the day that the customer is booking that will be selected as the default start date in the date picker \(for example, if `3` is set and a customer uses the booking engine on the 1st day of the month, the default start date will be the 4th\). If left blank, the default will be 0. |
| `EndDateOffset` | number | optional | Number of days after the day that the customer is booking that will be selected as the default end date in the date picker  \(for example, if `3` is set and a customer uses the booking engine on the 1st day of the month, the default end date will be the 3rd\). If left blank, the default will be `4`. |
| `GtmContainerId` | string | optional | Google Tag Manager identifier. |
| `IntroVideoUrl` | string | optional | Booking engine's intro video URL. |
| `LanguageCode` | string | optional | Language code which Mews Booking Engine should use. [Supported language codes](../guidelines/supported-language-codes.md) |
| `NowUtc` | string | required | Current server date and time in UTC timezone in ISO 8601 format. |
| `PrimaryColor` | string | optional | Booking engine's primary color in Hex format. |
| `Theme` | [Theme](#theme) | optional | Booking engine's theme variant. |
| `VoucherCode` | string | optional | Voucher code which enables special rate offerings. |

#### Theme

* `Light`
* `Dark`

#### City

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the city. |
| `ImageId` | string | optional | Unique identifier of the city image. |
| `Name` | [Localized text](hotels.md#localized-text) | required | City name. |

#### Configuration

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the configuration. |
| `AdultCount` | number | optional | Default number of adults. |
| `ChildCount` | number | optional | Default number of children. |
| `ChildSelectionEnabled` | boolean | optional | Determines whether to allow adding children to reservations \(true by default\). |
| `CompetitorPriceRelativeAdjustment` | number | optional | Percentage markup with which competitor's prices \(listed in the rate comparison banner if `DisplayRateComparison` is set to `true`\) will be shown, compared to enterprise's Best Available Rate \(BAR\). For example, if enterprise's BAR costs 50, and entered here is `1`, their rate will be shown as 50. If here is entered `1.1`, their rate will be shown as 55 \(as here is added a 10% markup\). |
| `CompetitorRateDescription` | [Localized text](hotels.md#localized-text) | required | Description differentiating enterprise's online booking from competitors booking. \(for example, `20% online booking discount` or `Breakfast included`\). |
| `DisplayAvailability` | boolean | optional | Determines whether to display property's availability next to maximum occupancy in space categories \(availability will be shown by default\). |
| `DisplayRateComparison` | boolean | optional | Determines whether to display rate comparison. |
| `DisplaySpecialRequests` | boolean | optional | Determines whether to display special requests field during checkout. |
| `Enterprise` | [Enterprise](#enterprise) | required | Enterprise to which the `Configuration` belongs. |
| `OnlineTravelAgencies` | array of string | required | Array of travel agencies to include in comparison banner. |
| `PaymentCardRequirement` | string [Payment card requirement](#payment-card-requirement) | required |  Determines how to handle payment cards. |
| `RequiredFields` | array of [Required fields](#required-field) | required | Form fields which are required and need to be filled in. |
| `ServiceId` | string | required | Unique identifier of the service to which the configuration is bound. |

#### Service

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the service. |
| `EnterpriseId` | string | required | Identifier of the enterprise the service belongs to. |
| `Ordering` | number | required | Number defining the ordering of the services. |
| `CreatedUtc` | string | required | Date and time of the service creation in UTC timezone in ISO 8601 format. |
| `IsActive` | boolean | required | Whether the service is still active. |
| `Names` | [Localized text](hotels.md#localized-text) | required | Service name. |
| `ShortNames` | [Localized text](hotels.md#localized-text) | required | Service short name. |
| `Data` | [Service data](#service-data) | required | Additional information about the specific service. |

#### Service data

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Discriminator` | string [Service data discriminator](#service-data-discriminator) | required | Determines type of value. |
| `Value` | object | required | Structure of object depends on [Service data discriminator](#service-data-discriminator). |

#### Service data discriminator

* `Bookable` - Data specific to a bookable service.

#### Bookable service data

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `StartOffset` | string | required | Offset from the start of the time unit defining the default start of the reservations in ISO 8601 duration format. |
| `EndOffset` | string | required | Offset from the end of the time unit defining the default end of the reservations in ISO 8601 duration format. |
| `TimeUnit` | [Time unit](#time-unit) | required | Time unit of the service. |

Time units represent a fixed, finite time interval: a minute, a day, a month, etc. A Time unit defines the operable periods for a bookable service. We currently only support the Day unit.
We think of the daily time unit as the physical time unit that starts at midnight and ends at midnight the following day.
Start offsets are anchored to the start of the time unit and end offsets are anchored to the end of the time unit.
`StartOffset` and `EndOffset` define the default start and end of the service (so, the service orders).

Positive end offsets of the daily time unit define the nightly service as depicted in the diagram below.

![](../../.gitbook/assets/timeunits-distributor-night.png)

Negative or zero end offsets of the daily time unit define the daily service as depicted in the diagram below.

![](../../.gitbook/assets/timeunits-distributor-day.png)

#### Time unit

* `Day`
* ...

#### Payment card requirement
* `NotRequired` - Payment card info is never required. 
* `AlwaysRequired` - Payment card info is always required and validated.
* `NotRequiredForFullyPaidBookings` - Payment card info is not required for fully paid bookings. Otherwise required.
* `NotRequiredForFullyOrPartiallyPaidBookings` - Payment card info is not required for fully or partially paid bookings. Otherwise required.

#### Required field

* `Telephone`

#### Enterprise

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the enterprise. |
| `AcceptedCurrencyCodes` | array of string | required | Array of currency codes in ISO 4217 format accepted by the enterprise. |
| `AdditionalLegalStatements` | array of [Localized text](hotels.md#localized-text) | required | Additional legal statements. |
| `Address` | [Address](#address) | required | Address of the enterprise. |
| `Categories` | array of [Room category](hotels.md#room-category) | required | Array of active room categories of the enterprise. |
| `CategoryImageAssignments` | array of [Category image assignment](#category-image-assignment) | required | Array of images representing the category image. |
| `CityId` | string | required | Unique identifier of the [City](#city). |
| `DefaultCurrencyCode` | string | required | Default enterprise currency code in ISO 4217 format. |
| `DefaultLanguageCode` | string | required | Default enterprise language in ISO format. |
| `DefaultRateCurrencyCode` | string | required | Default enterprise rate currency code in ISO 4217 format. |
| `Description` | [Localized text](hotels.md#localized-text) | required | Enterprise description. |
| `Email` | string | required | Email of the enterprise. |
| `IanaTimeZoneIdentifier` | string | required | IANA time zone identifer. |
| `ImageId` | string | optional | Unique identifier of the enterprise logo. |
| `IntroImageId` | string | optional | Unique identifier of the enterprise intro image. |
| `Name` | [Localized text](hotels.md#localized-text) | required | Enterprise name. |
| `Pricing` | string [Pricing method](#pricing-method) | required | Pricing method used by the enterprise. |
| `PrivacyPolicyUrl` | [Localized text](hotels.md#localized-text) | required | Enterprise privacy policy URL. |
| `Products` | array of [Product](hotels.md#product) | required | Array of active products which can be offered to the customer. |
| `TaxEnvironmentCode` | string | required | Tax environment code. |
| `Telephone` | string | required | Telephone of the enterprise. |
| `TermsAndConditionsUrl` | [Localized text](hotels.md#localized-text) | required | Enterprise terms and conditions URL. |

#### Address

| Property | Type |  | Description |
| :-- | :-- | :-- | :-- |
| `City` | string | optional | City. |
| `CountryCode` | string | optional | ISO 3166-1 code of the [Country](hotels.md#country). |
| `Latitude` | number | optional | The latitude. |
| `Longitude` | number | optional | The longitude. |
| `Line1` | string | optional | First address line. |
| `Line2` | string | optional | Second address line. |
| `PostalCode` | string | optional | Postal code. |

#### Category image assignment 

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the room category. |
| `CategoryId` | string | required | Unique identifier of the [Room category](hotels.md#room-category) for which the image is attached. |
| `ImageId` | string | required | Unique identifier of the image that can be used in the [URL to get the image file](../guidelines/images.md). |
| `Ordering` | number | required | Ordinal number of the image that can be used to display the images in order defined in the administration. |

#### Pricing method

* `Gross` - The enterprise shows amount with gross prices.
* `Net` - The enterprise shows amount with net prices.
