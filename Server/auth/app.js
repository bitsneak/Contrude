import express from "express";
import cron from "node-cron";
import dotenv from "dotenv";
import fs from "fs";
import http from "http";

import { notFound } from "./src/middlewares/notFound.js";
import { handleError } from "./src/middlewares/handleError.js";
import userRoute from "./src/resources/user/routes.js";
import { deleteExpiredTokens } from "./src/resources/user/helper.js";

dotenv.config();
const app = express();

//middleware
app.use(express.json());

// api routes
app.use(userRoute);

app.use(notFound);
app.use(handleError);

// schedule crawler to clean expired tokens every hour
cron.schedule("0 * * * *", async () => {
  console.log("Running token cleanup");
  console.log("Removed", await deleteExpiredTokens(), "expired tokens");
});

// create HTTP service
http.createServer(app).listen(process.env.SERVER_PORT, () => {
  console.log("Server is running");
});