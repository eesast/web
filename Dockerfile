# Builder stage

ARG NODE_VERSION=24.22.1
FROM node:${NODE_VERSION} AS builder

# Create app directory
WORKDIR /home/node/app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache

# Bundle app source
COPY . .

# Build
RUN yarn build


# Runner stage

FROM node:${NODE_VERSION}-alpine
ENV NODE_ENV=production
WORKDIR /home/node/app

# Install serve
RUN yarn global add serve

# Copy build files
COPY --from=builder /home/node/app/build ./build

EXPOSE 27776

CMD serve -s build -p 27776
