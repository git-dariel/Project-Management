const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  // Logging for tracking request progress
  console.log("Validating token...");

  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract token (handle extra space after "Bearer")
    token = authHeader.split(" ")[1];

    try {
      // Verify token with logging
      const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log("Token verified successfully");
      req.user = decoded.user;
      next();
    } catch (err) {
      // Handle verification error with logging
      console.error("Error verifying token:", err.message);
      res.status(401).json({ message: "User is not authorized" });
    }
  } else {
    // Handle missing token
    console.log("Token missing or invalid format");
    res
      .status(401)
      .json({ message: "User is not authorized or token is missing" });
  }
});

module.exports = validateToken;
