import { db } from "../index.js";
import { eq } from "drizzle-orm";
import { NewChirp, chirps } from "../schema.js";
import { UUID } from "crypto";

export async function createChirp(chirp: NewChirp) {
    const [result] = await db
        .insert(chirps)
        .values(chirp)
        .onConflictDoNothing()
        .returning();
    return result;
}

export async function getAllChirps() {
    return await db.select().from(chirps).orderBy(chirps.createdAt);
}

export async function getChirpById(id: string) {
    const [result] = await db
        .select()
        .from(chirps)
        .where(eq(chirps.id, id));
    return result;
}