import { config } from "./config.js";
export function handlerResetCounter(req, res) {
    config.fileserverHits = 0;
    res.send();
}
