# Effort Reference — All 16 Artifact Buckets

All hours include Design + Build + Unit Test.

| # | Artifact Type | Simple (h) | Medium (h) | Complex (h) |
|---|--------------|------------|------------|-------------|
| 1 | Objects (Custom/Extended) | 4.5 | 5.625 | 6.75 |
| 2 | Object Automations (VR, AR, etc.) | 33 | 41.25 | 49.5 |
| 3 | Record Types | 2.5 | 3.125 | 3.75 |
| 4 | Page Layouts | 2.5 | 3.125 | 3.75 |
| 5 | Flows (Screen / Record-Triggered / Scheduled) | 4 | 5 | 6 |
| 6 | Apex Triggers | 22 | 27.5 | 33 |
| 7 | Apex Classes (×3 included) | 44 | 55 | 66 |
| 8 | LWC Components | 25 | 31.25 | 37.5 |
| 9 | Custom UI/UX | 25 | 31.25 | 37.5 |
| 10 | Partner App Pages (Experience Cloud) | 15 | 18.75 | 22.5 |
| 11 | Inbound/Outbound APIs | 30 | 37.5 | 45 |
| 12 | Batch Jobs | 34 | 42.5 | 51 |
| 13 | Reports | 2.5 | 3.125 | 3.75 |
| 14 | Dashboards | 5 | 6.25 | 7.5 |
| 15 | Org Setup | 24 | 40 | 48 |
| 16 | Data Migration (per wave) | 64 | 80 | 100 |

## Complexity Guidelines

### Simple
- Standard OOTB fields, picklists, layouts
- Flows with 1–3 criteria
- Single-object automations
- Standard reports with basic filters
- Single-entity data migration wave

### Medium
- Cross-object flows, 4–8 criteria
- Lookup-driven logic, formula fields
- Multi-layout configurations
- Screen flows with conditional logic
- Multi-entity migration with transformations

### Complex
- Multi-object orchestration flows
- Apex with async processing, DML chains
- LWC with conditional rendering, dynamic components
- Multi-API integrations with error handling
- Complex batch logic with retry mechanisms
- Migration with heavy data cleansing

## Sprint Capacity Reference

| Parameter | Value | Notes |
|-----------|-------|-------|
| Sprint Duration | 2 weeks | Fixed |
| Dev hours/week | 35h | Net of ceremonies (12.5% buffer) |
| Dev capacity/sprint | 70h | 35h × 2 weeks |
| BA capacity (pre-sprint) | 40h/week | Drops to 24h during build |
| SA capacity (pre-sprint) | 40h/week | Drops to 24h during build |
| DS capacity | 10h/week | Throughout project |
| QA capacity (build) | 24h/week | Ramps to 40h during SIT |
| Data Load effort | Separate | NOT counted in dev sprint capacity |
