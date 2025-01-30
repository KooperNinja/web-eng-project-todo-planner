FROM nginx:alpine

# Install inotify-tools
RUN apk add --no-cache inotify-tools

# Copy your custom entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
