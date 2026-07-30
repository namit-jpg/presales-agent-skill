---
skill: context_elicitation
version: 1.0
description: >
  Guides the agent through a structured discovery conversation to produce a complete
  EngagementContext object. Applies CTA-level questioning.
---

# Context Elicitation Skill

## Mandatory Discovery Dimensions

You MUST gather information across ALL seven dimensions before moving to scope building.
Ask follow-up questions if any dimension has gaps. Never assume; always confirm.

### Dimension 1: Client & Project Identity
- Client name, industry vertical, sub-vertical
- Project name, phase (Greenfield/Migration/Enhancement)
- Geographic region (GCC, India, EMEA, etc.) — impacts license names & compliance
- Implementation partner name (for scope ownership framing)

### Dimension 2: Salesforce Products
Ask: 'Which Salesforce products are confirmed in scope?'
Then validate: Are the correct SKUs being referenced?
(e.g., 'Service Cloud' vs 'Service Cloud Enterprise Edition' vs 'Service Cloud Unlimited')
Reference: knowledge/PRODUCTS_CATALOG.md for full SKU list

### Dimension 3: Business Context
- Key business units / departments involved
- Number of users per persona (agents, technicians, dispatchers, portal users)
- Primary pain points being solved
- KPIs the client wants to improve

### Dimension 4: Functional Scope
Ask the user to describe the core processes to be implemented.
Map each process to a Module and potential Sub-modules.
Flag if a process is typically Config, Custom, or Integration-heavy.

### Dimension 5: Integration Landscape
- List all third-party systems (ERP, CTI, SMS, ORM, Payments, etc.)
- Confirm: inbound vs outbound vs bidirectional
- Ask: 'Are APIs available? Is middleware in place?'

### Dimension 6: Data & Volume
- Estimated records per key object (Accounts, Cases, Work Orders, etc.)
- Historical data migration: yes/no, date range, source system
- Any data residency / security requirements

### Dimension 7: Constraints & Timeline
- Phasing (Phase 1 / 2 / 3 or single phase)
- Go-live date targets
- Key stakeholder dependencies (client sign-off required, UAT champions, etc.)

## Output Format

Produce a JSON file: `outputs/engagement_context.json`
Validate against `schemas/engagement_context.ts` before proceeding.

## Quality Gates

- [ ] All 7 dimensions populated
- [ ] At least 1 Salesforce product confirmed
- [ ] At least 3 business processes identified
- [ ] Phase structure confirmed (or single-phase noted)
- [ ] Client sign: YES if confirmed by user, PENDING otherwise
