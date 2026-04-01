# Table of contents

* [Loyalty Partner API](README.md "Overview")
* [Getting started](getting-started.md)
* [Changelog](changelog.md)
* [Glossary](glossary.md)

## Workflows

* [Workflows](workflows/overview.md "Overview")
* [Search members](workflows/search-members.md)
* [Enroll customer](workflows/enroll-customer.md)
* [Link or unlink membership](workflows/link-or-unlink-membership.md)
* [List memberships](workflows/list-memberships.md)

## Usage guidelines <a href="#guidelines" id="guidelines"></a>

* [Authentication](guidelines/authentication.md)
* [Requests](guidelines/requests.md)
* [Errors](guidelines/errors.md)

## API Operations (partner) <a href="#api-operations" id="api-operations"></a>

* ```yaml
  type: builtin:openapi
  props:
    models: true
    downloadLink: true
  dependencies:
    spec:
      ref:
        kind: openapi
        spec: loyalty-partner-api
  ```
