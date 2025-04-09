# Digging 프로젝트

이 프로젝트는 **digging** 폴더 내에 React, Next.js, Nest.js 기반의 애플리케이션을 각각 Docker 컨테이너로 빌드 및 실행하며, `docker-compose`를 이용해 전체 서비스를 관리한다.

## 폴더 구조

## Dockerfile 설명

### digging-admin-front (React)

- **빌드 스테이지**:
  - Node.js 20.11.0-alpine 이미지를 사용해 의존성 설치 및 빌드 진행
  - 빌드 결과물이 `dist` 폴더에 생성됨 (프로젝트 설정에 따라 달라질 수 있음)
- **실행 스테이지**:
  - Nginx를 사용해 `/usr/share/nginx/html`에 빌드 결과물을 복사 후 정적 파일 서빙
  - 포트 80을 EXPOSE

**예시 Dockerfile (digging-admin-front/Dockerfile):**

```dockerfile
# 1) Build 단계: Node.js 환경에서 애플리케이션 빌드
FROM node:20.11.0-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2) 실행 단계: Nginx를 통해 빌드된 정적 파일 서비스
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### digging-front (Next.js)

예시 Dockerfile (digging-front/Dockerfile):

```dockerfile
# 1) Build 단계
FROM node:20.11.0-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2) Production 실행 단계
FROM node:20.11.0-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npx", "next", "start"]
```

### digging-back (Nest.js)

예시 Dockerfile (digging-back/Dockerfile):

```dockerfile
# 1) Build 단계
FROM node:20.11.0-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2) Production 실행 단계
FROM node:20.11.0-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 3002
CMD ["node", "dist/main"]
```

## Docker Compose 설정

프로젝트 전체를 한 번에 실행하기 위해 docker-compose를 사용한다.

예시 docker-compose.yml:

```yaml
# Docker Compose 파일 버전 (최신 기능을 위해 3.8 사용)
version: "3.8"

services:
  # digging-admin-front (React 앱 서비스, 정적 파일을 Nginx로 서빙)
  digging-admin-front:
    build:
      context: ./digging-admin-front
      dockerfile: Dockerfile
    # 호스트의 3001번 포트를 컨테이너의 80번 포트(Nginx)로 연결
    ports:
      - "3001:80"
    networks:
      - app-network

  # digging-front (Next.js 앱 서비스, SSR 또는 CSR 기반 프론트엔드)
  digging-front:
    build:
      context: ./digging-front
      dockerfile: Dockerfile
    # 호스트의 3000번 포트를 컨테이너의 3000번 포트로 연결 (Next.js 기본 포트)
    ports:
      - "3000:3000"
    networks:
      - app-network

  # digging-back (Nest.js 백엔드 API 서비스)
  digging-back:
    build:
      context: ./digging-back
      dockerfile: Dockerfile
    depends_on:
      - digging-db
    environment:
      # DB 접속 정보 역시 .env에서 가져옴
      - DB_HOST=${DB_HOST}
      - DB_PORT=${DB_PORT}
      - DB_NAME=${POSTGRES_DB}
      - DB_USER=${POSTGRES_USER}
      - DB_PASS=${POSTGRES_PASSWORD}
    # 호스트와 컨테이너 모두 3002번 포트를 사용 (Nest.js 기본 포트)
    ports:
      - "3002:3002"
    networks:
      - app-network

        # PostgreSQL 데이터베이스 서비스
  # PostgreSQL 데이터베이스 서비스
  digging-db:
    image: postgres:13 # PostgreSQL 공식 이미지
    restart: always # 중단 시 자동 재시작
    environment:
      # .env에 정의한 변수 참조
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
      # 호스트 포트도 .env로 관리
      - "${DB_PORT}:5432"
    networks:
      - app-network

# 영구 데이터 저장을 위한 볼륨
volumes:
  db_data:

networks:
  app-network:
    driver: bridge
```

> 참고: Docker Compose v2에서는 version 키가 obsolete 경고 메시지를 발생시킬 수 있으나 동작에는 영향이 없다.

## 명령어 단축 (npm 스크립트 예시)

package.json에 스크립트를 추가해 반복 명령어 입력을 줄일 수 있다

```json
{
  "scripts": {
    "dev:all": "docker-compose up --build",
    "shutdown": "docker-compose down",
    "dev:digging-admin-front": "docker-compose up --build digging-admin-front",
    "dev:digging-front": "docker-compose up --build digging-front",
    "dev:digging-back": "docker-compose up --build digging-back"
  }
}
```

## 명령어 단축

- 전체 실행: `npm run dev:all`
- 특정 서비스 실행: 예) `npm run dev:digging-admin-front`
- 종료: `npm run shutdown`

## 주의사항

- **민감 정보**  
  Dockerfile 및 docker-compose.yml에 API 키, 비밀번호 등의 민감 정보를 직접 포함하지 말 것.  
  환경 변수 또는 별도 비밀 관리 시스템(GitHub Secrets, .env 파일 등)을 사용.

- **.dockerignore 파일**  
  빌드 시 불필요한 파일 및 디렉터리가 포함되지 않도록 `.dockerignore` 파일을 작성.

- **CI/CD & 배포**  
  추후 GitHub Actions를 이용해 Docker 이미지 빌드 및 AWS ECS/ECR 배포를 자동화할 예정.  
  GitHub Actions 워크플로우에서 AWS 크레덴셜 및 기타 민감 정보는 Secrets를 통해 관리.

## 추가 참고 사항

- Docker 데몬이 실행 중인지 확인 (특히 macOS의 경우 Docker Desktop 실행 필요)
- 빌드 결과물이 실제 생성되는 경로와 Dockerfile의 COPY 경로가 일치하는지 확인
- 문제가 발생하면 Docker 빌드 로그를 참고하여 적절히 경로 및 스크립트를 수정
