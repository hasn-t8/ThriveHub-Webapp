FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx svelte-kit sync

RUN npm run build

EXPOSE 8000
ENV PORT=8000
CMD ["node", "build"]