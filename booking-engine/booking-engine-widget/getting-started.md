# Getting started

By using the Booking Engine Widget, your users can book directly from your website.
To use the Booking Engine Widget, follow these steps:

1. [Install booking engine loader script](#step-1-install-booking-engine-loader-script)
2. [Initialize Booking Engine Widget](#step-2-initialize-booking-engine-widget)
3. [Set up overlay opening](#step-3-set-up-overlay-opening)
4. [All done!](#step-4-all-done)

In addition, you also have the following options:

* [Use callback function to control Widget](#use-callback-function-to-control-widget)
* [Set up as multi-enterprise](#set-up-as-multi-enterprise)

> **Warning:**
> In order to embed the booking engine into your webpage, your site must be securely served over HTTPS.
> Any Booking Engine Widget that is implemented on an insecure HTTP site will be redirected to the [Booking Engine Standalone](../booking-engine-standalone/README.md).


## Step 1: Install booking engine loader script

To use the Booking Engine Widget, you need to install the booking engine loader script with a code snippet provided in the [Installation](#installation) section below.
The script will asynchronously prepare global object `Mews.Distributor` which you're going to use in further steps to initialize the Booking Engine Widget.

### Requirements

Use the code snippet \'as is\' and as described, doing otherwise may cause unexpected problems and is not supported.

* Do **not** place the code snippet anywhere else than in the `<head>`
* Do **not** modify the code snippet in any way and do not attach the `async` attribute
* Do **not** use the code snippet inside an `iframe`
* Do **not** add the [Booking Engine Standalone](../booking-engine-standalone/README.md) URL (e.g. `https://app.mews.com/distributor/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee`) to the `iframe`
* Do **not** pack the contents of the script files that the code snippet references into your own JavaScript bundle
* Do **not** use a booking engine script cached by your server, use the one from this Guide – see [Disabling widget caching](./use-cases/disable-widget-caching.md)

The script file size is kept as minimal as possible (approx 11 kB gzipped) to allow quick web page initialization. Also, serving the script from our CDN servers ensures seamless releases of new features, bug fixes and improvements.

* If you have a Content Security Policy (CSP) set up on your website, you need to enable the domains that the booking engine uses - see [Content Security Policy](#content-security-policy) under [Installation](#installation) below

### Installation

Place the following `<script>` code snippet in the `<head>` of your web page's HTML, preferably as close to the opening `<head>` tag as possible.

**Correct**:
```html
<script src="https://api.mews.com/distributor/distributor.min.js"></script>
```

**Incorrect** - DO NOT DO THIS:
```html
<script src="https://www.your_domain.tld/wp-content/cache/min/1/distributor/distributor.min.js?ver=1628071961"></script>
<script async src="https://api.mews.com/distributor/distributor.min.js"></script>
<script src="https://apps.mews.com/distributor/prerelease/production/3.924.4/distributor.js"></script>
<iframe src="https://api.mews.com/distributor/distributor.min.js"></iframe>
<iframe src="https://api.mews.com/distributor/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"></iframe>
```


> **Warning:** Please double-check that you've added the script as instructed and followed all the requirements above. If the script tag is not used correctly, it can cause unexpected problems even when it seems everything is working. See [Disabling widget caching](./use-cases/disable-widget-caching.md)

### Content Security Policy

If you have a Content Security Policy (CSP) set up on your website, the following domains should be enabled for the booking engine to function correctly:

```text
*.mews.com
https://www.recaptcha.net
https://www.google.com/recaptcha/
https://recaptcha.google.com/recaptcha/
https://www.gstatic.com/recaptcha/
https://pay.datatrans.com/upp/payment/js/secure-fields-1.0.0.js
```

The last URL (pay.datatrans.com) is for [PCI Proxy](https://www.pci-proxy.com/), which is the secure, PCI-DSS compliant solution that is used by __Mews Payments__ to process payment cards.

#### Verifying Content Security Policy Configuration

Once you have configured the Content Security Policy (CSP) for your website to include the necessary domains for the booking engine, it is crucial to ensure that the setup is correct to avoid any operational disruptions. Follow the steps below to verify the configuration:

#### Step 1: Open the Browser Console
1. **Access the Booking Engine Widget on your website:** Navigate through your website to the booking engine.
2. **Open Developer Tools:** Use the keyboard shortcut `Ctrl+Shift+I` (or `Cmd+Option+I` on Mac) to open the developer tools in your browser.
3. **Select the Console Tab:** Focus on the console tab to observe any errors that appear as you proceed through the booking steps.

#### Step 2: Simulate a Booking
1. **Perform Test Transactions:** Go through all the steps of the booking engine, from selection to the checkout screen.
2. **Monitor for Errors:** Carefully monitor the console for any CSP-related errors, specifically looking for messages that indicate a refusal to load resources.

#### Step 3: Confirm Error-Free Configuration
1. **Check for 'Refused to Frame' Errors:** Ensure there are no errors such as `Refused to frame '_URL_' because it violates the following Content Security Policy directive: '....'`. Such errors suggest that the '\_URL\_' URL needs to be included in your CSP under the correct directive.
2. **Validate Functionality:** If no relevant CSP errors appear and the booking process completes successfully, your CSP is configured correctly.

#### Critical Errors
Pay particular attention to any errors related to key functionalities such as reCAPTCHA and payment processing scripts, which are essential for booking security and integrity:
- **reCAPTCHA:** Ensure domains related to Google’s reCAPTCHA are not blocked:
```text
https://www.recaptcha.net
https://www.google.com/recaptcha/
https://recaptcha.google.com/recaptcha/
https://www.gstatic.com/recaptcha/
```
- **Payment Processing:** Verify that the PCI Proxy script is allowed:
```text
  https://pay.datatrans.com/upp/payment/js/secure-fields-1.0.0.js
```
This URL is critical for Mews Payments' PCI-DSS compliant processing capabilities via PCI Proxy.

By following these steps, you can confirm that your Content Security Policy settings are correctly implemented, ensuring the booking engine operates smoothly and securely.


## Step 2: Initialize Booking Engine Widget

After the website has loaded, and the booking engine loader script has prepared the global `Mews.Distributor` object, you can initialize the Booking Engine Widget by calling global `Mews.Distributor` with some arguments.

> **Warning:** Make sure you initialize the Booking Engine Widget by calling `Mews.Distributor` only _after_ the website is loaded, otherwise the initialization will fail or will not fully complete. 
> The easiest way to achieve this is to place the initialization code inside a `<script>` tag just before the closing `</body>` tag, but you can use a different approach if you want.

In the following snippet, replace the placeholder `Your booking engine Configuration ID` with a real Mews Booking Engine Configuration ID from the correct [environment](../booking-engine-api/guidelines/environments.md).
For details of how to obtain your booking engine Configuration ID, see the [FAQ](../FAQ/README.md#where-can-i-get-configuration-id).

```html
<!-- booking engine's initialization call, it creates a new instance of the booking engine. Use your booking engine Configuration ID. -->
<script>
    Mews.Distributor({
        configurationIds: [
            'Your booking engine Configuration ID',
        ],
        openElements: '.distributor-open',
    });
</script>
```

This call creates an isolated (iframe based) overlay on your website and loads the booking engine into it.

> Note: The overlay and booking engine is not visible by default - we're going to solve this in the next section.


## Step 3: Set up overlay opening

To display the booking engine overlay, you should bind its opening to some action, e.g. clicking on a button.
The booking engine can set this binding automatically for you, if you provide the second option `openElements` to `Mews.Distributor` and prepare the HTML elements which will be binded.
You can find more information about `openElements` in the [Options Reference](reference.md#options-reference).

The binding is delegated, so the elements and selectors don't need to exist during load of the website, but you still need to add the HTML elements yourself.
Knowing that, you can for example add the following HTML button with class `distributor-open` (the class name we've used in the initialization code from the previous section), and it  will open the Booking Engine Widget overlay upon a click:

```html
<!-- Example of button for opening the booking engine when openElements is set to '.distributor-open' -->
<button class="distributor-open">Book Now</button>
```

This is just an example, the automatic binding can attach a click event listener to any HTML element.

> Note: Closing of the booking engine is provided in the overlay by default, no configuration is needed from your side.

## Step 4: All done!

This is all you need for the basic setup of the Mews Booking Engine. Here's a summary of what you've done:

- On the web page with this setup, the loader script will prepare `Mews.Distributor`
- After the web page loads, your code will call `Mews.Distributor` - this will initialize the Booking Engine Widget, create an overlay (hidden for now) and bind opening actions to selected HTML elements such as buttons
- When users click these HTML elements, the Booking Engine Widget overlay will open, and they can book through it
- Users can close the overlay at any time and see your web page again

## Use callback function to control Widget

> This step is optional

If you want to have a more customized setup, or you want to call some Javascript API functions on a booking engine instance to control it, you can provide a callback function as the second argument to the initialization call. 

This callback is later called asynchronously with an argument - booking engine instance. By calling methods on this instance you can control the booking engine.

A very common example of this is using custom start and end date selectors that are part of your website and then passing the user’s selection to the booking engine - see [Using your own date inputs](use-cases/using-your-own-date-inputs.md):

```html
<!-- Example of setting custom dates, useful if you have e.g. your own calendars on your website -->
<script>
    Mews.Distributor(
        {
            configurationIds: [
                'Your booking engine Configuration ID'
            ],
            openElements: '.distributor-open',
        },
        function (api) {
            // you can call API functions on a booking engine instance here
            // set different start and end date
            api.setStartDate(new Date(2022, 1, 1));
            api.setEndDate(new Date(2022, 1, 3));
        }
    );
</script>
```

> Note: To see a list of all available Javascript API functions, please consult the Booking Engine Widget [Javascript API reference](./reference.md#javascript-api-reference).


## Set up as multi-enterprise

> This step is optional

The booking engine can run in two basic modes - single enterprise or multiple enterprise. The mode is chosen automatically during initialization, based on the count of configuration ids you have provided in the options.
Whenever two or more hotels are loaded, the booking engine will start in the multi-enterprise mode. That means that it will add one more step to the booking flow - hotel selection.
To add more hotels, simply pass their Configuration IDs into the`configurationIds` array option, as follows.
For details of how to obtain booking engine Configuration ID, see the [FAQ](../FAQ/README.md#where-can-i-get-configuration-id).

```html
<script>
    Mews.Distributor({
        configurationIds: [
            'First configuration id',
            'Second configuration id',
            // and more...
        ],
    });
</script>
```
