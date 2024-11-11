FROM artifactory.local.hejsan.xyz/docker/library/node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build:frontend

FROM artifactory.local.hejsan.xyz/docker/library/nginx:1.27.2-alpine AS runner

COPY apps/frontend/replace_api_url.sh /docker-entrypoint.d/replace_api_url.sh
RUN chmod +x /docker-entrypoint.d/replace_api_url.sh

COPY --from=builder /app/dist/apps/frontend /usr/share/nginx/html