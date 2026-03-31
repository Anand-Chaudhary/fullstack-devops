# Build Frontend

FROM node:20-alpine as frontend-builder

COPY ./frontend /app

WORKDIR /app

RUN npm install

RUN npm run build

# Build Backend

FROM node:20-alpine as backend-builder

COPY ./backend /app

WORKDIR /app

RUN npm install

COPY --from=frontend-builder /app/dist /app/public

RUN npm run build

CMD ["npm", "start"]