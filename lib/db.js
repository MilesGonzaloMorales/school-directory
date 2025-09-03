import mysql from "mysql2/promise";

let pool;

export function getDB() {
  if (!pool) {
    const host = process.env.MYSQL_HOST;
    const port = process.env.MYSQL_PORT
      ? Number(process.env.MYSQL_PORT)
      : 4000; 
    const user = process.env.MYSQL_USER;
    const password = process.env.MYSQL_PASSWORD;
    const database = process.env.MYSQL_DATABASE;

    const ssl = { minVersion: "TLSv1.2", rejectUnauthorized: true };

    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      connectionLimit: 10,
      waitForConnections: true,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      ssl,
    });
  }
  return pool;
}










































// import mysql from "mysql2/promise";
// let pool;

// export function getDB() {
//   if (!pool) {
//     pool = mysql.createPool({
//       host: process.env.MYSQL_HOST,
//       port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
//       user: process.env.MYSQL_USER,
//       password: process.env.MYSQL_PASSWORD,
//       database: process.env.MYSQL_DATABASE,
//       connectionLimit: 10,
//       waitForConnections: true,
//     });
//   }
//   return pool;
// }
