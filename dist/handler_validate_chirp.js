export function handerValidateChirp(req, res) {
    let body = "";
    res.header("Content-Type", "application/json");
    const chirp = req.body;
    if (chirp.body.length > 140) {
        throw new Error();
    }
    const clean = chirp.body.split(" ").map((word) => {
        if (["kerfuffle", "sharbert", "fornax"].includes(word.toLowerCase())) {
            return "****";
        }
        return word;
    }).join(" ");
    res.status(200).send(JSON.stringify({
        "cleanedBody": clean
    }));
}
