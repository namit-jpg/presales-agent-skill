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

```bash
/plugin marketplace add namit-jpg/presales-agent-skill
```

```bash
/plugin install presales-agent@presales-skills
```

The Excel generator needs one dependency. On first use, install it inside the
installed plugin's `skills/presales-agent/scripts` directory:

```bash
npm install --prefix "<SKILL_DIR>/scripts"
```

`<SKILL_DIR>` is the directory holding `SKILL.md` — for a plugin install that is
`${CLAUDE_PLUGIN_ROOT}/skills/presales-agent`. Claude will resolve and run this for
you if the dependency is missing. Node 18+ recommended.

### Manual install (no plugin system)

```bash
git clone https://github.com/namit-jpg/presales-agent-skill.git
```

Then copy `plugins/presales-agent/skills/presales-agent` to
`~/.claude/skills/presales-agent` and run the `npm install` above.

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

## Licence

MIT — see [LICENSE](LICENSE).
