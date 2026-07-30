---
skill: assumption_writing
version: 1.0
description: >
  Produces air-tight, quantifiable, scope-protective functional and technical assumptions
  for each scope line item. CTA-level precision required.
---

# Assumption Writing Skill

## Core Principle

Assumptions are NOT disclaimers. They are the binding contract of the scope.
Each assumption must:
- Be SPECIFIC (include a number, a limit, or a named feature)
- Be VERIFIABLE (a reviewer can check it during UAT)
- Define a CLIENT RESPONSIBILITY or a SCOPE BOUNDARY
- Use 'Assuming' as the starting word for consistency

## Functional Assumptions: Required Patterns

Functional assumptions answer: 'How will the business operate this feature?'

### Pattern 1: Quantity Cap
'Assuming a maximum of [N] [items] are considered.'
Example: 'Assuming a maximum of 3 entitlements and 10 milestones are considered.'

### Pattern 2: Client Responsibility
'Assuming [client] will provide/share/confirm [item] prior to [milestone].'
Example: 'Assuming the client will share the escalation matrix during discovery.'

### Pattern 3: Standard vs. Custom Boundary
'Assuming the standard [Salesforce feature] will be used and limitations apply.'
Example: 'Assuming standard Email-to-Case will be leveraged.'

### Pattern 4: Exclusion Statement
'[Feature] is NOT considered in the current scope.'
Example: 'Chatbot development for WhatsApp/Chat channels is NOT in scope.'

### Pattern 5: Operating Model
'Assuming [user type] will [perform action] using [feature/channel].'
Example: 'Assuming field technicians will use the FSL mobile app for WO execution.'

## Technical Assumptions: Required Patterns

Technical assumptions answer: 'What are the platform constraints and architecture decisions?'

### Pattern A: Volume/Capacity Limit
'Assuming maximum [N] [records/transactions] per [time unit].'
Example: 'Assuming maximum 500 concurrent cases per day.'

### Pattern B: Automation Count
'Assuming a maximum of [N] [automation type] are considered.'
Example: 'Assuming a maximum of 3 criteria-based automations with max 5 criteria each.'

### Pattern C: Integration Architecture
'Assuming [direction] integration using [approach]; [exclusion] is out of scope.'
Example: 'Assuming no custom integration/Apex is required for the CTI adapter; it must conform to Salesforce Open CTI framework.'

### Pattern D: Platform Limitation Acknowledgment
'Assuming standard [feature] limitations apply.'
Example: 'Assuming standard Optimizer limitations apply; governor limits on appointment runs.'

### Pattern E: License/SKU Prerequisite
'Assuming [client] has procured [SKU] and the necessary licenses prior to implementation.'

## Anti-Patterns to AVOID

NEVER write assumptions like:
- 'Assuming this will be standard configuration.' (vague — what standard? which feature?)
- 'Assuming no complex logic.' (undefined — what is complex?)
- 'Assuming client provides data.' (must specify: which data, when, in what format)
- 'Etc.' anywhere in assumptions (always enumerate explicitly)

## Dual-Layer Requirement

EVERY scope row MUST have BOTH layers populated:
1. Functional Assumptions: 3–8 bullet points minimum for complex items
2. Technical Assumptions: 3–6 bullet points minimum for custom/integration items

Single-layer assumptions are a scope quality failure — flag and remediate.
