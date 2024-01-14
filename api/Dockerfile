FROM ghcr.io/puppeteer/puppeteer:21.6.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
WORKDIR /app/api
COPY package*.json ./
RUN npm ci
COPY . .
RUN  npm run build 2>&1 | tee build.log
EXPOSE 3001
CMD ["npm", "start", "--", "--no-sandbox"]
