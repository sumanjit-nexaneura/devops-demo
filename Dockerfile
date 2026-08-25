# ---- Build stage: install production dependencies ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# ---- Runtime stage: minimal image that runs the app ----
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src
USER node
EXPOSE 8080
CMD ["node", "src/server.js"]