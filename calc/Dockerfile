FROM node:alpine
WORKDIR /calc
COPY package.json package.json
RUN npm install
COPY bin bin
COPY lib lib
ENTRYPOINT ["node","/calc/bin/calc"]
CMD ["help"]