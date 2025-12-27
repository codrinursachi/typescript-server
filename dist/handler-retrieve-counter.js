import { config } from "./config.js";
export function handlerRetrieveCounter(req, res) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(`Hits: ${config.fileserverHits}`);
}
