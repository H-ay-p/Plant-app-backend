// const { Pool } = require("pg");
// const ENV = process.env.NODE_ENV || "development";

// require("dotenv").config({
//   path: `${__dirname}/../.env.${ENV}`,
// });

// console.log(`Loading env from: ${__dirname}/../.env.${ENV}`);
// console.log("PGDATABASE:", process.env.PGDATABASE);
// console.log("DATABASE_URL:", process.env.DATABASE_URL);

// if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
//   throw new Error("PGDATABASE or DATABASE_URL not set");
// }

// const config = {};

// if (ENV === "production") {
//   config.connectionString = process.env.DATABASE_URL;
//   config.max = 2;
// }

// module.exports = new Pool(config);

const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

// Debugging logs (keep these temporarily)
console.log("Using DATABASE_URL:", process.env.DATABASE_URL);

const config =
  ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // Required for Supabase
        max: 2,
      }
    : {};

module.exports = new Pool(config);
