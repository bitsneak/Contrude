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
    password: process.env.DB_CONFIGURATION_PASSWORD,
    waitForConnections: true,
    connectionLimit: 100,
    ssl: {
      sslmode: "verify-full",
      ca: fs.readFileSync("./ssl/db/configuration/ca.pem"),
      cert: fs.readFileSync("./ssl/db/configuration/cert.pem"),
      key: fs.readFileSync("./ssl/db/configuration/key.pem"),
    }
  }).promise();

  export const sensor = undefined; //TODO implement connection to influxdb2