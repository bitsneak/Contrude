import tryCatchWrapper from "../../middlewares/tryCatchWrapper.js";
import createCustomError from "../../errors/customErrors.js";
import { ship_session, container_session } from "../../db/helper.js";

/**
 * @description Return all ships
 * @route GET /ship
 */
export const getAllShips = tryCatchWrapper(async function (req, res, next) {
    const sql = "SELECT s.id, s.name FROM ship.ship s";
    const [rows] = await ship_session(sql);

    return res.status(200).json({ ships: rows });
});

/**
 * @description Return all containers per ship
 * @route GET /ship/:id/containers
 * @routeParameter id - Ship Id
 */
export const getAllContainersPerShip = tryCatchWrapper(async function (req, res, next) {
    // extract data from req params
    const id = req.params.id;
    
    const sql = "SELECT c.id FROM container.container c WHERE c.ship = ?";
    const [rows] = await container_session(sql, id); 

    return res.status(200).json({ containers: rows });
});