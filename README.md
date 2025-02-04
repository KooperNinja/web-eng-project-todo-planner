# Web Engineering Project

## Requirements
- [Docker](https://www.docker.com) (you can also use open source alternatives that can pull images and work with docker compose, e.g. [Rancher](https://rancherdesktop.io))
- packagemanager for development ([npm](https://nodejs.org/en/download) / [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) / [deno](https://deno.com) / [bun](https://bun.sh/docs/installation) ...)

## Setup

### 1. `.env` File

Copy the `.env.example` and rename it to `.env`. This file should be ignored by git by default. \
Change the password variable to your liking you may leave the rest. \
```
POSTGRES_PASSWORD=yoursecurepassword
```
**Only change something if you know what you are doing!**

### 2. Initial starting of the dev containers

In the root of the project run `docker compose up --build`. \
All services should start accordingly. \
- The Node Backend will start in development mode by default and refreshes on file change. 
- The Frontend is served by nginx and also refreshes on file change, at the moment you still have to refresh your browser to see the changes.


### 3. Setup for development

Now install the backages in the `backend/` folder with the packagemanager of your liking. I recommend [Deno](https://deno.com) but that's up to you. 

### 4. You're all set for development

- `backend/` - Express Server on Port 3001 with prisma to interact with the postgres db.
- `frontend/`- Vanilla JS served on Port 8080 by nginx.


