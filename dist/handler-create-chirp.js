import { createChirp } from './db/queries/chirps.js';
import { BadRequestError } from './error-classes.js';
export async function handlerCreateChirp(req, res) {
    const chirp = req.body;
    if (chirp.body.length > 140) {
        throw new BadRequestError("Chirp is too long. Max length is 140");
    }
    const clean = chirp.body.split(" ").map((word) => {
        if (["kerfuffle", "sharbert", "fornax"].includes(word.toLowerCase())) {
            return "****";
        }
        return word;
    }).join(" ");
    chirp.body = clean;
    const dbResult = await createChirp(chirp);
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(JSON.stringify(dbResult));
}
