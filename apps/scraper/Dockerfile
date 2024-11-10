FROM artifactory.local.hejsan.xyz/docker/library/node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build:scraper

FROM artifactory.local.hejsan.xyz/docker/library/node:18-alpine AS runner
ENV DB_URI mongodb://localhost:27017/boplats?authSource=admin
ENV DB_USERNAME root
ENV DB_PASSWORD example

WORKDIR /app

COPY --from=builder /app/dist/apps/scraper /app
#This is bad as it will include dependencies from all projects. It should be possible to use "generatePackageJson: true", but it didn't work.
COPY --from=builder /app/node_modules /app/node_modules

CMD ["node", "main.js"]
