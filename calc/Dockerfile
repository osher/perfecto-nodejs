FROM node:alpine
WORKDIR /calc
COPY package.json package.json
RUN npm install

FROM alpine
RUN apk add --no-cache --repository \
    http://dl-cdn.alpinelinux.org/alpine/v3.13/main/ \
    nodejs=14.18.1-r0
WORKDIR /calc
COPY --from=0 /calc/node_modules node_modules
COPY bin bin
COPY lib lib
ENTRYPOINT ["/calc/bin/calc"]
CMD ["help"]