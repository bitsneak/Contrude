import express from "express";

/*
import {

} from "./controller.js";
*/
import validateToken from "../../middlewares/validateToken.js";
import validateRouteParams from "../../middlewares/validateRouteParameter.js";

const router = express.Router();
// validate route parameters
router.use(validateRouteParams);

//router.route("/").get(validateToken(""), example);

export default router;