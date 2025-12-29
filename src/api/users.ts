import type { Request, Response } from "express";

import { createUser, updateUser } from "../db/queries/users.js";
import { BadRequestError } from "./errors.js";
import { respondWithJSON } from "./json.js";
import { NewUser } from "src/db/schema.js";
import { getBearerToken, hashPassword, validateJWT } from "../auth.js";
import { config } from "../config.js";

export type UserResponse = Omit<NewUser, "hashedPassword">;

export async function handlerUsersCreate(req: Request, res: Response) {
    type parameters = {
        email: string;
        password: string;
    };
    const params: parameters = req.body;

    if (!params.password || !params.email) {
        throw new BadRequestError("Missing required fields");
    }

    const hashedPassword = await hashPassword(params.password);

    const user = await createUser({
        email: params.email,
        hashedPassword,
    } satisfies NewUser);

    if (!user) {
        throw new Error("Could not create user");
    }

    respondWithJSON(res, 201, {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    } satisfies UserResponse);
}

export async function handlerUpdateUser(req: Request, res: Response) {
    let userId: string;
    try {
        const token = getBearerToken(req);
        userId = validateJWT(token, config.jwt.secret);
    } catch (e) {
        res.status(401).json({ error: "Unauthorized" });;
        return;
    }

    type parameters = {
        email?: string;
        password?: string;
    };
    const params: parameters = req.body;

    const updateData: Partial<NewUser> = {};

    if (params.email) {
        updateData.email = params.email;
    }

    if (params.password) {
        updateData.hashedPassword = await hashPassword(params.password);
    }

    const updatedUser = await updateUser(userId, updateData);

    if (!updatedUser) {
        throw new Error("Could not update user");
    }

    respondWithJSON(res, 200, {
        id: updatedUser.id,
        email: updatedUser.email,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
    } satisfies UserResponse);
}