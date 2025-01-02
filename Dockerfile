FROM node:20-alpine

# Set working directory
WORKDIR /app

# Update repositories and install dependencies
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/' /etc/apk/repositories && \
    apk update && \
    apk add --no-cache openssl libc6-compat

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy all source code
COPY . .

# Generate Prisma Client
# RUN npx prisma generate

# Expose the application port
EXPOSE 4005

# Start the application
CMD ["yarn", "dev"]
