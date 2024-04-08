const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  const tokenMatch = authHeader ? authHeader.match(/^Bearer\s+(\S+)/) : null;
  const token = tokenMatch ? tokenMatch[1] : null;

  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ message: "User is not authorized" });
    }
  } else {
    res
      .status(401)
      .json({ message: "User is not authorized or token is missing" });
  }
});

module.exports = validateToken;
