export function handerValidateChirp(req, res) {
    let body = "";
    res.header("Content-Type", "application/json");
    const chirp = req.body;
    if (chirp.body.length > 140) {
        res.status(400).send(JSON.stringify({
            "error": "Chirp is too long"
        }));
        return;
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
