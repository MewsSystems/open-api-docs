# Requests

The **Mews POS API** is [REST-based](https://en.wikipedia.org/wiki/REST) and follows the [JSON:API](https://jsonapi.org/) specification for formatting HTTP requests and responses. All requests must include the `Content-Type` header set to the JSON:API media type `application/vnd.api+json`.

## JSON:API

[JSON:API](https://jsonapi.org/) is a widely-used specification for structuring API requests and responses. Understanding this format will help you effectively interact with the **Mews POS API**.

### Key features supported

* **Relationships** – Link resources together. [Learn more about relationships](relationships.md).
* **Filtering** – Narrow down results based on selected criteria. [Learn more about filtering](filtering.md).
* **Sparse Fieldsets** – Retrieve only the fields you need. [Learn more about sparse fieldsets](sparse-fieldsets.md).

For more tools and resources:

* **Client Libraries** – Use libraries from the [JSON:API Implementations](https://jsonapi.org/implementations/) list to streamline development.
* **Media Type** – Ensure that requests use the media type `application/vnd.api+json`.

## Address pattern

All operations in the **Mews POS API** follow a consistent URL structure:

```
[PlatformAddress]/v1/[Resource]/{id}
```

* **PlatformAddress** – The base address of the API (varies by environment: test, demo, production).
* **Resource** – The pluralized name of the target resource (e.g. bills, reservations).
* **id** – Unique identifier of the Resource, used only when referencing a specific Resource.

Example:

```http
https://api.mews.com/pos/v1/invoice-items/31b14937-2524-491f-b0a0-dc0a7393ff3f
```

## Query parameters

The **Mews POS API** supports query parameters for [Relationships](relationships.md), [Filtering](filtering.md) and [Sparse fieldsets](sparse-fieldsets.md).

Example:

```http
https://api.mews.com/pos/v1/invoices?filter[createdAtGt]=2024-07-25T16%3A29%3A35%2B00%3A00
```

## Request body

Each request will include a header with authentication information, and a body with any data needed to perform the operation, formatted as per [JSON:API](https://jsonapi.org/). 'Get' operations, such as [Get invoices](/broken/pages/300f0e98a8ffb32e66ba6e6ba0a21d088865a09d#get-v1-invoices), use the `GET` http verb and therefore do not have any data in the request body.
