# 빌드 스테이지
FROM node:18-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# Node.js 및 npm 버전 확인
RUN node --version && npm --version

# 모든 소스 코드 복사 (build.sh 포함)
COPY . .

# build.sh 실행 권한 부여
RUN chmod +x build.sh

# build.sh를 사용하여 의존성 설치 및 빌드 실행
RUN sh build.sh

# 빌드 결과물 확인
RUN ls -la dist/

# 프로덕션 스테이지 - nginx로 정적 파일 서빙
FROM nginx:alpine

# 빌드 결과물을 nginx로 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx 설정 파일 복사 (SPA 라우팅 지원)
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# 포트 노출
EXPOSE 80

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]

