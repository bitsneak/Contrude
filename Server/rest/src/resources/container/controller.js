import tryCatchWrapper from "../../middlewares/tryCatchWrapper.js";
import createCustomError from "../../errors/customErrors.js";
import { container_session } from "../../db/helper.js";

/**
 * @description Return a container by its id
 * @route GET /container/:id
 * @routeParameter id - Container id
 */
export const getContainerById = tryCatchWrapper(async function (req, res, next) {
    // extract data from req params
    const id = req.params.id;

    const sql = "SELECT c.ship, c.serial_number, c.check_digit, c.csc, c.equipment_identifier, c.overhead_electrical_danger_warning, c.repair_recommendation FROM container.container c WHERE c.id = ? LIMIT 1";
    const [rows] = await container_session(sql, id);
  
    return res.status(200).json({ container: rows });
});