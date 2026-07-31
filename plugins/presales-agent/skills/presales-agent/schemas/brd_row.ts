import { z } from 'zod';

/**
 * One BRD row = one Sub-Module, matching templates/brd_template.xlsx exactly.
 * Template column letters are noted against each field.
 *
 * Artifact counts are DESCRIPTIVE scope detail — how many of each thing gets
 * built. They are NOT multiplied by per-item rates to derive effortHours;
 * see references/effort_estimation.md for the effort model actually in use.
 */

const Tier = z.object({
  simple: z.number().int().min(0),
  medium: z.number().int().min(0),
  complex: z.number().int().min(0),
});

export const ArtifactCountsSchema = z.object({
  objects: Tier,            // K–M
  objectAutomations: Tier,  // N–P
  recordTypes: Tier,        // Q–S
  pageLayouts: Tier,        // T–V
  flows: Tier,              // W–Y
  triggers: Tier,           // Z–AB
  apexClasses: Tier,        // AC–AE  (template label: "Apex Classes (3)")
  lwc: Tier,                // AF–AH
  customUiUx: Tier,         // AI–AK
  partnerApp: Tier,         // AL–AN
  apis: Tier,               // AO–AQ
  batchExecution: Tier,     // AR–AT
  reports: Tier,            // AU–AW
  dashboard: Tier,          // AX–AZ
  orgSetup: Tier,           // BA–BC
  dataMigration: Tier,      // BD–BF
});

export const BrdRowSchema = z.object({
  auditComments: z.string().optional(),          // A
  brn: z.string(),                               // B (written as "<brn>.<subBrn>")
  subBrn: z.number(),                            // B
  module: z.string(),                            // C
  subModule: z.string(),                         // D
  phase: z.enum(['Phase 1', 'Phase 2', 'Phase 3']), // E
  description: z.string(),                       // F
  functionalAssumptions: z.array(z.string()),    // G
  technicalAssumptions: z.array(z.string()),     // H

  // I — WHAT is being built, in Salesforce terms. 1–3 sentences.
  solutionApproach: z.string(),
  // J — HOW it gets delivered: sequencing, dependencies, prerequisites.
  impApproach: z.string(),

  artifactCounts: ArtifactCountsSchema,          // K–BF

  // BG — hours for scoped manual work with no artifact of its own
  // (workshops, documentation, client-side coordination).
  miscManualEfforts: z.number().min(0).default(0),

  // BH — the row's effort estimate. AI-assisted delivery: human review,
  // validation, and UAT sign-off. Typically 2–16h. NOT rate-derived.
  effortHours: z.number().min(0).max(300),

  reviewComments: z.string().optional(),         // BI

  // Retained for review/traceability. No column in the BRD template —
  // these stay in the JSON and are not written to the workbook.
  customerDocRef: z.string().optional(),
  salesforceSkuName: z.string().optional(),
  isPartOfRequirementDoc: z.enum(['Yes', 'No']).optional(),
  classification: z.enum([
    'Config',
    'Custom',
    'Integration',
    'Config+Custom',
    'Config+Integration',
    'Custom+Integration',
    'Config+Custom+Integration',
    'OOTB+Config',
  ]).optional(),
});

export type BrdRow = z.infer<typeof BrdRowSchema>;
export type ArtifactCounts = z.infer<typeof ArtifactCountsSchema>;
