FROM artifactory.local.hejsan.xyz/docker/node:22-alpine@sha256:b64ced2e7cd0a4816699fe308ce6e8a08ccba463c757c00c14cd372e3d2c763e AS npm

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

FROM artifactory.local.hejsan.xyz/docker/node:22-alpine@sha256:b64ced2e7cd0a4816699fe308ce6e8a08ccba463c757c00c14cd372e3d2c763e AS builder

WORKDIR /app

COPY --from=npm /app/node_modules /app/node_modules

COPY . .

RUN npm run build:api

FROM artifactory.local.hejsan.xyz/docker/node:22-alpine@sha256:b64ced2e7cd0a4816699fe308ce6e8a08ccba463c757c00c14cd372e3d2c763e AS runner
ENV PORT 3000
ENV DB_URI mongodb://localhost:27017/boplats?authSource=admin
ENV DB_USERNAME root
ENV DB_PASSWORD example

WORKDIR /app

COPY --from=builder /app/dist/apps/api /app
#This is bad as it will include dependencies from all projects. It should be possible to use "generatePackageJson: true", but it didn't work.
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE $PORT

CMD ["node", "main.js"]
