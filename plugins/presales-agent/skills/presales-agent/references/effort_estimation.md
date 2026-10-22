---
skill: effort_estimation
version: 3.0
description: >
  Estimates the single Effort (Hours) value per BRD requirement: the human time
  needed to design, review, validate, and sign off an AI-agent-assisted build —
  not traditional unassisted manual-build hours.
---

# Effort Estimation Skill

## What effortHours represents

Each requirement carries ONE effort number (Scope of Work column H). It
estimates the human time to:

1. Confirm the design during the working sessions,
2. Review and validate the configuration/code the delivery agents produce,
3. Run functional and edge-case testing,
4. Walk the client through business testing and get sign-off.

It is deliberately **not** full manual-build effort. If an engagement is being
delivered without AI-agent assistance, say so to the user and recalibrate the
ranges; do not silently inflate individual rows.

This number is visible to the client. It must be defensible from the
requirement's own description and solution approach.

## Typical ranges

| Requirement complexity | effortHours |
|---|---|
| Simple — standard configuration, one area of the system, no integration | 2–5h |
| Medium — automation across records, approvals, scheduled logic, file import | 5–10h |
| Complex — custom code, an integration feed, multi-step approvals with escalation | 10–16h |
| Exceptionally large (rare) — major integration hub, migration with heavy cleansing | up to 300h — flag in `reviewComments`; should be uncommon |

If most rows sit above 16h, requirements are probably too coarse — split them
per the decomposition rules in `references/scope_building.md` rather than
inflating one number.

## Estimating a row

Read the row's description and solution approach. Count what has to be built
and verified (rules, automations, screens, integrations, reports), then ask
how much human time the review, testing and sign-off of that takes. Set one
direct number, rounded to the nearest hour.

Workshops, documentation and client coordination specific to a requirement are
included in its hours — there is no separate misc column. Programme-level work
(discovery, project management, SIT, UAT, hypercare) is not in any row; it is
planned in the sprint plan and timeline.

## Data migration rows

Rows with `classification: "Data Migration"` carry the load, validation and
reconciliation hours for that group of records. Sprint planning treats their
total as Data Load effort, separate from build capacity (see
`references/sprint_planning.md`).

## Totals

The generator totals hours by Business Area on the Effort Summary sheet. The
sprint plan's `totalGrandEffort` must equal the BRD total.
