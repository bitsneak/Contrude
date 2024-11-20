import mysql from "mysql2";
import { InfluxDB } from "@influxdata/influxdb-client";
import fs from "fs";

export const ship = undefined;
/*
export const ship = mysql
  .createPool({
    host: "db_ship",
    port: 3306,
    database: "",
    user: "rest",
    password: process.env.DB_SHIP_PASSWORD,
    waitForConnections: true,
    connectionLimit: 100,
    ssl: {
      sslmode: "verify-full",
      ca: fs.readFileSync("./ssl/db/ship/ca.pem"),
      cert: fs.readFileSync("./ssl/db/ship/cert.pem"),
      key: fs.readFileSync("./ssl/db/ship/key.pem"),
    }
  }).promise();
*/

export const container = mysql
  .createPool({
    host: "db_container",
    port: 3306,
    database: "configuration",
    database: "certificate",
    database: "corporation",
    database: "dimension",
    user: "rest",
    password: process.env.DB_CONTAINER_PASSWORD,
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

export const threshold = mysql
  .createPool({
    host: "db_threshold",
    port: 3306,
    database: "threshold",
    user: "rest",
    password: process.env.DB_THRESHOLD_PASSWORD,
    waitForConnections: true,
    connectionLimit: 100,
    ssl: {
      sslmode: "verify-full",
      ca: fs.readFileSync("./ssl/db/threshold/ca.pem"),
      cert: fs.readFileSync("./ssl/db/threshold/cert.pem"),
      key: fs.readFileSync("./ssl/db/threshold/key.pem"),
    }
  }).promise();