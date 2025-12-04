# Getting started

The URL of the Booking Engine Standalone page has the following format:

```text
https://app.mews.com/distributor/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
```

The `aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee` part should be replaced with your Booking Engine Configuration ID.
For details of how to obtain your Booking Engine Configuration ID, see the [FAQ](../FAQ/README.md#where-can-i-get-configuration-id).

> Note:️ Make sure you are using Booking Engine Configuration ID, not Enterprise ID or some other ID.

## Multi-enterprise

If you want to use a Booking Engine with multiple enterprises, you can place several Booking Engine Configurations IDs together, separated by a semicolon.
Note in this case the _theme_ will be pulled from the ID of the first configuration in the URL.

```text
https://app.mews.com/distributor/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee;ffffffff-gggg-hhhh-iiii-jjjjjjjjjjjj
```

## Customization

You can customize the behaviour of the the booking engine by using [Deeplinks](deeplinks.md).
