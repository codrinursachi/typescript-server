import { Request, Response } from "express";
import { getAllChirps } from "./db/queries/chirps.js";
export async function handlerRetrieveChirps(req: Request, res: Response) {
    const chirps = await getAllChirps();
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(chirps));
}