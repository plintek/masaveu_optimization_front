# build environment
FROM node:latest AS build

ARG VITE_WEBAPP_URL
ARG VITE_WEBSITE_URL
ARG VITE_ENDPOINT_URL

ENV NODE_OPTIONS --max_old_space_size=8192

COPY package.json /tmp/package.json
COPY package-lock.json /tmp/package-lock.json

RUN cd /tmp && npm ci --force
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./

RUN npm run build

# nginx state for serving content
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/config/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
