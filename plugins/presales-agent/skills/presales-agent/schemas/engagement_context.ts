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
  stakeholderDependencies: z.array(z.string()),

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
