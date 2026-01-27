# Table of contents

* [Mews POS API](README.md "Overview")
* [Getting started](getting-started/README.md)
* [Usage guidelines](guidelines/README.md)
  * [Authentication](guidelines/authentication.md)
  * [Requests](guidelines/requests.md)
  * [Responses](guidelines/responses.md)
  * [Environments](guidelines/environments.md)
  * [Relationships](guidelines/relationships.md)
  * [Filtering](guidelines/filtering.md)
  * [Sparse fieldsets](guidelines/sparse-fieldsets.md)
* [Concepts](concepts/README.md)
* [Use cases](use-cases/README.md)
  * [Inventory management](use-cases/inventory.md)
  * [Table booking](use-cases/table-booking.md)
  * [Digital ordering](use-cases/digital_ordering.md)
* [API Operations](operations/README.md)
  * ```yaml
    props:
      models: true
      downloadLink: true
    type: builtin:openapi
    dependencies:
      spec:
        ref:
          kind: openapi
          spec: pos-api
    ```
* [API Events](events/README.md)
  * [Webhooks](events/webhooks.md)
  * [Webhook security](events/wh-security.md)
* [Deprecations](deprecations/README.md)
* [Changelog](changelog/README.md)
  * [Changelog 2024](changelog/changelog2024.md)
