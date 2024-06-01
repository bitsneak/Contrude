import express from "express";
import {
    createUser,
    enableUser,
    disableUser,
    login,
    validateToken,
    refreshToken,
    logout
} from "./controller.js";

const router = express.Router();

router.route("/createUser").post(validateToken("create user"), createUser);
router.route("/enableUser").post(validateToken("enable user"), enableUser);
router.route("/disableUSer").post(validateToken("disable user"), disableUser);
router.route("/login").post(login);
router.route("/validateToken/:permission").get((req, res, next) => validateToken(req.params.permission, false)(req, res, next));
router.route("/refreshToken").post(refreshToken);
router.route("/logout").delete(logout);

export default router;