# ─── BUILD ──────────────────────────────────────────────────────────────
FROM node:18-alpine AS builder
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm ci

# build production assets
COPY . .
RUN npm run build

# ─── PRODUCTION IMAGE ───────────────────────────────────────────────────
FROM nginx:alpine
# remove default nginx content
RUN rm -rf /usr/share/nginx/html/*
# copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
