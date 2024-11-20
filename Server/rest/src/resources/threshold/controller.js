import tryCatchWrapper from "../../middlewares/tryCatchWrapper.js";
import createCustomError from "../../errors/customErrors.js";
import { threshold_session } from "../../db/helper.js";

/**
 * @description Return all parameters
 * @route GET /threshold/parameter
 */
export const getAllParameters = tryCatchWrapper(async function (req, res, next) {
    const sql = "SELECT p.id FROM threshold.parameter p";
    const [rows] = await threshold_session(sql);
  
    return res.status(200).json({ parameters: rows });
});

/**
 * @description Return all rules
 * @route GET /threshold/rule
 */
export const getAllRules = tryCatchWrapper(async function (req, res, next) {
    const sql = "SELECT r.id FROM threshold.rule r";
    const [rows] = await threshold_session(sql);
  
    return res.status(200).json({ parameters: rows });
});

/**
 * @description Return all levels
 * @route GET /threshold/level
 */
export const getAllLevels = tryCatchWrapper(async function (req, res, next) {
    const sql = "SELECT l.id FROM threshold.level l";
    const [rows] = await threshold_session(sql);

    return res.status(200).json({ parameters: rows });
});