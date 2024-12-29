import express from "express";

import {
    getAllShips
} from "./controller.js";
import validateToken from "../../middlewares/validateToken.js";
import validateRouteParams from "../../middlewares/validateRouteParameter.js";

const router = express.Router();

// ship routes
router.route("/ship").get(validateToken("select"), getAllShips);

export default router;