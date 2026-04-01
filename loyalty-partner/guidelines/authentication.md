# Authentication

Mews authenticates all requests to your API using bearer token authentication.

### Token scope

A single token covers the entire integration. All requests from Mews to your API use the same token regardless of which property initiates the action. You can distinguish the scope of operation using either `mewsEnterpriseId` or `providerEnterpriseId`  properties provided in the request payload.

### Token generation

You are responsible for generating the token and providing it to Mews. Mews stores the token and includes it in all subsequent requests.

### Token lifecycle

Tokens are long-lived, valid for one year under the current agreement. Token rotation is manual: when a token approaches expiration, you generate a new token and provide it to Mews.

During rotation, your API must accept both the current token and the new token simultaneously to avoid service interruptions.

### Example request

```http
POST /members/search HTTP/1.1
Authorization: Bearer YOUR_SECRET_TOKEN
Content-Type: application/json
Content-Length: 180

{
  "mewsEnterpriseId": "123e4567-e89b-12d3-a456-426614174000",
  "providerEnterpriseId": "ENT-9876-AZ",
  "memberFilter": {
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

{% hint style="info" %}
Future versions may support automatic token renewal or shorter token lifespans for improved security.
{% endhint %}
