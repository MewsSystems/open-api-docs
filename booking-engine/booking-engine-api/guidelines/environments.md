# Environments

## Demo environment

This environment is intended to be used during development of the client application integration. We have prepared one demo hotel where you can fetch availability and create reservations. You can use the following information to access it:

* **API base url** - `https://api.mews-demo.com`
* **Hotel Id** - `3edbe1b4-6739-40b7-81b3-d369d9469c48`
* **Configuration Id** - `93e27b6f-cba7-4e0b-a24a-819e1b7b388a`

You will also have access into the system so it is possible for you to check whether the reservations sent to the API are correctly posted to the system. To sign in to the Mews system, use the following credentials:

* **Mews applications base url** - `https://app.mews-demo.com`
* **Email** - `distributor-api@mews.li`
* **Password** - `Distributor-api1`

## Production environment

This is the live production environment.

* **API base url** - `https://api.mews.com`
* **Mews applications base url** - `https://app.mews.com`
* **Hotel Id** - This depends on the hotel and should be provided to you by the hotel administrator.
* **Configuration Id** - This depends on the hotel setup and can be found in **Mews Operations** administration.

## IP address allowlisting

Allowlisting (formerly 'whitelisting') is a common security measure which can be applied to a system to allow only specified external systems to talk to it. This has traditionally been achieved using IP address-based firewall rules. However, this approach does not work with modern cloud based architectures, which use dynamic and shared IP addresses, proxy servers and elastic resources. For this reason, we do not support the use of IP address allowlists for our APIs and we cannot supply a list of IP addresses for our APIs.
