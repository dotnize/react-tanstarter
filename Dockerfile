# syntax=docker/dockerfile:1

# =============================================================================
# Base stage - Common setup for all stages
# =============================================================================
FROM node:22-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# =============================================================================
# Dependencies stage - Install production dependencies
# =============================================================================
FROM base AS deps

COPY package.json pnpm-lock.yaml* ./

# Install dependencies (will use pnpm-lock.yaml if it exists)
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile || pnpm install

# =============================================================================
# Development stage - For local development with hot reload
# =============================================================================
FROM base AS development

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]

# =============================================================================
# Builder stage - Build the production application
# =============================================================================
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN pnpm build

# =============================================================================
# Production stage - Minimal image for running the application
# =============================================================================
FROM node:22-alpine AS production

WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 tanstarter

# Copy built application
COPY --from=builder --chown=tanstarter:nodejs /app/.output ./.output
COPY --from=builder --chown=tanstarter:nodejs /app/package.json ./package.json

USER tanstarter

EXPOSE 3000

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["node", ".output/server/index.mjs"]
