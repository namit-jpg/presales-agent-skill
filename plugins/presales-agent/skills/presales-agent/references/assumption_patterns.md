# Assumption Patterns by Product Area

Reusable assumption templates organized by Salesforce product area.
Distilled from delivered enterprise Salesforce implementation scope documents.

## Core Patterns by Product

| Product Area | Common Functional Assumption | Common Technical Assumption |
|-------------|-----------------------------|-----------------------------|
| Email-to-Case | Assuming client IT will configure email forwarding rule to SF routing address. | Assuming standard Email-to-Case; 25MB attachment limit applies. |
| Digital Engagement / WhatsApp | Assuming client owns and manages Meta Business / WABA account. | Assuming 24-hour session window applies; outbound requires pre-approved templates. |
| CTI / Telephony | Assuming client procures CTI vendor; implementation partner supports Salesforce config only. | Assuming Open CTI framework compliance; no custom Apex for screen pop. |
| FSL Data Setup | Assuming max 3 territory levels, 50 territories per level, 5 skills, 3 work types. | Assuming Territory Members + Time Slots model (not Shifts). |
| FSL Optimizer | Assuming 2 automated optimizer runs per day; criteria shared by client. | Assuming standard Optimizer limitations; single scheduling policy. |
| Entitlements / SLAs | Assuming max 2 escalation levels; client provides milestone details. | Assuming max 3 entitlements, 10 milestones; email-only escalation channel. |
| Approval Processes | Assuming max 3 sequential approval levels; no matrix/parallel approvals. | Assuming standard Salesforce Approval Process; bell notification only. |
| Data Migration | Assuming client provides clean, formatted data per WD-shared templates. | Assuming initial one-time load; no automation for recurring migration. |
| Experience Cloud Portal | Assuming named-user licensing; SSO not included unless separately confirmed. | Assuming standard portal branding; no custom RTL development. |
| Agentforce / Einstein | Assuming AI use cases align with standard Agentforce capabilities; no custom model training. | Assuming credit-based consumption; client cybersecurity policies apply. |

## Detailed Assumption Templates

### Case Management
**Functional:**
- Assuming a maximum of [N] case record types are configured.
- Assuming the client will provide the case priority matrix and escalation rules during discovery.
- Assuming automated case assignment rules will use [routing logic: round-robin/queue/skill-based].
- Case closure survey / CSAT integration is NOT in scope unless Digital Engagement is confirmed.

**Technical:**
- Assuming standard Case object with max [N] custom fields.
- Assuming Email-to-Case with standard 25MB attachment size limit.
- Assuming max [N] assignment rules with [N] criteria per rule.

### WhatsApp / Digital Engagement
**Functional:**
- Assuming the client has an approved Meta Business Account and WABA number prior to go-live.
- Assuming a maximum of [N] WhatsApp message templates are configured.
- Assuming agent-facing conversation UI will use standard Omni-Channel console.
- Chatbot / Einstein Bot development is NOT in scope.

**Technical:**
- Assuming Digital Engagement license is procured with [N] conversation credits/month.
- Assuming 24-hour session window constraint applies to all inbound conversations.
- Assuming outbound proactive messaging requires pre-approved WABA template submission.
- Assuming standard WhatsApp connector (no custom middleware) unless MuleSoft is confirmed.

### Field Service Lightning (FSL)
**Functional:**
- Assuming a maximum of 3 territory levels are required.
- Assuming a maximum of 50 service territories are configured.
- Assuming a maximum of 5 skill types and 3 work types are defined.
- Assuming the client will provide resource availability schedules and territory boundaries during discovery.
- Timesheet approval workflow is [included/NOT included] in this scope.

**Technical:**
- Assuming Field Service Plus licenses are procured for all dispatchers and technicians.
- Assuming Territory Members + Time Slots scheduling model (not Shifts model).
- Assuming FSL Optimizer runs a maximum of 2 scheduled optimization jobs per day.
- Assuming FSL mobile app uses standard branding; no custom native app development.
- Assuming offline mode is enabled with standard sync configuration.

### Integrations
**Functional:**
- Assuming [System Name] integration is [inbound/outbound/bidirectional].
- Assuming [client] will provide API documentation and sandbox access prior to sprint start.
- Assuming [System Name] has REST API support; SOAP fallback is NOT in scope.
- Data transformation logic is limited to [N] field mappings as agreed during discovery.

**Technical:**
- Assuming REST API with JSON payload; no custom middleware unless MuleSoft is confirmed.
- Assuming [client] IT team is responsible for [System Name] side configuration.
- Assuming max [N] API calls per transaction; bulk processing via Batch Apex.
- Error handling limited to standard retry with [N] attempts; dead-letter queue is NOT in scope.
- Assuming API credentials and OAuth configuration will be provided by [client] IT.

### Data Migration
**Functional:**
- Assuming one-time historical data migration from [source system].
- Assuming the client will provide data in CSV format per WD-supplied migration templates.
- Assuming max [N] migration waves covering [list of objects].
- Assuming data cleansing and deduplication is the client's responsibility prior to migration.

**Technical:**
- Assuming Salesforce Data Loader or Bulk API for migration; no custom migration tool development.
- Assuming max [N] records per object per migration wave.
- Assuming source data fields map to [N] target Salesforce fields; complex transformations are NOT in scope.
- Assuming client sign-off on migrated data quality is required before go-live.

### Experience Cloud
**Functional:**
- Assuming [named-user/per-login] licensing model is confirmed.
- Assuming a maximum of [N] portal pages are configured.
- Assuming SSO integration is [included/NOT included] in this scope.
- Assuming portal branding uses client-provided style guide and logo assets.
- Custom RTL (right-to-left) language development is NOT in scope.

**Technical:**
- Assuming LWR (Lightning Web Runtime) site template.
- Assuming standard Experience Cloud components; no custom Apex REST for portal APIs.
- Assuming max [N] custom LWC components for portal-specific functionality.
- Assuming CDN/performance optimization is the client's infrastructure responsibility.

### Agentforce / Einstein AI
**Functional:**
- Assuming AI use cases are limited to [list: case classification/summarization/routing].
- Assuming no custom AI model training or fine-tuning is in scope.
- Assuming the client's data governance team will approve data used for AI training.
- Einstein Prediction Builder models limited to [N] predictions.

**Technical:**
- Assuming Einstein / Agentforce credit-based consumption model applies.
- Assuming client has procured sufficient Agentforce credits for go-live volume.
- Assuming Agentforce uses standard out-of-box topics and actions; no custom action development beyond [N] items.
- Assuming client cybersecurity and data residency policies are confirmed prior to AI enablement.
