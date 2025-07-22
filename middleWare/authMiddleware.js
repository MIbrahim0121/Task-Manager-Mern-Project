const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    JWT.verify(token, process.env.JWT_TOKEN, (err, decode) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized user",
        });
      }

      // ✅ Store user info safely
      req.user = decode;
      next();
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(400).json({
      success: false,
      message: "Please provide a valid Auth token",
      error,
    });
  }
};
