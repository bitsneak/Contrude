import createCustomError from "../errors/customErrors.js";

const validateRouteParams = function(req, res, next) {
    // search for route parameters that are not set
    for (const [key, value] of Object.entries(req.params)) {
      // if a route parameter is not set, it starts with :
      if (value.startsWith(":")) {
        return next(createCustomError(`${key} parameter is required`, 400));
      }
    }
    next();
};

export default validateRouteParams;