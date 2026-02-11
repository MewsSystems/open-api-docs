# Agent instructions for Mews Open API documentation

## Purpose of the repository

This repository contains the source documentation for **Mews Open API**. The public documentation is hosted at <https://docs.mews.com/> and is published using [GitBook](https://www.gitbook.com/). The GitBook site consists of multiple spaces published from a single monorepo:

- **Open API** ([open-api/](open-api/)) – Landing site
- **Booking Engine** ([booking-engine/](booking-engine/))
- **Channel Manager API** ([channel-manager-api/](channel-manager-api/))
- **Connector API** ([connector-api/](connector-api/))
- **POS API** ([pos-api/](pos-api/))

## Contribution guidelines

Follow [CONTRIBUTING.md](CONTRIBUTING.md) for product names, key entities, and terminology. When generating or editing API documentation, follow the [Documentation tone of voice](#documentation-tone-of-voice-for-ai-agents) section below.

## GitBook editing

Use <https://gitbook.com/docs/skill.md> for GitBook-specific Markdown syntax and configuration files.

## Documentation tone of voice (for AI agents)

When generating or editing **API documentation** in this repository, follow these rules.

### 1. Overall goals

- Prioritize **clarity, correctness, and consistency** over style.
- Assume the reader is a **developer integrating with Mews** who is busy and often skimming.
- Optimize for **"time to first successful call"**: readers should quickly understand *what this does, how to call it, and what to watch out for*.

### 2. Voice and tone

- Use a **clear, neutral, factual** tone.
  - Not marketing copy. Not chatty blog style.
- Be **confident but not arrogant**. State behavior directly, without hedging or hype.
- Be **empathetic to integrators**:
  - Call out common pitfalls, edge cases, and best practices.
  - Explain why something matters when it's not obvious.
- Use **plain language**:
  - Prefer short, concrete sentences.
  - Avoid idioms, jokes, and culture-specific references.

Examples:

- Prefer: "Use this operation to retrieve reservations updated after the given time."
- Avoid: "This awesome endpoint lets you easily fetch all your shiny new reservations!"

### 3. Language and readability

- Write at roughly an **upper-intermediate / 8th-grade** reading level.
- Use **active voice** and present tense:
  - "The operation returns…" not "The operation will be returned…".
- Avoid jargon unless it's standard for API consumers. When you must use a term of art, briefly anchor it with context or an example.
- Be **concise**:
  - Remove filler words ("basically", "actually", "really", "in order to" → "to").
  - Avoid words that downplay difficulty or assume something is obvious, such as "just", "simply", "obviously", "of course", "clearly", "easy", "everyone knows", and similar.
  - Prefer one precise sentence over two vague ones.

### 4. Structure and consistency

- **Follow existing patterns** from the Mews Open API docs. Do not invent new section layouts if an established one exists.
- When describing operations:
  - Use the human-readable **operation name** (e.g. "Add reservation") in headings.
  - Refer to the URL path only in the Request snippet or when strictly necessary.
- When describing properties:
  - Focus on **what the property represents**, whether it's **required/optional**, and any **constraints or relationships** (IDs, enums, timezones, currencies, etc.).
  - Avoid restating the type in the description ("String representing…" is usually redundant).

Example property description:

- **Good:** `CreatedUtc | string | required | UTC date and time when the reservation was created.`
- **Poor:** `CreatedUtc | string | required | This is a string field that contains the created date.`

### 5. Terminology and naming

- Use **Mews product names** correctly and consistently (e.g. **Mews Open API**, **Mews Connector API**). See [CONTRIBUTING.md](CONTRIBUTING.md).
- Align with the [Open API glossary](glossary.md) and existing docs:
  - Use the same term for the same concept across the documentation.
  - Do not introduce synonyms (e.g. don't mix "enterprise", "property", and "hotel" for the same entity).
- Use **"API operation"** (or just "operation") in documentation for public consumers. Reserve "endpoint" or "URL" for technical details where needed.

### 6. Do and don't cheat sheet

**Do**

- Explain what the operation does, when to use it, and important caveats.
- Surface constraints and edge cases explicitly (e.g. rate limits, size limits, time zones).
- Use examples that match **realistic** partner usage.

**Don't**

- Don't use marketing language ("powerful", "game-changing", "seamlessly").
- Don't be vague ("handles reservations"); be concrete ("creates a new reservation in the specified enterprise").
- Don't contradict or diverge from existing Mews Open API patterns without a clear reason.
- Don't omit breaking or surprising behavior just because it's "technical" — that's exactly what integrators need to know.

### 7. When in doubt

When you're unsure:

1. **Prefer clarity over cleverness.**
2. Match the **structure and terminology** already used in Mews Open API docs.
3. Err towards **more explicit explanations** of behavior, constraints, and gotchas, but keep the prose tight.
4. If describing something novel, frame it in terms of **outcomes for integrators**: what they can achieve with this operation and how to do it safely.
