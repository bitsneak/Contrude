import tryCatchWrapper from "../../middlewares/tryCatchWrapper.js";
import createCustomError from "../../errors/customErrors.js";
import { ship_session, container_session } from "../../db/helper.js";

/**
 * @description Return all ships - currently hardcoded dummy data
 * @route GET /ship
 */
export const getAllShips = tryCatchWrapper(async function (req, res, next) {
    // dummy data
    const ships = [
        {
            ship_id: 1,
            ship_name: "a",
            ship_capacity: 100,
        },
        {
            ship_id: 2,
            ship_name: "b",
            ship_capacity: 200,
        },
        {
            ship_id: 3,
            ship_name: "c",
            ship_capacity: 300,
        },
        {
            ship_id: 4,
            ship_name: "deez nutz",
            ship_capacity: 400,
        }
    ];

    return res.status(200).json({ ships: ships });
});

/**
 * @description Return all containers per ship - currently hardcoded dummy data
 * @route GET /ship/:id/containers
 * @routeParameter id - Ship Id
 */
export const getAllContainersPerShip = tryCatchWrapper(async function (req, res, next) {
    // extract data from req params
    const id = req.params.id;
    
    // dummy data - select all preexisting containe
    const sql = "SELECT c.id FROM container.container c";
    const [rows] = await container_session(sql, id); 

    //const sql = "SELECT c.id FROM container.container c WHERE c.ship = ?";
    //const [rows] = await container_session(sql, id); 

    return res.status(200).json({ containers: rows });
});