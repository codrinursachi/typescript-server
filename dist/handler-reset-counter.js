import { config } from "./config.js";
import { deleteAllUsers } from "./db/queries/users.js";
export function handlerResetCounter(req, res) {
    config.fileserverHits = 0;
    if (config.platform !== "dev") {
        res.status(403).send();
        return;
    }
    deleteAllUsers();
    res.send();
}
