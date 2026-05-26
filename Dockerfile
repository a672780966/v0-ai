FROM node:22-bookworm-slim

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --no-frozen-lockfile --prod=false

COPY . .
RUN pnpm build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "start", "--", "-H", "0.0.0.0"]
