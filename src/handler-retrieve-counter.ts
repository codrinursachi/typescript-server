import { Request, Response } from "express";
import { config } from "./config.js";

export function handlerRetrieveCounter(req: Request, res: Response) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(`Hits: ${config.fileserverHits}`);
}
