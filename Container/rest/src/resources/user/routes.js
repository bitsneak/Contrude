import express from "express";
import {
    createUser,
    login,
    refreshToken,
    logout,
    validateToken
} from "./controller.js";

const router = express.Router();

router.route("/createUser").post(validateToken, createUser);
router.route("/login").post(login);
router.route("/refreshToken").post(refreshToken);
router.route("/logout").delete(logout);

export default router;