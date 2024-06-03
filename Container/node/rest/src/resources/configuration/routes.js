import express from "express";

import {
    getAllCountries,
    getAllCountriesFromContinent
} from "./controller.js";
import { validateToken } from "../../middlewares/validateToken.js";

const router = express.Router();

router.route("/countries").get(validateToken("select"), getAllCountries)
router.route("/countries/:id").get(validateToken("select"), getAllCountriesFromContinent)

export default router;