# Viajar a Sri Lanka - Backend

## Description

'Viajar a Sri Lanka' is an application where community members can read, add, delete and update Sri Lanka places.

## Endpoints

- GET endpoint: Retreives the list of places from the database

- GET / placeId endpoint: Retreive the detail of the place from the database

- DELETE endpoint: Removes the place from the data base

- POST endpoint: Create a new place to the database

- PATCH endpoint: Modify the state place to the database

## Endpoint feedback messages

GET endpoint

- :green_circle: Success message: `El lugar se ha borrado con éxito`
- :red_circle: Error message `No se ha podido borrar el lugar`

GET / placeId endpoint

- :red_circle: Error message `No se ha podido obtener el lugar`

DELETE endpoint

- :green_circle: Success message: `El lugar se ha borrado con éxito`
- :red_circle: Error message `No se ha podido borrar el lugar`

POST endpoint

- :green_circle: Success message: `El lugar se ha añadido con éxito`
- :red_circle: Error message `No se ha podido añadir el lugar`

PATCH / endpoint

- :red_circle: Error message `No se ha podido añadir a favoritos`

## Errors feedback messages

Error generalError

- :red_circle: Error message `Internal server error`

Error endpointNotFound

- :red_circle: Error message `Endpoint not found`

## Authentication

To access the API, users will need to register with Github.

1. Firebase Authentication
2. Authentication Token (GitHub Account)
3. Including the Token / Token verification

## Stacks

- MongoDB
- Express.js
- Node.js
- Jest
- Supertest
- Sonar

## Testing

In this API has been tested with Jest for unit testing and Supertest for integration endpoint testing.
The Sonar metrics:

![Drocer Back coverage](https://lllfmcmqtrzaksmbsdim.supabase.co/storage/v1/object/sign/sri%20lanka/SonarCloud-back.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzcmkgbGFua2EvU29uYXJDbG91ZC1iYWNrLnBuZyIsImlhdCI6MTY5NjMyNjgxMywiZXhwIjoxNzI3ODYyODEzfQ.edtrWmxnx03eRAxgHjxt2hue1xwXYR3EbTOlkNWB_q0&t=2023-10-03T09%3A53%3A33.900Z)
![Drocer Back coverage](https://lllfmcmqtrzaksmbsdim.supabase.co/storage/v1/object/sign/sri%20lanka/SonarCloud-back-coverage.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzcmkgbGFua2EvU29uYXJDbG91ZC1iYWNrLWNvdmVyYWdlLnBuZyIsImlhdCI6MTY5NjMyNjgyNCwiZXhwIjoxNzI3ODYyODI0fQ.eLhXg2_mLx-RUmiNHxsAIGpvNk3Oq2ET_3bE9gAoOvU&t=2023-10-03T09%3A53%3A44.054Z)
