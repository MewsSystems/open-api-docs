---
name: connector-api-changelog-entry
description: "Add or review Connector API changelog entries in connector-api/changelog/README.md. Use when Connector API reference changes need a changelog update, including breaking, deprecated, removed, or documentation-only updates."
argument-hint: "Describe Connector API changes to document in the changelog"
---

# Connector API Changelog Entry

Create consistent changelog entries for **Mews Connector API** in `connector-api/changelog/README.md`.

## When to use

- Connector API reference documentation changed and you need to decide whether changelog updates are required.
- You need to add a new changelog entry that follows repository formatting rules.
- You are reviewing a PR and need to validate changelog completeness and wording.

## Gotchas

- **Date must not be in the past.** Use today's date or a future date. Never backdate an entry.
- **Label wording is exact.** `**Breaking:**` has a colon. `**Deprecated** operation` has no colon (for operations). `**Removed** operations` is plural. Check `CONTRIBUTING.md` if unsure.
- **Use triple-dot diff.** `origin/main...HEAD` — not double-dot. Double-dot includes commits from main that aren't on your branch.

## Sources of truth

- `CONTRIBUTING.md` (changelog structure, labels, wording)
- `.github/instructions/connector-api-reference.instructions.md` (when changelog is required)
- Existing entries in `connector-api/changelog/README.md` (style and tone)

## Procedure

Draft the entry and apply edits to `connector-api/changelog/README.md` unless the user asks only for a review.

1. Build the change input from git.

- Run [detect changed Connector API files](./scripts/detect-changed-connector-api-files.sh) to collect input. The script outputs a unified diff of all changed `connector-api/` files (excluding `_generator/`).
- The script checks staged/unstaged changes first; if none, diffs the branch against `main`.
- Use the diff as the primary input — no need to read individual operation files unless the diff is absent or unclear.
- If the script fails or you need to run git commands manually, read [`references/git-input-strategy.md`](./references/git-input-strategy.md).

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
