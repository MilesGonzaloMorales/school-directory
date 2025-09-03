import mysql from "mysql2/promise";

let pool;

export function getDB() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT) || 4000,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      connectionLimit: 10,
      waitForConnections: true,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      ssl: { minVersion: "TLSv1.2", rejectUnauthorized: true },
    });
  }
  return pool;
}
