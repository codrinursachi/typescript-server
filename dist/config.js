process.loadEnvFile();
const migrationConfig = {
    migrationsFolder: "src/db/generated",
};
export const config = {
    fileserverHits: 0,
    platform: process.env.PLATFORM || "dev",
    db: {
        migrationConfig: migrationConfig,
        dbURL: process.env.DB_URL || "",
    }
};
