FROM node:alpine
WORKDIR /calc
RUN ln -s /usr/local/bin/node /usr/bin/node
COPY package.json package.json
RUN npm install
COPY bin bin
COPY lib lib
ENTRYPOINT ["/calc/bin/calc"]
CMD ["help"]