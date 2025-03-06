FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG NEXT_PUBLIC_API
ARG NEXT_PUBLIC_RESEND_API
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID

# Pass environment variables to Next.js during the build
ENV NEXT_PUBLIC_API=$NEXT_PUBLIC_API
ENV NEXT_PUBLIC_RESEND_API=$NEXT_PUBLIC_RESEND_API
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]