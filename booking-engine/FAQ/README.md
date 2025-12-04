# FAQ

Here we address some Frequently Asked Questions concerning the Mews Booking Engine integration.

* [Which method should I use to integrate?](#which-method-should-i-use-to-integrate)
* [Where can I get Configuration ID?](#where-can-i-get-configuration-id)
* [Why doesn't the Booking Engine use the Configuration IDs I've provided?](#why-doesnt-the-booking-engine-use-the-configuration-ids-ive-provided)
* [Where can I get City ID?](#where-can-i-get-city-id)
* [Where can I get Age Category ID?](#where-can-i-get-age-category-id)

## Which method should I use to integrate?

See [Ways to integrate](ways-to-integrate.md).

## Where can I get Configuration ID?

The Booking Engine Configuration ID is a unique identifier for your particular Booking Engine implementation. You can find it in __Mews Operations__.

* Start on the **Dashboard** (the main screen).
* In the left-hand menu, select **Settings** -> **Services**.
* In the section **Bookable services**, select the service which has the Booking Engine configuration. If there's just one service, select that one.
* On the left, select **Booking engines**.
* Select the configuration you want to use.
* In the upper section there is a field **Identifier**. This is your Configuration ID. It has the format `aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee`.

![Configuration ID in Mews Operations](../.gitbook/assets/commander-configuration-id.png)

## Why doesn't the Booking Engine use the Configuration IDs I've provided?

If the Booking Engine is not using the Configuration IDs provided, it could be that some of those IDs are not valid Configuration IDs.
Please check that:

* All used Configuration IDs are really Configuration IDs, not chain, enterprise or other IDs
* All used Configuration IDs are defined in __Mews Operations__ from the same [environment](../booking-engine-api/guidelines/environments.md) as the Booking Engine you are using.
* You are using only one Configuration ID per enterprise.

## Where can I get City ID?

You can find the Mews City ID in __Mews Operations__:

* Start on the **Dashboard** (the main screen).
* In the left-hand menu, select **Settings** -> **Services**.
* In the section **Bookable services**, select the service which has the Booking Engine configuration. If there's just one service, select that one.
* On the left, select **Booking engines**.
* Select the configuration you want to use.
* In the upper section there ia a field **City Identifier**. This is your City ID. It has a format `aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee`.

![City ID in Mews Operations](../.gitbook/assets/commander-city-id.png)


## Where can I get Age Category ID?

You can find the AgeCategory ID in **Mews Operations**:

* Start on the **Dashboard** (the main screen).
* In the left-hand menu, select **Settings** -> **Services**.
* In the section **Bookable services**, select the service which has the Booking Engine configuration. If there's just one service, select that one.
* On the left, select **Age categories**.
* Select the age category you want.
* In the URL there is an ID at the end, right after `/Detail/`. This is the age category ID. It has the format `aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee`.

![ageCategoryId](https://github.com/MewsSystems/gitbook-booking-engine/assets/22661032/8d69a7ad-d641-4021-b9f1-788c9bb07df0)
