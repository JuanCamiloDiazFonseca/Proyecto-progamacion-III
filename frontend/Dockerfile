# ========================
# 🚀 Build de Next.js limpio sin Tailwind
# ========================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .
RUN npm run build

# ========================
# 🔧 Etapa final
# ========================
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
