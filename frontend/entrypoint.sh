#!/bin/sh 

ginx -g "daemon on;"

# Monitor the web directory and reload NGINX on changes
inotifywait -m -r -e modify,create,delete /usr/share/nginx/html |
while read path action file; do
    echo "Detected change in $file. Reloading NGINX..."
    nginx -s reload
done &

# Keep NGINX in the foreground
nginx -g "daemon off;"