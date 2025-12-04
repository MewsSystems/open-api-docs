# Payment card authorization

Whenever a user creates a reservation, there is an option to let them add a payment card, which will then be stored in Mews.
You can read more about how to support payment cards in your booking engine application in the [Supporting payment cards](supporting-payment-cards.md) use case.

With the PSD2 directive (Revised Payment Services Directive - a European Union Directive), it might be convenient for the enterprise to authorize the card for smooth payments in the future.
This can minimize the risk of a future payment being rejected.

## Creating a reservation group with verified card

The first step of the workflow is to create a reservation group via the API, using [Create reservation group](../operations/reservation-groups.md#create-reservation-group) and supplying payment card data with the request - see [Supporting payment cards](supporting-payment-cards.md).
The next step is to check whether the card needs authorization by getting the card details using [Get payment cards](../operations/payment-cards.md#get-payment-cards) and checking if the card [Authorization state](../operations/payment-cards.md#authorization-state) is `Authorizable`.
If it is, then you can try to authorize the card immediately, using [Authorize payment card](../operations/payment-cards.md#authorize-payment-card).

Check the card [Authorization request state](../operations/payment-cards.md#authorization-request-state) in the response to [Authorize payment card](../operations/payment-cards.md#authorize-payment-card).
If the state is a finite state, such as `Authorized` or `Declined`, then no further action is needed.
If the state is a non-finite state, such as `Pending` or `Requested`, then you can redirect the user to the Mews application, which will take care of the whole authorization process.
Simply navigate the user to URL:

`https://[MewsApplicationsBaseUrl]/navigator/card-authorization/detail/[PaymentCardId]?returnUrl=[ReturnUrl]`.

A `returnUrl` query parameter is optional and is used by the application to return the user into your booking engine after successful payment card authorization, or in case the user decides to abandon the process.
The `returnUrl` value should be a `Base64` encoded absolute URL e.g. in JavaScript via the `btoa` function.

After the user returns to your booking engine, you can verify the card authorization state again using [Get payment cards](../operations/payment-cards.md#get-payment-cards) and checking that the [Authorization state](../operations/payment-cards.md#authorization-state) of the card is `Authorized`.

## Step by step workflow

1. Call [Create reservation group](../operations/reservation-groups.md#create-reservation-group) with [Credit card data](../operations/reservation-groups.md#credit-card-data), and get `PaymentCardId` from the response.
2. Validate that the card [Authorization state](../operations/payment-cards.md#authorization-state) is `Authorizable` via the [Get payment cards](../operations/payment-cards.md#get-payment-cards) operation. **If not, the workflow ends here.**
3. Try to authorize the card via [Authorize payment card](../operations/payment-cards.md#authorize-payment-card) and check that the [Authorization request state](../operations/payment-cards.md#authorization-request-state) in the response is either `Pending` or `Requested`. **If not, the workflow ends here.**
4. Create a `ReturnUrl` by encoding your URL using `Base64`, e.g. the JavaScript example would be `btoa(urlWhereUserShouldReturn)`.
5. Re-direct the user to the gateway at URL `https://[MewsApplicationsBaseUrl]/navigator/card-authorization/detail/[PaymentCardId]?returnUrl=[ReturnUrl]` (you can find the value of `MewsApplicationBaseUrl` in the [Environments](../guidelines/environments.md) section).
6. After the user returns to the `ReturnUrl` in your booking engine, you can verify the authorization state by again using [Get payment cards](../operations/payment-cards.md#get-payment-cards) and checking that the [Authorization state](../operations/payment-cards.md#authorization-state) is `Authorized`.

## Workflow diagram

![](./assets/images/on-session-payment-card-authorization-flow.png)
