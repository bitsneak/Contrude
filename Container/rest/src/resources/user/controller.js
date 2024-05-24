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
  // extract data from req body
  const creatingUser = req.body.user;
  const pwd = req.body.password;
  const newUser = req.body.newUser.user;
  const newUserPwd = req.body.newUser.password;
  const newUSerEmail = req.body.newUser.email;
  const newUserCompany = req.body.newUser.company;
  const locked = req.body.newUser.locked;

  // sql statements
  const searchUSerSql = "SELECT * FROM user.user u WHERE u.name = ?";
  const searchCompanySql = "SELECT * from corporation.company c WHERE c.name = ?"
  const insertSql = "INSERT INTO user.user VALUES (NULL, ?, ?, ?, ?, ?)";

  // check if creating user exists
  let [rows] = await user.query(user.format(searchUSerSql, [creatingUser]));
  if (rows.length == 0) return next(createCustomError("Creating user does not exist", 409));
  // check if creating users password is correct
  if (!await bcryptjs.compare(pwd, rows[0].password)) return next(createCustomError("Password incorrect", 401));
  // check if creating user is disabled
  if (rows[0].disabled) return next(createCustomError("Creating user is disabled", 401));

  // check if user to create already exists
  [rows] = await user.query(user.format(searchUSerSql, [newUser]));
  if (rows.length != 0) return next(createCustomError("User to create already exists", 409));
  
  // check if company exists
  [rows] = await user.query(user.format(searchCompanySql, [newUserCompany]));
  if (rows.length == 0) return next(createCustomError("Company does not exist", 409));

  // hash new user password
  const hashedPwd = await bcryptjs.hash(newUserPwd, 10);

  //insert new user
  await user.query(user.format(insertSql, [newUser, hashedPwd, newUSerEmail, newUserCompany, locked])).then((result) => {
    return res.status(201).json({ userId: result[0].insertId });
  });
});

/**
 * @description logs the user in
 * @route POST /login
 */
export const login = tryCatchWrapper(async function (req, res, next) {
  // extract data from req body
  const userName = req.body.user;
  const pwd = req.body.password;

  // sql statements
  const searchSql = "SELECT * FROM user.user u WHERE u.name = ?";
  const insertSql = "INSERT INTO user.token VALUES (?, ?)";

  // check if user exists
  const [rows] = await user.query(user.format(searchSql, [userName]));
  if (rows.length == 0) return next(createCustomError("User does not exist", 404));
  // check if user is disabled
  if (rows[0].disabled) return next(createCustomError("User is disabled", 401));

  const hashedPwd = rows[0].password;
  if (await bcryptjs.compare(pwd, hashedPwd)) {
    // generate tokens
    const accessToken = generateAccessToken({user: userName});
    const refreshToken = generateRefreshToken({user: userName});
    
    // insert tokens and send them back
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
  // extract data from req body
  const userName = req.body.user;
  const refreshTokenOld = req.body.refreshToken;

  // sql statements
  const searchSql = "SELECT * FROM user.token t WHERE t.refresh = ?";
  const updateSql = "UPDATE user.token t SET t.access = ?, t.refresh = ? WHERE t.refresh = ?";

  // check if token is valid
  const [rows] = await user.query(user.format(searchSql, [refreshTokenOld]));
  if (rows.length == 0) return next(createCustomError("Refresh token invalid", 400));

  // check if refresh token is expired
  jwt.verify(refreshTokenOld, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return next(createCustomError("Token expired", 403));
  });

  // generate tokens
  const accessTokenNew = generateAccessToken({user: userName});
  const refreshTokenNew = generateRefreshToken({user: userName});

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
  // extract data from req body
  const refreshToken = req.body.refreshToken;

  // sql statements
  const searchSql = "SELECT * FROM user.token t WHERE t.refresh = ?";
  const deleteSql = "DELETE FROM user.token t WHERE t.refresh = ?";

  // check if token is valid
  const [rows] = await user.query(user.format(searchSql, [refreshToken]));
  if (rows.length == 0) return next(createCustomError("Refresh token invalid", 400));

  // check if refresh token is expired
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return next(createCustomError("Token expired", 403));
  });

  // delete old token
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