import { Request, Response, NextFunction } from "express";
export function middlewareErrorHandling(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(err.message);
    res.status(500).send({
        "error": "Something went wrong on our end"
    });
}
