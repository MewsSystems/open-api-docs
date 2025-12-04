# Payment cards

## Get payment cards

Fetch details about the listed payment cards, in particular the Authorization state.

### Request

`[ApiBaseUrl]/api/distributor/v1/paymentCards/getAll`

```json
{
    "Client": "My Client 1.0.0",
    "PaymentCardIds": [
        "dc2f8608-9d71-47fd-9d41-ad1a009913c6"
    ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `PaymentCardIds` | array of string | required | Unique identifiers of the [Payment cards](#payment-card). |

### Response

```json
{
    "PaymentCards": [
        {
            "Id": "dc2f8608-9d71-47fd-9d41-ad1a009913c6",
            "AuthorizationState": "Authorizable"
        }
    ]
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `PaymentCards` | array of [Payment cards](#payment-card) | required | The payment cards. |

#### Payment card

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the payment card. |
| `AuthorizationState` | string [Authorization state](#authorization-state) | required | Authorization state of the card. |

#### Authorization state

- `Authorized` - Finite state. The payment card has been authorized.
- `Authorizable` - Non-finite state. The payment card can be authorized.
- `Unauthorizable` - Finite state. The payment card cannot be authorized.


## Authorize payment card

Request authorization of the specified payment card.

### Request

`[ApiBaseUrl]/api/distributor/v1/paymentCards/authorize`

```json
{
    "Client": "My Client 1.0.0",
    "EnterpriseId": "8a51f050-8467-4e92-84d5-abc800c810b8",
    "PaymentCardId": "dc2f8608-9d71-47fd-9d41-ad1a009913c6",
    "BrowserInfo": {
        "ScreenWidth": 2560,
        "ScreenHeight": 1440,
        "ColorDepth": 24,
        "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36",
        "Language": "cs",
        "JavaEnabled": false,
        "TimeZoneOffset": -120
    }
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `EnterpriseId` | string | required | Unique identifier of the enterprise which has access to the payment card. |
| `PaymentCardId` | string | required | Unique identifier of the payment card. |
| `BrowserInfo` | [Browser info](#browser-info) | required | Information about the user's browser. |

#### Browser info

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ScreenWidth` | number | required | Integer value of the [user screen width](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width). |
| `ScreenHeight` | number | required | Integer value of the [user screen height](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height). |
| `ColorDepth` | number | required | Integer value of the [user screen color depth](https://developer.mozilla.org/en-US/docs/Web/API/Screen/colorDepth). |
| `UserAgent` | string | required | Value of the browser [user agent](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent). |
| `Language` | string | required | Value of the browser [language](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language). |
| `JavaEnabled` | boolean | required | Value of the browser information on whether [Java is enabled](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorPlugins/javaEnabled). This will always be `false`. |
| `TimeZoneOffset` | number | required | Integer value of the user [timezone offset](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset). |

### Response

```json
{
    "Id": "94835eb5-24e1-421f-9915-ad1a009de562",
    "PaymentCardId": "dc2f8608-9d71-47fd-9d41-ad1a009913c6",
    "State": "Authorized"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Id` | string | required | Unique identifier of the payment card authorization attempt. |
| `PaymentCardId` | string | required | Unique identifier of the payment card being authorized. |
| `State` | string [Authorization request state](#authorization-request-state) | required | State of the card authorization attempt. |

#### Authorization request state

- `Authorized` - Finite state. The payment card authorization has been successfully completed.
- `Requested` - Non-finite state. The payment card authorization is requested from the user.
- `Pending` - Non-finite state. The payment card authorization is waiting to be requested from the user.
- `Declined` - Finite state. The payment card authorization has been declined.
- `Canceled` - Finite state. The payment card authorization has been canceled.
