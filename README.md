# Node.js project from the Complete Web Development Bootcamp

This project follows material from [the Complete Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp). There are some variations compared to the course instructions since some of the code did not work in the newer MongoDB version.

## Common Usage
The app allows to:
- add new item to already existing list on the homepage
- visit about page, which is populated with Lorem Ipsum text
- create custom pages with new list and populate it
- delete already existing or new items from list

---
## Requirements
- Node 16
- Git
- Heroku CLI
- MongoDB Shell
---
## Common setup
Clone the repo and install the dependencies.
``` 
git clone https://github.com/ana-gujabidze/nodejs_project.git
cd nodejs_project
```
``` 
npm install
```
The app is connected to MongoDB Atlas so in order to run this app first connect to database. After connecting to database, create `.env` file similar to `.env_sample` file and specify all environmental variables.

---

## Deploy to Heroku

The app can be deployed to Heroku, there is Procfile already prepared. Follow instruction from [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs) to successfully deploy the app.

---

## Run locally

In the CLI run the following command to connect to MongoDB
```
mongo "mongodb+srv://cluster0.o69nrpg.mongodb.net/myFirstDatabase" --username <username>
```
In another window of the CLI run the command 
```
nodemon app.js
```
Open the browser and follow the link 
```
http://localhost:3000/
```
