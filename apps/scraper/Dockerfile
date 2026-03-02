FROM oven/bun:latest AS builder

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

FROM oven/bun:slim
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/apps/scraper /app/apps/scraper
COPY --from=builder /app/libs /app/libs

CMD ["bun", "run", "apps/scraper/src/main.ts"]
