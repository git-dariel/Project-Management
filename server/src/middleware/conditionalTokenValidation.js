const tokenValidationHandler = require("./validateTokenHandler");
const { API_ENDPOINTS } = require("../config/endpointsConfig");

const excludeFromTokenValidation = [
  {
    path: API_ENDPOINTS.USER.REGISTER.GET,
    method: "GET",
  },
  {
    path: API_ENDPOINTS.USER.REGISTER.POST,
    method: "POST",
  },
  {
    path: API_ENDPOINTS.USER.LOGIN.POST,
    method: "POST",
  },
];

const conditionalTokenValidation = (req, res, next) => {
  const isExcluded = excludeFromTokenValidation.some(
    (exclusion) =>
      req.path.endsWith(exclusion.path) && req.method === exclusion.method
  );
  if (isExcluded) {
    return next();
  }
  tokenValidationHandler(req, res, next);
};

module.exports = conditionalTokenValidation;
