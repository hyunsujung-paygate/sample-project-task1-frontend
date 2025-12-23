#!/bin/sh
# Cloudtype 빌드 스크립트
# Node.js 버전 확인 및 업그레이드

echo "현재 Node.js 버전: $(node --version)"
echo "현재 npm 버전: $(npm --version)"

# Node.js 버전이 18 미만이면 오류
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "❌ Node.js 18 이상이 필요합니다. 현재 버전: $(node --version)"
  echo "💡 Cloudtype 대시보드에서 Node.js 버전을 18로 설정해주세요."
  exit 1
fi

echo "✅ Node.js 버전 확인 완료: $(node --version)"

# 빌드 실행
npm run build

