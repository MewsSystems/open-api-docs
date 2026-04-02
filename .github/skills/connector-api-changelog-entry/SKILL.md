---
name: connector-api-changelog-entry
description: "Add or review Connector API changelog entries in connector-api/changelog/README.md. Use when Connector API reference changes need a changelog update, including breaking, deprecated, removed, or documentation-only updates."
argument-hint: "Describe the Connector API changes to document in the changelog"
---

# Connector API Changelog Entry

Create consistent changelog entries for **Mews Connector API** in `connector-api/changelog/README.md`.

## When to use

- Connector API reference documentation changed and you need to decide whether changelog updates are required.
- You need to add a new changelog entry that follows repository formatting rules.
- You are reviewing a PR and need to validate changelog completeness and wording.

By default, this skill should draft the entry and apply edits to `connector-api/changelog/README.md` when the user asks for implementation.

## Sources of truth

- `CONTRIBUTING.md` (changelog structure, labels, wording)
- `.github/instructions/connector-api-reference.instructions.md` (when changelog is required)
- Existing entries in `connector-api/changelog/README.md` (style and tone)

## Procedure

1. Build the change input from git.

- First, inspect local staged and unstaged changes.
- If there are local changes, use those files as the primary input set.
- If there are no local changes, diff the current branch against `main` (or `origin/main` when available) and use that file list.
- Focus analysis on Connector API documentation sources, especially:
  - `connector-api/operations/*.md`
  - `connector-api/_generator/**`
  - `connector-api/changelog/README.md`

2. Identify the change type.

- Functional changes: new or removed operations, new or removed properties, requiredness changes, type changes, enum changes, or limits changes.
- Non-functional changes: wording, clarifications, examples, formatting, or description-only fixes.

3. Decide whether a changelog entry is required.

- Functional change: changelog update is required.
- Non-functional change: changelog update is optional.
- If adding a non-functional entry, include: `Documentation-only, no change to API.`

4. Collect impacted operations and anchors.

- Use operation display names in links, not URL names.
- Link each affected operation to the correct section in `../operations/*.md`.
- If one change affects multiple operations, list all operations first, then one shared detail bullet.

5. Select the correct label wording.

- Use `**Breaking:**` for contract changes.
- Use `**Deprecated** operation` for deprecated operations.
- Use `**Deprecated:**` for deprecated properties, parameters, or extents.
- Use `**Removed** operations` for removed operations or removed support.
- Mark restricted operations as `(restricted)` or `(restricted operation)`.

6. Write the update block in GitBook format.

- Keep one `{% updates format="full" %}` wrapper in the file.
- Add one `{% update date="YYYY-MM-DD" %}` block for the change date.
- Add a short level-2 heading inside each update block.
- Use operation bullets followed by detail bullets.

7. Keep wording factual and concise.

- Use clear, neutral language.
- Avoid marketing language and vague statements.
- Prefer explicit behavior and constraints.

8. Validate before finalizing.

- Date is today or future date, not past date.
- All operation links resolve and use operation names.
- Label wording exactly matches repository conventions.
- Documentation-only sentence is present when needed.
- Entry is consistent with nearby changelog style.

If no relevant Connector API reference changes are found in either local changes or branch diff, report that no changelog entry is needed from the detected diff and ask for explicit scope if the user still wants one.

## Git input strategy

Use this decision order to automatically discover input:

1. Staged and unstaged changes in the current workspace.
2. If none exist, branch diff against `main` (prefer `origin/main` when present).

Suggested command sequence:

```bash
git diff --name-only --cached
git diff --name-only
git rev-parse --verify origin/main
git diff --name-only origin/main...HEAD
```

Interpretation rules:

- Combine staged and unstaged file lists, then de-duplicate.
- If combined local list is non-empty, do not fall back to `main` diff.
- Use triple-dot branch diff (`origin/main...HEAD`) so only current-branch changes are considered.
- Ignore unrelated files outside Connector API scope for changelog decisions.

## Ready-to-use templates

Use these as starting points, then replace operation names, links, and properties.

Breaking change:

```markdown
- [Get all source assignments (ver 2024-09-20)](../operations/sourceassignments.md#get-all-source-assignments-ver-2024-09-20) (restricted operation):
  - **Breaking:** `EnterpriseIds` property changed from optional to required.
```

Deprecated operation:

```markdown
- [Get all routing rules](../operations/routingrules.md#get-all-routing-rules):
  - **Deprecated** operation. Use [Get all billing automations](../operations/billingautomations.md#get-all-billing-automations) instead.
```

Deprecated property or parameter:

```markdown
- [Get all bills](../operations/bills.md#get-all-bills):
  - **Deprecated:** `ClosedUtc` parameter in request object. Use `IssuedUtc` instead.
```

Removed support:

```markdown
- Add restrictions:
  - **Removed** operations. See [Migration guide](../deprecations/migration-guide-restrictions-set-clear.md) for details.
```

Documentation-only:

```markdown
- [Get all rules](../operations/rules.md#get-all-rules):
  - Fixed description per OpenAPI Specification. Documentation-only, no change to API.
```

## Output checklist

- Correctly classified as functional or non-functional.
- Correct requirement decision for changelog update.
- Correct GitBook updates block structure.
- Correct labels (`Breaking`, `Deprecated`, `Removed`) where applicable.
- Correct operation links and concise details.
- Includes `Documentation-only, no change to API.` when applicable.

## Example prompts

- Add a Connector API changelog entry for a requiredness change in `EnterpriseIds`.
- Review this PR and verify whether `connector-api/changelog/README.md` must be updated.
- Draft a documentation-only changelog note for a wording fix in `Get all rules`.
