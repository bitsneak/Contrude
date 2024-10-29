import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";
import { createCustomError } from "../../errors/customErrors.js";
import { sensor_session } from "../../db/helper.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * @description get the temperature of a container
 * @route GET temperature/:ship/:container/:start/:stop
 * @routeParam ship - ship id
 * @routeParam container - container id
 * @routeParam start - start time of the meassurement in ISO 8601 (UTC) 
 * @routeParam stop - stop time of the meassurement in ISO 8601 (UTC) 
 */
export const getTemperature = tryCatchWrapper(async function (req, res, next) {
    const ship  = req.params.ship;
    const container = req.params.container;
    const start = req.params.start;
    const stop = req.params.stop;

    if (!ship) return next(createCustomError("Ship id is required", 400));
    if (!container) return next(createCustomError("Container id is required", 400));

    const flux = "from(bucket: \"" + process.env.DB_SENSOR_BUCKET_TEMPERATURE + "\") " +
        "|> range(start: " + start + ", stop: " + stop + ") " +
        "|> filter(fn: (r) => r[\"ship\"] == \"" + ship + "\") " +
        "|> filter(fn: (r) => r[\"container\"] == \"" + container + "\") ";

    const rows = await sensor_session(flux);

    if (!rows.length) return next(createCustomError("Empty list", 204));
    return res.status(200).json({ temperature: rows });
  });
