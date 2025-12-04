# Reference

## Options reference

> **Note:** Direct configuration of the booking engine through the options has been deprecated and will be disabled in future.
> Instead use Booking Engine Configuration in **Mews Operations**. The only supported options now are `configurationIds` and `openElements`.

| Option | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| configurationIds | array of`string` | required | Set of booking engine unique identifiers. You can get the unique identifier of a configuration from its details page in __Mews Operations__ - see [Where can I get Configuration ID?](../FAQ/README.md#where-can-i-get-configuration-id). |
| openElements | `string` | optional | A list of comma-separated CSS selectors of elements, which will automatically get attached to click event listeners for opening the Booking Engine Widget. The string is given as an argument to the `document.querySelectorAll` function, you can get more information about it [here](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll). The click event is being delegated, meaning that each element is being looked up on a website dynamically after the click happens. This way you can pass a selector to the elements that don’t exist yet during the initialization. |

## Javascript API reference

Javascript API calls are defined on the booking engine instance, which is created with the initialization call. This instance is returned to you as an argument of a callback function that you can pass as the second parameter to the initialization call.
The following simple example shows how to use the calls to set up start and end dates, and then open the booking engine:

```html
<!-- Example of use of an instance to call the API -->
<script>
Mews.Distributor({
    configurationIds: ['aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'],
}, function(distributor) {
   $('.booking-button').click(function() {
     var start = new Date();
     var end = new Date();
     end.setDate(start.getDate() + 2);

     distributor.setStartDate(start);
     distributor.setEndDate(end);
     distributor.open();
   });
});
</script>
```

The API functions supported are listed below. Some functions are common to both Single Mode and Chain Mode, while some are specific to one mode or the other.

### Common API functions

#### open\(\)

* Opens the booking engine in its overlay

#### close\(\)

* Closes the booking engine and its overlay (note: even though the booking engine is closed, it still responds to API calls)

#### setLanguageCode\(languageCode\)

* `languageCode` Type: `string` Description: The language code to be set, in format `en-US`. [Supported language codes](../booking-engine-api/guidelines/supported-language-codes.md)
* Sets the language of the booking engine’s localization. The language code should be in the format _language_-_countryCode_, e.g. `en-US`, as a variant of [IETF tag](https://en.wikipedia.org/wiki/IETF_language_tag). If `languageCode` is not in the valid format, nothing happens.

#### setCurrencyCode\(currencyCode\)

* `currencyCode` Type: `string` Description: The currency code to be set, in [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format, e.g. `EUR`. [Supported currency codes](../booking-engine-api/guidelines/supported-currency-codes.md)
* Sets the currency of the booking engine’s localization. The currency code should be in [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format. If `currencyCode` is not in the valid format, nothing happens.

#### setStartDate\(date\)

* `date` Type: `Date` Description: The start date to set
* Sets the start date for a new availability query, the currently loaded availability list is not affected. If `date` is not a valid `Date` object or its value isn’t allowed as a start date, nothing happens. Note: `monthIndex` starts runs from `0` for January to `11` for December ([click here for more details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#Individual_date_and_time_component_values)).

> **Correct** - for 18 January 2019:
>
> ```javascript
> distributor.setStartDate(new Date(2019, 0, 18))
> ```
>
> **Incorrect** - DO NOT DO THIS:
>
> ```javascript
> distributor.setStartDate("2019-01-18")
> ```

#### setEndDate\(date\)

* `date` Type: `Date` Description: The end date to set
* Sets the end date for a new availability query, the currently loaded availability list is not affected. If `date` is not a valid `Date` object, nothing happens. Note: `monthIndex` starts runs from `0` for January to `11` for December ([click here for more details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#Individual_date_and_time_component_values)).

> **Correct** - for 18 December 2019:
>
> ```javascript
> distributor.setEndDate(new Date(2019, 11, 18))
> ```
>
> **Incorrect** - DO NOT DO THIS:
> 
> ```javascript
> distributor.setEndDate("2019-12-18")
> ```

#### setVoucherCode\(code\)

* `code` Type: `string` Description: The voucher code to set
* Sets a new voucher code value.

#### setAdultCount\(adultCount\)

* `adultCount` Type: `number` Description: The number of adults to set
* Sets the number of adults that should be selected by default. Space occupancy for adults on the rate screen will be pre-filled according to this value.

#### setChildCount\(childCount\)

* `childCount` Type: `number` Description: The number of children to set
* Sets the number of children that should be selected by default. Space occupancy for children on the rate screen will be pre-filled according to this value.

#### disableTracking()

* Sets all tracking consents to false (see [Integrations](../integrations/README.md)).

#### enableTracking()

* Sets all tracking consents to true (see [Integrations](../integrations/README.md)).

### Single Mode API functions

#### showRooms\(\)

* Sets the booking engine to the `Rooms` step.

#### showRates\(roomId\)

* `roomId` Type: `string` Description: ID of a room or space to be selected
* Sets the booking engine to the third step \(`Rates`\) as if you had selected a room on the second screen.

### Chain Mode API functions

#### showHotels\(\)

* Sets the booking engine to the `Hotels` step.

#### showRooms\(hotelId\)

* `hotelId` Type: `string` Description: ID of a hotel or other property whose rooms you want to display
* Sets the booking engine to the `Rooms` step.

#### setCity\(cityId\)

* `cityId` Type: `string` Description: ID of a city whose hotels you want to display

### Advanced configuration \(optional\)

As the third parameter, `Mews.Distributor` accepts optional configuration.

```javascript
Mews.Distributor(
    { configurationIds: ['aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'] },
    function (api) {
        api.open();
    },
    { dataBaseUrl: 'https://api.mews-demo.com' }
);
```

#### string dataBaseUrl

* Allows you to define a custom URL which is used for booking engine API calls and static assets.
In the example above, the booking engine will be run against our Demo environment.
