import { getUserByEmail } from './db/queries/users.js';
import { checkPasswordHash } from './auth.js';
export async function handlerLogin(req, res) {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
        res.status(401).send("Incorrect email or password");
        return;
    }
    if (!(await checkPasswordHash(password, user.hashedPassword))) {
        res.status(401).send("Incorrect email or password");
        return;
    }
    const { hashedPassword, ...safeUser } = user;
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(safeUser));
}
