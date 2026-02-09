# Contribution guidelines for Mews Open API documentation

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
- **Terminology** – The master source for product terminology is the [Mews Glossary for Open API users](glossary.md). Use the same term for the same concept; do not introduce synonyms (e.g. don't mix "enterprise", "property", and "hotel" for the same entity). Reserve "endpoint" or "URL" for technical details where needed.

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
