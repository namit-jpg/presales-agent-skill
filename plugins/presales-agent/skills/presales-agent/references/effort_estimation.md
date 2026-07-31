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

## Relationship to artifact counts

The BRD carries artifact counts (16 buckets × Simple/Medium/Complex, template
columns K–BF). They are **descriptive** — they tell the client how many objects,
flows, Apex classes, and integrations the build involves.

They are **not** an input to a pricing formula. Do not multiply them by per-item
rates. The `brd_template.xlsx` file originally shipped with a per-item rate row
above those columns; the generator clears it, because those rates describe a
full manual-build model this skill no longer uses.

Counts and effort should still be *coherent*: a row claiming three complex Apex
classes and 2h of effort is contradictory, and the Step 3 review flags it. Use
the counts as a sanity check on your estimate, not as its source.

## Estimating a row

Given the solution approach already written for the row, ask how much human
time is needed to review the AI-agent output, test it, and get it signed off.
Set one direct number.

Scoped manual work with no artifact of its own — workshops, documentation,
client-side coordination — goes in `miscManualEfforts` (column BG), not folded
into `effortHours`.

## Grand Total & Sprint Inputs

Sum all row efforts by Module for the Sprint Plan input. Data Load effort is
estimated and tracked separately from configuration/build effort (see
`references/sprint_planning.md`) — never folded into a row's effortHours.
