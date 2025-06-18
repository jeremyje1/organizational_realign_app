# apps/api/Dockerfile
# Multi-stage build for the NestJS API on Fly.io

############ 1) Base: install deps ############
FROM node:18-alpine AS base
WORKDIR /usr/src/app

# Enable pnpm via Corepack (bundled with Node 18)
RUN corepack enable && corepack prepare pnpm@9.1.2 --activate

# Copy workspace manifests first for better caching
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

# Install deps (all packages, we’ll prune later)
RUN pnpm install --frozen-lockfile

############ 2) Builder: compile API ############
FROM base AS builder

# Copy only the API code and everything it needs
COPY apps/api ./apps/api
COPY prisma ./prisma
COPY tsconfig.* ./

# Build the NestJS API (assumes “build” script outputs to apps/api/dist)
RUN pnpm --filter "api..." run build

############ 3) Runner: lightweight runtime ############
FROM node:18-alpine AS prod
WORKDIR /usr/src/app
ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@9.1.2 --activate

# Copy production deps & compiled output
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/apps/api/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3001
CMD ["node", "dist/main.js"]