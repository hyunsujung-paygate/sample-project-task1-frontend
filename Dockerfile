# Node.js 18 LTS 버전 사용
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --only=production=false

# 소스 코드 복사
COPY . .

# 빌드 실행
RUN npm run build

# 프로덕션 서버 실행 (선택사항)
# EXPOSE 3000
# CMD ["npm", "run", "preview"]

