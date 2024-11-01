import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "sunannani",  // Replace with your actual password
  port: 5432             // Replace if using a different port
});

export default pool;
