# About course-dragon

CourseDragon is a MERN REST app. To start it, it is broken into 3 Parts:

- Frontend (React)
- Backend (Node/Express)
- Database (Mongo)

# Setup (before running)

To setup, you must install node_modules by doing the following:

```
cd root/backend
npm install
```
```
cd root/frontend
npm install
```

# How to run

There are 2 methods to running the application:

1. Docker start
2. Manual start

## -Docker start-

| Preconditions | |
:---|:---
| 1. [Docker Desktop](https://www.docker.com/products/docker-desktop/) is installed and is running | |

* For Docker start, run the following commands _(this is the `docker-compose` method)_:

```
$ cd root
$ docker-compose up --build
```

To test that it has started correctly, you can do the following:

| Client | Server | Database |
:---|:---|:---
| - Connect to http://localhost:3000/Senior-Design-Capstone | Run the command `curl localhost:4001` | Run the command `curl localhost:27017` |
| This should connect to the frontend webpage for Course Dragon | This should respond back with the message "home get greeting" | This should respond back with the message "It looks like you are trying to access MongoDB over HTTP on the native driver port." |

### Alternate Docker start method:

* For Docker start, run the following commands _(this is the `docker run` method)_:

* List all docker images 

```
docker image ls
```

* Docker build each of the images (frontend-image and backend-image)(mongo image does not need to be created, as it is a standard image)

```
cd root/frontend
docker build -t course-dragon-frontend-image .
```
```
cd root/backend
docker build -t course-dragon-backend-image .
```

* Docker run

```
docker run --name course-dragon-backend-app -d -p 4001:4001 -v $(pwd):/server course-dragon-backend-image
```
```
docker run --name db -d -p 27017:27017 mongo
```
```
docker run --name course-dragon-frontend-app -d -p 3000:3000 -v $(pwd)/public:/client/public -v $(pwd)/src:/client/src -v $(pwd)/deploy.sh:/client/deploy.sh -v $(pwd)/index.html:/client/index.html -v $(pwd)/react.vite.config.js:/client/react.vite.config.js -v $(pwd)/vite.config.js:/client/vite.config.js -dit course-dragon-frontend-image
```

* See all running docker containers

```
docker ps -a
```

* Send commands to docker container (in bash) 

```
docker exec -it course-dragon-backend-app bash
```
```
docker exec -it course-dragon-frontend-app bash
```

* Close the docker container

```
docker rm course-dragon-backend-app -f
```
```
docker rm course-dragon-frontend-app -f
```
```
docker rm mongo-db -f
```

## -Manual start-

Starting the Frontend (React):
----

`cd root/frontend`

`npm install`

`npm start`

_**Connect to the Website on https://localhost:3000**_

Starting the Backend (Node/Express): 
----

`cd root/backend`

`npm install`

`npm start`

_**Make sure that it's working:**_ `curl localhost:4001`
_**If result looks like this then it is working:**_ 

```
(base) username@your-computer ~ % curl localhost:4001
home get greeting%
```

Starting the Database (Mongo):
----

Install MongoDB

Create a directory `/data/db`

Run MongoDB using this command

`mongod --port 27017 --dbpath /Users/sebastianbarry/data/db`

_**Make sure that it's working:**_ `curl localhost:27017`
_**If result looks like this then it is working:**_ 

```
(base) username@your-computer ~ % curl localhost:27017
It looks like you are trying to access MongoDB over HTTP on the native driver port.
```
