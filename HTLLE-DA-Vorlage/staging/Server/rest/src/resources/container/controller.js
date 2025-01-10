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

    // sql statement
    const sql = "SELECT c.ship, c.serial_number, c.check_digit, c.csc, c.equipment_identifier, c.overhead_electrical_danger_warning, c.repair_recommendation, c.notes FROM container.container c WHERE c.id = ? LIMIT 1";
    const [rows] = await container_session(sql, id);
  
    return res.status(200).json({ container: rows });
});

/**
 * @description Update a Container by its id
 * @route PUT /container/:id
 * @routeParameter id - Container id
 */
export const updateContainerById = tryCatchWrapper(async function (req, res, next) {
    // extract data from req params
    const id = req.params.id;
    // extract data from req body
    const ship = req.body.ship;
    const serial_number = req.body.serial_number;
    const check_digit = req.body.check_digit;
    const csc = req.body.csc;
    const equipment_identifier = req.body.equipment_identifier;
    const overhead_electrical_danger_warning = req.body.overhead_electrical_danger_warning;
    const repair_recommendation = req.body.repair_recommendation;
    const notes = req.body.notes;

    // sql statement
    const updateSql = `UPDATE container.container c SET c.ship = ?, c.serial_number = ?, c.check_digit = ?, c.csc = ?, c.equipment_identifier = ?, c.overhead_electrical_danger_warning = ?, c.repair_recommendation = ?, c.notes = ? WHERE id = ?`;

    // update container
    const [rows] = await container_session(updateSql, [ship, serial_number, check_digit, csc, equipment_identifier, overhead_electrical_danger_warning, repair_recommendation, notes, id]);
    console.log(rows.affectedRows);
    if (rows.affectedRows === 0) return next(createCustomError("There was a problem with updating the container", 409));
    
    return res.status(204).json();
});

/**
 * @description Return a serial number of a container by its id
 * @route GET /container/:id/serial-number
 * @routeParameter id - Container id
 */
export const getSerialNumberByContainerId = tryCatchWrapper(async function (req, res, next) {
    // extract data from req params
    const id = req.params.id;

    // sql statement
    const searchSql = `
        SELECT 
            container.serial_number,
            container.check_digit,
            dimension.equipment_identifier.identifier AS equipment_identifier,
            corporation.company.prefix
        FROM 
            container.container
        INNER JOIN 
            certificate.csc ON container.csc = certificate.csc.id
        INNER JOIN 
            certificate.ccc ON certificate.csc.ccc = certificate.ccc.id
        INNER JOIN 
            corporation.company ON certificate.ccc.owner = corporation.company.id
        INNER JOIN 
            dimension.equipment_identifier ON container.equipment_identifier = dimension.equipment_identifier.id
        WHERE 
            container.id = ?
        LIMIT 1;
        `;

    // search for container
    const [rows] = await container_session(searchSql, id);
    if (rows.length === 0) return next(createCustomError("No container with such ID", 409));

    // combine all to get the full serial number
    const serialNumber = rows[0].prefix + "" + rows[0].equipment_identifier + "" +  rows[0].serial_number + "" + rows[0].check_digit;

    return res.status(200).json({ serial_number: serialNumber });
});

/**
 * @description Return a container id by its serial number
 * @route GET /container/by-serial-number/:serial
 * @routeParameter serial - Container serial number
 */
export const getContainerIdBySerialNumber = tryCatchWrapper(async function (req, res, next) {
    // extract data from req params
    const serialNumber = req.params.serial;

    // validate serial number length
    if (!serialNumber || serialNumber.length != 11) return next(createCustomError("Invalid serial number format", 400));

    // split serial number into components
    const prefix = serialNumber.substring(0, 3); // bic code
    const equipmentIdentifier = serialNumber.charAt(3); // equipment identifier
    const containerSerialNumber = serialNumber.substring(4, serialNumber.length - 1); // characters 5 to 10
    const checkDigit = serialNumber.charAt(serialNumber.length - 1); // check digit

    // sql statement
    const searchSql = `
        SELECT
            container.id
        FROM 
            container.container
        INNER JOIN 
            certificate.csc ON container.csc = certificate.csc.id
        INNER JOIN 
            certificate.ccc ON certificate.csc.ccc = certificate.ccc.id
        INNER JOIN 
            corporation.company ON certificate.ccc.owner = corporation.company.id
        INNER JOIN 
            dimension.equipment_identifier ON container.equipment_identifier = dimension.equipment_identifier.id
        WHERE 
            corporation.company.prefix = ? 
            AND dimension.equipment_identifier.identifier = ?
            AND container.serial_number = ?
            AND container.check_digit = ?
        LIMIT 1;
    `;

    // search for container
    const [rows] = await container_session(searchSql, [prefix, equipmentIdentifier, containerSerialNumber, checkDigit]);
    if (rows.length === 0) return next(createCustomError("No container found with this serial number", 404));
    const id = rows[0].id;

    return res.status(200).json({ container: id });
});
