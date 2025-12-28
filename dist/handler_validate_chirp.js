export function handerValidateChirp(req, res) {
    let body = "";
    res.header("Content-Type", "application/json");
    req.on("data", (chunk) => {
        body += chunk;
    });
    req.on("end", () => {
        try {
            const chirp = JSON.parse(body);
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
        catch (e) {
            res.status(400).send(JSON.stringify({
                "error": "Something went wrong"
            }));
            return;
        }
    });
}
