FROM artifactory.local.hejsan.xyz/docker/node:22-alpine@sha256:b64ced2e7cd0a4816699fe308ce6e8a08ccba463c757c00c14cd372e3d2c763e AS npm

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

FROM artifactory.local.hejsan.xyz/docker/node:22-alpine@sha256:b64ced2e7cd0a4816699fe308ce6e8a08ccba463c757c00c14cd372e3d2c763e AS builder

WORKDIR /app

COPY --from=npm /app/node_modules /app/node_modules

COPY . .

RUN npm run build:frontend

FROM artifactory.local.hejsan.xyz/docker/nginx:1.27.3-alpine@sha256:5acf10cd305853dc2271e3c818d342f3aeb3688b1256ab8f035fda04b91ed303 AS runner

COPY apps/frontend/replace_api_url.sh /docker-entrypoint.d/replace_api_url.sh
RUN chmod +x /docker-entrypoint.d/replace_api_url.sh

COPY --from=builder /app/dist/apps/frontend /usr/share/nginx/html