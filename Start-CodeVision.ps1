$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$siteUrl = 'http://127.0.0.1:5173/'
$port = 5173

$listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if (-not $listener) {
  $command = 'npm run dev -- --host 127.0.0.1 --port 5173 --strictPort'
  Start-Process `
    -FilePath $env:ComSpec `
    -ArgumentList @('/c', $command) `
    -WorkingDirectory $projectRoot `
    -WindowStyle Hidden
}

$deadline = [DateTime]::UtcNow.AddSeconds(45)
$ready = $false
while ([DateTime]::UtcNow -lt $deadline) {
  $client = [System.Net.Sockets.TcpClient]::new()
  try {
    $client.Connect('127.0.0.1', $port)
    $ready = $true
    break
  } catch {
    Start-Sleep -Milliseconds 500
  } finally {
    $client.Dispose()
  }
}

if ($ready) {
  Start-Process $siteUrl
} else {
  Add-Type -AssemblyName PresentationFramework
  [System.Windows.MessageBox]::Show(
    'CodeVision could not start. Check that Node.js is installed and the project dependencies are available.',
    'CodeVision startup'
  ) | Out-Null
}
