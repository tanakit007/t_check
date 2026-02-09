# ใช้ Node 22 ตามที่ Vite แนะนำสำหรับโปรเจคคุณ
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ใช้ Nginx เสิร์ฟไฟล์
FROM nginx:alpine
# สร้างโฟลเดอร์ให้ตรงกับ base path /t_check/ ที่คุณใช้
RUN mkdir -p /usr/share/nginx/html/t_check
COPY --from=builder /app/dist /usr/share/nginx/html/t_check

# เพิ่ม Config ให้ Nginx รู้จัก Path และรองรับ React Router (ป้องกัน 404)
RUN echo 'server { \
    listen 80; \
    location /t_check/ { \
    alias /usr/share/nginx/html/t_check/; \
    try_files $uri $uri/ /t_check/index.html; \
    } \
    }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]