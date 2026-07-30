# Installs the presales-agent skill for Claude Code (Windows).
#
#   irm https://raw.githubusercontent.com/namit-jpg/presales-agent-skill/main/install.ps1 | iex
#
# No git required. Installs to %USERPROFILE%\.claude\skills\presales-agent, which
# both the Claude Code CLI and the desktop app read.

$ErrorActionPreference = 'Stop'

$repo   = 'namit-jpg/presales-agent-skill'
$branch = if ($env:BRANCH) { $env:BRANCH } else { 'main' }
$name   = 'presales-agent'
$base   = if ($env:CLAUDE_CONFIG_DIR) { $env:CLAUDE_CONFIG_DIR } else { Join-Path $HOME '.claude' }
$target = Join-Path $base "skills\$name"
$inner  = "presales-agent-skill-$branch\plugins\$name\skills\$name"

function Say  { param($m) Write-Host "  $m" }
function Fail { param($m) Write-Host ""; Write-Host "  Error: $m" -ForegroundColor Red; Write-Host ""; exit 1 }

Write-Host ""
Write-Host "  Installing the presales-agent skill"
Write-Host ""

$tmp = Join-Path ([IO.Path]::GetTempPath()) ("presales-" + [Guid]::NewGuid().ToString('N').Substring(0, 8))
New-Item -ItemType Directory -Path $tmp -Force | Out-Null

try {
    Say "Downloading $repo ($branch)..."
    $zip = Join-Path $tmp 'skill.zip'
    try {
        Invoke-WebRequest -Uri "https://codeload.github.com/$repo/zip/refs/heads/$branch" -OutFile $zip -UseBasicParsing
    } catch {
        Fail "Download failed. Check your connection, or that the repo and branch exist."
    }

    Say "Extracting..."
    Expand-Archive -Path $zip -DestinationPath $tmp -Force

    $src = Join-Path $tmp $inner
    if (-not (Test-Path (Join-Path $src 'SKILL.md'))) {
        Fail "Archive layout unexpected - SKILL.md not found at $inner."
    }

    if (Test-Path $target) {
        $backup = "$target.backup-" + (Get-Date -Format 'yyyyMMddHHmmss')
        Say "Existing install found - moving it to $(Split-Path $backup -Leaf)"
        Move-Item -Path $target -Destination $backup
    }

    New-Item -ItemType Directory -Path (Split-Path $target -Parent) -Force | Out-Null
    Copy-Item -Path $src -Destination $target -Recurse
    Say "Installed to $target"

    if (Get-Command npm -ErrorAction SilentlyContinue) {
        Say "Installing the Excel dependency..."
        $scripts = Join-Path $target 'scripts'
        npm install --prefix "$scripts" --silent --no-audit --no-fund 2>$null | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Say "Excel export ready."
        } else {
            Say "Excel dependency failed to install. JSON output still works."
            Say "Retry later with: npm install --prefix `"$scripts`""
        }
    } else {
        Say "Node/npm not found - JSON output works, Excel export does not."
        Say "Install Node 18+, then run: npm install --prefix `"$(Join-Path $target 'scripts')`""
    }

    Write-Host ""
    Write-Host "  Done. Restart Claude Code, then try:"
    Write-Host ""
    Write-Host "      start a new engagement for Contoso Manufacturing"
    Write-Host ""
    Write-Host "  To remove it:  Remove-Item -Recurse -Force `"$target`""
    Write-Host ""
}
finally {
    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
}
