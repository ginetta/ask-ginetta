# Use an official Node runtime as a parent image
FROM node:20-alpine AS base

# Default DANSWER_VERSION, typically overridden during builds by CI/CD tools like GitHub Actions.
ARG DANSWER_VERSION=0.3-dev
ENV DANSWER_VERSION=${DANSWER_VERSION}
RUN echo "DANSWER_VERSION: ${DANSWER_VERSION}"

# Install dependencies only when needed
FROM base AS deps
# libc6-compat may be needed for certain NPM packages.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Adjusted COPY commands to reflect the correct path from the root directory
COPY web/package.json web/yarn.lock* web/package-lock.json* web/pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# Ensure the COPY command correctly points to the relative path of the `web` directory
COPY web/ .

# Connect to backend
ARG INTERNAL_URL
ENV INTERNAL_URL=${INTERNAL_URL}

# Disable automatic telemetry collection for Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Build-time environment variables
ARG NEXT_PUBLIC_DISABLE_STREAMING
ENV NEXT_PUBLIC_DISABLE_STREAMING=${NEXT_PUBLIC_DISABLE_STREAMING}

ARG NEXT_PUBLIC_NEW_CHAT_DIRECTS_TO_SAME_PERSONA
ENV NEXT_PUBLIC_NEW_CHAT_DIRECTS_TO_SAME_PERSONA=${NEXT_PUBLIC_NEW_CHAT_DIRECTS_TO_SAME_PERSONA}

# Build the Next.js application
RUN npm run build

# Production image, copy all the files and run the application
FROM base AS runner
WORKDIR /app

# No need for global node_modules at runtime, hence removed for security and size
RUN rm -rf /usr/local/lib/node_modules

# Not running the app as root for security reasons
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs
USER nextjs

# Copy built assets from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Display the content of ls -la ./
RUN ls -la ./

# Redefine environment variables for runtime
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_DISABLE_STREAMING=${NEXT_PUBLIC_DISABLE_STREAMING}
ENV NEXT_PUBLIC_NEW_CHAT_DIRECTS_TO_SAME_PERSONA=${NEXT_PUBLIC_NEW_CHAT_DIRECTS_TO_SAME_PERSONA}

# Start the application
CMD ["node", "server.js"]
