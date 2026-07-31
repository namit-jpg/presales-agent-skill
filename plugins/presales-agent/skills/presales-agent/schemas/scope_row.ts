import { z } from 'zod';

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
  // Column N — a single direct estimate per row, not an artifact-count
  // breakdown. See references/effort_estimation.md for what this represents
  // and typical ranges.
  effortHours: z.number().min(0).max(300),
  // Column O
  reviewComments: z.string().optional(),
  // Metadata
  phase: z.enum(['Phase 1', 'Phase 2', 'Phase 3']).optional(),
});

export type ScopeRow = z.infer<typeof ScopeRowSchema>;
