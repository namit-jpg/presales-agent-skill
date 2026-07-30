# Scope Patterns — Module/Sub-Module Reference by Cloud

This file defines the standard module decomposition patterns for each Salesforce Cloud.
The Scope Agent uses this to generate structurally correct, comprehensive scope matrices.

## Service Cloud

| Module | Common Sub-Modules |
|--------|-------------------|
| Case Management | Case Creation (by channel), Case Assignment, Case Lifecycle Management, Case Escalation & SLA, Knowledge Integration, Case Closure, CSAT |
| Account & Contact Management | Account Management & 360, Contact Master, Duplicate Management, Account Hierarchy |
| Entitlements & SLA | Entitlement Processes, Milestones, Escalation Rules, SLA Reporting |
| Omnichannel & Digital | WhatsApp Setup, Email-to-Case, Live Chat, CTI Integration, Omni-Channel Routing |
| Knowledge Management | Knowledge Base Setup, Article Templates, Approval for Publishing, Agent-Facing Knowledge |
| Reports & Dashboards | Service KPI Reports, Case SLA Reports, Agent Performance Dashboards |

## Field Service Lightning (FSL)

| Module | Common Sub-Modules |
|--------|-------------------|
| Setup & Configurations | FSL Package Setup, Permissions, Data Setup (Territories/Resources/Skills/OH) |
| Work Order Management | WO Creation & Assignment, WO Lifecycle, Work Types, Work Plans |
| Service Appointment Management | SA Scheduling & Creation, Manual Dispatch, Automatic Dispatch, Optimization, SA Lifecycle, Service Reports, Scheduling Policies, Travel Time |
| Dispatcher Console | Dispatcher Console Config, Gantt View, Map & Traffic, Carry-Forward Logic |
| Resource Absence | Holidays, Leaves, Leave Approval |
| Timesheets | Timesheet Submission, Timesheet Approval |
| FSL Mobile App | Branding & Themes, Tabs & Features, Technician Access & Features, Offline Mode, WO Execution in Mobile |

## Sales Cloud

| Module | Common Sub-Modules |
|--------|-------------------|
| Lead Management | Lead Capture, Lead Qualification, Lead Routing, Lead Conversion |
| Opportunity Management | Sales Pipeline, Opportunity Stages, Forecasting, Stakeholder Collaboration |
| Account Management | Customer 360, B2B Customer Profile, Hierarchy |
| Activity Management | Task & Event Tracking, Email Integration, Meeting Logging |
| Reporting & Analytics | Pipeline Reports, Win/Loss Analysis, Sales Dashboards, Forecast Reports |

## Revenue Cloud / CPQ

| Module | Common Sub-Modules |
|--------|-------------------|
| Product Catalog | Product Setup, Product Bundles, Options & Features |
| Pricing | Price Books, Discount Schedules, Subscription Pricing |
| Quote Configuration | Quote Creation, Product Selection, Quote Versioning, Quote PDF |
| Approval Management | DOA Workflow, Sequential Approvals, Approval History |
| Contract Management | Contract Generation, Renewal Process, Amendment Workflow |

## Experience Cloud

| Module | Common Sub-Modules |
|--------|-------------------|
| Partner Portal | Portal Access & Security, Case Workbench, Inventory Views, Claims Workbench, KPI Dashboards |
| Customer Portal | Self-Service Case Management, Appointment Booking, Knowledge & FAQs, Technician Tracking |
| Portal Setup | Site Configuration, Branding & Theme, Navigation, User Roles & Permissions |

## Digital Engagement

| Module | Common Sub-Modules |
|--------|-------------------|
| Omnichannel Setup | WhatsApp Setup (WABA), Live Chat Configuration, Email-to-Case Channel, Social ORM Setup |
| Routing Configuration | Omni-Channel Routing Rules, Queue Setup, Skill-Based Routing, Overflow Logic |
| Message Templates | WhatsApp Approved Templates, Bot Handoff Configuration |

## Einstein / Agentforce

| Module | Common Sub-Modules |
|--------|-------------------|
| AI Capabilities | Agentforce Service Agent Setup, Einstein Case Classification, Einstein Article Recommendations |
| AI Configuration | Topic Configuration, Action Setup, Guardrail Configuration |
| Reporting | AI Adoption Dashboards, Agent Performance Metrics |

## Integration Cloud

| Module | Common Sub-Modules |
|--------|-------------------|
| ERP Integration | SAP/Oracle Inbound (Accounts, Products), Outbound (Orders, Cases) |
| CTI Integration | Screen Pop, Click-to-Dial, Call Logging, Wrap-Up Codes |
| SMS Gateway | Outbound Notifications, Delivery Receipts |
| Payment Gateway | Payment Links, Transaction Status Sync |
| ORM / Social | Social Listening, Ticket Creation from Mentions |

## Platform

| Module | Common Sub-Modules |
|--------|-------------------|
| Org Setup | Profiles, Permission Sets, Roles, Queues, Public Groups, Security Model |
| Data Migration | Migration Strategy, Data Templates, Load Waves, Validation |
| Reports & Dashboards | Operational Reports, Management Dashboards, Analytics |
| Training & Adoption | User Training Plan, Admin Training, Change Management |

## Phase Assignment Quick Guide

| Phase | What Goes Here | Examples |
|-------|---------------|---------|
| Phase 1 | Core data model, foundation config, primary processes, P1 integrations | Case management, Account/Contact, Work Orders, Core FSL, Email/WhatsApp, SAP integration |
| Phase 2 | Extended automation, secondary processes, portal, analytics, P2 integrations | Portal, Warranty claims, Advanced FSL, Mobile app, Extended reports |
| Phase 3 | AI/Agentforce, complex custom builds, lower-priority integrations | Agentforce agents, OMS integration, Predictive maintenance, Custom portal features |
| Cross-Phase | Org setup, data migration, security model, training | Profiles, permission sets, data loads, user training |
