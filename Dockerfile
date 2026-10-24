# Kenwarf-Website (statisch) für eine eigene Domain. Bau: docker build -t kenwarf-website .  Start: docker run -p 8080:8080 kenwarf-website
# SITE_BASE=/ baut für die Wurzel der Domain; die GitHub-Pages-Vorschau baut weiter mit /kenwarf-website (Workflow).
ARG NODE_IMAGE=node:22-alpine
ARG NGINX_IMAGE=nginx:alpine
FROM ${NODE_IMAGE} AS bau
ARG SITE_BASE=/
ARG SITE_ORIGIN=https://kenwarf.heidrich-digital.de
WORKDIR /app
COPY package.json package-lock.json ./
RUN PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci --no-audit --no-fund
COPY . .
ENV SITE_BASE=${SITE_BASE} SITE_ORIGIN=${SITE_ORIGIN}
RUN npm run build

FROM ${NGINX_IMAGE}
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=bau /app/dist /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
