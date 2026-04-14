# Ledger entries

#### Ledger entry

> ### Restricted!
> This entity is currently in beta-test and as such it is subject to change.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the entry. |
| `EnterpriseId` | string | required | Unique identifier of the [Enterprise](enterprises.md#enterprise). |
| `TransactionId` | string | optional | Unique identifier of the transaction in which the ledger entry was created. `null` for ledger entries created before transaction identifiers were introduced. |
| `AccountId` | string | required | Unique identifier of the account (for example `Customer`) associated with this ledger entry. |
| `BillId` | string | optional | Unique identifier of the [Bill](bills.md#bill) associated with this ledger entry. |
| `AccountingCategoryId` | string | optional | Unique identifier of the [Accounting category](accountingcategories.md#accounting-category) for this ledger entry. |
| `AccountingItemId` | string | required | Unique identifier of the item linked to this ledger entry. |
| `AccountingItemType` | [Accounting item type](exports.md#accounting-item-type) | required | Type of item linked to this ledger entry. |
| `LedgerType` | [Accounting ledger type](exports.md#accounting-ledger-type) | required | Type of accounting ledger where this entry is recorded. |
| `LedgerEntryType` | [Accounting ledger entry type](exports.md#accounting-ledger-entry-type) | required | Whether this is a debit or credit entry in the ledger. |
| `PostingDate` | string | required | Date when this entry was posted to the ledger in ISO 8601 format. |
| `Value` | decimal | required | Monetary value of this ledger entry. Always a positive number. |
| `NetBaseValue` | decimal | optional | Net value from which tax is calculated. Only populated for entries on the tax ledger. |
| `TaxRateCode` | string | optional | Code of the tax rate. Only populated for entries on the tax ledger. |
| `CreatedUtc` | string | required | Date and time when this ledger entry was created in UTC timezone in ISO 8601 format. |

#### Accounting item type

* `OrderItem`
* `OutletItem`
* `Invoice`
* `Payment`
* `DepositBalancingPayment`
* `CityLedgerBalancingPayment`
* `DepositItem`

#### Accounting ledger type

* `Revenue`
* `Tax`
* `Payment`
* `Deposit`
* `Guest`
* `City`
* `NonRevenue`

#### Accounting ledger entry type

* `Debit`
* `Credit`
