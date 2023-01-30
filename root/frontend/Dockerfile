# Sets the base image of the application to the node’s official image.
FROM node:16-alpine

# Sets the Working Directory as "/client"
WORKDIR /client
# Copies the package.json file into "/client" and runs npm install
COPY package.json /client
RUN npm install
# Creates a volume from your host machine to "/client"
VOLUME /client

# Specifies the port the app will be running on
EXPOSE 3000

# Runs "npm start" after the above step is completed
CMD ["npm", "start"]