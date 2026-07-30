import { z } from 'zod';

export const ArtifactCountsSchema = z.object({
  // Column N–AC: 16 artifact buckets, each with Simple/Medium/Complex counts
  objects: z.object({ simple: z.number(), medium: z.number(), complex: z.number() }),
  objectAutomations: z.object({ simple: z.number(), medium: z.number(), complex: z.number() }),
  recordTypes: z.object({ simple: z.number(), medium: z.number(), complex: z.number() }),
  pageLayouts: z.object({ simple: z.number(), medium: z.number(), complex: z.number() }),
  flows: z.object({ simple: z.number(), medium: z.number(), complex: z.number() }),
  apexTriggers: z.object({ simple: z.number(), medium: z.number(), complex: z.number() }),
  apexClasses: z.object({ simple: z.number(), medium: z.number(), complex: z.number() }),
  lwcComponents: z.object({ simple: z.number(), medium: z.number(), complex: z.number() }),
  customUiUx: z.object({ simple: z.number(), medium: z.number(), complex: z.number() }),
  partnerAppPages: z.object({ simple: z.number(), medium: z.number(), complex: z.number() }),
  apis: z.object({ simple: z.number(), medium: z.number(), complex: z.number() }),
  batchJobs: z.object({ simple: z.number(), medium: z.number(), complex: z.number() }),
  reports: z.object({ simple: z.number(), medium: z.number(), complex: z.number() }),
  dashboards: z.object({ simple: z.number(), medium: z.number(), complex: z.number() }),
  orgSetup: z.object({ simple: z.number(), medium: z.number(), complex: z.number() }),
  dataMigration: z.object({ simple: z.number(), medium: z.number(), complex: z.number() }),
});

export const ScopeRowSchema = z.object({
  // Column A
  auditComments: z.string().optional(),
  // Column B
  customerDocRef: z.string(),
  // Column C
  brn: z.string(),
  // Column D
  subBrn: z.number(),
  // Column E
  salesforceSkuName: z.string(),
  // Column F
  isPartOfRequirementDoc: z.enum(['Yes', 'No']),
  // Column G
  classification: z.enum([
    'Config',
    'Custom',
    'Integration',
    'Config+Custom',
    'Config+Integration',
    'Custom+Integration',
    'Config+Custom+Integration',
    'OOTB+Config',
  ]),
  // Column H
  module: z.string(),
  // Column I
  subModule: z.string(),
  // Column J
  description: z.string(),
  // Column K
  functionalAssumptions: z.array(z.string()),
  // Column L
  technicalAssumptions: z.array(z.string()),
  // Column M
  solutionApproach: z.string(),
  // Columns N–AC
  artifactCounts: ArtifactCountsSchema,
  // Column AD (auto-calculated)
  effortHours: z.number(),
  // Column AE
  reviewComments: z.string().optional(),
  // Metadata
  phase: z.enum(['Phase 1', 'Phase 2', 'Phase 3']).optional(),
});

export type ScopeRow = z.infer<typeof ScopeRowSchema>;
export type ArtifactCounts = z.infer<typeof ArtifactCountsSchema>;

// Effort reference table for calculation
export const EFFORT_RATES = {
  objects: { simple: 4.5, medium: 5.625, complex: 6.75 },
  objectAutomations: { simple: 33, medium: 41.25, complex: 49.5 },
  recordTypes: { simple: 2.5, medium: 3.125, complex: 3.75 },
  pageLayouts: { simple: 2.5, medium: 3.125, complex: 3.75 },
  flows: { simple: 4, medium: 5, complex: 6 },
  apexTriggers: { simple: 22, medium: 27.5, complex: 33 },
  apexClasses: { simple: 44, medium: 55, complex: 66 },
  lwcComponents: { simple: 25, medium: 31.25, complex: 37.5 },
  customUiUx: { simple: 25, medium: 31.25, complex: 37.5 },
  partnerAppPages: { simple: 15, medium: 18.75, complex: 22.5 },
  apis: { simple: 30, medium: 37.5, complex: 45 },
  batchJobs: { simple: 34, medium: 42.5, complex: 51 },
  reports: { simple: 2.5, medium: 3.125, complex: 3.75 },
  dashboards: { simple: 5, medium: 6.25, complex: 7.5 },
  orgSetup: { simple: 24, medium: 40, complex: 48 },
  dataMigration: { simple: 64, medium: 80, complex: 100 },
} as const;

export function calculateRowEffort(counts: ArtifactCounts): number {
  let total = 0;
  for (const key of Object.keys(EFFORT_RATES) as (keyof typeof EFFORT_RATES)[]) {
    const rates = EFFORT_RATES[key];
    const count = counts[key];
    total += count.simple * rates.simple;
    total += count.medium * rates.medium;
    total += count.complex * rates.complex;
  }
  return Math.round(total * 100) / 100;
}
