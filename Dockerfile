FROM node:10-alpine as tizer_admin

WORKDIR /src

ENTRYPOINT yarn global add @vue/cli -g && \
    yarn && \
    yarn build
