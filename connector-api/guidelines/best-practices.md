# Best practices

This is some advice on best practices for using the API, regardless of your particular use case. Follow this advice for less errors and better performance.

- **Use RequestId**<br>Every failed API request has `RequestId` property in the [Error response details](../guidelines/responses.md#error-response-details). We highly recommend to include this information in your observability solution. Provide this value when [contacting support](../contact-support/README.md).

- **Handling HTTP status codes**<br>Follow our recommendations on handling each [response code](responses.md#response-codes) and how to resolve most common issues.

- **Webhooks instead of polling**<br>Instead of periodically polling for updates using a 'get' operation, use [Webhooks](../events/README.md) instead and subscribe to updates.
[Contact support](../contact-support/README.md) if a Webhook for an event is not supported . For more information, see [Ways to communicate](../events/communicate.md).

- **Limit use of extents**<br>Limit the amount of extents you use as much as possible. You can see an example of extents in [Get all resources](../operations/resources.md#get-all-resources). An extent represents a related entity that requires lookup into another database table, thus significantly hindering performance. If you need to use multiple extents, instead create a separate call for each individual extent.

- **Use pagination**<br>Use [pagination](pagination.md) for 'get' operations wherever possible. Responses will be smaller and easier to manage, and you won't hit those [request timeouts](requests.md#request-timeouts)!

- **Use filtering**<br>Avoid retrieving the same data repetitively. Leverage filtering to retrieve just the subset of data that's relevant to you. Data past the [Editable History Window](https://help.mews.com/s/article/Mews-Glossary-for-Open-API-users?language=en_US#EditableHistoryWindow) can't be changed so it doesn't make sense to pull it repeatedly.
If there is no support for a filter you'd benefit from, [contact support](../contact-support/README.md) with a request to add it. 

- **Cache data and limit high-traffic calls**<br>Querying for static or frequently needed data on every request adds unnecessary traffic and slows down the user experience. Cache data that don't change often (e.g. resource categories, services, products, accounting categories, business segments, configuration, taxes). For high-traffic or get-all style endpoints (availability, restrictions, pricing), don't call on every page view, refresh, or keystroke. Cache responses (e.g. 30–60 seconds for search-like data), filter to the minimal scope, use [pagination](pagination.md), and apply client-side rate limiting and exponential backoff when you see increased latency or errors.

- **Graceful degradation and resiliency**<br>Assume that API calls can be slow, fail, or be throttled, resulting in [error responses](responses.md#500-internal-server-error-and-other-5xx-response-codes), [timeouts](responses.md#408-request-timeout) or [blocking](responses.md#429-too-many-requests). Degrade only the affected feature (e.g. availability refresh), not the whole product. Fail fast in interactive flows and retry in the background with exponential backoff. See [request limits](requests.md#request-limits).

- **Respect shared capacity**<br>The API is multi-tenant: your traffic shares capacity with other properties and partners. Implement client-side rate limiting and backoff so that you don't keep sending requests when you receive 429 or see increased latency. Mews rate limiting protects the system, but your integration should avoid hitting it in the first place. Proactively monitor your traffic volume and resolve client-side issues before they escalate. Stay within documented limits. If your usage will change significantly, coordinate with Mews in advance so we can anticipate load and help avoid impact on your integration and others.

- **Planned campaigns and traffic spikes**<br>When planning activities resulting in substantially higher traffic (e.g. marketing campaigns, bulk operations), inform Mews via your partner contact or [contact support](../contact-support/README.md) with the planned time window, expected traffic multiplier, and affected endpoints, so we're aware in case something goes wrong and have a quick contact point. We do not offer increased rate limits; ensure your integration fits within [request limits](requests.md#request-limits) and handles being rate limited (e.g. [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff), circuit breakers, or a user queue on your side). Your integration should use caching and have exponential backoff, rate limiting, and circuit breakers in place.

- **Consequences of not following best practices**<br>Integrations that repeatedly ignore basic best practices (for example, continuing to send requests at high volume after being rate limited) may be blocked by Mews to protect our systems and other users.