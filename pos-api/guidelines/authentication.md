# Authentication

The __Mews POS API__ uses bearer authentication, also known as token authentication. When you make an API call, include your API key in the `Authorization` header in the following format:
```
Bearer <your API key>
```
`<your API key>` is a placeholder for your secret key, which should have an `sk_test` prefix for access to the test environment and an `sk_live` prefix for access to the live or production environment.

> **Important**: It is important to keep your API keys safe. Do not share your API keys in publicly accessible locations like GitHub or client-side code.

All API requests should be made over `HTTPS`, any requests made over `HTTP` will fail. Additionally, API requests that lack authentication will also fail.
