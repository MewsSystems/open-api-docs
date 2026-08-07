# OpenAPI Spec to Markdown Generator

This is a tool for generating Markdown documentation from an OpenAPI spec.

## Setup

1. Make sure you have [Node.js](https://nodejs.org/) in the version from [.nvmrc](.nvmrc) and `npm` installed
2. In `_generator` run `npm install`

## Usage

Without providing any arguments, the generator will pick up the configuration from [config.yaml](config.yaml) file, which reads the specification from the demo environment (`api.mews-demo.com`).

```shell
# cd _generator
node index.js
```

Alternatively, you can override individual or all configuration arguments via CLI:

```shell
node index.js --source https://api.mews.com/swagger/connector/swagger.yaml --output some/alternative/output/path --tags bills --tags accounts
```

## Automatic regeneration

The [Regenerate Connector API reference](../../.github/workflows/regenerate-connector-api-reference.yml) workflow runs the generator every Thursday and opens a pull request when the output changes. It can also be triggered manually.
