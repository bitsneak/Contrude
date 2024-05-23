import express from "express";

import {
    getAllCountries,
    getAllCountriesFromContinent
} from "./controller.js";
import { validateToken } from "../user/controller.js";

const router = express.Router();

router.route("/api/get/allCountries").get(validateToken, getAllCountries)
router.route("/api/get/allCountries/:id").get(validateToken, getAllCountriesFromContinent)

export default router;