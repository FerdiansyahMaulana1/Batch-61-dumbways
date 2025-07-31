// config/db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',         // Ganti sesuai user pgSQL kamu
  host: 'localhost',
  database: 'final_task', // Ganti dengan nama database
  password: "",
  port: 5432,                // Port default PostgreSQL
});

export default pool;
