import { MigrationConfig } from "drizzle-orm/migrator";

process.loadEnvFile();

type DBConfig = {
    dbURL: string;
    migrationConfig: MigrationConfig;
};
type APIConfig = {
    fileserverHits: number;
    platform: string;
};
const migrationConfig: MigrationConfig = {
    migrationsFolder: "src/db/generated",
}
export const config: APIConfig & { db: DBConfig } = {
    fileserverHits: 0,
    platform: process.env.PLATFORM || "dev",
    db: {
        migrationConfig: migrationConfig,
        dbURL: process.env.DB_URL || "",
    }
};
