import express from "express";
import dotenv from "dotenv";
import http from "http";

import { notFound } from "./src/middlewares/notFound.js";
import { handleError } from "./src/middlewares/handleError.js";
import containerRoute from "./src/resources/container/routes.js";
import sensorRoute from "./src/resources/sensor/routes.js";
import thresholdRoute from "./src/resources/threshold/routes.js";

dotenv.config();
const app = express();

//middleware
app.use(express.json());

// api routes
app.use(containerRoute);
app.use(sensorRoute);
app.use(thresholdRoute);

app.use(notFound);
app.use(handleError);

// create HTTP service
http.createServer(app).listen(process.env.SERVER_PORT, () => {
  console.log("Server is running");
});