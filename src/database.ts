import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tododb",
  password: "sunannani",  // Replace with your actual password
  port: 5432             // Replace if using a different port
});

// Test the connection
pool.connect()
  .then(client => {
    console.log("Connected to the database successfully!");
    client.release(); // release the client back to the pool
  })
  .catch(err => {
    console.error("Error connecting to the database", err);
  });

export default pool;

