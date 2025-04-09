# 1) Build 단계: 애플리케이션 빌드를 위한 환경 구성

# Node.js가 설치된 가벼운 Alpine 리눅스 이미지를 사용
FROM node:20.11.0-alpine AS builder

# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# 의존성 설치를 위해 필요한 파일만 우선 복사하여 캐시 최적화
COPY package.json package-lock.json ./

# lockfile을 기준으로 정확하게 의존성 설치 (예상치 못한 변경 방지)
RUN npm ci

# 나머지 모든 소스 파일 복사
COPY . .

# Nest.js 등의 앱을 빌드 (보통 /dist 디렉토리에 생성됨)
RUN npm run build


# 2) Production 이미지: 실행에 필요한 파일만 포함한 경량 이미지

# Node.js가 설치된 가벼운 Alpine 리눅스 이미지를 다시 사용
FROM node:20.11.0-alpine

# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# 빌드 단계에서 생성된 package.json만 복사 (버전 정보 등 유지 목적)
COPY --from=builder /app/package.json ./

# 빌드 단계에서 설치된 node_modules 복사 (런타임 실행을 위한 의존성)
COPY --from=builder /app/node_modules ./node_modules

# 빌드된 결과물(dist 디렉토리) 복사
COPY --from=builder /app/dist ./dist

# 애플리케이션이 사용할 포트 3002를 외부에 노출
EXPOSE 3002

# Node.js로 빌드 결과 실행 (Nest.js 기준으로 main.ts → main.js 실행)
CMD ["node", "dist/main"]