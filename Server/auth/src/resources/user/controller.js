import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import tryCatchWrapper from "../../middlewares/tryCatchWrapper.js";
import createCustomError from "../../errors/customErrors.js";
import session from "../../db/helper.js";
import { generateAccessToken, generateRefreshToken, checkLevelPermission} from "./helper.js";

/**
 * @description Create a new user
 * @route POST /user
 * @routeBody user - Username
 * @routeBody password
 * @routeBody email
 * @routeBody company - Company id
 * @routeBody role - Role id
 * @routeBody locked
 */
export const createUser = tryCatchWrapper(async function (req, res, next) {
  // extract data from req body
  const newUser = req.body.username;
  const newUserPwd = req.body.password;
  let email = req.body.email;
  const company = req.body.company;
  const role = req.body.role;
  const locked = req.body.locked;

  // check if req body is present
  if (newUser === undefined) return next(createCustomError("username is required", 409));
  if (newUserPwd === undefined) return next(createCustomError("password is required", 409));
  if (company === undefined) return next(createCustomError("company is required", 409));
  if (role === undefined) return next(createCustomError("role is required", 409));
  if (locked === undefined) return next(createCustomError("locked is required", 409));

  // sql statements
  const searchUSerSql = "SELECT 1 FROM user.user u WHERE u.name = ? LIMIT 1";
  const searchEmailSql = "SELECT 1 FROM user.user u WHERE u.email = ? LIMIT 1";
  const searchCompanySql = "SELECT 1 FROM corporation.company c WHERE c.id = ? LIMIT 1"
  const searchRoleSql = "SELECT r.id, r.level FROM privilege.role r WHERE r.id = ? LIMIT 1"
  const searchUserRoleSql = `
    SELECT r.level
      FROM privilege.role r
      INNER JOIN user.user u
        ON r.id = u.role
      WHERE u.id = ? LIMIT 1`;
  const insertSql = "INSERT INTO user.user (name, password, email, company, role, disabled) VALUES (?, ?, ?, ?, ?, ?)";

  // check if user already exists
  let [rows] = await session(searchUSerSql, newUser);
  if (rows.length !== 0) return next(createCustomError("User already exists", 409));
  
  // check if email already exists
  if (email !== undefined) {
    [rows] = await session(searchEmailSql, email);
    if (rows.length !== 0) return next(createCustomError("Email alredy registered", 409));
  } else email = null;
  
  // check if company exists
  [rows] = await session(searchCompanySql, company);
  if (rows.length === 0) return next(createCustomError("Company does not exist", 409));

  // check if role exists
  [rows] = await session(searchRoleSql, role);
  if (rows.length === 0) return next(createCustomError("Role does not exist", 409));
  // retrieve role level and id from new user
  const newUserRoleLevel = rows[0].level;

  // extract creating user data from token
  const creatingUserName = req.user.user;
  // retrieve creating user role level
  [rows] = await session(searchUserRoleSql, creatingUserName);
  const creatingUserRoleLevel = rows[0].level;

  // check if new user role is higher than creating user role
  if (creatingUserRoleLevel > newUserRoleLevel) {
    return next(createCustomError("Cannot create a user with a higher role than your own", 403));
  }

  // hash new user password
  const hashedPwd = await bcryptjs.hash(newUserPwd, 10);

  //insert new user
  await session(insertSql, [newUser, hashedPwd, email, company, role, locked]).then((result) => {
    return res.status(201).json({ userId: result[0].insertId });
  });
});

/**
 * @description Enable a user
 * @route POST /user/:id/enable
 * @routeParameter id - User id
 */
export const enableUser = tryCatchWrapper(async function (req, res, next) {
  // extract data from req parameters
  const user = req.params.id;

  // check if user is allowed to enable the user
  if (!await checkLevelPermission(req.user.user, user)) return next(createCustomError("Cannot enable a user with a higher role than your own", 403));

  // sql statements
  const searchSql = "SELECT u.disabled FROM user.user u WHERE u.id = ?  LIMIT 1";
  const updateSql = "UPDATE user.user u SET u.disabled = FALSE WHERE u.id = ?"

  // check if user exists
  const [rows] = await session(searchSql, user);
  if (rows.length === 0) return next(createCustomError("User does not exist", 409));
  // check if user is already enabled
  if (!rows[0].disabled) return next(createCustomError("User already enabled", 409));

  //update user
  await session(updateSql, user);
  return res.status(201).json({ message: "User enabled" });
});

/**
 * @description Disable a user
 * @route POST /user/:id/disable
 * @routeParameter id - User id
 */
export const disableUser = tryCatchWrapper(async function (req, res, next) {
  // extract data from req parameters
  const user = req.params.id;

  // check if user is allowed to enable the user
  if (!await checkLevelPermission(req.user.user, user)) return next(createCustomError("Cannot disable a user with a higher role than your own", 403));

  // sql statements
  const searchSql = "SELECT u.disabled FROM user.user u WHERE u.id = ? LIMIT 1";
  const updateSql = "UPDATE user.user u SET u.disabled = TRUE WHERE u.id = ?"

  // check if user exists
  const [rows] = await session(searchSql, user);
  if (rows.length === 0) return next(createCustomError("User does not exist", 409));
  // check if user is already disabled
  if (rows[0].disabled) return next(createCustomError("User already disabled", 409));

  //update user
  await session(updateSql, user);
  return res.status(201).json({ message: "User disabled" });
});

/**
 * @description Change the password of a user
 * @route POST /user/password
 * @routeBody password - New password
 */
export const changePassword = tryCatchWrapper(async function (req, res, next) {
  // extract data from req body
  const newPwd = req.body.password;
  // extract user data from token
  const changingUser = req.user.user;

  // check if req body is present
  if (newPwd === undefined) return next(createCustomError("password is required", 409));

  // sql statements
  const searchPasswordSql = "SELECT u.password FROM user.user u WHERE u.id = ? LIMIT 1";
  const searchRefreshTokenSql = "SELECT t.refresh FROM user.token t";
  const updateSql = "UPDATE user.user u SET u.password = ? WHERE u.id = ?";
  const deleteSql = "DELETE FROM user.token t WHERE t.refresh = ?";

  // check if password is the same
  let [rows] = await session(searchPasswordSql, changingUser);
  if (await bcryptjs.compare(newPwd, rows[0].password)) return next(createCustomError("Password is the same", 409));

  // hash new password
  const hashedPwd = await bcryptjs.hash(newPwd, 10);
  await session(updateSql, [hashedPwd, changingUser]);

  // search all refresh tokens
  [rows] = await session(searchRefreshTokenSql);

  // delete all tokens of the user
  for (const row of rows) {
    const refreshToken = row.refresh;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (user.user == changingUser) {
        await session(deleteSql, refreshToken);
      }
    });
  }

  return res.status(201).json({ message: "Password changed" });
});

/**
 * @description Log the user in
 * @route POST /login
 * @routeBody user - User id
 * @routeBody password
 */
export const login = tryCatchWrapper(async function (req, res, next) {
  // extract data from req body
  const user = req.body.user;
  const pwd = req.body.password;

  // check if req body is present
  if (user === undefined) return next(createCustomError("user is required", 409));
  if (pwd === undefined) return next(createCustomError("password is required", 409));

  // sql statements
  const searchSql = "SELECT u.password, u.role, u.disabled FROM user.user u WHERE u.id = ? LIMIT 1";
  const insertSql = "INSERT INTO user.token VALUES (?, ?)";

  // check if user exists
  const [rows] = await session(searchSql, user);
  if (rows.length === 0) return next(createCustomError("User does not exist", 404));
  // check if user is disabled
  if (rows[0].disabled) return next(createCustomError("User is disabled", 401));

  const hashedPwd = rows[0].password;
  if (await bcryptjs.compare(pwd, hashedPwd)) {
    // generate tokens
    const accessToken = generateAccessToken(user, rows[0].role);
    const refreshToken = generateRefreshToken(user, rows[0].role);

    // insert tokens and send them back
    await session(insertSql, [accessToken, refreshToken]);
    return res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken});
  } else {
    return next(createCustomError("Password incorrect", 401));
  }
});

/**
 * @description Check validity of token and if user has the required permission
 * @route GET /token/:permission
 * @routeParameter permission - Permission which sould be checked
 * @param requiredPermission
 * @param {boolean} [isMiddleware=true] When directly used from a route to get a response it must be set to false
 */
export const validateToken = (requiredPermission, isMiddleware = true) => {
  return tryCatchWrapper(async (req, res, next) => {
    // retrieve token from header
    const authHeader = req.headers["authorization"];

    if (authHeader === null) return next(createCustomError("Token not present", 400));
  
    const token = authHeader.split(" ")[1];
    if (token === null) return next(createCustomError("Token not present", 400));

    if (requiredPermission === null || requiredPermission === "") return next(createCustomError("Permission not present", 400));

    // sql statements
    const searchUserSql = "SELECT u.disabled FROM user.user u WHERE u.id = ? LIMIT 1";
    const searchTokenSql = "SELECT 1 FROM user.token t WHERE t.access = ? LIMIT 1";
    // query to check if the role has the required permission
    const searchRolePermissionSql = `
      SELECT 1
        FROM privilege.role_permission rp
        INNER JOIN privilege.role r
          ON rp.role = r.id
        INNER JOIN privilege.permission p
          ON rp.permission = p.id
        WHERE r.id = ? AND p.name = ? LIMIT 1`;

    // check if token is valid
    let [rows] = await session(searchTokenSql, token);
    if (rows.length === 0) return next(createCustomError("Token invalid", 401));

    // verify token
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return next(createCustomError("Token expired", 403));
      req.user = user;
      return user;
    });

    // extract name and role from token
    const user = payload.user;
    const userRole = payload.role;

    // check if user is disabled
    [rows] = await session(searchUserSql, user);
    if (rows[0].disabled) return next(createCustomError("User is disabled", 401));

    [rows] = await session(searchRolePermissionSql, [userRole, requiredPermission]);

    // if there are any entries the user has the required permission
    if (rows.length > 0) {
      if (isMiddleware) return next();
      else return res.status(200).json({ message: "ok" });
    } else return next(createCustomError("Permission denied", 403)); 
  });
};

/**
 * @description Refresh the access token
 * @route POST /token/refresh
 * @routeBody refreshToken
 */
export const refreshToken = tryCatchWrapper(async function (req, res, next) {
  // extract data from req body
  const refreshTokenOld = req.body.refreshToken;

  // check if req body is present
  if (refreshTokenOld === undefined) return next(createCustomError("refreshToken is required", 409));

  // sql statements
  const searchTokenSql = "SELECT 1 FROM user.token t WHERE t.refresh = ? LIMIT 1";
  const searchUserSql = "SELECT u.disabled FROM user.user u WHERE u.id = ? LIMIT 1";
  const updateSql = "UPDATE user.token t SET t.access = ?, t.refresh = ? WHERE t.refresh = ?";

  // check if token is valid
  let [rows] = await session(searchTokenSql, refreshTokenOld);
  if (rows.length === 0) return next(createCustomError("Refresh token invalid", 400));

  // check if refresh token is expired
  const payload = jwt.verify(refreshTokenOld, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return next(createCustomError("Token expired", 403));
    else return user;
  });

  // retrieve user name from token
  const user = payload.user;
  const userRole = payload.role;

  // check if user is disabled
  [rows] = await session(searchUserSql, user);
  if (rows[0].disabled) return next(createCustomError("User is disabled", 401));

  // generate tokens
  const accessTokenNew = generateAccessToken(user, userRole);
  const refreshTokenNew = generateRefreshToken(user, userRole);

  await session(updateSql, [accessTokenNew, refreshTokenNew, refreshTokenOld]);
  return res.status(201).json({ accessToken: accessTokenNew, refreshToken: refreshTokenNew });
});

/**
 * @description Log the user out
 * @route DELETE /logout
 * @routeBody refreshToken
 */
export const logout = tryCatchWrapper(async function (req, res, next) {
  // extract data from req body
  const refreshToken = req.body.refreshToken;

  // check if req body is present
  if (refreshToken === undefined) return next(createCustomError("refreshToken is required", 409));

  // sql statements
  const searchSql = "SELECT 1 FROM user.token t WHERE t.refresh = ? LIMIT 1";
  const deleteSql = "DELETE FROM user.token t WHERE t.refresh = ?";

  // check if token is valid
  const [rows] = await session(searchSql, refreshToken);
  if (rows.length === 0) return next(createCustomError("Token invalid", 400));

  // check if refresh token is expired
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return next(createCustomError("Token expired", 403));
  });

  // delete old token
  await session(deleteSql, refreshToken);
  return res.status(201).json({ message: "Logged out"});
});

/**
 * @description Return the username of the user with the given name
 * @route GET /user/:name
 * @routeParameter name - Username
 */
export const getIdFromUserName = tryCatchWrapper(async function (req, res, next) {
  // extract data from req parameters
  const name = req.params.name;

  const sql = "SELECT u.id FROM user.user u WHERE u.name = ? LIMIT 1";
  const [rows] = await session(sql, name);

  return res.status(200).json({ user: rows });
});

/**
 * @description Return the id of the company with the given name
 * @route GET /company/:name
 * @routeParameter name - Company name
 */
export const getIdFromCompany = tryCatchWrapper(async function (req, res, next) {
  // extract data from req parameters
  const name = req.params.name;

  const sql = "SELECT c.id FROM corporation.company c WHERE c.name = ? LIMIT 1";
  const [rows] = await session(sql, name);

  return res.status(200).json({ company: rows });
});

/**
 * @description Return the id of the role with the given name
 * @route GET /role/:name
 * @routeParameter name - Role name
 */
export const getIdFromRole = tryCatchWrapper(async function (req, res, next) {
  // extract data from req parameters
  const name = req.params.name;

  const sql = "SELECT r.id FROM privilege.role r WHERE r.name = ? LIMIT 1";
  const [rows] = await session(sql, name);

  return res.status(200).json({ role: rows });
});

/**
 * @description Return all companies
 * @route GET /role
 */
export const getAllCompanies = tryCatchWrapper(async function (req, res, next) {
  const sql = "SELECT c.id FROM corporation.company c";
  const [rows] = await session(sql);

  return res.status(200).json({ companies: rows });
});

/**
 * @description Return all roles
 * @route GET /role
 */
export const getAllRoles = tryCatchWrapper(async function (req, res, next) {
  const sql = "SELECT r.id FROM privilege.role r";
  const [rows] = await session(sql);

  return res.status(200).json({ roles: rows });
});