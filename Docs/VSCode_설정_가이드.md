# VSCode 설정 가이드

## 필수 사전 요구사항

이 프로젝트를 VSCode에서 실행하기 전에 **Node.js가 설치되어 있어야 합니다**.

### Node.js 설치 확인

터미널에서 다음 명령어로 확인:
```bash
node --version
npm --version
```

### Node.js 설치 방법

1. [Node.js 공식 웹사이트](https://nodejs.org/)에서 LTS 버전 다운로드
2. 설치 프로그램 실행
3. **중요**: 설치 후 VSCode를 완전히 종료하고 재시작하세요

## VSCode 실행 방법

### 방법 1: 디버깅 실행 (F5)
- `F5` 키를 누르면 자동으로 개발 서버가 시작되고 브라우저가 열립니다
- 브레이크포인트를 설정하여 디버깅할 수 있습니다

### 방법 2: 태스크 실행
1. `Ctrl+Shift+P` → "Tasks: Run Task"
2. 원하는 태스크 선택:
   - `npm: dev` - 개발 서버 실행
   - `npm: build` - 프로덕션 빌드
   - `npm: test` - 테스트 실행
   - `npm: lint` - 코드 린팅
   - `npm: format` - 코드 포맷팅

### 방법 3: 터미널에서 직접 실행
VSCode 통합 터미널(`Ctrl+``)에서:
```bash
npm run dev
```

## 문제 해결

### "npm이 인식되지 않습니다" 오류
- Node.js가 설치되어 있는지 확인
- VSCode를 완전히 종료 후 재시작
- 새 터미널 창 열기
- 시스템 환경 변수 PATH에 Node.js 경로가 포함되어 있는지 확인
- 자세한 내용은 [Node.js 설치 가이드](./SETUP_GUIDE.md) 참고

### 빌드 실패
- `npm install`을 먼저 실행하여 의존성을 설치했는지 확인
- Node.js 버전이 18.x 이상인지 확인

