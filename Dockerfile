FROM nginx:alpine

COPY default.conf.template /etc/nginx/templates/

COPY --chown=nginx:nginx build /usr/share/nginx/html/

# Create non-root user for running nginx (security best practice)
RUN chown -R nginx:nginx /usr/share/nginx/html/
RUN chmod -R 644 /usr/share/nginx/html/
RUN chmod 644 /etc/nginx/templates/default.conf.template

EXPOSE 80

USER nginx
