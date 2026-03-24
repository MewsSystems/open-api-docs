---
description: "Use when editing Connector API reference documentation, generated operation pages under connector-api/operations, or Connector API changelog entries. Covers generated-doc handling and when connector-api/changelog/README.md must be updated."
name: "Connector API Reference Documentation"
applyTo: "connector-api/operations/*.md, connector-api/changelog/README.md"
---

# Connector API Reference Documentation

- Treat files in [connector-api/operations](../../connector-api/operations) with `<!-- AUTOMATICALLY GENERATED, DO NOT MODIFY -->` as generated output.
  - Don't edit those files directly. Assume lasting changes must be made in the generator or its source inputs under [connector-api/\_generator](../../connector-api/_generator), then regenerated.
  - If a task requires changes in [connector-api/operations](../../connector-api/operations), do not treat manual edits there as the source of truth unless the user explicitly asks for that.
  - When reviewing code, assume the changes in [connector-api/operations](../../connector-api/operations) were made through the generator and don't comment on the fact they were modified.
- When reference documentation changes include functional API changes, such as new operations, removed operations, new properties, removed properties, requiredness changes, type changes, enum changes, or limit changes, ensure that [connector-api/changelog/README.md](../../connector-api/changelog/README.md) is updated in the same change.
- When reference documentation changes are non-functional, such as wording, clarifications, examples, formatting, or description-only fixes, updating [connector-api/changelog/README.md](../../connector-api/changelog/README.md) is optional.
  - If you add a changelog entry for a non-functional documentation update, include the sentence `Documentation-only, no change to API.`
- Follow the changelog rules in [CONTRIBUTING.md](../../CONTRIBUTING.md): use one GitBook `{% updates format="full" %}` block, one `{% update date="YYYY-MM-DD" %}` block per date, operation bullets with links, and the required labels such as `**Breaking:**`, `**Deprecated:**`, and `**Removed**`.
- Keep Connector API changelog wording factual and consistent with existing entries in [connector-api/changelog/README.md](../../connector-api/changelog/README.md).
