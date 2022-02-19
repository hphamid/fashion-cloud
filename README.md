
## Installation

- First you should install node_modules
- you can use the command bellow to install dependencies
```sh
yarn install
```
- you can use the command bellow to run tests
```sh
yarn test
```
- You can start the project locally with mongodb installed or use it with docker compose.
### Start locally
- use the command bellow to build and start the project
```sh
yarn start
```

### Docker compose
You can run the project with docker compose without mongodb installation
use the command bellow to build project
```sh
yarn build
```
after that there should be a 'build' folder in the project root.

now you can run the project using docker-compose.
- run the command bellow

```sh
docker-compose up -d
``` 
this builds a container for our app, a container for mongo in docker and connects them together ( you don't need to install mongo on your device)
if you changed anything and you wanted the docker-compose to build the app again you should use this command:

```sh
docker-compose up -d --force-recreate 
``` 

## How To Test

The project will be up after some seconds on port 8080.
you can use http://localhost:3000/api-docs to check the apis and test them.


## Features

- node.js 16 and express.js
- swagger to serve api docs
- embedded mongo to running tests
- prometheus to export metrics
- Mongoose to connect to db
- Reads app configurations from env variables
- MongoDB for main datastore 



