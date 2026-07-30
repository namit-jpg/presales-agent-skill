# Review Checklist — 40-Point QA Validation

This checklist is executed by the Review Agent against every scope document.

## Category 1: Structural Completeness (10 checks)

| # | Check | Severity if Fail |
|---|-------|-----------------|
| 1.1 | Every row has a Module and Sub-Module | CRITICAL |
| 1.2 | Every row has both Functional AND Technical assumptions | CRITICAL |
| 1.3 | BRN numbering is sequential and consistent | MEDIUM |
| 1.4 | SUB BRN follows decimal format (1.1, 1.2...) | LOW |
| 1.5 | Salesforce SKU Name matches a product in PRODUCTS_CATALOG.md | HIGH |
| 1.6 | Custom/Config/Integration classification is applied to every row | HIGH |
| 1.7 | All 16 artifact buckets have values (0 is acceptable, blank is not) | HIGH |
| 1.8 | Effort total is calculated and non-zero for rows with artifacts | HIGH |
| 1.9 | Solution/Imp Approach field is populated | MEDIUM |
| 1.10 | Description follows the standard pattern (client needs/requires...) | MEDIUM |

## Category 2: Assumption Quality (10 checks)

| # | Check | Severity if Fail |
|---|-------|-----------------|
| 2.1 | No assumption contains the word 'etc.' | HIGH |
| 2.2 | At least one assumption per row has a numeric cap or limit | HIGH |
| 2.3 | At least one assumption states a client responsibility | HIGH |
| 2.4 | At least one assumption explicitly excludes something from scope | HIGH |
| 2.5 | Assumptions start with 'Assuming' (consistency) | LOW |
| 2.6 | Functional assumptions address business behavior (not technical) | MEDIUM |
| 2.7 | Technical assumptions address platform constraints (not business) | MEDIUM |
| 2.8 | Integration rows have technical assumptions about API type/direction | CRITICAL |
| 2.9 | Custom development rows state max Apex class/trigger counts | HIGH |
| 2.10 | Data migration rows state source system, format, and wave count | HIGH |

## Category 3: Technical Architecture (10 checks)

| # | Check | Severity if Fail |
|---|-------|-----------------|
| 3.1 | No row references a deprecated Salesforce feature | CRITICAL |
| 3.2 | Digital Engagement capabilities confirm WABA/Meta prerequisites | HIGH |
| 3.3 | FSL rows confirm 'Field Service Plus' (not standard FSL) for optimizer | HIGH |
| 3.4 | CTI integrations state Open CTI framework compliance | HIGH |
| 3.5 | Agentforce rows confirm credit-based consumption and guardrails | HIGH |
| 3.6 | Approval processes state max levels and type (sequential vs parallel) | MEDIUM |
| 3.7 | Custom Apex rows state governor limit awareness | MEDIUM |
| 3.8 | Batch jobs state scheduled frequency and volume bounds | MEDIUM |
| 3.9 | Integration rows state inbound/outbound direction and middleware | HIGH |
| 3.10 | LWC rows confirm whether they are internal console or portal-facing | LOW |

## Category 4: Commercial & Scope Protection (10 checks)

| # | Check | Severity if Fail |
|---|-------|-----------------|
| 4.1 | No open-ended phrases ('and more', 'as needed', 'similar features') | CRITICAL |
| 4.2 | Every integration has a corresponding inbound OR outbound API artifact count | CRITICAL |
| 4.3 | Portal rows confirm Experience Cloud license type (per-member vs per-login) | HIGH |
| 4.4 | AI rows confirm no custom model training is in scope | HIGH |
| 4.5 | License procurement is stated as client responsibility where non-standard SKUs used | HIGH |
| 4.6 | Rows referencing third-party tools (ORM, SMS, CTI) exclude vendor setup effort | HIGH |
| 4.7 | Complex rows (Custom+Integration) have at least 6 technical assumptions | MEDIUM |
| 4.8 | Items in Phase 2/3 have corresponding dependency callouts in Phase 1 rows | MEDIUM |
| 4.9 | All open clarification items are listed in the Open Clarifications sheet | HIGH |
| 4.10 | Sprint plan total effort reconciles with scope matrix grand total | CRITICAL |

## Scoring Formula

Quality Score = 100 - (CRITICAL_FLAGS × 15) - (HIGH_FLAGS × 5) - (MEDIUM_FLAGS × 2) - (LOW_FLAGS × 0.5)
Minimum score: 0. Maximum score: 100.

## Readiness Verdict

- **READY**: Score ≥ 85 AND zero CRITICAL flags
- **NEEDS REVISION**: Score 60–84 OR 1–2 CRITICAL flags
- **NOT READY**: Score < 60 OR 3+ CRITICAL flags
