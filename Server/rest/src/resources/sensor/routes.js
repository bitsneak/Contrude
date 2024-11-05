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
import { validateToken } from "../../middlewares/validateToken.js";

const router = express.Router();

router.route("/air_pressure/:ship/:container/:start/:stop").get(validateToken("select"), getAirPressure)
router.route("/humidity/:ship/:container/:start/:stop").get(validateToken("select"), getHumidity)
router.route("/temperature/:ship/:container/:start/:stop").get(validateToken("select"), getTemperature)
router.route("/vibration/:ship/:container/:start/:stop").get(validateToken("select"), getVibration)
router.route("/altitude/:ship/:container/:start/:stop").get(validateToken("select"), getAltitude)
router.route("/latitude/:ship/:container/:start/:stop").get(validateToken("select"), getLatitude)
router.route("/longitude/:ship/:container/:start/:stop").get(validateToken("select"), getLongitude)

export default router;