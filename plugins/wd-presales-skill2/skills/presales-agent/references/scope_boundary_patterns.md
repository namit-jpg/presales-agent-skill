# Scope Boundary Patterns by Product Area

Reusable patterns for the two boundary columns of the BRD: **Information
Required from [Client]** (column F) and **Not Included in This Scope** (Out of
Scope sheet). Rewrite them in the client's own terms; never paste a bracketed
placeholder into the output, and never fill a bracket with a number nobody
gave you — move the unknown into Information Required instead
(`references/requirement_writing.md`).

## Quick reference

| Product area | Typical Information Required | Typical Not Included |
|---|---|---|
| Company setup / access | User list with emails, managers, regions, access groups; org chart; currencies; working hours | Separate systems per country; custom login portals; licences beyond the agreed count |
| Customer records | Customer categories; SAP/ERP customer identifiers; group/site relationships | Document management systems; AI scoring of customer potential; more hierarchy levels than agreed |
| Enquiries / leads | Source names; required enquiry fields; assignment rules | LinkedIn/advertising lead capture; marketing campaigns; automatic conversion without review |
| Duplicate checks | Review of proposed matching fields; clean-up of known duplicates in migration files | Paid duplicate-cleaning tools; AI matching of documents or drawings |
| Quotations / approvals | Discount and margin limits per region; approvers and escalation levels; quotation template | Automatic repricing; clause comparison; approvals outside the agreed process |
| Email / calendar | Mailbox and calendar access for named users; admin consent | Automatic capture of every email; Gmail; a separate email history platform |
| Slack | Workspace admin access; channel naming; which alerts go to whom | Slack licences; Slack workflows outside the listed actions |
| Third-party data feeds | Vendor contact; permission to use the feed; sample records; fields to capture | Vendor news/analytics; vendor fees; vendor's own CRM |
| ERP integration (SAP, Oracle) | Field mapping approval; ERP-side development by the client's ERP team; test environment | Changes to ERP orders after creation; live integration with systems not named; ERP-side build |
| Data migration | Approved source files in the agreed format; de-duplicated data; sign-off on reconciliation | Continuous sync of old files; extensive data cleaning; history older than the agreed period |
| Reports / dashboards | KPI definitions; target figures; who sees which dashboard | Tableau / CRM Analytics; external BI tools |
| Complaints / service | Complaint categories; first-response targets; department owners | A full Service Cloud contact centre; customer portal unless scoped |
| Surveys | Survey tool access; question set; trigger point | A new survey platform; AI survey agents |
| Digital Engagement / WhatsApp | Approved Meta Business account and WhatsApp number; message templates | Chatbot development; conversation credits beyond those procured |
| Field Service | Territories, skills, work types, working hours; technician list | Custom native mobile app; optimisation runs beyond those agreed |
| Experience Cloud | Licence type confirmed; branding assets; page list | Custom right-to-left development; single sign-on unless confirmed |
| Agentforce / Einstein | Use cases; data the AI may use; data residency approval | Custom model training; credits beyond those procured |

## Worked examples

### Third-party project data feed
**Information Required**
- [Client] will arrange the vendor contact, confirm permission to use the
  project feed and provide sample records by Discovery Week.
- [Client] will confirm the details to be captured from the platform; we
  recommend limiting this to the fields the sales team needs to qualify an
  enquiry.

**Not Included**
- Vendor news, market analytics and any development or subscription fees
  charged by the vendor are not included.

### ERP booking transfer
**Information Required**
- [Client] will supply the required booking details, approve the field
  mapping and arrange the ERP contract creation process.

**Not Included**
- Salesforce will not create or change ERP orders after they are booked.

### Approvals
**Information Required**
- [Client] will provide the discount and margin limits for each region, along
  with approvers and escalation levels, during Discovery Week.

**Not Included**
- Automatic repricing of change requests is not included.

### Data migration
**Information Required**
- [Client] will provide the approved customer, parent group and contact files
  in the agreed format.
- [Client] will review and remove known duplicates before handing files over.

**Not Included**
- Historical emails, attachments and closed opportunity history older than the
  agreed preceding financial year are not included in the initial data load.

### Licences
**Not Included** (where licences matter to the row)
- Salesforce licences beyond the agreed [N confirmed in discovery] users are
  not included.
- Use of [SKU] depends on [Client] procuring it before setup begins — put this
  in the description if the requirement cannot work without it.
