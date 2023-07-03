FROM node:16.17.0-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY src/package*.json yarn.* ./
RUN yarn install --frozen-lockfile --production

# Copy app source code
COPY src/ .

# Build app
RUN yarn run build --ignore-ts-errors

COPY src/.env ./build

# Expose port
EXPOSE 3333

# Start app
CMD ["node", "./build/server.js", ">>", "app.log"]