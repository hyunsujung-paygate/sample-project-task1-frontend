# Node.js 18 LTS 버전 사용
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# Node.js 및 npm 버전 확인
RUN node --version && npm --version
# npm 업그레이드 (lockfileVersion 호환성 개선)
RUN npm install -g npm@latest
RUN npm --version

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 소스 코드 복사
COPY . .

# 빌드 실행
RUN npm run build

# 빌드 결과물 확인
RUN ls -la dist/

