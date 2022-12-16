FROM node:16.15-alpine as dev
WORKDIR /usr/app/
COPY package* .
COPY . .
EXPOSE 4200
CMD ["npm", "run", "start:dev"]

FROM node:16.15-alpine as prod
WORKDIR /usr/app/
COPY package* yarn* ./
RUN yarn
COPY . .
RUN yarn build
EXPOSE 4200
CMD ["node", "dist/main.js"]
