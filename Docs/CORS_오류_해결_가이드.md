# CORS 오류 해결 가이드

## 문제

다음과 같은 CORS 오류가 발생할 수 있습니다:

```
Access to fetch at 'https://backend-server.com/api/...' from origin 'https://frontend-server.com'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## 원인

브라우저의 **동일 출처 정책(Same-Origin Policy)** 때문에 발생합니다.

**중요:** CORS 오류는 프로토콜(http vs https)이 아니라 **도메인이 다를 때** 발생합니다.

- ✅ **로컬 개발 환경**: `http://localhost:3000` → `https://backend-server.com` (프로토콜 다름 + 도메인 다름) → CORS 오류 발생 → **Vite 프록시로 해결**
- ⚠️ **운영 환경**: `https://frontend-server.com` → `https://backend-server.com` (프로토콜 같음 + 도메인 다름) → **백엔드 서버에 CORS 설정 필요**

프론트엔드와 백엔드가 **다른 도메인**에서 실행될 때, 백엔드 서버에서 명시적으로 CORS 헤더를 설정해야 합니다.

## 해결 방법

### 방법 1: 백엔드 서버에 CORS 설정 추가 (권장)

백엔드 서버 코드에 다음 CORS 헤더를 추가해야 합니다:

#### Express.js 예시:

```javascript
const cors = require("cors");

app.use(
  cors({
    origin: [
      "https://web-sample-project-task1-frontend-mjghfzfo9b552830.sel3.cloudtype.app",
      "http://localhost:3000", // 개발 환경
    ],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
```

#### Spring Boot 예시:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins(
                        "https://web-sample-project-task1-frontend-mjghfzfo9b552830.sel3.cloudtype.app",
                        "http://localhost:3000"
                    )
                    .allowedMethods("GET", "POST", "OPTIONS")
                    .allowedHeaders("Content-Type")
                    .allowCredentials(true);
            }
        };
    }
}
```

#### 수동 헤더 설정:

```javascript
// 모든 요청에 CORS 헤더 추가
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://web-sample-project-task1-frontend-mjghfzfo9b552830.sel3.cloudtype.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");

  // OPTIONS 요청 처리 (preflight)
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});
```

### 방법 2: 백엔드 개발자에게 요청

백엔드 서버를 직접 수정할 수 없다면, 백엔드 개발자에게 다음을 요청하세요:

1. **CORS 허용 도메인 추가:**
   - `https://web-sample-project-task1-frontend-mjghfzfo9b552830.sel3.cloudtype.app`
   - `http://localhost:3000` (개발 환경)

2. **필요한 CORS 헤더:**
   - `Access-Control-Allow-Origin`
   - `Access-Control-Allow-Methods: GET, POST, OPTIONS`
   - `Access-Control-Allow-Headers: Content-Type`

### 방법 3: 프록시 서버 사용 (임시 해결책)

프론트엔드와 백엔드를 같은 도메인에서 서빙하거나, 프록시 서버를 사용할 수 있습니다. 하지만 이는 일반적으로 권장되지 않습니다.

## 현재 설정

- **프론트엔드 도메인:** `https://web-sample-project-task1-frontend-mjghfzfo9b552830.sel3.cloudtype.app`
- **백엔드 API 서버:** `https://port-0-sample-project-task1-backend-mjghfzfo9b552830.sel3.cloudtype.app`
- **API 엔드포인트:** `/api/v1/parking-lots`

## 확인 방법

백엔드 서버에 CORS 설정이 제대로 되어 있는지 확인:

1. 브라우저 개발자 도구(F12) → Network 탭
2. API 요청 클릭
3. Response Headers에서 다음 헤더 확인:
   - `Access-Control-Allow-Origin: https://web-sample-project-task1-frontend-mjghfzfo9b552830.sel3.cloudtype.app`
   - `Access-Control-Allow-Methods: GET, POST, OPTIONS`

## 현재 환경별 설정

### 로컬 개발 환경

- **프론트엔드**: `http://localhost:3000`
- **백엔드**: `https://port-0-sample-project-task1-backend-mjghfzfo9b552830.sel3.cloudtype.app`
- **해결 방법**: Vite 프록시 사용 (`vite.config.ts`에 설정됨)
- **상태**: ✅ 해결됨

### 운영 환경

- **프론트엔드**: `https://web-sample-project-task1-frontend-mjghfzfo9b552830.sel3.cloudtype.app`
- **백엔드**: `https://port-0-sample-project-task1-backend-mjghfzfo9b552830.sel3.cloudtype.app`
- **해결 방법**: 백엔드 서버에 CORS 헤더 설정 필요
- **상태**: ⚠️ 백엔드 서버 설정 필요

## 참고

- CORS는 브라우저의 보안 정책이므로, 서버 간 통신이나 Postman 같은 도구에서는 발생하지 않습니다.
- **프로토콜(http vs https)이 아니라 도메인이 다를 때 CORS 오류가 발생합니다.**
- 개발 환경에서는 Vite 프록시를 사용하여 CORS 문제를 우회할 수 있지만, 프로덕션에서는 백엔드 서버에 CORS 설정이 필요합니다.
- 운영 환경에서도 프론트엔드와 백엔드가 다른 도메인(`web-sample-project-task1-frontend-...` vs `port-0-sample-project-task1-backend-...`)이므로 CORS 설정이 필요합니다.
