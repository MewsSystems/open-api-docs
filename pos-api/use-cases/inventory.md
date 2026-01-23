# Inventory management

This use case is aimed at external Inventory Management Systems, and it describes how to use the **Mews POS API** to managing inventory across multiple point-of-sale locations or outlets.

## Contents

* [Product synchronization](inventory.md#product-synchronization)
* [Fetching sales data](inventory.md#fetching-sales-data)
* [Fetching the location or outlet](inventory.md#fetching-the-location-or-outlet)
* [Frequently Asked Questions](inventory.md#frequently-asked-questions)
* [Additional help](inventory.md#additional-help)

## Product synchronization

In order to synchronize products with Mews POS, use the [Get products](/broken/pages/c57e0a38b35f65d385ac2c0962ef7f82557bb323#get-v1-products) endpoint `GET /v1/products`. You can call this API operation periodically to refresh the product catalogue and make sure it is in sync with your system. The product attributes in the response include, but are not limited to, name, description, [SKU](https://en.wikipedia.org/wiki/Stock_keeping_unit), barcode, and price information.

#### Example request:

```
GET [PlatformAddress]/v1/products
```

Further detail can be obtained via linked entities such as `productType` (e.g. food or beverage), `modifierSets` (product qualifiers, such as pizza toppings) and `productVariants`. These can be included in the response by using the same request but specifying the relevant include query parameters – see [Essential guide > Relationships](../essential-guide/relationships.md).

#### Example request:

```
GET [PlatformAddress]/v1/products?include=productType,modifierSets,productVariants
```

### Pagination

The response is paginated using cursor pagination. Use the `next` link to request the next page of data.

## Fetching sales data

Use the [Get invoices](/broken/pages/300f0e98a8ffb32e66ba6e6ba0a21d088865a09d#get-v1-invoices) endpoint `GET /v1/invoices` to fetch invoices, containing order item data. Invoice attributes in the response include a description field and information about amounts, including `tax`, `total`, `subtotal`, `discount` and `tipAmount`. See [Get invoices](/broken/pages/300f0e98a8ffb32e66ba6e6ba0a21d088865a09d#get-v1-invoices) for the full set of supported attributes.

#### Example request:

```
GET [PlatformAddress]/v1/invoices
```

Filter the invoices by date using the `filter` query parameter – see [Essential guide > Filtering](../essential-guide/filtering.md).

#### Example request:

```
GET [PlatformAddress]/v1/invoices?filter%createdAtGt%5D=2024-07-25T16%3A29%3A35%2B00%3A00
```

Linked to the invoice entity are:

* **user** – the customer
* **register** – the cash register or outlet terminal used for the transaction
* **invoiceItems** – an array of invoice order items
* **originalInvoice** – normally null, but may link to an original invoice in cases of refunds

These can be selectively included in the response by using the same request but specifying the relevant include query parameters, as per [Essential guide > Relationships](../essential-guide/relationships.md). Item attributes include, but are not limited to, `productName`, `quantity`, `total` and amount breakdowns for tax and discounts. Use the register `self` link to obtain the full register information, including outlet name.

#### Example request:

```
GET [PlatformAddress]/v1/invoices?include=invoiceItems,user,register
```

#### Example response:

```json
{
    "data": [
        {
            "id": "babcf91e-5930-4b90-b929-0fb2b076bd3b",
            "type": "invoices",
            "attributes": {
                "cancelled": false,
                "cancelReason": null,
                "description": null,
                "createdAt": "2018-07-26T07:35:07.817Z",
                "updatedAt": "2018-07-26T07:35:07.836Z",
                "discount": null,
                "tax": "0.00",
                "total": "10.00",
                "subtotal": "10.00",
                "discountAmount": null,
                "itemDiscountAmount": null,
                "tipAmount": null
            },
            "relationships": {
                "user": {
                    "data": {
                        "id": "918a47d1-6553-42ee-8de4-3b5af5edc8e7",
                        "type": "users"
                    }
                },
                "register": {
                    "data": {
                        "id": "f35693cb-cc0c-4c6f-bf16-eb0547444642",
                        "type": "registers"
                    }
                },
                "invoiceItems": {
                    "data": [
                        {
                            "id": "7d87444b-807a-4ea4-8b69-b0e91f5fa174",
                            "type": "invoiceItems"
                        }
                    ]
                }
            }
        }
    ],
    "included": [
        {
            "id": "7d87444b-807a-4ea4-8b69-b0e91f5fa174",
            "type": "invoiceItems",
            "attributes": {
                "productName": "liebe",
                "quantity": "2.0",
                "unitPriceInclTax": "5.00",
                "subtotal": "10.00",
                "tax": "0.00",
                "total": "10.00",
                "discount": null
            },
            "relationships": {
                "product": {
                    "data": {
                        "id": "139a7f7a-591f-4797-ba23-08c9bee0d044",
                        "type": "products"
                    }
                },
                "productVariant": {
                    "data": null
                },
                "invoiceItemModifiers": {
                    "data": []
                }
            }
        },
        {
            "id": "918a47d1-6553-42ee-8de4-3b5af5edc8e7",
            "type": "users",
            "attributes": {
                "name": "John Smith"
            }
        },
        {
            "id": "f35693cb-cc0c-4c6f-bf16-eb0547444642",
            "type": "registers",
            "attributes": {
                "name": "Register #1",
                "invoicesCount": 1325,
                "index": 1,
                "virtual": false,
                "createdAt": "2018-07-12T13:18:04.306Z",
                "updatedAt": "2020-02-04T14:51:20.730Z"
            },
            "relationships": {
                "outlet": {
                    "data": {
                        "id": "65e8856a-8bab-46d2-85e2-2cde89f40f95",
                        "type": "outlets"
                    }
                }
            },
            "links": {
                "self": "[PlatformAddress]/v1/registers/f35693cb-cc0c-4c6f-bf16-eb0547444642"
            }
        }
    ],
    "links": {
        "prev": "[PlatformAddress]/v1/invoices?page[before]=OTMzMw&page[size]=1",
        "next": "[PlatformAddress]/v1/invoices?page[after]=OTMzMw&page[size]=1"
    }
}
```

### Pagination

The response is paginated using cursor pagination. Use the `next` link to request the next page of data.

## Fetching the location or outlet

It is helpful to first understand the domain entities and their relationships. POS locations, such as a named bar or restaurant, are called **outlets** in Mews POS. POS terminals or cash registers are called **registers**. **Invoices** are linked to a register, which is the terminal used for making the financial transaction.

* So the entity relationship is `Venue` –> `Outlet` –> `Register` –> `Invoice`

To obtain the outlet for an invoice, follow these steps:

1. Fetch the invoice, including related register information
2. Fetch the register, including related outlet information

### 1. Fetch the invoice, including related register information

To fetch the invoice and register, use `GET /v1/invoices?include=register`. The register information returned will include the register resource in the `self` field.

#### Example request:

```
GET [PlatformAddress]/v1/invoices?include=register
```

### 2. Fetch the register, including related outlet information

Use the register identifier to obtain the register and outlet, e.g. `GET /v1/registers/eef23c03-49b9-432b-b1a3-955ea1501557?include=outlet`.

#### Example request:

```
GET [PlatformAddress]/v1/registers/eef23c03-49b9-432b-b1a3-955ea1501557?include=outlet
```

## Frequently Asked Questions

* [How do you represent returns and cancellations?](inventory.md#how-do-you-represent-returns-and-cancellations)
* [How do you represent waste?](inventory.md#how-do-you-represent-waste)
* [How do you represent modifiers and add-ons?](inventory.md#how-do-you-represent-modifiers-and-add-ons)
* [How do you represent combo deals?](inventory.md#how-do-you-represent-combo-deals)

### How do you represent returns and cancellations?

_How do you represent returns and cancellations, e.g. wrong order, or customer changed their mind?_

* **Answer**: We represent refunds by having an `invoice` relationship to an `originalInvoice` object. It means that all invoices that have this relationship are actually refunds and not "real" invoices. For the original invoice, follow the `originalInvoice` relationship.

### How do you represent waste?

_How do you represent waste, e.g. a dropped plate in the kitchen, or a spoiled item?_

* **Answer**: We currently don't have any specific provision for waste.

### How do you represent modifiers and add-ons?

_How do you represent modifiers and add-ons, e.g. extra cheese, no tomatoes?_

* **Answer**: We use invoice item modifiers for this. Invoice items are related to an `invoice` resource, and this has a relationship of its own to the invoice item modifiers which you'll get if you _include_ invoice items in the response – see [Essential guide > Relationships](../essential-guide/relationships.md).

### How do you represent combo deals?

_How do you represent menu items and combo deals, e.g. Lunch combo Burger+Cola+Fries?_

* **Answer**: In addition to product variants, **Mews POS** supports product bundles, which could be used for combo deals. Product variants are supported in relation to the `product` resource. Product bundles are not currently supported in the API, but will be added shortly.

## Additional help

You may find these additional resources helpful when working with **Mews POS** in the demo environment:

> **Help Guides**:
>
> * [Adding product variants in Mews POS](https://help.mews.com/s/article/adding-product-variants-in-the-mews-pos?language=en_US)
> * [How to create a product modifier in Mews POS](https://help.mews.com/s/article/creating-a-modifier?language=en_US)
> * [Managing product modifiers in Mews POS](https://help.mews.com/s/article/managing-product-modifiers-in-the-mews-pos?language=en_US)
