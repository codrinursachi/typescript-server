import { Request, Response } from "express";
import { getChirpById } from "./db/queries/chirps.js";
export async function handlerRetrieveChirp(req: Request, res: Response) {
    const id = req.params.id;
    const chirp = await getChirpById(id);
    if (!chirp) {
        res.status(404).send();
        return;
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(chirp));
}