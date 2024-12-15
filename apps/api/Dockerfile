FROM artifactory.local.hejsan.xyz/docker/denoland/deno:2.1.4 as builder

WORKDIR /app

COPY . .

RUN deno task build:api
CMD ["run",  "--unstable-detect-cjs", "--allow-env", "--allow-read", "--allow-net", "--allow-sys", "apps/api/src/main.ts"]
