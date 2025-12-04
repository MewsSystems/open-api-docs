# Requests

The API accepts only `HTTP POST` requests with `Content-Type` set to `application/json` and JSON content dependent on the operation to be performed. All operations follow this address pattern:

```text
[ApiBaseUrl]/api/distributor/v1/[Resource]/[Operation]
```

* **ApiBaseUrl**
  * Base address of the Mews Booking Engine API, this depends on the [Environment](environments.md) (Demo or Production).
* **Resource**
  * Logical group of operations, in most cases this identifies the target of the operation.
* **Operation**
  * Name of the operation to be performed.

## Request body

```json
{
    "Client": "My Client 1.0.0",
    "LanguageCode": null,
    "CultureCode": null 
}
```
| Property | Type | Contract | Description |
|:--|:--|:--|:--|
| `Client` | string | required | Identification of the client, as described in [Authentication](./authentication.md). |
| `LanguageCode` | string | optional | Code of the language, see [Supported language codes](./supported-language-codes.md). |
| `CultureCode` | string | optional | Code of the culture, see [Supported language codes](./supported-language-codes.md). |

* All API operations require `Client` to be present in the request.
* All API operations optionally accept `LanguageCode` and `CultureCode`. These can be used to enforce the language and culture of the operation, which affects for example the names of entities, descriptions or error messages.
Both of these values must be defined together, otherwise default values for the enterprise are used.

## Request limits

Mews implements API request limits in order to protect our systems against an excessive volume of calls which could compromise the service for all its users.
The particular limits are dependent on circumstances.
Regardless, your system should be prepared to receive a `429 Too Many Requests` response in cases where you hit such a limit - see [Responses](responses.md).

If you receive this error response, your system can re-try after an interval time, however some care is needed in choosing the interval time.
In case of a 429 error, we include the `Retry-After` http header in the response to indicate how long you should wait before making a re-try attempt.
Alternatively, you could implement something like an exponential backoff strategy, i.e. using a progressively longer wait between re-tries for consecutive error responses. Pausing for a fixed amount of time is never recommended.
If you are receiving `429 Too Many Requests` errors, then we would also recommend examining your implementation to see if it is possible to make design changes to reduce the load on our API and prevent the errors being generated in the first place.
