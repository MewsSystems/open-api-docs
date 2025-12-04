FROM node:13-alpine

RUN npm install -g gitbook-cli

WORKDIR /usr/src/app

COPY . .

EXPOSE 4000

RUN gitbook build

CMD ["gitbook", "serve"]
