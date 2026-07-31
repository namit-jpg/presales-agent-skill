---
skill: solution_approach_patterns
version: 1.0
description: >
  Concise solution-approach patterns for Sales Cloud sub-modules, distilled
  from delivered engagement solutioning. Match the scope-matrix register — a
  compact paragraph per row, not a technical design document.
---

# Solution Approach Patterns — Sales Cloud

Reference examples for the `solutionApproach` field. Each is 1–3 sentences:
the objects, fields, and automation type involved, at the level of detail a
client-facing scope matrix cell should carry — not a low-level design.

## Lead Management

**Lead Qualification Scoring** — Add custom fields on Lead for budget,
timeline, and engagement metrics plus a calculated score field; a
record-triggered flow scores the lead on create/update using weighted rules
and sets an MQL-qualified flag once the threshold is crossed.

**Duplicate Prevention** — Use native Duplicate and Matching Rules on Lead
(exact match on Email OR Mobile Phone) to block creation and alert on edit of
likely duplicates, surfaced via the standard Duplicates component; data
stewards merge through the standard Merge Leads action.

## Account Management

**Retail Account Segmentation** — Classify Accounts into tiers (e.g.
Premium/Growth/Standard) via a custom picklist driven off a revenue field
synced from ERP, recalculated on a schedule by a flow; page-layout visibility
rules surface tier-specific sections to account managers.

**Parent-Child Store Hierarchy** — Use the standard Parent Account lookup to
link locations into a hierarchy (cap the depth); rollup custom fields on
Account, maintained by record-triggered flows on the child records (e.g.
Opportunity, Case), aggregate volume up through the hierarchy for
consolidated reporting.

**Credit Hold Visibility** — Add status fields on Account populated by a
scheduled integration, with an override flag and reason field reserved for a
named admin role; read-only formula fields surface the same status on
related records (e.g. Opportunity) so users see it without navigating away,
and a before-save flow protects manual overrides from being overwritten by
the next integration sync.

## Opportunity Management

**Guided Stage Exit Criteria** — Add stage-specific checklist-completion
fields on Opportunity (scoped to the relevant record type) and a before-save
flow that blocks a stage change until the corresponding checklist is
complete, with Path configured to guide users through the requirement.

**Sub-Stage Automation** — Add a deal-type picklist and a sub-stage picklist
on Opportunity; a before-save flow maps every stage + deal-type combination
to the correct sub-stage automatically, keeping forecasting consistent
without manual entry.

**Tiered Discount Approval** — Add a discount-percentage field and an
approval-status field on Opportunity; a flow auto-approves discounts under
the policy threshold and submits higher discounts into a tiered Approval
Process (e.g. manager, then a director-level public group), with a
validation rule blocking progression to Closed Won until approval is granted.
