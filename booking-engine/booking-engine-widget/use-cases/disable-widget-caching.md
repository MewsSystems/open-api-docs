# Disabling widget caching

> **Important:** Do not use a booking engine script cached by your server!

In the dynamic world of web development, ensuring your site's features remain up-to-date without manual intervention is crucial for providing a seamless user experience. One such feature critical to keeping your site current is the script `distributor.min.js` provided by **Mews**. This script is a reverse proxy for always delivering the latest version of the distributor file. However, when this script is cached, it can lead to serving an outdated version, depriving users of new features and enhancements. It may also cause the booking engine to malfunction.

## Installation

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

## Excluding scripts from WordPress caching

WordPress and many popular caching plugins optimize website performance by caching site content. While beneficial for loading speed and reducing server load, caching static resources like JavaScript files can inadvertently freeze them to an older version. Here's how to ensure `distributor.min.js` remains dynamic and updated by excluding it from WordPress and caching plugins' caching mechanisms.

### Using WordPress plugins

Several WordPress plugins allow you to exclude specific scripts or files from being cached. While the steps may vary depending on the plugin you use, the general approach is to add the script's URL to the plugin's exclusion settings. Look for options labeled as "Never Cache the Following Pages," "Excluded Files," or similar. Enter the script's URL to ensure it's not cached:

```
https://api.mews.com/distributor/distributor.min.js
```

## Configuring popular WordPress caching plugins

This config might vary depending on the version of the plugin you are using. The following instructions are based on the latest versions of the plugins at the time of writing.

### WP Super Cache

1. Go to `Settings` > `WP Super Cache` in your WordPress dashboard.
2. Navigate to the `Advanced` tab.
3. Scroll down to the section `Add here strings (not a filename) that forces a page not to be cached.`
4. Enter `distributor.min.js` and save your changes.

### W3 Total Cache

1. Go to `Performance` > `Browser Cache` in the WordPress dashboard.
2. Under the `Prevent caching of objects after settings change` section, add `distributor.min.js` to the `Custom file list`.
3. Save all settings.

### WP Rocket

1. Navigate to `Settings` > `WP Rocket` and click on the `File Optimization` tab.
2. Scroll to the `Exclude files from Minification` section.
3. Add the URL `https://api.mews.com/distributor/distributor.min.js` to the exclusion list.

Ensuring `distributor.min.js` is excluded from caching mechanisms is paramount for leveraging the latest advancements and features without manual updates. By following these steps, you can maintain your site's performance while ensuring your visitors always have access to the most current functionalities.

## Conclusion
Only a few examples of how to do this have been given, your implementation case might differ. You should be able to verify and confirm that our script is not cached on your side. This can be done simply by displaying the source code of your website and double-checking the script tag with the url. Please be aware that a sub-optimal implementation may impact your eligibility for ongoing support from Mews.
