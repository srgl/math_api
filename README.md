# Math API
API server built with flow, babel, ajv, express and docker

## Routes
`GET /div?a=1&b=2`
`{"result": 0.5}`

`POST /sqrt {"data": [1, 4, 9]}`
`{"result": [1, 2, 3]}`

## Run dev environment
`npm i`
`docker-compose up --build`
`curl localhost:3000/div?a=1\&b=2`
Database GUI listens on `localhost:8080`

## Run tests
`docker-compose -f docker-compose.test.yml up --build`

## Run production environment
`docker-compose -f docker-compose.prod.yml up --build`
