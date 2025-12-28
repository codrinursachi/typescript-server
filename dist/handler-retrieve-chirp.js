import { getChirpById } from "./db/queries/chirps.js";
export async function handlerRetrieveChirp(req, res) {
    const id = req.params.id;
    const chirp = await getChirpById(id);
    if (!chirp) {
        res.status(404).send();
        return;
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(chirp));
}
