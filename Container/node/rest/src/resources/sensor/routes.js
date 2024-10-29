import express from "express";

import {
    getTemperature
} from "./controller.js";
import { validateToken } from "../../middlewares/validateToken.js";

const router = express.Router();

router.route("/temperature/:ship/:container/:start/:stop").get(validateToken("select"), getTemperature)

export default router;