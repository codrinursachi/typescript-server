export function middlewareLogResponses(req, res, next) {
    res.on("finish", () => {
        if (res.statusCode > 299) {
            console.log(`[NON-OK] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
        }
    });
    next();
}
