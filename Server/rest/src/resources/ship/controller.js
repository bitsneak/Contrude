import tryCatchWrapper from "../../middlewares/tryCatchWrapper.js";
import createCustomError from "../../errors/customErrors.js";
//import { ship_session, container_session } from "../../db/helper.js";

/**
 * @description Returns all ships - currently hardcoded dummy data
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
