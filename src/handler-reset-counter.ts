import { Request, Response } from "express";
import { config } from "./config.js";

export function handlerResetCounter(req: Request, res: Response) {
    config.fileserverHits = 0;
    res.send();
}
