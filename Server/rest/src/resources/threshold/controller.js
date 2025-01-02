import tryCatchWrapper from "../../middlewares/tryCatchWrapper.js";
import createCustomError from "../../errors/customErrors.js";
import { threshold_session, container_session } from "../../db/helper.js";

/**
 * @description Return all parameters
 * @route GET /threshold/parameter
 */
export const getAllParameters = tryCatchWrapper(async function (req, res, next) {
    const sql = "SELECT p.id FROM threshold.parameter p";
    const [rows] = await threshold_session(sql);
  
    return res.status(200).json({ parameter: rows });
});

/**
 * @description Return a parameter by its id
 * @route GET /threshold/parameter/:id
 * @routeParameter id - Parameter Id
 */
export const getParameterById = tryCatchWrapper(async function (req, res, next) {
    // extract data from req params
    const id = req.params.id;

    const sql = "SELECT p.name, p.unit FROM threshold.parameter p WHERE p.id = ? LIMIT 1";
    const [rows] = await threshold_session(sql, id);

    return res.status(200).json({ parameter: rows });
});

/**
 * @description Return a parameter by its name
 * @route GET /threshold/parameter/:name
 * @routeParameter name - Parameter name
 */
export const getParameterByName = tryCatchWrapper(async function (req, res, next) {
    // extract data from req params
    const name = req.params.name;

    const sql = "SELECT p.id FROM threshold.parameter p WHERE p.name = ? LIMIT 1";
    const [rows] = await threshold_session(sql, name);

    return res.status(200).json({ parameter: rows });
});

/**
 * @description Insert a parameter
 * @route POST /threshold/parameter
 * @routeBody name - Parameter name
 * @routeBody unit - Parameter unit
 */
export const insertParameter = tryCatchWrapper(async function (req, res, next) {
    // extract data from req body
    const name = req.body.name;
    const unit = req.body.unit;

    // check if req body is present
    if (name === undefined) return next(createCustomError("name is required", 409));
    if (unit === undefined) return next(createCustomError("unit is required", 409));

    // sql statements
    const searchSql = "SELECT 1 FROM threshold.parameter p WHERE p.name = ? AND p.unit = ? LIMIT 1";
    const insertSql = "INSERT INTO threshold.parameter (name, unit) VALUES (?, ?)";

    // check if parameter already exists
    const [rows] = await threshold_session(searchSql, [name, unit]);
    if (rows.length !== 0) return next(createCustomError("parameter already exists", 409));
  
    // insert new paramater
    await threshold_session(insertSql, [name, unit]).then((result) => {
        return res.status(201).json({ parameterId: result[0].insertId });
    });
});

/**
 * @description Return all rules
 * @route GET /threshold/rule
 */
export const getAllRules = tryCatchWrapper(async function (req, res, next) {
    const sql = "SELECT r.id FROM threshold.rule r";
    const [rows] = await threshold_session(sql);
  
    return res.status(200).json({ rule: rows });
});

/**
 * @description Return a rule by its id
 * @route GET /threshold/rule/:id
 * @routeParameter id - Rule Id
 */
export const getRuleById = tryCatchWrapper(async function (req, res, next) {
    // extract data from req params
    const id = req.params.id;

    const sql = "SELECT r.name FROM threshold.rule r WHERE r.id = ? LIMIT 1";
    const [rows] = await threshold_session(sql, id);
  
    return res.status(200).json({ rule: rows });
});

/**
 * @description Return a rule by its name
 * @route GET /threshold/rule/:name
 * @routeParameter name - Rule name
 */
export const getRuleByName = tryCatchWrapper(async function (req, res, next) {
    // extract data from req params
    const name = req.params.name;

    const sql = "SELECT r.id FROM threshold.rule r WHERE r.name = ? LIMIT 1";
    const [rows] = await threshold_session(sql, name);

    return res.status(200).json({ rules: rows });
});

/**
 * @description Insert a rule
 * @route POST /threshold/rule
 * @routeBody name - Rule name
 */
export const insertRule = tryCatchWrapper(async function (req, res, next) {
    // extract data from req body
    const name = req.body.name;

    // check if req body is present
    if (name === undefined) return next(createCustomError("name is required", 409));

    // sql statements
    const searchSql = "SELECT 1 FROM threshold.rule r WHERE r.name = ? LIMIT 1";
    const insertSql = "INSERT INTO threshold.rule (name) VALUES (?)";

    // check if rule already exists
    const [rows] = await threshold_session(searchSql, [name]);
    if (rows.length !== 0) return next(createCustomError("rule already exists", 409));
  
    // insert new rule
    await threshold_session(insertSql, [name]).then((result) => {
        return res.status(201).json({ ruleId: result[0].insertId });
    });
});

/**
 * @description Return all levels
 * @route GET /threshold/level
 */
export const getAllLevels = tryCatchWrapper(async function (req, res, next) {
    const sql = "SELECT l.id FROM threshold.level l";
    const [rows] = await threshold_session(sql);

    return res.status(200).json({ level: rows });
});

/**
 * @description Return a level by its id
 * @route GET /threshold/level/:id
 * @routeParameter id - Level Id
 */
export const getLevelById = tryCatchWrapper(async function (req, res, next) {
    // extract data from req params
    const id = req.params.id;

    const sql = "SELECT l.name, l.priority FROM threshold.level l WHERE l.id = ? LIMIT 1";
    const [rows] = await threshold_session(sql, id);
  
    return res.status(200).json({ level: rows });
});

/**
 * @description Return a level by its name
 * @route GET /threshold/level/:name
 * @routeParameter name - Level name
 */
export const getLevelByName = tryCatchWrapper(async function (req, res, next) {
    // extract data from req params
    const name = req.params.name;

    const sql = "SELECT l.id FROM threshold.level l WHERE l.name = ? LIMIT 1";
    const [rows] = await threshold_session(sql, name);

    return res.status(200).json({ rules: rows });
});

/**
 * @description Insert a level
 * @route POST /threshold/level
 * @routeBody name - Rule name
 * @routeBody priority - Priority
 */
export const insertLevel = tryCatchWrapper(async function (req, res, next) {
    // extract data from req body
    const name = req.body.name;
    const priority = req.body.priority;

    // check if req body is present
    if (name === undefined) return next(createCustomError("name is required", 409));
    if (priority === undefined) return next(createCustomError("priority is required", 409));

    // sql statements
    const searchLevelNameSql = "SELECT 1 FROM threshold.level l WHERE l.name = ? LIMIT 1";
    const searchLevelPrioritySql = "SELECT 1 FROM threshold.level l WHERE l.priority = ? LIMIT 1";
    const insertSql = "INSERT INTO threshold.level (name, priority) VALUES (?, ?)";

    // check if name is taken
    let [rows] = await threshold_session(searchLevelNameSql, [name]);
    if (rows.length !== 0) return next(createCustomError("level already exists", 409));

    // check if priority is taken
    [rows] = await threshold_session(searchLevelPrioritySql, [priority]);
    if (rows.length !== 0) return next(createCustomError("priority already exists", 409));

    // insert new level
    await threshold_session(insertSql, [name, priority]).then((result) => {
        return res.status(201).json({ levelId: result[0].insertId });
    });
});

/**
 * @description Return all thresholds
 * @route GET /threshold
 */
export const getAllThresholds = tryCatchWrapper(async function (req, res, next) {
    const sql = "SELECT t.id FROM threshold.threshold t";
    const [rows] = await threshold_session(sql);
  
    return res.status(200).json({ threshold: rows });
});

/**
 * @description Return a threshold by its id
 * @route GET /threshold/:id
 * @routeParameter id - Threshold Id
 */
export const getThresholdById = tryCatchWrapper(async function (req, res, next) {
    // extract data from req params
    const id = req.params.id;

    const sql = "SELECT t.container_id, t.parameter, t.rule, t.level, t.value FROM threshold.threshold t WHERE t.id = ? LIMIT 1";
    const [rows] = await threshold_session(sql, id);
  
    return res.status(200).json({ threshold: rows });
});

/**
 * @description Insert a threshold
 * @route POST /container/:id/threshold
 * @routeParameter id - Container id to which the threshold belongs
 * @routeBody parameter - Parameter id
 * @routeBody rule - Rule id
 * @routeBody level - Level id
 * @routeBody value - Value of the threshold
 */
export const insertThreshold = tryCatchWrapper(async function (req, res, next) {
    // extract data from req body
    const containerId = req.params.id;
    const parameter = req.body.parameter;
    const rule = req.body.rule;
    const level = req.body.level;
    const value = req.body.value;

    // check if req body is present
    if (containerId === undefined) return next(createCustomError("containerId is required", 409));
    if (parameter === undefined) return next(createCustomError("parameter is required", 409));
    if (rule === undefined) return next(createCustomError("rule is required", 409));
    if (level === undefined) return next(createCustomError("level is required", 409));
    if (value === undefined) return next(createCustomError("value is required", 409));

    // sql statements
    const searchThresholdSql = "SELECT 1 FROM threshold.threshold t WHERE t.container_id = ? AND t.parameter = ? AND t.rule = ? AND t.level = ? AND t.value = ? LIMIT 1";
    const searchContainerSql = "SELECT 1 FROM container.container c WHERE c.id = ? LIMIT 1";
    const insertSql = "INSERT INTO threshold.threshold (container_id, parameter, rule, level, value) VALUES (?, ?, ?, ?, ?)";

    // check if container exists
    let [rows] = await container_session(searchContainerSql, [containerId]);
    if (rows.length === 0) return next(createCustomError("container does not exist", 404));

    // check if threshold already exists
    [rows] = await threshold_session(searchThresholdSql, [containerId, parameter, rule, level, value]);
    if (rows.length !== 0) return next(createCustomError("threshold already exists", 409));
  
    // insert new threshold
    await threshold_session(insertSql, [containerId, parameter, rule, level, value]).then((result) => {
        return res.status(201).json({ thresholdId: result[0].insertId });
    });
});

/**
 * @description Get a threshold by its container id
 * @route GET /container/:id/threshold
 * @routeParameter id - Container id to which the threshold belongs
 */
export const getThresholdsByContainerId = tryCatchWrapper(async function (req, res, next) {
    // extract data from req params
    const id = req.params.id;

    const sql = "SELECT t.id, t.parameter, t.rule, t.level, t.value FROM threshold.threshold t WHERE t.container_id = ?";
    const [rows] = await threshold_session(sql, id);
    
    return res.status(200).json({ thresholds: rows });
});