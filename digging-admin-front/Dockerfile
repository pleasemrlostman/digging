# 1) Build 단계: Node.js 환경에서 애플리케이션을 빌드한다

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

# 정적 파일로 빌드 (보통 React 앱 기준으로 /build 폴더 생성됨)
RUN npm run build


# 2) 실행 단계: Nginx를 이용해 빌드된 정적 파일을 서비스

# 경량 Nginx 이미지 사용
FROM nginx:alpine

# 빌드된 정적 파일을 Nginx 기본 루트 디렉토리에 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx가 사용하는 HTTP 기본 포트를 외부에 노출
EXPOSE 80

# Nginx를 포그라운드로 실행 (컨테이너 종료 방지)
CMD ["nginx", "-g", "daemon off;"]