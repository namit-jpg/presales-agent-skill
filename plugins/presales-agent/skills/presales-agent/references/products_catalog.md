# Salesforce Products Catalog

This file maps Salesforce products to correct SKU names, feature capabilities, and licensing notes.
The agent uses this to correctly label every scope row.

| Product Category | SKU Name in Scope | Key Capabilities | License Note |
|-----------------|-------------------|-----------------|--------------|
| CRM Core | Sales Cloud | Leads, Opportunities, Accounts, Quotes, Forecasting | Standard / EE / UE |
| Service | Service Cloud EE | Cases, Entitlements, Knowledge, Service Console | Requires EE for console features |
| Field Service | Field Service Plus | Work Orders, Dispatcher Console, FSL Optimizer, Mobile App | FSL Managed Package required |
| Digital Channels | Digital Engagement | WhatsApp (WABA), Live Chat, Messaging, Social ORM | Per-conversation credits apply |
| Portal / Community | Experience Cloud | Partner Portal, Customer Portal, LWC pages | Per-login or per-member licensing |
| CPQ | Revenue Cloud / CPQ | Product Catalog, Pricing, Quoting, Approvals, Billing | Separate SKU from Core CRM |
| AI & Agents | Einstein / Agentforce | Agentforce Agents, Einstein Predictions, Copilot | Credit-based consumption |
| Analytics | CRM Analytics | Dashboards, Datasets, Einstein Discovery | Separate license from reports |
| Integration | MuleSoft / Integration Cloud | API Management, Anypoint Platform | Separate product |
| Platform | Salesforce Platform | Custom Objects, Apex, LWC, Flows (non-CRM) | Developer / Platform license |

## Detailed SKU Notes

### Service Cloud
- **Service Cloud EE** (Enterprise Edition): Includes Service Console, Case Milestone tracking, Omni-Channel routing
- **Service Cloud UE** (Unlimited Edition): Includes unlimited custom objects, premier success
- Do NOT use 'Service Cloud' without the edition suffix in scope documents

### Field Service
- **Field Service Plus**: Required for Dispatcher Console, FSL Optimizer, Mobile App
- **Field Service Standard**: Scheduler only, no Optimizer
- ALWAYS use 'Field Service Plus' when Optimizer or Mobile is in scope

### Digital Engagement
- Requires WABA (WhatsApp Business API) account owned by client
- Per-conversation billing model (not per-user)
- Includes: WhatsApp, Live Chat, In-App Messaging, SMS, Social
- Chatbot (Einstein Bots) is a SEPARATE SKU from Digital Engagement

### Experience Cloud
- **Per-Member Licensing**: Named users, higher cost, more features
- **Per-Login Licensing**: Anonymous/guest users allowed, lower cost per user
- ALWAYS confirm which licensing model applies in scope assumptions

### Revenue Cloud / CPQ
- Separate managed package from core Salesforce
- Requires Salesforce CPQ + Billing license for billing workflows
- ALWAYS separate from 'Sales Cloud' in SKU references

### Einstein / Agentforce
- **Agentforce**: Autonomous AI agents (Service Agent, Sales Coach, etc.)
- **Einstein Predictions**: Predictive scoring, recommendation models
- **Einstein Copilot**: Embedded AI assistance in Salesforce UI
- Credit-based consumption model — ALWAYS state in assumptions
- No custom model training in standard implementation scope

### MuleSoft / Integration Cloud
- Separate product from Salesforce core
- If MuleSoft is NOT licensed, integrations must use Salesforce native APIs
- Always confirm: Is middleware procured? Who owns it?
