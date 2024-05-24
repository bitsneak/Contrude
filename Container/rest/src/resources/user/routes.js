import express from "express";
import {
    createUser,
    login,
    refreshToken,
    logout
} from "./controller.js";

const router = express.Router();

router.route("/createUser").post(createUser);
router.route("/login").post(login);
router.route("/refreshToken").post(refreshToken);
router.route("/logout").delete(logout);

export default router;