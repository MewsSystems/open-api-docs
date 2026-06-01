<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->
# Accounts Receivable

## Get Accounts Receivable status

Returns the activation lifecycle status of Accounts Receivable for the specified enterprise, together with a flag indicating whether wire transfer is enabled. Partners use these signals to switch between legacy posting and the Mews clearing-account model. Note this operation supports [Portfolio Access Tokens](../concepts/multi-property.md).

An enterprise must be treated as Accounts Receivable enabled only when the response is exactly `{ "Status": "Active", "IsWireTransferEnabled": true }`. In any other combination — including any other `Status` value, `Status = null`, or `IsWireTransferEnabled = false` — the enterprise must be treated as not enabled and the legacy posting flow must be used.

### Request

`[PlatformAddress]/api/connector/v1/accountsReceivable/getStatus`

```javascript
{
  "ClientToken": "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  "AccessToken": "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  "Client": "Sample Client 1.0.0",
  "EnterpriseId": "851df8c8-90f2-4c4a-8e01-a4fc46b25178"
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `ClientToken` | string | required | Token identifying the client application. |
| `AccessToken` | string | required | Access token of the client application. |
| `Client` | string | required | Name and version of the client application. |
| `EnterpriseId` | string | optional | Unique identifier of the enterprise. Required when the access token has portfolio scope. |

### Response

```javascript
{
  "Status": "Active",
  "IsWireTransferEnabled": true
}
```

| Property | Type | Contract | Description |
| :-- | :-- | :-- | :-- |
| `Status` | [Accounts Receivable status](accountsreceivable.md#accounts-receivable-status) | optional | Activation lifecycle status of Accounts Receivable for the enterprise. `null` means the property has not opted into Accounts Receivable (no AR configuration row exists). |
| `IsWireTransferEnabled` | boolean | required | Whether the enterprise has the wire-transfer feature enabled. Independent from `Status` — the two signals may diverge in some markets in the future. |

#### Accounts Receivable status

* `ActivationStarted` - Activation has been requested and the onboarding trigger is in flight. No Business Account exists yet and wires cannot flow through Mews. Partners should keep using legacy posting.
* `Onboarding` - Onboarding has been triggered and is awaiting compliance review. Wire-transfer flows are not yet possible through Mews. Partners should keep using legacy posting.
* `Active` - Accounts Receivable is fully active. Wires land at Mews IBANs and are exposed via ledgerEntries/getAll. Partners should use the clearing-account model.
* `Offboarding` - Deactivation has been requested and the property is in the cooldown window. Late wires can still arrive at the still-open payer IBANs for up to 60 days, so partners must continue using the clearing-account model.
* `Disabled` - Cooldown has completed and payer IBANs are closed. No further wires are possible through Mews. Partners should revert to legacy posting.
