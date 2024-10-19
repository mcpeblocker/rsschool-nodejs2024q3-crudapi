# Simple CRUD API

## Installation
After cloning the repository and switching into the needed branch, execute the following command on your terminal to install needed dependencies:
```sh
npm install
```

## Running
### Environment variables
Refer to .env.template to see what environment variables are required. You can copy it with filename .env and modify its contents to your needs - .env is ignored by git, so your credentials do not leak unless you specifically want them to.
### Starting
Application can be started in two modes by executing corresponding commands on your terminal:
1. **Development**
```sh
npm run start:dev
```
2. **Production**
```sh
npm run start:prod
```
You should see a log message indicating which port your application is running after executing one of the commands above

## Usage
*You can use the api directly through your browser or any kind of HTTP client (including Postman, Insomnia or features which can be used JavaScript runtime - e.g. axios, fetch)*
The API consists of the following endpoints:
    - **GET** `api/users` is used to get all persons
        - Server should answer with `status code` **200** and all users records
    - **GET** `api/users/{userId}` 
        - Server should answer with `status code` **200** and record with `id === userId` if it exists
        - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **POST** `api/users` is used to create record about new user and store it in database
        - Server should answer with `status code` **201** and newly created record
        - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    - **PUT** `api/users/{userId}` is used to update existing user
        - Server should answer with` status code` **200** and updated record
        - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **DELETE** `api/users/{userId}` is used to delete existing user from database
        - Server should answer with `status code` **204** if the record is found and deleted
        - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

The `User` type represents objects with the properties as below:
    - `id` — unique identifier (`string`, `uuid`) generated on server side
    - `username` — user's name (`string`, **required**)
    - `age` — user's age (`number`, **required**)
    - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)