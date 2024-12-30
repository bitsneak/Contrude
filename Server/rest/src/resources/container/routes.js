import express from "express";

import {
    getContainerById,
    getSerialNumberByContainerId,
    getContainerIdBySerialNumber
} from "./controller.js";
import validateToken from "../../middlewares/validateToken.js";
import validateRouteParams from "../../middlewares/validateRouteParameter.js";

const router = express.Router();

router.route("/container/:id").get(validateRouteParams, validateToken("select"), getContainerById);
router.route("/container/:id/serial-number").get(validateRouteParams, validateToken("select"), getSerialNumberByContainerId);
router.route("/container/by-serial-number/:serial").get(validateRouteParams, validateToken("select"), getContainerIdBySerialNumber);

export default router;