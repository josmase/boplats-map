FROM artifactory.local.hejsan.xyz/docker/node:18-alpine AS npm

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

FROM artifactory.local.hejsan.xyz/docker/node:18-alpine AS builder

WORKDIR /app

COPY --from=npm /app/node_modules /app/node_modules

COPY . .

RUN npm run build:frontend

FROM artifactory.local.hejsan.xyz/docker/nginx:1.27.3-alpine@sha256:5acf10cd305853dc2271e3c818d342f3aeb3688b1256ab8f035fda04b91ed303 AS runner

COPY apps/frontend/replace_api_url.sh /docker-entrypoint.d/replace_api_url.sh
RUN chmod +x /docker-entrypoint.d/replace_api_url.sh

COPY --from=builder /app/dist/apps/frontend /usr/share/nginx/html