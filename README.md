# Software Developer Application Test

## Live Postman Docs 
https://documenter.getpostman.com/view/788782/S1TYVG5V?version=latest#a65440cc-56bd-4142-b837-69628b587a52

## Backend 
https://vast-reef-55707.herokuapp.com/v1/

## BUILD 
To run locally, type `docker-compose up --build`
To run tests, open a new console with the app running. type `./soft-test.sh`


Implement a simple clone of “**Stackoverflow**”. Features to be focused on are: 

# User Roles

- **User** can
  - signup/login
  - Questions
    - Ask
    - Answer
    - View
    - Upvote
    - Delete (posted questions)
    - Subscribe
    - robustly search questions/answers/users

# Authentication

Auth for user actions are done using bearer token

# Tools/Stack

NodeJs, Redis, RabbitMQ, Mongodb
