# base node image
FROM node:18-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl sqlite3

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /songbook-creator

ADD package.json .npmrc ./
RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps

WORKDIR /songbook-creator

COPY --from=deps /songbook-creator/node_modules /songbook-creator/node_modules
ADD package.json .npmrc ./
RUN npm prune --production

# Build the app
FROM base as build

WORKDIR /songbook-creator

COPY --from=deps /songbook-creator/node_modules /songbook-creator/node_modules

ADD prisma .
RUN npx prisma generate

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

ENV DATABASE_URL=file:/data/sqlite.db
ENV PORT="8080"
ENV NODE_ENV="production"

# add shortcut for connecting to database CLI
RUN echo "#!/bin/sh\nset -x\nsqlite3 \$DATABASE_URL" > /usr/local/bin/database-cli && chmod +x /usr/local/bin/database-cli

WORKDIR /songbook-creator

COPY --from=production-deps /songbook-creator/node_modules /songbook-creator/node_modules
COPY --from=build /songbook-creator/node_modules/.prisma /songbook-creator/node_modules/.prisma

COPY --from=build /songbook-creator/build /songbook-creator/build
COPY --from=build /songbook-creator/public /songbook-creator/public
COPY --from=build /songbook-creator/package.json /songbook-creator/package.json
COPY --from=build /songbook-creator/start.sh /songbook-creator/start.sh
COPY --from=build /songbook-creator/prisma /songbook-creator/prisma

ENTRYPOINT [ "./start.sh" ]