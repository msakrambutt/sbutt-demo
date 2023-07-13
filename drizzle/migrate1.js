// import { migrate } from "drizzle-orm/node-postgres/migrator";
// import { db } from "./db"
const { migrate } = require("drizzle-orm/node-postgres/migrator");
// const { db } = require("./db");
const { drizzle } = require("drizzle-orm/vercel-postgres");
const { sql } = require("@vercel/postgres");
const { Pool } = require("pg");

require("dotenv").config();

console.log("process.env.POSTGRES_URL : " + process.env.POSTGRES_URL);

//Need to add hardcoded connectionString to run the Migrations! If you want to run the migrations using npm run mgrate:pg
const pool = new Pool({
  connectionString: "postgres://default:6ApUCVmT4QFX@ep-nameless-snow-179685-pooler.us-east-1.postgres.vercel-storage.com/verceldb?sslmode=require",
  // connectionString: process.env.POSTGRES_URL,
});

const db = drizzle(pool);

// this will automatically run needed migrations on the database
migrate(db, { migrationsFolder: "./drizzle/migrations" })
  .then(() => {
    console.log("Migrations complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Migrations failed!", err);
    process.exit(1);
  });
