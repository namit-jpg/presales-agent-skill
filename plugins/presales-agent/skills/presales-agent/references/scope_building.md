---
skill: scope_building
version: 2.0
description: >
  Produces the BRD — a granular, cell-level requirements matrix, one row per
  Sub-Module — matching templates/brd_template.xlsx exactly.
---

# BRD Building Skill

## Column Schema — must match templates/brd_template.xlsx exactly

The template file is the source of truth for this layout. Do not add, remove,
or reorder columns here or in the output; if the format needs to change, change
the template and update `scripts/generate_xlsx.js` to match.

| Col | Field Name | JSON key | Required |
|-----|-----------|----------|----------|
| A | Audit Comments | `auditComments` | No |
| B | BRN | `subBrn` (e.g. `1.1`) | Yes |
| C | Module/Functional Area | `module` | Yes |
| D | Sub-Module | `subModule` | Yes |
| E | Phase | `phase` | Yes |
| F | Description | `description` | Yes |
| G | Functional Assumptions | `functionalAssumptions[]` | Yes |
| H | Technical Assumptions | `technicalAssumptions[]` | Yes |
| I | Solution Approach | `solutionApproach` | Yes |
| J | Imp Approach | `impApproach` | Yes |
| K–BF | Artifact counts, 16 buckets × Simple/Medium/Complex | `artifactCounts` | Yes |
| BG | Misc (Manual Efforts) for other activities | `miscManualEfforts` | Yes (0 if none) |
| BH | Efforts (Design, Build, UT) | `effortHours` | Yes |
| BI | Review Comments | `reviewComments` | No |

Four further fields — `customerDocRef`, `salesforceSkuName`,
`isPartOfRequirementDoc`, `classification` — have no template column. Keep them
in the JSON (the Step 3 review uses them); they are not written to the workbook.

## Solution Approach vs Imp Approach

These are two separate columns doing two separate jobs. Do not duplicate one
into the other.

- **Solution Approach (I)** — WHAT gets built, in Salesforce terms: objects,
  fields, automation type, licensing-relevant features. 1–3 sentences at
  scope-matrix altitude, not a low-level design. Patterns:
  `references/solution_approach_patterns.md`.
- **Imp Approach (J)** — HOW it gets delivered: sequencing, which sprint,
  prerequisites, dependencies on other rows or on client-side actions.

## The 16 Artifact Buckets (K–BF)

In template column order:

1. Objects — 2. Object Automations — 3. Record Types — 4. Page Layouts —
5. Flows — 6. Trigger — 7. Apex Classes (3) — 8. LWC — 9. Custom UI/UX —
10. Partner App — 11. Inbound/Outbound APIs — 12. Batch Execution —
13. Reports — 14. Dashboard — 15. Org Setup — 16. Data Migration

Count each with Simple / Medium / Complex granularity. Every bucket must carry a
number; 0 is valid, blank is not.

**These counts are descriptive, not a pricing formula.** They tell the client
the shape and volume of the build. They are NOT multiplied by per-item rates to
derive effort — `effortHours` is estimated directly, per
`references/effort_estimation.md`.

### Complexity guide

- **Simple** — standard OOTB fields, picklists, layouts; flows with 1–3
  criteria; single-object automations; standard reports with basic filters.
- **Medium** — cross-object flows, 4–8 criteria; lookup-driven logic; formula
  fields; multi-layout configurations; screen flows with conditional logic.
- **Complex** — multi-object orchestration; Apex with async processing or DML
  chains; LWC with conditional rendering; multi-API integrations with error
  handling; migration with heavy cleansing.

## Module/Sub-Module Decomposition Rules

1. Module = top-level functional domain (e.g., 'Case Management')
2. Sub-Module = granular capability (e.g., 'Case Creation via WhatsApp')
3. Each Sub-Module gets its own row — never combine two capabilities in one row
4. BRN (Business Requirement Number) groups related sub-modules
5. SUB BRN is a decimal: 1.1, 1.2, 1.3 ... 2.1, 2.2 ... and is what appears in
   the BRD's BRN column, since it uniquely identifies the row

## Custom/Config/Integration Classification

Retained in the JSON for review purposes (no template column):

- Config: Standard OOTB Salesforce configuration only
- Custom: Apex, LWC, custom objects beyond OOTB
- Integration: Outbound/inbound API, middleware
- Config+Custom: Mixed (most common)
- Config+Integration: Standard + external connectivity
- Custom+Integration: Custom code with external systems
- OOTB+Config: Pure declarative, no Apex

## Salesforce SKU Name Rules

ALWAYS use the correct commercial SKU name. Examples:
- 'Sales Cloud' (not 'CRM' or 'SFDC')
- 'Service Cloud EE' (not 'Service')
- 'Field Service Plus' (not 'FSL')
- 'Revenue Cloud / CPQ' (not 'CPQ' alone)
- 'Einstein / Agentforce' (for AI capabilities)
- 'Digital Engagement' (for WhatsApp/Chat/Social channels)
- 'Experience Cloud' (for portals and communities)

## Description Writing Standard

Each description must follow this pattern:
'[Client Name] requires/needs [the system/platform] to [business capability], so that [business outcome].'

Use bullet points for multi-part capabilities. Always include:
- The channel or trigger (if applicable)
- The data it captures or processes
- The downstream handoff
- The user persona(s) involved
