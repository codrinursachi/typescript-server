import { config } from "./config.js";
import { NextFunction, Request, Response } from "express";

export function middlewareMetricsInc(
    req: Request,
    res: Response,
    next: NextFunction
) {
    config.fileserverHits += 1;
    next();
}
