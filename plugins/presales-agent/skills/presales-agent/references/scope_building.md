---
skill: scope_building
version: 1.0
description: >
  Produces a granular, cell-level scope matrix using the exact column structure
  validated across delivered enterprise Salesforce engagements.
---

# Scope Building Skill

## Column Schema (Must match xlsx output exactly)

Every scope row MUST contain ALL of the following columns:

| Column | Field Name | Data Type | Required |
|--------|-----------|-----------|----------|
| A | Audit Comments | Text | No |
| B | Customer Doc Ref | Text | Yes |
| C | BRN | Text | Yes |
| D | SUB BRN | Decimal | Yes |
| E | Salesforce SKU Name | Text | Yes |
| F | Is apart of requirement doc? | Yes/No | Yes |
| G | Custom/Config/Integration | Enum | Yes |
| H | Module/Functional Area | Text | Yes |
| I | Sub-Module | Text | Yes |
| J | Description | Rich Text | Yes |
| K | Functional Assumptions | Rich Text | Yes |
| L | Technical Assumptions | Rich Text | Yes |
| M | Solution / Imp Approach | Text | Yes |
| N | Effort Hours | Number | Yes |
| O | Review Comments | Text | No |
| P | Phase | Enum | Yes |

## Module/Sub-Module Decomposition Rules

1. Module = top-level functional domain (e.g., 'Case Management')
2. Sub-Module = granular capability (e.g., 'Case Creation via WhatsApp')
3. Each Sub-Module gets its own row — never combine two capabilities in one row
4. BRN (Business Requirement Number) groups related sub-modules
5. SUB BRN is a decimal: 1.1, 1.2, 1.3 ... 2.1, 2.2 ...

## Custom/Config/Integration Classification

- Config: Standard OOTB Salesforce configuration only
- Custom: Apex, LWC, custom objects beyond OOTB
- Integration: Outbound/inbound API, middleware
- Config+Custom: Mixed (most common)
- Config+Integration: Standard + external connectivity
- Custom+Integration: Custom code with external systems
- OOTB+Config: Pure declarative, no Apex

## Effort Hours (Column N)

One direct estimate per row — see `references/effort_estimation.md` for what
the number represents and typical ranges. Do not itemize by artifact type.

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
