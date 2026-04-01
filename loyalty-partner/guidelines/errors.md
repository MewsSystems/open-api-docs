# Errors

**Mews Loyalty Partner API** follows [RFC 9457](https://datatracker.ietf.org/doc/html/rfc9457) (Problem Details for HTTP APIs) as the standard for error responses. Your API must return errors in this format.

{% hint style="info" %}

#### Custom errors

Your API can return an error which isn't specified in this document (i.e. with different `type` URI), however the users will see only a generic error message.
{% endhint %}

### Error properties

Error response object contains the following properties:

| Property           | Type             | Contract                          | Description                                                                                                           |
| ------------------ | ---------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `type`             | string           | required                          | URI identifying the top-level problem type.                                                                           |
| `status`           | integer          | required                          | HTTP status code.                                                                                                     |
| `title`            | string           | required                          | Short, human-readable summary of the problem type.                                                                    |
| `detail`           | string           | optional                          | Human-readable explanation specific to this occurrence of the problem.                                                |
| `instance`         | string           | optional                          | URI identifying this specific occurrence of the problem for tracing.                                                  |
| `errors`           | array of objects | optional                          | Field-level validation errors related to the request payload.                                                         |
| `errors[].type`    | string           | required when `errors` is present | URI identifying the field-level error type.                                                                           |
| `errors[].pointer` | string           | required when `errors` is present | JSON Pointer to the affected field, formatted according to [RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901). |
| `errors[].detail`  | string           | optional                          | Human-readable explanation of the field-level validation error.                                                       |

### Top-level errors

Top-level errors describe the general nature of the problem. The `type` URI identifies the error type and links to documentation describing it.

#### core/bad-request

HTTP status: 400. The request is syntactically invalid or missing required fields.

```json
{
  "type": "https://purl.mews.com/problem/core/bad-request",
  "title": "Invalid customer data",
  "status": 400,
  "detail": "Some of the customer data is either missing or is invalid.",
  "errors": [
    {
      "type": "https://purl.mews.com/problem/core/field-required",
      "pointer": "#/customer/email",
      "detail": "Email is required for customer enrollment."
    }
  ]
}
```

#### core/unauthorized

HTTP status: 401. Authentication is missing or invalid.

```json
{
  "type": "https://purl.mews.com/problem/core/unauthorized",
  "title": "Unauthorized",
  "status": 401,
  "detail": "Bearer token is missing or invalid"
}
```

#### core/not-found

HTTP status: 404. The requested resource was not found.

```json
{
  "type": "https://purl.mews.com/problem/core/not-found",
  "title": "Membership not found",
  "status": 404,
  "detail": "The requested membership with ID MEMB-845329-JK92A was not found in our system."
}
```

#### core/request-timeout

HTTP status: 408. The server timed out waiting for the request to complete.

```json
{
  "type": "https://purl.mews.com/problem/core/request-timeout",
  "title": "Request Timeout",
  "status": 408,
  "detail": "The server timed out waiting for the member search request to complete."
}
```

#### core/unprocessable-entity

HTTP status: 422. The request is valid but cannot be processed due to business logic.

```json
{
  "type": "https://purl.mews.com/problem/core/unprocessable-entity",
  "title": "Unprocessable Content",
  "status": 422,
  "detail": "The request could not be processed due to business validation rules.",
  "errors": [
    {
      "type": "https://purl.mews.com/problem/core/field-required",
      "pointer": "#/memberFilter",
      "detail": "At least one valid filter parameter must be provided for member search."
    }
  ]
}
```

#### core/too-many-requests

HTTP status: 429. The client has exceeded the rate limit.

```json
{
  "type": "https://purl.mews.com/problem/core/too-many-requests",
  "title": "Too Many Requests",
  "status": 429,
  "detail": "Rate limit exceeded. Please wait before making additional requests."
}
```

#### core/internal-server-error

HTTP status: 500. An unexpected server-side error occurred.

```json
{
  "type": "https://purl.mews.com/problem/core/internal-server-error",
  "title": "Internal Server Error",
  "status": 500,
  "detail": "An unexpected error occurred on the server. Please try again later."
}
```

#### loyalty/invalid-member-search-criteria

HTTP status: 400. The search payload is syntactically valid, but the combination of fields does not meet search requirements.

```json
{
  "type": "https://purl.mews.com/problem/loyalty/invalid-member-search-criteria",
  "title": "Invalid search criteria",
  "status": 400,
  "detail": "First name and last name are required for member search.",
  "errors": [
    {
      "type": "https://purl.mews.com/problem/core/field-required",
      "pointer": "#/memberFilter/firstName",
      "detail": "First name is required for member search."
    },
    {
      "type": "https://purl.mews.com/problem/core/field-required",
      "pointer": "#/memberFilter/lastName",
      "detail": "Last name is required for member search."
    }
  ]
}
```

### Field-level errors

Field-level errors appear in the `errors` array of a top-level error response. They identify which specific field caused the validation failure using [RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901) (JSON Pointer) syntax in the `pointer` field.

#### core/field-required

The field is required but missing from the request.

```json
{
  "type": "https://purl.mews.com/problem/core/bad-request",
  "title": "Invalid customer data",
  "status": 400,
  "detail": "Some of the customer data is either missing or is invalid.",
  "errors": [
    {
      "type": "https://purl.mews.com/problem/core/field-required",
      "pointer": "#/customer/email",
      "detail": "Email is required for customer enrollment."
    },
    {
      "type": "https://purl.mews.com/problem/core/field-required",
      "pointer": "#/customer/firstName",
      "detail": "First name is required for customer enrollment."
    }
  ]
}
```

#### core/field-invalid-format

The value has an invalid format for the expected field type.

```json
{
  "type": "https://purl.mews.com/problem/core/bad-request",
  "title": "Invalid customer data",
  "status": 400,
  "detail": "Some of the customer data has invalid format.",
  "errors": [
    {
      "type": "https://purl.mews.com/problem/core/field-invalid-format",
      "pointer": "#/customer/phoneNumber",
      "detail": "Phone number format is invalid. Expected format: +1-555-123-4567"
    }
  ]
}
```

#### core/field-too-short

The value is shorter than the minimum allowed length.

```json
{
  "type": "https://purl.mews.com/problem/core/bad-request",
  "title": "Invalid customer data",
  "status": 400,
  "detail": "Some field values do not meet length requirements.",
  "errors": [
    {
      "type": "https://purl.mews.com/problem/core/field-too-short",
      "pointer": "#/customer/firstName",
      "detail": "First name must be at least 2 characters long."
    }
  ]
}
```

#### core/field-too-long

The value exceeds the maximum allowed length.

```json
{
  "type": "https://purl.mews.com/problem/core/bad-request",
  "title": "Invalid customer data",
  "status": 400,
  "detail": "Some field values exceed maximum length limits.",
  "errors": [
    {
      "type": "https://purl.mews.com/problem/core/field-too-long",
      "pointer": "#/customer/email",
      "detail": "Email address cannot exceed 254 characters."
    }
  ]
}
```

#### core/field-out-of-range

A numeric value is outside the acceptable range.

```json
{
  "type": "https://purl.mews.com/problem/core/bad-request",
  "title": "Invalid membership data",
  "status": 400,
  "detail": "Some numeric values are outside acceptable ranges.",
  "errors": [
    {
      "type": "https://purl.mews.com/problem/core/field-out-of-range",
      "pointer": "#/membership/points",
      "detail": "Points value must be between 0 and 999999."
    }
  ]
}
```

#### core/field-invalid-type

The field has an unexpected or invalid data type.

```json
{
  "type": "https://purl.mews.com/problem/core/bad-request",
  "title": "Invalid membership data",
  "status": 400,
  "detail": "Some fields have invalid data types.",
  "errors": [
    {
      "type": "https://purl.mews.com/problem/core/field-invalid-type",
      "pointer": "#/membership/active",
      "detail": "Active status must be a boolean value (true or false)."
    }
  ]
}
```

#### core/field-not-allowed-value

The value does not match the allowed enum values.

```json
{
  "type": "https://purl.mews.com/problem/core/bad-request",
  "title": "Invalid membership data",
  "status": 400,
  "detail": "Some enum values are not allowed.",
  "errors": [
    {
      "type": "https://purl.mews.com/problem/core/field-not-allowed-value",
      "pointer": "#/membership/tier",
      "detail": "Tier must be one of: Bronze, Silver, Gold, Platinum"
    }
  ]
}
```

#### core/field-duplicate

A duplicate value was provided where uniqueness is required.

```json
{
  "type": "https://purl.mews.com/problem/core/bad-request",
  "title": "Invalid customer data",
  "status": 400,
  "detail": "Some values are duplicates where uniqueness is required.",
  "errors": [
    {
      "type": "https://purl.mews.com/problem/core/field-duplicate",
      "pointer": "#/customer/email",
      "detail": "Email address is already registered in our system."
    }
  ]
}
```

#### core/field-email-invalid

The email address format is invalid.

```json
{
  "type": "https://purl.mews.com/problem/core/bad-request",
  "title": "Invalid customer data",
  "status": 400,
  "detail": "Some email addresses have invalid format.",
  "errors": [
    {
      "type": "https://purl.mews.com/problem/core/field-email-invalid",
      "pointer": "#/customer/email",
      "detail": "The provided email address format is invalid."
    }
  ]
}
```

### Array pointer examples

Field-level errors can reference elements within arrays using JSON Pointer notation. The array index is zero-based.

```json
{
  "type": "https://purl.mews.com/problem/core/bad-request",
  "title": "Invalid customer data",
  "status": 400,
  "detail": "One or more customer records contain invalid data.",
  "errors": [
    {
      "type": "https://purl.mews.com/problem/core/field-email-invalid",
      "pointer": "#/customers/0/email",
      "detail": "The provided email address is not valid."
    },
    {
      "type": "https://purl.mews.com/problem/core/field-required",
      "pointer": "#/customers/2/firstName",
      "detail": "First name is required for customer enrollment."
    }
  ]
}
```
