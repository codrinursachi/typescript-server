import { MigrationConfig } from "drizzle-orm/migrator";

process.loadEnvFile();

type DBConfig = {
    dbURL: string;
    migrationConfig: MigrationConfig;
};
type APIConfig = {
    fileserverHits: number;
};
const migrationConfig: MigrationConfig = {
    migrationsFolder: "src/db/migrations",
}
export const config: APIConfig & { db: DBConfig } = {
    fileserverHits: 0,
    db: {
        migrationConfig: migrationConfig,
        dbURL: process.env.DB_URL || "",
    }
};
