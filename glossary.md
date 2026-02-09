# Mews Glossary for Open API users

This file mirrors the [Mews Glossary for Open API users](https://help.mews.com/s/article/Mews-Glossary-for-Open-API-users?language=en_US).

---

# A

## Access Token

An Access Token is a unique security token for a given [Property](#property) integration, which you need in order to access that property's data through the [Mews Connector API](#connector-api).

The token encodes the permissions granted to that [Integration](#integration). Integration partners are sent the Access Token by Mews when authorized by the property; alternatively the property can obtain the Access Token directly through Mews Operations, see [Find an integration access token](https://help.mews.com/s/article/find-an-integration-s-access-token?language=en_US).

Note that in cases where there is more than one instance of the same [Integration](#integration) in one [Property](#property), each instance has a separate Access Token.

In the Connector API, most API endpoints require Access Token, [Client Token](#client-token) and [Client](#client) fields to be included in the request data in order to authenticate the Client and to authorize access to the requested data and services.

In the Channel Manager API, on the Mews side, most API endpoints instead require [Connection Token](#connection-token) and [Client Token](#client-token) to perform a similar role.

Access Tokens normally allow access to a single [Property](#property) or [Enterprise](#enterprise), however some tokens may be [Portfolio Access Tokens](#portfolio-access-token), which allow access to all the properties within a [Portfolio](#portfolio).

## Accommodation

Accommodation is synonymous with "[Stay](#stay)" and refers to room‑stay based services offered by a Property.

These are the main services that properties offer to their customers; in fact a default Stay service is created automatically by Mews and cannot be deleted.

Accommodation services are [Bookable Services](#bookable-service), i.e., they can be reserved or booked prior to a [Customer](#customer)'s arrival.

## Account

Depending on context, Account could refer to a property account, user account or a financial account.

However, the most common meaning of Account is a [Customer](#customer) or [Company](#company).

The normal meaning of Account is a Customer or Company, i.e., it is a general term that covers both, and for which there is a single unique identifier or GUID.

A property account is a record containing the details of a [Property](#property), e.g., its name and address, see [Set up your property account](https://help.mews.com/s/article/set-up-your-property-account?language=en_US).

A user account is a record containing the details of a Property [Employee](#employee) and their access permissions, see [Setting up your account](https://help.mews.com/s/article/setting-up-your-account?language=en_US).

A financial account is a record of financial transactions, e.g., a [Paymaster](#paymaster) account or guest [Bill](#bill).

## Accounting Category

Accounting Categories are used to categorize [Accounting Items](#accounting-item) (both [Orders](#order) and [Payments](#payment)) and they are configured differently for each [Property](#property).

All Accounting Items belong to an Accounting Category.

Each Accounting Category has a name, a classification, and associated codes used for accounting purposes.

Accounting Category is specified for a [Service](#service) in the service settings, so when an [Order](#order) is made against a Service then it uses that Accounting Category.

## Additional Services

Additional Services are [Services](#service) that cannot be purchased when a [Reservation](#reservation) is made, unlike [Bookable Services](#bookable-service).

They are additional or extra to the main service, and can be purchased on‑site and added to a guest's [Bill](#bill). Examples include room service, airport transfer and spa services.

## Accounting Item

All [Order](#order) items and [Payment](#payment) items are types of Accounting Item.

Order items are consumed items; Payment items are payments or invoices.

## ARI

ARI is a general hospitality industry term and stands for [Availability](#availability), [Rates](#rate) and [Inventory](#inventory).

## Availability

Availability is the quantity of [Spaces](#space) of specified [Space Categories](#space-category) (or quantity of [Resources](#resource) of specified [Resource Categories](#resource-category)) that are open for sale during a specified time period.

## Availability Block

Availability Block is synonymous with Group Block; it implies a block of [Inventory](#inventory) set aside for group sales, e.g., a block of guest rooms set aside for a wedding, or a block of rooms set aside for a tour operator.

Normally these are a group of similar [Spaces](#space) belonging to the same [Space Category](#space-category) and subject to the same [Rate](#rate).

Availability Blocks are different than [Resource Blocks](#resource-block), which are groups of Spaces taken out of Inventory because they are out‑of‑service or being used for other purposes.

---

# B

## Bill

A Bill is a financial account for a [Customer](#customer) or [Company](#company), synonymous with "folio".

It can contain a mix of [Order](#order) items and [Payment](#payment) items.

A Bill can be "open", i.e., you can modify it, or "closed", i.e., closed to further changes.

A closed Bill is assumed to be balanced, i.e., sums to zero, and "settled" by the Customer or Company.

Note that a [Customer](#customer) Bill is linked to the Customer [Profile](#profile), not to the [Reservation](#reservation).

However, using the API you can still identify the [Reservations](#reservation), Bills and [Services](#service) that an [Accounting Item](#accounting-item) is linked to.

For more information, search “Bill” in [Mews Help](https://help.mews.com/s/?language=en_US).

## Bookable Service

Bookable Services are the main [Services](#service) in a [Property](#property) that your guests can book or reserve, such as the default [Stay](#stay) Service.

They are displayed on the system timeline and don't depend on any other Service for their purchase, as opposed to [Additional Services](#additional-services). See "Set up a bookable service".

## Booker

A Booker is a [Customer](#customer) who makes a [Reservation](#reservation) for another Customer.

They are not the main Customer linked to the Reservation, who is referred to as the Reservation [Owner](#owner).

## Booking

This term is synonymous with [Reservation](#reservation).

## Booking Engine

Booking Engine implies the part of a booking website or app through which users can make bookings in customer properties.

The Mews Booking Engine is part of the Mews product portfolio.

## Booking Engine API

The Mews Booking Engine API is one of the main APIs within the [Mews Open API](#open-api).

It can be used by custom Booking Engines to enable users to check availability and make reservations directly in Mews.

## Business Segment

Business Segments, Channel Manager Segments, or just Segments, are used to classify [Reservations](#reservation) by attributes relevant to a [Property](#property)'s operations, such as traveler type or whether the Reservation is group or individual.

They allow the Property to gather information from reports to identify trends and to target customers more effectively. See “Create, modify or delete a segment”.

---

# C

## Cashier

A Cashier is a role for handling payments.

Multiple cashiers can be configured for a [Property](#property), and [Employees](#employee) allocated against them.

Each cashier has a specified currency that they work in. See “Create or delete a cashier”.

## Chain

A Chain is a group of multiple [Properties](#property) or [Enterprises](#enterprise) under the same management.

In the context of the Mews system, Chains are used to define legal relationships between Enterprises, and for sharing certain data which is common across the Chain.

Note that Chains are separate to [Portfolios](#portfolio) used for [Multi‑property](#multi-property) working as part of Mews Multi‑Property.

## Channel

Channel is shorthand for the sales channel through which [Bookings](#booking) are made, e.g., direct from the [Property](#property) website, from a Central Reservation System (CRS), from a Global Distribution System (GDS) or from an Online Travel Agent (OTA).

## Channel Manager

A Channel Manager is a hub for managing the various sales [Channels](#channel) that a [Property](#property) may be connected to.

Typically a Property would connect its Mews Property Management System (Mews Operations) to a Channel Manager and the Channel Manager would in turn connect to the various Channels.

SiteMinder is a well‑known example of a Channel Manager.

Mews Operations passes ARI data ([Availability](#availability), [Rates](#rate) and [Inventory](#inventory)) to the Channel Manager, which distributes them to the connected Channels, and Mews Operations receives [Reservations](#reservation) from the Channel Manager.

The part of the [Mews Open API](#open-api) that supports this two‑way functionality is called the [Channel Manager API](#channel-manager-api).

Typically, this is connected via an [Integration](#integration) to a Channel Manager, however the same API may also be used to connect other sales channels.

From the API's point of view, they all have the same functionality, sending outgoing updates of ARI data (Availability, Rates and Inventory) and receiving incoming Reservations.

## Channel Manager API

The Mews Channel Manager API is one of the main APIs within the [Mews Open API](#open-api).

It is used by Channel Managers and other distribution channels to fetch availability, rates and inventory, and make reservations.

## Channel Manager ID

This is another name for the [Connection Token](#connection-token) used in the Channel Manager API, because each Connection Token identifies a unique [Channel Manager](#channel-manager) [Connection](#connection) (or any other client application connection).

## Channel Manager Segment

See [Business Segment](#business-segment).

## Charge Rule

Charge Rule is the particular method of calculation that the system uses for deriving a [Product](#product) charge or price, e.g., "per person per night" implies that the charge is the individual nightly rate multiplied by the number of people and the number of nights.

## Check‑in

Check‑in is the process of registering a [Customer](#customer)'s arrival at a [Property](#property) at the beginning of their stay, although this may be performed in advance of their physical arrival on site, using an online check‑in process.

The [Mews Open API](#open-api) may describe this process as "start reservation", implying the start of the reserved period of stay.

## Check‑out

Check‑out is the process of registering a [Customer](#customer)'s departure from a [Property](#property) at the end of their [Stay](#stay).

The [Mews Open API](#open-api) may describe this process as "process reservation", implying that the [Bill](#bill) has been settled and therefore it can be processed and closed.

## Client

The meaning of Client depends on context, but it generally refers to the client application or partner application which is accessing the API and consuming API data and services — thus it is a client of the API.

For example, the [Client Token](#client-token) is the security token used to uniquely identify the client application.

## Client Token

A Client Token is a security token you use to authenticate your application when accessing the API.

As such, you should keep this token secure and never share it.

You will be provided with the Client Token by Mews during the partner on‑boarding process.

Client Tokens are used across the Mews APIs, however there may be differences in detail between individual APIs so please consult the API documentation for the particular API you are using.

In the Connector API, most API endpoints require [Access Token](#access-token), Client Token and [Client](#client) fields in the request data in order to authenticate the Client and to authorize access to the requested data and services.

In the Channel Manager API, on the Mews side, most API endpoints similarly require [Connection Token](#connection-token) and Client Token.

In the Channel Manager API, on the Channel Manager side, a Client Token is still required, but in this case the client application is the Mews application.

Note that you need a different Client Token to connect to different Mews environments, i.e., one token for the Production environment and a separate token for the Demo environment.

## Command

A Command is a command or instruction that the system sends to a physical [Device](#device) such as an on‑premise printer or on‑premise key cutter.

## Companion

A Companion is a [Customer](#customer) or [Guest](#guest) linked to a [Reservation](#reservation) who is not the primary Customer or [Owner](#owner), but an additional Guest.

## Company

Company is a corporate entity linked to a booking or [Reservation](#reservation), for example in the case of a corporate travel booking.

Company records which store details about each company are called Company [Profiles](#profile). Companies can be automatically attached to incoming Reservations using Channel Manager Mapping Tables.

[Travel Agencies](#travel-agency) are a special type of Company and within the API they may be considered as separate entities.

## Complimentary Product Item

A Complimentary Product Item is a zero cost [Product Item](#product-item). The system considers these as "inactive" and therefore they do not appear in the Accounting Report nor on the Customer Account under Customer profile &gt; Billing.

If it is a [Stay Product](#stay-product), then it appears against Reservation module &gt; Items.

If it is a [Service Product](#service-product), it appears against Customer profile &gt; Dashboard &gt; Orders.

## Connection

A Connection represents a single interface instance between a given [Channel Manager](#channel-manager) or other client application and the Channel Manager API (Mews side).

The concept of a Connection is unique to the Channel Manager API.

Each Connection has an associated [Connection Token](#connection-token), which you need to access API data and services via that connection.

## Connection Token

A Connection Token is a unique security token for a given [Connection](#connection) that a [Channel Manager](#channel-manager) or other client application makes to the Mews side of the Channel Manager API.

You need this in order to access a Property's data through the API.

A single client application can make one or more Connections, with each one having a unique Connection Token.

As an integration partner, you are sent the Connection Token by Mews when authorized by the [Property](#property), alternatively the Property can obtain the Connection Token through Mews Operations, see for example the [Channel manager onboarding guide](https://help.mews.com/s/article/channel-manager-onboarding-guide?language=en_US) and [How to switch from one channel manager to another](https://help.mews.com/s/article/how-to-switch-from-one-channel-manager-to-another?language=en_US).

You only use the Connection Token when working with the Mews Channel Manager API; the [Access Token](#access-token) serves a similar function when working with the Connector API.

If your application supports the `getProperties` API operation in the Channel Manager API, this can be used to recover the Connection Tokens for all Connections the Property supports for this Client application. In this case, an [Employee](#employee) email address is used as an authorization token.

## Connector API

The Mews Connector API is one of the main APIs within the [Mews Open API](#open-api).

This should not be confused with Mews Connector, which is a separate system with a similar name.

The Connector API is a general‑purpose API that gives access to data and services in Mews Operations and supports numerous use cases.

## Counter

A Counter is a literal numerical count of something useful such as the number of [Bills](#bill) closed, maintained in real time.

## Customer

The normal meaning of Customer within the [Mews Open API](#open-api) is the end‑customer or consumer of the services that the hospitality [Enterprise](#enterprise) provides, typically a hotel [Guest](#guest).

If you substitute the word "guest", you won't go far wrong.

The details about a Customer are stored in their [Profile](#profile). Note that Customer Profiles can exist independently of a Reservation.

---

# D

## Department

Department is an administrative or functional division of a [Property](#property), e.g., Housekeeping or Front of House.

An [Employee](#employee) may be assigned to a Department, and [Tasks](#task) may be assigned to Employees or Departments.

## Deposit

A Deposit is a sum payed as a first instalment, e.g., against a [Reservation](#reservation), with the intention to pay the balance at a later date, e.g., on [Check‑out](#check-out).

## Device

The term Device refers to a physical hardware device or system that Mews connects to, such as an on‑premise printer or an on‑premise key cutter / key encoder.

## Distributor

Distributor is the old name for the Mews Booking Engine.

As such, there may be references to Distributor in the Booking Engine Guide, especially in URLs, function names and the like.

For Distributor, read Mews Booking Engine.

---

# E

## Editable History Interval

Editable History Interval (EHI) is the shorter of the two Editable History Windows (EHW) used in Mews Operations.

For a full explanation of these terms and how to interpret them, see [Editable History Window](#editable-history-window).

## Editable History Window

Editable History Window (EHW) refers to the historical time window within which amendments are permitted to certain data before they are considered fully closed to editing.

It is expressed as a period of time, e.g., 2 days — this means that once the data is 2 days old it can no longer be changed and is considered a frozen historical record.

There are in fact two EHWs and they are separate configuration parameters in Mews Operations: one is the Operational EHW (concerned with [Reservations](#reservation)) and the other is the Accounting EHW (concerned with accounting data).

For example, changes are permitted to [Bills](#bill) and invoices after they are closed, for a period of time equal to the Accounting Editable History Window. After that time has elapsed, Bills and invoices can no longer be edited.

The same applies to historical Reservations data, which cannot be edited after the Operational Editable History Window time period has elapsed.

If you try to post an [Accounting Item](#accounting-item) or Outlet item with a "consumption time" that falls outside of the permitted editable time period, you will not be permitted to do so and will receive an appropriate error response.

In the Mews Connector API, the `Get configuration` operation returns Editable History Interval, which is the shorter of the two Editable History Windows. Any operation that you perform through the API on historical data will therefore be valid if it lies within this interval period, regardless of whether it is related to accounting data or reservation data.

For more information:

- Set up your Editable History Windows
- How to extend the Operational &amp; Accounting editable history window
- The accounting configuration in Mews — an overview of the settings

## Employee

A member of staff at a [Property](#property) or [Enterprise](#enterprise).

They may also be referred to as a [User](#user) of the Mews system, depending on context.

## Enterprise

The term Enterprise implies a single Mews customer, either an individual [Property](#property) such as a hotel or hostel, or some other type of Mews customer which consists of multiple physical properties, such as a campus.

## Extra

Additional [Products](#product) bundled with a [Reservation](#reservation) may be described as Extras.

---

# F

_(Reserved for future terms.)_

---

# G

## Group

The term Group will rarely be used on its own except in a specific context, since the term Group could refer to a group of [Properties](#property) (normally a [Chain](#chain) or [Enterprise](#enterprise)), a [Reservation Group](#reservation-group), a [Group Block](#group-block), or a [Rate Group](#rate-group).

## Group Block

See [Availability Blocks](#availability-block).

## Guest

See [Customer](#customer).

The term Guest is used in some parts of the [Mews Open API](#open-api), but it should be read as the more general term Customer.

---

# H

## Hotel

See [Property](#property).

The term Hotel is used in some parts of the [Mews Open API](#open-api), but it should be read as the more general term Property.

---

# I

## Integration

When a [Property](#property) or [Enterprise](#enterprise) in Mews makes a connection with a partner system, this connection is called an Integration.

A Property or Enterprise can have more than one instance of an Integration with a given partner system, but normally it would only have one.

## Inventory

The number of [Spaces](#space) (e.g. guest rooms) available for sale, distributed across sales [Channels](#channel).

## Item

Item could be a [Product Item](#product-item), [Order](#order) Item, [Payment](#payment) Item or [Accounting Item](#accounting-item).

---

# J

_(Reserved for future terms.)_

---

# K

_(Reserved for future terms.)_

---

# L

## Length of Stay

The period of a [Customer](#customer)'s stay‑over, expressed usually in number of nights.

---

# M

## Mapping Table

Mapping Tables are used to map relationships between [Space Categories](#space-category), [Rates](#rate), [Products](#product) and [Companies](#company), using abbreviated codes for the respective entities.

For example, in the Channel Manager API, "product mappings" map [Rate Plan](#rate-plan) codes such as "NR" to Product codes such as "AUR".

## Marketplace

Marketplace is the app store for Mews integration partners that Mews customers are able to see within their Mews account and from where they can purchase compatible products and services.

Learn [how to connect and disconnect integrations available in the Mews Marketplace](https://help.mews.com/s/article/connect-and-disconnect-integrations?language=en_US&Language=en_US).

## Message

The meaning of the term Message may depend on context, but generally it refers to customer messages (i.e., guest messages) within Mews Operations.

The Mews [Connector API](#connector-api) permits API clients to integrate with the Mews customer messaging system and thus send and receive such messages.

## Message Thread

Message threads are conversations initiated by a customer (i.e., a guest), within the customer messaging system of Mews Operations.

A message thread consists of one or more [Messages](#message).

## Multi‑property

Mews Multi‑Property is an optional module of Mews Operations that supports above‑property level functionality, such as central management of users, rates and vouchers, across a [Portfolio](#portfolio) of multiple [Properties](#property).

This functionality is reflected in the [Mews Connector API](#connector-api) through the use of [Portfolio Access Tokens](#portfolio-access-token).

---

# N

_(Reserved for future terms.)_

---

# O

## Open API

The Mews Open API refers to the family of APIs provided by Mews to partners and customers for them to connect and access data and services in Mews.

Currently it consists of three separate APIs: Mews Connector API, Mews Channel Manager API, and Mews Booking Engine API.

The Mews Open API should not be confused with the term OpenAPI (without the space).

## OpenAPI

OpenAPI is a public standard for defining Web APIs.

OpenAPI definitions may be available for some or all of the Mews Open API — see the current API documentation for details.

The OpenAPI specification was formerly known as Swagger and may still be referred to by that name.

## Order

[Accounting Items](#accounting-item) are split into Order items (consumed items, such as night stays or products) and [Payment](#payment) items (such as cash, credit card payments or invoices).

Thus an Order is a consumed [Service](#service) or [Product](#product) item.

## Outlet

An Outlet is a retail outlet or retail location in a [Property](#property), such as a bar, restaurant or spa centre.

Outlets are used to record revenue and payments that occur external to the Mews system.

While consumed items that are to be settled later by a guest or corporate account are posted to their respective [Customer](#customer) [Profiles](#profile) in Mews, items that have been consumed **and** paid for should be posted to Outlets.

You can read more about [how properties use Outlets](https://help.mews.com/s/article/set-up-outlets?language=en_US) and how the figures appear on the [Mews Accounting Report](https://help.mews.com/s/article/accounting-report?language=en_US).

## Owner

The Owner of a [Reservation](#reservation) is the primary [Customer](#customer) linked to the Reservation, i.e., the primary [Guest](#guest).

Additional Guests are known as [Companions](#companion).

---

# P

## Package

Package implies a bundle of [Services](#service) and service‑related [Products](#product), e.g., if a room‑stay is booked together with a spa treatment, or a room‑stay with breakfast.

Product rules can be used to create packages where Products are automatically added to a [Reservation](#reservation) when it is made. See [Package products with accommodation](https://help.mews.com/s/article/package-products-with-accommodation?language=en_US).

## Paymaster

A Paymaster account is a type of financial account used to compile charges into a single [Bill](#bill) and issue a single invoice.

This could be used for issuing a Bill to a non‑resident customer who doesn't have a [Profile](#profile) on the system (also known as a Lobby Bar Paymaster), or to a [Travel Agent](#travel-agency) or other [Company](#company) which wants to receive a regular invoice for all their bookings with multiple Customers (also known as a City Ledger Paymaster).

## Payment

[Accounting Items](#accounting-item) are split into [Order](#order) items (consumed items, such as night stays or products) and Payment items (such as cash, credit card payments or invoices).

Thus a Payment is a financial payment on an account.

## Payment Card

A Payment Card is a payment device in the form of a physical card or its electronic equivalent issued by a financial institution and which enables its owner to authorize payments from the owner's financial account.

A Payment Card is associated with a [Customer](#customer) or [Company](#company). Multiple Payment Cards can be linked to a [Profile](#profile), see "Adding a new payment card".

## Portfolio

A Portfolio is a collection of [Properties](#property) or [Enterprises](#enterprise) that form part of a single group, for the purposes of centralised management of that group when using Mews Multi‑Property.

See also [Multi‑property](#multi-property).

## Portfolio Access Token

Portfolio Access Tokens are special types of [Access Token](#access-token) that grant access to all [Properties](#property) or [Enterprises](#enterprise) within a [Portfolio](#portfolio), rather than just a single Property or Enterprise.

These are used to facilitate [Multi‑property](#multi-property) functionality through the Mews Open API.

API operations that support Portfolio Access Tokens may work across all Enterprises within scope of the token, or you may specify which individual Enterprise from within the Portfolio you wish the operation to work with.

## Preauthorization

Preauthorization or pre‑authorization (often abbreviated "pre‑auth") is a [Payment Card](#payment-card) provider service which puts a time‑limited hold on an amount authorized by the card owner, reducing the available funds, until the transaction is "cleared" or "settled" or cancelled.

You might use this for instance when a [Reservation](#reservation) is made to ensure that the account holder has sufficient funds to settle the [Bill](#bill), as the service fails if insufficient funds are available.

A Preauthorization does not take the funds immediately but puts a temporary hold on them. The length of time for the hold can vary.

## Price

Price is the amount of money expected in exchange for goods and services; its use depends on context but usually in the [Mews Open API](#open-api) it refers to the price of a [Reservation](#reservation).

The system calculates this from the nightly rate and the number of nights of the [Stay](#stay).

## Product

A Product is a purchasable item linked to a [Service](#service).

Although all Products are associated with Services, those linked to [Stay](#stay) Services are sometimes called [Stay Products](#stay-product) (or Reservation Products) and those linked to other Services are sometimes called [Service Products](#service-product).

Products can be items that can be purchased in their own right, or they can be "relative products", meaning that they are defined relative to another product, e.g., a discounted version of the original product is a relative product which can have a price expressed as a percentage.

Additional Products bundled with a [Reservation](#reservation) may also be described as [Extras](#extra).

## Product Item

Product Item is an instance of a [Product](#product) added to a [Customer](#customer)'s [Bill](#bill).

## Product Rule

Product Rules are the rules that Mews uses for automatically creating [Packages](#package), i.e., they are a set of rules that automatically add or remove [Products](#product) from a [Reservation](#reservation) when it is made.

See Packages. You configure Product Rules as part of setting up Rates.

## Product Service Order

Product Service Order is the name given to an [Order](#order) made against an [Additional Service](#additional-services) (e.g., breakfast or minibar), as opposed to a [Reservation](#reservation).

Some care is needed here, as this is strictly an Additional Service Order and not to be confused with Products.

## Profile

In its general sense, a Profile is a "record of details" about some entity, such as a [Customer](#customer), stored on the system as a data record.

Typically, the term Profile implies the encapsulated details about a Customer (a Customer Profile or Guest Profile) or a Company (a Company Profile).

In some cases, the term may refer to the encapsulated details about a [User](#user) on the Mews system (a User Profile).

Sometimes the term is used explicitly, but sometimes the term Customer, Company or User, when used on their own, implies a Profile.

## Property

Property is a general hospitality industry term to refer to a single hotel, hostel, resort, apartment building, cruise ship or other similar entity providing lodgings and hospitality.

Thus a Property is an individual hospitality business that is a user and customer of Mews.

---

# Q

_(Reserved for future terms.)_

---

# R

## Rate

Rate is the term used to describe the price per night for a [Stay](#stay).

It depends on a number of factors, including the type of [Space](#space) and the date.

Sometimes a Rate is a relative rate based on a “base rate”.

## Rate Group

A Rate Group is a grouping of [Rates](#rate) that all share the same cancellation policies.

For example, all “flexible rates” would be one Rate Group, all “non‑refundable rates” would be another Rate Group, and all “corporate rates” would be another Rate Group.

## Rate Plan

Rate Plan is synonymous with [Rate](#rate).

## Reservation

Reservation has the normal hospitality meaning, i.e., a contract between a [Property](#property) and a named [Customer](#customer) or agent to set aside a category of [Space](#space) and/or provide some hospitality [Service](#service) for a specified period of time, such as a guest bedroom for a specific date and duration (in this case a [Stay](#stay) Reservation).

The contract would also contain a [Price](#price) and terms and conditions such as a cancellation policy.

## Reservation Group

A Reservation Group is a collection of associated [Reservations](#reservation).

They are collected together and given a group name for easy reference.

A group would include all Reservations for a wedding party or corporate event, for example.

## Resource

A Resource is something that can be sold, reserved or used.

This could be an object or even the services of a person, but normally in our context it refers to a physical accommodation‑based resource such as a hotel room, for which we use the general term [Space](#space). In simple terms, a hotel room is a type of Space, and a Space is a type of Resource.

The [Mews SpaceTime project](https://developers.mews.com/project-spacetime/) has broadened the scope of reservable entities from [Rooms](#Room) to Spaces to Resources, and this remains an on‑going project.

As a result, within the [Mews Open API](#open-api) you may see references to Resources and corresponding [Resource Categories](#resource-category), but you may also see references to Spaces and corresponding [Space Categories](#space-category). In most cases you will probably find that they correspond to the same thing, i.e., hotel rooms.

## Resource Access Token

A Resource Access Token is a general term for a time‑limited security token granting access to a specified resource.

In practice within Mews this means a PIN code or RFID tag which may be in the form of a physical card, tag, wristband or digital equivalent used to access services, doors or similar within a [Property](#property).

Note a Resource Access Token is completely separate from and unrelated to the [Access Token](#access-token) used by [Client](#client) applications to access the [Mews Open API](#open-api); and the word “resource” is used in the broadest sense and does not necessarily imply a [Space](#space).

## Resource Block

Resource Blocks are groups of [Resources](#resource) or [Spaces](#space) that you take out of [Inventory](#inventory) because they are temporarily out‑of‑service or being used for other purposes.

Do not confuse Resource Blocks with [Availability Blocks](#availability-block), which are groups of Spaces taken out of Inventory because they are set aside for group sales.

## Resource Category

This is the category to which a [Resource](#resource) belongs, analogous to [Space Category](#space-category) but at a higher level of abstraction.

For the difference between these concepts, see Resource and Space.

## Restriction

Restrictions are specified limitations on [Space](#space) [Availability](#availability), for example the restriction that a [Space Category](#space-category) is only available if booked for a minimum [Length of Stay](#length-of-stay) (LOS) or the restriction that a Space Category is “closed to arrival”.

## Room

The term Room implies a hotel room or a function room, however the term is rarely used within the [Mews Open API](#open-api); instead the more general term [Space](#space) is used, or in some cases the even more general term [Resource](#resource).

A room such as a guest bedroom or suite is a type of Space, but a Space may also be a car parking bay or a function room.

## Rule

The meaning of Rule depends on context, but may be a [Product Rule](#product-rule) or a [Charge Rule](#charge-rule).

---

# S

## Segment

See [Business Segment](#business-segment).

## Service

A Service is any type of saleable hospitality service provided by a [Property](#property), including an accommodation service or room‑stay.

The definition is quite broad, and could include a taxi service, room service or minibar service.

All items that can be consumed by a [Customer](#customer) are made against a Service. These can be [Bookable Services](#BookableService) or [Additional Services](#AdditionalServices).

Bookable Services are ones that can be purchased when a [Reservation](#reservation) is made.

Additional Services cannot be purchased when a Reservation is made, but can be purchased on‑site and manually added to a Customer Bill.

The default Bookable Service is the [Stay](#stay) Service, which Mews creates automatically and which cannot be deleted, so every Property has a Stay Service.

Services can have a service fee, and can also have associated [Products](#product). All Products are linked to Services. Some Products are bundled with a Service when the Reservation is made, according to configured [Product Rules](#product-rule); this is called a [Package](#package).

You can read more about the relationship between services and products in [Understanding services](https://help.mews.com/s/article/understanding-services?language=en_US).

## Service Order

A Service Order is an [Order](#order) made against a [Service](#service).

An Order made against a [Bookable Service](#bookable-service) is known as a [Reservation](#reservation). Thus a Reservation is a type of Service Order.

When we think of Reservation, we normally think of a [Stay](#stay) Reservation (i.e., booking one's stay at a property). This is simply an Order made against the default Stay Service.

But a Reservation in the broadest sense could be an Order made against any Bookable Service, e.g., car parking or a tennis court.

An Order made against an [Additional Service](#additional-services) (e.g., breakfast or minibar) is known as a [Product Service Order](#product-service-order). Some care is needed here, as this is strictly an Additional Service Order and not to be confused with Products.

In summary, a Service Order is one of two types, either a [Reservation](#reservation) (an Order against a [Bookable Service](#bookable-service)) or a [Product Service Order](#product-service-order) (an Order against an [Additional Service](#additional-services)).

## Service Product

A [Product](#product) is a purchasable item linked to a [Service](#service).

Although all Products are associated with Services, those linked to [Stay](#stay) Services are sometimes called [Stay Products](#stay-product) (or Reservation Products) and those linked to other Services are sometimes called Service Products.

Thus Service Products are Products which can be booked against a [Customer](#customer) [Profile](#profile) without being linked to a [Reservation](#reservation).

## Space

A Space is a bookable, location‑based [Resource](#resource) such as a bed, guest room, dormitory, apartment, function room, tennis court or car parking bay which can be sold on the basis of a [Reservation](#reservation) for a specified date/time and duration.

It is used in preference to the more restricted definition of “room”.

In practice, most spaces are accommodation‑based resources such as beds, guest rooms and dormitories, booked on a nightly stay basis, and some parts of the [Mews Open API](#open-api) and some partner [Integrations](#integration) may make that assumption.

For more information about the Mews vision for space resources, see the [Mews Devs blog post about Project Spacetime](https://developers.mews.com/project-spacetime/).

## Space Category

Space Category is the named category of [Space](#space) which Mews uses when calculating [Availability](#availability) and when distributing ARI (Availability, [Rates](#rate) and [Inventory](#inventory)) to sales [Channels](#channel).

For example, a hotel might have a Space Category of “double room”, “twin room” or “single room”.

Space Category is different than [Space Type](#space-type), which is one of the parameters used within Mews Operations to define a Space Category.

Space Type defines what the type of Space is, e.g., room, dorm, car parking bay.

Confusion can arise because in traditional systems Space Category is equivalent to “room type”; this has led to it naturally being referred to as “space type”, in fact within the Channel Manager API, `SpaceTypeCode` is used in this way in Inventory mappings. `SpaceTypeCode` actually refers to a Space Category, despite the name.

Furthermore, to avoid confusion between the terms “category” and “type” within the Channel Manager API, actual [Space Types](#space-type) (as defined in this Glossary) are referred to instead as “space classifications”.

In summary:

- Within the Channel Manager API, the terms “space category”, “space type” and “space type code” all refer to Space Category.
- Within the Channel Manager API, the term “space classification” refers to [Space Type](#space-type).

## Space Classification

Space Classification defines what the type of [Space](#space) is, e.g., room, dorm, car parking bay.

The term is used in the Channel Manager API and is synonymous with [Space Type](#space-type) within Mews Operations.

The Channel Manager API avoids using the term “space type” so as not to confuse it with Space Category.

## Space Type

Space Type defines what the type of [Space](#space) is, e.g., room, dorm, car parking
