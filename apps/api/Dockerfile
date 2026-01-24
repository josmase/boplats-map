FROM oven/bun:latest AS builder

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

FROM oven/bun:slim
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/apps/api /app/apps/api
COPY --from=builder /app/libs /app/libs

EXPOSE 3000
CMD ["bun", "run", "apps/api/src/main.ts"]
