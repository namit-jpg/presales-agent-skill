# Review Checklist — 40-Point QA Validation

Executed in Step 3 against `<slug>_brd.json` and the generated workbook.

## Category 1: Structural Completeness (10 checks)

| # | Check | Severity if Fail |
|---|-------|-----------------|
| 1.1 | Every row has Requirement ID, Business Area, Sub Business Module and Requirement | CRITICAL |
| 1.2 | Every row has at least one description point and a Solution Approach | CRITICAL |
| 1.3 | Requirement IDs are unique and sequential within each Business Area (1.1, 1.2 … no gaps) | MEDIUM |
| 1.4 | Business Areas are numbered in process order and named in business language | LOW |
| 1.5 | `salesforceSkuName` matches a product in products_catalog.md | HIGH |
| 1.6 | `classification` is set on every row; migration rows use "Data Migration" | HIGH |
| 1.7 | Every row has a numeric effortHours, non-zero wherever work is required | HIGH |
| 1.8 | One capability per row — no row combines two separately acceptable requirements | MEDIUM |
| 1.9 | Process guide has steps covering the end-to-end flow, and every client acronym used in the BRD is in the glossary | MEDIUM |
| 1.10 | Generator ran cleanly and the workbook has all four sheets | CRITICAL |

## Category 2: Client Readability (10 checks)

| # | Check | Severity if Fail |
|---|-------|-----------------|
| 2.1 | No "Assuming" anywhere in the BRD | HIGH |
| 2.2 | No "etc.", "and more", "as needed", "similar features", "as applicable" | HIGH |
| 2.3 | Description contains no Salesforce build vocabulary (object, field, flow, Apex, LWC, permission set, record type) | MEDIUM |
| 2.4 | Every acronym is expanded on first use in the row | LOW |
| 2.5 | Requirement (column D) is phrased the way the client would say it | LOW |
| 2.6 | People are named by role ("Regional Sales Manager"), not "users"/"stakeholders" | MEDIUM |
| 2.7 | Lists (statuses, roles, categories, sources) are enumerated completely | HIGH |
| 2.8 | Each description point is one idea in short sentences | LOW |
| 2.9 | Every Information Required point has a timing anchor | MEDIUM |
| 2.10 | Every Not Included point is specific to its row, not a generic disclaimer | MEDIUM |

## Category 3: Fact Integrity & Technical Architecture (10 checks)

| # | Check | Severity if Fail |
|---|-------|-----------------|
| 3.1 | Every number, list and system name traces to the engagement context or a client source (`sourceRefs`) | CRITICAL |
| 3.2 | Unknowns are deferred to Information Required, never filled with an invented figure | CRITICAL |
| 3.3 | Solution Approach can deliver every description point, and adds nothing the description does not promise | HIGH |
| 3.4 | No row references a deprecated Salesforce feature | CRITICAL |
| 3.5 | Integration rows state direction, trigger/frequency, middleware and failure handling | HIGH |
| 3.6 | Data migration rows state record counts, objects, source and reconciliation | HIGH |
| 3.7 | Approval rows state who approves, at what threshold, and what is blocked until approval | MEDIUM |
| 3.8 | Digital Engagement / Field Service / Agentforce rows name their licence prerequisites | HIGH |
| 3.9 | Custom code in Solution Approach is justified by the requirement | MEDIUM |
| 3.10 | Scheduled jobs and feeds state their frequency | MEDIUM |

## Category 4: Commercial & Scope Protection (10 checks)

| # | Check | Severity if Fail |
|---|-------|-----------------|
| 4.1 | No open-ended promise in a description ("any", "all reports needed", "and other sources") | CRITICAL |
| 4.2 | Each third-party dependency is stated in the description (e.g. "depends on the vendor providing the feed") | HIGH |
| 4.3 | Third-party fees and vendor-side build are excluded where a vendor is involved | HIGH |
| 4.4 | Licence counts and SKUs needed but not yet confirmed are raised as clarifications | HIGH |
| 4.5 | Rows a reader could over-read (AI, portals, analytics, ERP write-back) have a Not Included entry | HIGH |
| 4.6 | Cross-references between rows are correct (referenced Requirement IDs exist) | MEDIUM |
| 4.7 | Effort is proportionate to description + solution approach (ranges in effort_estimation.md) | MEDIUM |
| 4.8 | Rows above 16h are justified in reviewComments or split | MEDIUM |
| 4.9 | Every open clarification is listed in the review report | HIGH |
| 4.10 | Sprint plan total effort reconciles with the BRD total | CRITICAL |

## Scoring Formula

Quality Score = 100 - (CRITICAL_FLAGS × 15) - (HIGH_FLAGS × 5) - (MEDIUM_FLAGS × 2) - (LOW_FLAGS × 0.5)
Minimum score: 0. Maximum score: 100.

## Readiness Verdict

- **READY**: Score ≥ 85 AND zero CRITICAL flags
- **NEEDS REVISION**: Score 60–84 OR 1–2 CRITICAL flags
- **NOT READY**: Score < 60 OR 3+ CRITICAL flags
