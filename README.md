## Tornado

[![Build](https://github.com/projectstorm/tornado/actions/workflows/test.yml/badge.svg)](https://github.com/projectstorm/tornado/actions/workflows/test.yml)
[![Docker](https://img.shields.io/docker/pulls/projectstorm/tornado.svg)](https://hub.docker.com/r/projectstorm/tornado)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-f9ad00.svg)](https://pnpm.io/)


Concept and image reference board software for ambitious creatives 🎨

(Inspired by the awesome projects https://www.pureref.com/ and https://vizref.com/)

![](./images/example1.png)
![](./images/example2.png)

## What

Tornado is self-hosted software for the web (currently in development) that provides digital media artists with the ability to create concept and reference boards.
You can simply paste images you have copied in your clipboard, and then arrange them as you see fit.


## Features:

* SPA (Single Page App)
* Multiple Users
* Light and dark mode
* Email + password authentication
* Image resizing on the server (4 sizes based on the image zoom)
* Uses window DPI to determine which image variant to serve
* Canvas zoom and translate
* Image paste from clipboard and translate
* Name and rename boards
* Crop images + the ability to re-crop the original image at any stage
* Double click to focus images in the center of the screen
* Fullscreen toggle
* Resize images on any corner
* Initial widths are computed based on the average sizes of the other images
* Lock mode to prevent editing, auto unlock on image paste

![](./images/screenshot1.png)
![](./images/screenshot2.png)
![](./images/screenshot3.png)
![](./images/screenshot4.png)


## Requirements

* MySQL / MariaDB database
* Node 18+

## Development environment

1. copy `.env.template` -> `.env` and replace the variables with your own.
2. Run ```pnpm build``` to run the initial typescript build.
3. Run ```pnpm watch``` to start everything in watch mode, including the server and backing docker-compose services.

## Configuration

Tornado is configured using environment variables.

| name                | default | desc                                                                                           |
|---------------------|---------|------------------------------------------------------------------------------------------------|
| SITE_URL            |         | example: https://tornado.example.com                                                           |
| PORT                | 8080    | Port to start the server on                                                                    |
| DATABASE_URL        |         | mysql://{user}:{pass}@{host}:{port}/{db}                                                       |
| ADMIN_USER_EMAIL    |         | Email address of the admin user (for login)                                                    |
| ADMIN_USER_PASS     |         | Password of the admin user (this can be removed after the admin user is created on first boot) |
| CONTENT_DIRECTORY   |         | The main directory where all content is uploaded, Tornado will created the child directories   |
| UPLOAD_LIMIT        | 10MB    | Express upload limit (mostly relevant to image uploads)                                        |

## Running with docker

Quick start using docker-compose:

```yaml
version: "3"
services:
  tornado:
    image: projectstorm/tornado:latest
    ports:
      - "80:8080"
    environment:
      DATABASE_URL: mysql://root:tornado@tornado_database:3306/mytornado
      SITE_URL: http://localhost:80
  tornado_database:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: tornado
      MYSQL_DATABASE: mytornado
```

For HTTPS, consider using `nginx` with `certbot` and reverse proxy to the http port on your docker network, for example:

```nginx
server {
  listen 443 ssl;
  server_name tornado.mydomain.net;
  client_max_body_size 100M;

  ssl_certificate /etc/letsencrypt/live/mydomain.net/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/mydomain.net/privkey.pem;

  location / {
      proxy_redirect                    off;
      proxy_http_version                1.1;
      proxy_set_header Upgrade          $http_upgrade;
      proxy_set_header Connection       "upgrade";
      proxy_set_header Host             $host;
      proxy_set_header X-Real-IP        $remote_addr;
      proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;

      proxy_pass http://tornado:8080;
  }
}
```

and something like this:

```yaml
...
  nginx:
    image: nginx
    volumes:
     - ./templates:/etc/nginx/templates
     - ./data/certbot/conf:/etc/letsencrypt
     - ./data/certbot/www:/var/www/certbot
     - ./99-autoreload.sh:/docker-entrypoint.d/99-autoreload.sh
    ports:
     - "80:80"
     - "443:443"
  certbot:
    restart: always
    image: certbot/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
...
```

## Release

```pnpm version major/minor/patch && git push --tags origin master``` this will rollup a changelog, create a release and publish to docker with the `latest` tag + semver.

_Note: Pull requests must have the appropriate label (eg 'feature') to be included in the release notes automatically._

## About

Project Author: Dylan Vorster (dylanvorster.com)

Links to a few of the awesome artists featured in the example images:

* https://twitter.com/KilluKaela
* https://twitter.com/IndigoBeatss
* https://twitter.com/the_aftrmrkt
* https://twitter.com/Xezeno1
* https://twitter.com/for_riner
* https://twitter.com/fwflunky
* https://twitter.com/Dev_Voxy
* https://twitter.com/_rat_riot
* https://twitter.com/Frayvuir
* https://twitter.com/DJayjesse
* https://twitter.com/bl_s21
* https://twitter.com/yumesan_yume
* https://twitter.com/MegamanUMX