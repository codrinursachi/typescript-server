import { Request, Response, NextFunction } from "express";
import {
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
} from "./error-classes.js";

export function middlewareErrorHandling(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(err.message);
    const status = getStatusCode(err);
    if (status === 500) {
        console.error("500 - Internal Server Errors");
        return;
    }
    res.status(status).send({
        error: err.message,
    });
}

function getStatusCode(err: Error) {
    if (err instanceof BadRequestError) {
        return 400;
    }
    if (err instanceof UnauthorizedError) {
        return 401;
    }
    if (err instanceof ForbiddenError) {
        return 403;
    }
    if (err instanceof NotFoundError) {
        return 404;
    }
    return 500;
}
