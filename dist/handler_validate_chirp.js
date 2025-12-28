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
    res.status(200).send(JSON.stringify({
        "valid": true
    }));
}
