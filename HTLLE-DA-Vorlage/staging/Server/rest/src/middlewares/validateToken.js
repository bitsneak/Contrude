import axios from "axios";

import tryCatchWrapper from "./tryCatchWrapper.js";

const validateToken = (requiredPermission) => {
    return tryCatchWrapper(async function (req, res, next) {
        await axios.get(`http://auth:${process.env.AUTH_PORT}/token/${requiredPermission}`, {
            headers: {
                "authorization": req.headers.authorization
            }
        })
        .then(() => next())
        .catch((err) => res.status(err.response.status).json({message: err.response.data.message}));
    });
};

export default validateToken;