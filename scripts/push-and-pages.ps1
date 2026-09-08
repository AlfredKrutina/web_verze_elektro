# Spusť v PowerShellu z kořene repo (vyžaduje přihlášení: gh auth login)
# Použití: .\scripts\push-and-pages.ps1

$ErrorActionPreference = "Stop"
$gh = Get-Command gh -ErrorAction SilentlyContinue
if (-not $gh) {
  $fallback = Join-Path $env:TEMP "gh-cli\bin\gh.exe"
  if (Test-Path $fallback) { $ghExe = $fallback } else { throw "Nainstalujte GitHub CLI (gh) a spusťte: gh auth login" }
} else { $ghExe = $gh.Source }

& $ghExe auth status
if ($LASTEXITCODE -ne 0) { throw "Nejprve: gh auth login" }

$repoName = Split-Path (Get-Location) -Leaf
$existing = & $ghExe repo view --json name -q .name 2>$null
if (-not $existing) {
  & $ghExe repo create $repoName --public --source=. --remote=origin --push
} else {
  git push -u origin HEAD
}

# Zapnout GitHub Pages z /docs na main
$user = & $ghExe api user -q .login
& $ghExe api -X PUT "repos/$user/$repoName/pages" `
  -f build_type=legacy `
  -f source[branch]=main `
  -f source[path]=/docs 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Pages možná už běží, nebo zapněte ručně: Settings → Pages → main /docs"
}

Write-Host ""
Write-Host "Mockup URL: https://$user.github.io/$repoName/"
Write-Host "Přímý design A: https://$user.github.io/$repoName/a/"
