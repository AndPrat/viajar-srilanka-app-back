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
:green_circle: Success message: "El lugar se ha borrado con éxito"
:red_circle: Error message "No se ha podido borrar el lugar"

GET / placeId endpoint
:red_circle: Error message "No se ha podido obtener el lugar"

DELETE endpoint
:green_circle: Success message: "El lugar se ha borrado con éxito"
:red_circle: Error message "No se ha podido borrar el lugar"

POST endpoint
:green_circle: Success message: "El lugar se ha añadido con éxito"
:red_circle: Error message "No se ha podido añadir el lugar"

PATCH / endpoint
:red_circle: Error message "No se ha podido añadir a favoritos"

## Errors feedback messages

Error generalError
:red_circle: Error message "Internal server error"

Error endpointNotFound
:red_circle: Error message "Endpoint not found"
