import express from "express";

import {
    createUser,
    enableUser,
    disableUser,
    changePassword,
    login,
    validateToken,
    refreshToken,
    logout,
    getIdFromUserName,
    getAllCompanies,
    getIdFromCompany,
    getAllRoles,
    getIdFromRole
} from "./controller.js";

const router = express.Router();

router.route("/user").post(validateToken("create user"), createUser);
router.route("/user/:name").get(validateToken("select"), getIdFromUserName);
router.route("/user/:id/enable").post(validateToken("enable user"), enableUser);
router.route("/user/:id/disable").post(validateToken("disable user"), disableUser);
router.route("/user/password").post(validateToken("select"), changePassword);
router.route("/login").post(login);
router.route("/logout").delete(logout);
router.route("/token/:permission").get((req, res, next) => validateToken(req.params.permission, false)(req, res, next));
router.route("/token/refresh").post(refreshToken);
router.route("/company").get(validateToken("select"), getAllCompanies);
router.route("/company/:name").get(validateToken("select"), getIdFromCompany);
router.route("/role/:name").get(validateToken("select"), getIdFromRole);
router.route("/role").get(validateToken("select"), getAllRoles);

export default router;