---
skill: solution_approach_patterns
version: 2.0
description: >
  Concise solution-approach patterns for the BRD's Solution Approach column
  (G) — the one column written in Salesforce terms. A compact paragraph per
  requirement, not a technical design document.
---

# Solution Approach Patterns

Each entry is 1–3 sentences: the standard features, objects, automation type
and integration pattern involved, at the level of detail the client's IT team
needs to understand *how* the requirement will be met. The Requirement
Description already says *what* the business gets — do not restate it.

Rules:
- Lead with standard features; name custom code (Apex, LWC) only where the
  requirement needs it, and say why in a clause.
- Name the middleware and direction for every integration.
- Never introduce capability the description does not promise.
- Never put client responsibilities or exclusions here — they have their own
  columns.

## Company setup and access

**Regional setup and currencies** — Company Information with one fiscal year;
Advanced Currency Management with the corporate currency set to the
management reporting currency; one Business Hours record per regional office.

**User access** — Role hierarchy mirroring the regional reporting structure,
permission set groups per access group, field-level security on margin and
credit fields; SSO through the client's identity provider via SAML.

**Visibility** — Private sharing on Account and Opportunity, owner- and
criteria-based sharing rules per region, Account and Opportunity Teams for
cross-region collaboration.

## Customers and accounts

**Customer master** — Account record types per partner type, an external ID
field holding the ERP customer number, related lists for enquiries, quotes,
orders, projects and complaints on a Lightning record page.

**Account classification** — Picklist set by a scheduled flow from agreed
scoring fields, with an override reason field reserved for managers.

**Group hierarchy** — Standard Parent Account lookup capped at the agreed
depth; roll-up fields maintained by record-triggered flows for group totals.

**Duplicate prevention** — Standard Matching and Duplicate Rules (name +
billing country for Accounts, email or mobile for Contacts), blocking on
create and alerting on edit; merges through the standard Merge action.

## Enquiries and opportunities

**Enquiry register** — Lead object as the enquiry, a compact Dynamic Form with
progressive sections, Lead Source picklist aligned to the agreed sources.

**Routing** — Lead Assignment Rules on country, building type and source into
regional queues owned by the Sales Head.

**Qualification gate** — Before-save flow enforcing the Proceed / Do Not
Proceed / Refer decision, approval process for referrals, conversion blocked
by validation rule until approved.

**Website forms** — Web-to-Lead (or a REST endpoint where attachments are
needed) with a standard auto-response rule.

**Stage gates** — Opportunity Path with stage-specific required fields
enforced by validation rules, and a Closed Lost reason picklist.

## Quotations and approvals

**Quotations** — Standard Quotes with a quote template for the PDF, quote
syncing to the opportunity, and a clone action for revisions.

**Discount / margin approval** — Approval Process with entry criteria on
discount and margin thresholds, approver steps per region, and a validation
rule blocking quote send until approved; Slack approval actions via the
Salesforce for Slack app.

**Approval ageing** — Scheduled flow computing days pending on the approval
record and posting escalation alerts after the agreed thresholds.

## Activities and collaboration

**Outlook** — Outlook Integration with Einstein Activity Capture off, so
users log emails and events deliberately from the side panel.

**Slack** — Salesforce for Slack app, record channels for key accounts and
bids, flow-triggered Slack messages for approvals and milestones.

## Integrations

**ERP outbound (e.g. booking)** — Platform event on Closed Won consumed by the
client's middleware (e.g. SAP CPI) to create the contract; an Integration Log
object records failures for retry.

**ERP inbound (e.g. status, billing)** — Middleware upserts on external IDs
into read-only fields or a child object, scheduled at the agreed frequency.

**Third-party data feed** — Scheduled Apex callout (or middleware push to the
REST API) upserting Leads on the vendor's project ID, with the duplicate rules
applied and failures logged for retry.

**Spreadsheet imports** — Data Import Wizard with a published column template
mapped to Lead; standard assignment and duplicate rules fire on insert.

## Reporting

**Dashboards** — Standard reports and Lightning dashboards per persona, with
dynamic dashboards running as the viewing user; custom report types where
the data spans objects.

## Complaints

**Complaint handling** — Case record type for complaints, status values as
agreed, entitlement milestones for first response and resolution, and
validation rules gating Resolved/Closed on root cause and verification fields.

## Data transfer

**Initial load** — Data Loader / Bulk API in dependency order (Accounts →
Contacts → Opportunities), external IDs preserved for re-runs, and a
reconciliation report per object.
