FROM node:10.11.0-alpine

RUN mkdir -p /app
WORKDIR /app

COPY . /app/
RUN npm install --quiet
