import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

export const user = mysql
.createPool({
  host: "db_user",
  port: 3306,
  database: "user",
  database: "corporation",
  database: "privilege",
  user: "rest",
  password: fs.readFileSync(process.env.DB_PASSWORD_USER, "utf8").trim(),
  waitForConnections: true,
  connectionLimit: 100,
  ssl: {
    sslmode: "verify-full",
    ca: fs.readFileSync("./ssl/db/user/ca.pem"),
    cert: fs.readFileSync("./ssl/db/user/cert.pem"),
    key: fs.readFileSync("./ssl/db/user/key.pem"),
  }
}).promise();