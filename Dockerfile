FROM node:20-alpine

COPY ./backend .

RUN npm install

RUN npm run build

CMD ["npm", "start"]