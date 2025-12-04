# Google Tag Manager

> **Notice of usage:** Google Tag Manager (GTM) and Google Analytics 4 (GA4) are third party services and we provide this integration as is.
We support a set of custom events and Data Layer variables for use with GTM and GA4, however we have no control over what happens to them and how they are used. The basic setup examples we provide have been tested and verified to work with the Mews Booking Engine, however if you need a more complex setup then we cannot provide the support to do so and we recommend to ask a specialist to set it up and test it for you.


> ### 🚨 Disclaimer regarding Google Analytics data accuracy
>
> We understand that some property owners have expressed concerns about discrepancies between the data they see in Google Analytics (GA) and the actual reality. It’s essential to be aware of the following factors:
>
> **Ad Blockers impact**
> - Approximately 33% of internet users utilize ad blockers, which can block Google Analytics and Google Tag Manager (GTM) scripts. See for example this article for a reference: <a href="https://backlinko.com/ad-blockers-users" target="_blank">https://backlinko.com/ad-blockers-users</a>.
> - Consequently, the data received from these services may not be 100% accurate.
> - Metrics such as revenue and the number of bookings may appear lower than the actual figures, due to ad-blocking behavior.
>
> **Consent and tracking**
> - If a guest declines cookies or tracking, their interactions won’t be tracked in Google Analytics.
>
> Please remember to address these considerations when interpreting GA data and making business decisions.


**Google Tag Manager (GTM)**, in conjunction with **Google Analytics 4 (GA4)**, is a supported integration with the **Mews Booking Engine Widget**.
Both GTM and GA4 are part of the **Google Marketing Platform**, a suite of web marketing products and services.

* [About Google Marketing Platform](https://marketingplatform.google.com)
* [About Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/)
* [About Google Analytics](https://marketingplatform.google.com/about/analytics/)

The Mews Booking Engine Widget includes code to support web marketing 'tags' that can be managed via Google Tag Manager, and which communicate data on user visits to Google Analytics for the purposes of web analytics. What this means is that with a Google Account you can access data on user visits, including page views and shopping cart behaviour.


> ### What is a Tag?
> A Tag is something used to track activity on websites and apps, meaning the interaction between the user, their browser and the website or app. It's implemented as a piece of code inside the website or app that sends data to an analytics service (such as Google Analytics) when triggered to 'fire', usually by some event occurring within the website or app such as a page being requested by the user, or an item added to a shopping cart. As such, they provide invaluable information about how users are interacting with your digital property.

## Cross-domain tracking

If you use the **Mews Booking Engine Widget** on your website and collect data via **Google Analytics 4**, make sure you configure [cross-domain tracking](ga-cross-domain-tracking.md), to track users correctly across both your domain and the Mews domain.

## GA4 vs Universal Analytics

The current version of Google Analytics is called Google Analytics 4 or GA4. This replaces the now obsolete Universal Analytics, which worked slightly differently and may have different terminology. Universal Analytics is being discontinued by Google and therefore we have removed all references to it in our documentation.

## Further information

The whole subject of web marketing, web analytics and web marketing tags is rather complex and outside the scope of this documentation. However, you can find what you need to get started using it with Mews in the [Mews Help Center](https://help.mews.com). Google also provides online support resources.

### Mews Support

* [Set up Google Tag Manager](https://help.mews.com/s/article/google-tag-manager)
* [All GTM related articles](https://help.mews.com/s/global-search/GTM)

### Google Support
* [Google Tag Manager Help](https://support.google.com/tagmanager/)
* [Google Analytics Help](https://support.google.com/analytics/)

## Getting started

Here we provide the reference information you will need, so if you are already familiar with Google Tag Manager you can get started straight away.
The reference includes details of **custom events** and **Data Layer variables** generated within the Booking Engine, which can be used to trigger analytics tags to fire, i.e. to send data to Google Analytics.
You will need to reference these events and variables when setting up tag _triggers_ in Google Tag Manager.

* [Google Triggers Reference](google-triggers-reference.md)
