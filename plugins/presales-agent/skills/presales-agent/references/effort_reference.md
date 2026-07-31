# Effort Reference

## Row Effort Quick Guide

Full model and reasoning: `references/effort_estimation.md`. Each scope-matrix
row gets one direct `effortHours` estimate — human review/validation/UAT-sign-off
time on top of an AI-agent-assisted build, not full manual-build hours.

| Row complexity | effortHours |
|---|---|
| Simple | 2–5h |
| Medium | 5–10h |
| Complex | 10–16h |
| Exceptionally large (rare, flag explicitly) | up to 300h |

## Sprint Capacity Reference

| Parameter | Value | Notes |
|-----------|-------|-------|
| Sprint Duration | 2 weeks | Fixed |
| Dev hours/week | 35h | Net of ceremonies (12.5% buffer) |
| Dev capacity/sprint | 70h | 35h × 2 weeks |
| BA capacity (pre-sprint) | 40h/week | Drops to 24h during build |
| SA capacity (pre-sprint) | 40h/week | Drops to 24h during build |
| DS capacity | 10h/week | Throughout project |
| QA capacity (build) | 24h/week | Ramps to 40h during SIT |
| Data Load effort | Separate | NOT counted in dev sprint capacity |
