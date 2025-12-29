import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { users } from "../schema.js";
export async function createUser(user) {
    const [result] = await db
        .insert(users)
        .values(user)
        .onConflictDoNothing()
        .returning();
    return result;
}
export async function reset() {
    await db.delete(users);
}
export async function getUserByEmail(email) {
    const [result] = await db.select().from(users).where(eq(users.email, email));
    return result;
}
export async function updateUser(userId, updateData) {
    const [result] = await db
        .update(users)
        .set(updateData)
        .where(eq(users.id, userId))
        .returning();
    return result;
}
