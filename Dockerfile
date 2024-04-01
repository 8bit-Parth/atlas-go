FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install
 
COPY . .

RUN npx prisma generate

RUN npm install @supabase/supabase-js

RUN npm run build

# COPY .next ./.next

EXPOSE 3000

ENV HOSTNAME "0.0.0.0"

CMD [ "npm", "run", "start" ]

