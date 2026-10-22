---
skill: scope_review
version: 2.0
description: >
  Performs a CTA-level quality review of the complete BRD. Flags invented
  facts, unreadable phrasing, scope gaps, contradictions and risks.
---

# BRD Review & Gap Analysis Skill

## Review Dimensions

Evaluate EVERY requirement across the following 8 dimensions. Checklist with
severities: `references/review_checklist.md`.

### 1. Completeness
- All eight Scope of Work columns populated (Information Required may be "None")?
- Solution Approach present for every row?
- Effort set, and non-zero where work is needed?
- SKU and classification set in the JSON?
- Process guide and glossary present?

### 2. Fact Integrity (the most important dimension)
- Does every number, list, name and system trace to the engagement context or
  a client source? Check `sourceRefs`.
- Has anything been filled in that the client never said? An invented figure
  is CRITICAL — replace it with a reference to what the client will confirm,
  and add the matching Information Required point.

### 3. Client Readability
- Could a business owner with no Salesforce knowledge read the description and
  know exactly what they get?
- Any "Assuming", "etc.", open-ended phrases, or build vocabulary in the
  description?
- Acronyms expanded? Roles named?

### 4. Scope Boundaries
- Does each row say what the client must supply, and when?
- Are the exclusions a reader might over-read recorded on the Out of Scope
  sheet?
- Are third-party dependencies and fees stated?

### 5. Technical Architecture (CTA layer)
- Is the Solution Approach consistent with Salesforce best practice?
- Does it deliver exactly what the description promises — no more, no less?
- Integrations: direction, middleware, frequency, failure handling?
- Any deprecated features?

### 6. License / Product Alignment
- Correct SKU for the capability (WhatsApp → Digital Engagement; Optimizer →
  Field Service Plus; Agentforce → Einstein / Agentforce)?
- Licence counts consistent with the user numbers in the description?

### 7. Dependencies & Effort
- Does a row depend on another that is not scoped? Are cross-references valid?
- Is effort proportionate to the description and solution approach?
- Rows above ~16h: justified or split?

### 8. Sprint Readiness
- Can each row be built in a sprint without unresolved client inputs blocking
  it? Rows waiting on a vendor feed or client decision are flagged so sprint
  planning schedules them late.

## Flag Severity Levels

| Severity | Definition | Action |
|----------|-----------|--------|
| CRITICAL | Invented fact, open-ended promise, or gap that will lead to a change request or commercial dispute | Must resolve before sign-off |
| HIGH | Missing boundary or dependency that creates ambiguity during build | Resolve before sprint start |
| MEDIUM | Imprecise phrasing or incomplete enumeration | Recommend improvement |
| LOW | Style or formatting issue | Optional fix |

## Output Format

Produce a review report with:
1. Executive summary: overall quality score (0–100)
2. Per-row flags with severity, dimension, and recommended fix
3. Open Clarifications (unresolved client decisions) — these are internal and
   are not written into the client workbook
4. Overall readiness verdict: READY / NEEDS REVISION / NOT READY
