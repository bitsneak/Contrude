import express from "express";

import {
    getContainerById
} from "./controller.js";
import validateToken from "../../middlewares/validateToken.js";
import validateRouteParams from "../../middlewares/validateRouteParameter.js";

const router = express.Router();

router.route("/container/:id").get(validateRouteParams, validateToken("select"), getContainerById);

export default router;