# Express JWT REST API Demo

This is a simple TypeScript Node.js application to show demonstration of JWT Authentication in REST API.

In the code I use Express.js framework, passport-local, and passport-jwt modules for the demonstration.

To make things simple, there is no database involved at all.

The `/todos` API endpoints are the protected endpoints which require authentication with JWT token to be passed in the request header.

To acquire the JWT token, calls the `POST /auth/login` API endpoint with the supplied user id ("admin") and password ("123456"). The JWT token will be returned in the response. e.g. `{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzY1NDQyMTgsImlkIjoiYWRtaW4ifQ.vt_7g7Cg_epngB1ZCnuuWl41bExunNOJXI8fT5mKO7U"}`

After that, you would pass the token in the `Authorization` header, e.g. `'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzY1NDQyMTgsImlkIjoiYWRtaW4ifQ.vt_7g7Cg_epngB1ZCnuuWl41bExunNOJXI8fT5mKO7U'`

For more details, check the **How to use the app** section below. And check the source code files to see how the authentication is implemented.

## Requirements

 * Node.js

## How to install dependencies

	$ cd express-jwt-rest-api-demo
	$ npm install

## How to build and run the app

	$ npm run build
	$ npm run start

The app should run by listening on localhost:3000.

## How to use the app

1) By using curl command, try to call the `GET /todos` API first without JWT token:

    ```
    $ curl -XGET 'http://localhost:3000/todos'
    ```

    It should return empty response with status 401 (Unauthorized).

2) Next, call the `POST /auth/login` API to acquire the token:

    ```
    $ curl -XPOST 'http://localhost:3000/auth/login' \
    --header 'Content-Type: application/json' \
    --data '{
        "userId": "admin",
        "password": "123456"
    }'
    ```

    It should return the token in the response, e.g.

    `{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzY1NDQyMTgsImlkIjoiYWRtaW4ifQ.vt_7g7Cg_epngB1ZCnuuWl41bExunNOJXI8fT5mKO7U"}`

    Note that the token is set to expire in 10 minutes. Check the `AuthController.login` code to see how the expiry is set.

3) Pass the token to the `GET /todos` API call:

    ```
    $ curl -XGET 'http://localhost:3000/todos' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzY1NDQyMTgsImlkIjoiYWRtaW4ifQ.vt_7g7Cg_epngB1ZCnuuWl41bExunNOJXI8fT5mKO7U'
    ```

    It should return response:

    `[{"id":"1","todo":"Todo 1"},{"id":"2","todo":"Todo 2"},{"id":"3","todo":"Todo 3"}]`

    If you call the API after the token had expired, you should receive response with status 401 (Unauthorized).
