# Integrations

## Google Tag Manager

> ### Notice of usage
> Google Tag Manager is a 3rd party service and we provide this integration as is. We export a set of supported events and their data to the container, however, we have no control over what happens with them and how they are used. Below we provide a set of basic setup examples that have been tested and verified to work with Distributor. If you need a more complex setup, it is up to you to configure and test it.

### Enabling Google Tag Manager in Distributor

### Migrating to Google Tag Manager

### Triggers

### Basic setups

#### Universal Analytics

#### Google Ecommerce

#### Google Enhanced Ecommerce

**Tracking with Mews Merchant and source attribution**

### Conditionally firing tags based on tracking consents

1. **Set up Universal Analytics in Google Tag Manager**

2. **Let Distributor know what the tracking consents should be**

3. **Create data layer variable for performance tracking consent**

4. **Create trigger for all distributor events where performance consent is given/true**

5. **Use created trigger to fire Universal Analytics tag**

6. **All is set up now**

### Troubleshooting

#### There are no events or ecommerce transactions tracked after a redirect to the Mews Merchant page

#### I’ve set up the container correctly but there are still no events tracked

> Important: If you are using Mews Payments, you need to disable the software for the \*.mews.com domain too.

#### The Tag Assistant Chrome extension shows me a warning about multiple installations, but I use only one

| Next |
| :-- |
| [Triggers Reference](triggers-reference.md) |
