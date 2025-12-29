import { getUserByEmail } from './db/queries/users.js';
import { checkPasswordHash, makeJWT } from './auth.js';
import { config } from './config.js';
export async function handlerLogin(req, res) {
    const { email, password, expiresInSeconds } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
        res.status(401).send("Incorrect email or password");
        return;
    }
    if (!(await checkPasswordHash(password, user.hashedPassword))) {
        res.status(401).send("Incorrect email or password");
        return;
    }
    const jwt = makeJWT(user.id, expiresInSeconds > 3600 * 1000 ? 3600 * 1000 : expiresInSeconds, config.secret);
    const { hashedPassword, ...safeUser } = user;
    const responseUser = { ...safeUser, token: jwt };
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(responseUser));
}
