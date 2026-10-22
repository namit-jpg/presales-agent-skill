import { z } from 'zod';

export const RoleAllocationSchema = z.object({
  ba: z.number(),
  sa: z.number(),
  developers: z.array(z.number()),
  ds: z.number(),
  qa: z.number(),
});

export const SprintWeekSchema = z.object({
  weekNumber: z.number(),
  sprintNumber: z.number().optional(),
  phase: z.string(),
  allocation: RoleAllocationSchema,
  totalHours: z.number(),
  modules: z.array(z.string()).optional(),
});

export const ModuleEffortSchema = z.object({
  module: z.string(),
  totalEffort: z.number(),
  dataLoadEffort: z.number(),
  devEffort: z.number(),
  phase: z.enum(['Phase 1', 'Phase 2', 'Phase 3']),
  sprintAssignment: z.array(z.number()),
});

export const SprintParametersSchema = z.object({
  numberOfDevelopers: z.number(),
  devCapacityPerSprint: z.number(),
  totalGrandEffort: z.number(),
  totalDataLoadEffort: z.number(),
  totalDevEffort: z.number(),
  numberOfSprints: z.number(),
  balanceEffort: z.number(),
  preSprintWeeks: z.number(),
  postSprintWeeks: z.number(),
  totalProjectWeeks: z.number(),
});

export const RoleHourSummarySchema = z.object({
  ba: z.number(),
  sa: z.number(),
  developers: z.array(z.object({ name: z.string(), hours: z.number() })),
  ds: z.number(),
  qa: z.number(),
  grandTotal: z.number(),
});

export const SprintPlanSchema = z.object({
  parameters: SprintParametersSchema,
  moduleEfforts: z.array(ModuleEffortSchema),
  weeklyGrid: z.array(SprintWeekSchema),
  roleHourSummary: RoleHourSummarySchema,
});

export const TimelinePhaseSchema = z.object({
  serial: z.number(),
  taskTitle: z.string(),
  taskOwner: z.string(),
  startWeek: z.number(),
  endWeek: z.number(),
  effortHours: z.number(),
  phase: z.string(),
});

export const TimelinePlanSchema = z.object({
  totalWeeks: z.number(),
  phases: z.array(TimelinePhaseSchema),
});

export type SprintPlan = z.infer<typeof SprintPlanSchema>;
export type SprintWeek = z.infer<typeof SprintWeekSchema>;
export type ModuleEffort = z.infer<typeof ModuleEffortSchema>;
export type SprintParameters = z.infer<typeof SprintParametersSchema>;
export type RoleHourSummary = z.infer<typeof RoleHourSummarySchema>;
export type TimelinePlan = z.infer<typeof TimelinePlanSchema>;
export type TimelinePhase = z.infer<typeof TimelinePhaseSchema>;
