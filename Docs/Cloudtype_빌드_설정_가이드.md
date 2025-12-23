# Cloudtype 빌드 설정 가이드

## Node.js 버전 오류 해결 방법

### 문제
```
Unexpected token '??='
npm ERR! code ELIFECYCLE
```

이 오류는 Node.js 버전이 18 미만일 때 발생합니다.

### 해결 방법

#### 방법 1: Cloudtype 대시보드에서 설정

1. [Cloudtype 대시보드](https://cloudtype.io/) 접속
2. 프로젝트 선택
3. **설정** 또는 **Build Settings** 메뉴로 이동
4. **Node.js 버전**을 **18** 또는 **18.x**로 설정
5. 저장 후 빌드 재시작

#### 방법 2: Dockerfile 사용

프로젝트에 `Dockerfile`이 있으면 Cloudtype이 자동으로 인식합니다.

1. `Dockerfile` 파일이 프로젝트 루트에 있는지 확인
2. Cloudtype 대시보드에서 **빌드 방식**을 **Dockerfile**로 설정
3. 빌드 재시작

#### 방법 3: 환경 변수 설정

Cloudtype 대시보드에서:

1. **환경 변수** 또는 **Environment Variables** 메뉴로 이동
2. 다음 환경 변수 추가:
   - `NODE_VERSION=18`
   - 또는 `NVM_NODE_VERSION=18`

#### 방법 4: 빌드 스크립트 수정

`package.json`의 `prebuild` 스크립트가 Node.js 버전을 확인합니다.

빌드 전에 자동으로 버전을 확인하고 오류를 표시합니다.

## 확인 사항

빌드 로그에서 다음을 확인하세요:

```
Node.js 버전: v18.x.x
```

버전이 18 미만이면 Cloudtype 설정에서 Node.js 버전을 변경해야 합니다.

## 참고

- `package.json`의 `engines` 필드에 `"node": ">=18.0.0"`이 설정되어 있습니다
- `.nvmrc` 파일에 `18`이 지정되어 있습니다
- `Dockerfile`에서 Node.js 18을 사용하도록 설정되어 있습니다

