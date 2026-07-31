#!/usr/bin/env node
/**
 * Pure Node.js XLSX generator — no AI, no API key required.
 * Claude Code calls this after generating JSON outputs.
 *
 * Usage:
 *   node scripts/generate_xlsx.js scope   [outputDir] [clientSlug]
 *   node scripts/generate_xlsx.js sprint  [outputDir] [clientSlug]
 *   node scripts/generate_xlsx.js all     [outputDir] [clientSlug]
 *
 * Examples:
 *   node scripts/generate_xlsx.js scope "opportunities/Northwind Utilities" northwind
 *   node scripts/generate_xlsx.js all   "opportunities/ACME Electronics"  acme
 *   node scripts/generate_xlsx.js all                                          (legacy: writes to outputs/)
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// argv[2] = command, argv[3] = outputDir, argv[4] = clientSlug
const RAW_OUTPUT_DIR = process.argv[3] || 'outputs';
const CLIENT_SLUG    = process.argv[4] || '';

// Resolve relative to the caller's current working directory (this script
// lives in the user-level presales-agent skill, not inside the client project)
const OUTPUTS = path.resolve(process.cwd(), RAW_OUTPUT_DIR);

// Build a prefixed filename: "northwind_scope_matrix.json" or "scope_matrix.json" if no slug
function fileName(base) {
  return CLIENT_SLUG ? `${CLIENT_SLUG}_${base}` : base;
}

// ─── Scope Matrix ─────────────────────────────────────────────────────────────
function generateScopeXlsx() {
  const jsonPath = path.join(OUTPUTS, fileName('scope_matrix.json'));
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ ${jsonPath} not found. Claude must generate it first.`);
    process.exit(1);
  }

  const rows = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // effortHours is a direct per-row estimate (see references/effort_estimation.md) —
  // no per-artifact breakdown to recalculate from.
  const headers = [
    'Audit Comments','Customer Doc Ref','BRN','SUB BRN','Salesforce SKU Name',
    'Is part of requirement doc?','Custom/Config/Integration','Module/Functional Area',
    'Sub-Module','Description','Functional Assumptions','Technical Assumptions',
    'Solution / Imp Approach',
    'Effort Hours','Review Comments','Phase',
  ];

  const data = [headers];
  for (const row of rows) {
    data.push([
      row.auditComments || '',
      row.customerDocRef || '',
      row.brn || '',
      row.subBrn || '',
      row.salesforceSkuName || '',
      row.isPartOfRequirementDoc || 'Yes',
      row.classification || '',
      row.module || '',
      row.subModule || '',
      row.description || '',
      Array.isArray(row.functionalAssumptions) ? row.functionalAssumptions.map((a,i) => `${i+1}. ${a}`).join('\n') : (row.functionalAssumptions || ''),
      Array.isArray(row.technicalAssumptions)  ? row.technicalAssumptions.map((a,i)  => `${i+1}. ${a}`).join('\n') : (row.technicalAssumptions || ''),
      row.solutionApproach || '',
      row.effortHours || 0,
      row.reviewComments || '',
      row.phase || 'Phase 1',
    ]);
  }

  // Summary sheet
  const moduleMap = {};
  for (const row of rows) {
    if (!moduleMap[row.module]) moduleMap[row.module] = { effort: 0, count: 0 };
    moduleMap[row.module].effort += row.effortHours || 0;
    moduleMap[row.module].count += 1;
  }
  const summaryData = [['Module','Phase','Row Count','Total Effort (h)']];
  for (const [mod, vals] of Object.entries(moduleMap)) {
    const phaseRows = rows.filter(r => r.module === mod);
    const phase = phaseRows[0]?.phase || 'Phase 1';
    summaryData.push([mod, phase, vals.count, Math.round(vals.effort)]);
  }
  const grandTotal = rows.reduce((s, r) => s + (r.effortHours || 0), 0);
  summaryData.push(['GRAND TOTAL', '', rows.length, Math.round(grandTotal)]);

  // Open clarifications
  const clarifData = [['BRN','Sub-Module','Clarification']];
  for (const row of rows) {
    if (row.reviewComments) {
      clarifData.push([`${row.brn}.${row.subBrn}`, row.subModule, row.reviewComments]);
    }
  }

  const wb = XLSX.utils.book_new();
  const ws1 = XLSX.utils.aoa_to_sheet(data);
  // Set column widths
  ws1['!cols'] = [
    {wch:15},{wch:15},{wch:8},{wch:7},{wch:22},{wch:12},{wch:22},
    {wch:28},{wch:35},{wch:70},{wch:80},{wch:80},{wch:55},
    {wch:14},{wch:20},{wch:10},
  ];
  // Enable text wrap for assumption columns
  ws1['!rows'] = data.map(() => ({hpt: 60}));

  XLSX.utils.book_append_sheet(wb, ws1, 'Scope Matrix');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(summaryData), 'Summary');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(clarifData), 'Open Clarifications');

  const outPath = path.join(OUTPUTS, fileName('scope_matrix.xlsx'));
  XLSX.writeFile(wb, outPath);
  console.log(`✅ ${fileName('scope_matrix.xlsx')} — ${rows.length} rows, ${Math.round(grandTotal)}h total`);
}

// ─── Sprint Plan ──────────────────────────────────────────────────────────────
function generateSprintXlsx() {
  const jsonPath = path.join(OUTPUTS, fileName('sprint_plan.json'));
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ ${jsonPath} not found. Claude must generate it first.`);
    process.exit(1);
  }

  const plan = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const { parameters: p, moduleEfforts, weeklyGrid, roleHourSummary } = plan;

  const wb = XLSX.utils.book_new();

  // Sheet 1: Module Summary
  const modData = [['Module','Phase','Total Effort (h)','Data Load (h)','Dev Effort (h)']];
  for (const m of (moduleEfforts || [])) {
    modData.push([m.module, m.phase, m.totalEffort, m.dataLoadEffort, m.devEffort]);
  }
  if (p) {
    modData.push(['GRAND TOTAL','', p.totalGrandEffort, p.totalDataLoadEffort, p.totalDevEffort]);
  }
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(modData), 'Module Summary');

  // Sheet 2: Sprint Parameters
  if (p) {
    const paramData = [
      ['Parameter','Value'],
      ['Number of Developers', p.numberOfDevelopers],
      ['Dev Capacity per Sprint (h)', p.devCapacityPerSprint],
      ['Grand Total Effort (h)', p.totalGrandEffort],
      ['Data Load Effort (h)', p.totalDataLoadEffort],
      ['Dev Effort (excl. data load) (h)', p.totalDevEffort],
      ['Number of Sprints', p.numberOfSprints],
      ['Balance Effort (h)', p.balanceEffort],
      ['Pre-Sprint Weeks', p.preSprintWeeks],
      ['Post-Sprint Weeks', p.postSprintWeeks],
      ['Total Project Weeks', p.totalProjectWeeks],
      ['Total Project Duration (months)', +(p.totalProjectWeeks / 4.33).toFixed(1)],
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(paramData), 'Sprint Parameters');
  }

  // Sheet 3: Sprint Grid
  if (weeklyGrid && weeklyGrid.length > 0) {
    const devCount = weeklyGrid[0]?.allocation?.developers?.length || 1;
    const gridHeaders = [
      'Week','Sprint','Phase','BA (h)','SA (h)',
      ...Array.from({length: devCount}, (_,i) => `TS-${i+1} (h)`),
      'DS (h)','QA (h)','Total (h)',
    ];
    const gridData = [gridHeaders];
    for (const w of weeklyGrid) {
      gridData.push([
        w.weekNumber, w.sprintNumber || '', w.phase,
        w.allocation.ba, w.allocation.sa,
        ...(w.allocation.developers || []),
        w.allocation.ds, w.allocation.qa,
        w.totalHours,
      ]);
    }
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(gridData), 'Sprint Grid');
  }

  // Sheet 4: Role Hours
  if (roleHourSummary) {
    const rh = roleHourSummary;
    const roleData = [
      ['Role','Total Hours'],
      ['Business Analyst (BA)', rh.ba],
      ['Solution Architect (SA)', rh.sa],
      ...(rh.developers || []).map(d => [d.name, d.hours]),
      ['Delivery Scrum (DS)', rh.ds],
      ['Quality Assurance (QA)', rh.qa],
      ['GRAND TOTAL', rh.grandTotal],
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(roleData), 'Role Hours');
  }

  XLSX.writeFile(wb, path.join(OUTPUTS, fileName('sprint_plan.xlsx')));
  console.log(`✅ ${fileName('sprint_plan.xlsx')} — ${p?.numberOfSprints || '?'} sprints`);

  // Timeline sheet
  const timelinePath = path.join(OUTPUTS, fileName('timeline.json'));
  const wb2 = XLSX.utils.book_new();

  let timelineData;
  if (fs.existsSync(timelinePath)) {
    const tl = JSON.parse(fs.readFileSync(timelinePath, 'utf8'));
    timelineData = [
      ['#','Task Title','Owner','Start Week','End Week','Duration (wks)','Effort (h)','Phase'],
      ...(tl.phases || []).map(ph => [
        ph.serial, ph.taskTitle, ph.taskOwner,
        ph.startWeek, ph.endWeek, ph.endWeek - ph.startWeek + 1,
        ph.effortHours || '', ph.phase,
      ]),
      ['','TOTAL PROJECT','',' 1', tl.totalWeeks, tl.totalWeeks, p?.totalGrandEffort || '', ''],
    ];
  } else {
    // Minimal timeline from sprint parameters
    timelineData = [['Note'],['Run Claude to generate timeline.json for detailed view']];
  }

  XLSX.utils.book_append_sheet(wb2, XLSX.utils.aoa_to_sheet(timelineData), 'Timeline');
  XLSX.writeFile(wb2, path.join(OUTPUTS, fileName('timeline.xlsx')));
  console.log(`✅ ${fileName('timeline.xlsx')}`);
}

// ─── Entry point ─────────────────────────────────────────────────────────────
const cmd = process.argv[2] || 'all';

if (!fs.existsSync(OUTPUTS)) {
  fs.mkdirSync(OUTPUTS, { recursive: true });
}

switch (cmd) {
  case 'scope':
    generateScopeXlsx();
    break;
  case 'sprint':
    generateSprintXlsx();
    break;
  case 'all':
    if (fs.existsSync(path.join(OUTPUTS, fileName('scope_matrix.json')))) generateScopeXlsx();
    if (fs.existsSync(path.join(OUTPUTS, fileName('sprint_plan.json'))))  generateSprintXlsx();
    break;
  default:
    console.error(`Unknown command: ${cmd}. Use: scope | sprint | all`);
    process.exit(1);
}
