# Presales Agent — a Claude Code plugin

A Salesforce presales workflow for [Claude Code](https://claude.com/claude-code).
Claude takes the role of a Certified Technical Architect, MVP-level consultant, and
senior presales business analyst, then walks a client discovery conversation through
to a set of delivery-ready artefacts.

No API key and no external service — the skill is instructions plus a local Node
script. Claude *is* the agent.

## What it produces

For each engagement, written into `opportunities/<ClientName>/` in whatever project
you have open:

| Artefact | Format |
|---|---|
| Engagement context (7 discovery dimensions) | JSON |
| Scope matrix — one row per sub-module, with functional/technical assumptions, solution approach, artifact counts, effort | JSON + XLSX (3 sheets) |
| Scope review report — 8-dimension gap analysis, severity flags, 0–100 quality score | Markdown |
| Sprint plan — module efforts, sprint assignment, weekly role allocation | JSON + XLSX |
| Project timeline — discovery through hypercare | JSON + XLSX |

## Install

Pick whichever line matches your machine, paste it into a terminal, press enter.
Works with both the Claude Code CLI and the desktop app. Git is not required.

**Windows** (PowerShell):

```powershell
irm https://raw.githubusercontent.com/namit-jpg/presales-agent-skill/main/install.ps1 | iex
```

**macOS / Linux**:

```bash
curl -fsSL https://raw.githubusercontent.com/namit-jpg/presales-agent-skill/main/install.sh | bash
```

Then restart Claude Code. That's it — the installer downloads the skill to
`~/.claude/skills/presales-agent` and installs the one dependency the Excel export
needs. Any previous install is moved aside to a timestamped backup rather than
overwritten.

Prefer to read a script before running it? Download
[install.ps1](install.ps1) / [install.sh](install.sh), open it, then run it locally.

### Without a terminal

1. [Download the repository as a ZIP](https://github.com/namit-jpg/presales-agent-skill/archive/refs/heads/main.zip)
   and extract it.
2. Copy the folder `plugins/presales-agent/skills/presales-agent` into your skills
   directory, so that `SKILL.md` ends up at:
   - Windows — `%USERPROFILE%\.claude\skills\presales-agent\SKILL.md`
   - macOS / Linux — `~/.claude/skills/presales-agent/SKILL.md`
3. Restart Claude Code.

Excel export needs Node 18+ and one package. Claude will offer to run this on first
use, or you can run it yourself:

```bash
npm install --prefix "~/.claude/skills/presales-agent/scripts"
```

Without it, everything still works — you get JSON instead of XLSX.

### As a managed plugin

This repo is also a plugin marketplace, which adds versioning and one-command
updates. From any terminal:

```bash
claude plugin marketplace add namit-jpg/presales-agent-skill
```

```bash
claude plugin install presales-agent@presales-skills
```

Inside a Claude Code CLI session you can use the interactive equivalents,
`/plugin marketplace add namit-jpg/presales-agent-skill` then `/plugin install`.
Later, `claude plugin marketplace update presales-skills` pulls the newest version.

### Uninstall

```bash
rm -rf ~/.claude/skills/presales-agent
```

Windows: `Remove-Item -Recurse -Force "$HOME\.claude\skills\presales-agent"`.
If you installed the plugin instead: `claude plugin uninstall presales-agent`.

## Use

Say what you want in plain language:

- `start a new engagement for Contoso Manufacturing`
- `build a scope matrix for Contoso`
- `resume Contoso from review`
- `regenerate xlsx for Contoso`

Claude runs five steps — context elicitation, scope building, review and gap
analysis, sprint planning, completion summary — with a quality gate at each
boundary. It will not skip the review step, and it stops on CRITICAL flags until
you acknowledge them.

Three built-in test scenarios need no discovery conversation: `Run Test 1`
(consumer electronics after-sales), `Run Test 2` (energy distribution),
`Run Test 3` (large manufacturing).

## Layout

```
.claude-plugin/marketplace.json     marketplace manifest
plugins/presales-agent/
  .claude-plugin/plugin.json        plugin manifest
  skills/presales-agent/
    SKILL.md                        the workflow
    references/                     sub-skills + estimation knowledge
    schemas/                        Zod schemas the JSON output must match
    scripts/generate_xlsx.js        JSON → Excel
```

## Notes

Estimation baselines in `references/effort_reference.md` and
`references/effort_estimation.md` are starting points, not a rate card. Calibrate
them to your own delivery history before quoting a client.

Engagement outputs are written to your project, never into this repo, and
`opportunities/` is gitignored so client data does not get committed by accident.

### On the `xlsx` dependency

`npm audit` reports two high-severity advisories against `xlsx@0.18.5`
([prototype pollution](https://github.com/advisories/GHSA-4r6h-8v6p-xvw6),
[ReDoS](https://github.com/advisories/GHSA-5pgg-2g8v-p4x9)) and says no fix is
available. That is because SheetJS no longer publishes to the npm registry —
patched releases are distributed from `cdn.sheetjs.com`.

Both advisories concern *parsing* untrusted spreadsheets. `generate_xlsx.js` only
writes workbooks from JSON produced earlier in the workflow and never reads a
third-party file, so the vulnerable code paths are not exercised here. If your
organisation blocks the advisory regardless, point the dependency at the SheetJS
CDN build instead.

## Licence

MIT — see [LICENSE](LICENSE).
