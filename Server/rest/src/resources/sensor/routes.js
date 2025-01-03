import express from "express";

import {
    getSensorData,
    getAllSensorDataPerContainer
} from "./controller.js";
import validateToken from "../../middlewares/validateToken.js";
import validateRouteParams from "../../middlewares/validateRouteParameter.js";

const router = express.Router();

// all sensor data per container
router.route("/sensor/:ship/:container").get(validateRouteParams, validateToken("select"), getAllSensorDataPerContainer);
// air_pressure
router.route("/sensor/:ship/:container/air_pressure").get(validateRouteParams, validateToken("select"), getSensorData("air_pressure"));
// humidity
router.route("/sensor/:ship/:container/humidity").get(validateRouteParams, validateToken("select"), getSensorData("humidity"))
// temperature
router.route("/sensor/:ship/:container/temperature").get(validateRouteParams, validateToken("select"), getSensorData("temperature"))
// vibration
router.route("/sensor/:ship/:container/vibration").get(validateRouteParams, validateToken("select"), getSensorData("vibration"))
// altitude
router.route("/sensor/:ship/:container/altitude").get(validateRouteParams, validateToken("select"), getSensorData("altitude"))
// latitude
router.route("/sensor/:ship/:container/latitude").get(validateRouteParams, validateToken("select"), getSensorData("latitude"))
// longitude
router.route("/sensor/:ship/:container/longitude").get(validateRouteParams, validateToken("select"), getSensorData("longitude"))

export default router;