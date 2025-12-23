# Node.js PATH 설정 스크립트
# 이 스크립트는 현재 PowerShell 세션에서 Node.js 경로를 추가합니다

$nodePath = "C:\Program Files\nodejs"
$currentPath = $env:PATH

if ($currentPath -notlike "*$nodePath*") {
    $env:PATH = "$nodePath;$currentPath"
    Write-Host "Node.js 경로가 현재 세션에 추가되었습니다." -ForegroundColor Green
} else {
    Write-Host "Node.js 경로가 이미 PATH에 포함되어 있습니다." -ForegroundColor Yellow
}

Write-Host "`nNode.js 버전 확인:" -ForegroundColor Cyan
& "$nodePath\node.exe" --version

Write-Host "`nnpm 버전 확인:" -ForegroundColor Cyan
& "$nodePath\npm.cmd" --version

Write-Host "`n주의: 이 변경사항은 현재 PowerShell 세션에만 적용됩니다." -ForegroundColor Yellow
Write-Host "영구적으로 적용하려면 시스템 환경 변수를 수정하거나 컴퓨터를 재시작하세요." -ForegroundColor Yellow

