---
skill: context_elicitation
version: 2.0
description: >
  Guides the agent through a structured discovery conversation to produce a complete
  EngagementContext object. Applies CTA-level questioning. Every fact the BRD
  will state must be captured here — the BRD does not guess.
---

# Context Elicitation Skill

## Why this step carries more weight now

The BRD no longer hides gaps behind "Assuming…" statements. It states what
will be delivered, in numbers and named lists. Those numbers come from here.
Anything not captured in discovery either becomes an Information Required
item in the BRD or an open question for the user — never an invented figure.

Capture facts in the client's own words and terms (their form names, role
titles, region names, system names), because the BRD will reuse them.

## Mandatory Discovery Dimensions

Gather information across ALL seven dimensions before moving to BRD building.
Ask follow-up questions if any dimension has gaps. Never assume; always confirm.

### Dimension 1: Client & Project Identity
- Client name (as it should appear in the BRD headers), industry, sub-vertical
- Project name, engagement type (Greenfield/Migration/Enhancement)
- Regions and offices in scope — impacts currencies, working hours, licences
- Implementation partner name (used in "[Client] will confirm … to [Partner]")

### Dimension 2: Salesforce Products
Ask: 'Which Salesforce products are confirmed in scope?'
Then validate the SKU names against `references/products_catalog.md`.
Record licence counts per product if known.

### Dimension 3: Business Context
- Business units / departments involved
- Named user count per persona and per region ("70 in Dubai, 50 in Riyadh")
- The client's role titles exactly as they use them
- Pain points and the KPIs they want to improve

### Dimension 4: Business Process & Functional Scope
- Walk the end-to-end process step by step: what happens, who does it, and
  where the work takes place today and after go-live. This becomes the
  Business Process Guide.
- For each step, the client's own forms, documents and acronyms (e.g. QRF,
  DAF, CAF) and what each means — this becomes the glossary.
- Enumerations the BRD will need: statuses, categories, sources, approval
  levels and thresholds, reminder timings, team roles. Capture the actual
  values, or note that the client will supply them.
- Map each process to a Business Area and candidate requirements.

### Dimension 5: Integration Landscape
- Every external system and data source (ERP, websites, data feeds,
  collaboration tools, survey tools, CTI, SMS)
- For each: direction, what data moves, trigger/frequency, existing
  middleware, and whether the vendor/IT team has confirmed an API or feed
- Vendor dependencies and who owns the vendor relationship

### Dimension 6: Data & Volume
- Record counts per group of records to migrate
- Source system and format, history period to bring across
- Data residency or security requirements

### Dimension 7: Constraints & Timeline
- Phasing (single launch or Phase 1/2/3) and target launch date
- Implementation window in weeks, if fixed
- Client sign-off owners, business testers, known blockers

## Open questions

Whatever the user cannot answer goes into `openQuestions` in the engagement
context, with who should answer it. Step 2 turns each into an Information
Required point on the relevant row.

## Output Format

Write `opportunities/<ClientName>/<slug>_engagement_context.json`.
Validate against `schemas/engagement_context.ts` before proceeding.

## Quality Gates

- [ ] All 7 dimensions populated
- [ ] At least 1 Salesforce product confirmed
- [ ] At least 3 business processes identified, with process steps captured
- [ ] Phase structure confirmed (or single-phase noted)
- [ ] Open questions listed (empty list if none)
- [ ] Client sign: YES if confirmed by user, PENDING otherwise
