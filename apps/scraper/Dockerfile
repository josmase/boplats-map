FROM artifactory.local.hejsan.xyz/docker/denoland/deno:2.1.4 as builder

WORKDIR /app

COPY  . .

RUN deno task build:scraper
CMD ["run",  "--unstable-detect-cjs", "--allow-env", "--allow-read", "--allow-net", "--allow-sys", "apps/scraper/src/main.ts"]
