import express from "express";
import dotenv from "dotenv";
import http from "http";

import { notFound } from "./src/middlewares/notFound.js";
import { handleError } from "./src/middlewares/handleError.js";
import configurationRoute from "./src/resources/configuration/routes.js";
//import sensorRoute from "./src/resources/sensor/routes.js"; // not needed yet

dotenv.config();

const app = express();

//middleware
app.use(express.json());

// api routes
app.use(configurationRoute);
//app.use(sensorRoute); // not needed yet

app.use(notFound);
app.use(handleError);

// create HTTP service
http.createServer(app).listen(process.env.HTTP_PORT, () => {
  console.log("Server is running at http://" + process.env.SERVER_HOSTNAME + ":" + process.env.HTTP_PORT);
});