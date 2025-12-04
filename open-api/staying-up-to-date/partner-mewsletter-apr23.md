_14 Apr 2023_

# The Partner Mewsletter April 2023

Hello from the **Mews Connectivity Team**! It’s that time again! We have been busy, so here’s what you need to know.

## AVAILABLE RIGHT NOW

* **Payment requests**
* **Set restrictions**
* **Accounting items split**
* **Company billing**
* **More pagination**
* **Time filters**
* **Mews Payment Terminals**

## COMING SOON
* **Multi-property API**
* **Availability blocks**

---

## Payment requests

You can now trigger a payment request through the API and make full use of the **Mews payment infrastructure** to offer a seamless and secure guest experience directly in your application – great if you don’t typically deal with payments but want to offer a full end-to-end guest experience.

* **API Operations**: [Payment requests](https://mews-systems.gitbook.io/connector-api/operations/paymentrequests)
* **Mews Help**: [Send a payment request by email](https://help.mews.com/s/article/send-a-payment-request-by-email?language=en_US)

---

## Set restrictions

We’ve added a more efficient way to manage restrictions, with [Set restrictions](https://mews-systems.gitbook.io/connector-api/operations/restrictions#set-restrictions) and [Clear restrictions](https://mews-systems.gitbook.io/connector-api/operations/restrictions#clear-restrictions). You tell us what the restrictions should look like, and we take care of the underlying calculations – simpler and more efficient for both parties.

* **API Operations**: [Restrictions](https://mews-systems.gitbook.io/connector-api/operations/restrictions)

---

## Accounting items split

Accounting items have been split into separate operations for **Order items** and **Payment items**. You can fetch the data you want faster and more efficiently, and now using pagination too.

* **API Operations**: [Get all payments](https://mews-systems.gitbook.io/connector-api/operations/payments#get-all-payments), [Get all order items](https://mews-systems.gitbook.io/connector-api/operations/orderitems#get-all-order-items)

---

## Company billing

Now the owner of a bill or invoice can be a **company** or an individual **customer**, to clearly indicate who the payer is, whilst company information can still be attached for cases where a customer pays the bill but is reimbursed by their company. It’s simpler and clearer to bill to a company, and all use cases are covered.

* **API Operations**: [Add order](https://mews-systems.gitbook.io/connector-api/operations/orders#add-order), [Add external payment](https://mews-systems.gitbook.io/connector-api/operations/payments#add-external-payment), [Add bill](https://mews-systems.gitbook.io/connector-api/operations/bills#add-bill)
* **Mews Help**: [How to create and manage company bills](https://help.mews.com/s/article/How-to-create-and-manage-company-bills?language=en_US)

---

## More pagination

All the most popular ‘Get’ operations now support [pagination](https://mews-systems.gitbook.io/connector-api/guidelines/pagination). Use pagination for more efficient fetching of data, to avoid [request timeouts](https://mews-systems.gitbook.io/connector-api/guidelines/requests#request-timeouts) and to benefit from a **higher quota** – all part of API [best practices](https://mews-systems.gitbook.io/connector-api/guidelines/best-practices).

---

## Time filters

We’ve added support for **UpdatedUtc** to several API Operations, such as [Get all bills](https://mews-systems.gitbook.io/connector-api/operations/bills#get-all-bills) and [Get all outlet items](https://mews-systems.gitbook.io/connector-api/operations/outletitems#get-all-outlet-items). Filter against dates when the data was updated to optimize your searches and reduce unnecessary data transfer. Find them all in the [API Changelog](https://mews-systems.gitbook.io/connector-api/changelog).

---

## Mews Payment Terminals

For **Kiosk** and **POS** partners, we’ve added [a new use case](https://mews-systems.gitbook.io/connector-api/use-cases/mews-terminals) to explain how to connect to Mews Payment Terminals. Increase customer revenue and customer convenience by taking advantage of Mews Terminals.

---

## Multi-property API

You will soon be able to access data and services for an entire property chain through **a single Access Token**. Manage common resources like companies and customers more efficiently at the chain level. Stay tuned for news on this exciting development!

---

## Availability blocks

You will soon be able to release blocks of inventory back into public availability **on a rolling basis**. Fine-tune your availability management to maximize your revenue potential. Keep an eye on the [Changelog](https://mews-systems.gitbook.io/connector-api/changelog) for changes as they occur.

Until next time...

\~ The Mews Connectivity Team
