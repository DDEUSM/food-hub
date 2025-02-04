FROM node:20.11.1

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY ./package.json ./package-lock.json ./

RUN npm ci

ADD ./ ./

RUN npx prisma generate && \
    npm run tsoa:process && \
    npm run build

EXPOSE 1445

CMD [ "npm", "start" ]