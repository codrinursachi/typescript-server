import { createUser } from './db/queries/users.js';
export async function handlerUserCreation(req, res) {
    const user = req.body;
    const response = await createUser(user);
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(JSON.stringify(response));
}
