FROM node:lts-alpine
WORKDIR /code
COPY . .
RUN apk update && apk add git && git config --global user.email nikiforova693@gmail.com && git config --global user.name anatolio-deb