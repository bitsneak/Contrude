import { user } from "./connect.js";

const session = async function(sql, params) {
    if (params !== undefined) sql = user.format(sql, params);

    const con = await user.getConnection();
    const result = await con.query(sql);
    con.release();
    return result;
};

export default session;