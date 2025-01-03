import express from "express";

import {
    getAirPressure,
    getLatestAirPressure,
    getHumidity,
    getLatestHumidity,
    getTemperature,
    getLatestTemperature,
    getVibration,
    getLatestVibration,
    getAltitude,
    getLatestAltitude,
    getLatitude,
    getLatestLatitude,
    getLongitude,
    getLatestLongitude
} from "./controller.js";
import validateToken from "../../middlewares/validateToken.js";
import validateRouteParams from "../../middlewares/validateRouteParameter.js";

const router = express.Router();

// air_pressure
router.route("/sensor/air_pressure/:ship/:container/:start/:stop").get(validateRouteParams, validateToken("select"), getAirPressure);
router.route("/sensor/air_pressure/:ship/:container/latest").get(validateRouteParams, validateToken("select"), getLatestAirPressure);
// humidity
router.route("/sensor/humidity/:ship/:container/:start/:stop").get(validateRouteParams, validateToken("select"), getHumidity)
router.route("/sensor/humidity/:ship/:container/latest").get(validateRouteParams, validateToken("select"), getLatestHumidity);
// temperature
router.route("/sensor/temperature/:ship/:container/:start/:stop").get(validateRouteParams, validateToken("select"), getTemperature)
router.route("/sensor/temperature/:ship/:container/latest").get(validateRouteParams, validateToken("select"), getLatestTemperature);
// vibration
router.route("/sensor/vibration/:ship/:container/:start/:stop").get(validateRouteParams, validateToken("select"), getVibration)
router.route("/sensor/vibration/:ship/:container/latest").get(validateRouteParams, validateToken("select"), getLatestVibration);
// altitude
router.route("/sensor/altitude/:ship/:container/:start/:stop").get(validateRouteParams, validateToken("select"), getAltitude)
router.route("/sensor/altitude/:ship/:container/latest").get(validateRouteParams, validateToken("select"), getLatestAltitude);
// latitude
router.route("/sensor/latitude/:ship/:container/:start/:stop").get(validateRouteParams, validateToken("select"), getLatitude)
router.route("/sensor/latitude/:ship/:container/latest").get(validateRouteParams, validateToken("select"), getLatestLatitude);
// longitude
router.route("/sensor/longitude/:ship/:container/:start/:stop").get(validateRouteParams, validateToken("select"), getLongitude)
router.route("/sensor/longitude/:ship/:container/latest").get(validateRouteParams, validateToken("select"), getLatestLongitude);

export default router;