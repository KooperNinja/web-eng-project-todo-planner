# Web Engineering Project
A small Todo Planner project.

## Requirements
- [Docker](https://www.docker.com) (you can also use open source alternatives that can pull images and work with docker compose, e.g. [Rancher](https://rancherdesktop.io))
- packagemanager for development ([npm](https://nodejs.org/en/download) / [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) / [deno](https://deno.com) / [bun](https://bun.sh/docs/installation) ...)

### Recommended Vs Code Extensions 
- [Lit-plugin](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin) for a clean component syntax highlighting.
- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) for `.prisma` files


## Setup

### 1. `.env` File

Copy the `.env.example` and rename it to `.env`. This file should be ignored by git by default. \
Change the password variable to your liking
```
POSTGRES_PASSWORD=yoursecurepassword
```
Same goes for your JWT_SECRET. You should generate this with a [Generator](https://jwtsecret.com/generate).
```
JWT_SECRET=your_secret_that_you_should_generate
```
**Only change something else if you know what you are doing!**

### 2. Initial starting of the dev containers
At first navigate to `/frontend` and run the `build` script. \
This will bundle the fronted in order for nginx to serve it later. 

In the root of the project run `docker compose up --build`. \
All services should start accordingly. 
- The Node Backend will start in development mode by default and refreshes on file change. 
- The Frontend is served by nginx. NOTE: your file changes will only be replicated once you build and restart the service again. For development purposes use the method described in [3.2](#32-frontend)

### 3. Setup for development

#### 3.1 Backend
Now install the packages in the `backend/` folder with the package-manager of your liking. I recommend [Deno](https://deno.com) but that's up to you. 

##### 3.1.1 API Testing
Inside `backend/bruno-api-test` you can find the api tests for the backend. Simply open the folder as collection with [Bruno](https://www.usebruno.com/) and change/add your own tests.

##### 3.1.2 Update Database Changes
Inside the `backend/` directory run the `attach` script, e.g. `cd backend/` and `deno task attach` this will attach you to the shell of the running backend service. \ 
Now run `yarn run db:migrate` to update your local database to confirm to the prisma schema.

#### 3.2 Frontend
Install the packages in the `frontend/` folder. For development use the local development script `dev` with e.g. `deno task dev` and your Vite Testserver will start. \
Once ready for production run the `build` script. This will bundle the files and makes it available for the nginx Webserver service.

### 4. You're all set for development

- `backend/` - Express Server on Port [3001](http://localhost:3001) with prisma to interact with the postgres db.
- `frontend/`- Vanilla JS served on Port [8080](http://localhost:8080) by nginx (production build) or on Port [5173](http://localhost:5173) by [Vite](https://vite.dev) (dev build).


