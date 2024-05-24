import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";
import { createCustomError } from "../../errors/customErrors.js";
import { user } from "../../db/connect.js";

/**
 * @description creates a new user
 * @route POST /createUser
 */
export const createUser = tryCatchWrapper(async function (req, res, next) {
  const userName = req.body.name;
  const locked = req.body.locked;

  const searchSql = "SELECT * FROM user.user u WHERE u.name = ?";
  const [rows] = await user.query(user.format(searchSql, [userName]));
  if (rows.length != 0) return next(createCustomError("User already exists", 409))
  
  const hashedPwd = await bcryptjs.hash(req.body.password, 10);
  const insertSql = "INSERT INTO user.user VALUES (NULL, ?, ?, ?)";

  await user.query(user.format(insertSql, [userName, hashedPwd, locked])).then((result) => {
    return res.status(201).json({ userId: result[0].insertId });
  });
});

/**
 * @description logs the user in
 * @route POST /login
 */
export const login = tryCatchWrapper(async function (req, res, next) {
  const userName = req.body.name;
  const pwd = req.body.password;

  const searchSql = "SELECT * FROM user.user u WHERE u.name = ?";
  const [rows] = await user.query(user.format(searchSql, [userName]));
  if (rows.length == 0) return next(createCustomError("User does not exist", 404))
  
  const hashedPwd = rows[0].password;
  if (await bcryptjs.compare(pwd, hashedPwd)) {
    const accessToken = generateAccessToken({user: userName});
    const refreshToken = generateRefreshToken({user: userName});
    
    const insertSql = "INSERT INTO user.token VALUES (?, ?)";
    await user.query(user.format(insertSql, [accessToken, refreshToken]));

    return res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken});
  } else {
    return next(createCustomError("Password incorrect", 401));
  }
});

/**
 * @description refreshes the access token
 * @route POST /refreshToken
 */
export const refreshToken = tryCatchWrapper(async function (req, res, next) {
  const userName = req.body.name;
  const refreshTokenOld = req.body.refreshToken;

  const searchSql = "SELECT * FROM user.token t WHERE t.refresh = ?";
  const [rows] = await user.query(user.format(searchSql, [refreshTokenOld]));
  if (!rows.length) return next(createCustomError("Refresh token invalid", 400));

  jwt.verify(refreshTokenOld, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      logout(req, res, next);
      return next(createCustomError("Token too old", 403));
    }
  });

  const accessTokenNew = generateAccessToken({user: userName});
  const refreshTokenNew = generateRefreshToken({user: userName});

  const updateSql = "UPDATE user.token t SET t.access = ?, t.refresh = ? WHERE t.refresh = ?";
  await user.query(user.format(updateSql, [accessTokenNew, refreshTokenNew, refreshTokenOld]));

  return res.status(201).json({ accessToken: accessTokenNew, refreshToken: refreshTokenNew });
});

/**
 * @description checks if the token is valid
 */
export const validateToken = tryCatchWrapper(async function (req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader == null) return next(createCustomError("Token not present", 400));

  const token = authHeader.split(" ")[1];
  if (token == null) return next(createCustomError("Token not present", 400));

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return next(createCustomError("Token invalid", 403));
    req.user = user;
    next();
  });
});

/**
 * @description logs the user out
 * @route DELETE /logout
 */
export const logout = tryCatchWrapper(async function (req, res, next) {
  const refreshToken = req.body.refreshToken;

  const searchSql = "SELECT * FROM user.token t WHERE t.refresh = ?";
  const [rows] = await user.query(user.format(searchSql, [refreshToken]));
  if (!rows.length) return next(createCustomError("Refresh token invalid", 400));

  const deleteSql = "DELETE FROM user.token t WHERE t.refresh = ?";
  await user.query(user.format(deleteSql, [refreshToken]));

  return res.status(201).json({ message: "Logged out"});
});

/**
 * @description generates an access token
 */
const generateAccessToken = function(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
};

/**
 * @description generates a refresh token
 */
const generateRefreshToken = function(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"})
};