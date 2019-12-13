FROM node:8.11.4-alpine as builder
WORKDIR /webpack-ts-react-boilerplate
COPY . ./
RUN npm i
RUN npm run build

FROM node:8.11.4-alpine
WORKDIR /webpack-ts-react-boilerplate
COPY --from=builder /webpack-ts-react-boilerplate ./
RUN npm i --production
EXPOSE 8080
ENTRYPOINT ["npm"]