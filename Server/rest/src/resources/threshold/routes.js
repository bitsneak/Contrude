import express from "express";

import {
    getAllParameters,
    getAllRules,
    getAllLevels
} from "./controller.js";
import validateToken from "../../middlewares/validateToken.js";
import validateRouteParams from "../../middlewares/validateRouteParameter.js";

const router = express.Router();

router.route("/threshold/parameter").get(validateToken("select"), getAllParameters);
router.route("/threshold/rule").get(validateToken("select"), getAllRules);
router.route("/threshold/level").get(validateToken("select"), getAllLevels);

export default router;