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

# npm 버전 확인 (업그레이드 시도하지 않음 - Node.js 18과 호환성 문제 방지)
echo "현재 npm 버전: $(npm --version)"
echo "💡 npm 업그레이드는 건너뜁니다 (Node.js 18과 호환성 유지)"

# package-lock.json 확인
echo "=== package-lock.json 확인 ==="
if [ -f "package-lock.json" ]; then
  echo "✅ package-lock.json 존재 확인"
  echo "📄 package-lock.json 크기: $(ls -lh package-lock.json | awk '{print $5}')"
  echo "📄 package-lock.json 첫 줄: $(head -1 package-lock.json)"
  # vite가 package-lock.json에 있는지 확인
  if grep -q '"vite"' package-lock.json; then
    echo "✅ vite가 package-lock.json에 포함되어 있습니다"
  else
    echo "⚠️ vite가 package-lock.json에 없습니다!"
  fi
else
  echo "⚠️ package-lock.json이 없습니다. npm install을 사용합니다."
fi

# 의존성 설치
echo "=== 의존성 설치 ==="
# node_modules 완전히 정리
rm -rf node_modules 2>/dev/null || true

# npm install을 기본으로 사용 (Docker 빌드 컨텍스트에서 더 안정적)
echo "📦 npm install 실행 중..."
npm install

# 설치된 패키지 수 확인
INSTALLED_COUNT=$(find node_modules -maxdepth 1 -type d 2>/dev/null | wc -l || echo "0")
echo "📦 설치된 패키지 수: $INSTALLED_COUNT"

# 설치된 패키지 확인
echo "=== 설치된 패키지 확인 ==="
if [ ! -f "node_modules/.bin/vite" ]; then
  echo "❌ vite가 설치되지 않았습니다!"
  echo "📦 node_modules/.bin 내용:"
  ls -la node_modules/.bin/ 2>/dev/null || echo "node_modules/.bin 폴더가 없습니다"
  echo "📦 node_modules 루트 내용 (일부):"
  ls -la node_modules/ | head -20 2>/dev/null || echo "node_modules 폴더가 없습니다"
  echo "💡 node_modules를 완전히 정리하고 npm install을 다시 시도합니다..."
  rm -rf node_modules package-lock.json 2>/dev/null || true
  npm install
  if [ ! -f "node_modules/.bin/vite" ]; then
    echo "❌ vite 설치 실패!"
    echo "📋 package.json의 devDependencies 확인:"
    grep -A 20 '"devDependencies"' package.json || echo "package.json을 읽을 수 없습니다"
    exit 1
  fi
fi
echo "✅ vite 설치 확인됨: $(which vite || echo 'node_modules/.bin/vite')"

# 빌드 실행
echo "=== 빌드 실행 ==="
npm run build

# 빌드 결과 확인
echo "=== 빌드 결과 확인 ==="
if [ -d "dist" ]; then
  echo "✅ dist 폴더 생성 확인"
  echo "📁 dist 폴더 내용:"
  ls -la dist/
  echo "📄 index.html 존재 여부:"
  if [ -f "dist/index.html" ]; then
    echo "✅ index.html 파일 확인됨"
  else
    echo "❌ index.html 파일이 없습니다!"
    exit 1
  fi
else
  echo "❌ dist 폴더가 생성되지 않았습니다!"
  exit 1
fi

echo "=== 빌드 완료 ==="

