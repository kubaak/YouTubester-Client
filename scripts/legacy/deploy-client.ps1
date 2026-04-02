<#
Deploy-TubesterClient.ps1

Builds the Tubester React client (Vite) and deploys it to Hetzner,
then reloads nginx.

Assumptions:
- Your SSH host alias "tubester-prod" is configured in ~/.ssh/config
- Built output is in: YouTubester.Client/dist
- Nginx serves from: /var/www/tubester-client
- Nginx config uses:
    root /var/www/tubester-client;
    location / { try_files $uri $uri/ /index.html; }
    location /assets/ { try_files $uri =404; }
#>

[CmdletBinding()]
param(
    # Local repo root (defaults to folder of this script)
    [string]$ScriptDir = (Split-Path -Parent $PSCommandPath),
    [string]$RepoRoot = (Resolve-Path (Join-Path $scriptDir "..")).Path ,

    # Client folder relative to RepoRoot
    [string]$ClientDir = ".",

    # Dist folder (relative to ClientDir)
    [string]$DistDir = "dist",

    # Remote host alias from ~/.ssh/config
    [string]$RemoteHost = "tubester-prod",

    # Where nginx serves the client
    [string]$RemoteWww = "/var/www/tubester-client",

    # Package manager: "npm" or "pnpm" or "yarn"
    [ValidateSet("npm", "pnpm", "yarn")]
    [string]$Pkg = "npm",

    # Build script name (usually "build")
    [string]$BuildScript = "build"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Exec([string]$cmd) {
    Write-Host ">> $cmd" -ForegroundColor Cyan
    Invoke-Expression $cmd
    if ($LASTEXITCODE -ne 0) { throw "Command failed with exit code ${LASTEXITCODE}: $cmd" }
}

$repo = (Resolve-Path $RepoRoot).Path
$client = Join-Path $repo $ClientDir
$dist = Join-Path $client $DistDir

Write-Host "Repo root is:" + $RepoRoot

if (!(Test-Path $client)) { throw "Client dir not found: $client" }

Write-Host "`n=== Building client ===" -ForegroundColor Green
Push-Location $client
try {
    switch ($Pkg) {
        "npm" { Exec "npm ci"; Exec "npm run $BuildScript" }
        "pnpm" { Exec "pnpm install --frozen-lockfile"; Exec "pnpm $BuildScript" }
        "yarn" { Exec "yarn install --frozen-lockfile"; Exec "yarn $BuildScript" }
    }
}
finally {
    Pop-Location
}

if (!(Test-Path $dist)) { throw "Dist folder not found after build: $dist" }

Write-Host "`n=== Uploading to server ===" -ForegroundColor Green

# Upload to a temp folder, then atomic swap (prevents half-deploy)
$remoteTmp = "$RemoteWww.__tmp"
$remoteBak = "$RemoteWww.__bak"

Exec "ssh $RemoteHost `"mkdir -p $RemoteWww; rm -rf $remoteTmp; mkdir -p $remoteTmp`""

# Copy contents of dist into tmp (copy the *contents* so we don't get nested dist folder)
Exec "scp -r `"$dist\*`" ${RemoteHost}:`"$remoteTmp/`""


# Swap
Exec "ssh $RemoteHost `"rm -rf $remoteBak; if [ -d $RemoteWww ]; then mv $RemoteWww $remoteBak; fi; mv $remoteTmp $RemoteWww`""

# Permissions: nginx needs to read files
Exec "ssh $RemoteHost `"chmod -R a+rX $RemoteWww`""

# Reload nginx (no downtime)
Exec "ssh $RemoteHost `"nginx -t && systemctl reload nginx`""

Write-Host "`n✅ Client deploy finished." -ForegroundColor Green
Write-Host "Test: https://tubester.app/" -ForegroundColor Gray
