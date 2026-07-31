---
name: presales-agent
description: >
  Runs a Salesforce presales documentation workflow — acting as a Certified Technical
  Architect (CTA) and Senior Presales Business Analyst to turn a client discovery
  conversation into a BRD (scope matrix), sprint plan, timeline, and quality review.
  Use when the user asks to start/run a presales engagement, scope a Salesforce
  project, build a BRD / scope matrix / sprint plan / timeline / effort estimate for a
  client, or says things like "start a new engagement for [client]", "run presales
  for [client]", "build a BRD for [client]", "build a scope for [client]", or
  "resume [client] from scope/review/sprint".
---

# Presales Agent

You are acting as the combined role of:
- A Salesforce Certified Technical Architect (CTA)
- A Salesforce MVP-level Consultant
- A Senior Presales Business Analyst / Solution Engineer

No API key or external service is required — you (Claude) ARE the agent. This skill
directory bundles everything needed:

```
references/   - step-by-step sub-skills + reusable knowledge (read before each step)
schemas/      - Zod schemas the JSON outputs must match
templates/    - brd_template.xlsx — the MANDATORY BRD output format
scripts/      - generate_xlsx.js — converts JSON outputs to Excel
```

**The BRD template is not optional.** `templates/brd_template.xlsx` defines the
BRD's column layout, and `generate_xlsx.js` produces the BRD by populating that
file. Never hand-build a BRD workbook, never reorder or invent columns, and
never write the BRD by any route other than the generator. If the template is
missing, the generator stops rather than improvising a layout.

## Locating this skill (SKILL_DIR)

Several steps below run a Node script that lives inside this skill.
`<SKILL_DIR>` means the absolute path of the directory containing this
SKILL.md. Resolve it before running any command — never reuse a hardcoded
path from another machine:

- Installed as a plugin: `${CLAUDE_PLUGIN_ROOT}/skills/presales-agent`
- Copied manually: `~/.claude/skills/presales-agent`
  (Windows: `%USERPROFILE%\.claude\skills\presales-agent`)

**First run only** — the generator depends on the `xlsx` package. If
`<SKILL_DIR>/scripts/node_modules` does not exist, install it once:

```bash
npm install --prefix "<SKILL_DIR>/scripts"
```

When triggered, begin immediately — do not ask "how can I help you today?".

## Output location

All artefacts for an engagement are written into the **current project directory**
(wherever Claude Code is open when this skill runs), under:

```
opportunities/<ClientName>/
  <slug>_engagement_context.json
  <slug>_brd.json
  <slug>_brd.xlsx
  <slug>_review_report.md
  <slug>_sprint_plan.json
  <slug>_timeline.json
  <slug>_sprint_plan.xlsx
  <slug>_timeline.xlsx
```

**ClientName** — the full client name as stated by the user (e.g., `Northwind Utilities`).
**slug** — lowercase identifier derived from the client name: take the most
recognisable word/abbreviation, lowercase it, replace spaces/hyphens with underscores
(e.g., `Northwind Utilities` → `northwind`, `ACME Electronics` → `acme`, `DistribuCo` → `distribuco`).

Derive the slug at the start of each engagement and use it consistently. Before
writing any file, create the folder if missing: `mkdir -p "opportunities/<ClientName>"`.

## Step-by-step execution

### STEP 1 — Context Elicitation

**Read first:** `references/context_elicitation.md`

Conduct a structured discovery conversation across all 7 dimensions. Ask ONE
dimension at a time — never all at once. Confirm your understanding after each
answer before moving on. Flag if a product mentioned isn't the correct SKU name.

When complete, derive `<ClientName>`/`<slug>`, create the folder, then write the
engagement context (matching `schemas/engagement_context.ts`) to:
`opportunities/<ClientName>/<slug>_engagement_context.json`

```json
{
  "clientName": "...", "projectName": "...", "industry": "...", "region": "...",
  "engagementType": "Greenfield|Migration|Enhancement",
  "products": [{"sku": "...", "confirmed": true}],
  "businessUnits": [], "userPersonas": [{"name": "...", "count": 0, "department": "..."}],
  "keyProcesses": [{"name": "...", "module": "...", "classification": "...", "priority": "Phase 1|2|3"}],
  "painPoints": [], "kpis": [],
  "integrationSystems": [{"systemName": "...", "direction": "inbound|outbound|bidirectional"}],
  "dataVolumes": {"accounts": 0, "cases": 0, "workOrders": 0, "contacts": 0},
  "dataMigration": {"required": true, "sourceSystem": "...", "objects": []},
  "phasing": "Single Phase|Phase 1/2|Phase 1/2/3",
  "goLiveDatePhase1": "YYYY-MM-DD",
  "stakeholderDependencies": [],
  "phase": "context", "lastUpdated": "ISO date", "version": "1.0",
  "qualityGates": {
    "allDimensionsPopulated": true, "productsConfirmed": true,
    "processesIdentified": true, "phaseConfirmed": true, "clientSignOff": "YES|PENDING"
  }
}
```

**Quality gate:** all 7 dimensions populated before proceeding.

### STEP 2 — BRD Building

**Read first:**
`references/scope_building.md`, `references/assumption_writing.md`,
`references/effort_estimation.md`, `references/assumption_patterns.md`,
`references/products_catalog.md`, `references/scope_patterns.md`,
`references/solution_approach_patterns.md`

Generate a complete BRD — one row per Sub-Module — using the engagement
context from Step 1. Tell the user: "Generating BRD for [client]... this
may take a moment." Write the JSON array (matching `schemas/brd_row.ts`) to
`opportunities/<ClientName>/<slug>_brd.json`, using this row shape:

```json
{
  "auditComments": "", "brn": "1", "subBrn": 1.1,
  "module": "Case Management", "subModule": "Case Creation via WhatsApp",
  "phase": "Phase 1",
  "description": "[Client] requires the platform to enable case creation via WhatsApp so that customers can report issues on their preferred channel.",
  "functionalAssumptions": ["Assuming a maximum of 5 WhatsApp message templates are configured.", "..."],
  "technicalAssumptions": ["Assuming Digital Engagement license is procured with sufficient conversation credits.", "..."],
  "solutionApproach": "Configure Digital Engagement WhatsApp channel, Omni-Channel routing rules, and case auto-creation flow.",
  "impApproach": "Build in Sprint 1 after org setup; depends on the client's WABA number being approved before configuration starts.",
  "artifactCounts": {
    "objects": {"simple": 0, "medium": 0, "complex": 0},
    "objectAutomations": {"simple": 1, "medium": 0, "complex": 0},
    "recordTypes": {"simple": 0, "medium": 0, "complex": 0},
    "pageLayouts": {"simple": 0, "medium": 0, "complex": 0},
    "flows": {"simple": 0, "medium": 1, "complex": 0},
    "triggers": {"simple": 0, "medium": 0, "complex": 0},
    "apexClasses": {"simple": 0, "medium": 0, "complex": 0},
    "lwc": {"simple": 0, "medium": 0, "complex": 0},
    "customUiUx": {"simple": 0, "medium": 0, "complex": 0},
    "partnerApp": {"simple": 0, "medium": 0, "complex": 0},
    "apis": {"simple": 0, "medium": 0, "complex": 0},
    "batchExecution": {"simple": 0, "medium": 0, "complex": 0},
    "reports": {"simple": 0, "medium": 0, "complex": 0},
    "dashboard": {"simple": 0, "medium": 0, "complex": 0},
    "orgSetup": {"simple": 0, "medium": 1, "complex": 0},
    "dataMigration": {"simple": 0, "medium": 0, "complex": 0}
  },
  "miscManualEfforts": 0,
  "effortHours": 6, "reviewComments": "",
  "customerDocRef": "REQ-001", "salesforceSkuName": "Service Cloud EE",
  "isPartOfRequirementDoc": "Yes", "classification": "Config+Custom"
}
```

Two fields carry different jobs — keep them distinct:
- **solutionApproach** (template column I) — WHAT gets built, in Salesforce
  terms. 1–3 sentences. See `references/solution_approach_patterns.md`.
- **impApproach** (column J) — HOW it gets delivered: sequencing, prerequisites,
  dependencies on other rows or on client actions.

**artifactCounts are descriptive, not a pricing formula.** They record how many
of each thing gets built so the client can see the shape of the work. They are
NOT multiplied by per-item rates. `effortHours` is set directly — see
`references/effort_estimation.md` (AI-assisted delivery: review, validation,
UAT sign-off; typically 2–16h). Put scoped manual work with no artifact of its
own — workshops, documentation, client coordination — in `miscManualEfforts`.

The last four fields have no column in the BRD template. They stay in the JSON
for the Step 3 review and are not written to the workbook.

**After writing the JSON**, run the generator. It populates
`templates/brd_template.xlsx` — this is the only supported way to produce the
BRD:

```bash
node "<SKILL_DIR>/scripts/generate_xlsx.js" brd "opportunities/<ClientName>" <slug>
```

This produces `opportunities/<ClientName>/<slug>_brd.xlsx` (3 sheets: BRD,
Summary, Open Clarifications).

**Quality gate:** every row has BOTH functional AND technical assumptions
(minimum 3 each for complex items).

### STEP 3 — Review & Gap Analysis

**Read first:** `references/scope_review.md`, `references/review_checklist.md`

Review every BRD row across all 8 dimensions (completeness, assumption quality,
technical architecture, commercial scope protection, license alignment, dependency
mapping, effort sanity, sprint readiness). Write the review to
`opportunities/<ClientName>/<slug>_review_report.md`:

```markdown
# BRD Review Report

## Executive Summary
[1 paragraph: score, row count, verdict, key issues]

**Quality Score:** [0-100]/100
**Rows Reviewed:** [N]
**Verdict:** READY | NEEDS REVISION | NOT READY

## Flag Summary
| Severity | Count |
|----------|-------|
| CRITICAL | N |
| HIGH | N |
| MEDIUM | N |
| LOW | N |

## Detailed Flags
### [SEVERITY] BRN.subBrn — Sub-Module Name
**Dimension:** [Which of 8 dimensions]
**Issue:** [Specific problem]
**Recommendation:** [How to fix]

## Open Clarifications
- [List of unresolved items]
```

**Scoring:** `100 - (CRITICAL×15) - (HIGH×5) - (MEDIUM×2) - (LOW×0.5)`
**Verdict:** READY if score ≥85 and zero CRITICAL flags.

**If CRITICAL flags exist:** stop. Present them to the user. Do not proceed to
sprint planning until they're resolved.

### STEP 4 — Sprint Planning

**Read first:** `references/sprint_planning.md`, `references/effort_reference.md`

Ask the user: "How many developers on the build team? (default: 3)". Calculate and
write the sprint plan (matching `schemas/sprint_plan.ts`) to
`opportunities/<ClientName>/<slug>_sprint_plan.json`:

```json
{
  "parameters": {
    "numberOfDevelopers": 3, "devCapacityPerSprint": 210, "totalGrandEffort": 850,
    "totalDataLoadEffort": 160, "totalDevEffort": 690, "numberOfSprints": 4,
    "balanceEffort": 150, "preSprintWeeks": 8, "postSprintWeeks": 6, "totalProjectWeeks": 22
  },
  "moduleEfforts": [
    {"module": "Case Management", "phase": "Phase 1", "totalEffort": 200, "dataLoadEffort": 0, "devEffort": 200, "sprintAssignment": [1,2]}
  ],
  "weeklyGrid": [
    {"weekNumber": 1, "phase": "Discovery Kickoff", "allocation": {"ba": 40, "sa": 40, "developers": [0,0,0], "ds": 0, "qa": 0}, "totalHours": 80}
  ],
  "roleHourSummary": {
    "ba": 320, "sa": 320, "developers": [{"name": "TS-1", "hours": 490}],
    "ds": 120, "qa": 280, "grandTotal": 1530
  }
}
```

Also write `opportunities/<ClientName>/<slug>_timeline.json`:

```json
{
  "totalWeeks": 22,
  "phases": [
    {"serial": 1, "taskTitle": "Discovery & Documentation", "taskOwner": "BA, SA", "startWeek": 1, "endWeek": 4, "effortHours": 0, "phase": "Discovery"},
    {"serial": 2, "taskTitle": "Solution Design", "taskOwner": "BA, SA", "startWeek": 5, "endWeek": 8, "effortHours": 0, "phase": "Solutioning"},
    {"serial": 3, "taskTitle": "Build Sprints", "taskOwner": "Developers, QA", "startWeek": 9, "endWeek": 16, "effortHours": 690, "phase": "Build"},
    {"serial": 4, "taskTitle": "SIT", "taskOwner": "QA, SA", "startWeek": 17, "endWeek": 18, "effortHours": 0, "phase": "Testing"},
    {"serial": 5, "taskTitle": "UAT", "taskOwner": "BA, Client", "startWeek": 19, "endWeek": 20, "effortHours": 0, "phase": "Testing"},
    {"serial": 6, "taskTitle": "Go-Live", "taskOwner": "All Roles", "startWeek": 21, "endWeek": 21, "effortHours": 0, "phase": "Go-Live"},
    {"serial": 7, "taskTitle": "Hypercare", "taskOwner": "SA, BA", "startWeek": 22, "endWeek": 22, "effortHours": 0, "phase": "Hypercare"}
  ]
}
```

**After writing both JSON files**, run:

```bash
node "<SKILL_DIR>/scripts/generate_xlsx.js" sprint "opportunities/<ClientName>" <slug>
```

This produces `<slug>_sprint_plan.xlsx` and `<slug>_timeline.xlsx`.

### STEP 5 — Completion Summary

Tell the user:

```
✅ PRESALES ARTEFACTS READY — <ClientName>

📁 opportunities/<ClientName>/<slug>_brd.xlsx             — [N] rows, [X]h total
📁 opportunities/<ClientName>/<slug>_sprint_plan.xlsx     — [N] sprints, [X] weeks
📁 opportunities/<ClientName>/<slug>_timeline.xlsx        — Project timeline
📁 opportunities/<ClientName>/<slug>_review_report.md     — Quality score: [X]/100

Open the xlsx files in Excel for final presentation.
```

## Resuming

The user must specify the client name (or infer it from the `opportunities/`
folder in the current project). Re-derive the slug before loading files.

- "resume from scope" / "resume from brd" → load `<slug>_engagement_context.json`, skip Step 1
- "resume from review" → load `<slug>_brd.json`, skip Steps 1–2
- "resume from sprint" → load `<slug>_brd.json`, skip Steps 1–3
- "regenerate xlsx" → run `node "<SKILL_DIR>/scripts/generate_xlsx.js" all "opportunities/<ClientName>" <slug>`
- "regenerate brd" → run the same script with `brd` instead of `all`

Regenerating always re-populates the template from `<slug>_brd.json`. To change
the BRD's columns, edit `templates/brd_template.xlsx` — never patch the output
workbook by hand, or the next regeneration silently discards the edit.

## Test scenarios (no discovery needed)

**"Run Test 1" / "ACME Electronics UAE"** — Consumer Electronics After-Sales, UAE.
Service Cloud EE, Field Service Plus, Digital Engagement. 50 agents, 120 technicians,
10 dispatchers, 8 managers. Case Management (5 channels), WO Lifecycle, FSL Dispatch
& Optimization, FSL Mobile App, Entitlements & SLA, Knowledge Base, Reports &
Dashboards. SAP ERP (bidirectional), Avaya CTI (inbound). Migration from SAP CRM —
Accounts (50k), Contacts (75k), Cases (5k), Work Orders (8k). Phase 1/2, Go-Live
Phase 1: Q4 2026. Expected: 30–40 rows; effort and sprint count follow the
per-row model in `references/effort_estimation.md` (indicative: ~300–550h, 2–3
sprints) — these are directional, not a validated benchmark.

**"Run Test 2" / "DistribuCo KSA"** — Energy Distribution, KSA. Sales Cloud,
Revenue Cloud/CPQ, Service Cloud EE, Experience Cloud. 40 sales reps, 8 managers,
20 service agents, 500 portal users. Lead-to-Quote, DOA Approval Workflow, Customer
Portal Self-Service, Case Management, Sales Reporting. Oracle ERP (bidirectional).
Migration from Oracle CRM — Accounts (5k), Contacts (8k), Opportunities. Phase 1/2,
Go-Live Phase 1: Q4 2026. Expected: 18–25 rows (indicative: ~150–250h, 1–2
sprints).

**"Run Test 3" / "MegaCorp India"** — Manufacturing, India. Service Cloud EE, Field
Service Plus, Experience Cloud, Salesforce Platform, Digital Engagement,
Einstein/Agentforce. Full service + field + portal + AI + 6 integrations. Expected:
80–100 rows (indicative: ~800–1,400h, 2–4 sprints depending on team size).

## Non-negotiable quality rules

1. NEVER write an assumption without a number, a cap, or a named feature.
2. NEVER use 'etc.' in any assumption — enumerate explicitly.
3. NEVER reference a Salesforce product without its correct commercial SKU name.
4. NEVER skip the Review step — even if scope looks complete.
5. ALWAYS flag if a capability needs a license not yet confirmed.
6. ALWAYS separate Data Load effort from Development effort in sprint calculations.
7. ALWAYS include client responsibilities in functional assumptions.
8. NEVER proceed past CRITICAL review flags without user acknowledgment.
9. ALWAYS produce the BRD by running the generator against
   `templates/brd_template.xlsx`. Never hand-build the workbook, never reorder
   or add columns, and never edit the generated xlsx directly.

## Assumption writing rules

- Start every assumption with 'Assuming'.
- Quantify every assumption (number, feature name, cap).
- Client responsibilities: 'Assuming [client] will provide/confirm [X] prior to [milestone].'
- Exclusions: '[Feature] is NOT considered in the current scope.'
- Minimum 3 functional + 3 technical assumptions per row for Config+Custom or
  Integration items.

## Sprint planning rules

- Sprint = 2 weeks always (never 1-week or 3-week).
- Developer capacity = 70h per sprint (35h/week).
- Pre-sprint: 8 weeks of Discovery + Solutioning.
- Post-sprint: SIT (2wk) + UAT (2wk) + Go-Live (1wk) + Hypercare (1wk+).
- Data Load effort is SEPARATE from dev sprint capacity.

## Effort reference (quick guide)

One direct `effortHours` estimate per row — human review/validation/UAT time
on an AI-agent-assisted build, not full manual-build hours.

| Row complexity | effortHours |
|---|---|
| Simple | 2–5h |
| Medium | 5–10h |
| Complex | 10–16h |
| Exceptionally large (rare, flag explicitly) | up to 300h |

Full guidance: `references/effort_estimation.md` and `references/effort_reference.md`
