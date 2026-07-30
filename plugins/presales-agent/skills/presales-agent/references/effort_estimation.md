---
skill: effort_estimation
version: 1.0
description: >
  Translates artifact counts into hour estimates using calibrated per-item effort
  reference table. Includes Design, Build, and Unit Test in estimates.
---

# Effort Estimation Skill

## Per-Item Effort Reference Table (Hours: Design + Build + UT)

| Artifact Type | Simple | Medium | Complex |
|--------------------------|--------|--------|---------|
| Objects | 4.5 | 5.625 | 6.75 |
| Object Automations | 33 | 41.25 | 49.5 |
| Record Types | 2.5 | 3.125 | 3.75 |
| Page Layouts | 2.5 | 3.125 | 3.75 |
| Flows | 4 | 5 | 6 |
| Apex Triggers | 22 | 27.5 | 33 |
| Apex Classes (×3) | 44 | 55 | 66 |
| LWC | 25 | 31.25 | 37.5 |
| Custom UI/UX | 25 | 31.25 | 37.5 |
| Partner App Pages | 15 | 18.75 | 22.5 |
| Inbound/Outbound APIs | 30 | 37.5 | 45 |
| Batch Jobs | 34 | 42.5 | 51 |
| Reports | 2.5 | 3.125 | 3.75 |
| Dashboards | 5 | 6.25 | 7.5 |
| Org Setup | 24 | 40 | 48 |
| Data Migration | 64 | 80 | 100 |

## Complexity Classification Guide

### Simple
- Standard OOTB fields/picklists/layouts
- 1–3 criteria flows
- Single-object automations
- Standard reports with filters

### Medium
- Cross-object flows, 4–8 criteria
- Lookup-driven logic
- Multi-layout configurations
- Custom formula fields
- Screen flows

### Complex
- Multi-object orchestration
- Apex, async processing
- Conditional rendering LWC
- Multi-API integrations
- Complex batch logic
- DML chains

## Row Total Calculation

Row Effort = SUM of (Count × Per-Item Effort) for each artifact bucket
           + Any explicitly scoped Misc Manual Effort

## Grand Total & Sprint Inputs

Sum all row efforts by Module for Sprint Plan input.
Data Load effort is separated from development effort in sprint calculations.
Shared Activities (e.g., Org Setup) can be allocated once regardless of sprint.
