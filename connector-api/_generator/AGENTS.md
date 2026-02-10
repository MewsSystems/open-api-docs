# OpenAPI Spec to Markdown Generator

## Project Overview

This is an OpenAPI Spec to Markdown documentation generator for the Mews Connector API. It reads an OpenAPI/Swagger specification and generates structured Markdown files for API operations, organized by tags.

## Common Commands
```bash
# Install dependencies
npm install

# Generate documentation (uses config.yaml by default)
node index.js

# Generate with CLI overrides
node index.js --source <url-or-path> --output <path> --tags <tag1> --tags <tag2>
```

## Architecture

### Core Flow (index.js)

1. Loads configuration from `config.yaml` or CLI arguments
2. Fetches and validates the OpenAPI spec using `oas-normalize`
3. Creates an `Oas` wrapper and dereferences all `$ref` pointers
4. Groups operations by their first tag
5. Renders a separate markdown file for each tag using Edge.js templates
6. Outputs to `../operations/` directory (one file per tag, e.g., `accounts.md`)

### Type Resolution System (types-resolver.js)

The generator maintains a global registry of discovered types in `types.yaml` to create cross-page links between type definitions and their usage:

- `DISCOVERED_TYPES` map tracks which page/anchor each schema ID lives on
- `SchemasAccumulator` ensures schemas appear only once per page
- Schemas already defined on another page are linked, not duplicated
- `resolvePropertyType()` converts schema references into markdown links

### Page Generation (page.js)

Each operation is processed to extract:
- Request/response examples from the OpenAPI spec
- Request/response schemas (collected via `collect-schemas.js`)
- Operation metadata (summary, description, deprecated status, etc.)

The `resource.edge` template renders:
- Operation summary and description
- Request section with example JSON and schema tables
- Response section with example JSON and schema tables
- Deprecation and restricted warnings

### Schema Collection (collect-schemas.js, collect-jsonschema.js)

Two complementary approaches for walking OpenAPI schemas:
- `collect-schemas.js` - walks dereferenced OAS schema objects
- `collect-jsonschema.js` - walks raw JSON Schema (used for `oneOf` request bodies)

Both populate a `SchemasAccumulator` which deduplicates schemas and decides what to include on the current page versus link to another page.

### Templates (templates/)

Edge.js templates with custom helpers:
- `resource.edge` - main page template (operations list)
- `parameters.edge` - renders schema parameter tables
- `property.edge` - individual property row
- `deprecatedProperty.edge` - deprecated property styling

Custom helpers in `page.js`:
- `helpers.json()` - formats JSON examples with compact arrays
- `helpers.propertyContract()` - determines required/optional status
- `helpers.propertyType()` - resolves and links property types

### Sorting (sorting/)

Custom sort functions ensure consistent output:
- `operationSort.js` - sorts operations within a tag (customizable priority map)
- `schemaSort.js` - sorts schemas in request/response sections
- `propertySort.js` - sorts properties within schema tables

## Key Files

- `index.js` - Entry point and orchestration
- `config.js` + `config.yaml` - Configuration loading
- `page.js` - Page rendering logic and Edge.js setup
- `types-resolver.js` - Cross-page type linking system
- `collect-schemas.js` - Schema extraction from dereferenced OAS
- `collect-jsonschema.js` - Schema extraction from raw JSON Schema
- `template-schema.js` - Converts OAS schemas to template-friendly format
- `jsonschema.js` - Property type resolution and formatting
- `utils.js` - Shared utilities (slugify, ID extraction, etc.)

## Important Patterns

### Schema Deduplication

The types system prevents the same schema from appearing multiple times:
1. First occurrence on a page: schema is rendered in full
2. Subsequent references on same page: skipped (already visible)
3. References to schemas on other pages: rendered as links

### Link Conversion

Generated markdown uses relative links for cross-references:
- Absolute GitBook URLs are converted to relative paths in `absoluteMdLinksToRelative()`
- Base path: `/connector-api/operations/`
- Links point to anchors within markdown files

### Configuration Priority

CLI arguments override config.yaml values:
- `--source` / `-s` - OpenAPI spec URL or file path
- `--output` / `-o` - Output directory for generated markdown
- `--tags` / `-t` - Filter to specific tags (repeatable)

## Output Structure

Generated files in `../operations/`:
- One markdown file per tag (e.g., `accountingitems.md`)
- Each file contains all operations for that tag
- Operations include request/response examples and full schema documentation
- Cross-references between types use relative markdown links
