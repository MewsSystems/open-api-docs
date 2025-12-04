# Your journey with Mews

> ### Partner ID
> You will be given a Partner ID at the start of the process (e.g. INT123456), please keep this safe as you will need this ID when it is time to certify your integration. Not got one yet? [Register to join the Marketplace](https://www.mews.com/en/partners/new-partnerships).

We want your experience working with Mews to be quick and simple, so we make the process as automated and self-service as possible and minimise touchpoints with the Mews team. You just need to follow these steps:

* [Step 1: Explore the APIs](#step-1-exploration)
* [Step 2: Let us know what you plan to do](#step-2-qualification)
* [Step 3: Develop and test your solution](#step-3-development)
* [Step 4: Get certified](#step-4-certification)
* [Step 5: Go live with a pilot](#step-5-pilot)
* [Step 6: Join the Marketplace!](#step-6-publication)

If you have questions about the process, drop us a line to [partnersuccess@mews.com](mailto:partnersuccess@mews.com).

> ### Booking Engine integrations
> Booking Engine API integrations are the exception as they do not need to be certified, do not need a pilot property, and will not normally be listed on the Marketplace. See [Booking Engine integrations](booking-engine-integrations.md).

## Step 1: Exploration

First find out [which of our APIs you should be using](../the-mews-apis/README.md). If you're not sure, take a look at the [use cases](../use-cases/README.md) for suggestions. Each API has its own body of documentation, so you'll want to familiarize yourself with the guidelines and operations for the API you'll be using.

## Step 2: Qualification

Once you've had a chance to familiarize yourself with the APIs and the process, you will be asked to complete a short Qualification step to answer some basic questions:

* Which API or APIs will you be developing against?
* Is this a private integration (for just one enterprise customer) or a public integration (available through the Mews Marketplace)?
* If this is a public integration, then what will be the pilot property?
* What is your estimated timescale for development?

## Step 3: Development

When you've decided which API operations to use and how, you'll see each API has its own demo credentials for you to try them out, connecting to our demo servers. All of the information you need to start developing and testing is in the documentation. For example, if you're working with the Mews Connector API, the [guidelines](https://mews-systems.gitbook.io/connector-api/guidelines) include details of the [URLs and access credentials](https://mews-systems.gitbook.io/connector-api/guidelines/environments).

## Step 4: Certification

When you are finished developing and testing, it's time to get certified! Complete the [certification form](https://mews.typeform.com/to/ehTUz7) and we'll send you further instructions by email. As part of the certification process, you will be asked for some details about your integration, such as the endpoints you will be using and the request message frequency. You can find more information about certification in the following resources:

* __Connector API integrations__<br>
  * API Documentation: [Certification](https://mews-systems.gitbook.io/connector-api/guidelines/certification)
  * Mews Help: [Connector API Certification: What to expect](https://help.mews.com/s/article/connector-api-certification-what-to-expect?language=en_US)

* __Channel Manager API integrations__<br>
  * API Documentation: [Certification](https://mews-systems.gitbook.io/channel-manager-api/certification)
  * Mews Help: [Channel API Certification: What to expect](https://help.mews.com/s/article/channel-api-certification-what-to-expect?language=en_US)

## Step 5: Pilot

After successful certification, you will be sent a `Client Token` for connection to production sites - this token is unique to your application. To connect to a customer property, you will also need an `Access Token` (for the Connector API) or `Connection Token` (for the Channel Manager API) - this token is unique to the property.

> **Important:** Tokens are your security keys to access customer data in Mews, please store them safely and securely, do not share them and do not put them into email communication.

* __Public integration__<br>
If your integration is intended to be listed publicly in the Mews Marketplace, Mews will add the integration to the agreed pilot property and you will be automatically sent the relevant token for that property (either `Access Token` for a Connector API integration, or `Connection Token` for a Channel Manager API integration). The integration will need to run successfully for a period of time(\*1) on the pilot site before you can progress to [Step 6: Publication](#step-6-publication).

* __Private integration__<br>
If this is a private integration to a single enterprise, Mews will add the integration to the relevant properties and you will automatically be sent the relevant token or tokens (`Access Tokens` for Connector API integrations, or `Connection Tokens` for Channel Manager API integrations). Although there is no pilot site, we will still monitor the performance of the integration for a period of time\(*1\) just to confirm everything is ok.

## Step 6: Publication

If your integration is intended to be listed publicly in the Mews Marketplace, then after an agreed period(\*1) of successful operation at the pilot site, you will automatically be notified by email with final instructions. Your solution will be listed in the Mews Marketplace and on the [Mews website](https://www.mews.com/en/products/marketplace), and you can roll it out to all properties that want to integrate. For further information, see the [Connector API onboarding guide](https://help.mews.com/s/article/connector-api-integrations-onboarding-mutual-customers?language=en_US) and the [Channel Manager API onboarding guide](https://help.mews.com/s/article/channel-manager-onboarding-guide?language=en_US).

> \*1 The monitoring period will depend on circumstances, but typically this will be 2 weeks for a Connector API integration or 4 weeks for a Channel Manager API integration.
