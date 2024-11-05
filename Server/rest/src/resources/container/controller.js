import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";
import { createCustomError } from "../../errors/customErrors.js";
import { container_session } from "../../db/helper.js";

/**
 * @description get all countries
 * @route GET countries
 */
export const getAllCountries = tryCatchWrapper(async function (req, res, next) {
    let sql = "SELECT * FROM corporation.country";
    const [rows] = await container_session(sql);

    if (!rows.length) return next(createCustomError("Empty list", 204));
    return res.status(200).json({ countries: rows });
});

/**
 * @description get all countries from continent
 * @route GET countries/:id
 * @routeParam id - continent id
 */
export const getAllCountriesFromContinent = tryCatchWrapper(async function (req, res, next) {
  const id  = req.params.id;
  if (!id) return next(createCustomError("Continent id is required", 400));

  let sql = "SELECT * FROM corporation.country c WHERE c.continent = ?";
  const [rows] = await container_session(sql, id);

  if (!rows.length) return next(createCustomError("Empty list", 204));
  return res.status(200).json({ countries: rows });
});