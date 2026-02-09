# Glossary

This file mirrors the [Mews Glossary for Open API users](https://help.mews.com/s/article/Mews-Glossary-for-Open-API-users?language=en_US).

---

This glossary lists the terms used within the **Mews Open API** and explains their meaning. The terms are presented in alphabetical order.

# A <a href="#A_section" id="A_section"></a>

## Access Token <a href="#AccessToken" id="AccessToken"></a>

An Access Token is a unique security token for a given [Property] integration, which you need in order to access that property's data through the [Mews Connector API][Connector API]. The token encodes the permissions granted to that [Integration]. Integration partners are sent the Access Token by Mews when authorized by the property, alternatively the property can obtain the Access Token directly through Mews Operations, see [Find an integration access token](https://help.mews.com/s/article/find-an-integration-s-access-token?language=en_US). Note that in cases where there is more than one instance of the same [Integration] in one [Property], each instance has a separate Access Token.

In the Connector API, most API endpoints require Access Token, [Client Token] and [Client] fields to be included in the request data in order to authenticate the [Client] and to authorize access to the requested data and services. In the Channel Manager API, on the Mews side, most API endpoints instead require [Connection Token] and [Client Token] to perform a similar role.

Access Tokens normally allow access to a single [Property] or [Enterprise], however some tokens may be [Portfolio Access Tokens][Portfolio Access Token], which allow access to all the properties within a [Portfolio].

## Accommodation <a href="#Accommodation" id="Accommodation"></a>

Accommodation is synonymous with '[Stay]' and refers to room-stay based services offered by a Property. These are the main services that properties offer to their customers, in fact a default [Stay] service is created automatically by Mews and cannot be deleted. Accommodation services are [Bookable Services][Bookable Service], i.e. they can be reserved or booked prior to a [Customer]'s arrival.

## Account <a href="#Account" id="Account"></a>

Depending on context, Account could refer to a property account, user account or a financial account. However, the most common meaning of Account is a [Customer] or [Company].

- The normal meaning of Account is a [Customer] or [Company], i.e. it is a general term that covers both, and for which there is a single unique identifier or GUID.
- A property account is a record containing the details of a [Property], e.g. its name and address, see [Set up your property account](https://help.mews.com/s/article/set-up-your-property-account?language=en_US).
- A user account is a record containing the details of a [Property] [Employee] and their access permissions, see [Setting up your account](https://help.mews.com/s/article/setting-up-your-account?language=en_US).
- A financial account is a record of financial transactions, e.g. a [Paymaster] account or guest [Bill].

## Accounting Category <a href="#AccountingCategory" id="AccountingCategory"></a>

Accounting Categories are used to categorize [Accounting Items][Accounting Item] (both [Orders][Order] and [Payments][Payment]) and they are configured differently for each [Property]. All [Accounting Items][Accounting Item] belong to an Accounting Category. Each Accounting Category has a name, a classification, and associated codes used for accounting purposes. Accounting Category is specified for a [Service] in the service settings, so when an [Order] is made against a [Service] then it uses that Accounting Category.

## Additional Services <a href="#AdditionalServices" id="AdditionalServices"></a>

Additional Services are [Services][Service] that cannot be purchased when a [Reservation] is made, unlike [Bookable Services][Bookable Service]. They are additional or extra to the main service, and can be purchased on-site and added to a guest's [Bill]. Examples include room service, airport transfer and spa services.

## Accounting Item <a href="#AccountingItem" id="AccountingItem"></a>

All [Order] items and [Payment] items are types of Accounting Item. [Order] items are consumed items, [Payment] items are payments or invoices.

## ARI <a href="#ARI" id="ARI"></a>

ARI is a general hospitality industry term and stands for [Availability], [Rates][Rate] and [Inventory].

## Availability <a href="#Availability" id="Availability"></a>

Availability is the quantity of [Spaces][Space] of specified [Space Categories][Space Category] (or quantity of [Resources][Resource] of specified [Resource Categories][Resource Category] ) that are open for sale during a specified time period.

## Availability Block <a href="#AvailabilityBlock" id="AvailabilityBlock"></a>

Availability Block is synonymous with Group Block, it implies a block of [Inventory] set aside for group sales, e.g. a block of guest rooms set aside for a wedding, or a block of rooms set aside for a tour operator. Normally these are a group of similar [Spaces][Space] belonging to the same [Space Category] and subject to the same [Rate].

Availability Blocks are different than [Resource Blocks][Resource Block], which are groups of [Spaces][Space] taken out of Inventory because they are out-of-service or being used for other purposes.

# B <a href="#B_section" id="B_section"></a>

## Bill <a href="#Bill" id="Bill"></a>

A Bill is a financial account for a [Customer] or [Company], synonymous with 'folio'. It can contain a mix of [Order] items and [Payment] items. A Bill can be 'open', i.e. you can modify it, or 'closed', i.e. closed to further changes. A closed Bill is assumed to be balanced, i.e. sums to zero, and 'settled' by the [Customer] or [Company].

Note that a [Customer] Bill is linked to the [Customer] [Profile], not to the [Reservation]. However, using the API you can still identify the [Reservations][Reservation], Bills and [Services][Service] that an [Accounting Item] is linked to.

For more information, search "Bill" in [Mews Help](https://help.mews.com/s/?language=en_US).

## Bookable Service <a href="#BookableService" id="BookableService"></a>

Bookable Services are the main [Services][Service] in a [Property] that your guests can book or reserve, such as the default [Stay] [Service]. They are displayed on the system timeline and don't depend on any other [Service] for their purchase, as opposed to [Additional Services]. See [Set up a bookable service](https://help.mews.com/s/article/set-up-a-bookable-service?language=en_US).

## Booker <a href="#Booker" id="Booker"></a>

A Booker is a [Customer] who makes a [Reservation] for another Customer. They are not the main Customer linked to the Reservation, who is referred to as the Reservation [Owner].

## Booking <a href="#Booking" id="Booking"></a>

This term is synonymous with [Reservation].

## Booking Engine <a href="#BookingEngine" id="BookingEngine"></a>

Booking Engine implies the part of a booking website or app through which users can make bookings in customer properties. The **Mews Booking Engine** is part of the Mews product portfolio.

## Booking Engine API <a href="#BookingEngineAPI" id="BookingEngineAPI"></a>

The **Mews Booking Engine API** is one of the main APIs within the [Mews Open API][Open API]. It can be used by custom Booking Engines to enable users to check availability and make reservations directly in Mews.

## Business Segment <a href="#BusinessSegment" id="BusinessSegment"></a>

Business Segments, Channel Manager Segments, or just Segments, are used to classify [Reservations][Reservation] by attributes relevant to a [Property]'s operations, such as traveler type or whether the [Reservation] is group or individual. They allow the [Property] to gather information from reports to identify trends and to target customers more effectively. See [Create, modify or delete a segment](https://help.mews.com/s/article/create-modify-or-delete-a-segment?language=en_US&Language=en_US).

# C <a href="#C_section" id="C_section"></a>

## Cashier <a href="#Cashier" id="Cashier"></a>

A Cashier is a role for handling payments. Multiple cashiers can be configured for a [Property], and [Employees][Employee] allocated against them. Each cashier has a specified currency that they work in. See [Create or delete a cashier](https://help.mews.com/s/article/create-or-delete-a-cashier?language=en_US).

## Chain <a href="#Chain" id="Chain"></a>

A Chain is a group of multiple [Properties][Property] or [Enterprises][Enterprise] under the same management. In the context of the Mews system, Chains are used to define legal relationships between [Enterprises][Enterprise], and for sharing certain data which is common across the Chain. Note that Chains are separate to [Portfolios][Portfolio] used for [Multi-property] working as part of **Mews Multi-Property**.

## Channel <a href="#Channel" id="Channel"></a>

Channel is shorthand for the sales channel through which [Bookings][Booking] are made, e.g. direct from the [Property] website, from a Central Reservation System (CRS), from a Global Distribution System (GDS) or from an Online Travel Agent (OTA).

## Channel Manager <a href="#ChannelManager" id="ChannelManager"></a>

A Channel Manager is a hub for managing the various sales [Channels][Channel] that a [Property] may be connected to. Typically a [Property] would connect its Mews Property Management System (Mews Operations) to a Channel Manager and the Channel Manager would in turn connect to the various Channels. SiteMinder is a well-known example of a Channel Manager.

Mews Operations passes ARI data ([Availability], [Rates][Rate] and [Inventory]) to the Channel Manager, which distributes them to the connected [Channels][Channel], and Mews Operations receives [Reservations][Reservation] from the Channel Manager.

The part of the [Mews Open API][Open API] that supports this two-way functionality is called the [Channel Manager API]. Typically, this is connected via an [Integration] to a Channel Manager, however the same API may also be used to connect other sales channels. From the API's point of view, they all have the same functionality, sending outgoing updates of ARI data ([Availability], [Rates][Rate] and [Inventory]) and receiving incoming [Reservations][Reservation].

## Channel Manager API <a href="#ChannelManagerAPI" id="ChannelManagerAPI"></a>

The **Mews Channel Manager API** is one of the main APIs within the [Mews Open API][Open API]. It is used by Channel Managers and other distribution channels to fetch availability, rates and inventory, and make reservations.

## Channel Manager ID <a href="#ChannelManagerID" id="ChannelManagerID"></a>

This is another name for the [Connection Token] used in the Channel Manager API, because each [Connection Token] identifies a unique [Channel Manager] [Connection] (or any other client application connection).

## Channel Manager Segment <a href="#ChannelManagerSegment" id="ChannelManagerSegment"></a>

See [Business Segment].

## Charge Rule <a href="#ChargeRule" id="ChargeRule"></a>

Charge Rule is the particular method of calculation that the system uses for deriving a [Product] charge or price, e.g. 'per person per night' implies that the charge is the individual nightly rate multiplied by the number of people and the the number of nights.

## Check-in <a href="#CheckIn" id="CheckIn"></a>

Check-in is the process of registering a [Customer]'s arrival at a [Property] at the beginning of their stay, although this may be performed in advance of their physical arrival on site, using an online check-in process. The [Mews Open API][Open API] may describe this process as 'start reservation', implying the start of the reserved period of stay.

## Check-out <a href="#CheckOut" id="CheckOut"></a>

Check-out is the process of registering a [Customer]'s departure from a [Property] at the end of their [Stay]. The [Mews Open API][Open API] may describe this process as 'process reservation', implying that the the [Bill] has been settled and therefore it can be processed and closed.

## Client <a href="#Client" id="Client"></a>

The meaning of Client depends on context, but it generally refers to the client application or partner application which is accessing the API and consuming API data and services - thus it is a client of the API. For example, the [Client Token] is the security token used to uniquely identify the client application.

## Client Token <a href="#ClientToken" id="ClientToken"></a>

A Client Token is a security token you use to authenticate your application when accessing the API. As such, you should keep this token secure and never share it. You will be provided with the Client Token by Mews during the partner on-boarding process.

Client Tokens are used across the Mews APIs, however there may be differences in detail between individual APIs so please consult the API documentation for the particular API you are using.

In the Connector API, most API endpoints require [Access Token], Client Token and [Client] fields in the request data in order to authenticate the [Client] and to authorize access to the requested data and services. In the Channel Manager API, on the Mews side, most API endpoints similarly require [Connection Token] and Client Token.

In the Channel Manager API, on the Channel Manager side, a Client Token is still required, but in this case the client application is the Mews application.

Note that you need a different Client Token to connect to different Mews environments, i.e. one token for the Production environment and a separate token for the Demo environment.

## Command <a href="#Command" id="Command"></a>

A Command is a command or instruction that the system sends to a physical [Device] such as an on-premise printer or on-premise key cutter.

## Companion <a href="#Companion" id="Companion"></a>

A Companion is a [Customer] or [Guest] linked to a [Reservation] who is not the primary Customer or [Owner], but an additional Guest.

## Company <a href="#Company" id="Company"></a>

Company is a corporate entity linked to a booking or [Reservation], for example in the case of a corporate travel booking. Company records which store details about each company are called Company [Profiles][Profile]. Companies can be automatically to incoming [Reservations][Reservation] using [Channel Manager] [Mapping Tables][Mapping Table].

[Travel Agencies][Travel Agency] are a special type of Company and within the API they may be considered as separate entities.

## Complimentary Product Item <a href="#ComplimentaryProductItem" id="ComplimentaryProductItem"></a>

A Complimentary Product Item is a zero cost [Product Item.][Product Item] The system considers these as 'inactive' and therefore they do not appear in the Accounting Report nor on the [Customer] Account under **Customer profile > Billing**. If it is a [Stay Product], then it appears against **Reservation module > Items**. If it is a [Service Product], it appears against **Customer profile > Dashboard > Orders**.

## Connection <a href="#Connection" id="Connection"></a>

A Connection represents a single interface instance between a given [Channel Manager] or other client application and the Channel Manager API (Mews side). The concept of a Connection is unique to the Channel Manager API. Each Connection has an associated [Connection Token], which you need to access API data and services via that connection.

## Connection Token <a href="#ConnectionToken" id="ConnectionToken"></a>

A Connection Token is a unique security token for a given [Connection] that a [Channel Manager] or other client application makes to the Mews side of the Channel Manager API. You need this in order to access a [Property]'s data through the API. A single client application can make one or more [Connections][Connection], with each one having a unique Connection Token.

As an integration partner, you are sent the Connection Token by Mews when authorized by the [Property], alternatively the [Property] can obtain the Connection Token through Mews Operations, see for example the [Channel manager onboarding guide](https://help.mews.com/s/article/channel-manager-onboarding-guide?language=en_US) and [How to switch from one channel manager to another](https://help.mews.com/s/article/how-to-switch-from-one-channel-manager-to-another?language=en_US).

You only use the Connection Token when working with the Mews Channel Manager API, the [Access Token] serves a similar function when working with the Connector API.

If your application supports the [getProperties](https://mews-systems.gitbook.io/channel-manager-api/mews-api#get-properties) API operation, this can be used to recover the Connection Tokens for all [Connections][Connection] the [Property] supports for this [Client] application. In this case, an [Employee] email address is used as an authorization token.

## Connector API <a href="#ConnectorAPI" id="ConnectorAPI"></a>

The **Mews Connector API** is one of the main APIs within the [Mews Open API][Open API]. This should not be confused with Mews Connector, which is a separate system with a similar name. The Connector API is a general-purpose API that gives access to data and services in **Mews Operations** and supports numerous use cases.

## Counter <a href="#Counter" id="Counter"></a>

A Counter is a literal numerical count of something useful such as the number of [Bills][Bill] closed, maintained in real time.

## Customer <a href="#Customer" id="Customer"></a>

The normal meaning of Customer within the [Mews Open API][Open API] is the end-customer or consumer of the services that the hospitality [Enterprise] provides, typically a hotel [Guest]. If you substitute the word 'guest', you won't go far wrong. The details about a Customer are stored in their [Profile]. Note that Customer Profiles can exist independently of a [Reservation].

# D <a href="#D_section" id="D_section"></a>

## Department <a href="#Department" id="Department"></a>

Department is an administrative or functional division of a [Property], e.g. Housekeeping or Front of House. An [Employee] may be assigned to a Department, and [Tasks][Task] may be assigned to [Employees][Employee] or Departments.

## Deposit <a href="#Deposit" id="Deposit"></a>

A Deposit is a sum payed as a first instalment, e.g. against a [Reservation], with the intention to pay the balance at a later date, e.g. on [Check-out].

## Device <a href="#Device" id="Device"></a>

The term Device refers to a physical hardware device or system that Mews connects to, such as an on-premise printer or an on-premise key cutter / key encoder.

## Distributor <a href="#Distributor" id="Distributor"></a>

Distributor is the old name for the Mews Booking Engine. As such, there may be references to Distributor in the Booking Engine Guide, especially in URLs, function names and the like. For Distributor, read Mews Booking Engine.

# E <a href="#E_section" id="E_section"></a>

## Editable History Interval <a href="#EditableHistoryInterval" id="EditableHistoryInterval"></a>

Editable History Interval (EHI) is the shorter of the two Editable History Windows (EHW) used in Mews Operations. For a full explanation of these terms and how to interpret them, see [Editable History Window].

## Editable History Window <a href="#EditableHistoryWindow" id="EditableHistoryWindow"></a>

Editable History Window (EHW) refers to the historical time window within which amendments are permitted to certain data before they are considered fully closed to editing. It is expressed as a period of time, e.g. 2 days, this means that once the data is 2 days old it can no longer be changed and is considered a frozen historical record.

There are in fact two EHWs and they are separate configuration parameters in Mews Operations: one is the **Operational EHW** (concerned with [Reservations][Reservation]) and the other is the **Accounting EHW** (concerned with accounting data).

For example, changes are permitted to [Bills][Bill] and invoices after they are closed, for a period of time equal to the Accounting Editable History Window. After that time has elapsed, [Bills][Bill] and invoices can no longer be edited. The same applies to historical [Reservations][Reservation] data, these cannot be edited after the Operational Editable History Window time period has elapsed. If you try to post an [Accounting Item] or [Outlet] item with a 'consumption time' that falls outside of the permitted editable time period, you will not be permitted to do so and will receive an appropriate error response.

In the Mews Connector API, the _Get Configuration_ operation returns **Editable History Interval**, which is the shorter of the two Editable History Windows. Any operation that you perform through the API on historical data will therefore be valid if it lies within this interval period, regardless of whether it is related to accounting data or reservation data.

For more information:

- [Set up your Editable History Windows](https://help.mews.com/s/article/set-up-your-editable-history-windows?language=en_US)
- [How to extend the Operational & Accounting editable history window](https://help.mews.com/s/article/how-to-extend-the-operational-accounting-editable-history-window?language=en_US)
- [The accounting configuration in Mews - an overview of the settings](https://help.mews.com/s/article/what-is-the-accounting-configuration?language=en_US)

## Employee <a href="#Employee" id="Employee"></a>

A member of staff at a [Property] or [Enterprise]. They may also be referred to as a [User] of the Mews system, depending on context.

## Enterprise <a href="#Enterprise" id="Enterprise"></a>

The term Enterprise implies a single Mews customer, either an individual [Property] such as a hotel or hostel, or some other type of Mews customer which consists of multiple physical properties, such as a campus.

## Extra <a href="#Extra" id="Extra"></a>

Additional [Products][Product] bundled with a [Reservation] may be described as Extras.

# F <a href="#F_section" id="F_section"></a>

# G <a href="#G_section" id="G_section"></a>

## Group <a href="#Group" id="Group"></a>

The term Group will rarely be used on its own except in a specific context, since the term Group could refer to a group of [Properties][Property] (normally a [Chain] or [Enterprise]), a [Reservation Group], a [Group Block], or a [Rate Group].

## Group Block <a href="#GroupBlock" id="GroupBlock"></a>

See [Availability Blocks][Availability Block].

## Guest <a href="#Guest" id="Guest"></a>

See [Customer]. The term Guest is used in some parts of the [Mews Open API][Open API], but it should be read as the more general term [Customer].

# H <a href="#H_section" id="H_section"></a>

## Hotel <a href="#Hotel" id="Hotel"></a>

See [Property]. The term Hotel is used in some parts of the [Mews Open API][Open API], but it should be read as the more general term [Property].

# I <a href="#I_section" id="I_section"></a>

## Integration <a href="#Integration" id="Integration"></a>

When a [Property] or [Enterprise] in Mews makes a connection with a partner system, this connection is called an Integration. A [Property] or [Enterprise] can have more than one instance of an Integration with a given partner system, but normally it would only have one.

## Inventory <a href="#Inventory" id="Inventory"></a>

The number of [Spaces][Space] (e.g. guest rooms) available for sale, distributed across sales [Channels][Channel].

## Item <a href="#Item" id="Item"></a>

Item could be a [Product Item], [Order] Item, [Payment] Item or [Accounting Item].

# J <a href="#J_section" id="J_section"></a>

# K <a href="#K_section" id="K_section"></a>

# L <a href="#L_section" id="L_section"></a>

## Length of Stay <a href="#LengthOfStay" id="LengthOfStay"></a>

The period of a [Customer]'s stay-over, expressed usually in number of nights.

# M <a href="#M_section" id="M_section"></a>

## Mapping Table <a href="#MappingTable" id="MappingTable"></a>

Mapping Tables are used to map relationships between [Space Categories][Space Category], [Rates][Rate], [Products][Product] and [Companies][Company], using abbreviated codes for the respective entities. For example, in the Channel Manager API, 'product mappings' map [Rate Plan] codes such as "NR" to [Product] codes such as "AUR".

## Marketplace <a href="#Marketplace" id="Marketplace"></a>

Marketplace is the app store for Mews integration partners that Mews customers are able to see within their Mews account and from where they can purchase compatible products and services. Learn [how to connect and disconnect integrations available in the Mews Marketplace](https://help.mews.com/s/article/connect-and-disconnect-integrations?language=en_US&Language=en_US).

## Message <a href="#Message" id="Message"></a>

The meaning of the term Message may depend on context, but generally it refers to customer messages (i.e. guest messages) within **Mews Operations**. The Mews [Connector API] permits API clients to integrate with the Mews customer messaging system and thus send and receive such messages.

## Message Thread <a href="#MessageThread" id="MessageThread"></a>

Message threads are conversations initiated by a customer (i.e. a guest), within the customer messaging system of **Mews Operations**. A message thread consists of one or more [Messages][Message].

## Multi-property <a href="#Multi-property" id="Multi-property"></a>

**Mews Multi-Property** is an optional module of **Mews Operations** that supports above-property level functionality, such as central management of users, rates and vouchers, across a [Portfolio] of multiple [Properties][Property]. This functionality is reflected in the [Mews Connector API][Connector API] through the use of [Portfolio Access Tokens][Portfolio Access Token].

# N <a href="#N_section" id="N_section"></a>

# O <a href="#O_section" id="O_section"></a>

## Open API <a href="#OpenAPI-MewsOpenAPI" id="OpenAPI-MewsOpenAPI"></a>

The **Mews Open API** refers to the family of APIs provided by Mews to partners and customers for them to connect and access data and services in Mews. Currently it consists of three separate APIs: Mews Connector API, Mews Channel Manager API, and Mews Booking Engine API. The Mews Open API should not be confused with the term OpenAPI (without the space).

## OpenAPI <a href="#OpenAPI-Swagger" id="OpenAPI-Swagger"></a>

OpenAPI is a public standard for defining Web APIs. OpenAPI definitions may be available for some or all of the Mews Open API - see the current API documentation for details. The OpenAPI specification was formerly known as Swagger and may still be referred to by that name.

## Order <a href="#Order" id="Order"></a>

[Accounting Items][Accounting Item] are split into [Order] items (consumed items, such as night stays or products) and [Payment] items (such as cash, credit card payments or invoices). Thus an Order is a consumed [Service] or [Product] item.

## Outlet <a href="#Outlet" id="Outlet"></a>

An Outlet is a retail outlet or retail location in a [Property], such as a bar, restaurant or spa centre. Outlets are used to record revenue and payments that occur external to the Mews system.

While consumed items that are to be settled later by a guest or corporate account are posted to their respective [Customer] [Profiles][Profile] in Mews, items that have been consumed AND paid for should be posted to Outlets.

You can read more about [how properties use Outlets](https://help.mews.com/s/article/set-up-outlets?language=en_US) and how the figures appear on the [Mews Accounting Report](https://help.mews.com/s/article/accounting-report?language=en_US).

## Owner <a href="#Owner" id="Owner"></a>

The Owner of a [Reservation] is the primary [Customer] linked to the Reservation, i.e. the primary [Guest]. Additional Guests are known as [Companions].

# P <a href="#P_section" id="P_section"></a>

## Package <a href="#Package" id="Package"></a>

Package implies a bundle of [Services][Service] and service-related [Products][Product], e.g. if a room-stay is booked together with a spa treatment, or a room-stay with breakfast.

Product rules can be used to create packages where [Products][Product] are automatically added to a [Reservation] when it is made. See [Package products with accommodation](https://help.mews.com/s/article/package-products-with-accommodation?language=en_US).

## Paymaster <a href="#Paymaster" id="Paymaster"></a>

A Paymaster account is a type of financial account used to compile charges into a single [Bill] and issue a single invoice. This could be used for issuing a [Bill] to a non-resident customer who doesn't have a [Profile] on the system (also known as a **Lobby Bar Paymaster**), or to a [Travel Agent][Travel Agency] or other [Company] which wants to receive a regular invoice for all their bookings with multiple [Customers][Customer] (also known as a **City Ledger Paymaster**).

## Payment <a href="#Payment" id="Payment"></a>

[Accounting Items][Accounting Item] are split into [Order] items (consumed items, such as night stays or products) and Payment items (such as cash, credit card payments or invoices). Thus a Payment is a financial payment on an account.

## Payment Card <a href="#PaymentCard" id="PaymentCard"></a>

A Payment Card is a payment device in the form of a physical card or its electronic equivalent issued by a financial institution and which enables its owner to authorize payments from the owner's financial account. A Payment Card is associated with a [Customer] or [Company]. Multiple Payment Cards can be linked to a [Profile], see [Adding a new payment card](https://help.mews.com/s/article/add-a-new-payment-card?language=en_US).

## Portfolio <a href="#Portfolio" id="Portfolio"></a>

A Portfolio is a collection of [Properties][Property] or [Enterprises][Enterprise] that form part of a single group, for the purposes of centralised management of that group when using **Mews Multi-Property**. See also [Multi-property].

## Portfolio Access Token <a href="#PortfolioAccessToken" id="PortfolioAccessToken"></a>

Portfolio Access Tokens are special types of [Access Token] that grant access to all [Properties][Property] or [Enterprises][Enterprise] within a [Portfolio], rather than just a single [Property] or [Enterprise]. These are used to facilitate [Multi-property] functionality through the **Mews Open API**. API operations that support Portfolio Access Tokens may work across all [Enterprises][Enterprise] within scope of the token, or you may specify which individual [Enterprise] from within the [Portfolio] you wish the operation to work with.

## Preauthorization <a href="#Preauthorization" id="Preauthorization"></a>

Preauthorization or pre-authorization (often abbreviated 'pre-auth') is a [Payment Card] provider service which puts a time-limited hold on an amount authorized by the card owner, reducing the available funds, until the transaction is 'cleared' or 'settled' or cancelled.

You might use this for instance when a [Reservation] is made to ensure that the account holder has sufficient funds to settle the [Bill], as the service fails if insufficient funds are available.

A Preauthorization does not take the funds immediately but puts a temporary hold on them. The length of time for the hold can vary.

## Price <a href="#Price" id="Price"></a>

Price is the amount of money expected in exchange for goods and services, its use depends on context but usually in the [Mews Open API][Open API] it refers to the price of a [Reservation]. The system calculates this from the nightly rate and the number of nights of the [Stay].

## Product <a href="#Product" id="Product"></a>

A Product is a purchasable item linked to a [Service]. Although all Products are associated with [Services][Service], those linked to [Stay] [Services][Service] are sometimes called [Stay Products][Stay Product] (or Reservation Products) and those linked to other [Services][Service] are sometimes called [Service Products][Service Product].

Products can be items that can be purchased in their own right, or they can be 'relative products', meaning that they are defined relative to another product, e.g. a discounted version of the original product is a relative product which can have a price expressed as a percentage.

Additional Products bundled with a [Reservation] may also be described as [Extras][Extra].

## Product Item <a href="#ProductItem" id="ProductItem"></a>

Product Item is an instance of a [Product] added to a [Customer]'s [Bill].

## Product Rule <a href="#ProductRule" id="ProductRule"></a>

Product Rules are the rules that Mews uses for automatically creating [Packages][Package], i.e. they are a set of rules that automatically add or remove [Products][Product] from a [Reservation] when it is made. See [Packages][Package]. You configure Product Rules as part of setting up [Rates][Rate].

## Product Service Order <a href="#ProductServiceOrder" id="ProductServiceOrder"></a>

Product Service Order is the name given to an [Order] made against an [Additional Service][Additional Services] (e.g. breakfast or minibar), as opposed to a [Reservation]. Some care is needed here, as this is strictly an Additional Service Order and not to be confused with [Products][Product].

## Profile <a href="#Profile" id="Profile"></a>

In its general sense, a Profile is a 'record of details' about some entity, such as a [Customer], stored on the system as a data record. Typically, the term Profile implies the encapsulated details about a [Customer] (a Customer Profile or Guest Profile) or a [Company][Customer] (a Company Profile). In some cases, the term may refer to the encapsulated details about a [User] on the Mews system (a User Profile). Sometimes the term is used explicitly, but sometimes the term [Customer], [Company][Customer] or [User], when used on their own, implies a Profile.

## Property <a href="#Property" id="Property"></a>

Property is a general hospitality industry term to refer to a single hotel, hostel, resort, apartment building, cruise ship or other similar entity providing lodgings and hospitality. Thus a Property is an individual hospitality business that is a user and customer of Mews.

# Q <a href="#Q_section" id="Q_section"></a>

# R <a href="#R_section" id="R_section"></a>

## Rate <a href="#Rate" id="Rate"></a>

Rate is the term used to describe the price per night for a [Stay] . It depends on a number of factors, including the type of [Space] and the date. Sometimes a Rate is a relative rate based on a 'base rate'.

## Rate Group <a href="#RateGroup" id="RateGroup"></a>

A Rate Group is a grouping of [Rates][Rate] that all share the same cancellation policies. For example, all 'flexible rates' would be one Rate Group, all 'non-refundable rates' would be another Rate Group, and all 'corporate rates' would be another Rate Group.

## Rate Plan <a href="#RatePlan" id="RatePlan"></a>

Rate Plan is synonymous with [Rate].

## Reservation <a href="#Reservation" id="Reservation"></a>

Reservation has the normal hospitality meaning, i.e. a contract between a [Property] and a named [Customer] or agent to set aside a category of [Space] and/or provide some hospitality [Service] for a specified period of time, such as a guest bedroom for a specific date and duration (in this case a [Stay] Reservation). The contract would also contain a [Price] and terms and conditions such as a cancellation policy.

## Reservation Group <a href="#ReservationGroup" id="ReservationGroup"></a>

A Reservation Group is a collection of associated [Reservations][Reservation]. They are collected together and given a group name for easy reference. A group would include all [Reservations][Reservation] for a wedding party or corporate event, for example.

## Resource <a href="#Resource" id="Resource"></a>

A Resource is something that can be sold, reserved or used. This could be an object or even the services of a person, but normally in our context it refers to a physical accommodation-based resource such as a hotel room, for which we use the general term [Space]. In simple terms, a hotel room is a type of [Space], and a [Space] is a type of Resource.

The [Mews SpaceTime project][Mews SpaceTime project] has broadened the scope of reservable entities from [Rooms][Room] to [Spaces][Space] to Resources, and this remains an on-going project. As a result, within the [Mews Open API][Open API] you may see references to Resources and corresponding [Resource Categories][Resource Category], but you may also see references to [Spaces][Space] and corresponding [Space Categories][Space Category]. In most cases you will probably find that they correspond to the same thing, i.e. hotel rooms.

## Resource Access Token <a href="#ResourceAccessToken" id="ResourceAccessToken"></a>

A Resource Access Token is a general term for a time-limited security token granting access to a specified resource. In practise within Mews this means a PIN code (Personal Identification Number) or RFID tag (Radio Frequency ID) which may be in the form of a physical card, tag, wristband or digital equivalent used to access services, doors or similar within a [Property].

Note a Resource Access Token is completely separate from and unrelated to the [Access Token] used by [Client] applications to access the [Mews Open API][Open API]; and the word 'resource' is used in the broadest sense and does not necessarily imply a [Space].

## Resource Block <a href="#ResourceBlock" id="ResourceBlock"></a>

Resource Blocks are groups of [Resources][Resource] or [Spaces][Space] that you take out of [Inventory] because they are temporarily out-of-service or being used for other purposes.

Do not confuse Resource Blocks with [Availability Blocks][Availability Block], which are groups of [Spaces][Space] taken out of [Inventory] because they are set aside for group sales.

## Resource Category <a href="#ResourceCategory" id="ResourceCategory"></a>

This is the category to which a [Resource] belongs, analogous to [Space Category] but at a higher level of abstraction. For the difference between these concepts, see [Resource] and [Space].

## Restriction <a href="#Restriction" id="Restriction"></a>

Restrictions are specified limitations on [Space] [Availability], for example the restriction that a [Space Category] is only available if booked for a minimum [Length of Stay] (LOS) or the restriction that a [Space Category] is 'closed to arrival'.

## Room <a href="#Room" id="Room"></a>

The term Room implies a hotel room or a function room, however the term is rarely used within the [Mews Open API][Open API], instead the more general term [Space] is used, or in some cases the even more general term [Resource]. A room such as a guest bedroom or suite is a type of [Space], but a [Space] may also be a car parking bay or a function room.

## Rule <a href="#Rule" id="Rule"></a>

The meaning of Rule depends on context, but may be a [Product Rule] or a [Charge Rule].

# S <a href="#S_section" id="S_section"></a>

## Segment <a href="#Segment" id="Segment"></a>

See [Business Segment].

## Service <a href="#Service" id="Service"></a>

A Service is any type of saleable hospitality service provided by a [Property], including an accommodation service or room-stay. The definition is quite broad, and could include a taxi service, room service or minibar service. All items that can be consumed by a [Customer] are made against a Service.

These can be [Bookable Services][Bookable Service] or [Additional Services]. [Bookable Services][Bookable Service] are ones that can be purchased when a [Reservation] is made. [Additional Services] cannot be purchased when a [Reservation] is made, but can be purchased on-site and manually added to a [Customer] [Bill].

The default [Bookable Service] is the [Stay] Service, which Mews creates automatically and which cannot be deleted, so every [Property] has a [Stay] Service.

Services can have a service fee, and can also have associated [Products][Product]. All [Products][Product] are linked to Services. Some [Products][Product] are bundled with a Service when the [Reservation] is made, according to configured [Product Rules][Product Rule], this is called a [Package].

You can read more about the relationship between services and products in [Understanding services](https://help.mews.com/s/article/understanding-services?language=en_US).

## Service Order <a href="#ServiceOrder" id="ServiceOrder"></a>

A Service Order is an [Order] made against a [Service]. An [Order] made against a [Bookable Service] is known as a [Reservation]. Thus a [Reservation] is a type of Service Order.

When we think of [Reservation], we normally think of a [Stay]  [Reservation] (i.e. booking one's stay at a property). This is simply an [Order] made against the default [Stay] [Service] . But a [Reservation] in the broadest sense could be an [Order] made against any [Bookable Service], e.g. car parking or a tennis court.

An [Order] made against an [Additional Service][Additional Services] (e.g. breakfast or minibar) is known as a [Product Service Order]. Some care is needed here, as this is strictly an Additional Service Order and not to be confused with [Products][Product].

In summary, A Service Order is one of two types, either a [Reservation] (an [Order] against a [Bookable Service]) or a [Product Service Order] (an [Order] against an [Additional Service][Additional Services]).

## Service Product <a href="#ServiceProduct" id="ServiceProduct"></a>

A [Product] is a purchasable item linked to a [Service]. Although all [Products][Product] are associated with [Services][Service], those linked to [Stay] [Services][Service] are sometimes called [Stay Products][Stay Product] (or Reservation Products) and those linked to other [Services][Service] are sometimes called Service Products.

Thus Service Products are [Products][Product] which can be booked against a [Customer] [Profile] without being linked to a [Reservation].

## Space <a href="#Space" id="Space"></a>

A Space is a bookable, location-based [Resource] such as a bed, guest room, dormitory, apartment, function room, tennis court or car parking bay which can be sold on the basis of a [Reservation] for a specified date/time and duration. It is used in preference to the more restricted definition of 'room'.

In practice, most spaces are accommodation-based resources such as beds, guest rooms and dormitories, booked on a nightly stay basis, and some parts of the [Mews Open API][Open API] and some partner [Integrations][Integration] may make that assumption.

For more information about the Mews vision for space resources, see the [Mews Devs blog post about Project Spacetime][Mews SpaceTime project].

## Space Category <a href="#SpaceCategory" id="SpaceCategory"></a>

Space Category is the named category of [Space] which Mews uses when calculating [Availability] and when distributing ARI ([Availability], [Rates][Rate] and [Inventory]) to sales [Channels][Channel]. For example, a hotel might have a Space Category of "double room", "twin room" or "single room".

Space Category is different than [Space Type], which is one of the parameters used within Mews Operations to define a Space Category. [Space Type] defines what the type of [Space] is, e.g. room, dorm, car parking bay.

Confusion can arise because in traditional systems Space Category is equivalent to 'room type', this has led to it naturally being referred to as 'space type', in fact within the Channel Manager API, **SpaceTypeCode** is used in this way in Inventory mappings. SpaceTypeCode actually refers to a Space Category, despite the name.

Furthermore, to avoid confusion between the terms 'category' and 'type' within the Channel Manager API, actual [Space Types][Space Type] (as defined in this Glossary) are referred to instead as 'space classifications'.

In summary:

- Within the Channel Manager API, the terms 'space category', 'space type' and 'space type code' all refer to Space Category
- Within the Channel Manager API, the term 'space classification' refers to [Space Type]

## Space Classification <a href="#SpaceClassification" id="SpaceClassification"></a>

Space Classification defines what the type of [Space] is, e.g. room, dorm, car parking bay. The term is used in the Channel Manager API and is synonymous with [Space Type] within Mews Operations. The Channel Manager API avoids using the term 'space type' so as not to confuse it with [Space Category].

## Space Type <a href="#SpaceType" id="SpaceType"></a>

Space Type defines what the type of [Space] is, e.g. room, dorm, car parking bay. Space Type is one of the parameters used to define a given [Space Category], and the two are different. In order to avoid confusion, within the Channel Manager API Space Type is instead referred to as 'space classification'.

## State <a href="#State" id="State"></a>

State is a general term whose meaning depends on the context. In the [Mews Open API][Open API] it could refer to:

- [Bill] state, e.g. open or closed
- [Preauthorization] state, e.g. chargeable, expired, cancelled, charged
- [Task] state, e.g. open or closed
- [Payment] item state, e.g. charged, cancelled, pending, failed, verifying

## Stay <a href="#Stay" id="Stay"></a>

Stay is synonymous with [Accommodation] and refers to room-stay based [Services][Service] offered by a [Property]. These are the main [Services][Service] that [Properties][Property] offer to their [Customers][Customer], in fact Mews automatically creates a default Stay service and you cannot delete it. Stay services are [Bookable Services][Bookable Service], i.e. they can be reserved prior to a [Customer]'s arrival.

## Stay Product <a href="#StayProduct" id="StayProduct"></a>

A [Product] is a purchasable item linked to a [Service]. Although all [Products][Product] are associated with [Services][Service], those linked to [Stay] [Services][Service] are sometimes called Stay Products (or Reservation Products) and those linked to other [Services][Service] are sometimes called [Service Products][Service Product].

Thus Stay Products are bookable [Stay] [Products][Product] linked to a [Reservation].

## Swagger <a href="#Swagger" id="Swagger"></a>

Swagger is the old name for the [OpenAPI] specification.

# T <a href="#T_section" id="T_section"></a>

## Task <a href="#Task" id="Task"></a>

Tasks are pieces of work that need to be done within the [Property]. Tasks can be created within Mews Operations and allocated to [Employees][Employee] or [Departments][Department] to complete them. An [Employee] logging in to Mews Operations sees their pending tasks on the Dashboard.

## Travel Agency <a href="#TravelAgency" id="TravelAgency"></a>

A Travel Agency is a special type of [Company], representing a booking agent. Like other [Companies][Company], Mews stores the details of the Travel Agency in a [Profile], and like other [Companies][Company] they can be attached to a booking or [Reservation]. This can be set up automatically using [Channel Manager] [Mapping Tables][Mapping Table].

Since Travel Agencies are a special type of [Company], within the API they may be considered as separate entities.

# U <a href="#U_section" id="U_section"></a>

## User <a href="#User" id="User"></a>

A User is an [Enterprise] [Employee] who has an account on the Mews system.

# V <a href="#V_section" id="V_section"></a>

## Voucher <a href="#Voucher" id="Voucher"></a>

A Voucher is a coupon or token that gives [Customers][Customer] or [Companies][Company] access to special [Rates][Rate]. A Voucher is linked to a private [Rate], i.e. a [Rate] that is not distributed publicly. The Voucher may be in physical form, but may simply be a unique identifying code.

# W <a href="#W_section" id="W_section"></a>

# X <a href="#X_section" id="X_section"></a>

# Y <a href="#Y_section" id="Y_section"></a>

# Z <a href="#Z_section" id="Z_section"></a>

[Access Token]: #AccessToken
[Accommodation]: #Accommodation
[Account]: #Account
[Accounting Category]: #AccountingCategory
[Additional Services]: #AdditionalServices
[Accounting Item]: #AccountingItem
[ARI]: #ARI
[Availability]: #Availability
[Availability Block]: #AvailabilityBlock
[Bill]: #Bill
[Bookable Service]: #BookableService
[Booker]: #Booker
[Booking]: #Booking
[Booking Engine]: #BookingEngine
[Booking Engine API]: #BookingEngineAPI
[Business Segment]: #BusinessSegment
[Cashier]: #Cashier
[Chain]: #Chain
[Channel]: #Channel
[Channel Manager]: #ChannelManager
[Channel Manager API]: #ChannelManagerAPI
[Channel Manager ID]: #ChannelManagerID
[Channel Manager Segment]: #ChannelManagerSegment
[Charge Rule]: #ChargeRule
[Check-in]: #CheckIn
[Check-out]: #CheckOut
[Client]: #Client
[Client Token]: #ClientToken
[Command]: #Command
[Companion]: #Companion
[Company]: #Company
[Complimentary Product Item]: #ComplimentaryProductItem
[Connection]: #Connection
[Connection Token]: #ConnectionToken
[Connector API]: #ConnectorAPI
[Counter]: #Counter
[Customer]: #Customer
[Department]: #Department
[Deposit]: #Deposit
[Device]: #Device
[Distributor]: #Distributor
[Editable History Interval]: #EditableHistoryInterval
[Editable History Window]: #EditableHistoryWindow
[Employee]: #Employee
[Enterprise]: #Enterprise
[Extra]: #Extra
[Group]: #Group
[Group Block]: #GroupBlock
[Guest]: #Guest
[Hotel]: #Hotel
[Integration]: #Integration
[Inventory]: #Inventory
[Item]: #Item
[Length of Stay]: #LengthOfStay
[Mapping Table]: #MappingTable
[Marketplace]: #Marketplace
[Message]: #Message
[Message Thread]: #MessageThread
[Multi-property]: #Multi-property
[Open API]: #OpenAPI-MewsOpenAPI
[OpenAPI]: #OpenAPI-Swagger
[Order]: #Order
[Outlet]: #Outlet
[Owner]: #Owner
[Package]: #Package
[Paymaster]: #Paymaster
[Payment]: #Payment
[Payment Card]: #PaymentCard
[Portfolio]: #Portfolio
[Portfolio Access Token]: #PortfolioAccessToken
[Preauthorization]: #Preauthorization
[Price]: #Price
[Product]: #Product
[Product Item]: #ProductItem
[Product Rule]: #ProductRule
[Product Service Order]: #ProductServiceOrder
[Profile]: #Profile
[Property]: #Property
[Rate]: #Rate
[Rate Group]: #RateGroup
[Rate Plan]: #RatePlan
[Reservation]: #Reservation
[Reservation Group]: #ReservationGroup
[Resource]: #Resource
[Resource Access Token]: #ResourceAccessToken
[Resource Block]: #ResourceBlock
[Resource Category]: #ResourceCategory
[Restriction]: #Restriction
[Room]: #Room
[Rule]: #Rule
[Segment]: #Segment
[Service]: #Service
[Service Order]: #ServiceOrder
[Service Product]: #ServiceProduct
[Space]: #Space
[Space Category]: #SpaceCategory
[Space Classification]: #SpaceClassification
[Space Type]: #SpaceType
[State]: #State
[Stay]: #Stay
[Stay Product]: #StayProduct
[Swagger]: #Swagger
[Task]: #Task
[Travel Agency]: #TravelAgency
[User]: #User
[Voucher]: #Voucher
[Companions]: #Companion
[Mews SpaceTime project]: https://developers.mews.com/project-spacetime/
