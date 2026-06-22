const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  try {
    if (!req.cookies.token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised / Login Again",
      });
    }
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log(req.user);
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
}

module.exports = {
  authMiddleware,
};
