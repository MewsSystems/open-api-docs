# Multiple enterprises and pre-selected locations

This guide will show you how to open the booking engine with multiple enterprises and set a pre-selected city or location.

> **Important:** Make sure you fulfill all the required [Prerequisites](prerequisites.md). Without doing so, the code of the use cases can be hard to understand or the behavior of the code can differ from what you expect.

## Sample code

Below is some sample HTML and Javascript code to demonstrate the functionality. Numbered notes beneath the code snippet relate to the numbered comments within the code.

The sample uses an example scenario of three hotels, with two of them in the same city location:

* One hotel in Paris
* One hotel in London
* Another hotel in London

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <!-- 1. Install booking engine loader script as close to the opening <head/> tag as possible -->
        <script src="https://api.mews.com/distributor/distributor.min.js"></script>
        <title>My page</title>
    </head>
    <body>
        <!-- 2. Add buttons for opening the booking engine with specific location pre-selected -->
        <button disabled type="button" id="london-button">Loading...</button>
        <button disabled type="button" id="paris-button">Loading...</button>

        <script>
            // 3. Initialize Booking Engine Widget just before the closing </body> tag.
            Mews.Distributor(
                // 3.1 Set Configuration IDs of your booking engine.
                {
                    configurationIds: [
                        'Configuration id of first London hotel',
                        'Configuration id of second London hotel.',
                        'Paris hotel configuration id',
                    ],
                },
                // Add callback which will make the buttons open Booking Engine Widget and set the city/location.
                function (api) {
                    const initializeButton = (buttonId, cityId, buttonText) => {
                        const buttonElement = document.getElementById(buttonId);

                        buttonElement.addEventListener('click', event => {
                            event.preventDefault();

                            // Use Booking Engine Widget API to set the city/location and open the Booking Engine Widget.
                            api.setCity(cityId);
                            api.open();
                        });

                        buttonElement.innerHTML = buttonText;
                        buttonElement.disabled = false;
                    };

                    // 3.2 Prepare the City IDs.
                    const londonCityId = 'Your London city id';
                    const parisCityId = 'Your Paris city id';

                    initializeButton('london-button', londonCityId, 'London hotels');
                    initializeButton('paris-button', parisCityId, 'Paris hotel');
                }
                // 4. Note - this guide is written for the Production environment.
            );
        </script>
    </body>
</html>
```

### 1. Install booking engine loader script

For more details, see [Install booking engine loader script](../getting-started.md#step-1-install-booking-engine-loader-script).

### 2. Add buttons for opening the booking engine with specific city pre-selected

Buttons are disabled on page load, so users can't click the buttons until the Booking Engine Widget is ready to be used. We enable it later when it's ready.

### 3. Initialize Booking Engine Widget

For more details, see [Initialize Booking Engine Widget](../getting-started.md#step-2-initialize-booking-engine-widget).
If you are not sure where to find the Configuration ID, see the [FAQ](../../FAQ/README.md#where-can-i-get-configuration-id).

Even though it's called 'location' in the User Interface, the API needs a City ID.
If you are not sure where to find the City ID, see the [FAQ](../../FAQ/README.md#where-can-i-get-city-id) for details.
If you have several hotels from the same location, the then the City ID is the same in all of them.

### 4. This guide is written for the Production environment

If you want to test this code in a different environment, please refer to our guide for [Testing in the Demo environment](testing-in-demo-environment.md).

## Conclusion

In this guide, you've learned how to use a multi-enterprise booking engine and how to set a pre-selected city/location.
The Booking Engine Widget Javascript API supports more than just setting dates - see the full [Javascript API Reference](../reference.md) to find other options you could use.
