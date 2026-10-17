[CmdletBinding()]
param(
    [switch]$SkipInstall,
    [switch]$Test,
    [switch]$NoBrowser
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$frontendPath = Join-Path $repoRoot 'src/frontend'
$solutionPath = Join-Path $repoRoot 'src/backend/HabitTracker4TP.slnx'
$apiProject = 'src/backend/src/HabitTracker4TP.Api'

function Invoke-NativeCommand {
    param(
        [string]$Label,
        [string]$Executable,
        [string[]]$Arguments,
        [string]$WorkingDirectory
    )

    Write-Host "`n==> $Label"
    Push-Location $WorkingDirectory
    try {
        & $Executable @Arguments
        $commandExitCode = $LASTEXITCODE
    }
    finally {
        Pop-Location
    }

    if ($commandExitCode -ne 0) {
        throw "$Label failed with exit code $commandExitCode."
    }
}

if (-not (Get-Command dotnet -ErrorAction SilentlyContinue)) {
    throw '.NET SDK was not found. Install the .NET 10 SDK and try again.'
}

$sdkVersions = & dotnet --list-sdks
if ($LASTEXITCODE -ne 0 -or -not ($sdkVersions -match '^10\.')) {
    throw '.NET SDK 10 is required. Install it and try again.'
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw 'Node.js was not found. Install Node.js 20 or later and try again.'
}

$nodeVersionText = (& node --version).Trim()
if ($LASTEXITCODE -ne 0 -or $nodeVersionText -notmatch '^v?(\d+)\.' -or [int]$Matches[1] -lt 20) {
    throw "Node.js 20 or later is required; found '$nodeVersionText'."
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    throw 'npm was not found. Install Node.js with npm and try again.'
}

if ($Test) {
    $failedChecks = @()
    $testCommands = @(
        @{ Label = 'Backend tests'; Executable = 'dotnet'; Arguments = @('test', $solutionPath); WorkingDirectory = $repoRoot },
        @{ Label = 'Frontend tests'; Executable = 'npm'; Arguments = @('run', 'test:run'); WorkingDirectory = $frontendPath },
        @{ Label = 'Frontend lint'; Executable = 'npm'; Arguments = @('run', 'lint'); WorkingDirectory = $frontendPath }
    )

    foreach ($testCommand in $testCommands) {
        try {
            Invoke-NativeCommand @testCommand
        }
        catch {
            Write-Error $_ -ErrorAction Continue
            $failedChecks += $testCommand.Label
        }
    }

    if ($failedChecks.Count -gt 0) {
        throw "Failed checks: $($failedChecks -join ', ')."
    }

    Write-Host "`nAll tests and lint checks passed."
    exit 0
}

if (-not $SkipInstall) {
    Invoke-NativeCommand -Label 'Build backend solution' -Executable 'dotnet' -Arguments @('build', $solutionPath) -WorkingDirectory $repoRoot
    Invoke-NativeCommand -Label 'Install frontend dependencies' -Executable 'npm' -Arguments @('install') -WorkingDirectory $frontendPath
}

foreach ($port in @(5171, 5173)) {
    $listeners = @(Get-NetTCPConnection -State Listen -LocalPort $port -ErrorAction SilentlyContinue)
    if ($listeners.Count -gt 0) {
        $owners = $listeners | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object {
            $process = Get-Process -Id $_ -ErrorAction SilentlyContinue
            if ($process) { "$($process.ProcessName) (PID $_)" } else { "PID $_" }
        }
        throw "Port $port is already in use by $($owners -join ', '). Stop that process and try again."
    }
}

$escapedRoot = $repoRoot.Replace("'", "''")
$escapedFrontendPath = $frontendPath.Replace("'", "''")
$apiCommand = "Set-Location -LiteralPath '$escapedRoot'; dotnet watch --project '$apiProject' --launch-profile http"
if (-not $SkipInstall) {
    $apiCommand += ' --no-build'
}
$frontendCommand = "Set-Location -LiteralPath '$escapedFrontendPath'; npm run dev"

$apiWindow = Start-Process -FilePath 'powershell.exe' -ArgumentList @('-NoExit', '-Command', $apiCommand) -WorkingDirectory $repoRoot -PassThru
$frontendWindow = Start-Process -FilePath 'powershell.exe' -ArgumentList @('-NoExit', '-Command', $frontendCommand) -WorkingDirectory $repoRoot -PassThru

function Wait-ForResponse {
    param([string]$Url, [string]$Label)

    $timer = [System.Diagnostics.Stopwatch]::StartNew()
    while ($timer.Elapsed.TotalSeconds -lt 60) {
        try {
            Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 3 | Out-Null
            Write-Host "$Label is ready: $Url"
            return
        }
        catch {
            Start-Sleep -Seconds 2
        }
    }

    throw "$Label did not respond within 60 seconds. Check its terminal window for startup errors."
}

Wait-ForResponse -Url 'http://localhost:5171/api/health' -Label 'API'
Wait-ForResponse -Url 'http://localhost:5173' -Label 'Frontend'

Write-Host "`nAPI:      http://localhost:5171"
Write-Host 'OpenAPI:  http://localhost:5171/openapi/v1.json'
Write-Host 'Frontend: http://localhost:5173'
$lanAddress = Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
    Where-Object { $_.IPAddress -ne '127.0.0.1' -and $_.IPAddress -notlike '169.254.*' } |
    Select-Object -ExpandProperty IPAddress -First 1
if ($lanAddress) {
    Write-Host "LAN:      http://${lanAddress}:5173"
}
Write-Host "`nClose the API window (PID $($apiWindow.Id)) and frontend window (PID $($frontendWindow.Id)) to stop the apps."

if (-not $NoBrowser) {
    Start-Process 'http://localhost:5173'
}
