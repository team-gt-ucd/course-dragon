# course-dragon

CourseDragon is a MERN REST app. To start it, it is broken into 3 Parts:

- Frontend (React)
- Backend (Node/Express)
- Database (Mongo)

Starting the Frontend (React):
----

`cd root/frontend`

`npm install`

`npm start`

_**Connect to the Website on https://localhost:3000**_

Starting the Backend (Node/Express): 
----

`cd root/backend`

`node .`

_**Make sure that it's working:**_ `curl localhost:27017`
_**If result looks like this then it is working:**_ 

```
(base) username@your-computer ~ % curl localhost:4001
employee backende erisildi%
```

Starting the Database (Mongo):
----

### Local setup

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


#### Using Docker

`Docker run -p 27017:27017 mongo:latest`

### Production/Staging

Not implemented yet
