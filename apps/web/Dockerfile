FROM oven/bun:latest AS builder

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile
RUN cd apps/web && bun run build

FROM artifactory.local.hejsan.xyz/docker/nginx:1.27.3-alpine@sha256:5acf10cd305853dc2271e3c818d342f3aeb3688b1256ab8f035fda04b91ed303 AS runner
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY apps/web/replace_api_url.sh /docker-entrypoint.d/replace_api_url.sh
RUN chmod +x /docker-entrypoint.d/replace_api_url.sh

COPY --from=builder /app/apps/web/dist /usr/share/nginx/html