import tryCatchWrapper from "../../middlewares/tryCatchWrapper.js";
import createCustomError from "../../errors/customErrors.js";
import { sensor_session } from "../../db/helper.js";
import { fluxQueryTimeRange, fluxQueryLatest, checkParams } from "./helper.js";

/**
 * @description Get the air pressure of a container
 * @route GET /sensor/air_pressure/:ship/:container/:start/:stop
 * @routeParam ship - Ship id
 * @routeParam container - Container id
 * @routeParam start - Start time of the meassurement in ISO 8601 (UTC) 
 * @routeParam stop - Stop time of the meassurement in ISO 8601 (UTC) 
 */
export const getAirPressure = tryCatchWrapper(async function (req, res, next) {
  // extract data from req params
  const ship  = req.params.ship;
  const container = req.params.container;
  const start = req.params.start;
  const stop = req.params.stop;

  // check start / stop time validity
  const checked = checkParams(start, stop);
  if (checked) return next(createCustomError(checked, 400));

  // build and execute flux query
  const flux = fluxQueryTimeRange(process.env.DB_SENSOR_BUCKET_AIR_PRESSURE, ship, container, start, stop);
  const rows = await sensor_session(flux);

  return res.status(200).json({ air_pressure: rows });
});

/**
 * @description Get the latest air pressure of a container
 * @route GET /sensor/air_pressure/:ship/:container/latest
 * @routeParam ship - Ship id
 * @routeParam container - Container id
 */
export const getLatestAirPressure = tryCatchWrapper(async function (req, res, next) {
  // extract data from req params
  const ship  = req.params.ship;
  const container = req.params.container;

  // build and execute flux query
  const flux = fluxQueryLatest(process.env.DB_SENSOR_BUCKET_AIR_PRESSURE, ship, container);
  const rows = await sensor_session(flux);

  return res.status(200).json({ air_pressure: rows });
});

/**
 * @description Get the humidity of a container
 * @route GET /sensor/humidity/:ship/:container/:start/:stop
 * @routeParam ship - Ship id
 * @routeParam container - Container id
 * @routeParam start - Start time of the meassurement in ISO 8601 (UTC) 
 * @routeParam stop - Stop time of the meassurement in ISO 8601 (UTC) 
 */
export const getHumidity = tryCatchWrapper(async function (req, res, next) {
  // extract data from req params
  const ship  = req.params.ship;
  const container = req.params.container;
  const start = req.params.start;
  const stop = req.params.stop;

  // check start / stop time validity
  const checked = checkParams(start, stop);
  if (checked) return next(createCustomError(checked, 400));

  // build and execute flux query
  const flux = fluxQueryTimeRange(process.env.DB_SENSOR_BUCKET_HUMIDITY, ship, container, start, stop);
  const rows = await sensor_session(flux);

  return res.status(200).json({ humidity: rows });
});

/**
 * @description Get the latest humidity of a container
 * @route GET /sensor/humidity/:ship/:container/latest
 * @routeParam ship - Ship id
 * @routeParam container - Container id
 */
export const getLatestHumidity = tryCatchWrapper(async function (req, res, next) {
  // extract data from req params
  const ship  = req.params.ship;
  const container = req.params.container;

  // build and execute flux query
  const flux = fluxQueryLatest(process.env.DB_SENSOR_BUCKET_HUMIDITY, ship, container);
  const rows = await sensor_session(flux);

  return res.status(200).json({ humidity: rows });
});

/**
 * @description Get the temperature of a container
 * @route GET /sensor/temperature/:ship/:container/:start/:stop
 * @routeParam ship - Ship id
 * @routeParam container - Container id
 * @routeParam start - Start time of the meassurement in ISO 8601 (UTC) 
 * @routeParam stop - Stop time of the meassurement in ISO 8601 (UTC) 
 */
export const getTemperature = tryCatchWrapper(async function (req, res, next) {
  // extract data from req params
  const ship  = req.params.ship;
  const container = req.params.container;
  const start = req.params.start;
  const stop = req.params.stop;

  // check start / stop time validity
  const checked = checkParams(start, stop);
  if (checked) return next(createCustomError(checked, 400));

  // build and execute flux query
  const flux = fluxQueryTimeRange(process.env.DB_SENSOR_BUCKET_TEMPERATURE, ship, container, start, stop);
  const rows = await sensor_session(flux);

  return res.status(200).json({ temperature: rows });
});

/**
 * @description Get the latest temperature of a container
 * @route GET /sensor/temperature/:ship/:container/latest
 * @routeParam ship - Ship id
 * @routeParam container - Container id
 */
export const getLatestTemperature = tryCatchWrapper(async function (req, res, next) {
  // extract data from req params
  const ship  = req.params.ship;
  const container = req.params.container;

  // build and execute flux query
  const flux = fluxQueryLatest(process.env.DB_SENSOR_BUCKET_TEMPERATURE, ship, container);
  const rows = await sensor_session(flux);

  return res.status(200).json({ temperature: rows });
});

/**
 * @description Get the vibration of a container
 * @route GET /sensor/vibration/:ship/:container/:start/:stop
 * @routeParam ship - Ship id
 * @routeParam container - Container id
 * @routeParam start - Start time of the meassurement in ISO 8601 (UTC) 
 * @routeParam stop - Stop time of the meassurement in ISO 8601 (UTC) 
 */
export const getVibration = tryCatchWrapper(async function (req, res, next) {
  // extract data from req params
  const ship  = req.params.ship;
  const container = req.params.container;
  const start = req.params.start;
  const stop = req.params.stop;

  // check start / stop time validity
  const checked = checkParams(start, stop);
  if (checked) return next(createCustomError(checked, 400));

  // build and execute flux query
  const flux = fluxQueryTimeRange(process.env.DB_SENSOR_BUCKET_VIBRATION, ship, container, start, stop);
  const rows = await sensor_session(flux);

  return res.status(200).json({ vibration: rows });
});

/**
 * @description Get the latest vibration of a container
 * @route GET /sensor/vibration/:ship/:container/latest
 * @routeParam ship - Ship id
 * @routeParam container - Container id
 */
export const getLatestVibration = tryCatchWrapper(async function (req, res, next) {
  // extract data from req params
  const ship  = req.params.ship;
  const container = req.params.container;

  // build and execute flux query
  const flux = fluxQueryLatest(process.env.DB_SENSOR_BUCKET_VIBRATION, ship, container);
  const rows = await sensor_session(flux);

  return res.status(200).json({ vibration: rows });
});

/**
 * @description Get the altitude of a container
 * @route GET /sensor/altitude/:ship/:container/:start/:stop
 * @routeParam ship - Ship id
 * @routeParam container - Container id
 * @routeParam start - Start time of the meassurement in ISO 8601 (UTC) 
 * @routeParam stop - Stop time of the meassurement in ISO 8601 (UTC) 
 */
export const getAltitude = tryCatchWrapper(async function (req, res, next) {
  // extract data from req params
  const ship  = req.params.ship;
  const container = req.params.container;
  const start = req.params.start;
  const stop = req.params.stop;

  // check start / stop time validity
  const checked = checkParams(start, stop);
  if (checked) return next(createCustomError(checked, 400));

  // build and execute flux query
  const flux = fluxQueryTimeRange(process.env.DB_SENSOR_BUCKET_ALTITUDE, ship, container, start, stop);
  const rows = await sensor_session(flux);

  return res.status(200).json({ altitude: rows });
});

/**
 * @description Get the latest altitude of a container
 * @route GET /sensor/altitude/:ship/:container/latest
 * @routeParam ship - Ship id
 * @routeParam container - Container id
 */
export const getLatestAltitude = tryCatchWrapper(async function (req, res, next) {
  // extract data from req params
  const ship  = req.params.ship;
  const container = req.params.container;

  // build and execute flux query
  const flux = fluxQueryLatest(process.env.DB_SENSOR_BUCKET_ALTITUDE, ship, container);
  const rows = await sensor_session(flux);

  return res.status(200).json({ altitude: rows });
});

/**
 * @description Get the latitude of a container
 * @route GET /sensor/latitude/:ship/:container/:start/:stop
 * @routeParam ship - Ship id
 * @routeParam container - Container id
 * @routeParam start - Start time of the meassurement in ISO 8601 (UTC) 
 * @routeParam stop - Stop time of the meassurement in ISO 8601 (UTC)  
 */
export const getLatitude = tryCatchWrapper(async function (req, res, next) {
  // extract data from req params
  const ship  = req.params.ship;
  const container = req.params.container;
  const start = req.params.start;
  const stop = req.params.stop;

  // check start / stop time validity
  const checked = checkParams(start, stop);
  if (checked) return next(createCustomError(checked, 400));

  // build and execute flux query
  const flux = fluxQueryTimeRange(process.env.DB_SENSOR_BUCKET_LATITUDE, ship, container, start, stop);
  const rows = await sensor_session(flux);

  return res.status(200).json({ latitude: rows });
});

/**
 * @description Get the latest latitude of a container
 * @route GET /sensor/latitude/:ship/:container/latest
 * @routeParam ship - Ship id
 * @routeParam container - Container id
 */
export const getLatestLatitude = tryCatchWrapper(async function (req, res, next) {
  // extract data from req params
  const ship  = req.params.ship;
  const container = req.params.container;

  // build and execute flux query
  const flux = fluxQueryLatest(process.env.DB_SENSOR_BUCKET_LATITUDE, ship, container);
  const rows = await sensor_session(flux);

  return res.status(200).json({ latitude: rows });
});

/**
 * @description Get the longitude of a container
 * @route GET /sensor/longitude/:ship/:container/:start/:stop
 * @routeParam ship - Ship id
 * @routeParam container - Container id
 * @routeParam start - Start time of the meassurement in ISO 8601 (UTC) 
 * @routeParam stop - Stop time of the meassurement in ISO 8601 (UTC) 
 */
export const getLongitude = tryCatchWrapper(async function (req, res, next) {
  // extract data from req params
  const ship  = req.params.ship;
  const container = req.params.container;
  const start = req.params.start;
  const stop = req.params.stop;

  // check start / stop time validity
  const checked = checkParams(start, stop);
  if (checked) return next(createCustomError(checked, 400));

  // build and execute flux query
  const flux = fluxQueryTimeRange(process.env.DB_SENSOR_BUCKET_LONGITUDE, ship, container, start, stop);
  const rows = await sensor_session(flux);

  return res.status(200).json({ longitude: rows });
});

/**
 * @description Get the latest longitude of a container
 * @route GET /sensor/longitude/:ship/:container/latest
 * @routeParam ship - Ship id
 * @routeParam container - Container id
 */
export const getLatestLongitude = tryCatchWrapper(async function (req, res, next) {
  // extract data from req params
  const ship  = req.params.ship;
  const container = req.params.container;

  // build and execute flux query
  const flux = fluxQueryLatest(process.env.DB_SENSOR_BUCKET_LONGITUDE, ship, container);
  const rows = await sensor_session(flux);

  return res.status(200).json({ longitude: rows });
});