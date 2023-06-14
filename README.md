![](./tornado-frontend/media/logo-small.png)

Concept board software for ambitious creatives 🎨

## Features:

* SPA (Single Page App)
* Multiple Users
* Email + password authentication

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

## Author

Dylan Vorster