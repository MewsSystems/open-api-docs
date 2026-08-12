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

- Run the detect script from the repository root, exactly as written:

  ```bash
  node .claude/skills/connector-api-changelog-entry/scripts/detect-changed-connector-api-files.mjs
  ```

  It outputs a unified diff of all changed `connector-api/` files (excluding `_generator/`).
- A full regeneration diff can exceed the output limit, and a truncated diff looks exactly like a complete one. When many files changed, list them with `--no-diff` and then request each one with `--path`, rather than asking for the whole diff at once.
- The script checks staged/unstaged changes first; if none, diffs the branch against `main`.
- The script relies on `git diff`, which does not see untracked files. A brand-new operations page is therefore invisible until it is staged — and the generator writes one page per OpenAPI tag, so a new tag in the specification produces exactly that. Run `git add -A -- connector-api/` first when the working tree may contain new files.
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
- If one change affects multiple operations, list all operations first, then one shared detail bullet. This also covers the same logical change applied to parallel objects (for example a request parameter added to both the `add` and `set` variants of an operation) – list both operations, then name both objects in one bullet using "respectively".

5. Select the correct label wording.

- Use `**Breaking:**` for contract changes.
- Use `**Deprecated** operation` for deprecated operations.
- Use `**Deprecated**` with clarification for deprecated properties, parameters, or extents.
- Use `**Removed** operations` for removed operations or removed support.
- Mark restricted operations as `(restricted)` or `(restricted operation)`.

6. Write the update block in GitBook format.

- Keep one `{% updates format="full" %}` wrapper in the file.
- Add one `{% update date="YYYY-MM-DD" %}` block per topic. Several blocks may share the same date.
- Add a short level-2 heading inside each update block. The heading names the change, for example `## Cancellation policy management operations`. Do not title a block by its date.
- Use `## <Month YYYY> updates` only for a large end-of-month batch that has no single topic.
- Group changes by topic rather than one block per operation. Two to four blocks per regeneration is typical; fold a small unrelated change into a neighbouring block instead of giving it its own.
- Use operation bullets followed by detail bullets.

7. Keep wording factual and concise.

- Use clear, neutral language.
- Avoid marketing language and vague statements.
- Keep each detail bullet to one sentence that says what changed. Name the new operation, object, property, or enum value and link to it.
- Do not restate what the reference page already documents – field semantics, defaults, `null` and empty-collection handling, limits, expiry, or validation rules belong on the operation page, not in the changelog. Exception: a **Breaking** change states the behavior difference, because that is the change itself.

8. Update deprecations list when applicable.

- When the changelog entry includes a deprecated operation, property, parameter, extent, or enum value, also update `connector-api/deprecations/README.md`.
- Add the item to the correct table: **Deprecated operations**, **Deprecated properties**, **Deprecated enum values**, or **Deprecated functionality**.
- Use the same link text and anchor as in the changelog entry.
- Set the **Deprecated** date to match the changelog entry date.
- Leave the **Discontinued** column as `-` unless a specific discontinuation date is already known.
- Do not add entries for changes that are **Breaking** or **Removed** — only for items explicitly marked **Deprecated**.

9. Validate before finalizing.

- Date is today or future date, not past date.
- Block tags balance. Run the check below from the repository root – the two counts must be equal and the wrapper count must be `1`. An unbalanced tag is easy to introduce when splitting or merging blocks and it breaks rendering for every entry below it.

  ```bash
  grep -c '{% update date' connector-api/changelog/README.md
  grep -c '{% endupdate %}' connector-api/changelog/README.md
  grep -c '{% updates format' connector-api/changelog/README.md
  ```
- All operation links resolve and use operation names.
- Label wording exactly matches repository conventions.
- Documentation-only sentence is present when needed.
- Entry is consistent with nearby changelog style.
- `connector-api/deprecations/README.md` updated when deprecations are present.

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
  - **Deprecated** operation extent: `ClosedUtc` parameter in request object. Use `IssuedUtc` instead.
```

Removed support:

```markdown
- Add restrictions:
  - **Removed** operations. See [Migration guide](../deprecations/migration-guide-restrictions-set-clear.md) for details.
```

Same logical change across parallel operations:

```markdown
- [Add rates](../operations/rates.md#add-rates):
- [Set rates](../operations/rates.md#set-rates):
  - Extended [Dependent rate pricing parameters](../operations/rates.md#dependent-rate-pricing-parameters) and [Dependent rate set pricing parameters](../operations/rates.md#dependent-rate-set-pricing-parameters) respectively with optional `TaxCodes` request parameter.
```

New operations:

```markdown
- [Add cancellation policies](../operations/cancellationpolicies.md#add-cancellation-policies) (restricted operation):
- [Update cancellation policies](../operations/cancellationpolicies.md#update-cancellation-policies) (restricted operation):
- [Delete cancellation policies](../operations/cancellationpolicies.md#delete-cancellation-policies) (restricted operation):
  - New operations to create, update and delete cancellation policies (beta).
```

Documentation-only:

```markdown
- [Get all rules](../operations/rules.md#get-all-rules):
  - Fixed description per OpenAPI Specification. Documentation-only, no change to API.
```

## Output checklist

- Correctly classified as functional or non-functional.
- Correct requirement decision for changelog update.
- Correct GitBook updates block structure, with balanced `{% update %}` and `{% endupdate %}` tags.
- Topical heading per block, changes grouped by topic.
- Detail bullets are one sentence each and do not repeat reference-page semantics.
- Correct labels (`Breaking`, `Deprecated`, `Removed`) where applicable.
- Correct operation links and concise details.
- Includes `Documentation-only, no change to API.` when applicable.
- `connector-api/deprecations/README.md` updated for any deprecated items.
