# client/Dockerfile

# 1) Сборка фронтенда
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2) Отдача в статике с учётом base: '/reactjs-template'
FROM nginx:alpine
# Помещаем собранный dist в папку reactjs-template
RUN mkdir -p /usr/share/nginx/html/reactjs-template
COPY --from=builder /app/dist/* /usr/share/nginx/html/reactjs-template/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
