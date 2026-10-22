import { z } from 'zod';

export const SalesforceProductSchema = z.object({
  sku: z.string(),
  edition: z.string().optional(),
  confirmed: z.boolean(),
  notes: z.string().optional(),
});

export const PersonaSchema = z.object({
  name: z.string(),
  count: z.number(),
  department: z.string().optional(),
});

export const IntegrationSchema = z.object({
  systemName: z.string(),
  direction: z.enum(['inbound', 'outbound', 'bidirectional']),
  apiAvailable: z.boolean().optional(),
  middleware: z.string().optional(),
  notes: z.string().optional(),
});

export const DataVolumeSchema = z.object({
  accounts: z.number().optional(),
  cases: z.number().optional(),
  workOrders: z.number().optional(),
  contacts: z.number().optional(),
  other: z.record(z.string(), z.number()).optional(),
});

export const BusinessProcessSchema = z.object({
  name: z.string(),
  module: z.string(),
  classification: z.enum(['Config', 'Custom', 'Integration', 'Config+Custom', 'Config+Integration', 'Custom+Integration', 'Config+Custom+Integration']),
  priority: z.enum(['Phase 1', 'Phase 2', 'Phase 3']).optional(),
});

// End-to-end walk of the client's new process — feeds the BRD's Business Process Guide.
export const ProcessStepSchema = z.object({
  step: z.string(),
  whatHappens: z.string(),
  where: z.string(),
});

// Client acronyms and internal terms in their own words — feeds the BRD glossary.
export const ClientTermSchema = z.object({
  term: z.string(),
  meaning: z.string(),
  usedFor: z.string().optional(),
});

// Anything discovery could not answer. Becomes Information Required in the BRD.
export const OpenQuestionSchema = z.object({
  question: z.string(),
  owner: z.string().optional(),     // who at the client should answer
  relatesTo: z.string().optional(), // business area or process
});

export const EngagementContextSchema = z.object({
  // Client & Project Identity
  clientName: z.string(),
  projectName: z.string(),
  industry: z.string(),
  region: z.string(),
  engagementType: z.enum(['Greenfield', 'Migration', 'Enhancement']),
  implementationPartner: z.string().optional(),

  // Salesforce Products
  products: z.array(SalesforceProductSchema),

  // Business Context
  businessUnits: z.array(z.string()),
  userPersonas: z.array(PersonaSchema),
  keyProcesses: z.array(BusinessProcessSchema),
  processSteps: z.array(ProcessStepSchema).default([]),
  clientTerms: z.array(ClientTermSchema).default([]),
  painPoints: z.array(z.string()),
  kpis: z.array(z.string()),

  // Integration Landscape
  integrationSystems: z.array(IntegrationSchema),

  // Data & Volume
  dataVolumes: DataVolumeSchema,
  dataMigration: z.object({
    required: z.boolean(),
    sourceSystem: z.string().optional(),
    dateRange: z.string().optional(),
    objects: z.array(z.string()).optional(),
  }),

  // Constraints & Timeline
  phasing: z.enum(['Single Phase', 'Phase 1/2', 'Phase 1/2/3']),
  goLiveDate: z.string().optional(),
  goLiveDatePhase1: z.string().optional(),
  implementationWeeks: z.number().optional(),
  stakeholderDependencies: z.array(z.string()),
  openQuestions: z.array(OpenQuestionSchema).default([]),

  // Metadata
  phase: z.enum(['context', 'scope', 'assumptions', 'review', 'sprint', 'complete']),
  lastUpdated: z.string(),
  version: z.string(),
  qualityGates: z.object({
    allDimensionsPopulated: z.boolean(),
    productsConfirmed: z.boolean(),
    processesIdentified: z.boolean(),
    phaseConfirmed: z.boolean(),
    clientSignOff: z.enum(['YES', 'PENDING']),
  }),
});

export type EngagementContext = z.infer<typeof EngagementContextSchema>;
export type SalesforceProduct = z.infer<typeof SalesforceProductSchema>;
export type Integration = z.infer<typeof IntegrationSchema>;
export type Persona = z.infer<typeof PersonaSchema>;
