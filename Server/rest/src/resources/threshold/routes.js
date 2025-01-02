import express from "express";

import {
    getAllThresholds,
    getThresholdById,
    insertThreshold,
    getAllParameters,
    getParameterById,
    getParameterByName,
    insertParameter,
    getAllRules,
    getRuleById,
    getRuleByName,
    insertRule,
    getAllLevels,
    getLevelById,
    getLevelByName,
    insertLevel,
    getThresholdsByContainerId,
} from "./controller.js";
import validateToken from "../../middlewares/validateToken.js";
import validateRouteParams from "../../middlewares/validateRouteParameter.js";

const router = express.Router();

// threshold routes
router.route("/threshold").get(validateToken("select"), getAllThresholds);
router.route("/threshold/:id").get(validateRouteParams, validateToken("select"), getThresholdById);
router.route("/container/:id/threshold").post(validateToken("insert"), insertThreshold);
router.route("/container/:id/thresholds").get(validateToken("update"), getThresholdsByContainerId);
// parameter routes
router.route("/threshold/parameter").get(validateToken("select"), getAllParameters);
router.route("/threshold/parameter/:id(\\d+)").get(validateRouteParams, validateToken("select"), getParameterById);
router.route("/threshold/parameter/:name").get(validateRouteParams, validateToken("select"), getParameterByName);
router.route("/threshold/parameter").post(validateToken("insert"), insertParameter);
// rule routes
router.route("/threshold/rule").get(validateToken("select"), getAllRules);
router.route("/threshold/rule/:id(\\d+)").get(validateRouteParams, validateToken("select"), getRuleById);
router.route("/threshold/rule/:name").get(validateRouteParams, validateToken("select"), getRuleByName);
router.route("/threshold/rule").post(validateToken("insert"), insertRule);
// level routes
router.route("/threshold/level").get(validateToken("select"), getAllLevels);
router.route("/threshold/level/:id(\\d+)").get(validateRouteParams, validateToken("select"), getLevelById);
router.route("/threshold/level/:name").get(validateRouteParams, validateToken("select"), getLevelByName);
router.route("/threshold/level").post(validateToken("insert"), insertLevel);

export default router;