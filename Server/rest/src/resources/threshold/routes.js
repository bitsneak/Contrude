import express from "express";

import {
    getAllThresholds,
    getThresholdById,
    insertThreshold,
    getAllParameters,
    getParameterById,
    insertParameter,
    getAllRules,
    getRuleById,
    insertRule,
    getAllLevels,
    getLevelById,
    insertLevel
} from "./controller.js";
import validateToken from "../../middlewares/validateToken.js";
import validateRouteParams from "../../middlewares/validateRouteParameter.js";

const router = express.Router();

// threshold routes
router.route("/threshold").get(validateToken("select"), getAllThresholds);
router.route("/threshold/:id").get(validateRouteParams, validateToken("select"), getThresholdById);
router.route("/threshold").post(validateToken("insert"), insertThreshold);
// parameter routes
router.route("/threshold/parameter").get(validateToken("select"), getAllParameters);
router.route("/threshold/parameter/:id").get(validateRouteParams, validateToken("select"), getParameterById);
router.route("/threshold/parameter").post(validateToken("insert"), insertParameter);
// rule routes
router.route("/threshold/rule").get(validateToken("select"), getAllRules);
router.route("/threshold/rule/:id").get(validateRouteParams, validateToken("select"), getRuleById);
router.route("/threshold/rule").post(validateToken("insert"), insertRule);
// level routes
router.route("/threshold/level").get(validateToken("select"), getAllLevels);
router.route("/threshold/level/:id").get(validateRouteParams, validateToken("select"), getLevelById);
router.route("/threshold/level").post(validateToken("insert"), insertLevel);

export default router;