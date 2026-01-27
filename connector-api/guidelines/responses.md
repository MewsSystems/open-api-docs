# Responses

## Content-type

The API responds with `Content-Type` set to `application/json`, and with JSON content in the body. In case of a 204 response (see [Request minimal response](requests.md#request-minimal-response)), the `Content-Type` header is _not_ set and the response body is empty.

## Response codes

In case of success, the HTTP status code is normally 200 and the content contains the result according to the nature of the request. The client may opt-in to instead receive HTTP status code 204 in certain circumstances, see [Request minimal response](../guidelines/requests.md#request-minimal-response). In case of error, there are multiple HTTP status codes for different types of errors.
Every response contains `Request-Id` header with unique identification of the request, that can be used when [contacting the support](../contact-support/README.md).

### 200 OK

Success response. The content contains the result according to the nature of the request.

### 204 No Content

Success response, the content is empty. Clients can opt-in to receive this response code, see [Request minimal response](../guidelines/requests.md#request-minimal-response).

### 400 Bad request

The request is invalid or cannot be processed due to a client-side error, such as malformed input or an invalid resource identifier. In most cases, this response indicates an issue in the client application.

**Troubleshooting:**
- `Invalid {Parameter}`: The referenced resource does not exist or is in an invalid state for the given endpoint (for example, attempting to close a bill that is already closed). If you are unable to identify the issue in the request, [Contact support](../contact-support/README.md).
- `Invalid JSON`: The request body is not valid JSON. The API enforces strict JSON formatting and does not allow issues such as trailing commas after the last field or bracket. Use a JSON validator that strictly follows the JSON specification to identify formatting errors.

### 401 Forbidden

The request could not be authorized due to invalid or expired credentials, or because the client does not have sufficient permissions to access the endpoint.

**Troubleshooting:**
- The provided `ClientToken` or `AccessToken` is invalid or has expired, see [Authentication](../guidelines/authentication.md) for more information. Another cause might be the enterprise has been disabled in Mews or the integration is disabled either for the enterprise or in Mews.
- The client does not have permission to perform the requested operation. [Contact support](../contact-support/README.md) to start or update the certification process to request access to the required endpoint.

### 403 Forbidden

An error returned by the server that should be surfaced to the end user of the client application. This typically occurs when server-side validation fails or a business-logic rule is violated.

**Troubleshooting:**
- Report the response message to the enterprise to cross-check their settings in Mews with the action they tried to complete. They should make a decision on which version should change.

### 404 Not found

The server cannot find the resource requested by the client app. Verify the URL and request method.

**Troubleshooting:**
- Make sure the URL of the endpoint matches operation's URL exactly, including case sensitive characters and not sending multiple slashes in sequence.

### 408 Request Timeout

Error caused by heavy request that takes too long to process (typically tens of seconds). To get around this, request data in smaller batches. For more information, see [Request timeouts](../guidelines/requests.md#request-timeouts).

**Troubleshooting:**
- Make sure you're following all of our [Best practices](../guidelines/best-practices.md), otherwise we will not be able to resolve the timeouts. Contact Partner Success in case you're consistently recieveing timeouts.

### 409 Conflict

The request cannot be completed because the data has changed.

**Troubleshooting:**
- Refresh data on the client and resubmit the request.

### 429 Too Many Requests

Error caused by too many requests sent in a given amount of time. Response contains `Retry-After` header indicating how long the user agent should wait before making a follow-up request. For more information, see [Request limits](../guidelines/requests.md#request-limits).

**Troubleshooting:**
- Review our [Best practices](../guidelines/best-practices.md) and don't query for unchanging data often.
- Use `Retry-After` when to make next API request, avoiding making more requests that would be rate limited.
- Avoid sudden burst of API requests and distribute API calls more in time when possible.

### 500 Internal Server Error and other 5xx response codes

Unexpected error on the Mews side. This may be due to a software fault. If such a situation occurs, the error will be logged and the development team notified.

**Troubleshooting:**
- Mews is automatically notified, retry operation or [Contact support](../contact-support/README.md) if issue still persist.

## Error response details

In case of any error, the returned JSON object describes the error and has the following properties:

| Property | Type | Contract | Description |
| --- | --- | --- | --- |
| `Message` | string | required | Description of the error. |
| `RequestId` | string | optional | Unique identifier of the request. Provide this unique identifier when [contacting support](../contact-support/README.md) for quick identification of the request.|
| `Details` | string | optional | Additional details about the error \(request, headers, server stack trace, inner exceptions etc.\). Only available on development environment. |