import express from "express";
import { handlerReadiness } from "./handler-readiness.js";
import { middlewareLogResponses } from "./middleware-log-responses.js";
import { middlewareMetricsInc } from "./middleware-metrics-inc.js";
import { handlerRetrieveCounter } from "./handler-retrieve-counter.js";
import { handlerResetCounter } from "./handler-reset-counter.js";
import { handerValidateChirp } from "./handler_validate_chirp.js";
const app = express();
const PORT = 8080;
app.use(middlewareLogResponses);
app.use("/app", middlewareMetricsInc, express.static("./src/app"));
app.post("/api/validate_chirp", express.json(), handerValidateChirp);
app.get("/api/healthz", handlerReadiness);
app.get("/admin/metrics", handlerRetrieveCounter);
app.post("/admin/reset", handlerResetCounter);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
