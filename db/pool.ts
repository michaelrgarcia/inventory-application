import pg from "pg";

import { config } from "dotenv";

config();

const pool = new pg.Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

export default pool;
