import { configuration } from "./connect.js";
import { sensor } from "./connect.js";

const session = async function(sql, params, db) {
    const dbMap = {
        "configuration": configuration,
        "sensor": sensor
    };
    
    const con = await dbMap[db].getConnection();
    sql = params !== undefined ? dbMap[db].format(sql, params) : sql;
    
    const result = await con.query(sql);
    con.release();
    return result;
};

export const configuration_session = async function(sql, params) {
    return session(sql, params, "configuration");
};

export const sensor_session = async function(sql, params) {
    return session(sql, params, "sensor");
};