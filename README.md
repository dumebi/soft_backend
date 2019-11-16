# Softcom Developer Application Test

## Live Postman Docs 
https://documenter.getpostman.com/view/788782/S1TYVG5V

## Backend 
https://backend-softcom.herokuapp.com/v1/

## BUILD 
To run locally, type `docker-compose up --build`

To run tests, open a new console with the app running. type `./soft-test.sh`


# Assessment
Implement a simple clone of “**Stackoverflow**”. Features to be focused on are: 

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
