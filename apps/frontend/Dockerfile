FROM artifactory.local.hejsan.xyz/docker/node:18-alpine AS npm

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

FROM artifactory.local.hejsan.xyz/docker/node:18-alpine AS builder

WORKDIR /app

COPY --from=npm /app/node_modules /app/node_modules

COPY . .

RUN npm run build:frontend

FROM artifactory.local.hejsan.xyz/docker/nginx:1.27.0-alpine AS runner

COPY apps/frontend/replace_api_url.sh /docker-entrypoint.d/replace_api_url.sh
RUN chmod +x /docker-entrypoint.d/replace_api_url.sh

COPY --from=builder /app/dist/apps/frontend /usr/share/nginx/html