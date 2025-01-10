import mysql from "mysql2";
import fs from "fs";

const user = mysql
  .createPool({
    host: "db_user",
    port: 3306,
    database: "user",
    database: "corporation",
    database: "privilege",
    user: "rest",
    password: process.env.DB_USER_PASSWORD,
    waitForConnections: true,
    connectionLimit: 100,
    ssl: {
      sslmode: "verify-full",
      ca: fs.readFileSync("./ssl/db/user/ca.pem"),
      cert: fs.readFileSync("./ssl/db/user/cert.pem"),
      key: fs.readFileSync("./ssl/db/user/key.pem"),
    }
  }).promise();

export default user;