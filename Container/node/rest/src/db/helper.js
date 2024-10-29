import { configuration } from "./connect.js";
import { sensor } from "./connect.js";
import dotenv from "dotenv";
dotenv.config();

export const configuration_session = async function(sql, params) {
    const con = await configuration.getConnection();
    sql = params !== undefined ? configuration.format(sql, params) : sql;
    
    const result = await con.query(sql);
    con.release();
    return result;
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