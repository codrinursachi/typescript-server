import { Request, Response } from 'express';
import { createUser } from './db/queries/users.js';
import { hashPassword } from './auth.js';
export async function handlerUserCreation(req: Request, res: Response) {
    const user = req.body;
    user.hashedPassword = await hashPassword(user.password);
    delete user.password;
    const response = await createUser(user);
    const { hashedPassword, ...safeResponse } = response;
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(JSON.stringify(safeResponse));
}