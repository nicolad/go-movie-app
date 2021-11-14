FROM --platform=linux/amd64 golang:1.16

# Move to project root
WORKDIR /go/src/github.com/nicolad/go-movie-app

COPY . .

RUN go mod download

RUN go get github.com/cosmtrek/air

CMD air