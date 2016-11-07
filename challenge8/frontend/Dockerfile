FROM mhart/alpine-node:latest

RUN apk update && \
    apk add curl && \
    rm -rf /var/cache/apk/*

ENTRYPOINT ["node"]

# Install our application
RUN mkdir -p /opt/app/lib/public
COPY package.json /opt/app/
COPY lib/*.js /opt/app/lib/
COPY lib/public /opt/app/lib/public
RUN cd /opt/app && npm install

CMD ["/opt/app/"]