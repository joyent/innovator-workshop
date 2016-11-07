FROM mhart/alpine-node:latest

RUN apk update && \
    apk add curl && \
    rm -rf /var/cache/apk/*

ENTRYPOINT ["node"]

# Install our application
RUN mkdir -p /opt/app/lib
COPY package.json /opt/app/
COPY lib/* /opt/app/lib/
RUN cd /opt/app && npm install


CMD ["/opt/app/"]