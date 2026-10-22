import { z } from 'zod';

/**
 * The BRD is one JSON document (<slug>_brd.json) that populates every sheet of
 * templates/brd_template.xlsx:
 *
 *   Scope of Work          — one row per requirement (columns A–H, noted below)
 *   Out of Scope           — every row whose notIncluded list is non-empty
 *   Business Process Guide — processSummary, processSteps, glossary
 *   Effort Summary         — effortHours totalled by businessArea
 *
 * The document is written for the client to read. Nothing in it is an
 * "assumption": each point is either something we will deliver (description),
 * something the client must supply (informationRequired), or something that
 * is not included (notIncluded).
 */

export const BrdRowSchema = z.object({
  // A — "1.1", "5.10". Business-area number, then position within it.
  requirementId: z.string().regex(/^\d+\.\d+$/),
  // B — plain-language business area, e.g. "New Project Enquiries".
  businessArea: z.string(),
  // C — short noun-phrase name for the capability. Client acronyms are
  // expanded on first use: "DAF (Discount Approval Form) | Discount and Margin Approval".
  subBusinessModule: z.string(),
  // D — the requirement as the client would say it, e.g. "Who can see customer and sales information".
  requirement: z.string(),
  // E — what will be delivered, one point per entry. Plain business English,
  // concrete numbers and named lists, no "Assuming", no "etc.".
  description: z.array(z.string()).min(1),
  // F — what the client must provide or decide, and by when. Empty → "None".
  informationRequired: z.array(z.string()).default([]),
  // G — HOW it will be built, in Salesforce terms. 1–3 sentences.
  solutionApproach: z.string(),
  // H — hours for this requirement (AI-assisted delivery; see references/effort_estimation.md).
  effortHours: z.number().min(0).max(300),

  // Out of Scope sheet — things a reader might reasonably expect from this
  // requirement that are not included. Each entry ends "... are not included."
  notIncluded: z.array(z.string()).default([]),

  // Internal fields — kept in the JSON for review and sprint planning, never
  // written to the workbook.
  phase: z.enum(['Phase 1', 'Phase 2', 'Phase 3']).default('Phase 1'),
  salesforceSkuName: z.string().optional(),
  classification: z.enum([
    'Config',
    'Custom',
    'Integration',
    'Config+Custom',
    'Config+Integration',
    'Custom+Integration',
    'Config+Custom+Integration',
    'Data Migration',
  ]).optional(),
  // Where each number/name in the row came from (discovery note, client doc
  // section, meeting date). Review flags any figure with no source.
  sourceRefs: z.array(z.string()).optional(),
  reviewComments: z.string().optional(),
});

export const ProcessStepSchema = z.object({
  step: z.string(),          // "New enquiry"  (numbered by the generator)
  whatHappens: z.string(),   // one or two plain sentences
  where: z.string(),         // "Salesforce and Slack"
});

export const GlossaryTermSchema = z.object({
  term: z.string(),          // "QRF"
  meaning: z.string(),       // "Quote Request Form describing the building and engineering requirements."
  usedFor: z.string().optional(),
});

export const BrdDocumentSchema = z.object({
  clientName: z.string(),    // replaces {Client} in sheet headers and titles
  version: z.string(),
  lastUpdated: z.string(),
  processSummary: z.string().optional(),  // one sentence under the guide title
  processSteps: z.array(ProcessStepSchema).default([]),
  glossary: z.array(GlossaryTermSchema).default([]),
  rows: z.array(BrdRowSchema).min(1),
});

export type BrdRow = z.infer<typeof BrdRowSchema>;
export type BrdDocument = z.infer<typeof BrdDocumentSchema>;
