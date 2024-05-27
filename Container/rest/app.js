import express from "express";
import cron from "node-cron";
import dotenv from "dotenv";
import https from "https";
import fs from "fs";

import { notFound } from "./src/middlewares/notFound.js";
import { handleError } from "./src/middlewares/handleError.js";
import configurationRoute from "./src/resources/configuration/routes.js";
import userRoute from "./src/resources/user/routes.js";
import { deleteExpiredTokens } from "./src/resources/user/controller.js";
//import sensorRoute from "./src/resources/sensor/routes.js"; // not needed yet

dotenv.config();

// server certificates
const optionSSL = {
  key: fs.readFileSync("./ssl/server/key.pem"),
  cert: fs.readFileSync("./ssl/server/cert.pem")
};
const app = express();

//middleware
app.use(express.json());

// api routes
app.use(configurationRoute);
app.use(userRoute);
//app.use(sensorRoute); // not needed yet

app.use(notFound);
app.use(handleError);

// schedule crawler to clean expired tokens every hour
cron.schedule("0 * * * *", async () => {
  console.log("Running token cleanup");
  console.log("Removed", await deleteExpiredTokens(), "expired tokens");
});

// create HTTPS service
https.createServer(optionSSL, app).listen(process.env.HTTPS_PORT, () => {
  console.log("Server is running at https://" + process.env.SERVER_HOSTNAME + ":" + process.env.HTTPS_PORT);
});