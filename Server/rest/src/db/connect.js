import mysql from "mysql2";
import { InfluxDB } from "@influxdata/influxdb-client";
import fs from "fs";

export const container = mysql
  .createPool({
    host: "db_container",
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
      ca: fs.readFileSync("./ssl/db/container/ca.pem"),
      cert: fs.readFileSync("./ssl/db/container/cert.pem"),
      key: fs.readFileSync("./ssl/db/container/key.pem"),
    }
  }).promise();

export const sensor = new InfluxDB({url: process.env.DB_SENSOR_URL, token: process.env.DB_SENSOR_TOKEN});