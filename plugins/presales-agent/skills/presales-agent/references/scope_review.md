---
skill: scope_review
version: 1.0
description: >
  Performs a CTA-level quality review of the complete scope matrix.
  Flags gaps, contradictions, risks, and missing assumptions.
---

# Scope Review & Gap Analysis Skill

## Review Dimensions

Evaluate EVERY scope row across the following 8 dimensions:

### 1. Completeness Check
- Does the row have BOTH functional AND technical assumptions?
- Does the row have an effortHours value (0 only for informational rows)?
- Is the SKU name correctly specified?
- Does the description follow the standard pattern?

### 2. Assumption Quality Check
- Are assumptions quantified? (count caps, date commitments, named features)
- Are client responsibilities clearly delineated?
- Are exclusions explicitly stated?
- Is the word 'etc.' present? (RED FLAG — must be eliminated)

### 3. Scope Creep Risk
- Does the description imply work beyond what the assumptions cap?
- Are open-ended phrases present ('as needed', 'and other', 'similar features')?
- Are downstream dependencies assumed but not scoped?

### 4. Technical Architecture Review (CTA Layer)
- Is the implementation approach consistent with SF best practices?
- Are governor limits acknowledged where relevant?
- Are integrations assuming middleware without specifying it?
- Is Agentforce/Einstein referenced without license confirmation?
- Are any deprecated features referenced?

### 5. License/Product Alignment
- Is the correct Salesforce SKU referenced for the capability described?
- e.g., WhatsApp requires 'Digital Engagement' license
- e.g., FSL Optimizer requires 'Field Service Plus' (not Standard)
- e.g., Agentforce requires 'Einstein / Agentforce' licensing

### 6. Dependency Mapping
- Does this line item depend on another that hasn't been scoped?
- Are prerequisite line items sequenced correctly?
- Are data migration dependencies called out in technical assumptions?

### 7. Effort Sanity Check
- Is effortHours proportionate to the row's stated complexity (see references/effort_estimation.md ranges)?
- Are there 0-effort rows that clearly require work?
- Are there rows above ~16h that should be split into smaller sub-modules instead?

### 8. Sprint Planning Readiness
- Can each row be built in a sprint without cross-row dependency issues?
- Are items that MUST be built together in the same sprint phase?

## Flag Severity Levels

| Severity | Definition | Action |
|----------|-----------|--------|
| CRITICAL | Scope gap that will lead to change request or commercial dispute | Must resolve before sign-off |
| HIGH | Missing assumption that creates ambiguity during build | Resolve before sprint start |
| MEDIUM | Sub-optimal phrasing or incomplete quantification | Recommend improvement |
| LOW | Style or formatting issue | Optional fix |

## Output Format

Produce a ReviewReport with:
1. Executive summary: overall quality score (0–100)
2. Per-row flags with severity, dimension, and recommended fix
3. List of Open Clarifications (unresolved client decisions)
4. Overall readiness verdict: READY / NEEDS REVISION / NOT READY
