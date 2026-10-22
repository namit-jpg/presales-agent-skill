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
| BRD — client-readable Scope of Work (one row per requirement: description, information required from the client, solution approach, effort), plus Out of Scope, Business Process Guide and Effort Summary sheets | JSON + XLSX (4 sheets) |
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
needs. Any previous install is moved to a timestamped backup in
`~/.claude/skill-backups/` rather than overwritten.

Prefer to read a script before running it? Download
[install.ps1](install.ps1) / [install.sh](install.sh), open it, then run it locally.

### Without a terminal

1. [Download the repository as a ZIP](https://github.com/namit-jpg/presales-agent-skill/archive/refs/heads/main.zip)
   and extract it.
2. Copy the folder `plugins/wd-presales-skill2/skills/presales-agent` into your skills
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
claude plugin install wd-presales-skill2@presales-skills
```

Inside a Claude Code CLI session you can use the interactive equivalents,
`/plugin marketplace add namit-jpg/presales-agent-skill` then `/plugin install`.

### Update

**Plugin install** — refresh the marketplace, then update the plugin, then
restart Claude Code:

```bash
claude plugin marketplace update presales-skills
```

```bash
claude plugin update wd-presales-skill2@presales-skills
```

**One-line installer or manual copy** — run the same install line again. The
previous copy is moved to a timestamped backup in `~/.claude/skill-backups/`.

**Coming from 1.x (`presales-agent` plugin)** — the plugin was renamed in 2.0, so
`update` will not find it. Remove the old one and install the new one:

```bash
claude plugin uninstall presales-agent@presales-skills
```

```bash
claude plugin marketplace update presales-skills
```

```bash
claude plugin install wd-presales-skill2@presales-skills
```

### Uninstall

```bash
rm -rf ~/.claude/skills/presales-agent
```

Windows: `Remove-Item -Recurse -Force "$HOME\.claude\skills\presales-agent"`.
If you installed the plugin instead: `claude plugin uninstall wd-presales-skill2`.

## Use

Say what you want in plain language:

- `start a new engagement for Contoso Manufacturing`
- `build a BRD for Contoso`
- `resume Contoso from review`
- `regenerate xlsx for Contoso`

Claude runs five steps — context elicitation, BRD building, review and gap
analysis, sprint planning, completion summary — with a quality gate at each
boundary. It will not skip the review step, and it stops on CRITICAL flags until
you acknowledge them.

Three built-in test scenarios need no discovery conversation: `Run Test 1`
(consumer electronics after-sales), `Run Test 2` (energy distribution),
`Run Test 3` (large manufacturing).

## Layout

```
.claude-plugin/marketplace.json     marketplace manifest
plugins/wd-presales-skill2/
  .claude-plugin/plugin.json        plugin manifest
  skills/presales-agent/
    SKILL.md                        the workflow
    references/                     sub-skills + estimation knowledge
    schemas/                        Zod schemas the JSON output must match
    templates/brd_template.xlsx     the BRD layout and styling
    scripts/generate_xlsx.js        JSON → Excel
```

## Notes

Estimation baselines in `references/effort_reference.md` and
`references/effort_estimation.md` are starting points, not a rate card. Calibrate
them to your own delivery history before quoting a client.

Engagement outputs are written to your project, never into this repo, and
`opportunities/` is gitignored so client data does not get committed by accident.

### On the Excel dependency

The generator uses [`exceljs`](https://www.npmjs.com/package/exceljs). It
replaced SheetJS (`xlsx@0.18.5`) because SheetJS's free build does not write
cell styles, so the styled BRD template came out plain, and because the npm
release of SheetJS carries two unpatched advisories. `exceljs` reads the
template and writes the populated copy with fills, fonts, wrapping and
frozen headers intact.

## Licence

MIT — see [LICENSE](LICENSE).
