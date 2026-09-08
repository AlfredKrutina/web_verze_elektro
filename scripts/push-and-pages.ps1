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

# Locální verify (stejné kontroly jako CI)
@(
  "docs/.nojekyll",
  "docs/index.html",
  "docs/a/index.html",
  "docs/a/aktuality/index.html",
  "docs/a/assets/css/main.css",
  "docs/a/assets/js/main.js",
  "docs/a/assets/media/logo_nove.png"
) | ForEach-Object { if (-not (Test-Path $_)) { throw "Chybí $_" } }
if (Test-Path "docs/a/ops-redakce") { throw "ops-redakce nesmí jít do Pages" }
if (Test-Path "docs/a/assets/js/aktuality-config.js") { Write-Host "Pozn: lokalni aktuality-config.js je OK (gitignore)" }

$repoName = Split-Path (Get-Location) -Leaf
$visibility = & $ghExe repo view --json isPrivate,name -q "[.name,.isPrivate]" 2>$null
if (-not $visibility) {
  & $ghExe repo create $repoName --public --source=. --remote=origin --push
} else {
  & $ghExe repo edit --visibility public 2>$null
  git push -u origin HEAD
}

$user = & $ghExe api user -q .login

# Zapnout Pages přes GitHub Actions (workflow .github/workflows/pages.yml)
& $ghExe api -X POST "repos/$user/$repoName/pages" -f build_type=workflow 2>$null
if ($LASTEXITCODE -ne 0) {
  & $ghExe api -X PUT "repos/$user/$repoName/pages" -f build_type=workflow 2>$null
}
Write-Host "Pokud Settings → Pages ještě není 'GitHub Actions', nastav to ručně jednou."
Write-Host "Pak: gh workflow run 'Deploy GitHub Pages'  (nebo dalsi push)"

Write-Host ""
Write-Host "Mockup URL: https://$user.github.io/$repoName/"
Write-Host "Přímý design A: https://$user.github.io/$repoName/a/"
Write-Host "Actions: https://github.com/$user/$repoName/actions"
