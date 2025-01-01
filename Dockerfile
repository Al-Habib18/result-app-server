FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

# Install OpenSSL
# RUN apt-get update && apt-get install -y openssl && apt-get clean


COPY . .

EXPOSE 4005

CMD ["npm","run","dev"]