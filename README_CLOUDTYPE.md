# Cloudtype 배포 가이드

## Node.js 버전 문제 해결

현재 Cloudtype에서 Node.js v14.21.3이 사용되어 빌드가 실패하고 있습니다.

### 해결 방법

Cloudtype이 자동 빌드를 사용하는 경우, 다음 중 하나를 시도하세요:

#### 방법 1: Cloudtype 지원팀에 문의

Cloudtype 대시보드에서 직접 Node.js 버전을 설정할 수 없다면:
1. Cloudtype 지원팀에 문의
2. 프로젝트의 Node.js 버전을 18로 변경 요청
3. 또는 빌드 환경의 Node.js 버전 업그레이드 요청

#### 방법 2: Dockerfile 사용 (권장)

프로젝트에 `Dockerfile`이 있으므로:

1. Cloudtype 대시보드 접속
2. 프로젝트 설정 확인
3. **빌드 방식** 또는 **Build Method**에서:
   - "Dockerfile 사용" 옵션 활성화
   - 또는 "Custom Build" 선택 후 Dockerfile 경로 지정

#### 방법 3: 환경 변수 설정

Cloudtype 대시보드에서 환경 변수 추가:
- `NODE_VERSION=18`
- `NVM_NODE_VERSION=18`

#### 방법 4: 빌드 명령어 수정 (Cloudtype 대시보드에서)

Cloudtype 대시보드에서 **빌드 명령어** 또는 **Build Command**를 다음 중 하나로 변경:

**옵션 1: build.sh 사용**
```bash
sh build.sh
```

**옵션 2: nvm을 사용한 직접 명령어 (권장)**
```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && nvm install 18 && nvm use 18 && npm ci && npm run build
```

**옵션 3: nvm 없이 직접 Node.js 18 설치 (가능한 경우)**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs && npm ci && npm run build
```

**옵션 4: 간단한 버전 (nvm이 이미 설치된 경우)**
```bash
nvm install 18 && nvm use 18 && npm ci && npm run build
```

## 현재 설정된 파일

- `Dockerfile`: Node.js 18 사용
- `package.json`: `engines` 필드에 Node.js 18 요구사항 명시
- `.nvmrc`: Node.js 18 지정
- `.node-version`: Node.js 18 지정
- `build.sh`: 빌드 스크립트 (nvm 사용 시도)

## 확인 사항

빌드 로그에서 다음을 확인:
```
현재 Node.js 버전: v18.x.x  ✅
```

v14.x.x가 보이면 Node.js 버전이 변경되지 않은 것입니다.

