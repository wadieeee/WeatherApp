FROM node:18.16.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV API_Key=644b1711322ee61eeba8c5ed1b5caa62

EXPOSE 3000

CMD ["npm", "start"]
    
