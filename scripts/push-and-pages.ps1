# Spusť v PowerShellu z kořene repo (vyžaduje: gh auth login)
# Použití: .\scripts\push-and-pages.ps1

$ErrorActionPreference = "Stop"
$gh = Get-Command gh -ErrorAction SilentlyContinue
if (-not $gh) {
  $fallback = Join-Path $env:TEMP "gh-cli\bin\gh.exe"
  if (Test-Path $fallback) { $ghExe = $fallback } else { throw "Nainstalujte GitHub CLI (gh) a spusťte: gh auth login" }
} else { $ghExe = $gh.Source }

& $ghExe auth status
if ($LASTEXITCODE -ne 0) { throw "Nejprve: gh auth login" }

python scripts/verify-pages.py
if ($LASTEXITCODE -ne 0) { throw "verify-pages.py failed" }

$repoName = Split-Path (Get-Location) -Leaf
$view = & $ghExe repo view --json name 2>$null
if (-not $view) {
  & $ghExe repo create $repoName --public --source=. --remote=origin --push
} else {
  git push -u origin HEAD
}

$user = & $ghExe api user -q .login

# Pages Source = GitHub Actions (workflow .github/workflows/pages.yml)
& $ghExe api -X POST "repos/$user/$repoName/pages" -f build_type=workflow 2>$null
if ($LASTEXITCODE -ne 0) {
  & $ghExe api -X PUT "repos/$user/$repoName/pages" -f build_type=workflow 2>$null
}

Write-Host ""
Write-Host "Jednou zkontroluj: Settings → Pages → Source = GitHub Actions"
Write-Host "Mockup:  https://$user.github.io/$repoName/"
Write-Host "Design A: https://$user.github.io/$repoName/a/"
Write-Host "Actions: https://github.com/$user/$repoName/actions"
