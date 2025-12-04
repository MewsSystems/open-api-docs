# Authentication

The __Mews Booking Engine API__ is a public API that requires client authentication and authorization. 

## Client authentication

Authentication is the process of verifying the identity of the client. To access the API, you must identify your client application by providing the `Client` property in all requests. This ensures that your client application is recognized and allowed to interact with the API.

### Registration

Your client application needs to be pre-registered with Mews Support. You can open a ticket from __Mews Operations__ via the [Mews Digital Assistant](https://help.mews.com/s/article/How-to-use-the-Mews-Digital-Assistant). The registration request should contain:

* `Client` - the name of the client application that will be used for every API request
* `Email` - an email contact for your development department; this email will be used by our developers to notify you about any breaking changes in the API
* `Environment` - the name of the environment you are accessing, either `Production` or `Demo`.

### Environments

We offer two environments, `Production` and `Demo`. Use `Demo` during API implementation, and `Production` only for live customer sites.
The two environments have separate client lists, so make sure you are registered in `Production` before you move your implementation to the Production environment.
For details, see our [Environments](environments.md) page.

### Sample client name

Before the registration of your `Client` name is confirmed, you can use the sample client name below. This client name will **only work in the Demo environment**.
Keep in mind that this must be replaced by your proper `Client` name as soon as you finish the registration process.

```json
{
    "Client": "My Client 1.0.0"
}
```

## Client authorization

Authorization is the process of determining what the authenticated client is allowed to do. In this case, it is sufficient to know the unique identifier of a hotel or other enterprise in order to access it. However, the client must be authenticated by providing the `Client` property in all requests to ensure it has the necessary permissions to interact with the API.
