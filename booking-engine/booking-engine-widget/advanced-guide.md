# Advanced guide

## Full example

Here you can see a full example with all possible options used, with their default values.
To get further information about the options and Javascript API calls, see the [Reference](reference.md).

> **Note:** Direct configuration of the booking engine through the options has been deprecated and will be disabled in future.
> Instead use Booking Engine Configuration in **Mews Operations**. The only supported options now are `configurationIds` and `openElements`.

**Important:** This is just an example, do not copy this directly to your website!

```html
<script>
Mews.Distributor({
    // required
    configurationIds: [
        'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
    ],
    // optionals
    openElements: '',
},
function(distributor) {
    // Always available api calls
    // distributor.open();
    // distributor.setLanguageCode(languageCode);
    // distributor.setCurrencyCode(currencyCode);
    // distributor.setStartDate(date);
    // distributor.setEndDate(date);
    // distributor.setVoucherCode(code);
    // Singlehotel mode api calls
    // distributor.showRooms();
    // distributor.showRates(roomId);
    // Multihotel mode api calls
    // distributor.showHotels();
    // distributor.showRooms(hotelId);
    // distributor.setCity(cityId);
});
</script>
```

> **Note:** Make sure you have just one `<script>` tag containing the call to `Mews.Distributor` on your page.

## Payment card storage

Payment card storage is used to safely collect and store information about a customer's payment card. Currently the Mews Booking Engine supports these payment card storage options:

* [PCI Proxy](https://www.pci-proxy.com)

## Payment gateways

Payment gateways are used to securely handle customer payments. Configuration is done once, when the property is set up, and with the Mews Booking Engine this can be done with minimal setup.
Mews Booking Engine currently supports these payment gateways:

* [Mews Payments](https://www.mews.com/en/products/payments)

Using a payment gateway is not mandatory, because reservations can be created without providing payment card information.

> **Important:** The PCI Security Standard requires you to use an **SSL Certificate** on your website to be allowed to collect any payment information.
> For information on Mews PCI compliance, including current certification, please follow the links below.
>
> * [Mews PCI compliance](https://mews.force.com/s/article/pci-compliance?language=en_US)
> * [Mews PCI certificate](https://www.mews.com/en/platform-documentation)
