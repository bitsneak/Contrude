import express from "express";

import {
    getAllShips,
    getAllContainersPerShip
} from "./controller.js";
import validateToken from "../../middlewares/validateToken.js";
import validateRouteParams from "../../middlewares/validateRouteParameter.js";

const router = express.Router();

// ship routes
router.route("/ship").get(validateToken("select"), getAllShips);
router.route("/ship/:id/containers").get(validateToken("select"), getAllContainersPerShip);

export default router;