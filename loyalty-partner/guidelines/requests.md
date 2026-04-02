# Requests

All requests from Mews to your API use HTTPS with `Content-Type: application/json`.

### URL structure

Mews calls your API at a base URL you provide. Individual operations' paths are appended to the `[provider]` base URL.

For example, if your base URL is `https://example.com/api/loyalty`, the [member search operation](/broken/pages/703d540b7d5b88a00678dd4148b956793bb5b43e#post-members-search) is called at `https://example.com/api/loyalty/members/search`.

### Providing your URLs to Mews

Provide Mews with base URLs for both the demo and production environments before go-live. Using separate base URLs per environment prevents test data and live data from mixing.
