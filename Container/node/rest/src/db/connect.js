import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

export const configuration = mysql
  .createPool({
    host: "db_configuration",
    port: 3306,
    database: "configuration",
    database: "certificate",
    database: "corporation",
    database: "dimension",
    user: "api",
    password: fs.readFileSync(process.env.DB_PASSWORD_CONFIGURATION, "utf8").trim(),
    waitForConnections: true,
    connectionLimit: 100,
    ssl: {
      sslmode: "verify-full",
      ca: fs.readFileSync("./ssl/db/configuration/ca.pem"),
      cert: fs.readFileSync("./ssl/db/configuration/cert.pem"),
      key: fs.readFileSync("./ssl/db/configuration/key.pem"),
    }
  }).promise();

  export const sensor = mysql
  .createPool({
    host: "db_api_user",
    port: 3306,
    database: "measurements",
    user: "api",
    password: fs.readFileSync(process.env.DB_PASSWORD_SENSOR, "utf8").trim(),
    waitForConnections: true,
    connectionLimit: 100,
    ssl: {
      sslmode: "verify-full",
      ca: fs.readFileSync("./ssl/db/sensor/ca.pem"),
      cert: fs.readFileSync("./ssl/db/sensor/cert.pem"),
      key: fs.readFileSync("./ssl/db/sensor/key.pem"),
    }
  }).promise();