<#
Usage: Run this script from PowerShell to copy your profile image into the project's assets folder.
You can pass a source path as the first argument, otherwise it will try the Downloads path provided.

Example:
  .\copy_profile.ps1 "C:\Users\HP\Downloads\WhatsApp Image 2026-06-11 at 2.02.27 PM.jpeg"
#>
$default = 'C:\Users\HP\Downloads\WhatsApp Image 2026-06-11 at 2.02.27 PM.jpeg'
$src = $args[0] -or $default
if(-not (Test-Path $src)){
  Write-Host "Source file not found: $src" -ForegroundColor Yellow
  exit 1
}
$destDir = Join-Path $PSScriptRoot 'assets'
If(-not (Test-Path $destDir)){ New-Item -ItemType Directory -Path $destDir | Out-Null }
$dest = Join-Path $destDir 'profile.jpg'
Copy-Item -Path $src -Destination $dest -Force
Write-Host "Copied to $dest" -ForegroundColor Green