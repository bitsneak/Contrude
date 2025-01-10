import tryCatchWrapper from "../../middlewares/tryCatchWrapper.js";
import createCustomError from "../../errors/customErrors.js";
import { sensor_session } from "../../db/helper.js";
import { fluxQueryTimeRange, fluxQueryLatest, checkParams } from "./helper.js";

/**
 * @description Map sensor config to the respective bucket and response key
 */
const SENSOR_CONFIG = {
  air_pressure: {
    bucket: process.env.DB_SENSOR_BUCKET_AIR_PRESSURE,
    responseKey: "air_pressure",
  },
  humidity: {
    bucket: process.env.DB_SENSOR_BUCKET_HUMIDITY,
    responseKey: "humidity",
  },
  temperature: {
    bucket: process.env.DB_SENSOR_BUCKET_TEMPERATURE,
    responseKey: "temperature",
  },
  vibration: {
    bucket: process.env.DB_SENSOR_BUCKET_VIBRATION,
    responseKey: "vibration",
  },
  altitude: {
    bucket: process.env.DB_SENSOR_BUCKET_ALTITUDE,
    responseKey: "altitude",
  },
  latitude: {
    bucket: process.env.DB_SENSOR_BUCKET_LATITUDE,
    responseKey: "latitude",
  },
  longitude: {
    bucket: process.env.DB_SENSOR_BUCKET_LONGITUDE,
    responseKey: "longitude",
  },
};


/**
 * @description Get the sensor data of a container
 * @route GET /sensor/:ship/:container/{sensorType}
 * @param {string} sensorType - The type of sensor data to fetch
 * @routeParam ship - Ship id
 * @routeParam container - Container id
 * @queryParam start - Start time of the measurement in ISO 8601 (UTC) (optional, must pair with `stop`)
 * @queryParam stop - Stop time of the measurement in ISO 8601 (UTC) (optional, must pair with `start`)
 * @queryParam latest - Boolean, if true, fetch the latest sensor data (optional, must not pair with `start` and `stop`)
 */
export const getSensorData = (sensorType) => {
  return tryCatchWrapper(async function (req, res, next) {
    // extract data from req params
    const ship = req.params.ship;
    const container = req.params.container;
    // extract data from req query
    const start = req.query.start;
    const stop = req.query.stop;
    const latest = req.query.latest;

    // get the configuration for the given sensor type
    const config = SENSOR_CONFIG[sensorType];
    if (!config) return next(createCustomError("Invalid sensor type", 400));

    // validate query parameters
    let flux;
    if (latest) {
      // build query for the latest data
      flux = fluxQueryLatest(config.bucket, ship, container);
    } else if (start && stop) {
      // validate start and stop
      const checked = checkParams(start, stop);
      if (checked) return next(createCustomError(checked, 400));

      // build query for the time range
      flux = fluxQueryTimeRange(config.bucket, ship, container, start, stop);
    } else {
      // invalid query parameters
      return next(createCustomError("No valid query parameters", 400));
    }

    // execute query
    const rows = await sensor_session(flux);
    return res.status(200).json({ [config.responseKey]: rows });
  });
};

/**
 * @description Get all latest sensor data of a container
 * @route GET /sensor/:ship/:container
 * @routeParam ship - Ship id
 * @routeParam container - Container id
 */
export const getAllSensorDataPerContainer = tryCatchWrapper(async function (req, res, next) {
  // extract data from req params
  const ship = req.params.ship;
  const container = req.params.container;

  // get data for all sensors
  const sensorDataPromises = Object.keys(SENSOR_CONFIG).map(async (sensorType) => {
    const config = SENSOR_CONFIG[sensorType];
    const flux = fluxQueryLatest(config.bucket, ship, container);
    const rows = await sensor_session(flux);
    return { [config.responseKey]: rows };
  });

  console.log(sensorDataPromises);

  // resolve all promises
  const sensorDataArray = await Promise.all(sensorDataPromises);

  // combine results into a single object
  const sensorData = sensorDataArray.reduce((acc, data) => ({ ...acc, ...data }), {});

  return res.status(200).json({ sensor_data: sensorData });
});