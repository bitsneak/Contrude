import { ship } from "./connect.js";
import { container } from "./connect.js";
import { sensor } from "./connect.js";
import { threshold } from "./connect.js";

const dbMap = {
    "ship": ship,
    "container": container,
    "threshold": threshold
};

const session = async function(sql, params, db) {    
    const con = await dbMap[db].getConnection();
    sql = params !== undefined ? dbMap[db].format(sql, params) : sql;
    
    const result = await con.query(sql);
    con.release();
    return result;
};

export const ship_session = async function(sql, params) {
    return session(sql, params, "ship");
};

export const container_session = async function(sql, params) {
    return session(sql, params, "container");
};

export const threshold_session = async function(sql, params) {
    return session(sql, params, "threshold");
};

export const sensor_session = async function(flux) {
    const api = sensor.getQueryApi(process.env.DB_SENSOR_ORG);

    return await new Promise((resolve, reject) => {
        const results = [];

        api.queryRows(flux, {
            next(row, tableMeta) {
                const result = tableMeta.toObject(row);

                // remove unnecessary fields
                delete result["result"];
                delete result["table"];
                delete result["_start"];
                delete result["_stop"];
                delete result["_field"];
                delete result["_measurement"];
                delete result["topic"];
                delete result["host"];

                // rename field _time to time
                result["time"] = result["_time"];
                delete result["_time"];
                // rename field _value to value
                result["value"] = result["_value"];
                delete result["_value"];

                // strip away unnecessary seconds
                result["time"] = result["time"].split('.')[0] + 'Z';
                // strip away unnecessary decimals
                result["value"] = parseFloat(result["value"]).toFixed(2);
                
                results.push(result); // collect each row
            },
            error(error) {
                reject(error); // reject on error
            },
            complete() {
                resolve(results); // resolve with all collected results
            },
        });
    });
};