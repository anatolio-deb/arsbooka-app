# syntax=docker/dockerfile:1
FROM node:alpine
WORKDIR /code
COPY . .
RUN apk update && \
    apk add git && \
    git config --global user.email nikiforova693@gmail.com \
    && git config --global user.name anatolio-deb \
    && wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh - \
    && source /root/.shrc
