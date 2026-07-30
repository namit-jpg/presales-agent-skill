---
skill: sprint_planning
version: 1.0
description: >
  Converts scope effort totals into a granular sprint plan with role-level weekly
  allocation, matching the format used in delivered enterprise engagements.
---

# Sprint Planning Skill

## Sprint Plan Structure

### Pre-Sprint Phases (always include):
- Discovery Kickoff (Week 1): BA + SA only, no developers
- Discovery Documentation (Weeks 2–3): BA + SA only
- Discovery Completion / Requirement Signoff (Week 4): BA + SA
- Solution Kickoff (Week 5): BA + SA
- Solution Design Documentation (Week 6): BA + SA, QA begins review
- Solution Design Completion (Week 7): BA + SA + QA
- Solutioning Completion / Design Review & Signoff (Week 8): all roles ramp in

### Sprint Execution Phases:
Each sprint = 2 weeks (10 working days)
Capacity per role per sprint:
- BA: 40h first sprint week, 24h subsequent weeks
- SA: 40h first sprint week, 24h subsequent weeks
- Developer (TS-1 through TS-N): 40h/week throughout sprints
- DS (Delivery/Scrum): 10h/week throughout
- QA: 0h pre-sprint, 40h first sprint week, 24h subsequent weeks

### Post-Sprint Phases:
- SIT (System Integration Testing)
- UAT (User Acceptance Testing)
- Pre-Production / Go-Live
- Hypercare / Warranty (typically 4–8 weeks)

## Calculation Logic

```
Sprint Duration = 2 weeks
Effort Per Sprint = Number of Developers × 70h (available dev effort per sprint)
Total Dev Effort = Grand Total Effort - Data Load Effort - Shared Activities
Number of Sprints = CEIL(Total Dev Effort / Effort Per Sprint)
Balance Effort = (Number of Sprints × Effort Per Sprint) - Total Dev Effort
```

## Phase Assignment Rules

Assign each Sub-Module to a phase based on:
- Foundation items (Org setup, data model, core objects) → Phase 1
- Process automation, integrations → Phase 1/2
- Portal, AI/Agentforce, advanced analytics → Phase 2/3
- Items with unresolved clarifications → Phase 2 minimum

## Role Breakdown Summary

Include a role-wise hour summary at the bottom of the sprint plan:
- BA total hours
- SA total hours
- TS (each developer) total hours
- DS total hours
- QA total hours
- Grand Total

## Timeline Grid Format

For the Timeline sheet, include columns for:
Serial | Task Title | Task Owner | Months & Weeks | Effort Hours

Standard task hierarchy:
1. Project Definition & Planning (Discovery & Documentation, Signoff, Solution)
2. Project Build & Test (Build, Test, UAT Deployment, UAT Handover)
3. Deployment (Pre-deployment, Deployment)
4. Data Upload (Loading, Testing, Sanity & Reporting)
5. GO LIVE + Hypercare
