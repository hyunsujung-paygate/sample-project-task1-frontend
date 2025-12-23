#!/bin/sh
# Cloudtype 빌드 스크립트
# Node.js 버전 확인 및 nvm을 통한 업그레이드 시도

echo "=== Cloudtype 빌드 시작 ==="
echo "현재 Node.js 버전: $(node --version)"
echo "현재 npm 버전: $(npm --version)"

# nvm이 설치되어 있는지 확인
if command -v nvm >/dev/null 2>&1 || [ -s "$HOME/.nvm/nvm.sh" ]; then
  echo "nvm 발견, Node.js 18 설치 시도..."
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  nvm install 18
  nvm use 18
  echo "Node.js 버전 변경 후: $(node --version)"
fi

# Node.js 버전 확인
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "❌ Node.js 18 이상이 필요합니다. 현재 버전: $(node --version)"
  echo "💡 Cloudtype 대시보드에서 Node.js 버전을 18로 설정해주세요."
  echo "💡 또는 Cloudtype 지원팀에 문의하여 Node.js 버전을 변경해주세요."
  exit 1
fi

echo "✅ Node.js 버전 확인 완료: $(node --version)"

# 의존성 설치
echo "=== 의존성 설치 ==="
npm ci

# 빌드 실행
echo "=== 빌드 실행 ==="
npm run build

echo "=== 빌드 완료 ==="

