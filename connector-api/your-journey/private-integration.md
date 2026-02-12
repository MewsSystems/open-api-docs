# Private integration journey

Please follow the below steps if you are a property building your own integration or a company working on behalf of a customer to build a connection with **Mews Connector API**. A private integration means your integration will not be listed in the Mews Marketplace.

## Certification instructions

1. Review the guidelines, demo credentials, best practices, use cases, and endpoints found in [Connector API](../) documentation.
2. Fill in the [Become a Mews Partner Form](https://www.mews.com/en/partners/new-partnerships) and get your Partner Id if you have not done so already.
3. Complete our [Private Integrations Certification Form](https://mews.typeform.com/to/xKbTQfDC?typeform-source=mews.atlassian.net).
4. Test all the endpoints you are listing on the form in demo. [Request a dedicated Demo Property](../guidelines/environments.md#mews-operations-credentials) to get access.
5. Make sure you are specifying the `Client` parameter in your [API request body](../guidelines/requests.md#body). Note that if you do not specify a **unique** Client name in your demo API calls, we cannot review the API activity and therefore approve the certification.
6. Once you've generated the API activity, [book a review with us](https://outlook.office.com/book/MewsMarketplace1@mewssystems.com/s/7N13ca0m6U26AMjM1h8p6w2?ismsaljsauthenabled) in our calendar. _Please note this is not a meeting but rather a placeholder for us to review your solution_.

## Receiving tokens

Once the integration profile is created in the production environment, you will receive an email with your `ClientToken` and `AccessToken`.

## Questions

[Contact support](../contact-support/) if you have any questions or would like to schedule a meeting with one of our private integrations team members. Please include a quick summary about the integration you are building and the property(ies) it is for.

## FAQs

<details>

<summary>We need access to more endpoints than we originally thought, how do we go about getting access to additional permissions post certification?</summary>

Please make the necessary tests in demo and then [contact support](../contact-support/) letting us know which you need enabled.

</details>

<details>

<summary>Our integration is currently private but we would now like to be listed in the Mews Marketplace. Can we modify this and if so how?</summary>

[Contact support](../contact-support/) letting us know you would like to go public and let us know of any changes to your integration profile (description, images…).

</details>

<details>

<summary>I am confused by the wording in Mews, is there a cheat sheet for what certain words mean in the system?</summary>

Yes, please see [Mews Glossary for Open API users](https://help.mews.com/s/article/Mews-Glossary-for-Open-API-users?language=en_US).

</details>

<details>

<summary>What is required by a property to have a private integration?</summary>

A property must have the Connectivty Add-on as part of their subscription or be on the Enterprise package. They can verify their current subscription by contacting their Client Success Manager.

</details>

<details>

<summary>Can a partner configure multiple webhook endpoints per integration?</summary>

No — there can only be one Webhook URL per integration client; partners should route by Enterprise ID inside their handler.

</details>

<details>

<summary>How long do integrations take to go live?</summary>

This is entirely up to you! Once all endpoints are tested and a certification time is booked, the team can have you live within 24 hours of that certification if there are no issues.

</details>
