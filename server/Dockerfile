FROM golang:1.14.1-alpine

# Move to project root
WORKDIR /go/src/github.com/taisuke-j/apollo-demo

# Install air
RUN apk update
RUN apk add curl
RUN curl -fLo /go/bin/air https://git.io/linux_air \
  && chmod +x /go/bin/air

# Start live-reloading
CMD air