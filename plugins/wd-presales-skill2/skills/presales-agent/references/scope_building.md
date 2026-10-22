---
skill: scope_building
version: 3.0
description: >
  Produces the BRD — a client-readable Scope of Work, one row per requirement,
  plus Out of Scope, Business Process Guide, and Effort Summary sheets —
  matching templates/brd_template.xlsx exactly.
---

# BRD Building Skill

## Workbook layout — must match templates/brd_template.xlsx exactly

The template file is the source of truth. Do not add, remove, or reorder
columns or sheets; if the format needs to change, change the template and
update `SHEETS` in `scripts/generate_xlsx.js` to match.

### Sheet 1 — Scope of Work (one row per requirement)

| Col | Header | JSON key | Audience |
|-----|--------|----------|----------|
| A | Requirement ID | `requirementId` ("1.1") | Client |
| B | Business Area | `businessArea` | Client |
| C | Sub Business Module | `subBusinessModule` | Client |
| D | Requirement | `requirement` | Client |
| E | Requirement Description | `description[]` (bulleted) | Client — business language |
| F | Information Required from [Client] | `informationRequired[]` (bulleted) | Client |
| G | Solution Approach | `solutionApproach` | Client IT / architects — Salesforce terms |
| H | Effort (Hours) | `effortHours` | Client / commercial |

### Sheet 2 — Out of Scope

Requirement ID | Business Area | Requirement | Not Included in This Scope
— one line for every row whose `notIncluded[]` is non-empty, in Requirement ID
order. Rows with nothing excluded are left off.

### Sheet 3 — Business Process Guide

Title "[Client] | How the New Process Will Work", a one-sentence
`processSummary`, the `processSteps[]` table (Step | What Happens | Where the
Work Takes Place), and the `glossary[]` table (Term | Plain Meaning | Used
For).

### Sheet 4 — Effort Summary

Requirements and total hours by Business Area, plus a grand total. Computed
by the generator; nothing to write.

### Internal JSON fields (never written to the workbook)

`phase`, `salesforceSkuName`, `classification`, `sourceRefs`,
`reviewComments` — used by the Step 3 review and Step 4 sprint planning.

Writing rules for C–F and the Out of Scope sheet:
`references/requirement_writing.md`. Boundary patterns by product:
`references/scope_boundary_patterns.md`.

## Solution Approach (column G)

The one column that speaks Salesforce. 1–3 sentences describing how the
requirement will be built: the standard features, objects, automation type,
integration pattern, and licence-relevant capabilities. It is what the
client's IT team and our delivery team read; the description above it is what
the business reads. The two must agree — every point in the description must
be achievable by what the solution approach says, and the solution approach
must not quietly add scope the description does not promise.

Prefer standard, declarative features; name custom code only where the
requirement needs it. Patterns: `references/solution_approach_patterns.md`.

## Effort (column H)

One number of hours per requirement. Model and ranges:
`references/effort_estimation.md`.

## Business Area / Requirement decomposition

1. **Business Area** = a business domain named the way the client talks about
   it ("New Project Enquiries", "Bids, Quotations and Approvals", "Customer
   Complaint Handling") — not a Salesforce cloud or object name.
2. **Requirement** = one capability a business owner can accept or reject on
   its own. Never combine two capabilities in one row; never split one
   capability across rows just to keep hours small.
3. **Requirement ID** = `<area number>.<position>`: 1.1, 1.2 … 2.1 … 5.10.
   Areas are numbered in the order of the client's process (setup and access
   first, then customers, then the sales cycle, then post-sale, reporting,
   data transfer and integrations as their own areas).
4. Each integration feed or data source the client named gets its own row
   (e.g. one row per external project database), even when they share a
   pattern — the client signs off on each separately.
5. Data migration gets its own Business Area ("Existing Data Transfer"), one
   row per group of records, with `classification: "Data Migration"`.
6. Testing, environments and launch go in the first area ("Safe testing and
   launch of Salesforce").

Typical size: a single-region, single-cloud engagement lands at 20–40 rows; a
multi-region, multi-system one at 60–90.

## Classification (internal)

- Config: standard configuration only
- Custom: Apex, LWC, or custom objects beyond standard
- Integration: inbound/outbound API, middleware
- Config+Custom / Config+Integration / Custom+Integration /
  Config+Custom+Integration: mixed
- Data Migration: one-time load of existing records (sprint planning treats
  this effort as Data Load, separate from build capacity)

## Salesforce SKU names

Use the correct commercial SKU name in `salesforceSkuName` and wherever a
product is named in Solution Approach. See `references/products_catalog.md`.
- 'Sales Cloud' (not 'CRM' or 'SFDC')
- 'Service Cloud EE' (not 'Service')
- 'Field Service Plus' (not 'FSL')
- 'Revenue Cloud / CPQ' (not 'CPQ' alone)
- 'Einstein / Agentforce' (for AI capabilities)
- 'Digital Engagement' (for WhatsApp/Chat/Social channels)
- 'Experience Cloud' (for portals and communities)

In the client-facing description, use what the user will see ("the Salesforce
mobile app", "Slack") rather than SKU names, unless a licence purchase is the
point being made.
