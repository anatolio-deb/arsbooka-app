FROM node:16-alpine
WORKDIR /code
COPY . .
RUN apk update && \
    apk add git && \
    git config --global user.email nikiforova693@gmail.com \
    && git config --global user.name anatolio-deb \
    && npm install vue@^2 \
    && npm install -g @vue/cli