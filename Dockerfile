# Builder stage

FROM node:20 AS builder

# Create app directory
WORKDIR /home/node/app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache

# Bundle app source
COPY . .

# Build
RUN NODE_OPTIONS="--max_old_space_size=4096" yarn build


# Runner stage

FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /home/node/app

# Install serve
RUN yarn global add serve

# Copy build files
COPY --from=builder /home/node/app/build ./build

EXPOSE 27776

CMD serve -s build -p 27776
