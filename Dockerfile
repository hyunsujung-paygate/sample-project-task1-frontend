# Node.js 18 LTS 버전 사용
FROM node:18-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# Node.js 버전 확인
RUN node --version && npm --version

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 소스 코드 복사
COPY . .

# 빌드 실행
RUN npm run build

# 프로덕션 스테이지 (필요한 경우)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

