import http from 'http';

export class ApplicationError extends Error {
    public statusCode: number;
    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.name = "ApplicationError";
        this.statusCode = statusCode;
    }
}

export class InvalidUserIdError extends ApplicationError {
    constructor() {
        super("Provided user id is invalid. Please make sure you're using correct id.", 400);
    }
}

export class UserNotFoundError extends ApplicationError {
    constructor() {
        super("User you're looking for is not found in the database. Please consider adding it to the database first.", 404);
    }
}

export class InvalidUserDataError extends ApplicationError {
    constructor() {
        super("The user data you provided does not match the intended form. Please review the properties of user and try again.", 400);
    }
}

export const serverError = new ApplicationError("An unexpected error occurred.", 500);

export const getErrorHandler = (error: ApplicationError) => (res: http.ServerResponse) => {
    res.writeHead(error.statusCode);
    res.write(error.message);
    res.end();
}