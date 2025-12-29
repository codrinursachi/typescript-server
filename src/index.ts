import express from "express";
import { handlerReadiness } from "./handler-readiness.js";
import { middlewareLogResponses } from "./middleware-log-responses.js";
import { middlewareMetricsInc } from "./middleware-metrics-inc.js";
import { handlerRetrieveCounter } from "./handler-retrieve-counter.js";
import { handlerResetCounter } from "./handler-reset-counter.js";
import { middlewareErrorHandling } from "./middleware-error-handling.js";
import { handlerUserCreation } from "./handler-user-creation.js";
import { handlerCreateChirp } from "./handler-create-chirp.js";
import { handlerRetrieveChirps } from "./handler-retrieve-chirps.js";
import { handlerRetrieveChirp } from "./handler-retrieve-chirp.js";
import { handlerLogin } from "./handler-login.js";

const app = express();
const PORT = 8080;
app.use(middlewareLogResponses);
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.post("/api/users", express.json(), handlerUserCreation);
app.post("/api/login", express.json(), handlerLogin);
app.post("/api/chirps", express.json(), handlerCreateChirp, middlewareErrorHandling);

app.get("/api/chirps", handlerRetrieveChirps);
app.get("/api/chirps/:id", handlerRetrieveChirp);
app.get("/api/healthz", handlerReadiness);
app.get("/admin/metrics", handlerRetrieveCounter);
app.post("/admin/reset", handlerResetCounter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
