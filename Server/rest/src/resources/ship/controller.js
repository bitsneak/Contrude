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
 * @description Return a ship name by its id
 * @route GET /ship/:id
 */
export const getShipById = tryCatchWrapper(async function (req, res, next) {
    // extract data from req params
    const id = req.params.id;

    const sql = "SELECT s.name, s.imo_number, s.registration_country, s.type, s.length, s.width, s.draft, s.net_capacity, s.cargo_capacity, s.container_capacity, s.owner, s.operator, s.year_built FROM ship.ship s WHERE s.id = ? LIMIT 1";
    const [rows] = await ship_session(sql, id);

    return res.status(200).json({ ship: rows });
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