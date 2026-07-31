---
skill: effort_estimation
version: 2.0
description: >
  Estimates a single effortHours value per scope-matrix row: the human time
  needed to review, validate, and sign off an AI-agent-assisted build — not
  traditional unassisted manual-build hours.
---

# Effort Estimation Skill

## What effortHours represents

Each scope-matrix row carries ONE effort number, not a breakdown by artifact
type. It estimates the human time to:

1. Review and validate the configuration/code the delivery agents produce,
2. Run functional and edge-case testing,
3. Walk the client through UAT and get sign-off.

It is deliberately **not** full manual-build effort (design + build + unit
test with no AI assistance) — that would run several times higher for the
same scope. If a client engagement is being delivered without AI-agent
assistance, say so explicitly in the row's technical assumptions rather than
inflating this number to compensate.

## Typical ranges

| Row complexity | effortHours |
|---|---|
| Simple — declarative config, single object, no integration | 2–5h |
| Medium — cross-object automation, formula/rollup logic, standard integration pattern | 5–10h |
| Complex — multi-object orchestration, custom Apex, non-trivial integration, one data-migration wave | 10–16h |
| Exceptionally large (rare) — major integration hub, migration with heavy cleansing | up to 300h — flag these explicitly in Review Comments; they should be uncommon |

Keep values moderate. If most rows in a matrix sit above 20h, the sub-module
is probably too coarse — split it into smaller rows per the decomposition
rules in `references/scope_building.md`, rather than inflating one number.

## Estimating a row

Given the solution approach already written for the row, ask how much human
time is needed to review the AI-agent output, test it, and get it signed off.
Do not itemize by artifact type — set one direct number.

## Grand Total & Sprint Inputs

Sum all row efforts by Module for the Sprint Plan input. Data Load effort is
estimated and tracked separately from configuration/build effort (see
`references/sprint_planning.md`) — never folded into a row's effortHours.
