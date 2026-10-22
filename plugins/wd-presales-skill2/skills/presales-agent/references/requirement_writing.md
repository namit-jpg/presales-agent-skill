---
skill: requirement_writing
version: 2.0
description: >
  How to write the client-facing columns of the BRD — Requirement, Requirement
  Description, Information Required, and Not Included — so a business reader
  with no Salesforce knowledge can tell exactly what they are getting, what they
  must supply, and what they are not getting.
---

# Requirement Writing Skill

## Core principle: state, don't assume

The BRD is read by the client's business owners, not by Salesforce architects.
It no longer carries "Assuming…" statements. Every point in a row is one of
three things, and each has its own column:

| Kind of statement | Column | Voice |
|---|---|---|
| What we will deliver | Requirement Description | "We will…", "Salesforce will…", "[Client] will be able to…" |
| What the client must supply or decide, and when | Information Required from [Client] | "[Client] will provide/confirm/arrange … during Discovery Week." |
| What a reader might expect but is not included | Out of Scope sheet | "… are not included." |

If you catch yourself writing "Assuming", decide which of the three it really
is and move it there. A point that is none of the three does not belong in the
BRD.

## Never invent facts

Numbers, names, lists and system names in the BRD are commitments. Every one
must come from the engagement context, a client document, or something the
user told you.

- If discovery gave you the number, use it exactly: "120 named users: 70 in
  Dubai and 50 in Riyadh."
- If the number is not known, do NOT make one up. Describe the deliverable by
  reference to what the client will supply ("the approval levels Northwind
  confirms") and add the matching point to Information Required.
- Record where each figure came from in the row's internal `sourceRefs`.
- Unknowns you could not resolve this way are listed for the user at the end
  of Step 2, not hidden in the document.

A bounded, client-confirmed list is fine. An invented cap ("a maximum of 5
templates") that nobody agreed to is not.

## Requirement (column D)

The requirement as the client would phrase it — short, plain, no product names.

- Good: "Who can see customer and sales information", "Tracking how long
  approvals have been pending", "Moving customer companies and contacts"
- Bad: "Sharing Model & OWD Configuration", "Approval Process Escalation Flow"

## Sub Business Module (column C)

A short noun-phrase name for the capability, Title Case. Use the client's own
form names and acronyms where they have them, expanded on first use and
separated from the descriptive name by " | ":

- "DAF (Discount Approval Form) | Discount and Margin Approval"
- "Customer Complaint Registration"
- "SAP Contract Booking and Final Quotation Transfer"

## Requirement Description (column E)

A list of points; the generator renders each as a "•" bullet with a blank line
between them. Aim for 3–8 points.

**Write for a business reader:**
- Plain English. No Salesforce object, field, flow, Apex or LWC names here —
  those go in Solution Approach. Product names a user will see (Salesforce
  mobile app, Slack, Outlook, SAP) are fine.
- Expand every acronym on first use in the row: "Quote Request Form (QRF)".
- One idea per point. Short sentences.

**Be concrete:**
- Name the people: "the Regional Sales Manager", "the Sales Administrator",
  not "users" or "stakeholders".
- Enumerate lists completely: "New, Acknowledged, Under Investigation, In
  Resolution, Awaiting Customer, Resolved, Corrective Action Verification and
  Closed." Never "etc.", "and more", "such as" followed by an open list.
- Give the trigger and timing: "14 days and three days before the due date
  and once just after it becomes overdue."
- Say what is blocked, not just what is allowed: "A rejected enquiry cannot be
  converted into an opportunity."
- Name the downstream handoff: "An approved enquiry becomes an opportunity and
  starts the agreed SAP enquiry and customer creation process."

**State dependencies and limits as facts, inside the description:**
- "Daily receipt depends on the project data vendor providing the agreed data feed."
- "Personal contact information will only be imported where Northwind's
  subscription permits it."
- "No enquiry will be combined with another automatically."

**Cross-reference rather than repeat:** "The rules for duplicate project
enquiries are covered separately in requirement 5.3."

**Integration rows** say in plain words what moves, which direction, when, and
what happens on failure: "If the transfer is unsuccessful, the issue will be
recorded for support review and retry." The middleware may be named
("SAP Cloud Platform Integration (CPI)") because the client's IT team will
recognise it.

**Data migration rows** give the record counts and object list from discovery,
the source, and the reconciliation step: "We will load up to 5,000 customer
records and up to 8,000 contacts… and provide a reconciliation report for each
group of records."

## Information Required from [Client] (column F)

What the client must provide, decide, arrange or approve for this requirement,
with a timing anchor. One point per item.

- "Northwind will provide the complete list of 120 users, their email addresses,
  managers, regions and access groups by the end of Discovery Week."
- "Northwind will arrange access and support from its website team, provide the
  two form details and submit test enquiries during business testing."
- "Northwind's regional sales teams will align internally on a single
  approval process and confirm the agreed structure to [Partner]."

Timing anchors to use: "during Discovery Week", "by the end of Discovery
Week", "before [setup step]", "during the working sessions", "during business
testing", "before launch". If a row needs nothing from the client, leave the
list empty — the generator writes "None".

Every unknown you deferred from the description (see "Never invent facts")
MUST appear here.

## Not Included in This Scope (Out of Scope sheet)

Exclusions that a reader of *this* requirement might reasonably expect. Not a
generic disclaimer list.

- End each point with "… are not included." / "… is not included."
- Be specific to the row: "Automatic reading of every incoming email and
  automatic lead creation without a salesperson's action are not included."
- Third-party costs: "Development or additional subscription fees charged by
  the project data vendor are not included."
- Conditional exclusions are allowed when stated plainly: "If billing and
  collection information is not held in a standard format in SAP before
  development starts, it will be treated as out of scope and planned for a
  later phase."
- Where a natural expectation is partly covered, say what is covered first:
  "Salesforce access is covered for the agreed 120 licensed users. A separate
  employee login portal is not included."

Rows with no sensible exclusion leave `notIncluded` empty and do not appear on
the Out of Scope sheet.

## Business Process Guide

A short end-to-end walk through the client's new process (`processSteps`,
typically 6–12 steps) — what happens and where the work takes place — plus a
glossary (`glossary`) of every client acronym and internal term used in the
BRD, in plain meaning. Each glossary term used in a row should also be
expanded in that row.

## Anti-patterns

- "Assuming…" anywhere.
- "etc.", "and more", "as needed", "similar features", "as applicable".
- Salesforce build vocabulary in the description ("record-triggered flow",
  "custom object", "permission set").
- A number that does not appear in the engagement context or a client source.
- An exclusion copied onto every row ("Training is not included.").
- An Information Required point with no timing.
