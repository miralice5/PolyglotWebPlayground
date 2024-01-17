# Dockerfile for Go server
FROM golang:latest
WORKDIR /go/src/app
COPY go_server/main.go .
RUN go build -o main .
EXPOSE 8080
CMD ["./main"]
