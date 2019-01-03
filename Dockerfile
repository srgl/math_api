FROM node:10-alpine AS development
ENV NODE_ENV=development
WORKDIR /app
COPY package.json package-lock.json ./

FROM development AS test
ENV NODE_ENV=test
RUN npm install
COPY . .
RUN npm run build

FROM development AS production
ENV NODE_ENV=production
RUN npm install --no-optional --only=production
COPY --from=test /app/dist ./dist
