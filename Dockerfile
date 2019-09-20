FROM node:10-alpine as dupon_predictions_admin

WORKDIR /src

ENTRYPOINT yarn global add @vue/cli -g && \
    yarn && \
    yarn build
