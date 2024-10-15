import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";
import { createCustomError } from "../../errors/customErrors.js";
import session from "../../db/helper.js";

/**
 * @description creates a new user
 * @route POST /user
 * @routeBody user
 * @routeBody password
 * @routeBody email
 * @routeBody company
 * @routeBody role
 * @routeBody locked
 */
export const createUser = tryCatchWrapper(async function (req, res, next) {
  // extract data from req body
  const newUser = req.body.user;
  const newUserPwd = req.body.password;
  let email = req.body.email;
  const company = req.body.company;
  const role = req.body.role;
  const locked = req.body.locked;

  // extract creating user data from token
  const creatingUserName = req.user.user;

  // sql statements
  const searchUSerSql = "SELECT u.id FROM user.user u WHERE u.name = ?";
  const searchEmailSql = "SELECT email FROM user.user u WHERE u.email = ?";
  const searchCompanySql = "SELECT c.name FROM corporation.company c WHERE c.name = ?"
  const searchRoleSql = "SELECT r.id, r.level FROM privilege.role r WHERE r.name = ?"
  const searchUserRoleSql = `
    SELECT r.level
      FROM privilege.role r
      INNER JOIN user.user u
        ON r.id = u.role
      WHERE u.name = ?`;
  const insertSql = "INSERT INTO user.user VALUES (NULL, ?, ?, ?, ?, ?, ?)";

  // check if user already exists
  let [rows] = await session(searchUSerSql, newUser);
  if (rows.length != 0) return next(createCustomError("User already exists", 409));
  
  // check if email already exists
  if (email !== undefined) {
    [rows] = await session(searchEmailSql, email);
    if (rows.length != 0) return next(createCustomError("Email alredy registered", 409));
  } else email = null;
  
  // check if company exists
  [rows] = await session(searchCompanySql, company);
  if (rows.length == 0) return next(createCustomError("Company does not exist", 409));

  // check if role exists
  [rows] = await session(searchRoleSql, role);
  if (rows.length == 0) return next(createCustomError("Role does not exist", 409));
  // retrieve role level and id from new user
  const newUSerRoleId = rows[0].id;
  const newUserRoleLevel = rows[0].level;

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
  await session(insertSql, [newUser, hashedPwd, email, company, newUSerRoleId, locked]).then((result) => {
    return res.status(201).json({ userId: result[0].insertId });
  });
});

/**
 * @description enables a user
 * @route POST /user/enable
 * @routeBody user
 */
export const enableUser = tryCatchWrapper(async function (req, res, next) {
  // extract data from req body
  const userName = req.body.user;

  // sql statements
  const searchSql = "SELECT u.disabled FROM user.user u WHERE u.name = ?";
  const updateSql = "UPDATE user.user u SET u.disabled = FALSE WHERE u.name = ?"

  // check if user exists
  const [rows] = await session(searchSql, userName);
  if (rows.length == 0) return next(createCustomError("User does not exist", 409));
  // check if user is already enabled
  if (!rows[0].disabled) return next(createCustomError("User already enabled", 409));

  //update user
  await session(updateSql, userName);
  return res.status(201).json({ message: "User enabled" });
});

/**
 * @description disables a user
 * @route POST /user/disable
 * @routeBody user
 */
export const disableUser = tryCatchWrapper(async function (req, res, next) {
  // extract data from req body
  const userName = req.body.user;

  // sql statements
  const searchSql = "SELECT u.disabled FROM user.user u WHERE u.name = ?";
  const updateSql = "UPDATE user.user u SET u.disabled = TRUE WHERE u.name = ?"

  // check if user exists
  const [rows] = await session(searchSql, userName);
  if (rows.length == 0) return next(createCustomError("User does not exist", 409));
  // check if user is already disabled
  if (rows[0].disabled) return next(createCustomError("User already disabled", 409));

  //update user
  await session(updateSql, userName);
  return res.status(201).json({ message: "User disabled" });
});

/**
 * @description changes the password of a user
 * @route POST /user/password
 * @routeBody password
 */
export const changePassword = tryCatchWrapper(async function (req, res, next) {
  // extract data from req body
  const newPwd = req.body.password;
  // extract user data from token
  const changingUser = req.user.user;

  // sql statements
  const searchPasswordSql = "SELECT u.password FROM user.user u WHERE u.name = ?";
  const searchRefreshTokenSql = "SELECT t.refresh FROM user.token t";
  const updateSql = "UPDATE user.user u SET u.password = ? WHERE u.name = ?";
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
 * @description logs the user in
 * @route POST /login
 * @routeBody user
 * @routeBody password
 */
export const login = tryCatchWrapper(async function (req, res, next) {
  // extract data from req body
  const userName = req.body.user;
  const pwd = req.body.password;

  // sql statements
  const searchSql = "SELECT u.password, u.role, u.disabled FROM user.user u WHERE u.name = ?";
  const insertSql = "INSERT INTO user.token VALUES (?, ?)";

  // check if user exists
  const [rows] = await session(searchSql, userName);
  if (rows.length == 0) return next(createCustomError("User does not exist", 404));
  // check if user is disabled
  if (rows[0].disabled) return next(createCustomError("User is disabled", 401));

  const hashedPwd = rows[0].password;
  if (await bcryptjs.compare(pwd, hashedPwd)) {
    // generate tokens
    const accessToken = generateAccessToken(userName, rows[0].role);
    const refreshToken = generateRefreshToken(userName, rows[0].role);

    // insert tokens and send them back
    await session(insertSql, [accessToken, refreshToken]);
    return res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken});
  } else {
    return next(createCustomError("Password incorrect", 401));
  }
});

/**
 * @description checks validity of token and if user has the required permission
 * @param requiredPermission
 * @param {boolean} [isMiddleware=true] When directly used from a route to get a response it must be set to false
 */
export const validateToken = (requiredPermission, isMiddleware = true) => {
  return tryCatchWrapper(async (req, res, next) => {
    // retrieve token from header
    const authHeader = req.headers["authorization"];

    if (authHeader == null) return next(createCustomError("Token not present", 400));
  
    const token = authHeader.split(" ")[1];
    if (token == null) return next(createCustomError("Token not present", 400));

    if (requiredPermission == null || requiredPermission == "") return next(createCustomError("Permission not present", 400));

    // sql statements
    const searchUserSql = "SELECT * FROM user.user u WHERE u.name = ?";
    const searchTokenSql = "SELECT t.access FROM user.token t WHERE t.access = ?";
    // query to check if the role has the required permission
    const searchRolePermissionSql = `
      SELECT rp.role
        FROM privilege.role_permission rp
        INNER JOIN privilege.role r
          ON rp.role = r.id
        INNER JOIN privilege.permission p
          ON rp.permission = p.id
        WHERE r.id = ? AND p.name = ?`;

    // check if token is valid
    let [rows] = await session(searchTokenSql, token);
    if (rows.length == 0) return next(createCustomError("Token invalid", 401));

    // verify token
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return next(createCustomError("Token expired", 403));
      req.user = user;
      return user;
    });

    // extract name and role from token
    const userName = payload.user;
    const userRole = payload.role;

    // check if user is disabled
    [rows] = await session(searchUserSql, userName);
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
 * @description refreshes the access token
 * @route POST /token/refresh
 * @routeBody refreshToken
 */
export const refreshToken = tryCatchWrapper(async function (req, res, next) {
  // extract data from req body
  const refreshTokenOld = req.body.refreshToken;

  // sql statements
  const searchTokenSql = "SELECT t.refresh FROM user.token t WHERE t.refresh = ?";
  const searchUserSql = "SELECT u.disabled FROM user.user u WHERE u.name = ?";
  const updateSql = "UPDATE user.token t SET t.access = ?, t.refresh = ? WHERE t.refresh = ?";

  // check if token is valid
  let [rows] = await session(searchTokenSql, refreshTokenOld);
  if (rows.length == 0) return next(createCustomError("Refresh token invalid", 400));

  // check if refresh token is expired
  const payload = jwt.verify(refreshTokenOld, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return next(createCustomError("Token expired", 403));
    else return user;
  });

  // retrieve user name from token
  const userName = payload.user;
  const userRole = payload.role;

  // check if user is disabled
  [rows] = await session(searchUserSql, userName);
  if (rows[0].disabled) return next(createCustomError("User is disabled", 401));

  // generate tokens
  const accessTokenNew = generateAccessToken(userName, userRole);
  const refreshTokenNew = generateRefreshToken(userName, userRole);

  await session(updateSql, [accessTokenNew, refreshTokenNew, refreshTokenOld]);
  return res.status(201).json({ accessToken: accessTokenNew, refreshToken: refreshTokenNew });
});

/**
 * @description logs the user out
 * @route DELETE /logout
 * @routeBody refreshToken
 */
export const logout = tryCatchWrapper(async function (req, res, next) {
  // extract data from req body
  const refreshToken = req.body.refreshToken;

  // sql statements
  const searchSql = "SELECT t.refresh FROM user.token t WHERE t.refresh = ?";
  const deleteSql = "DELETE FROM user.token t WHERE t.refresh = ?";

  // check if token is valid
  const [rows] = await session(searchSql, refreshToken);
  if (rows.length == 0) return next(createCustomError("Token invalid", 400));

  // check if refresh token is expired
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return next(createCustomError("Token expired", 403));
  });

  // delete old token
  await session(deleteSql, refreshToken);
  return res.status(201).json({ message: "Logged out"});
});

/**
 * @description generates an access token
 */
const generateAccessToken = function(user, role) {
  return jwt.sign({user, role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
};

/**
 * @description generates a refresh token
 */
const generateRefreshToken = function(user, role) {
  return jwt.sign({user, role}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"})
};

/**
 * @description check and delete expired tokens
 */
export const deleteExpiredTokens = async () => {
  let counter = 0;

  try {
    // sql statements
    const searchSql = "SELECT t.refresh FROM user.token t";
    const deleteSql = "DELETE FROM user.token t WHERE t.refresh = ?";

    // retrieve all tokens
    const [rows] = await session(searchSql);

    for (const row of rows) {
      const refreshToken = row.refresh;
      let deleteToken = false;

      // verify if the token is expired
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err && err.name === "TokenExpiredError") deleteToken = true;
      });

      // delete expired token
      if (deleteToken) {
        await session(deleteSql, refreshToken);
        counter++;
      }
    }
  } catch (err) {
    console.error("Error occurred while deleting expired tokens: ", err);
  }

  return counter;
};