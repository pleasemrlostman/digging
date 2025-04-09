# 1) Build 단계: Next.js 애플리케이션을 빌드하는 단계

# Node.js가 설치된 가벼운 Alpine 리눅스 이미지를 사용
FROM node:20.11.0-alpine AS builder

# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# 의존성 설치를 위해 필요한 설정 파일만 복사
COPY package.json package-lock.json ./

# lockfile을 기반으로 정확하게 의존성 설치 (캐시 최적화 및 일관성 보장)
RUN npm ci

# 전체 소스 복사
COPY . .

# Next.js 앱을 프로덕션용으로 빌드 (.next 폴더 생성됨)
RUN npm run build


# 2) Production 이미지: 실제 서비스용 경량 이미지

# Node.js가 설치된 가벼운 Alpine 리눅스 이미지를 다시 사용
FROM node:20.11.0-alpine

# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# 실행에 필요한 최소한의 파일만 복사

# 패키지 버전 정보를 위해 package.json 복사
COPY --from=builder /app/package.json ./

# 의존성 실행을 위해 node_modules 복사
COPY --from=builder /app/node_modules ./node_modules

# 빌드된 Next.js 파일 (.next 디렉토리) 복사
COPY --from=builder /app/.next ./.next

# 정적 파일(public 디렉토리) 복사
COPY --from=builder /app/public ./public

# Next.js 앱이 사용하는 기본 포트 3000 노출
EXPOSE 3001

# Next.js 앱을 프로덕션 모드로 실행
CMD ["npx", "next", "start"]