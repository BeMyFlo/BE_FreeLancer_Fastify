FROM node:20-alpine

# Set workdir
WORKDIR /usr/src/app

# Copy package.json trước để cache install
COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
