# Deeplinks

With deeplinks you can create URLs which open Booking Engine Standalone in some pre-defined setup, for example with a specific currency or specific dates. 
You do this by simply adding [supported parameters](#supported-parameters) to the URL in the form of a URL query string. For example:

```text
https://app.mews.com/distributor/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee?currency=EUR&mewsRoute=rates&mewsRoom=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
```

## Supported parameters 

This is the list of parameters that can be added to the URL query string. Parameters can be combined, and some parameters have no effect unless they are used in combination, e.g. `mewsHotel`.

### Parameters supported in single and multi-enterprise mode

| Name            | Description                                                                                     | Example                                                                      |
|:----------------|:------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------|
| mewsStart       | an arrival date in ISO 8601 format \(`YYYY-MM-DD`\)                                             | `2023-01-20` for January 20, 2023                                            |
| mewsEnd         | a departure date in ISO 8601 format \(`YYYY-MM-DD`\)                                            | `2023-01-23` for January 23, 2023                                            |
| mewsVoucherCode | a voucher code                                                                                  | `E1A71167851A30043B12`                                                       |
| mewsRoute       | [mewsRoute](#mewsroute)                                                                         | `rooms` for rooms step                                                       |
| mewsSort        | sort categories on category step by lowest/highest price; overrides all other ordering methods  | `mewsSort=asc` sorts by lowest price, `mewsSort=desc` sorts by highest price |
| mewsRoom        | opens with specified room selected \(`aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee`\)                   | `da394bbb-9685-4bb8-9547-ab7300915967`                                       |
| mewsAdultCount  | number of adults that should be selected by default                                             | `3`                                                                          |
| mewsChildCount  | number of children that should be selected by default                                           | `1`                                                                          |
| language        | a language code \(`xx-YY`\)                                                                     | `en-US` for U.S. English                                                     |
| currency        | a currency code \(`XXX`\)                                                                       | `USD` for United States dollar                                               |

### Additional parameters supported in multi-enterprise mode

In addition, Mews Booking Engine in multi-enterprise mode also supports:

| Name | Description | Example |
| :--- | :--- | :--- |
| mewsCityId | selects specified city \(`aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee`\) | `cf1678c0-0896-450b-8611-bec07d63cc32` |
| mewsHotel | selects specified hotel \(`aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee`\) | `e31209f1-8be9-49d0-a577-ab73009151f3` |

### mewsRoute

With parameter `mewsRoute` you can open the Mews Booking Engine on a specific step, e.g. selecting a room (or other bookable space) or selecting a rate.

> Note: The steps available depend on whether you are using single-enterprise or multi-enterprise mode.
> Some steps also require additional parameters to be set, otherwise the mewsRoute parameter will not work correctly (see the following tables for details).

#### mewsRoute in single-enterprise mode

| Step | Required parameters | What it does |
| :--- | :--- | :--- |
| `mewsRoute=rooms` | none | Application will open a page where user can select a room category. |
| `mewsRoute=rates` | mewsRoom | Application will open a page where user can select rate, products and occupancy. |

#### mewsRoute in multi-enterprise mode

| Step | Required parameters | What it does |
| :--- | :--- | :--- |
| `mewsRoute=hotels` | mewsCityId | Application will open a page where user can select a hotel (or other property type). |
| `mewsRoute=rooms` | mewsCityId, mewsHotel | Application will open a page where user can select a room category (or other space type category). |
| `mewsRoute=rates` | mewsCityId, mewsHotel, mewsRoom | Application will open a page where user can select rate, products and occupancy. |

## Examples

### Example 1: Specific start date, voucher code and language

The following deeplink will open the booking engine with a specific start date, specific voucher code and specific language:

```text
https://app.mews.com/distributor/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee?mewsStart=2021-01-01&mewsVoucherCode=special-discount&language=en-US
```

### Example 2: Pre-selected room and currency on rate selection step

The following deeplink will open the booking engine on the rate selection step with a specific pre-selected room and specific currency:

```text
https://app.mews.com/distributor/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee?currency=EUR&mewsRoute=rates&mewsRoom=aaaa-bbbb-cccc-dddd
```

### Example 3: Multi-enterprise with pre-selected city on hotel selection step

The following deeplink will open the booking engine in multi-enterprise mode on the hotel selection step with a specific pre-selected city:

```text
https://app.mews.com/distributor/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee;ffffffff-gggg-hhhh-iiii-jjjjjjjjjjjj?mewsRoute=hotels&mewsCityId=aaaa-bbbb-cccc-dddd
```
