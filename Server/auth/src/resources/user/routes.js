import express from "express";
import {
    createUser,
    enableUser,
    disableUser,
    changePassword,
    login,
    validateToken,
    refreshToken,
    logout
} from "./controller.js";

const router = express.Router();

router.route("/user").post(validateToken("create user"), createUser);
router.route("/user/enable").post(validateToken("enable user"), enableUser);
router.route("/user/disable").post(validateToken("disable user"), disableUser);
router.route("/user/password").post(validateToken("select"), changePassword);
router.route("/login").post(login);
router.route("/logout").delete(logout);
router.route("/token/:permission").get((req, res, next) => validateToken(req.params.permission, false)(req, res, next));
router.route("/token/refresh").post(refreshToken);

export default router;