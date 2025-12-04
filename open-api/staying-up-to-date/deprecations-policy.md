# Deprecations Policy

Sep 3rd, 2024

## Contents

This policy addresses the following:

* [Why we have this policy](#why-we-have-this-policy)
* [What do we mean by deprecated?](#what-do-we-mean-by-deprecated)
* [What we deprecate and why](#what-we-deprecate-and-why)
* [When we deprecate](#when-we-deprecate)
* [How we deprecate](#how-we-deprecate)
* [How long is the stoppage notice period?](#how-long-is-the-stoppage-notice-period)
* [How deprecations are communicated](#how-deprecations-are-communicated)
* [As a user, what should I do?](#as-a-user-what-should-i-do)
* [Deprecations and versioning](#deprecations-and-versioning)
* [Questions and feedback](#questions-and-feedback)

## Why we have this policy

Changes to the APIs are necessary and inevitable as part of continuous improvement to our products and services. We try to make those changes in such a way that there is only positive impact on users.
For example, we announce new features and other changes, we encourage you to take advantage of them and we actively try to avoid making breaking changes, i.e. changes that would impact your current implementation.

Sometimes, however, breaking changes are unavoidable. So the question becomes, how can we manage these changes in a way that has the least negative impact on users?
The answer is not to simply stop a feature or make a breaking change without plenty of notice. Making a feature `deprecated` is us giving notice that this feature will be stopped in the future.

## What do we mean by deprecated?

* **Deprecated**<br>A feature which is `deprecated` is considered an old feature that users should migrate away from; it is no longer up to date; the implication is that there is a better way to do something, or else this something should no longer be done at all; a `deprecated` feature is still supported, it still works, but this is likely to be only for a limited period of time to allow users to migrate away to the preferred alternative.

* **Discontinued**<br>A feature which is `discontinued` no longer exists, it is no longer supported, it is withdrawn, gone, kaput, dead; we might also use `stopped` to mean the same thing.

* **Breaking changes**<br>`Breaking changes` are changes that could potentially impact your current implementation, assuming you use the changed feature.

* **Non-breaking changes**<br>`Non-breaking changes` are changes that should _not_ impact your current implementation, regardless of what features you use.

* **Stoppage notice period**<br>The `stoppage notice period` or `deprecation period` is the notice period between a feature being deprecated and it being discontinued.

## What we deprecate and why

In the context of our APIs, _feature_ could mean any of these things:

* An entire API endpoint or operation
* A part of the functionality of an API operation
* A data field or property of an API operation
* A URL or part of a URL
* A way of communicating, e.g. use of webhooks or methods for authentication

As to the why, we deprecate features because we need to make breaking changes and this is a way to let you know that you should change your implementation, and to give you time to do so - see [Why we have this policy](#why-we-have-this-policy).

## When we deprecate

Most changes to the API do not in fact involve deprecation. For example:

* Adding a new endpoint
* Adding fields to an existing endpoint

These are considered non-breaking changes, in other words changes that do not require any change to legacy implementations for their continued working.
Deprecations are planned breaking changes, i.e. a statement that we intend to make a breaking change.
We plan it so that any such change does not produce unexpected behaviour \(see [As a user, what should I do?](#as-a-user-what-should-i-do)\) and we follow a clear deprecation process \(see [How we deprecate](#how-we-deprecate)\) to keep you informed and allow you to implement the necessary changes to your implementation.

## How we deprecate

This is the process or life cycle for a deprecated feature:

1. **Announcement** - We announce in the Changelog what feature is deprecated and add it to the Deprecations table; a discontinuation or stoppage date will be set.

2. **Push back** - (Optional) The discontinuation or stoppage date may be pushed back, according to circumstances; it will never be brought forward.

3. **Reminder** - (Optional) We may remind users of pending stoppages prior to the stoppage occurring, but this depends on circumstances such as the scale and importance of the change.

4. **Stoppage** - We permanently stop support for the feature.

What we _won't_ do:

* We won't just discontinue any feature of the API without first going through a deprecation process.
* We won't bring forward the discontinuation or stoppage date.
* We won't plan a change that could cause unexpected behaviour if a user continues to try and use a discontinued feature.

> ### Soft stoppage
> When a feature is stopped or discontinued, it is removed from the documentation and no longer supported or maintained. However, we do not immediately 'switch off the lights'.
> We try to contact affected partners to make sure they are aware of the stoppage, and we temporarily remove the feature via brown-outs, as a way of communicating with those partners that were otherwise not informed or failed to take action.
> We do this for a period of time that is agreed with affected partners, or at our own discretion, before finally pulling the plug and permanently terminating the feature.

## How long is the stoppage notice period?

The stoppage notice period or deprecation period is the notice period between a feature being deprecated and it being discontinued.
We reserve the right to change the duration of this period in order to optimise the process, but our guideline is:

* Minimum of **ONE YEAR** for all changes
* All changes batched to fall on the next **JANUARY**

> **For example**: A feature deprecated on June 28th, 2024 would be discontinued in January of 2026. A feature deprecated on October 28th, 2024 would also be discontinued in January of 2026.
> Batching the changes like this is intended to make the maintenance task much easier for our customers and partners, and indeed for us.

## How deprecations are communicated

* **Changelog**<br>
The Changelog tracks individual changes to the API, including deprecations.

* **Deprecations table**<br>
The documentation for each individual API includes a Deprecations page which summarises all deprecations in the API. It provides the necessary information in these table columns:

  * **Feature** - What is deprecated
  * **Comments** - Additional information, such as the reason for the deprecation and what the replacement feature is
  * **Deprecated** - The date when the deprecation occurred, i.e. was announced in the Changelog
  * **Discontinued** - The date when the deprecated feature will be discontinued altogether (or _was_ discontinued if the date has passed), or '-' if no date has been set

* **API Operations**<br>
Deprecated features are shown in the API reference documentation with strikethrough (e.g. ~~TaxValues~~), followed by the label **Deprecated!**.

* **OpenAPI definition**<br>
Where we publish an OpenAPI definition for the API (linked from the home page), deprecated features are indicated, as per the OpenAPI specification.

## As a user, what should I do?

Check the Changelog periodically, but not less often than once a month; optionally, you can set up a notification alert on the GitHub repository for our API Docs to be informed whenever there is an update to the master branch.
Where a deprecation is announced, check your implementation and, if relevant, plan a change to your implementation. This change must be completed within the deprecation period (stoppage notice period).
If you are stuck for any reason, get in touch! \(see [Questions and feedback](#questions-and-feedback)\).

> ### What will be the impact if I fail to change my implementation in time?
>
> If you try to use a `deprecated` feature after its discontinuation / stoppage date, then the functionality will simply not work.
> We plan that all discontinued features will not produce unexpected behaviour, but will fail in a safe manner. For example, if you call a discontinued endpoint, we will return an http `410` code, indicating "this resource no longer exists".
> What should never happen is that you use some feature and it works, but works differently to how it did before. Discontinued features should always fail outright.

## Deprecations and versioning

The deprecations policy remains the same if versioning is implemented within an API. For example, if an endpoint or operation moves from v1 to v2, then v1 will be a deprecated feature and subject to the normal policy and process.

## Questions and feedback

If you have any questions that are not answered by this policy, or you think that a change is needed to this policy, you require further information, or have any other reason as an API user to communicate about this policy, please as always just get in touch through any available channels, including email to [partnersuccess@mews.com](mailto:partnersuccess@mews.com). 
