# Responses

The API responds with `Content-Type` set to `application/json` and JSON content. In case of success, the HTTP status code is 200 and the content contains results according to the particular operation.
In case of error, different HTTP status codes are used for different types of error:

* **400 Bad Request**
  * Error caused by the client application, e.g. in case of a malformed request or invalid identifier of a resource. In most cases, such an error signifies an error in the client application, i.e. the consumer of the API.
* **401 Unauthorized**
  * Error caused by usage of an invalid access token.
* **403 Forbidden**
  * Server error that should be reported to the end user of the client application. This happens, for example, when the server-side validation fails or when a business-logic check is violated.
* **429 Too Many Requests**
  * Error indicating that the user has sent too many requests in a given amount of time. Response contains `Retry-After` header indicating how long the user agent should wait before making a follow-up request. For more information, see [Request limits](requests.md#request-limits).
* **500 Internal Server Error**
  * Unexpectced error of the server. In most cases, such an error signifies an error on the Mews side. This will be logged and we will be notified immediately when such an error occurs.
  If anything like this happens, please contact Mews directly or raise an issue on GitHub.

In case of any error, the returned JSON object describes the error and has the following properties:

| Property | Type | Contract | Description |
| :--- | :--- | :--- | :--- |
| `Message` | string | required | Description of the error |
| `Details` | string | optional | Additional details about the error, e.g. request, headers, server stack trace, inner exceptions; only available on Development environment |

Some errors may contain further information relevant to the error on top of these two properties, but that depends on the operation and is specifically described in the operation documentation.
