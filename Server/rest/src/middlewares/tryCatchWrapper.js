import createCustomError from "../errors/customErrors.js";

const tryCatchWrapper = function tryCatchWrapper(func) {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      return next(createCustomError(error, 400));
    }
  };
};

export default tryCatchWrapper;