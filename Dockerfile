FROM node:20-alpine AS builder

WORKDIR /app

# Install native dependencies for Puppeteer and Prisma
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      openssl

# Tell Puppeteer to skip installing Chrome/Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# Point Puppeteer to the installed Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY package*.json ./
RUN npm ci

COPY . .

# Generate Prisma client
# RUN npx prisma generate

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

# Required for runtime execution of Puppeteer and encryption
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      openssl

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
# If fullstack, include other necessary files like Prisma directory
# COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "start"]
