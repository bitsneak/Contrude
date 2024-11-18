import express from "express";

import {
    getAirPressure,
    getHumidity,
    getTemperature,
    getVibration,
    getAltitude,
    getLatitude,
    getLongitude
} from "./controller.js";
import validateToken from "../../middlewares/validateToken.js";
import validateRouteParams from "../../middlewares/validateRouteParameter.js";

const router = express.Router();

router.route("/sensor/air_pressure/:ship/:container/:start/:stop").get(validateRouteParams, validateToken("select"), getAirPressure);
router.route("/sensor/humidity/:ship/:container/:start/:stop").get(validateRouteParams, validateToken("select"), getHumidity)
router.route("/sensor/temperature/:ship/:container/:start/:stop").get(validateRouteParams, validateToken("select"), getTemperature)
router.route("/sensor/vibration/:ship/:container/:start/:stop").get(validateRouteParams, validateToken("select"), getVibration)
router.route("/sensor/altitude/:ship/:container/:start/:stop").get(validateRouteParams, validateToken("select"), getAltitude)
router.route("/sensor/latitude/:ship/:container/:start/:stop").get(validateRouteParams, validateToken("select"), getLatitude)
router.route("/sensor/longitude/:ship/:container/:start/:stop").get(validateRouteParams, validateToken("select"), getLongitude)

export default router;