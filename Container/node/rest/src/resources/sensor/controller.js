import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";
import { createCustomError } from "../../errors/customErrors.js";
import { sensor_session } from "../../db/helper.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * @description get the air pressure of a container
 * @route GET air_pressure/:ship/:container/:start/:stop
 * @routeParam ship - ship id
 * @routeParam container - container id
 * @routeParam start - start time of the meassurement in ISO 8601 (UTC) 
 * @routeParam stop - stop time of the meassurement in ISO 8601 (UTC) 
 */
  export const getAirPressure = tryCatchWrapper(async function (req, res, next) {
    const ship  = req.params.ship;
    const container = req.params.container;
    const start = req.params.start;
    const stop = req.params.stop;

    if (!ship) return next(createCustomError("Ship id is required", 400));
    if (!container) return next(createCustomError("Container id is required", 400));
    if (!start) return next(createCustomError("Start time is required", 400));
    if (!stop) return next(createCustomError("Stop time id is required", 400));

    const flux = `
        from(bucket: "${process.env.DB_SENSOR_BUCKET_AIR_PRESSURE}") 
        |> range(start: ${start}, stop: ${stop}) 
        |> filter(fn: (r) => r["ship"] == "${ship}") 
        |> filter(fn: (r) => r["container"] == "${container}")`;

    const rows = await sensor_session(flux);

    if (!rows.length) return next(createCustomError("Empty list", 204));
    return res.status(200).json({ air_pressure: rows });
  });

/**
 * @description get the humidity of a container
 * @route GET humidity/:ship/:container/:start/:stop
 * @routeParam ship - ship id
 * @routeParam container - container id
 * @routeParam start - start time of the meassurement in ISO 8601 (UTC) 
 * @routeParam stop - stop time of the meassurement in ISO 8601 (UTC) 
 */
  export const getHumidity = tryCatchWrapper(async function (req, res, next) {
    const ship  = req.params.ship;
    const container = req.params.container;
    const start = req.params.start;
    const stop = req.params.stop;

    if (!ship) return next(createCustomError("Ship id is required", 400));
    if (!container) return next(createCustomError("Container id is required", 400));
    if (!start) return next(createCustomError("Start time is required", 400));
    if (!stop) return next(createCustomError("Stop time id is required", 400));

    const flux = `
        from(bucket: "${process.env.DB_SENSOR_BUCKET_HUMIDITY}") 
        |> range(start: ${start}, stop: ${stop}) 
        |> filter(fn: (r) => r["ship"] == "${ship}") 
        |> filter(fn: (r) => r["container"] == "${container}")`;

    const rows = await sensor_session(flux);

    if (!rows.length) return next(createCustomError("Empty list", 204));
    return res.status(200).json({ humidity: rows });
  });

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
    if (!start) return next(createCustomError("Start time is required", 400));
    if (!stop) return next(createCustomError("Stop time id is required", 400));

    const flux = `
        from(bucket: "${process.env.DB_SENSOR_BUCKET_TEMPERATURE}") 
        |> range(start: ${start}, stop: ${stop}) 
        |> filter(fn: (r) => r["ship"] == "${ship}") 
        |> filter(fn: (r) => r["container"] == "${container}")`;

    const rows = await sensor_session(flux);

    if (!rows.length) return next(createCustomError("Empty list", 204));
    return res.status(200).json({ temperature: rows });
  });

/**
 * @description get the vibration of a container
 * @route GET vibration/:ship/:container/:start/:stop
 * @routeParam ship - ship id
 * @routeParam container - container id
 * @routeParam start - start time of the meassurement in ISO 8601 (UTC) 
 * @routeParam stop - stop time of the meassurement in ISO 8601 (UTC) 
 */
export const getVibration = tryCatchWrapper(async function (req, res, next) {
    const ship  = req.params.ship;
    const container = req.params.container;
    const start = req.params.start;
    const stop = req.params.stop;

    if (!ship) return next(createCustomError("Ship id is required", 400));
    if (!container) return next(createCustomError("Container id is required", 400));
    if (!start) return next(createCustomError("Start time is required", 400));
    if (!stop) return next(createCustomError("Stop time id is required", 400));

    const flux = `
        from(bucket: "${process.env.DB_SENSOR_BUCKET_VIBRATION}") 
        |> range(start: ${start}, stop: ${stop}) 
        |> filter(fn: (r) => r["ship"] == "${ship}") 
        |> filter(fn: (r) => r["container"] == "${container}")`;

    const rows = await sensor_session(flux);

    if (!rows.length) return next(createCustomError("Empty list", 204));
    return res.status(200).json({ vibration: rows });
  });

/**
 * @description get the altitude of a container
 * @route GET altitude/:ship/:container/:start/:stop
 * @routeParam ship - ship id
 * @routeParam container - container id
 * @routeParam start - start time of the meassurement in ISO 8601 (UTC) 
 * @routeParam stop - stop time of the meassurement in ISO 8601 (UTC) 
 */
export const getAltitude = tryCatchWrapper(async function (req, res, next) {
    const ship  = req.params.ship;
    const container = req.params.container;
    const start = req.params.start;
    const stop = req.params.stop;

    if (!ship) return next(createCustomError("Ship id is required", 400));
    if (!container) return next(createCustomError("Container id is required", 400));
    if (!start) return next(createCustomError("Start time is required", 400));
    if (!stop) return next(createCustomError("Stop time id is required", 400));

    const flux = `
        from(bucket: "${process.env.DB_SENSOR_BUCKET_ALTITUDE}") 
        |> range(start: ${start}, stop: ${stop}) 
        |> filter(fn: (r) => r["ship"] == "${ship}") 
        |> filter(fn: (r) => r["container"] == "${container}")`;

    const rows = await sensor_session(flux);

    if (!rows.length) return next(createCustomError("Empty list", 204));
    return res.status(200).json({ altitude: rows });
  });

/**
 * @description get the latitude of a container
 * @route GET latitude/:ship/:container/:start/:stop
 * @routeParam ship - ship id
 * @routeParam container - container id
 * @routeParam start - start time of the meassurement in ISO 8601 (UTC) 
 * @routeParam stop - stop time of the meassurement in ISO 8601 (UTC) 
 */
export const getLatitude = tryCatchWrapper(async function (req, res, next) {
    const ship  = req.params.ship;
    const container = req.params.container;
    const start = req.params.start;
    const stop = req.params.stop;

    if (!ship) return next(createCustomError("Ship id is required", 400));
    if (!container) return next(createCustomError("Container id is required", 400));
    if (!start) return next(createCustomError("Start time is required", 400));
    if (!stop) return next(createCustomError("Stop time id is required", 400));

    const flux = `
        from(bucket: "${process.env.DB_SENSOR_BUCKET_LATITUDE}") 
        |> range(start: ${start}, stop: ${stop}) 
        |> filter(fn: (r) => r["ship"] == "${ship}") 
        |> filter(fn: (r) => r["container"] == "${container}")`;

    const rows = await sensor_session(flux);

    if (!rows.length) return next(createCustomError("Empty list", 204));
    return res.status(200).json({ latitude: rows });
  });

/**
 * @description get the longitude of a container
 * @route GET longitude/:ship/:container/:start/:stop
 * @routeParam ship - ship id
 * @routeParam container - container id
 * @routeParam start - start time of the meassurement in ISO 8601 (UTC) 
 * @routeParam stop - stop time of the meassurement in ISO 8601 (UTC) 
 */
export const getLongitude = tryCatchWrapper(async function (req, res, next) {
    const ship  = req.params.ship;
    const container = req.params.container;
    const start = req.params.start;
    const stop = req.params.stop;

    if (!ship) return next(createCustomError("Ship id is required", 400));
    if (!container) return next(createCustomError("Container id is required", 400));
    if (!start) return next(createCustomError("Start time is required", 400));
    if (!stop) return next(createCustomError("Stop time id is required", 400));

    const flux = `
        from(bucket: "${process.env.DB_SENSOR_BUCKET_LONGITUDE}") 
        |> range(start: ${start}, stop: ${stop}) 
        |> filter(fn: (r) => r["ship"] == "${ship}") 
        |> filter(fn: (r) => r["container"] == "${container}")`;

    const rows = await sensor_session(flux);

    if (!rows.length) return next(createCustomError("Empty list", 204));
    return res.status(200).json({ longitude: rows });
  });