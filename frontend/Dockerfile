# 1. Сборка
FROM node:20-alpine AS builder
WORKDIR /app

# Кэшируем установку зависимостей
COPY package*.json ./
RUN npm install

# Копируем исходники и собираем
COPY . .
RUN npm run build

# 2. Запуск
FROM node:20-alpine
WORKDIR /app

# Указываем, что это продакшн
ENV NODE_ENV=production
# Глобально разрешаем доступ извне контейнера (0.0.0.0)
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Копируем результат сборки и все зависимости
COPY --from=builder /app ./

EXPOSE 3000

# Запуск стандартным методом Next.js
CMD ["npm", "start"]
