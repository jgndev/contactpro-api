module.exports = {
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": 5432,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "synchronize": true,
    "logging": true,
    "entities": [
        "src/models/**/*.ts"
    ],
    "migrations": [
        "src/migrations/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/models",
        "migrationsDir": "src/migrations",
        "subscribersDir": "src/subscriber"
    }
};
