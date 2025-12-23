# Node.js 설치 후 설정 가이드

## 문제: Node.js를 설치했는데 명령어가 인식되지 않음

이 문제는 일반적으로 **환경 변수 PATH가 업데이트되지 않았거나**, **터미널이 재시작되지 않아서** 발생합니다.

## 해결 방법

### 방법 1: PowerShell 세션에서 직접 경로 추가 (빠른 해결)

현재 터미널에서 다음 명령어를 실행하세요:

```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
```

그 다음 확인:
```powershell
node --version
npm --version
```

### 방법 2: 스크립트 실행

프로젝트 루트에 있는 `setup-nodejs.ps1` 파일을 실행:

```powershell
.\setup-nodejs.ps1
```

### 방법 3: 시스템 환경 변수 수정 (영구적 해결)

1. **시작 메뉴**에서 "환경 변수" 검색
2. **"시스템 환경 변수 편집"** 선택
3. **"환경 변수"** 버튼 클릭
4. **"시스템 변수"** 섹션에서 **"Path"** 선택 후 **"편집"** 클릭
5. **"새로 만들기"** 클릭 후 다음 경로 추가:
   ```
   C:\Program Files\nodejs
   ```
6. **확인** 버튼을 모두 클릭하여 저장
7. **모든 터미널과 VSCode를 완전히 종료 후 재시작**

### 방법 4: 컴퓨터 재시작

가장 확실한 방법은 컴퓨터를 재시작하는 것입니다. 재시작 후 환경 변수가 자동으로 적용됩니다.

## 확인 방법

새 터미널을 열고 다음 명령어로 확인:

```bash
node --version
npm --version
```

정상적으로 버전이 표시되면 설치가 완료된 것입니다.

## VSCode 사용 시 주의사항

- 환경 변수를 변경한 후 **VSCode를 완전히 종료하고 재시작**해야 합니다
- VSCode의 통합 터미널도 새로 열어야 합니다 (`Ctrl+Shift+``)

## 추가 문제 해결

### Node.js가 다른 경로에 설치된 경우

다음 명령어로 Node.js 설치 위치를 확인:

```powershell
Get-ChildItem "C:\Program Files" -Filter "node.exe" -Recurse -ErrorAction SilentlyContinue
Get-ChildItem "$env:LOCALAPPDATA\Programs" -Filter "node.exe" -Recurse -ErrorAction SilentlyContinue
```

찾은 경로를 위의 방법 3에서 사용하세요.

