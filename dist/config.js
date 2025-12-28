process.loadEnvFile();
const migrationConfig = {
    migrationsFolder: "src/db/migrations",
};
export const config = {
    fileserverHits: 0,
    db: {
        migrationConfig: migrationConfig,
        dbURL: process.env.DB_URL || "",
    }
};
