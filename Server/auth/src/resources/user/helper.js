import jwt from "jsonwebtoken";
import session from "../../db/helper.js"
/**
 * @description generates an access token
 */
export const generateAccessToken = function(user, role) {
    return jwt.sign({user, role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
};
  
/**
 * @description generates a refresh token
 */
export const generateRefreshToken = function(user, role) {
    return jwt.sign({user, role}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"})
};
/**
 * @description Check if user1 has a higher role than user2
 * @param {int} user1 
 * @param {int} user2 
 * @returns {bool} False if user1 has a higher role than user2, true otherwise
 */
export const checkLevelPermission = async function (user1, user2) {
  // sql statement
  const searchUserLevelSql = `
    SELECT r.level
      FROM privilege.role r
      INNER JOIN user.user u
        ON r.id = u.role
      WHERE u.id = ? LIMIT 1`;
  // retrieve role levels from users
  let [rows] = await session(searchUserLevelSql, user1);
  const user1level = rows[0].level;
  [rows] = await session(searchUserLevelSql, user2);
  const user2level = rows[0].level;
  // check if new user role is higher than creating user role
  return !(user1level > user2level);
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