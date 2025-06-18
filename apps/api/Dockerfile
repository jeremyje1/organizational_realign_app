# apps/api/Dockerfile
# Multi-stage build for the NestJS API on Fly.io

################ 1) base – deps ################
FROM node:18-alpine AS base
WORKDIR /usr/src/app
RUN corepack enable && corepack prepare pnpm@9.1.2 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

################ 2) builder – compile ##########
FROM base AS builder
COPY apps/api ./apps/api
COPY prisma ./prisma
COPY tsconfig.* ./
RUN pnpm --filter "api..." run build        # adjust if your build script is different

################ 3) prod – runtime #############
FROM node:18-alpine AS prod
WORKDIR /usr/src/app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@9.1.2 --activate
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/apps/api/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
EXPOSE 3001
CMD ["node", "dist/main.js"]