import express from "express";

/*
import {

} from "./controller.js";
*/
import validateToken from "../../middlewares/validateToken.js";
import validateRouteParams from "../../middlewares/validateRouteParameter.js";

const router = express.Router();

//router.route("/").get(validateToken(""), example);

export default router;