import { createChirp } from './db/queries/chirps.js';
import { BadRequestError } from './error-classes.js';
import { getBearerToken, validateJWT } from './auth.js';
import { config } from './config.js';
export async function handlerCreateChirp(req, res) {
    const chirp = req.body;
    const jwt = getBearerToken(req);
    const isValidJWT = validateJWT(jwt, config.secret);
    if (!isValidJWT || typeof isValidJWT !== "string") {
        throw new BadRequestError("Invalid JWT token");
    }
    chirp.userID = isValidJWT;
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
