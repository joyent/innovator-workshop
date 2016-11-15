FROM mhart/alpine-node:6.9.1

RUN apk update && \
    apk add curl && \
    apk add python && \
    apk add make && \
    apk add g++ && \
    rm -rf /var/cache/apk/*

# Install our application
RUN mkdir -p /opt/slides/html
RUN mkdir -p /opt/slides/images
COPY package.json /opt/slides/
COPY server.js /opt/slides/
COPY html/index.html /opt/slides/html/index.html
COPY images/*.png /opt/slides/images/
RUN cd /opt/slides && npm install

RUN apk del python && \
    apk del make && \
    apk del g++

ENV PORT=80
EXPOSE 80

WORKDIR /opt/slides/
CMD ["node", "server.js"]