# Contribution guidelines for Mews Open API documentation

## Who can contribute

This repository contains the source documentation for the public **Mews Open API** and is intended to be contributed to by a broad group of people, including:

- Mews engineers
- Customer Support (CS) and Technical Partner Success (TPS)
- External partners working on Mews integrations

If you notice something that can be improved, you are welcome to open a pull request – even for small changes such as fixing typos or broken links.

Because this repository is **public**, treat everything you add here as public information:

- Do **not** include secrets (API keys, passwords, tokens, internal URLs not meant for customers).
- Do **not** include customer-identifying data or internal-only operational details.
- Keep examples generic and reusable.

## Branch naming and Jira tickets

Across Mews engineering, branch names usually follow a standard format tied to Jira tickets:

```text
{ticket-key}-{short-description}
```

For example:

```text
con-1234-fix-kiosk-use-case-links
```

For this documentation repository:

### Engineers

- Prefer the standard format with a Jira key where you already have a ticket.
- For small, low-risk documentation-only changes (for example, typos, wording, broken links), you may use a `noticket-…` branch name instead of creating a ticket, e.g.:
  ```text
  noticket-fix-typo-in-getting-started
  noticket-update-pos-api-links
  ```

### CS / TPS / other non-engineering contributors

- Use a simple, descriptive branch name such as:
  ```text
  fix-typo-in-pos-use-case
  clarify-kiosk-payment-example
  ```
- If you already have a Jira ticket, you can include its key in the branch name, but this is **not required** for small documentation fixes.

General guidance:

- Keep branches focused on a single change.
- Use clear pull request titles and fill in the PR template so reviewers understand:
  - what changed,
  - why it changed,
  - and whether it is **documentation-only** or also reflects a functional API change.

## Reviews and compliance

All contributions go through a standard pull request review:

- At least one reviewer will check your change for clarity, correctness, and consistency.
- For larger changes, reviewers may ask follow-up questions or request small adjustments.

From time to time, we may also run internal checks across pull requests for compliance and quality. If a pull request you authored is selected, someone from Mews might contact you to confirm:

- the purpose of the change,
- whether it affects API behavior or only documentation,
- and whether there is any impact on how customer data is processed.

You can make this easy by writing a short summary in the PR description.

## Style guidelines

### Product names

References to Mews products such as **Mews Open API** or **Mews Operations** should be in **bold** and always use the full and correct name.

- **Mews Open API** is the overarching product name for the collection of Mews public APIs.
- Each individual API is also a product, for example **Mews Connector API**, **Mews Operations**, **Mews Channel Manager API**, **Mews Booking Engine API**, **Mews POS API**.

### Key entities

Key entities are referenced with inline code (single backticks), for example `reservation`, `order`, `customer`.

### Terminology and naming

- **API Operations, not Endpoints** – Individual API operations are called API Operations or just Operations, as opposed to Functions or Endpoints.
- **API Operation names** – Normally, API Operations are referred to using a common language name, e.g. "Add reservation", rather than using the URL name, e.g. `reservation/add`. Whichever convention is used, it must be used consistently across the individual API.
- **Terminology** – The master source for product terminology is the [Mews Glossary for Open API users](open-api/glossary.md). Use the same term for the same concept; do not introduce synonyms (e.g. don't mix "enterprise", "property", and "hotel" for the same entity). Reserve "endpoint" or "URL" for technical details where needed.

### Tone of voice

- When writing or editing API documentation, use **clear, neutral, factual** language; prioritize **clarity, correctness, and consistency**.
- Assume the reader is a **developer integrating with Mews** who is busy and often skimming.
- Follow **existing Mews Open API patterns**; and align with the glossary and terminology above.
- Be **concise**:
  - Remove filler words ("basically", "actually", "really", "in order to" → "to").
  - Avoid words that downplay difficulty or assume something is obvious, such as "just", "simply", "obviously", "of course", "clearly", "easy", "everyone knows", and similar.

### GitBook-specific formatting

When appropriate, use [GitBook-specific blocks](https://gitbook.com/docs/creating-content/blocks) over plain Markdown, notably:

- [Hints](https://gitbook.com/docs/creating-content/blocks/hint) over blockquotes.
- [Steppers](https://gitbook.com/docs/creating-content/blocks/stepper) for step-by-step instructions.
- [Updates](https://gitbook.com/docs/creating-content/blocks/updates) for changelog entries.

### Changelog entries

Use [GitBook Updates blocks](https://gitbook.com/docs/creating-content/blocks/updates) as the standard format for changelog entries. This applies to [connector-api/changelog/README.md](connector-api/changelog/README.md) for new entries going forward.

#### Updates block structure

- Wrap changelog entries in one `{% updates format="full" %}` block.
- Add one `{% update date="YYYY-MM-DD" %}` block per date.
- Inside each update block, use a short level-2 heading (for example, `## 25th February 2026` or `## Restrictions removal`).

#### Operation entry format

- List affected API Operations as bullet points with links, then add nested bullets for details.
- If one change applies to multiple operations, list all operations first, then add one shared detail bullet.
- Use operation names in links (for example, `[Get all customers](../operations/customers.md#get-all-customers):`).
- Use backticks for properties and parameters (for example, `UpdatedUtc`, `EnterpriseIds`).

#### Change labels and wording

- Use `**Breaking:**` for contract changes such as requiredness, type, or limits.
- Use `**Deprecated** operation` for deprecated operations and `**Deprecated** operation extent` for deprecated extents, properties, or parameters. Add replacement guidance when available.
- Use `**Removed** operations` for removed operations or removed support.
- For documentation-only changes, explicitly state `Documentation-only, no change to API.`
- Mark restricted operations as `(restricted)` or `(restricted operation)` in operation bullets or detail bullets.

#### Additional notes

- Cross-cutting changes that are not tied to a single API Operation can be added as top-level bullets.
- Keep wording factual and consistent with existing changelog entries.
- The date should reflect the date of the change, not the date of the changelog entry. It should be today's date or future date, not a past date.

#### Examples

Single operation update:

```markdown
- [Get all customers](../operations/customers.md#get-all-customers):
  - Extended [Customer](../operations/customers.md#customer) response object with `CreatorProfileId` and `UpdaterProfileId` properties.
```

One change affecting multiple operations:

```markdown
- [Get all billing automations](../operations/billingautomations.md#get-all-billing-automations):
- [Add billing automations](../operations/billingautomations.md#add-billing-automations):
- [Update billing automations](../operations/billingautomations.md#update-billing-automations):
  - Extended [Billing automation](../operations/billingautomations.md#billing-automation) response object with `UpdatedUtc` property.
```

Breaking, deprecated, and removed wording:

```markdown
- [Get all source assignments (ver 2024-09-20)](../operations/sourceassignments.md#get-all-source-assignments-ver-2024-09-20) (restricted operation):
  - **Breaking:** `EnterpriseIds` property changed from optional to required.
- [Get all routing rules](../operations/routingrules.md#get-all-routing-rules):
  - **Deprecated** operation. Use [Get all billing automations](../operations/billingautomations.md#get-all-billing-automations) instead.
- [Get all bills](../operations/bills.md#get-all-bills):
  - **Deprecated:** `ClosedUtc` parameter in request object. Use `IssuedUtc` instead.
- Add restrictions:
  - **Removed** operations. See [Migration guide](../deprecations/migration-guide-restrictions-set-clear.md) for details.
```

Documentation-only change:

```markdown
- [Get all rules](../operations/rules.md#get-all-rules):
  - Fixed description per OpenAPI Specification. Documentation-only, no change to API.
```
