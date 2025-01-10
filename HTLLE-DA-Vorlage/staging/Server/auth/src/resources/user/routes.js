import express from "express";

import {
    createUser,
    enableUser,
    disableUser,
    changePassword,
    getAllFavoritesByUserId,
    insertFavoriteByUserId,
    deleteFavoriteByUserId,
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
import validateRouteParams from "../../middlewares/validateRouteParameter.js";

const router = express.Router();

// user
router.route("/user").post(validateToken("create user"), createUser);
router.route("/user/:name").get(validateRouteParams, getIdFromUserName);
router.route("/user/:id/enable").post(validateRouteParams, validateToken("enable user"), enableUser);
router.route("/user/:id/disable").post(validateRouteParams, validateToken("disable user"), disableUser);
router.route("/user/password").post(validateToken("select"), changePassword);
// user favorites
router.route("/user/:id/favorites").get(validateRouteParams, validateToken("select"), getAllFavoritesByUserId);
router.route("/user/:id/favorites/:container").post(validateRouteParams, validateToken("select"), insertFavoriteByUserId);
router.route("/user/:id/favorites/:container").delete(validateRouteParams, validateToken("select"), deleteFavoriteByUserId);
// general
router.route("/login").post(login);
router.route("/logout").delete(logout);
// token
router.route("/token/:permission").get(validateRouteParams, (req, res, next) => validateToken(req.params.permission, false)(req, res, next));
router.route("/token/refresh").post(refreshToken);
// company
router.route("/company").get(validateToken("select"), getAllCompanies);
router.route("/company/:name").get(validateRouteParams, validateToken("select"), getIdFromCompany);
// role
router.route("/role/:name").get(validateRouteParams, validateToken("select"), getIdFromRole);
router.route("/role").get(validateToken("select"), getAllRoles);

export default router;