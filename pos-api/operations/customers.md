<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Customers

## Get customers

This operation returns a list of customers

**Note:** This operation needs [Authentication](../guidelines/authentication.md) and supports the following JSON:API features:
- [Filters](../guidelines/filtering.md) - `emailEq`, `fullNameEq`
- [Sparse fieldsets](../guidelines/sparse-fieldsets.md) - supports all fields of `customer` query parameter.

### Request

`GET` `[PlatformAddress]/v1/customers`

### Response

```javascript
{
  "data": [
    {
      "id": "31b14937-2524-491f-b0a0-dc0a7393ff33",
      "type": "customers",
      "attributes": {
        "fullName": "John Doe",
        "companyName": "Doe Enterprises",
        "taxNumber": "123456789",
        "email": "john.doe@mews.com",
        "address1": "123 Main St.",
        "address2": "Apt. 123",
        "city": "Palo Alto",
        "state": "CA",
        "postalCode": "12345",
        "country": "US",
        "notes": "This is a note about this customer.",
        "phone": "1234567890",
        "mobile": "3334567890",
        "countrySpecificCode": "332118889",
        "dateOfBirth": "1970-01-01",
        "createdAt": "2024-10-16T14:30:00Z",
        "updatedAt": "2024-10-19T14:30:00Z"
      }
    }
  ],
  "links": {
    "prev": "https://api.mews-demo.com/pos/v1/customers?page%5Bbefore%5D=NA&page%5Bsize%5D=1",
    "next": "https://api.mews-demo.com/pos/v1/customers?page%5Bafter%5D=NA&page%5Bsize%5D=1"
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | array of object [customer](customers.md#customer) | required, max 1000 items | The document's "primary data". |
| `links` | [customer_pagination_links](customers.md#customer_pagination_links) | required | A [links object](https://jsonapi.org/profiles/ethanresnick/cursor-pagination/#auto-id-links) describing cursor pagination links. |

#### customer

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `id` | string | required, max length 36 characters | Universally unique ID (UUID) that identifies the related object. |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [customer_attributes](customers.md#customer_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

#### customer_attributes

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `fullName` | string,null | optional, max length 255 characters | The full name of the customer. This can be either a personal name or a company name. |
| `companyName` | string,null | optional, max length 255 characters | The name of the company associated with the customer. |
| `taxNumber` | string,null | optional, max length 40 characters | The customer's tax identification number. |
| `email` | string,null | optional, max length 320 characters | The customer's email address. |
| `address1` | string,null | optional, max length 255 characters | The first line of the customer's address. |
| `address2` | string,null | optional, max length 255 characters | The second line of the customer's address. |
| `city` | string,null | optional, max length 100 characters | The city of the customer's address. |
| `state` | string,null | optional, max length 100 characters | The state or province of the customer's address. |
| `postalCode` | string,null | optional, max length 20 characters | The postal or ZIP code of the customer's address. |
| `country` | string,null | optional, max length 100 characters | The country of the customer's address. |
| `notes` | string,null | optional, max length 500 characters | Additional notes about the customer. |
| `phone` | string,null | optional, max length 20 characters | The customer's phone number. |
| `mobile` | string,null | optional, max length 20 characters | The customer's mobile phone number. |
| `countrySpecificCode` | string,null | optional, max length 50 characters | A unique country specific code assigned to the customer. Lottery code, for example, in Italy. |
| `dateOfBirth` | string,null | optional, max length 10 characters | The customer's date of birth in YYYY-MM-DD format. |
| `createdAt` | string | required, max length 25 characters | Created at timestamp in RFC 3339 format. |
| `updatedAt` | string | required, max length 25 characters | Updated at timestamp in RFC 3339 format. |

#### customer_pagination_links

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `prev` | string,null | optional, max length 1024 characters | The link to the previous page of results. |
| `next` | string,null | optional, max length 1024 characters | The link to the next page of results. |

## Create customer

Create a customer. A customer represents a person or organization that can be billed for goods or services.
Note: This operation needs [Authentication](../essential-guide/authentication.md).

### Request

`POST` `[PlatformAddress]/v1/customers`

```javascript
{
  "data": {
    "type": "customers",
    "attributes": {
      "fullName": "John Doe",
      "companyName": "Doe Enterprises",
      "taxNumber": "123456789",
      "email": "john.doe@mews.com",
      "address1": "123 Main St.",
      "address2": "Apt. 123",
      "city": "Palo Alto",
      "state": "CA",
      "postalCode": "12345",
      "country": "US",
      "notes": "This is a note about this customer.",
      "phone": "1234567890",
      "mobile": "3334567890",
      "countrySpecificCode": "332118889",
      "dateOfBirth": "1970-01-01"
    }
  }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [customer_create](customers.md#customer_create) | required | The document's "primary data". |

#### customer_create

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | required | The [type](https://jsonapi.org/format/#document-resource-object-identification) member is used to describe resource objects that share common attributes and relationships. |
| `attributes` | [customer_attributes](customers.md#customer_attributes) | required | An [attributes object](https://jsonapi.org/format/#document-resource-object-attributes) representing some of the resource's data. |

### Response

```javascript
{
  "data": {
    "id": "83f93e1c-b6e1-4040-90cf-3274b6f3c82d",
    "type": "customers",
    "attributes": {
      "fullName": "John Doe",
      "companyName": "Doe Enterprises",
      "taxNumber": "123456789",
      "email": "john.doe@mews.com",
      "address1": "123 Main St.",
      "address2": "Apt. 123",
      "city": "Palo Alto",
      "state": "CA",
      "postalCode": "12345",
      "country": "US",
      "notes": "This is a note about this customer.",
      "phone": "1234567890",
      "mobile": "3334567890",
      "countrySpecificCode": "332118889",
      "dateOfBirth": "1970-01-01",
      "createdAt": "2024-10-16T14:30:00Z",
      "updatedAt": "2024-10-19T14:30:00Z"
    }
  }
}
```
Below is a list of all possible fields this endpoint can return including relationships fields fetched with include query parameter.

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `data` | [customer](customers.md#customer) | required | The document's "primary data". |
