# Environments

Mews POS API supports two distinct environments:

- [Demo environment](#demo-environment) – For development, integration testing, and sandbox experimentation.
- [Production environment](#production-environment) – The live platform used by active businesses.

## Demo environment

The Demo environment is intended for development and testing purposes. It simulates the behavior of the live Mews POS API, while also allowing access to the Mews POS web and Android applications, and a linked demo property in Mews Operations (PMS).

### Platform base address

Use this base address when making API requests in the Demo environment:

* **PlatformAddress** - `https://api.mews-demo.com/pos`

### API authentication

Use the following token and identifier when authenticating requests to the Demo environment:

* **Mews POS API Demo account** - `POS Open API`
* **Mews POS API Demo token** - `sk_test_bae7115405656f156ca6ca`

> **Demo-only**: This token is only valid in the Demo environment and must **not** be used in Production.

### Request throttling

To maintain system performance, the following rate limits apply:

- 200 requests per token per 15-minute window

### Mews POS application

You can log into the Mews POS application using the following credentials:

* **Mews POS Demo web address** - `https://pos.mews-demo.com/`
* **Email** - `pos-api-demo@mews.com`
* **Password** - `pos-API-2024`

### Mews POS Android app

Download the latest Android build of the Mews POS app from the following link. The Android app is useful for end-to-end testing of POS device workflows and integration scenarios.

* **Android** - [`Download APK`](https://mews-pos-builds.s3.eu-west-1.amazonaws.com/release/demo/mews-pos-demo.apk)

### Mews Operations (PMS)

The Mews POS Demo environment is linked to a demo property `Styrn Hotel` in the Mews Operations (PMS) Demo environment, for testing connected property-level workflows. You can access the demo property via the [Mews Connector API](https://mews-systems.gitbook.io/connector-api) using these credentials:

* **ClientToken** - `8F9296CEE7FF4FC3AD55AEB400EA916E-05652C5153CF2AEFC9A405BFF6E8912`
* **AccessToken** - `87835B7178CC47A8A648B23300F17B30-8A5AEDDDC7E0B190879D788CA1A96A6`
* **Property Name** - `Styrn Hotel`

## Production environment

Use this environment for live transactions and integrations with real customer data. Only use verified credentials and production-issued tokens here.

### Platform base address

Use this base address when making API requests in the Production environment:

* **PlatformAddress** - `https://api.mews.com/pos`

## Notes

- Do **not** mix Demo and Production credentials or endpoints.
- Tokens and credentials in the Demo environment may be reset periodically.
- For security and privacy, never share Production tokens publicly.
