# ==========================
# 🏗️ Etapa de compilación
# ==========================
FROM golang:1.23.3-alpine AS builder

# Instalamos git y preparamos el entorno
RUN apk add --no-cache git

WORKDIR /app

# Copiamos dependencias
COPY go.mod go.sum ./
RUN go mod tidy

# Copiamos el código fuente
COPY . .

# Compilamos el binario con nombre "backend-app"
RUN go build -o backend-app ./main.go

# ==========================
# 🚀 Etapa final
# ==========================
FROM alpine:3.20

WORKDIR /app

# Copiamos solo el binario (no toda la carpeta)
COPY --from=builder /app/backend-app .

# Exponemos el puerto del backend
EXPOSE 8080

# Ejecutamos el binario
CMD ["./backend-app"]
