# Sets the base image of the application to the node’s official image.
FROM node:17

# Sets the Working Directory as "/server"
WORKDIR /server
# Copies the package.json file into "/server" and runs npm install
COPY . /server
RUN npm install
# Creates a volume from your host machine to "/server"
# VOLUME /server

# Specifies the port the app will be running on
EXPOSE 4001

# Runs "npm start" after the above step is completed
CMD ["npm", "start"]