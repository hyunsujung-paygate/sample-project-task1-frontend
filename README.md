# 서울시 공영주차장 안내 웹 애플리케이션

서울시 열린데이터 Open API를 활용하여 서울시 공영주차장 안내 정보를 카카오맵에 표시하는 웹 애플리케이션입니다.

## 📋 프로젝트 개요

본 프로젝트는 서울시 공영주차장 정보를 조회하고 카카오맵에 시각적으로 표시하는 기능을 제공합니다.

### 주요 기능
- 서울시 공영주차장 API를 통한 주차장 정보 조회
- 카카오맵 API를 활용한 지도 표시
- 구(district), 동(dong)별 검색 기능
- API 리턴값을 통한 지도 마커 표시
- 마커 클릭 시 주차장 상세 정보 표시

## 🛠 기술 스택

- **프레임워크**: Vue.js 3
- **언어**: TypeScript
- **빌드 도구**: Vite
- **개발 방식**: TDD (Test-Driven Development)
- **설계 원칙**: DDD (Domain-Driven Design) 개념 적용

## 📁 프로젝트 구조

```
src/
├── domain/                    # 도메인 레이어
│   ├── ParkingLot/           # 주차장 도메인
│   └── Map/                  # 지도 도메인
├── infrastructure/            # 인프라스트럭처 레이어
│   ├── api/                  # 외부 API 통신
│   └── repository/           # 리포지토리 구현
├── application/              # 애플리케이션 레이어
│   ├── usecase/              # 유스케이스
│   └── dto/                  # 데이터 전송 객체
├── presentation/             # 프레젠테이션 레이어
│   ├── components/           # Vue 컴포넌트
│   ├── views/                # 페이지 뷰
│   └── router/               # 라우터 설정
├── tests/                    # 테스트 코드
└── shared/                   # 공유 유틸리티
    ├── constants/            # 상수 관리
    └── utils/                # 유틸리티 함수
```

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.x 이상
- npm (Node.js 설치 시 자동 포함)

### Node.js 설치 방법

**Windows:**
1. [Node.js 공식 웹사이트](https://nodejs.org/)에서 LTS 버전 다운로드
2. 설치 프로그램 실행 후 기본 설정으로 설치
3. 설치 완료 후 새 터미널을 열고 다음 명령어로 확인:
   ```bash
   node --version
   npm --version
   ```

**설치 확인:**
- 설치 후 **새 터미널**을 열어야 PATH 환경 변수가 적용됩니다
- VSCode를 사용하는 경우, VSCode를 완전히 종료 후 재시작하세요

### 설치 및 실행

1. **의존성 설치**
```bash
npm install
```

2. **환경 변수 설정**
`.env` 파일을 생성하고 다음 변수를 설정하세요:
```env
VITE_KAKAO_MAP_KEY=your_kakao_map_key
```

3. **개발 서버 실행**

**터미널에서 실행:**
```bash
npm run dev
```

**VSCode에서 실행:**
- `F5` 키를 누르거나 디버그 패널에서 "Vue: Chrome" 또는 "Vue: Edge" 선택
- 또는 `Ctrl+Shift+P` → "Tasks: Run Task" → "npm: dev" 선택

4. **빌드**
```bash
npm run build
```

5. **테스트 실행**
```bash
npm run test
```

## 📚 API 연동

### 공영주차장 조회 API
- **API 서버**: https://port-0-sample-project-task1-backend-mjghfzfo9b552830.sel3.cloudtype.app
- **엔드포인트**: `/api/v1/parking-lots`
- 서울시 공영주차장 안내 정보 조회 (구, 동별 검색 지원)

### 카카오맵 API
- **API 가이드**: https://apis.map.kakao.com/web/documentation/
- 지도 표시 및 마커 표시

## 📖 개발 문서

- [프론트엔드 개발 문서](./Docs/프론트엔드_개발문서.md) - 프로젝트 개발 가이드
- [Node.js 설치 가이드](./Docs/SETUP_GUIDE.md) - Node.js 설치 및 환경 설정
- [VSCode 설정 가이드](./Docs/VSCode_설정_가이드.md) - VSCode에서 프로젝트 실행 방법
- [카카오맵 API 설정 가이드](./Docs/카카오맵_API_설정_가이드.md) - 카카오맵 API 401 오류 해결 방법

## 🧪 테스트

본 프로젝트는 TDD 방식으로 개발됩니다.
- 단위 테스트: 도메인 로직, 유스케이스, API 클라이언트
- 통합 테스트: API 연동, 컴포넌트 통합

## 📝 코딩 컨벤션

- **파일명**: PascalCase 사용
- **클래스명**: PascalCase 사용
- **상수명**: UPPER_SNAKE_CASE 사용
- **변수명**: camelCase 사용
- **함수명**: 동사로 시작
- 모든 함수에는 JSDoc 스타일의 주석 포함
- 코드 주석은 한글로 작성

자세한 내용은 [프론트엔드 개발 문서](./Docs/프론트엔드_개발문서.md)를 참고하세요.

## 📄 라이선스

이 프로젝트는 개인 학습 목적으로 제작되었습니다.
