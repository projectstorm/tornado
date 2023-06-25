## Tornado (WIP)

[![Build](https://github.com/projectstorm/tornado/actions/workflows/test.yml/badge.svg)](https://github.com/projectstorm/tornado/actions/workflows/test.yml)
[![Docker](https://img.shields.io/docker/pulls/projectstorm/tornado.svg)](https://hub.docker.com/repository/docker/projectstorm/tornado)

Concept image-board software for ambitious creatives 🎨

## What

Tornado is self-hosted software for the web (currently in development) that provides digital media artists with the ability to create concept and reference boards.
You can simply drag in images, or paste images you have copied in your clipboard, and then arrange them as you see fit.


## Features:

* SPA (Single Page App)
* Multiple Users
* Email + password authentication
* Image resizing on the server

![](./images/screenshot.png)
![](./images/screenshot2.png)


## Requirements

* MySQL / MariaDB database
* Node 18+

## Development environment

1. copy `.env.template` -> `.env` and replace the variables with your own.
2. Run ```pnpm build``` to run the initial typescript build.
3. Run ```pnpm watch``` to start everything in watch mode, including the server and backing docker-compose services.

## Configuration

Tornado is configured using environment variables.

| name               | default | desc                                                                                           |
|--------------------|---------|------------------------------------------------------------------------------------------------|
| SITE_URL           |         | example: https://tornado.example.com                                                           |
| PORT               | 8080    | Port to start the server on                                                                    |
| DATABASE_URL       |         | mysql://{user}:{pass}@{host}:{port}/{db}                                                       |
| ADMIN_USER_EMAIL   |         | Email address of the admin user (for login)                                                    |
| ADMIN_USER_PASS    |         | Password of the admin user (this can be removed after the admin user is created on first boot) |
| CONTENT_DIRECTORY  |         | The main directory where all content is uploaded, Tornado will created the child directories   |

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

## About

Author: Dylan Vorster (dylanvorster.com)

