# Testing in the Demo environment

The Booking Engine Widget uses the Production environment by default.
Before you are ready to run the Booking Engine Widget against real data, you should use the Booking Engine Widget with [Demo environment](../../booking-engine-api/guidelines/environments.md) data instead.
Most of the steps are the same as those described in the [Getting started](../getting-started.md) section.
The only difference is in [Step 2: Initialize Booking Engine Widget](../getting-started.md#step-2-initialize-booking-engine-widget).

In comparison to the default example, you can set an optional [`dataBaseUrl`](../reference.md#string-databaseurl) property to point to the Demo environment:

```javascript
Mews.Distributor(
    { configurationIds: ['aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'] },
    function (api) {
        api.open();
    },
    { dataBaseUrl: 'https://api.mews-demo.com' }
);
```

> **Important:** Make sure you use `Configuration IDs` from the correct environment, otherwise they will not be used - see [Why doesn't the Booking Engine use the Configuration IDs I've provided?](../../FAQ/README.md#why-doesnt-the-booking-engine-use-the-configuration-ids-ive-provided).

After making this change, the Booking Engine Widget will start using data from the [Demo environment](../../booking-engine-api/guidelines/environments.md#demo-environment) instead of from the [Production environment](../../booking-engine-api/guidelines/environments.md#production-environment).
