# Cloudtype 빌드 설정 가이드

## Node.js 버전 오류 해결 방법

### 문제
```
Unexpected token '??='
Error: Node.js 18 이상이 필요합니다. 현재 버전: v14.21.3
```

이 오류는 Node.js 버전이 18 미만일 때 발생합니다.

### 해결 방법

#### 방법 1: Cloudtype 대시보드에서 설정 (필수)

**⚠️ 중요: 이 방법이 가장 확실합니다!**

1. [Cloudtype 대시보드](https://cloudtype.io/) 접속
2. 프로젝트 선택
3. **설정** 또는 **Build Settings** 메뉴로 이동
4. **Node.js 버전** 또는 **Runtime Version**을 **18** 또는 **18.x**로 설정
   - 현재 v14.21.3이 사용 중이므로 반드시 변경 필요
5. **저장** 클릭
6. **빌드 재시작** 또는 **배포 재시작**

#### 방법 2: build.sh 사용 (권장)

프로젝트에 `build.sh` 스크립트가 있습니다.

1. Cloudtype 대시보드 접속
2. 프로젝트 선택
3. **설정** 또는 **Build Settings** 메뉴로 이동
4. **빌드 방식** 또는 **Build Method**에서:
   - **Custom Build** 또는 **Build Script** 선택
   - **빌드 명령어** 또는 **Build Command**에 `sh build.sh` 입력
5. **저장** 클릭
6. **빌드 재시작** 또는 **배포 재시작**

**⚠️ 중요**: Dockerfile이 있으면 Cloudtype이 자동으로 Dockerfile을 사용하려고 시도할 수 있습니다. 
빌드 방식에서 **Custom Build** 또는 **Build Script**를 명시적으로 선택해야 합니다.

#### 방법 3: Dockerfile 사용

프로젝트에 `Dockerfile`이 있으면 Cloudtype이 자동으로 인식합니다.

1. `Dockerfile` 파일이 프로젝트 루트에 있는지 확인
2. Cloudtype 대시보드에서 **빌드 방식**을 **Dockerfile**로 설정
3. 빌드 재시작

**⚠️ 주의**: Dockerfile 사용 시 `ENOTDIR` 오류가 발생할 수 있습니다. 
이 경우 `build.sh`를 사용하는 것을 권장합니다.

#### 방법 4: 환경 변수 설정

Cloudtype 대시보드에서:

1. **환경 변수** 또는 **Environment Variables** 메뉴로 이동
2. 다음 환경 변수 추가:
   - `NODE_VERSION=18`
   - 또는 `NVM_NODE_VERSION=18`

#### 방법 5: 빌드 스크립트 수정

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

