import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

// Create the connection pool with explicit host/port/user settings
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  connectTimeout: 10000,
  waitForConnections: true,
  queueLimit: 0,
});

export const db = drizzle({ client: pool });

export const checkDatabaseConnection = async () => {
  try {
    const [rows] = await pool.query("SELECT NOW()");

    console.log("✅ MySQL Database Connected");
    console.log("🕐 DB Time:", (rows)[0]["NOW()"]);

    return true;
  } catch (error) {
    console.error("❌ MySQL Database Connection Failed");
    console.error(error);

    return false;
  }
};

export { pool };