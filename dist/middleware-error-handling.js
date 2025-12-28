export function middlewareErrorHandling(err, req, res, next) {
    console.log(err.message);
    res.status(500).send({
        "error": "Something went wrong on our end"
    });
}
