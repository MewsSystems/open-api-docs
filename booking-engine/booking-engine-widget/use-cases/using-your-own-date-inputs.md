# Using your own date inputs

This section will show you how to use an HTML form to capture dates from the user, then submit those dates when opening the Booking Engine Widget.

> **Important:** Make sure you fulfill all the required [Prerequisites](prerequisites.md). Without doing so, the code of the use cases can be hard to understand or the behavior of the code can differ from what you expect.

## Sample code

Below is some sample HTML and Javascript code to demonstrate the functionality. Numbered notes beneath the code snippet relate to the numbered comments within the code.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <!-- 1. Install booking engine loader script as close to the opening <head> tag as possible. -->
        <script src="https://api.mews.com/distributor/distributor.min.js"></script>
        <title>My page</title>
    </head>
    <body>
        <!-- 2. Add form with date inputs. -->
        <form id="date-form">
            <label for="start">Start date:</label>
            <input type="date" id="start" name="start" required />
            <label for="end">End date:</label>
            <input type="date" id="end" name="end" required />
            <input type="submit" id="dates-submit" value="Loading..." disabled />
        </form>

        <script>
            // 3. Initialize Booking Engine Widget just before the closing </body> tag.
            Mews.Distributor(
                // Set Configuration ID of your booking engine.
                {
                    configurationIds: ['Your booking engine Configuration ID'],
                },
                // Add callback which will enable Submit button and open the Booking Engine Widget upon button click.
                function (api) {
                    // Listen on submit and when user submits, open booking engine with given dates.
                    const listenOnSubmit = () => {
                        // Find the form in DOM and listen on submit.
                        const form = document.getElementById('date-form');

                        form.addEventListener('submit', event => {
                            // Don't use the default submit button behavior. We want to handle it ourselves.
                            event.preventDefault();
                            // Get the dates from the date form.
                            const { start, end } = event.target.elements;
                            const [startYears, startMonths, startDays] = start.value.split('-');
                            const [endYears, endMonths, endDays] = end.value.split('-');

                            const startDate = new Date(startYears, startMonths - 1, startDays);
                            const endDate = new Date(endYears, endMonths - 1, endDays);
                            // Use the Booking Engine Widget Javascript API to set the dates in the widget and open it.
                            api.setStartDate(startDate);
                            api.setEndDate(endDate);
                            api.open();
                        });
                    };

                    listenOnSubmit();

                    // Enable the submit button, because the Booking Engine Widget is ready to be used.
                    const enableSubmit = () => {
                        const submitButton = document.getElementById('dates-submit');
                        submitButton.value = 'Submit';
                        submitButton.disabled = false;
                    };
                    enableSubmit();
                }
                // 4. Note - this guide is written for the Production environment.
            );
        </script>
    </body>
</html>
```

### 1. Install booking engine loader script

For more details, see [Install booking engine loader script](../getting-started.md#step-1-install-booking-engine-loader-script).

### 2. Add form with date inputs

We've added just a simple form with date inputs as an example to give you an idea of how to connect your own HTML elements.
On your own page you can use any date inputs you want, you just need to connect them with the Booking Engine Widget.
The submit button in the form is disabled at page load, so users can't submit the form before the form and the Booking Engine Widget are ready to be used. We enable it later when they're ready.

### 3. Initialize Booking Engine Widget

For more details, see [Initialize Booking Engine Widget](../getting-started.md#step-2-initialize-booking-engine-widget).
If you are not sure where to find the Configuration ID, see the [FAQ](../../FAQ/README.md#where-can-i-get-configuration-id).

### 4. This guide is written for the Production environment

If you want to test this code in a different environment, please refer to our guide for [Testing in the Demo environment](testing-in-demo-environment.md).

## Conclusion

In this guide, you've learned how to add a simple form with date inputs to your page and connect its submit button to the Booking Engine Widget.
So when users select their dates and submit the form, the Booking Engine Widget will open with those dates already selected.
The Booking Engine Widget Javascript API supports more than just setting dates - see the full [Javascript API Reference](../reference.md) to find other options you could use.
