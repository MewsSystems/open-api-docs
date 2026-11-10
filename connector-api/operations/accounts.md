<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Accounts

## Update accounts

Updates one or more existing accounts in the system. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/accounts/update`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "AccountUpdates": [
    {
      "Id": "3ff104e6-3ba8-4dfc-8d35-b0ec00c5fd4c",
      "Discriminator": "Company",
      "Customer": null,
      "Company": {
        "Email": {
          "Value": "example@example.com"
        },
        "TaxIdentifier": {
          "Value": "CZ8810310963"
        },
        "BillingCode": {
          "Value": null
        },
        "AccountingCode": {
          "Value": null
        },
        "Notes": {
          "Value": "Example notes"
        },
        "Name": {
          "Value": "Example company"
        },
        "MotherCompanyId": {
          "Value": "839e9d92-aa8b-48bf-8384-b0ec0081bb34"
        },
        "WebsiteUrl": {
          "Value": "https://www.example.com"
        },
        "InvoiceDueInterval": {
          "Value": null
        },
        "CreditRatingBasic": {
          "Value": "CreditOk"
        },
        "Department": {
          "Value": "Accounting"
        },
        "DunsNumber": {
          "Value": "987654321"
        },
        "ReferenceId": {
          "Value": null
        },
        "ExternalIdentifier": {
          "Value": "COM-123"
        },
        "AdditionalTaxIdentifier": {
          "Value": "XY00112233445"
        },
        "Contact": {
          "Value": "Sample contact"
        },
        "ContactPerson": {
          "Value": "Sample person"
        },
        "FiscalIdentifier": {
          "Value": "FiscalIdentifier"
        },
        "Iata": {
          "Value": "PAO"
        },
        "Telephone": {
          "Value": "111-222-333"
        },
        "SourceId": {
          "Value": "F42098A0-8507-4963-ACC9-B0EC00821949"
        },
        "Classifications": {
          "Corporate": {
            "Value": true
          },
          "Internal": {
            "Value": true
          },
          "Private": {
            "Value": true
          },
          "OnlineTravelAgency": {
            "Value": true
          },
          "GlobalDistributionSystem": {
            "Value": true
          },
          "Marketing": {
            "Value": true
          },
          "Inactive": {
            "Value": true
          }
        },
        "Options": {
          "Invoiceable": {
            "Value": "true"
          },
          "AddFeesToInvoices": {
            "Value": "true"
          }
        }
      }
    },
    {
      "Id": "71db411f-c1d6-4e1c-9cd7-44e8bf45f936",
      "Discriminator": "Customer",
      "Company": null,
      "Customer": {
        "Email": {
          "Value": "example@example.com"
        },
        "TaxIdentifier": {
          "Value": "CZ8810310963"
        },
        "BillingCode": {
          "Value": null
        },
        "AccountingCode": {
          "Value": null
        },
        "Notes": {
          "Value": "Example notes"
        },
        "LastName": {
          "Value": "Sample"
        },
        "FirstName": {
          "Value": "Sample"
        },
        "SecondLastName": {
          "Value": null
        },
        "BirthPlace": {
          "Value": "Sample place"
        },
        "Telephone": {
          "Value": "111-222-333"
        },
        "Occupation": {
          "Value": null
        },
        "CarRegistrationNumber": {
          "Value": null
        },
        "LoyaltyCode": {
          "Value": null
        },
        "NationalityCode": {
          "Value": "US"
        },
        "CompanyId": {
          "Value": "839e9d92-aa8b-48bf-8384-b0ec0081bb34"
        },
        "BirthDate": {
          "Value": "2000-01-01"
        },
        "Sex": {
          "Value": "Male"
        },
        "Title": {
          "Value": "Mister"
        },
        "PreferredLanguageCode": {
          "Value": null
        },
        "Options": {
          "SendMarketingEmails": {
            "Value": true
          },
          "Invoiceable": {
            "Value": true
          },
          "BillAddressObjection": {
            "Value": true
          }
        },
        "Classifications": {
          "PaymasterAccount": {
            "Value": true
          },
          "Blacklist": {
            "Value": true
          },
          "Media": {
            "Value": true
          },
          "LoyaltyProgram": {
            "Value": true
          },
          "PreviousComplaint": {
            "Value": true
          },
          "Returning": {
            "Value": true
          },
          "Staff": {
            "Value": true
          },
          "FriendOrFamily": {
            "Value": true
          },
          "TopManagement": {
            "Value": true
          },
          "Important": {
            "Value": true
          },
          "VeryImportant": {
            "Value": true
          },
          "Problematic": {
            "Value": true
          },
          "Cashlist": {
            "Value": true
          },
          "DisabledPerson": {
            "Value": true
          },
          "Military": {
            "Value": true
          },
          "Airline": {
            "Value": true
          },
          "HealthCompliant": {
            "Value": true
          },
          "InRoom": {
            "Value": true
          },
          "WaitingForRoom": {
            "Value": true
          },
          "Student": {
            "Value": true
          }
        },
        "LegalEntityIdentifiers": {
          "ItDestinationCode": {
            "Value": null
          },
          "ItFiscalCode": {
            "Value": null
          }
        }
      }
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `ChainId` | string | optional | Unique identifier of the chain. Required when using [Portfolio Access Tokens](../concepts/multi-property.md), ignored otherwise. |
| `AccountUpdates` | array of [Account update parameters](accounts.md#account-update-parameters) | required, max 1000 items | Accounts to be updated. |

#### Account update parameters

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the account. |
| `Discriminator` | [Account type discriminator](accounts.md#account-type-discriminator) | required | Type of the account. |
| `Customer` | [Customer update parameters](accounts.md#customer-update-parameters) | optional | Customer data to be updated. Required when `Discriminator` is `Customer`. |
| `Company` | [Company update parameters](accounts.md#company-update-parameters) | optional | Company data to be updated. Required when `Discriminator` is `Company`. |

#### Account type discriminator

* `Customer`
* `Company`

#### Customer update parameters

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Email` | [String update value](_objects.md#string-update-value) | optional | Email address. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `TaxIdentifier` | [String update value](_objects.md#string-update-value) | optional | Tax identification number. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `BillingCode` | [String update value](_objects.md#string-update-value) | optional | Billing code. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `AccountingCode` | [String update value](_objects.md#string-update-value) | optional | Accounting code. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `Notes` | [String update value](_objects.md#string-update-value) | optional | Notes. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `LastName` | [String update value](_objects.md#string-update-value) | optional | Last name. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `FirstName` | [String update value](_objects.md#string-update-value) | optional | First name. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `SecondLastName` | [String update value](_objects.md#string-update-value) | optional | Second last name. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `BirthPlace` | [String update value](_objects.md#string-update-value) | optional | Birth place. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `Telephone` | [String update value](_objects.md#string-update-value) | optional | Telephone number. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `Occupation` | [String update value](_objects.md#string-update-value) | optional | Occupation. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `CarRegistrationNumber` | [String update value](_objects.md#string-update-value) | optional, max length 255 characters | Car registration number. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `DietaryRequirements` | [String update value](_objects.md#string-update-value) | optional, max length 255 characters | Dietary requirements. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `LoyaltyCode` | [String update value](_objects.md#string-update-value) | optional | Loyalty code. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `NationalityCode` | [String update value](_objects.md#string-update-value) | optional | Nationality code. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `CompanyId` | [String update value](_objects.md#string-update-value) | optional | Unique identifier of the company. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `BirthDate` | [String update value](_objects.md#string-update-value) | optional | Birth date. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `Sex` | [String update value](_objects.md#string-update-value) | optional | Sex. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `Title` | [String update value](_objects.md#string-update-value) | optional | New title. Set the value to `null` to clear it; omit the property to leave it unchanged. Mutually exclusive with `CustomTitleId`: sending both with a value fails, and setting this removes the custom title the customer already had. |
| `CustomTitleId` | [String update value](_objects.md#string-update-value) | optional | Unique identifier of the `CustomTitle` to assign to the customer, as configured in the chain's guest titles. Must be a title of the caller's chain that has not been deleted; use [Get all custom titles](customtitles.md#get-all-custom-titles) to discover the available ids. Set the value to `null` to clear it; omit the property to leave it unchanged. Mutually exclusive with `Title`: sending both with a value fails, and setting this removes the title the customer already had. |
| `PreferredLanguageCode` | [String update value](_objects.md#string-update-value) | optional | Preferred language code. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `Options` | [Customer update options](accounts.md#customer-update-options) | optional | Options of the customer. |
| `Classifications` | [Customer update classifications](accounts.md#customer-update-classifications) | optional | Classifications of the customer. |
| `LegalEntityIdentifiers` | [Customer update legal entity identifiers](accounts.md#customer-update-legal-entity-identifiers) | optional | Legal entity identifiers of the customer. |

#### Customer update options

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `SendMarketingEmails` | [Bool update value](_objects.md#bool-update-value) | optional | Send marketing email. Omit the property to leave it unchanged. |
| `Invoiceable` | [Bool update value](_objects.md#bool-update-value) | optional | Invoiceable. Omit the property to leave it unchanged. |
| `BillAddressObjection` | [Bool update value](_objects.md#bool-update-value) | optional | Bill address objection. Omit the property to leave it unchanged. |

#### Customer update classifications

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `PaymasterAccount` | [Bool update value](_objects.md#bool-update-value) | optional | Paymaster account. Omit the property to leave it unchanged. |
| `Blocklist` | [Bool update value](_objects.md#bool-update-value) | optional | Blocklist. Omit the property to leave it unchanged. |
| `Media` | [Bool update value](_objects.md#bool-update-value) | optional | Media. Omit the property to leave it unchanged. |
| `LoyaltyProgram` | [Bool update value](_objects.md#bool-update-value) | optional | Loyalty program. Omit the property to leave it unchanged. |
| `PreviousComplaint` | [Bool update value](_objects.md#bool-update-value) | optional | Previous complaint. Omit the property to leave it unchanged. |
| `Returning` | [Bool update value](_objects.md#bool-update-value) | optional | Returning. Omit the property to leave it unchanged. |
| `Staff` | [Bool update value](_objects.md#bool-update-value) | optional | Staff. Omit the property to leave it unchanged. |
| `FriendOrFamily` | [Bool update value](_objects.md#bool-update-value) | optional | Friend or family. Omit the property to leave it unchanged. |
| `TopManagement` | [Bool update value](_objects.md#bool-update-value) | optional | Top management. Omit the property to leave it unchanged. |
| `Important` | [Bool update value](_objects.md#bool-update-value) | optional | Important. Omit the property to leave it unchanged. |
| `VeryImportant` | [Bool update value](_objects.md#bool-update-value) | optional | Very important. Omit the property to leave it unchanged. |
| `Problematic` | [Bool update value](_objects.md#bool-update-value) | optional | Problematic. Omit the property to leave it unchanged. |
| `Cashlist` | [Bool update value](_objects.md#bool-update-value) | optional | Cashlist. Omit the property to leave it unchanged. |
| `DisabledPerson` | [Bool update value](_objects.md#bool-update-value) | optional | Disabled person. Omit the property to leave it unchanged. |
| `Military` | [Bool update value](_objects.md#bool-update-value) | optional | Military. Omit the property to leave it unchanged. |
| `Airline` | [Bool update value](_objects.md#bool-update-value) | optional | Airline. Omit the property to leave it unchanged. |
| `HealthCompliant` | [Bool update value](_objects.md#bool-update-value) | optional | Health compliant. Omit the property to leave it unchanged. |
| `InRoom` | [Bool update value](_objects.md#bool-update-value) | optional | In room. Omit the property to leave it unchanged. |
| `WaitingForRoom` | [Bool update value](_objects.md#bool-update-value) | optional | Waiting for room. Omit the property to leave it unchanged. |
| `Student` | [Bool update value](_objects.md#bool-update-value) | optional | Student. Omit the property to leave it unchanged. |
| ~~`Blacklist`~~ | ~~[Bool update value](_objects.md#bool-update-value)~~ | ~~optional~~ | ~~Synonym of Blocklist, left for backward compatibility. Omit the property to leave it unchanged.~~ **Deprecated!** Use Blocklist instead.|

#### Customer update legal entity identifiers

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ItDestinationCode` | [String update value](_objects.md#string-update-value) | optional | Italian destination code. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `ItFiscalCode` | [String update value](_objects.md#string-update-value) | optional | Italian fiscal code. Set the value to `null` to clear it; omit the property to leave it unchanged. |
| `ItLotteryCode` | [String update value](_objects.md#string-update-value) | optional, max length 15 characters | Italian lottery code. Set the value to `null` to clear it; omit the property to leave it unchanged. |

#### Company update parameters

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Email` | [String update value](_objects.md#string-update-value) | optional | Email address (or `null` if the email should not be updated). |
| `TaxIdentifier` | [String update value](_objects.md#string-update-value) | optional | Tax identification number (or `null` if the tax identification number should not be updated). |
| `BillingCode` | [String update value](_objects.md#string-update-value) | optional | Billing code (or `null` if the billing code should not be updated). |
| `AccountingCode` | [String update value](_objects.md#string-update-value) | optional | Accounting code (or `null` if the accounting code should not be updated). |
| `Notes` | [String update value](_objects.md#string-update-value) | optional | Notes (or `null` if the notes should not be updated). |
| `Name` | [String update value](_objects.md#string-update-value) | optional | Name (or `null` if the name should not be updated). |
| `MotherCompanyId` | [String update value](_objects.md#string-update-value) | optional | Mother company identifier (or `null` if the mother company identifier should not be updated). |
| `WebsiteUrl` | [String update value](_objects.md#string-update-value) | optional | Website url (or `null` if the website url should not be updated). |
| `InvoiceDueInterval` | [String update value](_objects.md#string-update-value) | optional | Invoice due interval (or `null` if the invoice due interval should not be updated). |
| `Classifications` | [Company update classifications](accounts.md#company-update-classifications) | optional | Classifications of the company. |
| `Options` | [Company update options](companies.md#company-update-options) | optional | Options of the company. |
| `CreditRatingBasic` | [Credit rating basic](accounts.md#credit-rating-basic) | optional | Basic credit rating (or `null` if the basic credit rating should not be updated). |
| `Department` | [String update value](_objects.md#string-update-value) | optional | Department (or `null` if the department should not be updated). |
| `DunsNumber` | [String update value](_objects.md#string-update-value) | optional | Duns number (or `null` if the duns number should not be updated). |
| `ReferenceId` | [String update value](_objects.md#string-update-value) | optional | Reference identifier (or `null` if the reference identifier should not be updated). |
| `ExternalIdentifier` | [String update value](_objects.md#string-update-value) | optional, max length 255 characters | External identifier (or `null` if the external identifier should not be updated). |
| `AdditionalTaxIdentifier` | [String update value](_objects.md#string-update-value) | optional | Additional tax identifier (or `null` if the additional tax identifier should not be updated). |
| `Contact` | [String update value](_objects.md#string-update-value) | optional | Contact (or `null` if the contact should not be updated). |
| `ContactPerson` | [String update value](_objects.md#string-update-value) | optional | Contact person (or `null` if the contact person should not be updated). |
| `FiscalIdentifier` | [String update value](_objects.md#string-update-value) | optional | Fiscal identifier (or `null` if the fiscal identifier should not be updated). |
| `Iata` | [String update value](_objects.md#string-update-value) | optional | IATA of the company (or `null` if the iata should not be updated). |
| `Telephone` | [String update value](_objects.md#string-update-value) | optional | Telephone number (or `null` if the telephone number should not be updated). |
| `SourceId` | [String update value](_objects.md#string-update-value) | optional | Source identifier (or `null` if the source identifier should not be updated). |

#### Company update classifications

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Corporate` | [Bool update value](_objects.md#bool-update-value) | optional | Corporate (or `null` if the value should not be updated). |
| `Internal` | [Bool update value](_objects.md#bool-update-value) | optional | Internal (or `null` if the value should not be updated). |
| `Private` | [Bool update value](_objects.md#bool-update-value) | optional | Private (or `null` if the value should not be updated). |
| `OnlineTravelAgency` | [Bool update value](_objects.md#bool-update-value) | optional | Online travel agency (or `null` if the value should not be updated). |
| `GlobalDistributionSystem` | [Bool update value](_objects.md#bool-update-value) | optional | Global distribution system (or `null` if the value should not be updated). |
| `Marketing` | [Bool update value](_objects.md#bool-update-value) | optional | Marketing (or `null` if the value should not be updated). |
| `Inactive` | [Bool update value](_objects.md#bool-update-value) | optional | Inactive (or `null` if the value should not be updated). |
| `GovernmentEntity` | [Bool update value](_objects.md#bool-update-value) | optional | Government Entity (or `null` if the value should not be updated). |

#### Credit rating basic

* `CreditOk` - Company can book services.
* `PaymentRequiredUpfront` - Company must pay upfront.
* `LocalDecisionRequired` - Requires local approval.

### Response

```javascript
{
  "Accounts": [
    {
      "Id": "3ff104e6-3ba8-4dfc-8d35-b0ec00c5fd4c",
      "Discriminator": "Company",
      "Customer": null,
      "Company": {
        "ChainId": "79fa3c17-bec6-454f-b3be-b0ec00818acd",
        "CreatedUtc": "2024-01-03T07:52:20Z",
        "UpdatedUtc": "2024-01-18T10:20:31Z",
        "UpdaterProfileId": "93f03906-ed13-4a26-b8dc-b0ec0082194f",
        "Email": "example@example.com",
        "TaxIdentifier": "CZ8810310963",
        "BillingCode": null,
        "AccountingCode": null,
        "Notes": "Example notes",
        "Name": "Example company",
        "MotherCompanyId": "839e9d92-aa8b-48bf-8384-b0ec0081bb34",
        "WebsiteUrl": "https://www.example.com",
        "InvoiceDueInterval": null,
        "CreditRatingBasic": "CreditOk",
        "Department": "Accounting",
        "DunsNumber": "987654321",
        "ReferenceId": null,
        "ExternalIdentifier": "COM-123",
        "AdditionalTaxIdentifier": "XY00112233445",
        "Contact": "Sample contact",
        "ContactPerson": "Sample person",
        "FiscalIdentifier": "FiscalIdentifier",
        "Iata": "PAO",
        "Telephone": "111-222-333",
        "SourceId": "F42098A0-8507-4963-ACC9-B0EC00821949",
        "Classifications": {
          "Corporate": true,
          "Internal": true,
          "Private": true,
          "OnlineTravelAgency": true,
          "GlobalDistributionSystem": true,
          "Marketing": true,
          "Inactive": true
        },
        "Options": {
          "Invoiceable": true,
          "AddFeesToInvoices": true
        }
      }
    },
    {
      "Id": "71db411f-c1d6-4e1c-9cd7-44e8bf45f936",
      "Discriminator": "Customer",
      "Customer": {
        "ChainId": "79fa3c17-bec6-454f-b3be-b0ec00818acd",
        "CreatedUtc": "2024-01-03T07:52:19Z",
        "UpdatedUtc": "2024-01-18T10:25:41Z",
        "UpdaterProfileId": "93f03906-ed13-4a26-b8dc-b0ec0082194f",
        "Email": "example@example.com",
        "TaxIdentifier": "CZ8810310963",
        "BillingCode": null,
        "AccountingCode": null,
        "Notes": "Example notes",
        "LastName": "Sample",
        "FirstName": "Sample",
        "SecondLastName": null,
        "BirthPlace": "Sample place",
        "Telephone": "111-222-333",
        "Occupation": null,
        "CarRegistrationNumber": null,
        "LoyaltyCode": null,
        "NationalityCode": "US",
        "CompanyId": "839e9d92-aa8b-48bf-8384-b0ec0081bb34",
        "BirthDate": "2000-01-01T00:00:00Z",
        "Sex": "Male",
        "Title": "Mister",
        "PreferredLanguageCode": null,
        "Options": {
          "SendMarketingEmails": true,
          "Invoiceable": true,
          "BillAddressObjection": true
        },
        "Classifications": {
          "PaymasterAccount": true,
          "Blacklist": true,
          "Media": true,
          "LoyaltyProgram": true,
          "PreviousComplaint": true,
          "Returning": true,
          "Staff": true,
          "FriendOrFamily": true,
          "TopManagement": true,
          "Important": true,
          "VeryImportant": true,
          "Problematic": true,
          "Cashlist": true,
          "DisabledPerson": true,
          "Military": true,
          "Airline": true,
          "HealthCompliant": true,
          "InRoom": true,
          "WaitingForRoom": true,
          "Student": true
        },
        "LegalEntityIdentifiers": {
          "ItDestinationCode": null,
          "ItFiscalCode": null
        }
      },
      "Company": null
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Accounts` | array of [Account](accounts.md#account) | required, max 1000 items | Updated accounts. |

#### Account

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the account. |
| `Discriminator` | [Account type](accounts.md#account-type) | required | Type of the account. |
| `Customer` | [Customer](accounts.md#customer) | optional | Updated customer data. |
| `Company` | [Company](accounts.md#company) | optional | Updated company data. |

#### Account type

* `Company`
* `Customer`

#### Customer
Updated customer data.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ChainId` | string | required | Unique identifier of the chain. |
| `CreatedUtc` | string | required | Creation date and time of the customer in UTC timezone in ISO 8601 format. |
| `UpdatedUtc` | string | required | Last update date and time of the customer in UTC timezone in ISO 8601 format. |
| `UpdaterProfileId` | string | required | Unique identifier of the user who updated the customer. |
| `Email` | string | optional | Email address of the customer. |
| `TaxIdentifier` | string | optional | Tax identification number of the customer. |
| `BillingCode` | string | optional | Billing code of the customer. |
| `AccountingCode` | string | optional | Accounting code of the customer. |
| `Notes` | string | optional | Internal notes about the customer. |
| `LastName` | string | required | Last name of the customer. |
| `FirstName` | string | optional | First name of the customer. |
| `SecondLastName` | string | optional | Second last name of the customer. |
| `BirthPlace` | string | optional | Place of birth. |
| `Telephone` | string | optional | Telephone number of the customer (possibly mobile). |
| `Occupation` | string | optional | Occupation of the customer. |
| `CarRegistrationNumber` | string | optional, max length 255 characters | Registration number of the customer's car. |
| `DietaryRequirements` | string | optional, max length 255 characters | Dietary requirements of the customer. |
| `LoyaltyCode` | string | optional | Loyalty code of the customer. |
| `NationalityCode` | string | optional | ISO 3166-1 code of the `Country`. |
| `CompanyId` | string | optional | Unique identifier of `Company` the customer is associated with. |
| `BirthDate` | string | optional | Date of birth in ISO 8601 format. |
| `Sex` | string | optional | Sex of the customer. |
| `Title` | [Title](customers.md#title) | optional | Title prefix of the customer. Mutually exclusive with `CustomTitleName`. |
| `CustomTitleName` | string | optional | Name of the customer's custom title, as configured in the chain's guest titles. Mutually exclusive with `Title` – a customer has either a standard title or a custom title. Unlike `Title`, the value is not localized; display it as returned. |
| `CustomTitleId` | string | optional | Unique identifier of the `CustomTitle` assigned to the customer, as configured in the chain's guest titles. Mutually exclusive with `Title`. Set whenever the customer has a custom title, even when `CustomTitleName` is `null`. Use [Get all custom titles](customtitles.md#get-all-custom-titles) to resolve the name when custom titles are enabled for the chain. |
| `PreferredLanguageCode` | string | optional | Language and culture code of the customer's preferred language. E.g. `en-US` or `fr-FR`. |
| `Options` | [Customer options](accounts.md#customer-options) | required | Options of the customer. |
| `Classifications` | [Customer classifications](accounts.md#customer-classifications) | required | Classifications of the customer. |
| `LegalEntityIdentifiers` | [Customer legal identifiers](accounts.md#customer-legal-identifiers) | required | Legal entity identifiers of the customer. |

#### Customer options

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `SendMarketingEmails` | boolean | required | Send marketing emails. |
| `Invoiceable` | boolean | required | Invoiceable. |
| `BillAddressObjection` | boolean | required | Bill address objection. |

#### Customer classifications

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `PaymasterAccount` | boolean | required | Paymaster account. |
| `Blocklist` | boolean | required | Blocklist. |
| `Media` | boolean | required | Media. |
| `LoyaltyProgram` | boolean | required | Loyalty program. |
| `PreviousComplaint` | boolean | required | Previous complaint. |
| `Returning` | boolean | required | Returning. |
| `Staff` | boolean | required | Staff. |
| `FriendOrFamily` | boolean | required | Friend or family. |
| `TopManagement` | boolean | required | Top management. |
| `Important` | boolean | required | Important. |
| `VeryImportant` | boolean | required | Very important. |
| `Problematic` | boolean | required | Problematic. |
| `Cashlist` | boolean | required | Cash list. |
| `DisabledPerson` | boolean | required | Disabled person. |
| `Military` | boolean | required | Military. |
| `Airline` | boolean | required | Airline. |
| `HealthCompliant` | boolean | required | Health compliant. |
| `InRoom` | boolean | required | In room. |
| `WaitingForRoom` | boolean | required | Waiting for room. |
| `Student` | boolean | required | Student. |
| ~~`Blacklist`~~ | ~~boolean~~ | ~~required~~ | ~~Synonym of Blocklist, left for backward compatibility.~~ **Deprecated!** Use Blocklist instead.|

#### Customer legal identifiers

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ItDestinationCode` | string | optional | Italian destination code. |
| `ItFiscalCode` | string | optional | Italian fiscal code. |
| `ItLotteryCode` | string | optional, max length 15 characters | Italian lottery code. |

#### Company

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ChainId` | string | required | Unique identifier of the chain. |
| `CreatedUtc` | string | required | Creation date and time of the `Company` in UTC timezone in ISO 8601 format. |
| `UpdatedUtc` | string | required | Last update date and time of the `Company` in UTC timezone in ISO 8601 format. |
| `UpdaterProfileId` | string | required | Unique identifier of the user who updated the company. |
| `Email` | string | optional | Email address of the company. |
| `TaxIdentifier` | string | optional | Tax identification number of the company. |
| `BillingCode` | string | optional | Billing code of the company. |
| `AccountingCode` | string | optional | Accounting code of the company. |
| `Notes` | string | optional | Additional notes. |
| `Name` | string | required | Name of the company. |
| `MotherCompanyId` | string | optional | Unique identifier of mother company. |
| `WebsiteUrl` | string | optional | The website url of the company. |
| `InvoiceDueInterval` | string | optional | The maximum time (in ISO 8601 duration format), when the invoice has to be be paid. |
| `CreditRatingBasic` | [Credit rating basic](companies.md#credit-rating-basic) | optional | Credit rating to define credit worthiness of the company. |
| `Department` | string | optional | The internal segmentation of a company, e.g. sales department. |
| `DunsNumber` | string | optional | The Dun & Bradstreet unique 9-digit DUNS number. |
| `ReferenceId` | string | optional | External system identifier - custom identifier used by an external system such as an external database. |
| `ExternalIdentifier` | string | optional | Identifier of company from external system. |
| `AdditionalTaxIdentifier` | string | optional | Additional tax identifier of the company. |
| `Contact` | string | optional | Other contact details, such as telephone, email or similar. |
| `ContactPerson` | string | optional | Contact person of the company. |
| `FiscalIdentifier` | string | optional | Fiscal identifier of the company. |
| `Iata` | string | optional | Iata of the company. |
| `Telephone` | string | optional | Contact telephone number. |
| `SourceId` | string | optional | Unique identifier of the `Source`. |
| `Classifications` | [Company classifications](accounts.md#company-classifications) | required | Classifications of the company. |
| `Options` | [Company options](accounts.md#company-options) | required | Options of the company. |

#### Company classifications

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Corporate` | boolean | required | Corporate. |
| `Internal` | boolean | required | Internal. |
| `Private` | boolean | required | Private. |
| `OnlineTravelAgency` | boolean | required | Online travel agency. |
| `GlobalDistributionSystem` | boolean | required | Global distribution system. |
| `Marketing` | boolean | required | Marketing. |
| `Inactive` | boolean | required | Inactive. |
| `GovernmentEntity` | boolean | required | Government Entity |

#### Company options

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Invoiceable` | boolean | required | Whether the company is invoiceable or not. |
| `AddFeesToInvoices` | boolean | required | Whether the company has an additional fee applied for invoicing or not. |
| `AddTaxDeductedPaymentToInvoices` | boolean | required | Whether tax-deducted payments should be automatically added to invoices. |

## Upload and link file to account

Attaches the specified file to the account. 

Allowed MIME types: `application/pdf`, `image/bmp`, `image/gif`, `image/jpeg`, `image/png`, `image/tiff`.

Note this operation supports [Portfolio Access Tokens](../guidelines/multi-property.md).

### Request

`[PlatformAddress]/api/connector/v1/accounts/addFile`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "AccountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "Name": "document.pdf",
  "Type": "application/pdf",
  "ChainId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `ChainId` | string | optional | Unique identifier of the chain. Required when using [Portfolio Access Tokens](../concepts/multi-property.md), ignored otherwise. |
| `AccountId` | string | required | Unique identifier of the account to which the file will be uploaded to. |
| `Name` | string | required, max length 1000 characters | Uploaded file name. |
| `Type` | string | required, max length 1000 characters | Content type of the uploaded file following defined by its MIME type. |
| `Data` | string | required | Uploaded file data serialized in base64 format. |

### Response

```javascript
{
  "FileId": "f039f5b4-ff18-4510-9086-92b14a68ed78"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `FileId` | string | required | Unique identifier of the uploaded file. |

## Merge accounts

Merges two or more accounts of the same account type together. The given source accounts will be merged into the given target account and the merged account will keep the target account ID.

### Request

`[PlatformAddress]/api/connector/v1/accounts/merge`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "AccountMergeParameters": [
    {
      "AccountType": "Company",
      "SourceAccountIds": [
        "b0c10ced-34eb-44b4-92e8-af5b008f3fb4",
        "5176d000-bf17-40be-b140-9041d2b70eee"
      ],
      "TargetAccountId": "51262225-8130-4320-8210-af5b008f64e5"
    },
    {
      "AccountType": "Customer",
      "SourceAccountIds": [
        "7799f19a-c9c9-42bf-968f-a759e3ea1ea6",
        "bb926ffe-5310-48bc-8202-6165fa3bdcad"
      ],
      "TargetAccountId": "49b2abd4-df58-4f1d-bead-0fa6342f8a78"
    }
  ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `AccountMergeParameters` | array of [Account merge parameters](accounts.md#account-merge-parameters) | required, max 10 items | Accounts to be merged. |

#### Account merge parameters

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `SourceAccountIds` | array of string | required, max 1000 items | Unique identifiers of the source accounts (`Customer` or `Company`). |
| `TargetAccountId` | string | required | Unique identifier of the target account (`Customer` or `Company`). |
| `AccountType` | [Account merge type](accounts.md#account-merge-type) | required | Specifying types of the accounts provided (`Customer` or `Company`). |

#### Account merge type

* `Customer`
* `Company`

### Response

```javascript
{}
```
